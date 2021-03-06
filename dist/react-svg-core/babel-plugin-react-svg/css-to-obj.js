"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssToObj;

function cssToObj(css) {
  let o = {};
  let elements = css.split(";");
  elements.filter(el => !!el).map(el => {
    let s = el.split(":"),
        key = s.shift().trim(),
        value = s.join(":").trim();
    o[key] = value;
  });
  return o;
}