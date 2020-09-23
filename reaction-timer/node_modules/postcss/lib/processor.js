"use strict";

exports.__esModule = true;
exports.default = void 0;

var _lazyResult = _interopRequireDefault(require("./lazy-result"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Contains plugins to process CSS. Create one `Processor` instance,
 * initialize its plugins, and then use that instance on numerous CSS files.
 *
 * @example
 * const processor = postcss([autoprefixer, precss])
 * processor.process(css1).then(result => console.log(result.css))
 * processor.process(css2).then(result => console.log(result.css))
 */
var Processor = /*#__PURE__*/function () {
  /**
   * @param {Array.<Plugin|pluginFunction>|Processor} plugins PostCSS plugins.
   *        See {@link Processor#use} for plugin format.
   */
  function Processor(plugins) {
    if (plugins === void 0) {
      plugins = [];
    }

    /**
     * Current PostCSS version.
     *
     * @type {string}
     *
     * @example
     * if (result.processor.version.split('.')[0] !== '6') {
     *   throw new Error('This plugin works only with PostCSS 6')
     * }
     */
    this.version = '7.0.34';
    /**
     * Plugins added to this processor.
     *
     * @type {pluginFunction[]}
     *
     * @example
     * const processor = postcss([autoprefixer, precss])
     * processor.plugins.length //=> 2
     */

    this.plugins = this.normalize(plugins);
  }
  /**
   * Adds a plugin to be used as a CSS processor.
   *
   * PostCSS plugin can be in 4 formats:
   * * A plugin created by {@link postcss.plugin} method.
   * * A function. PostCSS will pass the function a @{link Root}
   *   as the first argument and current {@link Result} instance
   *   as the second.
   * * An object with a `postcss` method. PostCSS will use that method
   *   as described in #2.
   * * Another {@link Processor} instance. PostCSS will copy plugins
   *   from that instance into this one.
   *
   * Plugins can also be added by passing them as arguments when creating
   * a `postcss` instance (see [`postcss(plugins)`]).
   *
   * Asynchronous plugins should return a `Promise` instance.
   *
   * @param {Plugin|pluginFunction|Processor} plugin PostCSS plugin
   *                                                 or {@link Processor}
   *                                                 with plugins.
   *
   * @example
   * const processor = postcss()
   *   .use(autoprefixer)
   *   .use(precss)
   *
   * @return {Processes} Current processor to make methods chain.
   */


  var _proto = Processor.prototype;

  _proto.use = function use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]));
    return this;
  }
  /**
   * Parses source CSS and returns a {@link LazyResult} Promise proxy.
   * Because some plugins can be asynchronous it doesn’t make
   * any transformations. Transformations will be applied
   * in the {@link LazyResult} methods.
   *
   * @param {string|toString|Result} css String with input CSS or any object
   *                                     with a `toString()` method,
   *                                     like a Buffer. Optionally, send
   *                                     a {@link Result} instance
   *                                     and the processor will take
   *                                     the {@link Root} from it.
   * @param {processOptions} [opts]      Options.
   *
   * @return {LazyResult} Promise proxy.
   *
   * @example
   * processor.process(css, { from: 'a.css', to: 'a.out.css' })
   *   .then(result => {
   *      console.log(result.css)
   *   })
   */
  ;

  _proto.process = function (_process) {
    function process(_x) {
      return _process.apply(this, arguments);
    }

    process.toString = function () {
      return _process.toString();
    };

    return process;
  }(function (css, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (this.plugins.length === 0 && opts.parser === opts.stringifier) {
      if (process.env.NODE_ENV !== 'production') {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('You did not set any plugins, parser, or stringifier. ' + 'Right now, PostCSS does nothing. Pick plugins for your case ' + 'on https://www.postcss.parts/ and use them in postcss.config.js.');
        }
      }
    }

    return new _lazyResult.default(this, css, opts);
  });

  _proto.normalize = function normalize(plugins) {
    var normalized = [];

    for (var _iterator = _createForOfIteratorHelperLoose(plugins), _step; !(_step = _iterator()).done;) {
      var i = _step.value;

      if (i.postcss === true) {
        var plugin = i();
        throw new Error('PostCSS plugin ' + plugin.postcssPlugin + ' requires PostCSS 8. Update PostCSS or downgrade this plugin.');
      }

      if (i.postcss) i = i.postcss;

      if (typeof i === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === 'function') {
        normalized.push(i);
      } else if (typeof i === 'object' && (i.parse || i.stringify)) {
        if (process.env.NODE_ENV !== 'production') {
          throw new Error('PostCSS syntaxes cannot be used as plugins. Instead, please use ' + 'one of the syntax/parser/stringifier options as outlined ' + 'in your PostCSS runner documentation.');
        }
      } else if (typeof i === 'object' && i.postcssPlugin) {
        throw new Error('PostCSS plugin ' + i.postcssPlugin + ' requires PostCSS 8. Update PostCSS or downgrade this plugin.');
      } else {
        throw new Error(i + ' is not a PostCSS plugin');
      }
    }

    return normalized;
  };

  return Processor;
}();

