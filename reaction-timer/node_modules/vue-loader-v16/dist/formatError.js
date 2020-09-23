"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const compiler_sfc_1 = require("@vue/compiler-sfc");
const chalk_1 = __importDefault(require("chalk"));
function formatError(err, source, file) {
    const loc = err.loc;
    if (!loc) {
        return;
    }
    const locString = `:${loc.start.line}:${loc.start.column}`;
    const filePath = chalk_1.default.gray(`at ${file}${locString}`);
    const codeframe = compiler_sfc_1.generateCodeFrame(source, loc.start.offset, loc.end.offset);
    err.message = `\n${chalk_1.default.red(`VueCompilerError: ${err.message}`)}\n${filePath}\n${chalk_1.default.yellow(codeframe)}\n`;
}
exports.formatError = formatError;
