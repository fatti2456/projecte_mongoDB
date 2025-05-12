import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import vetRoutes from './routes/vetRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import visitRoutes from './routes/visitRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/vets', vetRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/visits', visitRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('VetCare 360 API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});