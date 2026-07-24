const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    const uptime = process.uptime();

    res.json({
        success: true,
        server: "online",
        bot: "starting",
        whatsapp: "disconnected",
        uptime: Math.floor(uptime),
        version: "1.0.0"
    });

});

module.exports = router;
