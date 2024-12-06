const express = require('express');
const router = express.Router();
const { Company } = require('../models');

// Get all companies
router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get company by ID
router.get('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new company
router.post('/companies', async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update company
router.put('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        await company.update(req.body);
        res.json(company);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete company
router.delete('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        await company.destroy();
        res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;