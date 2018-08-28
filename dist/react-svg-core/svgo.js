"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAndFix = validateAndFix;

var _lodash = _interopRequireDefault(require("lodash.isplainobject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// validates svgo opts
// to contain minimal set of plugins that will strip some stuff
// for the babylon JSX parser to work
var essentialPlugins = ["removeDoctype", "removeComments", "removeStyleElement"];

function validateAndFix() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!(0, _lodash.default)(opts)) throw new Error("Expected options.svgo to be Object.");
  if (opts.plugins === void 0) opts.plugins = [];
  if (!Array.isArray(opts.plugins)) throw new Error("Expected options.svgo.plugins to be an array");

  if (opts.plugins.length === 0) {
    opts.plugins = essentialPlugins.concat().map(function (p) {
      return {
        [p]: true
      };
    });
  }

  var state = new Map(); // mark all essential plugins as disabled

  for (var _i = 0; _i < essentialPlugins.length; _i++) {
    var p = essentialPlugins[_i];
    state.set(p, false);
  } // parse through input plugins and mark enabled ones


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = opts.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var plugin = _step.value;

      if ((0, _lodash.default)(plugin)) {
        var _arr = Object.keys(plugin);

        for (var _i3 = 0; _i3 < _arr.length; _i3++) {
          var pluginName = _arr[_i3];

          if (essentialPlugins.indexOf(pluginName) > -1) {
            // enable the plugin in-place if it's an essential plugin
            // $FlowFixMe: suppressing until refactor (`plugin` is a sealed obj)
            plugin[pluginName] = true;
            state.set(pluginName, true);
          }
        }
      } else if (typeof plugin === "string") {
        state.set(plugin, true);
      } else {
        throw new TypeError("Expected SVGO plugin to be of type String or Object. Got " + typeof plugin);
      }
    } // add missing plugins

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var _i2 = 0; _i2 < essentialPlugins.length; _i2++) {
    var _p = essentialPlugins[_i2];

    if (!state.get(_p)) {
      opts.plugins.push(_p);
    }
  } // convert strings to objects to match the form svgo accepts


  for (var i = 0; i < opts.plugins.length; i++) {
    if (typeof opts.plugins[i] === "string") {
      opts.plugins[i] = {
        [opts.plugins[i]]: true
      };
    }
  }
}