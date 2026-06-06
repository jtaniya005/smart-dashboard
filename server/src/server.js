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

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Start HTTP server immediately so the process can boot on platforms
// like Render even if the DB connection is slow or failing.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB in background and log outcome.
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas Cloud Connected Successfully!');
  })
  .catch((err) => console.log('Database connection error: ', err));
