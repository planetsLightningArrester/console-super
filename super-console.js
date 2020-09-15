"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Console = require("console").Console;
var msOnOff = -5;
var terminalColor = {
    //Modifiers
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    reverse: "\x1b[7m",
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
};
var socket;
function processDataAndReturnWithTime(data, base) {
    if (typeof data == 'object') {
        data = JSON.stringify(data);
    }
    else if (typeof data == 'number') {
        data = data.toString(base).toUpperCase();
    }
    var time = new Date();
    time = (time.getHours() >= 10 ? time.getHours() : ('0' + time.getHours())) + ':' + (time.getMinutes() >= 10 ? time.getMinutes() : ('0' + time.getMinutes())) + ':' + (time.getSeconds() >= 10 ? time.getSeconds() : ('0' + time.getSeconds())) + '.' + (time.getMilliseconds() >= 10 ? (time.getMilliseconds() >= 100 ? time.getMilliseconds() : '0' + time.getMilliseconds()) : ('00' + time.getMilliseconds())) + ' ';
    return [data, time];
}
console.timeTag = Console.prototype.timeTag = function (data) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var time;
    var base = 10;
    var modifiers = '';
    args.forEach(function (el) {
        if (typeof el == 'number') {
            base = el;
        }
        else if (typeof el == 'object') {
            (function (terminalColor) {
                modifiers += (terminalColor[el.mod1] === undefined ? '' : terminalColor[el.mod1]);
                modifiers += (terminalColor[el.mod2] === undefined ? '' : terminalColor[el.mod2]);
                modifiers += (terminalColor[el.mod3] === undefined ? '' : terminalColor[el.mod3]);
            })(terminalColor);
        }
        else {
            (function (terminalColor) {
                modifiers += (terminalColor[el] === undefined ? '' : terminalColor[el]);
                modifiers += (terminalColor[el] === undefined ? '' : terminalColor[el]);
                modifiers += (terminalColor[el] === undefined ? '' : terminalColor[el]);
            })(terminalColor);
        }
    });
    _a = processDataAndReturnWithTime(data, base), data = _a[0], time = _a[1];
    process.stdout.write(modifiers + '[' + time.slice(0, msOnOff) + '] ' + data + terminalColor.reset + '\r\n');
    if (socket)
        socket.emit('console', '[' + time.slice(0, msOnOff) + '] ' + data);
};
console.inlineTimeTag = Console.prototype.inlineTimeTag = function (data) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    process.stdout.cursorTo(0);
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(0);
    console.timeTag.apply(console, __spreadArrays([data], args));
};
console.goBackLines = Console.prototype.goBackLines = function (lines) {
    process.stdout.cursorTo(0);
    process.stdout.moveCursor(0, -lines);
    process.stdout.clearLine(0);
};
console.clearLine = Console.prototype.clearLine = function (lines) {
    if (lines === void 0) { lines = 0; }
    process.stdout.cursorTo(0);
    process.stdout.moveCursor(0, -lines);
    process.stdout.clearLine(0);
};
console.showMs = Console.prototype.showMs = function (showMs) {
    if (showMs) {
        msOnOff = -1;
    }
    else {
        msOnOff = -5;
    }
};
console.setSocket = Console.prototype.setSocket = function (_socket) {
    socket = _socket;
};
