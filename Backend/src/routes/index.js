const express = require('express');
const router = express.Router();
const { User, Company, Application } = require('../models');

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Applications routes
router.post('/applications', async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [Company]
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;