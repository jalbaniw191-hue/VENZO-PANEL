/**
 * VENZO-SERVER - Dynamic Command Menu Builder Module
 */

module.exports = {
    /**
     * Builds and returns a beautifully structured text configuration for users
     * @param {string} prefix - The active parsed character symbol detected
     * @returns {string} Fully visual textual catalog layout
     */
    getMenu: (prefix) => {
        const symbol = prefix || '.';
        return `*🤖 VENZO-SERVER AUTOMATION ENGINE*

👋 Hello! Welcome to the VENZO interface system.

*📋 CORE COMMANDS CATALOG:*
• ${symbol}menu - Display this help framework system UI
• ${symbol}help - Display this help framework system UI
• ${symbol}ping - Test automation runtime network latency speeds
• ${symbol}status - Check server diagnostics metrics

*🛡️ SYSTEM SPECIFICATION:*
• *Platform:* Node.js Framework Environment
• *Connection:* Stable via Baileys Multi-Device Core
• *Deployment:* Railway Standard Cloud Infrastructure

_Type any command listed above to execute internal tasks directly._`;
    }
};
