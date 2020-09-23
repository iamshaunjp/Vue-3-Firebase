"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
const loader_utils_1 = __importDefault(require("loader-utils"));
const formatError_1 = require("./formatError");
const compiler_sfc_1 = require("@vue/compiler-sfc");
// Loader that compiles raw template into JavaScript functions.
// This is injected by the global pitcher (../pitch) for template
// selection requests initiated from vue files.
const TemplateLoader = function (source, inMap) {
    source = String(source);
    const loaderContext = this;
    // although this is not the main vue-loader, we can get access to the same
    // vue-loader options because we've set an ident in the plugin and used that
    // ident to create the request for this loader in the pitcher.
    const options = (loader_utils_1.default.getOptions(loaderContext) ||
        {});
    // const isServer = loaderContext.target === 'node'
    // const isProduction = options.productionMode || loaderContext.minimize || process.env.NODE_ENV === 'production'
    const query = querystring_1.default.parse(loaderContext.resourceQuery.slice(1));
    const scopeId = query.scoped ? `data-v-${query.id}` : null;
    let compiler;
    if (typeof options.compiler === 'string') {
        compiler = require(options.compiler);
    }
    else {
        compiler = options.compiler;
    }
    const compiled = compiler_sfc_1.compileTemplate({
        source,
        inMap,
        filename: loaderContext.resourcePath,
        ssr: loaderContext.target === 'node',
        compiler,
        compilerOptions: Object.assign(Object.assign({}, options.compilerOptions), { scopeId, bindingMetadata: typeof query.bindings === 'string' ? JSON.parse(query.bindings) : {} }),
        transformAssetUrls: options.transformAssetUrls || true,
    });
    // tips
    if (compiled.tips.length) {
        compiled.tips.forEach((tip) => {
            loaderContext.emitWarning(tip);
        });
    }
    // errors
    if (compiled.errors && compiled.errors.length) {
        compiled.errors.forEach((err) => {
            if (typeof err === 'string') {
                loaderContext.emitError(err);
            }
            else {
                formatError_1.formatError(err, inMap ? inMap.sourcesContent[0] : source, loaderContext.resourcePath);
                loaderContext.emitError(err);
            }
        });
    }
    const { code, map } = compiled;
    loaderContext.callback(null, code, map);
};
exports.default = TemplateLoader;
