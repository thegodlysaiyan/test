"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _CodesplitWrapper = _interopRequireDefault(require("./_CodesplitWrapper"));

var _ContentLoaded = _interopRequireDefault(require("./_ContentLoaded"));

var _ContentLoading = _interopRequireDefault(require("./_ContentLoading"));

var _MarkdownWrapperModule = _interopRequireDefault(require("./MarkdownWrapper.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var cx = _bind.default.bind(_MarkdownWrapperModule.default);

var propTypes = {
  /**
   * The content to be placed within the main content area of the container.
   */
  // eslint-disable-next-line react/forbid-prop-types
  content: _propTypes.default.object.isRequired,

  /**
   * The props to be applied to the content.
   */
  // eslint-disable-next-line react/forbid-prop-types
  props: _propTypes.default.object
};
var defaultProps = {
  props: undefined
};

var MarkdownWrapper = function MarkdownWrapper(props) {
  return _react.default.createElement(_CodesplitWrapper.default, _extends({}, props, {
    fallback: _react.default.createElement(_ContentLoading.default, null),
    loadedWrapper: function loadedWrapper(_ref) {
      var children = _ref.children;
      return _react.default.createElement(_ContentLoaded.default, null, _react.default.createElement("div", {
        className: cx('markdown')
      }, children));
    },
    errorWrapper: _ContentLoaded.default
  }));
};

MarkdownWrapper.propTypes = propTypes;
MarkdownWrapper.defaultProps = defaultProps;
var _default = MarkdownWrapper;
exports.default = _default;