/**
 * VENZO-SERVER - Persistent State Storage Controller Base Engine
 * Responsibilities: Handling workspace state configurations cache setups safely
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const dbFilePath = path.join(__dirname, '../public/database_store.json');

// Initialize underlying physical data storage arrays automatically on systems bootstrap
if (!fs.existsSync(dbFilePath)) {
    fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });
    fs.writeFileSync(dbFilePath, JSON.stringify({ users: {}, configurations: {}, systemMetrics: [] }, null, 4));
}

module.exports = {
    /**
     * Read completely safe structural datasets from application JSON system assets
     * @returns {object} Object content trees
     */
    readData: () => {
        try {
            const rawContent = fs.readFileSync(dbFilePath, 'utf-8');
            return JSON.parse(rawContent);
        } catch (readError) {
            logger.error({ err: readError.message }, 'Failed parsing structural workspace system files data arrays');
            return { users: {}, configurations: {}, systemMetrics: [] };
        }
    },

    /**
     * Write state system object configurations updates safely into localized store maps
     * @param {object} updatedDataObj - Modified JSON data context targets payload map
     */
    writeData: (updatedDataObj) => {
        try {
            fs.writeFileSync(dbFilePath, JSON.stringify(updatedDataObj, null, 4), 'utf-8');
            return true;
        } catch (writeError) {
            logger.error({ err: writeError.message }, 'Failed execution writing transaction on persistence memory arrays');
            return false;
        }
    }
};
