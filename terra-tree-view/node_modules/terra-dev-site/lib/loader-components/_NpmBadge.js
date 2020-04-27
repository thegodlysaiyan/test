"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _NpmBadgeModule = _interopRequireDefault(require("./NpmBadge.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind.default.bind(_NpmBadgeModule.default);

var propTypes = {
  /**
   * component name.
   */
  name: _propTypes.default.string.isRequired,

  /**
   * url to link to
   */
  url: _propTypes.default.string,

  /**
   * The package version.
   */
  version: _propTypes.default.string.isRequired
};

var NpmBadge = function NpmBadge(_ref) {
  var name = _ref.name,
      url = _ref.url,
      version = _ref.version;
  return _react.default.createElement("div", {
    className: cx('badge-container')
  }, _react.default.createElement("a", {
    className: cx('badge'),
    href: url || "https://www.npmjs.org/package/".concat(name, "/v/").concat(version)
  }, _react.default.createElement("span", {
    className: cx('badge-name')
  }, url ? 'package' : 'npm'), _react.default.createElement("span", {
    className: cx('badge-version')
  }, "v".concat(version))));
};

NpmBadge.propTypes = propTypes;
var _default = NpmBadge;
exports.default = _default;