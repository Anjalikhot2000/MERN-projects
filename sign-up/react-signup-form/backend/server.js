require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes'); // Import routes

const app = express();
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-domain.vercel.app'], // Allow localhost and Vercel
  methods: ['GET', 'POST'],
  credentials: true, // If needed for authentication cookies
}));
app.use(express.json());

// Routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
