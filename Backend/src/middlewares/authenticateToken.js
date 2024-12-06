const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, 'your-secret-key');
        req.user = verified; // Attach user info to request
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};

module.exports = authenticateToken;
