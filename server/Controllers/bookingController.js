const Booking = require('../Models/Booking')

const addNewBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        console.error("Error saving booking:", err);
        res.status(500).json({ message: "שגיאה ביצירת ההזמנה" });
    }
}

const getAllBooking = async (req, res) => {
    await Booking.find().populate('userId').populate('suiteId')
        .then(result => res.send(result))
        .catch(err => res.status(400).json({ "Error": err }))
}
const getBookedDatesBySuiteId = async (req, res) => {
    const suiteId = req.params.id;

    try {
        const bookings = await Booking.find({ suiteId });

        if (bookings.length === 0) {
            return res.json([]); // אין תאריכים תפוסים
        }

        const bookedDates = [];

        bookings.forEach(booking => {
            let current = new Date(booking.checkInDate);
            const end = new Date(booking.checkOutDate);

            while (current < end) {
                bookedDates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
        });

        // פונקציה פנימית שמחזירה מערך של טווחים
        function getReservedDateRanges(dates) {
            if (!dates || dates.length === 0) return [];

            const sortedDates = Array.from(new Set(dates.map(d => d.toISOString().split("T")[0])))
                .map(dateStr => new Date(dateStr))
                .sort((a, b) => a - b);

            const result = [];
            let start = sortedDates[0];
            let end = sortedDates[0];

            for (let i = 1; i < sortedDates.length; i++) {
                const current = sortedDates[i];
                const previous = sortedDates[i - 1];
                const diffInDays = (current - previous) / (1000 * 60 * 60 * 24);

                if (diffInDays === 1) {
                    end = current;
                } else {
                    result.push({
                        startDate: start.toISOString().split("T")[0],
                        endDate: new Date(end.getTime() + 86400000).toISOString().split("T")[0],
                    });
                    start = current;
                    end = current;
                }
            }

            result.push({
                startDate: start.toISOString().split("T")[0],
                endDate: new Date(end.getTime() + 86400000).toISOString().split("T")[0],
            });

            return result;
        }

        const reservedRanges = getReservedDateRanges(bookedDates);
        res.json(reservedRanges);

    } catch (err) {
        console.error("Error fetching booked dates:", err);
        res.status(500).json({ error: err.message });
    }
};

const getBookingsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Booking.find({ userId: id }).populate('suiteId').populate('userId');
        res.json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ error: "שגיאה בשליפת ההזמנות" });
    }
};

const updateBooking = async (req, res) => {
    await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(t => {
            if (!t)
                return res.status(404).json("Booking not found!")
            res.json({ "Booking updated": t })
        })
        .catch(error =>
            res.status(500).json({ "error in server": error })
        )
}

const deleteBooking = async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id, { new: true })
        .then(t => {
            if (t)
                res.send({ "Booking deleted!": t })
            else
                res.status(404).send("Booking not found")
        })
        .catch(err => res.status(500).send({ "error ! can't delete this Booking": err }))
}


module.exports = {
    addNewBooking,
    getAllBooking,
    getBookedDatesBySuiteId,
    getBookingsByUserId,
    updateBooking,
    deleteBooking
}