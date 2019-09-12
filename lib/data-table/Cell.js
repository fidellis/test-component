"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fixedDataTable = require("fixed-data-table-2");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  COLUMN: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    fontSize: 12,
    color: '#626466'
  },
  ONCLICK: {
    cursor: 'pointer'
  },
  INTEGER: {
    justifyContent: 'flex-end'
  },
  DECIMAL: {
    justifyContent: 'flex-end'
  },
  NUMBER: {
    justifyContent: 'flex-end'
  },
  PERCENT: {
    justifyContent: 'flex-end'
  },
  BOOLEAN: {
    justifyContent: 'center'
  },
  DATE: {
    justifyContent: 'center'
  },
  DATETIME: {
    justifyContent: 'center'
  },
  TIME: {
    justifyContent: 'center'
  }
};

function getStyle(_ref) {
  var column = _ref.column,
      value = _ref.value,
      onClick = _ref.onClick,
      rowIndex = _ref.rowIndex,
      row = _ref.row;
  var type = column.type,
      align = column.align;

  var style = _objectSpread({}, styles.COLUMN, {}, styles[type], {}, column.style);

  if (column.styleRenderer) style = _objectSpread({}, style, {}, column.styleRenderer({
    value: value,
    rowIndex: rowIndex,
    row: row
  }));
  if (onClick) style = _objectSpread({}, style, {}, styles.ONCLICK);

  if (align) {
    var justifyContent = 'flex-start';

    if (align === 'center') {
      justifyContent = 'center';
    } else if (align === 'right') {
      justifyContent = 'flex-end';
    }

    style = _objectSpread({}, style, {
      justifyContent: justifyContent
    });
  }

  return style;
}

var TableCell = function TableCell(_ref2) {
  var columnKey = _ref2.columnKey,
      rowIndex = _ref2.rowIndex,
      column = _ref2.column,
      row = _ref2.row,
      props = _objectWithoutProperties(_ref2, ["columnKey", "rowIndex", "column", "row"]);

  var _onClick = column.onClick || props.onClick;

  var value = (0, _utils.renderCell)({
    column: column,
    row: row
  });
  return _react["default"].createElement(_fixedDataTable.Cell, _extends({}, props, {
    style: getStyle({
      column: column,
      row: row,
      value: value,
      rowIndex: rowIndex,
      columnKey: columnKey,
      onClick: _onClick
    }),
    onClick: function onClick() {
      return _onClick ? _onClick({
        row: row,
        column: column,
        rowIndex: rowIndex,
        columnKey: columnKey
      }) : null;
    }
  }), value);
};

TableCell.propTypes = {
  row: _propTypes["default"].object.isRequired,
  column: _propTypes["default"].object.isRequired
};
TableCell.defaultProps = {
  column: {},
  row: {}
};
var _default = TableCell;
exports["default"] = _default;