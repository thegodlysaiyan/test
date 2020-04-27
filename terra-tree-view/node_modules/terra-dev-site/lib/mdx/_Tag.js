"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _MarkdownTagsModule = _interopRequireDefault(require("./MarkdownTags.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var cx = _bind.default.bind(_MarkdownTagsModule.default);

var propTypes = {
  /**
   * The html tag for this component.
   */
  Tag: _propTypes.default.string,

  /**
   * Props to apply to this component tag
   */
  props: _propTypes.default.shape({
    className: _propTypes.default.string,
    children: _propTypes.default.node
  })
};
/**
 * A component to represent an html tag for MDX.
 * @param {{ Tag, props: componentProps }} props
 */

var TagComp = function TagComp(_ref) {
  var Tag = _ref.Tag,
      componentProps = _ref.props;
  return _react.default.createElement(Tag, _extends({}, componentProps, {
    className: [cx(Tag), componentProps.className].join(' ')
  }), componentProps.children);
};

TagComp.propTypes = propTypes;
var _default = TagComp;
exports.default = _default;