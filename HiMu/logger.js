const logger = {
    
    logMessage: function(botName, msg, commandFound, actualCommandName) {
        const chatType = msg.chat.type; 
        const chatTitle = msg.chat.title || "Private Chat";
        const userName = msg.from.first_name + (msg.from.last_name ? " " + msg.from.last_name : "");
        const userId = msg.from.id;

        console.log(`\n\x1b[35m╔═══════════════ [${botName}] ═══════════════╗\x1b[0m`);
        console.log(`\x1b[37m║\x1b[0m \x1b[36mUser:\x1b[0m ${userName} (ID: ${userId})`);
        console.log(`\x1b[37m║\x1b[0m \x1b[36mChat:\x1b[0m ${chatTitle} (${chatType})`);
        console.log(`\x1b[37m║\x1b[0m \x1b[36mText:\x1b[0m ${msg.text}`);

        if (commandFound) {
            console.log(`\x1b[37m║\x1b[0m \x1b[32mCmd :\x1b[0m ${actualCommandName}`);
        }

        console.log(`\x1b[35m╚═════════════════════════════════════════════╝\x1b[0m`);
    },

    logError: function(type, error, filename = "") {
        console.error(`\n\x1b[31m━━━━━━━ [ ${type.toUpperCase()} ERROR ] ━━━━━━━\x1b[0m`);
        if (filename) console.error(`\x1b[33mSource:\x1b[0m ${filename}`);
        console.error(`\x1b[37mMessage:\x1b[0m ${error.message}`);
        console.error(`\x1b[31mStack Trace:\x1b[0m\n${error.stack}`);
        console.error(`\x1b[31m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m\n`);
    }
};

module.exports = const
