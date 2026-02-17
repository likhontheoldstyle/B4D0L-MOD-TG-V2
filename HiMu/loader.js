const path = require('path');
const fs = require('fs');
const logger = require('./logger');

module.exports = function(commandsPath, eventsPath) {

    global.loadCommand = function(commandName) {
        const filename = `${commandName}.js`;
        const filePath = path.join(commandsPath, filename);

        if (!fs.existsSync(filePath)) return;

        const resolvedPath = require.resolve(filePath);
        if (require.cache[resolvedPath]) delete require.cache[resolvedPath];

        try {
            const commandModule = require(filePath);
            if (!commandModule.config || !commandModule.run) {
                throw new Error(`Invalid command structure in ${filename}`);
            }

            const cmdConfigName = commandModule.config.name || commandName;

            global.COMMANDS[cmdConfigName] = commandModule;
            global.loadedCommands.push(commandModule.config);

            if (commandModule.config.aliases && Array.isArray(commandModule.config.aliases)) {
                commandModule.config.aliases.forEach(alias => {
                    global.ALIASES[alias] = cmdConfigName;
                });
            }

            console.log(` \x1b[37m[ CMD ]\x1b[0m Loaded → Name: \x1b[33m${cmdConfigName.padEnd(12)}\x1b[0m | File: \x1b[32m${filename}\x1b[0m`);
        } catch (err) {
            logger.logError("Load CMD", err, filename);
        }
    };

    global.loadEvent = function(eventName) {
        const filename = `${eventName}.js`;
        const filePath = path.join(eventsPath, filename);

        if (!fs.existsSync(filePath)) return;

        const resolvedPath = require.resolve(filePath);
        if (require.cache[resolvedPath]) delete require.cache[resolvedPath];

        try {
            const eventModule = require(filePath);
            if (!eventModule.config || !eventModule.run) {
                throw new Error(`Invalid event structure in ${filename}`);
            }

            const eName = eventModule.config.name || eventName;

            global.EVENTS[eName] = eventModule;
            console.log(` \x1b[36m[ EVENT ]\x1b[0m Loaded → Name: \x1b[35m${eName.padEnd(11)}\x1b[0m | File: \x1b[32m${filename}\x1b[0m`);
        } catch (err) {
            logger.logError("Load Event", err, filename);
        }
    };
    
    global.unloadCommand = function(commandName) {
        const cmd = global.COMMANDS[commandName];
        if (!cmd) return;

        const index = global.loadedCommands.findIndex(c => c.name === commandName);
        if (index > -1) global.loadedCommands.splice(index, 1);

        if (cmd.config.aliases) {
            cmd.config.aliases.forEach(alias => delete global.ALIASES[alias]);
        }
        delete global.COMMANDS[commandName];
    };
    
    global.initializeBotCallbacks = function(telegramBot) {
        for (const name in global.COMMANDS) {
            if (global.COMMANDS[name].initCallback) {
                try {
                    global.COMMANDS[name].initCallback(telegramBot);
                } catch (e) {
                    logger.logError("Callback", e, name);
                }
            }
        }
    };
};