var _default = Processor;
/**
 * @callback builder
 * @param {string} part          Part of generated CSS connected to this node.
 * @param {Node}   node          AST node.
 * @param {"start"|"end"} [type] Node’s part type.
 */

/**
 * @callback parser
 *
 * @param {string|toString} css   String with input CSS or any object
 *                                with toString() method, like a Buffer.
 * @param {processOptions} [opts] Options with only `from` and `map` keys.
 *
 * @return {Root} PostCSS AST
 */

/**
 * @callback stringifier
 *
 * @param {Node} node       Start node for stringifing. Usually {@link Root}.
 * @param {builder} builder Function to concatenate CSS from node’s parts
 *                          or generate string and source map.
 *
 * @return {void}
 */

/**
 * @typedef {object} syntax
 * @property {parser} parse          Function to generate AST by string.
 * @property {stringifier} stringify Function to generate string by AST.
 */

/**
 * @typedef {object} toString
 * @property {function} toString
 */

/**
 * @callback pluginFunction
 * @param {Root} root     Parsed input CSS.
 * @param {Result} result Result to set warnings or check other plugins.
 */

/**
 * @typedef {object} Plugin
 * @property {function} postcss PostCSS plugin function.
 */

/**
 * @typedef {object} processOptions
 * @property {string} from             The path of the CSS source file.
 *                                     You should always set `from`,
 *                                     because it is used in source map
 *                                     generation and syntax error messages.
 * @property {string} to               The path where you’ll put the output
 *                                     CSS file. You should always set `to`
 *                                     to generate correct source maps.
 * @property {parser} parser           Function to generate AST by string.
 * @property {stringifier} stringifier Class to generate string by AST.
 * @property {syntax} syntax           Object with `parse` and `stringify`.
 * @property {object} map              Source map options.
 * @property {boolean} map.inline                    Does source map should
 *                                                   be embedded in the output
 *                                                   CSS as a base64-encoded
 *                                                   comment.
 * @property {string|object|false|function} map.prev Source map content
 *                                                   from a previous
 *                                                   processing step
 *                                                   (for example, Sass).
 *                                                   PostCSS will try to find
 *                                                   previous map automatically,
 *                                                   so you could disable it by
 *                                                   `false` value.
 * @property {boolean} map.sourcesContent            Does PostCSS should set
 *                                                   the origin content to map.
 * @property {string|false} map.annotation           Does PostCSS should set
 *                                                   annotation comment to map.
 * @property {string} map.from                       Override `from` in map’s
 *                                                   sources`.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5lczYiXSwibmFtZXMiOlsiUHJvY2Vzc29yIiwicGx1Z2lucyIsInZlcnNpb24iLCJub3JtYWxpemUiLCJ1c2UiLCJwbHVnaW4iLCJjb25jYXQiLCJwcm9jZXNzIiwiY3NzIiwib3B0cyIsImxlbmd0aCIsInBhcnNlciIsInN0cmluZ2lmaWVyIiwiZW52IiwiTk9ERV9FTlYiLCJjb25zb2xlIiwid2FybiIsIkxhenlSZXN1bHQiLCJub3JtYWxpemVkIiwiaSIsInBvc3Rjc3MiLCJFcnJvciIsInBvc3Rjc3NQbHVnaW4iLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwicGFyc2UiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7O0lBU01BLFM7QUFDSjs7OztBQUlBLHFCQUFhQyxPQUFiLEVBQTJCO0FBQUEsUUFBZEEsT0FBYztBQUFkQSxNQUFBQSxPQUFjLEdBQUosRUFBSTtBQUFBOztBQUN6Qjs7Ozs7Ozs7OztBQVVBLFNBQUtDLE9BQUwsR0FBZSxRQUFmO0FBQ0E7Ozs7Ozs7Ozs7QUFTQSxTQUFLRCxPQUFMLEdBQWUsS0FBS0UsU0FBTCxDQUFlRixPQUFmLENBQWY7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0E2QkFHLEcsR0FBQSxhQUFLQyxNQUFMLEVBQWE7QUFDWCxTQUFLSixPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhSyxNQUFiLENBQW9CLEtBQUtILFNBQUwsQ0FBZSxDQUFDRSxNQUFELENBQWYsQ0FBcEIsQ0FBZjtBQUNBLFdBQU8sSUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXNCQUUsTzs7Ozs7Ozs7OztJQUFBLFVBQVNDLEdBQVQsRUFBY0MsSUFBZCxFQUEwQjtBQUFBLFFBQVpBLElBQVk7QUFBWkEsTUFBQUEsSUFBWSxHQUFMLEVBQUs7QUFBQTs7QUFDeEIsUUFBSSxLQUFLUixPQUFMLENBQWFTLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkJELElBQUksQ0FBQ0UsTUFBTCxLQUFnQkYsSUFBSSxDQUFDRyxXQUF0RCxFQUFtRTtBQUNqRSxVQUFJTCxPQUFPLENBQUNNLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxZQUFJLE9BQU9DLE9BQVAsS0FBbUIsV0FBbkIsSUFBa0NBLE9BQU8sQ0FBQ0MsSUFBOUMsRUFBb0Q7QUFDbERELFVBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUNFLDBEQUNBLDhEQURBLEdBRUEsa0VBSEY7QUFLRDtBQUNGO0FBQ0Y7O0FBQ0QsV0FBTyxJQUFJQyxtQkFBSixDQUFlLElBQWYsRUFBcUJULEdBQXJCLEVBQTBCQyxJQUExQixDQUFQO0FBQ0QsRzs7U0FFRE4sUyxHQUFBLG1CQUFXRixPQUFYLEVBQW9CO0FBQ2xCLFFBQUlpQixVQUFVLEdBQUcsRUFBakI7O0FBQ0EseURBQWNqQixPQUFkLHdDQUF1QjtBQUFBLFVBQWRrQixDQUFjOztBQUNyQixVQUFJQSxDQUFDLENBQUNDLE9BQUYsS0FBYyxJQUFsQixFQUF3QjtBQUN0QixZQUFJZixNQUFNLEdBQUdjLENBQUMsRUFBZDtBQUNBLGNBQU0sSUFBSUUsS0FBSixDQUNKLG9CQUFvQmhCLE1BQU0sQ0FBQ2lCLGFBQTNCLEdBQ0EsK0RBRkksQ0FBTjtBQUlEOztBQUVELFVBQUlILENBQUMsQ0FBQ0MsT0FBTixFQUFlRCxDQUFDLEdBQUdBLENBQUMsQ0FBQ0MsT0FBTjs7QUFFZixVQUFJLE9BQU9ELENBQVAsS0FBYSxRQUFiLElBQXlCSSxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsQ0FBQyxDQUFDbEIsT0FBaEIsQ0FBN0IsRUFBdUQ7QUFDckRpQixRQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ1osTUFBWCxDQUFrQmEsQ0FBQyxDQUFDbEIsT0FBcEIsQ0FBYjtBQUNELE9BRkQsTUFFTyxJQUFJLE9BQU9rQixDQUFQLEtBQWEsVUFBakIsRUFBNkI7QUFDbENELFFBQUFBLFVBQVUsQ0FBQ08sSUFBWCxDQUFnQk4sQ0FBaEI7QUFDRCxPQUZNLE1BRUEsSUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBYixLQUEwQkEsQ0FBQyxDQUFDTyxLQUFGLElBQVdQLENBQUMsQ0FBQ1EsU0FBdkMsQ0FBSixFQUF1RDtBQUM1RCxZQUFJcEIsT0FBTyxDQUFDTSxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsZ0JBQU0sSUFBSU8sS0FBSixDQUNKLHFFQUNBLDJEQURBLEdBRUEsdUNBSEksQ0FBTjtBQUtEO0FBQ0YsT0FSTSxNQVFBLElBQUksT0FBT0YsQ0FBUCxLQUFhLFFBQWIsSUFBeUJBLENBQUMsQ0FBQ0csYUFBL0IsRUFBOEM7QUFDbkQsY0FBTSxJQUFJRCxLQUFKLENBQ0osb0JBQW9CRixDQUFDLENBQUNHLGFBQXRCLEdBQ0EsK0RBRkksQ0FBTjtBQUlELE9BTE0sTUFLQTtBQUNMLGNBQU0sSUFBSUQsS0FBSixDQUFVRixDQUFDLEdBQUcsMEJBQWQsQ0FBTjtBQUNEO0FBQ0Y7O0FBQ0QsV0FBT0QsVUFBUDtBQUNELEc7Ozs7O2VBR1lsQixTO0FBRWY7Ozs7Ozs7QUFPQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7OztBQU1BOzs7OztBQUtBOzs7Ozs7QUFNQTs7Ozs7QUFLQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXp5UmVzdWx0IGZyb20gJy4vbGF6eS1yZXN1bHQnXG5cbi8qKlxuICogQ29udGFpbnMgcGx1Z2lucyB0byBwcm9jZXNzIENTUy4gQ3JlYXRlIG9uZSBgUHJvY2Vzc29yYCBpbnN0YW5jZSxcbiAqIGluaXRpYWxpemUgaXRzIHBsdWdpbnMsIGFuZCB0aGVuIHVzZSB0aGF0IGluc3RhbmNlIG9uIG51bWVyb3VzIENTUyBmaWxlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcHJvY2Vzc29yID0gcG9zdGNzcyhbYXV0b3ByZWZpeGVyLCBwcmVjc3NdKVxuICogcHJvY2Vzc29yLnByb2Nlc3MoY3NzMSkudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2cocmVzdWx0LmNzcykpXG4gKiBwcm9jZXNzb3IucHJvY2Vzcyhjc3MyKS50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKSlcbiAqL1xuY2xhc3MgUHJvY2Vzc29yIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPFBsdWdpbnxwbHVnaW5GdW5jdGlvbj58UHJvY2Vzc29yfSBwbHVnaW5zIFBvc3RDU1MgcGx1Z2lucy5cbiAgICogICAgICAgIFNlZSB7QGxpbmsgUHJvY2Vzc29yI3VzZX0gZm9yIHBsdWdpbiBmb3JtYXQuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocGx1Z2lucyA9IFtdKSB7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBQb3N0Q1NTIHZlcnNpb24uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAocmVzdWx0LnByb2Nlc3Nvci52ZXJzaW9uLnNwbGl0KCcuJylbMF0gIT09ICc2Jykge1xuICAgICAqICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHBsdWdpbiB3b3JrcyBvbmx5IHdpdGggUG9zdENTUyA2JylcbiAgICAgKiB9XG4gICAgICovXG4gICAgdGhpcy52ZXJzaW9uID0gJzcuMC4zNCdcbiAgICAvKipcbiAgICAgKiBQbHVnaW5zIGFkZGVkIHRvIHRoaXMgcHJvY2Vzc29yLlxuICAgICAqXG4gICAgICogQHR5cGUge3BsdWdpbkZ1bmN0aW9uW119XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHByb2Nlc3NvciA9IHBvc3Rjc3MoW2F1dG9wcmVmaXhlciwgcHJlY3NzXSlcbiAgICAgKiBwcm9jZXNzb3IucGx1Z2lucy5sZW5ndGggLy89PiAyXG4gICAgICovXG4gICAgdGhpcy5wbHVnaW5zID0gdGhpcy5ub3JtYWxpemUocGx1Z2lucylcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcGx1Z2luIHRvIGJlIHVzZWQgYXMgYSBDU1MgcHJvY2Vzc29yLlxuICAgKlxuICAgKiBQb3N0Q1NTIHBsdWdpbiBjYW4gYmUgaW4gNCBmb3JtYXRzOlxuICAgKiAqIEEgcGx1Z2luIGNyZWF0ZWQgYnkge0BsaW5rIHBvc3Rjc3MucGx1Z2lufSBtZXRob2QuXG4gICAqICogQSBmdW5jdGlvbi4gUG9zdENTUyB3aWxsIHBhc3MgdGhlIGZ1bmN0aW9uIGEgQHtsaW5rIFJvb3R9XG4gICAqICAgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IGFuZCBjdXJyZW50IHtAbGluayBSZXN1bHR9IGluc3RhbmNlXG4gICAqICAgYXMgdGhlIHNlY29uZC5cbiAgICogKiBBbiBvYmplY3Qgd2l0aCBhIGBwb3N0Y3NzYCBtZXRob2QuIFBvc3RDU1Mgd2lsbCB1c2UgdGhhdCBtZXRob2RcbiAgICogICBhcyBkZXNjcmliZWQgaW4gIzIuXG4gICAqICogQW5vdGhlciB7QGxpbmsgUHJvY2Vzc29yfSBpbnN0YW5jZS4gUG9zdENTUyB3aWxsIGNvcHkgcGx1Z2luc1xuICAgKiAgIGZyb20gdGhhdCBpbnN0YW5jZSBpbnRvIHRoaXMgb25lLlxuICAgKlxuICAgKiBQbHVnaW5zIGNhbiBhbHNvIGJlIGFkZGVkIGJ5IHBhc3NpbmcgdGhlbSBhcyBhcmd1bWVudHMgd2hlbiBjcmVhdGluZ1xuICAgKiBhIGBwb3N0Y3NzYCBpbnN0YW5jZSAoc2VlIFtgcG9zdGNzcyhwbHVnaW5zKWBdKS5cbiAgICpcbiAgICogQXN5bmNocm9ub3VzIHBsdWdpbnMgc2hvdWxkIHJldHVybiBhIGBQcm9taXNlYCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtQbHVnaW58cGx1Z2luRnVuY3Rpb258UHJvY2Vzc29yfSBwbHVnaW4gUG9zdENTUyBwbHVnaW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3Ige0BsaW5rIFByb2Nlc3Nvcn1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBwbHVnaW5zLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBwcm9jZXNzb3IgPSBwb3N0Y3NzKClcbiAgICogICAudXNlKGF1dG9wcmVmaXhlcilcbiAgICogICAudXNlKHByZWNzcylcbiAgICpcbiAgICogQHJldHVybiB7UHJvY2Vzc2VzfSBDdXJyZW50IHByb2Nlc3NvciB0byBtYWtlIG1ldGhvZHMgY2hhaW4uXG4gICAqL1xuICB1c2UgKHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucGx1Z2lucy5jb25jYXQodGhpcy5ub3JtYWxpemUoW3BsdWdpbl0pKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHNvdXJjZSBDU1MgYW5kIHJldHVybnMgYSB7QGxpbmsgTGF6eVJlc3VsdH0gUHJvbWlzZSBwcm94eS5cbiAgICogQmVjYXVzZSBzb21lIHBsdWdpbnMgY2FuIGJlIGFzeW5jaHJvbm91cyBpdCBkb2VzbuKAmXQgbWFrZVxuICAgKiBhbnkgdHJhbnNmb3JtYXRpb25zLiBUcmFuc2Zvcm1hdGlvbnMgd2lsbCBiZSBhcHBsaWVkXG4gICAqIGluIHRoZSB7QGxpbmsgTGF6eVJlc3VsdH0gbWV0aG9kcy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8dG9TdHJpbmd8UmVzdWx0fSBjc3MgU3RyaW5nIHdpdGggaW5wdXQgQ1NTIG9yIGFueSBvYmplY3RcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGB0b1N0cmluZygpYCBtZXRob2QsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpa2UgYSBCdWZmZXIuIE9wdGlvbmFsbHksIHNlbmRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSB7QGxpbmsgUmVzdWx0fSBpbnN0YW5jZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHByb2Nlc3NvciB3aWxsIHRha2VcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHtAbGluayBSb290fSBmcm9tIGl0LlxuICAgKiBAcGFyYW0ge3Byb2Nlc3NPcHRpb25zfSBbb3B0c10gICAgICBPcHRpb25zLlxuICAgKlxuICAgKiBAcmV0dXJuIHtMYXp5UmVzdWx0fSBQcm9taXNlIHByb3h5LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwcm9jZXNzb3IucHJvY2Vzcyhjc3MsIHsgZnJvbTogJ2EuY3NzJywgdG86ICdhLm91dC5jc3MnIH0pXG4gICAqICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICogICAgICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKVxuICAgKiAgIH0pXG4gICAqL1xuICBwcm9jZXNzIChjc3MsIG9wdHMgPSB7IH0pIHtcbiAgICBpZiAodGhpcy5wbHVnaW5zLmxlbmd0aCA9PT0gMCAmJiBvcHRzLnBhcnNlciA9PT0gb3B0cy5zdHJpbmdpZmllcikge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnWW91IGRpZCBub3Qgc2V0IGFueSBwbHVnaW5zLCBwYXJzZXIsIG9yIHN0cmluZ2lmaWVyLiAnICtcbiAgICAgICAgICAgICdSaWdodCBub3csIFBvc3RDU1MgZG9lcyBub3RoaW5nLiBQaWNrIHBsdWdpbnMgZm9yIHlvdXIgY2FzZSAnICtcbiAgICAgICAgICAgICdvbiBodHRwczovL3d3dy5wb3N0Y3NzLnBhcnRzLyBhbmQgdXNlIHRoZW0gaW4gcG9zdGNzcy5jb25maWcuanMuJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IExhenlSZXN1bHQodGhpcywgY3NzLCBvcHRzKVxuICB9XG5cbiAgbm9ybWFsaXplIChwbHVnaW5zKSB7XG4gICAgbGV0IG5vcm1hbGl6ZWQgPSBbXVxuICAgIGZvciAobGV0IGkgb2YgcGx1Z2lucykge1xuICAgICAgaWYgKGkucG9zdGNzcyA9PT0gdHJ1ZSkge1xuICAgICAgICBsZXQgcGx1Z2luID0gaSgpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnUG9zdENTUyBwbHVnaW4gJyArIHBsdWdpbi5wb3N0Y3NzUGx1Z2luICtcbiAgICAgICAgICAnIHJlcXVpcmVzIFBvc3RDU1MgOC4gVXBkYXRlIFBvc3RDU1Mgb3IgZG93bmdyYWRlIHRoaXMgcGx1Z2luLidcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoaS5wb3N0Y3NzKSBpID0gaS5wb3N0Y3NzXG5cbiAgICAgIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheShpLnBsdWdpbnMpKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQgPSBub3JtYWxpemVkLmNvbmNhdChpLnBsdWdpbnMpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQucHVzaChpKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgKGkucGFyc2UgfHwgaS5zdHJpbmdpZnkpKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ1Bvc3RDU1Mgc3ludGF4ZXMgY2Fubm90IGJlIHVzZWQgYXMgcGx1Z2lucy4gSW5zdGVhZCwgcGxlYXNlIHVzZSAnICtcbiAgICAgICAgICAgICdvbmUgb2YgdGhlIHN5bnRheC9wYXJzZXIvc3RyaW5naWZpZXIgb3B0aW9ucyBhcyBvdXRsaW5lZCAnICtcbiAgICAgICAgICAgICdpbiB5b3VyIFBvc3RDU1MgcnVubmVyIGRvY3VtZW50YXRpb24uJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgaS5wb3N0Y3NzUGx1Z2luKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnUG9zdENTUyBwbHVnaW4gJyArIGkucG9zdGNzc1BsdWdpbiArXG4gICAgICAgICAgJyByZXF1aXJlcyBQb3N0Q1NTIDguIFVwZGF0ZSBQb3N0Q1NTIG9yIGRvd25ncmFkZSB0aGlzIHBsdWdpbi4nXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihpICsgJyBpcyBub3QgYSBQb3N0Q1NTIHBsdWdpbicpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVkXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvY2Vzc29yXG5cbi8qKlxuICogQGNhbGxiYWNrIGJ1aWxkZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJ0ICAgICAgICAgIFBhcnQgb2YgZ2VuZXJhdGVkIENTUyBjb25uZWN0ZWQgdG8gdGhpcyBub2RlLlxuICogQHBhcmFtIHtOb2RlfSAgIG5vZGUgICAgICAgICAgQVNUIG5vZGUuXG4gKiBAcGFyYW0ge1wic3RhcnRcInxcImVuZFwifSBbdHlwZV0gTm9kZeKAmXMgcGFydCB0eXBlLlxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIHBhcnNlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfHRvU3RyaW5nfSBjc3MgICBTdHJpbmcgd2l0aCBpbnB1dCBDU1Mgb3IgYW55IG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggdG9TdHJpbmcoKSBtZXRob2QsIGxpa2UgYSBCdWZmZXIuXG4gKiBAcGFyYW0ge3Byb2Nlc3NPcHRpb25zfSBbb3B0c10gT3B0aW9ucyB3aXRoIG9ubHkgYGZyb21gIGFuZCBgbWFwYCBrZXlzLlxuICpcbiAqIEByZXR1cm4ge1Jvb3R9IFBvc3RDU1MgQVNUXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgc3RyaW5naWZpZXJcbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgICAgICAgU3RhcnQgbm9kZSBmb3Igc3RyaW5naWZpbmcuIFVzdWFsbHkge0BsaW5rIFJvb3R9LlxuICogQHBhcmFtIHtidWlsZGVyfSBidWlsZGVyIEZ1bmN0aW9uIHRvIGNvbmNhdGVuYXRlIENTUyBmcm9tIG5vZGXigJlzIHBhcnRzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgZ2VuZXJhdGUgc3RyaW5nIGFuZCBzb3VyY2UgbWFwLlxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBzeW50YXhcbiAqIEBwcm9wZXJ0eSB7cGFyc2VyfSBwYXJzZSAgICAgICAgICBGdW5jdGlvbiB0byBnZW5lcmF0ZSBBU1QgYnkgc3RyaW5nLlxuICogQHByb3BlcnR5IHtzdHJpbmdpZmllcn0gc3RyaW5naWZ5IEZ1bmN0aW9uIHRvIGdlbmVyYXRlIHN0cmluZyBieSBBU1QuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSB0b1N0cmluZ1xuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gdG9TdHJpbmdcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBwbHVnaW5GdW5jdGlvblxuICogQHBhcmFtIHtSb290fSByb290ICAgICBQYXJzZWQgaW5wdXQgQ1NTLlxuICogQHBhcmFtIHtSZXN1bHR9IHJlc3VsdCBSZXN1bHQgdG8gc2V0IHdhcm5pbmdzIG9yIGNoZWNrIG90aGVyIHBsdWdpbnMuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBQbHVnaW5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IHBvc3Rjc3MgUG9zdENTUyBwbHVnaW4gZnVuY3Rpb24uXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBwcm9jZXNzT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGZyb20gICAgICAgICAgICAgVGhlIHBhdGggb2YgdGhlIENTUyBzb3VyY2UgZmlsZS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBzaG91bGQgYWx3YXlzIHNldCBgZnJvbWAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWNhdXNlIGl0IGlzIHVzZWQgaW4gc291cmNlIG1hcFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGlvbiBhbmQgc3ludGF4IGVycm9yIG1lc3NhZ2VzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRvICAgICAgICAgICAgICAgVGhlIHBhdGggd2hlcmUgeW914oCZbGwgcHV0IHRoZSBvdXRwdXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUyBmaWxlLiBZb3Ugc2hvdWxkIGFsd2F5cyBzZXQgYHRvYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gZ2VuZXJhdGUgY29ycmVjdCBzb3VyY2UgbWFwcy5cbiAqIEBwcm9wZXJ0eSB7cGFyc2VyfSBwYXJzZXIgICAgICAgICAgIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIEFTVCBieSBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ2lmaWVyfSBzdHJpbmdpZmllciBDbGFzcyB0byBnZW5lcmF0ZSBzdHJpbmcgYnkgQVNULlxuICogQHByb3BlcnR5IHtzeW50YXh9IHN5bnRheCAgICAgICAgICAgT2JqZWN0IHdpdGggYHBhcnNlYCBhbmQgYHN0cmluZ2lmeWAuXG4gKiBAcHJvcGVydHkge29iamVjdH0gbWFwICAgICAgICAgICAgICBTb3VyY2UgbWFwIG9wdGlvbnMuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG1hcC5pbmxpbmUgICAgICAgICAgICAgICAgICAgIERvZXMgc291cmNlIG1hcCBzaG91bGRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgZW1iZWRkZWQgaW4gdGhlIG91dHB1dFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDU1MgYXMgYSBiYXNlNjQtZW5jb2RlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50LlxuICogQHByb3BlcnR5IHtzdHJpbmd8b2JqZWN0fGZhbHNlfGZ1bmN0aW9ufSBtYXAucHJldiBTb3VyY2UgbWFwIGNvbnRlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBhIHByZXZpb3VzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3Npbmcgc3RlcFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm9yIGV4YW1wbGUsIFNhc3MpLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3N0Q1NTIHdpbGwgdHJ5IHRvIGZpbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgbWFwIGF1dG9tYXRpY2FsbHksXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvIHlvdSBjb3VsZCBkaXNhYmxlIGl0IGJ5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgdmFsdWUuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG1hcC5zb3VyY2VzQ29udGVudCAgICAgICAgICAgIERvZXMgUG9zdENTUyBzaG91bGQgc2V0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBvcmlnaW4gY29udGVudCB0byBtYXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xmYWxzZX0gbWFwLmFubm90YXRpb24gICAgICAgICAgIERvZXMgUG9zdENTUyBzaG91bGQgc2V0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFubm90YXRpb24gY29tbWVudCB0byBtYXAuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFwLmZyb20gICAgICAgICAgICAgICAgICAgICAgIE92ZXJyaWRlIGBmcm9tYCBpbiBtYXDigJlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZXNgLlxuICovXG4iXSwiZmlsZSI6InByb2Nlc3Nvci5qcyJ9
