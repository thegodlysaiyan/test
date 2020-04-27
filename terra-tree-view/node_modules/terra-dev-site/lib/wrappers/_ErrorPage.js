"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _terraStatusView = _interopRequireDefault(require("terra-status-view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  error: _propTypes.default.string.isRequired
};

var ErrorPage = function ErrorPage(_ref) {
  var error = _ref.error;
  return _react.default.createElement(_terraStatusView.default, {
    variant: "error",
    title: "Error",
    message: error,
    buttonAttrs: [{
      text: 'Refresh',
      key: 'Refresh',
      onClick: function onClick() {
        window.location.reload(true);
      }
    }]
  });
};

ErrorPage.propTypes = propTypes;
var _default = ErrorPage;
exports.default = _default;