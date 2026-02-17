async function sendBootNotification(bot, botName, authorId) {

    const photoUrl = 'https://lh3.googleusercontent.com/u/0/d/1lf3TVYxwMsDZqByetetgtPf3mlBFcWMB'; 

    const message = `
🌟 **SYSTEM STATUS: ONLINE** 🌟
━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Bot Name: ${botName}
🆔 Admin ID: \`${authorId}\`
📅 Date: ${new Date().toLocaleDateString('en-GB')}
⏰ Time: ${new Date().toLocaleTimeString('en-US', { hour12: true, timeZone: 'Asia/Dhaka' })}
🛡️ security: System Fully Protected
━━━━━━━━━━━━━━━━━━━━━━━━
📢 *Greetings Boss! Your bot is now active and ready to serve.*`;

    try {
        await bot.sendPhoto(authorId, photoUrl, { caption: message, parse_mode: 'Markdown' });
        console.log(` \x1b[32m✅ [Notification] Photo alert sent to Admin (${authorId})\x1b[0m`);
    } catch (e) {
        try {
            await bot.sendMessage(authorId, message, { parse_mode: 'Markdown' });
            console.log(` \x1b[33m⚠️ [Notification] Image failed, sent text alert instead.\x1b[0m`);
        } catch (err) {
            console.error(` \x1b[31m❌ [Notification] Failed to notify Admin:\x1b[0m`, err.message);
        }
    }
}

module.exports = { sendBootNotification };

