const express = require('express');
const router = express.Router();
const Booking = require('../Models/Booking');

// יצירת הזמנה חדשה
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "שגיאה ביצירת ההזמנה" });
  }
});

module.exports = router;
