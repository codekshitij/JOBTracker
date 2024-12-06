const express = require('express');
const router = express.Router();
const { Interview, Application } = require('../models');

// Get all interviews
router.get('/interviews', async (req, res) => {
    try {
        const interviews = await Interview.findAll({
            include: [Application]
        });
        res.json(interviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get interview by ID
router.get('/interviews/:id', async (req, res) => {
    try {
        const interview = await Interview.findByPk(req.params.id, {
            include: [Application]
        });
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }
        res.json(interview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new interview
router.post('/interviews', async (req, res) => {
    try {
        const interview = await Interview.create(req.body);
        res.status(201).json(interview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update interview
router.put('/interviews/:id', async (req, res) => {
    try {
        const interview = await Interview.findByPk(req.params.id);
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }
        await interview.update(req.body);
        res.json(interview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete interview
router.delete('/interviews/:id', async (req, res) => {
    try {
        const interview = await Interview.findByPk(req.params.id);
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }
        await interview.destroy();
        res.json({ message: 'Interview deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;