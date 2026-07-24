const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and Password required."
        });
    }

    return res.json({
        success: true,
        message: "Login successful."
    });

});

module.exports = router;
