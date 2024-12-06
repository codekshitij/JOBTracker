const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/config/database'); // Updated path for config
const routes = require('./src/routes');     // Updated path for routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server setup
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.authenticate();
    console.log('Database connection established successfully.');
    
    await db.sync({ alter: true });
    console.log('Database synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
