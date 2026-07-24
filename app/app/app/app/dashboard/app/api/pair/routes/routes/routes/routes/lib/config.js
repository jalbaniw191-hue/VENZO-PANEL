/**
 * VENZO-SERVER - Global Configuration Options
 */
require('dotenv').config();

module.exports = {
    version: '1.0.0',
    env: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 3000,
    
    // Auth Configurations
    apiSecretToken: process.env.API_SECRET_TOKEN || 'venzo_secret_default_token_key',
    adminUsername: process.env.ADMIN_USERNAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || 'venzo@admin123',
    
    // WhatsApp Engine Behavior
    usePairingCode: process.env.USE_PAIRING_CODE === 'true', // true = Code, false = QR
    ignoreSelfMessages: process.env.IGNORE_SELF_MESSAGES === 'true'
};
