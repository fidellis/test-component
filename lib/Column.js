"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fixedDataTable = require("fixed-data-table-2");

var _Header = _interopRequireDefault(require("./Header"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _utils = require("./utils");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ColumnTable = function ColumnTable(_ref) {
  var column = _ref.column,
      rows = _ref.rows,
      config = _ref.config;
  var label = column.label;
  return _react["default"].createElement(_fixedDataTable.Column, _extends({}, column, {
    isResizable: true,
    header: _react["default"].createElement(_Header["default"], {
      config: config,
      column: column,
      onSearch: _this.onSearch,
      onSort: _this.onSort,
      onHide: _this.onHide
    }, label),
    cell: function cell(cellProps) {
      return _react["default"].createElement(_Cell["default"], _extends({}, cellProps, _this.props, {
        column: column,
        rows: rows,
        renderCell: _utils.renderCell
      }));
    },
    footer: function footer(_ref2) {
      var columnKey = _ref2.columnKey;
      return _react["default"].createElement(_Cell["default"], null, column.sum ? (0, _utils.renderCell)(rows.reduce(function (a, b) {
        return a + b[columnKey];
      }, 0)) : null);
    }
  }));
};

ColumnTable.propTypes = {
  rows: _propTypes["default"].array.isRequired,
  column: _propTypes["default"].object.isRequired,
  config: _propTypes["default"].object.isRequired
};
ColumnTable.defaultProps = {};
var _default = ColumnTable;
exports["default"] = _default;