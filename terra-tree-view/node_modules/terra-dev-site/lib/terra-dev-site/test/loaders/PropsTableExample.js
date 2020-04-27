"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/forbid-prop-types, react/no-unused-prop-types */
var propTypes = {
  /**
   * An array
   */
  optionalArray: _propTypes.default.array,

  /**
   * A boolean
   */
  optionalBool: _propTypes.default.bool,

  /**
   * A function
   */
  optionalFunc: _propTypes.default.func,

  /**
   * A number
   */
  optionalNumber: _propTypes.default.number,

  /**
   * An object
   */
  optionalObject: _propTypes.default.object,

  /**
   * A string
   */
  optionalString: _propTypes.default.string,

  /**
   * A symbol
   */
  optionalSymbol: _propTypes.default.symbol,

  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
   */
  optionalNode: _propTypes.default.node,

  /**
   * A React element.
   */
  optionalElement: _propTypes.default.element,

  /**
   * A React element type (ie. MyComponent).
   */
  optionalElementType: _propTypes.default.elementType,

  /**
   * This uses JS's instanceof operator. Instance of should be described here. instanceOf(Message)
   */
  optionalMessage: _propTypes.default.instanceOf(Message),
  // eslint-disable-line no-undef

  /**
   * An enum of values. Values should be described here. One of `News` or `Photos`
   */
  optionalEnum: _propTypes.default.oneOf(['News', 'Photos']),

  /**
   * An object that could be one of many types. Supported types should be described here. Supports string, number, and instanceOf(Message)
   */
  optionalUnion: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.instanceOf(Message) // eslint-disable-line no-undef
  ]),

  /**
   * An array of a certain type
   */
  optionalArrayOf: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * An object with property values of a certain type. objectOf should be described here. objectOf(PropTypes.number)
   */
  optionalObjectOf: _propTypes.default.objectOf(_propTypes.default.number),

  /**
   * An object taking on a particular shape
   */
  optionalObjectWithShape: _propTypes.default.shape({
    color: _propTypes.default.string,
    fontSize: _propTypes.default.number
  }),

  /**
   * An object with warnings on extra properties
   */
  optionalObjectWithStrictShape: _propTypes.default.exact({
    name: _propTypes.default.string,
    quantity: _propTypes.default.number
  }),

  /**
   * Required prop
   */
  requiredFunc: _propTypes.default.func.isRequired,

  /**
   * Another required prop
   */
  requiredAny: _propTypes.default.any.isRequired,

  /**
   * @private
   * This prop is private and should not be display in documentation
   */
  private: _propTypes.default.string,

  /**
   * Internationalization object with translation APIs. Provided by `injectIntl`.
   */
  intl: _reactIntl.intlShape.isRequired,

  /**
   * An Example of fancypants markdown in the comment
   * ```jsx
   * <div>
   *   <h1>
   *    {intl.formatMessage({ id: 'Terra.devSite.themed.help' })}
   *   </h1>
   * </div>
   * ```
   */
  mdx: _propTypes.default.string
};
/* eslint-enable react/forbid-prop-types, react/no-unused-prop-types */

var defaultProps = {
  optionalBool: true,
  optionalArrayOf: ['derp']
};

var Example = function Example(_ref) {
  var intl = _ref.intl;
  return _react.default.createElement("div", null, _react.default.createElement("h1", null, intl.formatMessage({
    id: 'Terra.devSite.themed.help'
  })));
};

Example.propTypes = propTypes;
Example.defaultProps = defaultProps;

var _default = (0, _reactIntl.injectIntl)(Example);

exports.default = _default;