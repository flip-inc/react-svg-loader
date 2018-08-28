"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reactSvgLoadPlugin;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _reactSvgCore = require("react-svg-core");

var _rollupPluginutils = require("rollup-pluginutils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reactSvgLoadPlugin() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var filter = (0, _rollupPluginutils.createFilter)(options.include, options.exclude);
  return {
    name: "react-svg",

    load(id) {
      if (!filter(id) || _path.default.extname(id) !== ".svg") return;

      var contents = _fs.default.readFileSync(id);

      return Promise.resolve(String(contents)).then((0, _reactSvgCore.optimize)(options.svgo)).then((0, _reactSvgCore.transform)({
        jsx: options.jsx
      })).then(function (result) {
        return result.code;
      });
    }

  };
}