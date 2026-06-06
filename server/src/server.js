require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS ko require karein
const leadRoutes = require('./routes/leadRoutes');

const app = express();

// Middleware
app.use(express.json());

// Sabhi domains (Vercel samet) se requests allow karne ke liye
app.use(cors()); 

// Routes
app.use('/api', leadRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas Cloud Connected Successfully!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log('Database connection error: ', err));
