"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an app settings context to share global app setting with the dev toolbar.
 */
var AppSettingsContext = _react.default.createContext({});

var _default = AppSettingsContext;
exports.default = _default;