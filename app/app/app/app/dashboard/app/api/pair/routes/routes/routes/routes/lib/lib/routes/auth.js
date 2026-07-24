/**
 * VENZO-SERVER - Authentication Gateway Router
 */
const express = require('express');
const router = express.Router();
const config = require('../config');

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === config.adminUsername && password === config.adminPassword) {
        return res.status(200).json({
            success: true,
            message: 'Authentication operational handshake successful',
            data: { token: config.apiSecretToken }
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid administrative credential configurations provided',
        data: {}
    });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Session dropped and cleared down successfully',
        data: {}
    });
});

module.exports = router;
