const pool = require('../config/db');
const calculateDistance = require('../utils/distance');

/**
 * Add a new school to the database
 */
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Input validation
    if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required (name, address, latitude, longitude)' 
      });
    }

    // Validate latitude and longitude are numbers within valid ranges
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      return res.status(400).json({ 
        success: false, 
        message: 'Latitude must be a number between -90 and 90' 
      });
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      return res.status(400).json({ 
        success: false, 
        message: 'Longitude must be a number between -180 and 180' 
      });
    }

    // Insert the school into the database
    const [result] = await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude
      }
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding school' 
    });
  }
};

/**
 * List all schools sorted by proximity to the user's location
 */
const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Input validation
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'User coordinates are required (latitude, longitude)' 
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Validate latitude and longitude are numbers within valid ranges
    if (isNaN(userLat) || userLat < -90 || userLat > 90) {
      return res.status(400).json({ 
        success: false, 
        message: 'Latitude must be a number between -90 and 90' 
      });
    }

    if (isNaN(userLon) || userLon < -180 || userLon > 180) {
      return res.status(400).json({ 
        success: false, 
        message: 'Longitude must be a number between -180 and 180' 
      });
    }

    // Get all schools from the database
    const [schools] = await pool.query('SELECT * FROM schools');

    // Calculate distance for each school and add it as a property
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat, userLon, 
        school.latitude, school.longitude
      );
      return { ...school, distance };
    });

    // Sort schools by distance (ascending order)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while listing schools' 
    });
  }
};

module.exports = {
  addSchool,
  listSchools
}; 