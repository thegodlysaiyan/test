"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _reactIntl = require("react-intl");

var _ThemedModule = _interopRequireDefault(require("../../../Themed.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind.default.bind(_ThemedModule.default);

var propTypes = {
  /**
   * Internationalization object with translation APIs. Provided by `injectIntl`.
   */
  intl: _reactIntl.intlShape.isRequired
};

var Themed = function Themed(_ref) {
  var intl = _ref.intl;
  return _react.default.createElement("div", {
    className: cx('themed')
  }, _react.default.createElement("h1", null, "Example File"), _react.default.createElement("div", {
    className: cx('themed-block')
  }), _react.default.createElement("h1", null, "Translated block below"), _react.default.createElement("h1", null, intl.formatMessage({
    id: 'Terra.devSite.themed.help'
  })));
};

Themed.propTypes = propTypes;

var _default = (0, _reactIntl.injectIntl)(Themed);

exports.default = _default;