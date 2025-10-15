const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { authenticateToken } = require('../middleware/auth');
const OpenAI = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a new trip and generate itinerary
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { destination, startDate, endDate, adults, children, interests } = req.body;

    // Validate required fields
    if (!destination || !startDate || !endDate || !adults || !interests) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Calculate total days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    // Create trip record
    const trip = new Trip({
      userId: req.user.id,
      destination: {
        name: destination.name || destination,
        country: destination.country,
        coordinates: destination.coordinates
      },
      startDate: start,
      endDate: end,
      adults: parseInt(adults),
      children: parseInt(children) || 0,
      interests,
      totalDays,
      status: 'generating'
    });

    await trip.save();

    // Generate itinerary using OpenAI
    try {
      const itinerary = await generateItineraryWithAI({
        destination: trip.destination.name,
        startDate: trip.startDate,
        endDate: trip.endDate,
        adults: trip.adults,
        children: trip.children,
        interests: trip.interests
      });

      // Update trip with generated itinerary
      trip.itinerary = itinerary;
      trip.status = 'planned';
      await trip.save();

      res.status(201).json({
        success: true,
        message: 'Trip created and itinerary generated successfully',
        data: { trip }
      });

    } catch (aiError) {
      console.error('OpenAI Error:', aiError);
      
      // Update trip status to indicate AI generation failed
      trip.status = 'draft';
      await trip.save();

      res.status(201).json({
        success: true,
        message: 'Trip created successfully, but AI itinerary generation failed. You can edit it manually.',
        data: { trip },
        warning: 'AI generation failed, please try again later'
      });
    }

  } catch (error) {
    console.error('Trip creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create trip',
      error: error.message
    });
  }
});

// Get all trips for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select('-itinerary'); // Exclude detailed itinerary for list view

    res.json({
      success: true,
      data: { trips }
    });
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trips',
      error: error.message
    });
  }
});

// Get specific trip details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const trip = await Trip.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: { trip }
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trip',
      error: error.message
    });
  }
});

// Update trip
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      message: 'Trip updated successfully',
      data: { trip }
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trip',
      error: error.message
    });
  }
});

// Delete trip
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id 
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete trip',
      error: error.message
    });
  }
});

// Regenerate itinerary for existing trip
router.post('/:id/regenerate', authenticateToken, async (req, res) => {
  try {
    const trip = await Trip.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    // Update status to generating
    trip.status = 'generating';
    await trip.save();

    try {
      const itinerary = await generateItineraryWithAI({
        destination: trip.destination.name,
        startDate: trip.startDate,
        endDate: trip.endDate,
        adults: trip.adults,
        children: trip.children,
        interests: trip.interests
      });

      // Update trip with new itinerary
      trip.itinerary = itinerary;
      trip.status = 'planned';
      await trip.save();

      res.json({
        success: true,
        message: 'Itinerary regenerated successfully',
        data: { trip }
      });

    } catch (aiError) {
      console.error('OpenAI Error:', aiError);
      trip.status = 'planned'; // Keep previous status
      await trip.save();

      res.status(500).json({
        success: false,
        message: 'Failed to regenerate itinerary',
        error: 'AI generation failed, please try again later'
      });
    }

  } catch (error) {
    console.error('Regenerate itinerary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to regenerate itinerary',
      error: error.message
    });
  }
});

// OpenAI Integration Function
async function generateItineraryWithAI({ destination, startDate, endDate, adults, children, interests }) {
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;
  
  // Limit to 10 days to prevent token limit issues
  const daysToGenerate = Math.min(totalDays, 10);
  
  const prompt = `${daysToGenerate} days in ${destination}. ${adults} adults${children > 0 ? `, ${children} kids` : ''}. ${interests}

JSON array:
[{"dayNumber":1,"activities":[{"time":"09:00","activity":"Place","duration":"2h","type":"sightseeing","location":"Area","description":"Short","cost":25}],"accommodation":"Hotel","transportation":"Method","meals":{"breakfast":"Place","lunch":"Place","dinner":"Place"},"notes":"Tips"}]

Keep it brief. Types: sightseeing,dining,entertainment,cultural,adventure,relaxation,shopping,transportation,leisure,nature,beach,museum,market,spa,other`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional travel planner. Create detailed, personalized itineraries based on traveler preferences. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4096,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    
    // Clean the response - remove any markdown formatting
    let cleanResponse = response.trim();
    if (cleanResponse.startsWith('```json')) {
      cleanResponse = cleanResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
    }
    if (cleanResponse.startsWith('```')) {
      cleanResponse = cleanResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
    }
    
    // Check if response was truncated (more lenient check)
    if (!cleanResponse.endsWith('}') && !cleanResponse.endsWith(']') && !cleanResponse.endsWith('"')) {
      console.warn('Response might be truncated');
      console.warn('Response length:', cleanResponse.length);
      console.warn('Last 100 characters:', cleanResponse.slice(-100));
      // Don't throw error, try to parse anyway
    }
    
    // Parse the JSON response
    let itinerary;
    try {
      itinerary = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response length:', response.length);
      console.error('Last 200 characters of response:', response.slice(-200));
      
      // Try to fix common JSON issues
      try {
        // Remove any trailing commas or incomplete objects
        let fixedResponse = cleanResponse
          .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
          .replace(/([^"])\s*$/, '$1') // Remove trailing whitespace
          .replace(/,\s*}/g, '}') // Remove comma before closing brace
          .replace(/,\s*]/g, ']'); // Remove comma before closing bracket
        
        // If it doesn't end with } or ], try to close it
        if (!fixedResponse.endsWith('}') && !fixedResponse.endsWith(']')) {
          if (fixedResponse.includes('"itinerary"')) {
            fixedResponse += '}';
          } else {
            fixedResponse += ']';
          }
        }
        
        console.log('Attempting to parse fixed response...');
        itinerary = JSON.parse(fixedResponse);
        console.log('Successfully parsed fixed response');
      } catch (fixError) {
        console.error('Failed to fix JSON:', fixError);
        throw new Error('Failed to parse AI response as JSON');
      }
    }
    
    // Validate and format the response
    console.log('Parsed itinerary type:', typeof itinerary);
    console.log('Is array:', Array.isArray(itinerary));
    console.log('Itinerary structure:', JSON.stringify(itinerary, null, 2));
    
    // Handle different response formats
    let itineraryArray;
    if (Array.isArray(itinerary)) {
      itineraryArray = itinerary;
    } else if (itinerary && itinerary.itinerary && Array.isArray(itinerary.itinerary)) {
      itineraryArray = itinerary.itinerary;
    } else if (itinerary && typeof itinerary === 'object') {
      // If it's an object with day properties, convert to array
      itineraryArray = Object.values(itinerary).filter(item => 
        item && typeof item === 'object' && item.dayNumber
      );
    } else {
      console.error('Unexpected itinerary format:', itinerary);
      throw new Error('AI response is not in expected format');
    }
    
    console.log('Extracted itinerary array length:', itineraryArray ? itineraryArray.length : 0);
    
    if (itineraryArray && itineraryArray.length > 0) {
      return itineraryArray.map((day, index) => ({
        dayNumber: day.dayNumber || index + 1,
        date: new Date(startDate.getTime() + (index * 24 * 60 * 60 * 1000)),
        activities: day.activities || [],
        accommodation: day.accommodation || 'Hotel TBD',
        transportation: day.transportation || 'Transportation TBD',
        meals: day.meals || {},
        notes: day.notes || ''
      }));
    }
    
    throw new Error('No valid itinerary data found in AI response');
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate itinerary with AI');
  }
}

module.exports = router;
