const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { authenticateToken } = require('../middleware/auth');

// @route   GET /api/activities
// @desc    Get all activities with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      city,
      country,
      maxCost,
      minRating,
      limit = 20,
      page = 1
    } = req.query;

    let query = { isActive: true };

    // Apply filters
    if (category) {
      query.category = category;
    }
    if (city) {
      query['location.city'] = city.toLowerCase();
    }
    if (country) {
      query['location.country'] = country.toLowerCase();
    }
    if (maxCost !== undefined) {
      query['cost.amount'] = { $lte: parseFloat(maxCost) };
    }
    if (minRating !== undefined) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Apply search
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { 'location.name': searchRegex },
        { 'location.city': searchRegex },
        { tags: { $in: [searchRegex] } },
        { searchKeywords: { $in: [searchRegex] } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const activities = await Activity.find(query)
      .sort({ isPopular: -1, rating: -1, name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Activity.countDocuments(query);

    res.json({
      success: true,
      data: {
        activities,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities'
    });
  }
});

// @route   GET /api/activities/search
// @desc    Search activities with advanced filters
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const {
      q: query,
      category,
      city,
      country,
      maxCost,
      minRating,
      limit = 20
    } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const filters = {
      category,
      city,
      country,
      maxCost: maxCost ? parseFloat(maxCost) : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined
    };

    const activities = await Activity.searchActivities(query, filters, parseInt(limit));

    res.json({
      success: true,
      data: {
        activities,
        query,
        filters
      }
    });
  } catch (error) {
    console.error('Error searching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching activities'
    });
  }
});

// @route   GET /api/activities/city/:city/:country
// @desc    Get activities by city and country
// @access  Public
router.get('/city/:city/:country', async (req, res) => {
  try {
    const { city, country } = req.params;
    const { category } = req.query;

    const activities = await Activity.getActivitiesByCity(city, country, category);

    res.json({
      success: true,
      data: {
        activities,
        location: { city, country }
      }
    });
  } catch (error) {
    console.error('Error fetching activities by city:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities by city'
    });
  }
});

// @route   GET /api/activities/category/:category
// @desc    Get activities by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 20 } = req.query;

    const activities = await Activity.getActivitiesByCategory(category, parseInt(limit));

    res.json({
      success: true,
      data: {
        activities,
        category
      }
    });
  } catch (error) {
    console.error('Error fetching activities by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities by category'
    });
  }
});

// @route   GET /api/activities/popular
// @desc    Get popular activities
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const activities = await Activity.getPopularActivities(parseInt(limit));

    res.json({
      success: true,
      data: {
        activities
      }
    });
  } catch (error) {
    console.error('Error fetching popular activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching popular activities'
    });
  }
});

// @route   GET /api/activities/categories
// @desc    Get all available categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Activity.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: {
        categories: categories.sort()
      }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
});

// @route   GET /api/activities/cities
// @desc    Get all available cities
// @access  Public
router.get('/cities', async (req, res) => {
  try {
    const cities = await Activity.distinct('location.city', { isActive: true });
    
    res.json({
      success: true,
      data: {
        cities: cities.sort()
      }
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cities'
    });
  }
});

// @route   GET /api/activities/:id
// @desc    Get single activity by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      data: {
        activity
      }
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activity'
    });
  }
});

// @route   POST /api/activities
// @desc    Create new activity (Admin only)
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin (you can implement admin check based on your user model)
    // For now, we'll allow any authenticated user to create activities
    
    const activity = new Activity(req.body);
    await activity.save();

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: {
        activity
      }
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating activity',
      error: error.message
    });
  }
});

// @route   PUT /api/activities/:id
// @desc    Update activity (Admin only)
// @access  Private
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      message: 'Activity updated successfully',
      data: {
        activity
      }
    });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating activity',
      error: error.message
    });
  }
});

// @route   DELETE /api/activities/:id
// @desc    Delete activity (Admin only)
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting activity'
    });
  }
});

// @route   PATCH /api/activities/:id/toggle-status
// @desc    Toggle activity active status (Admin only)
// @access  Private
router.patch('/:id/toggle-status', authenticateToken, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    activity.isActive = !activity.isActive;
    await activity.save();

    res.json({
      success: true,
      message: `Activity ${activity.isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        activity
      }
    });
  } catch (error) {
    console.error('Error toggling activity status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling activity status'
    });
  }
});

module.exports = router;
