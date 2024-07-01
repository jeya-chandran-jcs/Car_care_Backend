const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const servicesRouter = require('./routes/services');
const bookingsRouter = require('./routes/bookings');
const userController = require('./controllers/userController');

const app = express();

app.use(cors());

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/services', servicesRouter);
app.use('/bookings', bookingsRouter);
app.use('/api/users/profile', userRoutes);

// Confirmation route

module.exports = app;