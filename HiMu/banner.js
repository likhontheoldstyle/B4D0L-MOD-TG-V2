const reset = "\x1b[0m";

const colors = {
    cyan: "\x1b[38;5;51m",
    yellow: "\x1b[38;5;226m",
    matrixGray: "\x1b[38;5;240m",
    green: "\x1b[38;5;46m"
};

function wrapInHackerBox(title, contentLines, color = colors.cyan) {
    const cleanStr = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');
    const maxContentWidth = 45;
    const top = color + '+' + '-'.repeat(maxContentWidth) + '+' + reset;
    const titlePadding = Math.max(0, Math.floor((maxContentWidth - cleanStr(title).length) / 2));
    const titleLine = color + '|' + ' '.repeat(titlePadding) + title.toUpperCase() + ' '.repeat(maxContentWidth - titlePadding - cleanStr(title).length) + '|' + reset;
    const formattedLines = contentLines.map(line => {
        const lineLen = cleanStr(line).length;
        const padding = Math.max(0, maxContentWidth - lineLen - 1);
        return `${color}| ${reset}${line}${' '.repeat(padding)}${color}|${reset}`;
    }).join('\n');
    return `${top}\n${titleLine}\n${top}\n${formattedLines}\n${top}`;
}

function printBanner(cmdCount) {
    const set = global.CONFIG.BOT_SETTINGS;
    const owner = global.CONFIG.OWNER;
    const social = global.CONFIG.SOCIAL;

    const time = colors.yellow + new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    }) + reset;

    const botInfoLines = [
        `${colors.cyan}SYSTEM ACCESS : GRANTED${reset}`,
        `${colors.cyan}BOT NAME      : ${set.NAME}${reset}`,
        `${colors.cyan}OWNER         : ${owner.NAME}${reset}`,
        `${colors.cyan}OWNER ID      : ${owner.ID}${reset}`,
        `${colors.matrixGray}-------------------------------------------${reset}`,
        `${colors.cyan}LOADED CMDS   : ${cmdCount}${reset}`,
        `${colors.cyan}BOT PREFIX    : [ ${set.PREFIX} ]${reset}`,
        `${colors.cyan}VERSION       : ${set.VERSION}${reset}`,
        `${colors.matrixGray}-------------------------------------------${reset}`,
        `${colors.green}STATUS >> BOT RUNNING SUCCESSFULLY${reset}`,
        `${colors.cyan}TIME   >> ${time}${reset}`
    ];
    
    const adminContactLines = [
        `${colors.cyan}TELEGRAM  : ${social.TELEGRAM.replace('https://', '')}${reset}`,
        `${colors.cyan}WHATSAPP  : ${social.WHATSAPP.replace('wa.me/', '')}${reset}`,
        `${colors.cyan}FACEBOOK  : fb.me/HIMU${reset}`,
        `${colors.cyan}SUPPORT   : 24/7 VIP Active${reset}`
    ];

    console.clear();
    console.log(colors.cyan + String.raw`
 ██╗  ██╗ ██╗ ███╗   ███╗ ██╗   ██╗
 ██║  ██║ ██║ ████╗ ████║ ██║   ██║
 ███████║ ██║ ██╔████╔██║ ██║   ██║
 ██╔══██║ ██║ ██║╚██╔╝██║ ██║   ██║
 ██║  ██║ ██║ ██║ ╚═╝ ██║ ╚██████╔╝
 ╚═╝  ╚═╝ ╚═╝ ╚═╝     ╚═╝  ╚═════╝ 
    >>>>>>>>> SYSTEM VERSION : ${set.VERSION} <<<<<<<<<` + reset);

    console.log("\n" + wrapInHackerBox("Terminal Security Protocol", botInfoLines, colors.cyan));
    console.log(`\n${wrapInHackerBox("Admin Contact Information", adminContactLines, colors.cyan)}`);
}

module.exports = { printBanner };
