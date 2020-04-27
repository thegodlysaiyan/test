"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuItemPropType = exports.menuItemsPropType = exports.capabilitiesPropType = exports.settingsConfigPropType = exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Object describing in site configurable settings
 */
var settingsConfigPropType = _propTypes.default.shape({
  /**
   * By default the site is set to this theme
   */
  defaultTheme: _propTypes.default.string,

  /**
   * List of all available themes
   */
  themes: _propTypes.default.object,

  /**
   * By default the site is set to this locale
   */
  defaultLocale: _propTypes.default.string,

  /**
   * List of all available locales
   */
  locales: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * By default the site is set to this direction
   */
  defaultDirection: _propTypes.default.string,

  /**
   * List of all available directions
   */
  directions: _propTypes.default.arrayOf(_propTypes.default.string)
});
/**
 * Callback for showing the side menu
 */


exports.settingsConfigPropType = settingsConfigPropType;
var capabilitiesPropType = _propTypes.default.object;
/**
 * Individual menu item for side nav
 */

exports.capabilitiesPropType = capabilitiesPropType;

var menuItemPropType = _propTypes.default.arrayOf(_propTypes.default.shape({
  /**
   * Text for the menu item
   */
  text: _propTypes.default.string,

  /**
   * On-click the menu item will take you here
   */
  path: _propTypes.default.string,

  /**
   * Sub menu items
   */
  childItems: _propTypes.default.arrayOf(_propTypes.default.object)
}));
/**
 * Menu items for side navigation
 */


exports.menuItemPropType = menuItemPropType;

var menuItemsPropType = _propTypes.default.PropTypes.objectOf(menuItemPropType);
/**
 * Object describing the generated dev-site-config object.
 */


exports.menuItemsPropType = menuItemsPropType;

var siteConfigPropType = _propTypes.default.shape({
  /**
   * Describes the site name
   */
  nameConfig: _propTypes.default.shape({
    /**
     * Title for site
     */
    title: _propTypes.default.string
  }),

  /**
   * Object describing in site configurable settings
   */
  settingsConfig: settingsConfigPropType,

  /**
   * Menu items for side navigation
   */
  menuItems: menuItemsPropType,

  /**
   * Content items to be displayed in app.
   */
  contentConfig: _propTypes.default.object,

  /**
   * Primary navigation items.
   */
  navigationItems: _propTypes.default.arrayOf(_propTypes.default.shape({
    /**
     * Path to navigate to on click.
     */
    path: _propTypes.default.string,

    /**
     * Title text.
     */
    text: _propTypes.default.string
  })),

  /**
   * / redirects here.
   */
  indexPath: _propTypes.default.string,

  /**
   * Unused for now.
   */
  apps: _propTypes.default.arrayOf(_propTypes.default.shape({
    path: _propTypes.default.string,
    title: _propTypes.default.string,
    file: _propTypes.default.string,
    basename: _propTypes.default.string,
    rootElementId: _propTypes.default.string
  })),

  /**
   * Describes capabilities of pages shown below various primary navigation items
   */
  capabilities: capabilitiesPropType,

  /**
   * Custom extensions
   */
  extensions: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   * Image to display on secondary nav pages where the first item is a folder.
   */
  placeholderSrc: _propTypes.default.string
});

var _default = siteConfigPropType;
exports.default = _default;