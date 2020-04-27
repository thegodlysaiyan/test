"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _terraActionHeader = _interopRequireDefault(require("terra-action-header"));

var _terraContentContainer = _interopRequireDefault(require("terra-content-container"));

var _disclosureManager = require("terra-application/lib/disclosure-manager");

var _CodesplitWrapper = _interopRequireDefault(require("./_CodesplitWrapper"));

var _LoadingPage = _interopRequireDefault(require("../static-pages/_LoadingPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// eslint-disable-next-line react/prop-types
var ExtensionShell = function ExtensionShell(_ref) {
  var title = _ref.title,
      children = _ref.children;

  var disclosureManager = _react.default.useContext(_disclosureManager.DisclosureManagerContext);

  return _react.default.createElement(_terraContentContainer.default, {
    header: _react.default.createElement(_terraActionHeader.default, {
      title: title,
      onBack: disclosureManager.goBack,
      onClose: disclosureManager.closeDisclosure
    }),
    fill: true
  }, children);
};

var ErrorWrapper = function ErrorWrapper(props) {
  return _react.default.createElement(ExtensionShell, _extends({}, props, {
    title: "Error"
  }));
};

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

var ExtensionWrapper = function ExtensionWrapper(props) {
  return _react.default.createElement(_CodesplitWrapper.default, _extends({}, props, {
    fallback: _react.default.createElement(ExtensionShell, {
      title: "Loading"
    }, _react.default.createElement(_LoadingPage.default, null)),
    errorWrapper: ErrorWrapper
  }));
};

ExtensionWrapper.propTypes = propTypes;
ExtensionWrapper.defaultProps = defaultProps;
var _default = ExtensionWrapper;
exports.default = _default;