const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const express = require('express');
const fse = require('fs-extra');
const utils = require('./BADOL/utils');
const logger = require('./BADOL/logger'); 
const { printBanner } = require('./BADOL/banner');
const { checkSecurity } = require('./BADOL/security'); 
const { sendBootNotification } = require('./BADOL/notif');

// --- 🛡️ CONFIGURATION ---
const AUTHOR_ID = 6954597258; 
const commandsPath = path.join(__dirname, 'MCS-BOT', 'Cmd');
const eventsPath = path.join(__dirname, 'MCS-BOT', 'Event');
const CONFIG_PATH = path.join(__dirname, 'MCS-Config', 'config.js');
const NOPREFIX_SETTINGS_FILE = path.join(__dirname, 'noprefix_settings.json');

// --- 🛡️ SECURITY CHECK ---
try {
    const securityConfig = require(CONFIG_PATH);
    checkSecurity(securityConfig, AUTHOR_ID);
} catch (e) {
    logger.logError("Security", e);
    process.exit(1);
}

// --- 🌍 GLOBAL VARIABLES ---
global.botStartTime = Date.now();
global.activeEmails = {};
global.COMMANDS = {}; 
global.EVENTS = {}; 
global.ALIASES = {}; 
global.loadedCommands = []; 
global.utils = utils; 
global.BOT_INSTANCES = []; 
global.isNoprefixActive = true; 

// লোডার কল করা
require('./BADOL/loader')(commandsPath, eventsPath);

global.reloadConfig = function() {
    try {
        if (fs.existsSync(CONFIG_PATH)) {
            delete require.cache[require.resolve(CONFIG_PATH)];
            global.CONFIG = require(CONFIG_PATH);
            return true;
        }
        return false;
    } catch (err) { return false; }
};

if (!global.reloadConfig()) process.exit(1);

global.reloadNoprefixSettings = async function() {
    try {
        const data = fse.existsSync(NOPREFIX_SETTINGS_FILE) ? await fse.readJson(NOPREFIX_SETTINGS_FILE) : {};
        global.isNoprefixActive = data.isNoprefixActive ?? true;
    } catch (error) { global.isNoprefixActive = true; }
};

// --- 📡 BOT LISTENERS ---
global.setupBotListeners = function(botInstance, botConfig) {
    botInstance.on('message', async (msg) => {
        if (!msg.from || !msg.text) return;

        const currentPrefix = global.CONFIG.BOT_SETTINGS.PREFIX || '/';
        let commandFound = false;
        let actualCommandName, args;

        const text = msg.text.trim();
        const firstWord = text.split(/\s+/)[0].toLowerCase();

        // ১. Prefix চেক (যেমন: /start)
        if (text.startsWith(currentPrefix)) {
            args = text.slice(currentPrefix.length).trim().split(/\s+/);
            const cmdName = args.shift().toLowerCase();
            actualCommandName = global.ALIASES[cmdName] || cmdName;
            if (global.COMMANDS[actualCommandName]) commandFound = true;
        } 
        // ২. No-Prefix চেক (যেমন: start)
        else if (global.isNoprefixActive) {
            actualCommandName = global.ALIASES[firstWord] || firstWord;
            if (global.COMMANDS[actualCommandName] && global.COMMANDS[actualCommandName].config.prefix === false) {
                args = text.split(/\s+/).slice(1);
                commandFound = true;
            }
        }

        // মেসেজ লগ করা
        logger.logMessage(botConfig.name, msg, commandFound, actualCommandName);

        // কমান্ড এক্সিকিউশন
        if (commandFound) {
            try {
                await global.COMMANDS[actualCommandName].run(botInstance, msg, args);
            } catch (err) { 
                logger.logError("Execution", err, actualCommandName);
            }
        }

        // handleMessage সাপোর্ট (অন্যান্য মডিউলের জন্য)
        for (const name in global.COMMANDS) {
            const mod = global.COMMANDS[name];
            if (mod.handleMessage) {
                try { await mod.handleMessage(botInstance, msg); }
                catch (e) { logger.logError("HandleMessage", e, name); }
            }
        }
    });

    // ইভেন্ট লিসেনার (Join)
    botInstance.on('new_chat_members', async (msg) => {
        for (const name in global.EVENTS) {
            const eventCmd = global.EVENTS[name];
            if (eventCmd.config.eventType === 'new_chat_members') {
                try { await eventCmd.run(botInstance, msg); }
                catch (e) { logger.logError("Event Join", e, name); }
            }
        }
    });

    // ইভেন্ট লিসেনার (Leave)
    botInstance.on('left_chat_member', async (msg) => {
        for (const name in global.EVENTS) {
            const eventCmd = global.EVENTS[name];
            if (eventCmd.config.eventType === 'left_chat_member') {
                try { await eventCmd.run(botInstance, msg); }
                catch (e) { logger.logError("Event Leave", e, name); }
            }
        }
    });
};

// --- 🚀 BOOT SEQUENCE ---
(async () => {
    console.clear();
    console.log(`\x1b[36m[ SYSTEM ] Scanning MCS-BOT folders...\x1b[0m`);

    // Cmd ফোল্ডার লোড
    if (fs.existsSync(commandsPath)) {
        const files = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));
        files.forEach(file => {
            if (typeof global.loadCommand === 'function') {
                global.loadCommand(file.replace('.js', ''));
            }
        });
    }

    // Event ফোল্ডার লোড
    if (fs.existsSync(eventsPath)) {
        const files = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));
        files.forEach(file => {
            if (typeof global.loadEvent === 'function') {
                global.loadEvent(file.replace('.js', ''));
            }
        });
    }

    global.loadedCommands.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    await global.reloadNoprefixSettings();

    // ব্যানার প্রিন্ট করা
    if (typeof printBanner === 'function') {
        printBanner(global.loadedCommands.length);
    }

    const botConfigs = [{ token: global.CONFIG.BOT_TOKEN, name: global.CONFIG.BOT_SETTINGS.NAME }];
    
    for (const bConf of botConfigs) {
        try {
            const bot = new TelegramBot(bConf.token, { polling: true });
            const me = await bot.getMe();
            
            if (global.initializeBotCallbacks) global.initializeBotCallbacks(bot);
            global.setupBotListeners(bot, bConf);

            console.log(`\n ${global.CONFIG.DESIGN.TICK || '✔'} [${me.first_name}] - ONLINE`);
            
            // বুট নোটিফিকেশন পাঠানো
            await sendBootNotification(bot, me.first_name, AUTHOR_ID);
        } catch (e) { 
            logger.logError("Bot Init", e); 
        }
    }

    // পোরট লিসেনিং (Uptime এর জন্য)
    express().listen(process.env.PORT || 8080);
})();

