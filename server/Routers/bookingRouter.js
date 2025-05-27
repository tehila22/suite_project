const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/bookingController')

// יצירת הזמנה חדשה
router.post('/',bookingController.addNewBooking);
router.get('/',bookingController.getAllBooking);
router.delete('/:id',bookingController.deleteBooking);
router.get('/suite/:id',bookingController.getBookingBySuiteId);
router.get('/user/:id',bookingController.getBookingsByUserId);

module.exports = router;