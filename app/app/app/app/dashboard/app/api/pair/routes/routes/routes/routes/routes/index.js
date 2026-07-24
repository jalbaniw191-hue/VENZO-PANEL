const express = require("express");
const cors = require("cors");
const pino = require("pino");
const path = require("path");

const config = require("./config");
const handler = require("./handler");

// Routes
const authRoute = require("./routes/auth");
const pairRoute = require("./routes/pair");
const statusRoute = require("./routes/status");
const dashboardRoute = require("./routes/dashboard");
const logsRoute = require("./routes/logs");

// WhatsApp
const { startWhatsApp } = require("./lib/whatsapp");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        bot: "VENZO-SERVER",
        version: config.VERSION,
        status: "ONLINE"
    });
});

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/pair", pairRoute);
app.use("/api/status", statusRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/logs", logsRoute);
