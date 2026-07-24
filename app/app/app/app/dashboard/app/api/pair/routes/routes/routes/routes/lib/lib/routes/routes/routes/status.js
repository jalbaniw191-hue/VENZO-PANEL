/**
 * VENZO-SERVER - System Instance Status Router
 */
const express = require('express');
const router = express.Router();
const { getWhatsAppStatus, getWhatsAppSocket } = require('../lib/whatsapp');

// GET /api/status
router.get('/', (req, res) => {
    const status = getWhatsAppStatus();
    const sock = getWhatsAppSocket();
    
    res.status(200).json({
        success: true,
        message: 'WhatsApp subsystem engine diagnostics metrics active',
        data: {
            connectionState: status,
            qrCodeActive: sock && sock.currentQR ? true : false,
            qrCodeString: sock ? sock.currentQR || null : null,
            deviceDetails: sock && sock.user ? sock.user : null
        }
    });
});

module.exports = router;
