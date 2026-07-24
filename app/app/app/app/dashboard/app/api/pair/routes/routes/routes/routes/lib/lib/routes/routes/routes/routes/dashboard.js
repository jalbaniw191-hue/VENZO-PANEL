/**
 * VENZO-SERVER - Realtime Resource Metrics Dashboard Router
 */
const express = require('express');
const router = express.Router();
const { getWhatsAppStatus } = require('../lib/whatsapp');

// GET /api/dashboard
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Dashboard core statistics profiles telemetry generated',
        data: {
            platform: process.platform,
            nodeVersion: process.version,
            systemUptime: process.uptime(),
            memoryLayout: process.memoryUsage(),
            whatsappEngineState: getWhatsAppStatus()
        }
    });
});

module.exports = router;
