/**
 * VENZO-SERVER - Session State Isolation Management Router
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { getWhatsAppStatus } = require('../lib/whatsapp');

// GET /api/session
router.get('/', (req, res) => {
    const sessionDir = path.join(__dirname, '../session');
    const secureStorageExists = fs.existsSync(sessionDir) && fs.readdirSync(sessionDir).length > 0;

    res.status(200).json({
        success: true,
        message: 'Authentication session metadata check complete',
        data: {
            sessionConfigured: secureStorageExists,
            activeSessionStatus: getWhatsAppStatus()
        }
    });
});

module.exports = router;
