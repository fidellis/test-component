"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Menu = _interopRequireDefault(require("./Menu"));

var _reactLoading = _interopRequireDefault(require("react-loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  loading: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center'
  }
};

var Container = function Container(props) {
  var children = props.children,
      maxHeight = props.maxHeight,
      width = props.width,
      height = props.height,
      style = props.style,
      config = props.config,
      loading = props.loading;
  var menuHeight = config.menuHeight;
  return _react["default"].createElement("div", {
    style: _objectSpread({
      width: width
    }, style)
  }, !!menuHeight && _react["default"].createElement(_Menu["default"], _extends({}, props, config)), _react["default"].createElement("div", {
    style: {
      height: height < maxHeight ? height : maxHeight
    }
  }, children), loading && _react["default"].createElement("div", {
    style: styles.loading
  }, _react["default"].createElement(_reactLoading["default"], {
    type: "spin",
    color: "#1976d2",
    height: 50,
    width: 50
  })));
};

Container.defaultProps = {
  width: '100%',
  style: styles.container,
  loading: false
};
var _default = Container;
exports["default"] = _default;