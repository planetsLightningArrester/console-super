const { Console } = require("console");

export {}

let msOnOff = -5;

let terminalColor = {
    //Modifiers
    reset: "\x1b[0m",       //Reset to default
    bright: "\x1b[1m",      //Brighter
    dim: "\x1b[2m",         //Dim
    underscore: "\x1b[4m",  //Put a underscore beneath everything
    reverse: "\x1b[7m",     //Reverses the fore and background colors

    //Font colors
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",

    //Background colors
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
}

let socket:any;

function processDataAndReturnWithTime(data:any, base:number) {
    if (typeof data == 'object') {
        data = JSON.stringify(data);
    } else if (typeof data == 'number') {
        data = data.toString(base).toUpperCase();
    }

    let time:any = new Date();
    time = (time.getHours() >= 10 ? time.getHours() : ('0' + time.getHours())) + ':' + (time.getMinutes() >= 10 ? time.getMinutes() : ('0' + time.getMinutes())) + ':' + (time.getSeconds() >= 10 ? time.getSeconds() : ('0' + time.getSeconds())) + '.' + (time.getMilliseconds() >= 10 ? (time.getMilliseconds() >= 100 ? time.getMilliseconds() : '0' + time.getMilliseconds()) : ('00' + time.getMilliseconds())) + ' ';
    return [data, time];
}

declare global {
    interface Console {
        setSocket(_socket:any): void;
        timeTag(data:any, ...args:any): void;
        inlineTimeTag(data:any, ...args:any[]): void;
        goBackLines(lines:number): void;
        clearLine(lines:number): void;
        showMs(showMs:Boolean): void;
    }
}

console.timeTag = Console.prototype.timeTag = (data:any, ...args:any[]) => {
    let time;
    let base = 10;
    let modifiers = '';

    args.forEach((el:any) => {
        if (typeof el == 'number') {
            base = el
        } else if (typeof el == 'object') {
            ((terminalColor: Record<string, any>)=>{
                modifiers += (terminalColor[el.mod1]===undefined?'':terminalColor[el.mod1]);
                modifiers += (terminalColor[el.mod2]===undefined?'':terminalColor[el.mod2]);
                modifiers += (terminalColor[el.mod3]===undefined?'':terminalColor[el.mod3]);
            })(terminalColor);
        } else {
            ((terminalColor: Record<string, any>)=>{
                modifiers += (terminalColor[el]===undefined?'':terminalColor[el]);
                modifiers += (terminalColor[el]===undefined?'':terminalColor[el]);
                modifiers += (terminalColor[el]===undefined?'':terminalColor[el]);
            })(terminalColor);
        }
    });

    [data, time] = processDataAndReturnWithTime(data, base);

    process.stdout.write(modifiers + '[' + time.slice(0, msOnOff) + '] ' + data + terminalColor.reset + '\r\n');
    if (socket) socket.emit('console', '[' + time.slice(0, msOnOff) + '] ' + data);
}

console.inlineTimeTag = Console.prototype.inlineTimeTag = (data:any, ...args:any[]) => {
    process.stdout.cursorTo(0);
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(0);
    console.timeTag(data, ...args);
};

console.goBackLines = Console.prototype.goBackLines = (lines:number) => {
    process.stdout.cursorTo(0);
    process.stdout.moveCursor(0, -lines);
    process.stdout.clearLine(0);
};

console.clearLine = Console.prototype.clearLine = (lines:number = 0) => {
    process.stdout.cursorTo(0);
    process.stdout.moveCursor(0, -lines);
    process.stdout.clearLine(0);
};

console.showMs = Console.prototype.showMs = (showMs:Boolean) => {
    if (showMs) {
        msOnOff = -1
    } else {
        msOnOff = -5
    }
};

console.setSocket = Console.prototype.setSocket = (_socket:any) => {
    socket = _socket;
}