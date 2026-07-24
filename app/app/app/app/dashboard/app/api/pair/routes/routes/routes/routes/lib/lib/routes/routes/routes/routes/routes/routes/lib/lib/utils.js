/**
 * VENZO-SERVER - Core Application Shared Utility Helper Microservices
 */

module.exports = {
    /**
     * Clean and convert phone numbers string inputs directly into structured parameters string format
     * @param {string} rawInput - Text data sequences contain phone parameters
     * @returns {string} Parsed plain string representation numeric layout format output
     */
    formatPhoneNumber: (rawInput) => {
        if (!rawInput) return '';
        return rawInput.replace(/[^0-9]/g, '');
    },

    /**
     * Custom standard text payload payload sanitization filtering validation protection algorithms
     * @param {string} dirtyText - Unsanitized source parameters text element
     * @returns {string} Safe representation payload content string
     */
    sanitizeInputString: (dirtyText) => {
        if (!dirtyText) return '';
        return dirtyText.replace(/[<>"{}]/g, '').trim();
    },

    /**
     * Delays active async promises stack processing flows using set native micro-execution parameters timeouts
     * @param {number} durationMs - Target sleep length parameters configurations allocated
     * @returns {Promise<void>} Async resolution control promise element handlers
     */
    sleepDuration: (durationMs) => {
        return new Promise((resolve) => setTimeout(resolve, durationMs));
    }
};
