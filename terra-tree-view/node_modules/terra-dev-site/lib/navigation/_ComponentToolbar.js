"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _terraButton = _interopRequireDefault(require("terra-button"));

var _IconLeftPane = _interopRequireDefault(require("terra-icon/lib/icon/IconLeftPane"));

var _MenuButton = _interopRequireDefault(require("../menu-button/_MenuButton"));

var _AppSettingsContext = _interopRequireDefault(require("./_AppSettingsContext"));

var _ComponentToolbarModule = _interopRequireDefault(require("./ComponentToolbar.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind.default.bind(_ComponentToolbarModule.default);

var propTypes = {
  /**
   * Callback for showing the side menu
   */
  onToggle: _propTypes.default.func,

  /**
   * Menu visible external state
   */
  menuIsVisible: _propTypes.default.bool,

  /**
   * Hide the dev tools part of the toolbar.
   */
  hideDevTools: _propTypes.default.bool
};
var defaultProps = {
  onToggle: undefined,
  menuIsVisible: false,
  hideDevTools: false
};

var ComponentToolbar = function ComponentToolbar(_ref) {
  var onToggle = _ref.onToggle,
      menuIsVisible = _ref.menuIsVisible,
      hideDevTools = _ref.hideDevTools;

  var appSettings = _react.default.useContext(_AppSettingsContext.default);

  var hasThemes = !hideDevTools && appSettings.themes && Object.keys(appSettings.themes).length > 1;
  var hasLocales = !hideDevTools && appSettings.locales && appSettings.locales.length > 1;

  var onChangeTheme = function onChangeTheme(theme) {
    return appSettings.onUpdate({
      theme: theme
    });
  };

  var onChangeLocale = function onChangeLocale(locale) {
    return appSettings.onUpdate({
      locale: locale
    });
  };

  return _react.default.createElement("div", {
    className: cx('header')
  }, _react.default.createElement("div", {
    className: cx('toggle')
  }, onToggle ? _react.default.createElement(_terraButton.default, {
    id: "terra-dev-site-menu-toggle",
    text: menuIsVisible ? 'Close Menu' : 'Open Menu',
    key: menuIsVisible ? 'close-menu' : 'open-menu',
    icon: _react.default.createElement(_IconLeftPane.default, null),
    variant: "ghost",
    isIconOnly: true,
    onClick: onToggle
  }) : null), _react.default.createElement("div", {
    className: cx('flex-collapse')
  }, hasThemes && _react.default.createElement(_MenuButton.default, {
    text: "Theme",
    items: Object.keys(appSettings.themes),
    selectedKey: appSettings.currentTheme,
    onChange: onChangeTheme
  }), hasLocales && _react.default.createElement(_MenuButton.default, {
    text: "Locale",
    items: appSettings.locales,
    selectedKey: appSettings.currentLocale,
    onChange: onChangeLocale
  })));
};

ComponentToolbar.propTypes = propTypes;
ComponentToolbar.defaultProps = defaultProps;
var _default = ComponentToolbar;
exports.default = _default;