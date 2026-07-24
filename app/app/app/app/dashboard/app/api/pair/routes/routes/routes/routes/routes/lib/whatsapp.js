const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");

let sock = null;

async function startWhatsApp() {

    const { state, saveCreds } =
    await useMultiFileAuthState("./session");

    sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection }) => {

        if (connection === "open") {
            console.log("✅ WhatsApp Connected");
        }

        if (connection === "close") {
            console.log("❌ WhatsApp Disconnected");
        }

    });

    return sock;
}

function getSocket() {
    return sock;
}

module.exports = {
    startWhatsApp,
    getSocket
};
