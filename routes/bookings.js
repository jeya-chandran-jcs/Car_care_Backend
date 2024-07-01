const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/authMiddleware');

// Define a route for creating bookings
router.post('/', authMiddleware.verifyToken, async (req, res) => {
  try {
    console.log('User in bookings route:', req.user);
    const userId = req.user ? req.user._id : null;

    if (!userId) {
      console.error('User not authenticated');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const bookingId = uuidv4();
    const requestData = req.body;

    console.log('Received Booking Data:', requestData);

    // Convert service IDs to ObjectIds (assuming requestData.service is an array of string-based ObjectIds)
    requestData.service = requestData.service.map((id) => new mongoose.Types.ObjectId(id));

    // Create a new booking record
    const newBooking = new Booking({
      bookingId,
      userId,
      ...requestData,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    res.status(201).json({ bookingId, booking: savedBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/confirmation/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    console.log('Fetching confirmation data for bookingId:', bookingId);

    const booking = await Booking.findOne({ bookingId });

    console.log('Confirmation data:', booking);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      bookingId: booking.bookingId,
      serviceTitle: booking.service.title,
      name: booking.name,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      district: booking.district,
      date: booking.date,
    });
  } catch (error) {
    console.error('Error fetching confirmation data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
