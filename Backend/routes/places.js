const express = require('express');
const Place = require('../models/Place');

const router = express.Router();

// @route   GET /api/places/search
// @desc    Search places by query (for autocomplete)
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }

    const places = await Place.searchPlaces(q.trim(), parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        places,
        count: places.length
      }
    });

  } catch (error) {
    console.error('Search places error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/places/popular
// @desc    Get popular destinations
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    const places = await Place.getPopularDestinations(parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        places,
        count: places.length
      }
    });

  } catch (error) {
    console.error('Get popular places error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/places/city/:city/:country
// @desc    Get all places in a specific city
// @access  Public
router.get('/city/:city/:country', async (req, res) => {
  try {
    const { city, country } = req.params;
    
    const places = await Place.getPlacesByCity(city, country);

    res.status(200).json({
      success: true,
      data: {
        places,
        count: places.length,
        city: city,
        country: country
      }
    });

  } catch (error) {
    console.error('Get places by city error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/places/categories
// @desc    Get all available categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Place.distinct('category');
    
    res.status(200).json({
      success: true,
      data: {
        categories
      }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/places/:id
// @desc    Get specific place by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    
    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        place
      }
    });

  } catch (error) {
    console.error('Get place by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
