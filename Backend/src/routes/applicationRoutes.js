const express = require('express');
const router = express.Router();
const { Application, Company, Interview } = require('../models');

// Get all applications
router.get('/applications', async (req, res) => {
    try {
        const applications = await Application.findAll({
            include: [Company, Interview]
        });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get application by ID
router.get('/applications/:id', async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id, {
            include: [Company, Interview]
        });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new application
router.post('/', async (req, res) => {
    try {
        const application = await Application.create(req.body);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update application
router.put('/applications/:id', async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        await application.update(req.body);
        res.json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete application
router.delete('/applications/:id', async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        await application.destroy();
        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;