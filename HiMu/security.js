const colors = {

    cyan: "\x1b[38;5;51m",       

    yellow: "\x1b[38;5;226m",     

    matrixGray: "\x1b[38;5;240m",

    green: "\x1b[38;5;46m",

    red: "\x1b[38;5;196m",

    reset: "\x1b[0m"

};

function wrapInHackerBox(title, contentLines, color = colors.cyan) {

    const cleanStr = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');

    const maxContentWidth = 45; 

    const top = color + '+' + '-'.repeat(maxContentWidth) + '+' + colors.reset;

    const titlePadding = Math.max(0, Math.floor((maxContentWidth - cleanStr(title).length) / 2));

    const titleLine = color + '|' + ' '.repeat(titlePadding) + title.toUpperCase() + ' '.repeat(maxContentWidth - titlePadding - cleanStr(title).length) + '|' + colors.reset;

    const formattedLines = contentLines.map(line => {

        const lineLen = cleanStr(line).length;

        const padding = Math.max(0, maxContentWidth - lineLen - 1);

        return `${color}| ${colors.reset}${line}${' '.repeat(padding)}${color}|${colors.reset}`;

    }).join('\n');

    return `${top}\n${titleLine}\n${top}\n${formattedLines}\n${top}`;

}

function checkSecurity(config, authorId) {

    if (config.OWNER.ID !== authorId) {

        console.clear();

        console.log(colors.cyan + String.raw`

 ██████╗  █████╗ ██████╗  ██████╗ ██╗     

 ██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║     

 ██████╔╝███████║██║  ██║██║   ██║██║     

 ██╔══██╗██╔══██║██║  ██║██║   ██║██║     

 ██████╔╝██║  ██║██████╔╝╚██████╔╝███████╗

 ╚══════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝` + colors.reset);

        const alertLines = [

            `${colors.red}ACCESS  : DENIED - UNAUTHORIZED USER${colors.reset}`,

            `${colors.cyan}MESSAGE : OWNER ID MISMATCH DETECTED${colors.reset}`,

            `${colors.matrixGray}-------------------------------------------${colors.reset}`,

            `${colors.yellow}ACTION  : SET OWNER_ID IN CONFIG FILE${colors.reset}`,

            `${colors.green}REQUIRED ID : ${authorId}${colors.reset}`,

            `${colors.matrixGray}-------------------------------------------${colors.reset}`,

            `${colors.cyan}DEV     : t.me/B4D9L_007${colors.reset}`,

            `${colors.red}STATUS  : SYSTEM TERMINATING...${colors.reset}`

        ];

        console.log("\n" + wrapInHackerBox("Terminal Security Protocol", alertLines, colors.cyan));

        process.exit(1); 

    }

}

module.exports = { checkSecurity };