const express = require('express');
const router = express.Router();
const { SavedJob } = require('../models');

// Get all saved jobs
router.get('/saved-jobs', async (req, res) => {
    try {
        const savedJobs = await SavedJob.findAll();
        res.json(savedJobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific saved job by ID
router.get('/saved-jobs/:id', async (req, res) => {
    try {
        const savedJob = await SavedJob.findByPk(req.params.id);
        if (!savedJob) {
            return res.status(404).json({ message: 'Saved job not found' });
        }
        res.json(savedJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new saved job
router.post('/saved-jobs', async (req, res) => {
    try {
        const savedJob = await SavedJob.create(req.body);
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an existing saved job
router.put('/saved-jobs/:id', async (req, res) => {
    try {
        const savedJob = await SavedJob.findByPk(req.params.id);
        if (!savedJob) {
            return res.status(404).json({ message: 'Saved job not found' });
        }
        await savedJob.update(req.body);
        res.json(savedJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a saved job
router.delete('/saved-jobs/:id', async (req, res) => {
    try {
        const savedJob = await SavedJob.findByPk(req.params.id);
        if (!savedJob) {
            return res.status(404).json({ message: 'Saved job not found' });
        }
        await savedJob.destroy();
        res.json({ message: 'Saved job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
