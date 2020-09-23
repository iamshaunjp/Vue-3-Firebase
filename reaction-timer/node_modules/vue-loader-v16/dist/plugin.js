"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
let Plugin;
if (webpack_1.default.version && webpack_1.default.version[0] > '4') {
    // webpack5 and upper
    Plugin = require('./pluginWebpack5').default;
}
else {
    // webpack4 and lower
    Plugin = require('./pluginWebpack4').default;
}
exports.default = Plugin;
