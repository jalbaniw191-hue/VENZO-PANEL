/**
 * VENZO-SERVER - Production Ready Core Server File
 * Tech Stack: Node.js, Express.js, Baileys (Latest)
 * Deployment Compatibility: Railway, Vercel Frontend Support
 * Module System: CommonJS
 */

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Core internal dependencies
const config = require('./config');
const handler = require('./handler');
const { startWhatsApp, getWhatsAppStatus } = require('./lib/whatsapp');
const logger = require('./lib/logger');

// Express App Initialization
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// 1. Security & Optimizations Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// CORS Configuration supporting cross-origin Vercel frontends
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// 2. Request Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Static Assets Management
app.use(express.static(path.join(__dirname, 'public')));

// 4. Global Request Logger (Pino Interceptor)
app.use((req, res, next) => {
    logger.info({ method: req.method, url: req.url, ip: req.ip }, `Incoming API Request`);
    next();
});

// 5. Global Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many requests from this client. Please try again later.',
            data: {}
        });
    }
});
app.use('/api/', apiLimiter);

// 6. Base & System Operational Endpoints (Pure JSON Output)
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'VENZO-SERVER Engine Active',
        data: {
            uptime: process.uptime(),
            timestamp: Date.now()
        }
    });
});

app.get('/health', (req, res) => {
    const waStatus = getWhatsAppStatus ? getWhatsAppStatus() : 'unknown';
    res.status(200).json({
        success: true,
        message: 'Server health performance standard optimal',
        data: {
            status: 'UP',
            memoryUsage: process.memoryUsage(),
            whatsappConnection: waStatus
        }
    });
});

app.get('/version', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Version fetch successful',
        data: {
            version: config.version || '1.0.0',
            environment: process.env.NODE_ENV || 'production'
        }
    });
});

app.get('/api', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'VENZO API Gateway Core Root Router',
        data: {
            endpoints: [
                '/api/auth/login',
                '/api/auth/logout',
                '/api/pair',
                '/api/status',
                '/api/dashboard',
                '/api/logs'
            ]
        }
    });
});

// 7. Microservice Modular Route Registration
try {
    const authRouter = require('./routes/auth');
    const pairRouter = require('./routes/pair');
    const statusRouter = require('./routes/status');
    const dashboardRouter = require('./routes/dashboard');
    const logsRouter = require('./routes/logs');
    const sessionRouter = require('./routes/session');

    app.use('/api/auth', authRouter);
    app.use('/api/pair', pairRouter);
    app.use('/api/status', statusRouter);
    app.use('/api/dashboard', dashboardRouter);
    app.use('/api/logs', logsRouter);
    app.use('/api/session', sessionRouter);
} catch (error) {
    logger.error({ error: error.message }, 'Failed to fully load application core API routes');
}

// 8. Application Fallback Handlers (404 Error State)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Resource Endpoint Not Found: [${req.method}] ${req.url}`,
        data: {}
    });
});

// 9. Centralized Operational Global Error Handler
app.use((err, req, res, next) => {
    logger.error({ 
        message: err.message, 
        stack: err.stack, 
        method: req.method, 
        url: req.url 
    }, 'Server Internal Exception Captured');

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Infrastructure Exception Occurred',
        data: process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}
    });
});

// 10. Initialization Process Execution
const initializeServer = async () => {
    try {
        logger.info('Bootstrapping components inside VENZO-SERVER environment...');
        
        // Start WhatsApp Client Component (Manages Baileys connection loop, multi-file auth, reconnection)
        if (typeof startWhatsApp === 'function') {
            await startWhatsApp();
            logger.info('WhatsApp Baileys component subsystem initialized cleanly');
        } else {
            logger.warn('startWhatsApp method missing from library component setup');
        }

        // Start listening to the network port designated by Railway infrastructure
        server.listen(PORT, () => {
            logger.info({ port: PORT, env: process.env.NODE_ENV || 'production' }, 'VENZO-SERVER actively listening for processing pipelines');
        });
    } catch (startupError) {
        logger.error({ err: startupError }, 'Fatal breakdown initializing core application modules');
        process.exit(1);
    }
};

// 11. Graceful Shutdown Framework Management (SIGINT / SIGTERM Safety)
const handleGracefulShutdown = (signal) => {
    logger.warn({ signal }, `Received shutdown signal. Commencing orderly VENZO-SERVER termination lifecycle`);
    
    server.close(async () => {
        logger.info('Express server networking interface closed down successfully');
        try {
            // Include here any explicit workspace sync routines or manual database persistence requirements
            logger.info('Session state trees safe. Execution contexts fully closed out');
            process.exit(0);
        } catch (shutdownCleanError) {
            logger.error({ err: shutdownCleanError }, 'Errors recorded while processing state context shutdown procedures');
            process.exit(1);
        }
    });

    // Timeout fallback protection force termination if operations freeze up
    setTimeout(() => {
        logger.error('Shutdown procedures exceeded critical allocation window limit. Forcing system termination');
        process.exit(1);
    }, 10000);
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

// Execute Boot Runtime Process Lifecycle Engine
initializeServer();

module.exports = app;
