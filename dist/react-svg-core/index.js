"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optimize = optimize;
exports.transform = transform;

var _svgo = _interopRequireDefault(require("svgo"));

var _core = require("@babel/core");

var _babelPluginReactSvg = _interopRequireDefault(require("./babel-plugin-react-svg"));

var _svgo2 = require("./svgo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SVGO Optimize
function optimize(opts = {}) {
  (0, _svgo2.validateAndFix)(opts);
  const svgo = new _svgo.default(opts);
  return content => svgo.optimize(content).then(data => data.data);
} // Babel Transform


function transform({
  jsx = false
} = {}) {
  return content => (0, _core.transform)(content, {
    babelrc: false,
    presets: [jsx ? void 0 : "@babel/preset-react"].filter(Boolean),
    plugins: ["@babel/plugin-syntax-jsx", "@babel/plugin-proposal-object-rest-spread", _babelPluginReactSvg.default]
  });
}