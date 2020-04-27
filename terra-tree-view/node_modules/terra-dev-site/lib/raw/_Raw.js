"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _bind = _interopRequireDefault(require("classnames/bind"));

var _navigationPrompt = require("terra-application/lib/navigation-prompt");

var _NotFoundPage = _interopRequireDefault(require("../static-pages/_NotFoundPage"));

var _RawModule = _interopRequireDefault(require("./Raw.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var cx = _bind.default.bind(_RawModule.default);

var propTypes = {
  /**
   * The path to the sites index.
   */
  contentConfig: _propTypes.default.shape({
    placeholder: _propTypes.default.node,
    content: _propTypes.default.object,
    menuItems: _propTypes.default.object
  }).isRequired,

  /**
   * The path to the sites index.
   */
  indexPath: _propTypes.default.string.isRequired,

  /**
   * Injected by react-router: represent where the app is now, where you want it to go,
   * or even where it was.
   */
  location: _propTypes.default.shape({
    pathname: _propTypes.default.string
  }).isRequired
};
var promptProviderValue = {
  registerPrompt: function registerPrompt() {},
  unregisterPrompt: function unregisterPrompt() {}
};

var Raw = function Raw(_ref) {
  var indexPath = _ref.indexPath,
      contentConfig = _ref.contentConfig,
      location = _ref.location;
  var flattenedRouteConfig = Object.keys(contentConfig).reduce(function (allRoutes, pageKey) {
    return _extends(allRoutes, contentConfig[pageKey]);
  }, {});
  var routes = Object.keys(flattenedRouteConfig).sort().reverse();
  var nonRawPath = location.pathname.substring(4);
  var route = routes.find(function (routeToMatch) {
    return (0, _reactRouterDom.matchPath)(nonRawPath, routeToMatch);
  });

  if (route) {
    var _flattenedRouteConfig = flattenedRouteConfig[route].component.default,
        ComponentClass = _flattenedRouteConfig.componentClass,
        props = _flattenedRouteConfig.props;
    return _react.default.createElement("main", {
      className: cx('main'),
      role: "main"
    }, _react.default.createElement(_navigationPrompt.PromptRegistrationContext.Provider, {
      value: promptProviderValue
    }, _react.default.createElement(ComponentClass, props)));
  }

  return _react.default.createElement(_NotFoundPage.default, {
    homePath: indexPath
  });
};

Raw.propTypes = propTypes;

var _default = (0, _reactRouterDom.withRouter)(Raw);

exports.default = _default;