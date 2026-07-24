const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,

        server: "ONLINE",

        whatsapp: "DISCONNECTED",

        bot: "VENZO-SERVER",

        version: "1.0.0",

        commands: "200+",

        owner: "Waseem"

    });

});

module.exports = router;
