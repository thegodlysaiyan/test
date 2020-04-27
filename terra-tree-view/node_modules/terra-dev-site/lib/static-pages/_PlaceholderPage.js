"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _terraImage = _interopRequireDefault(require("terra-image"));

var _PlaceholderPageModule = _interopRequireDefault(require("./PlaceholderPage.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind.default.bind(_PlaceholderPageModule.default);

var propTypes = {
  /**
   * The image source to display.
   */
  src: _propTypes.default.string
};
var defaultProps = {
  src: undefined
};

var Placeholder = function Placeholder(_ref) {
  var src = _ref.src;
  return _react.default.createElement("div", {
    className: cx('placeholder')
  }, _react.default.createElement("div", {
    className: cx('placeholder-content')
  }, _react.default.createElement("h3", null, !!src && _react.default.createElement(_terraImage.default, {
    variant: "rounded",
    alt: "Placeholder",
    src: src,
    height: "160px",
    width: "160px",
    isFluid: true,
    className: cx('image')
  }))));
};

Placeholder.propTypes = propTypes;
Placeholder.defaultProps = defaultProps;
var _default = Placeholder;
exports.default = _default;