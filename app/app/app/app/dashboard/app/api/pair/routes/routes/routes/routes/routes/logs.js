const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,

        logs: [
            "🚀 VENZO-SERVER Started",
            "📡 Waiting for WhatsApp Connection",
            "🌐 API Ready"
        ]

    });

});

module.exports = router;
