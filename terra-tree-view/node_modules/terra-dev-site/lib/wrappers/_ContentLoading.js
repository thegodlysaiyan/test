"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LoadingPage = _interopRequireDefault(require("../static-pages/_LoadingPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContentLoading = function ContentLoading() {
  return _react.default.createElement("div", {
    "data-terra-dev-site-content-loading": true
  }, _react.default.createElement(_LoadingPage.default, null));
};

var _default = ContentLoading;
exports.default = _default;