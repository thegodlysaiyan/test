"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _terraImage = _interopRequireDefault(require("terra-image"));

var _terraContentContainer = _interopRequireDefault(require("terra-content-container"));

var _terraActionHeader = _interopRequireDefault(require("terra-action-header"));

var _ScreenshotWrapperModule = _interopRequireDefault(require("./ScreenshotWrapper.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind.default.bind(_ScreenshotWrapperModule.default);

var propTypes = {
  imageConfig: _propTypes.default.arrayOf(_propTypes.default.shape({
    viewport: _propTypes.default.string.isRequired,
    contentPath: _propTypes.default.string.isRequired
  })).isRequired
};

var createImage = function createImage(config, index) {
  return _react.default.createElement(_terraContentContainer.default, {
    header: _react.default.createElement(_terraActionHeader.default, {
      title: "Viewport: ".concat(config.viewport)
    }),
    key: "image-".concat(index)
  }, _react.default.createElement(_terraImage.default, {
    src: config.contentPath,
    className: cx('image')
  }));
};

var ScreenshotWrapper = function ScreenshotWrapper(_ref) {
  var imageConfig = _ref.imageConfig;
  return _react.default.createElement(_react.default.Fragment, null, imageConfig.map(function (config, index) {
    return createImage(config, index);
  }));
};

ScreenshotWrapper.propTypes = propTypes;
var _default = ScreenshotWrapper;
exports.default = _default;