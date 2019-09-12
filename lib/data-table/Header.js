"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var searchHeight = 30;
var styles = {
  container: {
    // background: '#FFFFFF',
    // color: 'rgba(0,0,0,0.54)',
    background: '#1976d2',
    color: '#FFFFFF',
    // color: '#626466',
    textAlign: 'center',
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderWidth: [0, 1, 0, 0],
    borderColor: 'rgba(0,0,0,0.02)'
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12 // padding: 8,

  },
  hide: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: 5,
    color: 'rgba(0,0,0,0.2)',
    fontSize: 14
  },
  search: {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: searchHeight
    },
    input: {
      width: '90%',
      height: 18,
      border: 1,
      borderColor: 'rgba(0, 0, 0, 0.14)',
      borderStyle: 'solid',
      borderRadius: 4
    }
  }
};

var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this, props));
    _this.onSort = _this.onSort.bind(_assertThisInitialized(_this));
    _this.onHide = _this.onHide.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Header, [{
    key: "onSort",
    value: function onSort(e) {
      e.preventDefault();

      if (this.props.onSort) {
        this.props.onSort(this.props.column);
      }
    }
  }, {
    key: "onHide",
    value: function onHide(e) {
      e.preventDefault();

      if (this.props.onHide) {
        this.props.onHide(this.props.column);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          column = _this$props.column,
          width = _this$props.width,
          height = _this$props.height,
          onSearch = _this$props.onSearch,
          config = _this$props.config,
          style = _this$props.style;
      var labelHeight = config.hasSearch ? height - searchHeight : height;
      var sortable = column.sortable !== false;
      var sortIcon = column.sorted !== undefined && sortable ? column.sorted ? ' ↑' : ' ↓' : '';
      var allowsHide = column.allowsHide === true;

      var hideIcon = allowsHide && _react["default"].createElement("span", {
        style: styles.hide,
        onClick: this.onHide,
        title: "Ocultar Coluna"
      }, "x");

      var onClick = sortable ? this.onSort : null;
      var labelStyle = {
        padding: 8,
        cursor: sortable ? 'pointer' : null
      };

      var label = _react["default"].createElement("span", {
        onClick: onClick,
        style: labelStyle
      }, children);

      var search = column.search === true;
      var searchValue = column.searchValue || '';
      return _react["default"].createElement("div", {
        style: _objectSpread({}, styles.container, {}, style, {
          height: height
        })
      }, _react["default"].createElement("div", {
        style: _objectSpread({}, styles.label, {
          width: width,
          height: labelHeight
        })
      }, hideIcon, label, sortIcon), search && _react["default"].createElement("div", {
        style: styles.search.container
      }, _react["default"].createElement("input", {
        onChange: function onChange(e) {
          return onSearch({
            value: e.target.value,
            column: column
          });
        },
        value: searchValue,
        style: styles.search.input
      })));
    }
  }]);

  return Header;
}(_react.Component);

Header.propTypes = {
  children: _propTypes["default"].node.isRequired,
  column: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  style: _propTypes["default"].object,
  config: _propTypes["default"].object.isRequired,
  onSort: _propTypes["default"].func,
  onHide: _propTypes["default"].func,
  onSearch: _propTypes["default"].func
};
Header.defaultProps = {
  style: {},
  config: {},
  column: {},
  onSort: null,
  onHide: null,
  onSearch: null
};
var _default = Header;
exports["default"] = _default;