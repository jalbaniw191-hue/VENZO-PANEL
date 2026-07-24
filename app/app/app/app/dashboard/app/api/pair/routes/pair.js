const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const { number } = req.body;

        if (!number) {

            return res.status(400).json({
                success: false,
                message: "Phone number is required."
            });

        }

        return res.json({
            success: true,
            number,
            status: "waiting",
            pairCode: "Generating..."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;
