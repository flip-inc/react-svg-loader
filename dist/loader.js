"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _reactSvgCore = require("./react-svg-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(content) {
  const loaderOpts = _loaderUtils.default.getOptions(this) || {};
  const cb = this.async();
  Promise.resolve(String(content)).then((0, _reactSvgCore.optimize)(loaderOpts.svgo)).then((0, _reactSvgCore.transform)({
    jsx: loaderOpts.jsx
  })).then(result => cb(null, result.code));
}