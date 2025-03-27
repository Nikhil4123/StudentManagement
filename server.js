/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./config/initDb');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const schoolRoutes = require('./routes/schoolRoutes');

// API routes
app.use('/api', schoolRoutes);


app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to School Management API',
    endpoints: {
      addSchool: 'POST /api/addSchool',
      listSchools: 'GET /api/listSchools'
    }
  });
});


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 