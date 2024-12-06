const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');
const applicationRoutes = require('./applicationRoutes');
const interviewRoutes = require('./interviewRoutes');
const savedJobRoutes = require('./savedJobRoutes');

// Specify base paths for each module
router.use('/auth', (req, res, next) => {
    console.log('Auth route accessed');
    next();
}, userRoutes); // `/api/auth/...`
router.use('/companies', companyRoutes); // `/api/companies/...`
router.use('/applications', applicationRoutes); // `/api/applications/...`
router.use('/interviews', interviewRoutes); // `/api/interviews/...`
router.use('/saved-jobs', savedJobRoutes); // `/api/saved-jobs/...`


module.exports = router;
