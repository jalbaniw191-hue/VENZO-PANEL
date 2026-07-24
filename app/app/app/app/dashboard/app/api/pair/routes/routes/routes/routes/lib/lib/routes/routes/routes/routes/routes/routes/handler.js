/**
 * VENZO-SERVER - Core WhatsApp Message and Command Event Handler
 * Responsibilities: Message parsing, command execution filtering, and response dispatching
 */

const logger = require('./lib/logger');
const menu = require('./menu');
const { getWhatsAppSocket } = require('./lib/whatsapp');

/**
 * Global Message Receiver and Process Routing Logic
 * @param {object} sock - Active Baileys socket connection instance
 * @param {object} msg - Raw WhatsApp message event payload object
 */
const handler = async (sock, msg) => {
    try {
        // Message configurations layout setup
        if (!msg.message) return;
        
        const id = msg.key.remoteJid;
        const fromMe = msg.key.fromMe;
        const isGroup = id.endsWith('@g.us');
        
        // Extract plain text payload from multiple potential Baileys message structures
        const messageType = Object.keys(msg.message)[0];
        let body = '';

        if (messageType === 'conversation') {
            body = msg.message.conversation;
        } else if (messageType === 'extendedTextMessage') {
            body = msg.message.extendedTextMessage.text;
        } else if (messageType === 'imageMessage') {
            body = msg.message.imageMessage.caption;
        } else if (messageType === 'videoMessage') {
            body = msg.message.videoMessage.caption;
        }

        // Clean user input structure properties
        const senderText = body ? body.trim() : '';
        if (!senderText) return;

        // Command detection configurations setup (e.g. using '/' or '.')
        const prefix = /^[./!#]/gi.test(senderText) ? senderText.match(/^[./!#]/gi)[0] : '';
        const isCmd = senderText.startsWith(prefix) && prefix !== '';
        const command = isCmd ? senderText.slice(prefix.length).trim().split(' ')[0].toLowerCase() : '';
        const args = senderText.trim().split(' ').slice(1);

        logger.info({ jid: id, isCmd, command, fromMe }, 'Processing WhatsApp message stream transaction event');

        // Dynamic functional command router engine tree routing mapping switch
        if (isCmd) {
            switch (command) {
                case 'menu':
                case 'help':
                case 'start':
                    const menuText = menu.getMenu(prefix);
                    await sock.sendMessage(id, { text: menuText }, { quoted: msg });
                    break;

                case 'ping':
                    const latency = Date.now() - (msg.messageTimestamp * 1000);
                    await sock.sendMessage(id, { text: `*🚀 Pong!* Latency: _${latency}ms_` }, { quoted: msg });
                    break;

                case 'status':
                    await sock.sendMessage(id, { 
                        text: `*📊 VENZO-SERVER SYSTEM STATUS*\n\n• *Uptime:* ${Math.floor(process.uptime())}s\n• *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n• *Environment:* ${process.env.NODE_ENV || 'production'}` 
                    }, { quoted: msg });
                    break;

                default:
                    // Optional default capture route
                    break;
            }
        }

    } catch (handlerError) {
        logger.error({ err: handlerError.message, stack: handlerError.stack }, 'Error processing message context pipeline event execution');
    }
};

module.exports = handler;
