const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/database');

// Import seed data
const { seedPlaces } = require('./data/placesSeed');

// Import routes
const authRoutes = require('./routes/auth');
const placesRoutes = require('./routes/places');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/places', placesRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'Travel Itinerary API is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Seed data route (for development)
app.post('/api/seed/places', async (req, res) => {
  try {
    const places = await seedPlaces();
    res.status(200).json({
      success: true,
      message: 'Places seeded successfully',
      data: {
        count: places.length
      }
    });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding places'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
});
