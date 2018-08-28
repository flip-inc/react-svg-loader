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
function optimize() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _svgo2.validateAndFix)(opts);
  var svgo = new _svgo.default(opts);
  return function (content) {
    return svgo.optimize(content).then(function (data) {
      return data.data;
    });
  };
} // Babel Transform


function transform() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$jsx = _ref.jsx,
      jsx = _ref$jsx === void 0 ? false : _ref$jsx;

  return function (content) {
    return (0, _core.transform)(content, {
      babelrc: false,
      presets: [jsx ? void 0 : "@babel/preset-react"].filter(Boolean),
      plugins: ["@babel/plugin-syntax-jsx", "@babel/plugin-proposal-object-rest-spread", _babelPluginReactSvg.default]
    });
  };
}