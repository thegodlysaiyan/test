"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _terraContentContainer = _interopRequireDefault(require("terra-content-container"));

var _terraActionHeader = _interopRequireDefault(require("terra-action-header"));

var _disclosureManager = require("terra-application/lib/disclosure-manager");

var _terraStatusView = _interopRequireDefault(require("terra-status-view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestExtension = function TestExtension() {
  var disclosureManager = _react.default.useContext(_disclosureManager.DisclosureManagerContext);

  return _react.default.createElement(_terraContentContainer.default, {
    header: _react.default.createElement(_terraActionHeader.default, {
      title: "Test Extension",
      onBack: disclosureManager.goBack,
      onClose: disclosureManager.closeDisclosure
    }),
    fill: true
  }, _react.default.createElement(_terraStatusView.default, {
    variant: "no-data"
  }));
};

var _default = TestExtension;
exports.default = _default;