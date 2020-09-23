"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
const compiler_sfc_1 = require("@vue/compiler-sfc");
// This is a post loader that handles scoped CSS transforms.
// Injected right before css-loader by the global pitcher (../pitch.js)
// for any <style scoped> selection requests initiated from within vue files.
const StylePostLoader = function (source, inMap) {
    const query = querystring_1.default.parse(this.resourceQuery.slice(1));
    const { code, map, errors } = compiler_sfc_1.compileStyle({
        source: source,
        filename: this.resourcePath,
        id: `data-v-${query.id}`,
        map: inMap,
        scoped: !!query.scoped,
        vars: !!query.vars,
        trim: true,
    });
    if (errors.length) {
        this.callback(errors[0]);
    }
    else {
        this.callback(null, code, map);
    }
};
exports.default = StylePostLoader;
