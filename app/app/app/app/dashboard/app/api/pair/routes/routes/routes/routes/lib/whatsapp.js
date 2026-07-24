/**
 * VENZO-SERVER - Core WhatsApp Engine (Baileys Latest Integration)
 * Responsibilities: Multi-File Auth, QR & Pairing Code, Status Tracking, Reconnection, Global Handler Parsing
 */

const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeCacheableSignalKeyStore,
    delay
} = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs');
const pino = require('pino');

// Core internal dependencies
const config = require('../config');
const handler = require('../handler');
const logger = require('./logger');

// Global Socket Instance & Connection Status References
let sock = null;
let connectionStatus = 'DISCONNECTED'; // CONNECTING, CONNECTED, DISCONNECTED, PAIRING

/**
 * Custom Minimalistic Pino Logger Adapter for internal Baileys operations
 * Filters heavy stream footprints to avoid logging clutter
 */
const baileysLogger = pino({ level: 'silent' });

/**
 * Returns the current active connection state status
 * @returns {string} Status representation ('CONNECTED', 'DISCONNECTED', etc.)
 */
const getWhatsAppStatus = () => {
    return connectionStatus;
};

/**
 * Returns the active WhatsApp Socket connection instance pointer
 * @returns {object|null} Baileys socket object reference
 */
const getWhatsAppSocket = () => {
    return sock;
};

/**
 * Initializes and loops the WhatsApp Web connection protocol stack
 * Handles Multi-File Authentication and runtime events orchestration
 */
const startWhatsApp = async () => {
    try {
        connectionStatus = 'CONNECTING';
        logger.info('Initializing WhatsApp Baileys runtime state tree engine...');

        // Verify and construct absolute multi-file state storage directories
        const sessionDirectory = path.join(__dirname, '../session');
        if (!fs.existsSync(sessionDirectory)) {
            fs.mkdirSync(sessionDirectory, { recursive: true });
        }

        // Setup native multi-file auth credentials persistence layer
        const { state, saveCreds } = await useMultiFileAuthState(sessionDirectory);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        
        logger.info({ version: version.join('.'), isLatest }, 'Fetched active Baileys server runtime version target');

        // Create main Baileys configurations
        sock = makeWASocket({
            version,
            logger: baileysLogger,
            printQRInTerminal: !config.usePairingCode, // Automatically falls back based on application configs
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, baileysLogger),
            },
            browser: ['VENZO-SERVER', 'Chrome', '1.0.0'],
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
            syncFullHistory: false
        });

        // Track and persist auth state changes securely 
        sock.ev.on('creds.update', async () => {
            await saveCreds();
            logger.info('WhatsApp operational state session changes saved successfully');
        });

        // Main Connection Pipeline Status Lifecycle Listener Loop
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr, receivedPendingNotifications } = update;

            if (qr) {
                logger.info('New WhatsApp verification QR Code string refresh sequence emitted');
                // Expose globally on server to pull into status routers dynamically
                sock.currentQR = qr; 
            }

            if (connection === 'connecting') {
                connectionStatus = 'CONNECTING';
                logger.info('Establishing handshake with secure WhatsApp cloud nodes...');
            }

            if (connection === 'open') {
                connectionStatus = 'CONNECTED';
                sock.currentQR = null; // Clear QR data cache safely
                logger.info({ 
                    jid: sock.user.id, 
                    name: sock.user.name 
                }, 'WhatsApp Core Engine Successfully Connected & Stream Active');
            }

            if (connection === 'close') {
                connectionStatus = 'DISCONNECTED';
                sock.currentQR = null;
                
                const statusCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
                const reasonDescription = Object.keys(DisconnectReason).find(key => DisconnectReason[key] === statusCode) || 'UNKNOWN_REASON';
                
                logger.error({ statusCode, reason: reasonDescription }, 'WhatsApp operational stream disconnected abruptly');

                // Evaluate standard disconnection reasons for auto-reconnection algorithms
                if (statusCode === DisconnectReason.loggedOut) {
                    logger.error('Session permanently terminated by client user request. Deleting cache store records...');
                    try {
                        fs.rmSync(sessionDirectory, { recursive: true, force: true });
                        logger.info('Corrupted configuration files dropped. Manual login setup needed');
                    } catch (cleanupError) {
                        logger.error('Failed processing isolated workspace data cleaning routine');
                    }
                } else {
                    logger.info(`Attempting crash sequence auto-recovery pipeline in 5000ms. Code: ${statusCode}`);
                    await delay(5000);
                    startWhatsApp(); // Recursively re-fire connection socket stack
                }
            }
        });

        // Operational Message Handler Pipeline Handshake Hook
        sock.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                if (!chatUpdate.messages || chatUpdate.type !== 'notify') return;

                for (const rawMessage of chatUpdate.messages) {
                    // Filter out outgoing self-echo transmissions if necessary
                    if (rawMessage.key.fromMe && config.ignoreSelfMessages) continue;

                    // Forward transaction contexts strictly to the central control framework handler
                    if (typeof handler === 'function') {
                        await handler(sock, rawMessage);
                    } else if (handler && typeof handler.handler === 'function') {
                        await handler.handler(sock, rawMessage);
                    }
                }
            } catch (messageParsingError) {
                logger.error({ err: messageParsingError }, 'Error occurred inside message upsert event dispatcher');
            }
        });

    } catch (bootstrapFatalException) {
        logger.error({ err: bootstrapFatalException }, 'Critical crash failure inside WhatsApp engine initialize scope');
        connectionStatus = 'DISCONNECTED';
        // Auto retry execution to counter temporary offline system environments
        setTimeout(startWhatsApp, 10000);
    }
};

/**
 * Requests an 8-character Pairing Code verification protocol for phone binding methods
 * @param {string} phoneNumber Absolute phone tracking profile sequence including country calling code
 * @returns {Promise<string>} Created 8-character confirmation protocol pairing index
 */
const requestPairingCode = async (phoneNumber) => {
    if (!sock) {
        throw new Error('WhatsApp Socket system pipeline instance down or currently unavailable');
    }
    
    connectionStatus = 'PAIRING';
    // Clean string format parameters input
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    try {
        logger.info({ target: cleanNumber }, 'Registering sequence tracking requests via Pairing Code verification loops');
        const confirmationCode = await sock.requestPairingCode(cleanNumber);
        return confirmationCode;
    } catch (pairingRequestError) {
        logger.error({ err: pairingRequestError.message }, 'Failed request execution tracking on Baileys pairing code pipeline');
        throw pairingRequestError;
    }
};

module.exports = {
    startWhatsApp,
    getWhatsAppStatus,
    getWhatsAppSocket,
    requestPairingCode
};
