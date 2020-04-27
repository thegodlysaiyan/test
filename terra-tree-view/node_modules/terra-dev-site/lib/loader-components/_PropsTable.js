"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _PropsTableModule = _interopRequireDefault(require("./PropsTable.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/forbid-dom-props */
var cx = _bind.default.bind(_PropsTableModule.default);

var propTypes = {
  /**
   * The props table rows.
   */
  rows: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string,
    type: _propTypes.default.func,
    required: _propTypes.default.bool,
    defaultValue: _propTypes.default.string,
    description: _propTypes.default.func
  }))
};

var PropsTable = function PropsTable(_ref) {
  var rows = _ref.rows;
  return _react.default.createElement("table", {
    className: cx('table')
  }, _react.default.createElement("thead", null, _react.default.createElement("tr", {
    className: cx('tr')
  }, _react.default.createElement("th", {
    className: cx('th')
  }, "Prop Name"), _react.default.createElement("th", {
    className: cx('th')
  }, "Type"), _react.default.createElement("th", {
    className: cx('th')
  }, "Is Required"), _react.default.createElement("th", {
    className: cx('th')
  }, "Default Value"), _react.default.createElement("th", {
    className: cx('th')
  }, "Description"))), _react.default.createElement("tbody", null, rows.map(function (row) {
    return _react.default.createElement("tr", {
      className: cx(['tr', 'props-tr']),
      key: row.name
    }, _react.default.createElement("td", {
      className: cx(['td', 'strong', 'props-td'])
    }, row.name), _react.default.createElement("td", {
      className: cx(['td', 'props-td'])
    }, row.type()), _react.default.createElement("td", {
      className: cx(['td', 'props-td', row.required ? ['required'] : []])
    }, row.required ? 'required' : 'optional'), _react.default.createElement("td", {
      className: cx(['td', 'props-td'])
    }, row.defaultValue), _react.default.createElement("td", {
      className: cx(['td', 'props-td'])
    }, row.description()));
  })));
};

PropsTable.propTypes = propTypes;
var _default = PropsTable;
exports.default = _default;