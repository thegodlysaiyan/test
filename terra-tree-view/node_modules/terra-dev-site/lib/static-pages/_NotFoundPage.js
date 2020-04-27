"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _terraStatusView = _interopRequireDefault(require("terra-status-view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  /**
   * Injected by react-router: the object representing browser history.
   */
  // eslint-disable-next-line react/forbid-prop-types
  history: _propTypes.default.object.isRequired,

  /**
   * Path to home
   */
  homePath: _propTypes.default.string.isRequired
};

var NotFoundPage = function NotFoundPage(_ref) {
  var history = _ref.history,
      homePath = _ref.homePath;
  return _react.default.createElement(_terraStatusView.default, {
    variant: "error",
    title: "404",
    message: "Page not found",
    buttonAttrs: [{
      text: 'Go Back',
      onClick: function onClick() {
        history.goBack();
      }
    }, {
      text: 'Home',
      onClick: function onClick() {
        history.replace(homePath);
      }
    }]
  });
};

NotFoundPage.propTypes = propTypes;

var _default = (0, _reactRouterDom.withRouter)(NotFoundPage);

exports.default = _default;