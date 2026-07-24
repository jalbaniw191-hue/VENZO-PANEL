/**
 * VENZO-SERVER - WhatsApp Device Pairing Router
 */
const express = require('express');
const router = express.Router();
const { requestPairingCode } = require('../lib/whatsapp');

// POST /api/pair
router.post('/', async (req, res, next) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({
            success: false,
            message: 'Phone number data attribute sequence is required',
            data: {}
        });
    }

    try {
        const code = await requestPairingCode(phoneNumber);
        return res.status(200).json({
            success: true,
            message: 'Pairing authentication code generated successfully',
            data: { pairingCode: code }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
