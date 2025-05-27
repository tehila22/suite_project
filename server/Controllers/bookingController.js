const Booking = require('../Models/Booking')

const addNewBooking =  async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "שגיאה ביצירת ההזמנה" });
  }
}

const getAllBooking= async (req,res) =>{
    await Booking.find().populate('userId').populate('suiteId')
    .then(result=>res.send(result))
    .catch(err=> res.status(400).json({"Error":err}))
}

const getBookingBySuiteId = async (req, res) => {
    const  suiteId = req.params.id; 
    console.log(suiteId);
    
    try {
        const booking = await Booking.find({ suiteId: suiteId }).populate('userId').populate('suiteId');
        console.log(booking);

        if (booking.length === 0) {
            return res.status(404).send("No booking found for this suite.");
        }
        res.json(booking);
    } catch (err) {
        console.error("Error fetching booking:", err);
        res.status(500).json({ "Error": err });
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

const updateBooking =async (req,res)=>{
    await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(t=>{
        if(!t)
            return res.status(404).json("Booking not found!")
        res.json({"Booking updated":t})
    })
    .catch(error=>
        res.status(500).json({"error in server":error})
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
    getBookingBySuiteId,
    getBookingsByUserId,
    updateBooking,
    deleteBooking
}