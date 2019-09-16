"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _arrow_downward = _interopRequireDefault(require("./img/arrow_downward.svg"));

var _refresh = _interopRequireDefault(require("./img/refresh.svg"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var style = {
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
    fontSize: 14,
    color: '#626466'
  },
  title: {// fontSize: 28,
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  action: {
    paddingRight: 6,
    cursor: 'pointer'
  },
  count: {
    display: 'flex'
  }
};

var Image = function Image(props) {
  return _react["default"].createElement("img", _extends({}, props, {
    style: style.action
  }));
};

var Menu = function Menu(props) {
  var rows = props.rows,
      columns = props.columns,
      onReset = props.onReset,
      hasSearch = props.hasSearch,
      hasHide = props.hasHide,
      reset = props.reset,
      exportCsv = props.exportCsv,
      actions = props.actions,
      menuHeight = props.menuHeight,
      title = props.title,
      count = props.count;
  return _react["default"].createElement("div", {
    style: _objectSpread({}, style.container, {
      height: menuHeight
    })
  }, _react["default"].createElement("div", {
    style: style.title
  }, title), _react["default"].createElement("div", {
    style: style.actions
  }, actions.map(function (action) {
    return _react["default"].createElement("div", {
      style: style.action
    }, action);
  }), (hasHide || reset) && _react["default"].createElement(Image, {
    src: _refresh["default"],
    title: "Atualizar",
    onClick: onReset
  }), exportCsv && _react["default"].createElement(Image, {
    src: _arrow_downward["default"],
    title: "Exportar",
    onClick: function onClick() {
      return props.onExportCsv ? props.onExportCsv({
        rows: rows,
        columns: columns
      }) : (0, _utils.onExportCsv)({
        rows: rows,
        columns: columns
      });
    }
  }), count && _react["default"].createElement("div", {
    style: style.count
  }, (0, _utils.format)(rows.length, 'INTEGER'), " Registros")));
};

Menu.propTypes = {
  rows: _propTypes["default"].array.isRequired,
  columns: _propTypes["default"].object.isRequired,
  exportCsv: _propTypes["default"].bool,
  onReset: _propTypes["default"].func.isRequired,
  hasSearch: _propTypes["default"].bool,
  hasHide: _propTypes["default"].bool,
  menuHeight: _propTypes["default"].number,
  title: _propTypes["default"].string,
  actions: _propTypes["default"].array
};
Menu.defaultProps = {
  rows: [],
  columns: {},
  hasSearch: false,
  hasHide: false,
  menuHeight: 0,
  title: null,
  exportCsv: false,
  onExportCsv: _utils.onExportCsv,
  actions: [],
  count: false
};
var _default = Menu;
exports["default"] = _default;