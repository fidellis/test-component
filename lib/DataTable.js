"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fixedDataTable = require("fixed-data-table-2");

var _AutoSizer = _interopRequireDefault(require("react-virtualized/dist/commonjs/AutoSizer"));

var _clone = _interopRequireDefault(require("lodash/clone"));

var _Header = _interopRequireDefault(require("./Header"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _utils = require("./utils");

require("./data-table.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function prepareColumns(_ref) {
  var columns = _ref.columns,
      hasGroup = _ref.hasGroup,
      parent = _ref.parent;
  var nextColums = {};
  Object.keys(columns).filter(function (key) {
    return columns[key].hide !== true;
  }).forEach(function (key) {
    var column = columns[key];
    var params = {
      key: key,
      columnKey: key,
      parent: parent,
      type: (column.type || 'STRING').toUpperCase(),
      width: column.width || 100,
      flexGrow: !column.width ? 1 : null
    };

    if (column.columns) {
      column.columns = prepareColumns({
        columns: column.columns,
        hasGroup: false,
        parent: key
      });
    } else if (hasGroup && !column.columns) {
      column = {
        columns: _defineProperty({}, key, _objectSpread({}, column, {}, params))
      };
    }

    nextColums[key] = _objectSpread({}, column, {}, params);
  });
  return nextColums;
}

function hasAttribute(originalColumns, attribute) {
  var columns = (0, _utils.getColumns)(originalColumns);
  return Object.keys(columns).some(function (key) {
    return (0, _utils.getColumns)(columns)[key][attribute];
  });
}

function getState(props) {
  var rows = props.rows,
      title = props.title,
      actions = props.actions,
      exportCsv = props.exportCsv,
      count = props.count;
  var hasGroup = Object.keys(props.columns).some(function (key) {
    return props.columns[key].columns;
  });
  var columns = (0, _clone["default"])(prepareColumns({
    columns: props.columns,
    hasGroup: hasGroup
  })); // Object.keys(columns).forEach((key) => {
  //   const column = columns[key];
  //   rows.forEach((row) => {
  //     row[key] = renderCell({ column, row });
  //   });
  // });

  var hasSearch = hasAttribute(columns, 'search');
  var hasHide = hasAttribute(columns, 'allowsHide');
  var menuHeight = props.menuHeight || (count || hasHide || exportCsv || title || actions ? 'auto' : props.menuHeight);
  return {
    columns: columns,
    startColumns: columns,
    rows: rows,
    startRows: rows.slice(),
    config: {
      hasGroup: hasGroup,
      hasSearch: hasSearch,
      hasHide: hasHide,
      menuHeight: menuHeight
    }
  };
}

var DataTable =
/*#__PURE__*/
function (_Component) {
  _inherits(DataTable, _Component);

  function DataTable(props) {
    var _this;

    _classCallCheck(this, DataTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataTable).call(this, props));
    _this.state = getState(props);
    _this.onSearch = _this.onSearch.bind(_assertThisInitialized(_this));
    _this.onSort = _this.onSort.bind(_assertThisInitialized(_this));
    _this.onHide = _this.onHide.bind(_assertThisInitialized(_this));
    _this.onReset = _this.onReset.bind(_assertThisInitialized(_this));
    _this.onResize = _this.onResize.bind(_assertThisInitialized(_this));
    _this.renderGroup = _this.renderGroup.bind(_assertThisInitialized(_this));
    _this.renderColumn = _this.renderColumn.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DataTable, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var rows = nextProps.rows,
          columns = nextProps.columns;

      if (columns !== this.props.columns) {
        this.setState(getState(nextProps));
      }

      if (rows !== this.props.rows) {
        this.setState(getState(nextProps));
      }
    }
  }, {
    key: "onSearch",
    value: function onSearch(_ref2) {
      var value = _ref2.value,
          column = _ref2.column;
      var startRows = this.state.startRows;
      var columns = (0, _utils.getColumns)(this.state.columns);
      column.searchValue = value;
      var filteredColumns = Object.keys(columns).filter(function (key) {
        return columns[key].searchValue;
      }).map(function (key) {
        return columns[key];
      });
      var data = (0, _utils.filter)(startRows.slice(), filteredColumns);
      this.setState({
        rows: data
      });
    }
  }, {
    key: "onSort",
    value: function onSort(column) {
      if (column.sortable === false) return;
      var _this$state = this.state,
          columns = _this$state.columns,
          rows = _this$state.rows;
      column.sorted = !column.sorted;
      Object.keys(columns).forEach(function (key) {
        if (columns[key] !== column) columns[key].sorted = undefined;
      });
      this.setState({
        rows: (0, _utils.sort)(rows, column.key, column.sorted)
      });
    }
  }, {
    key: "onHide",
    value: function onHide(column) {
      var key = column.key,
          parent = column.parent;
      var nextColumns = this.state.columns;

      if (parent) {
        delete nextColumns[parent].columns[key];
      } else {
        delete nextColumns[key];
      }

      this.setState({
        columns: nextColumns
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$state2 = this.state,
          startColumns = _this$state2.startColumns,
          startRows = _this$state2.startRows;
      this.setState({
        columns: (0, _clone["default"])(startColumns),
        rows: startRows
      });
    }
  }, {
    key: "onResize",
    value: function onResize(newColumnWidth, columnKey) {
      this.setState(function (_ref3) {
        var columns = _ref3.columns;
        var column = columns[columnKey];
        column.width = newColumnWidth;
        return {
          columns: columns
        };
      });
    }
  }, {
    key: "renderGroup",
    value: function renderGroup(_ref4) {
      var _this2 = this;

      var columns = _ref4.columns,
          label = _ref4.label,
          headerStyle = _ref4.headerStyle,
          props = _objectWithoutProperties(_ref4, ["columns", "label", "headerStyle"]);

      var groupStyle = label ? {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRightStyle: 'solid',
        borderLeftStyle: 'solid',
        borderColor: '#d3d3d3'
      } : {};
      return _react["default"].createElement(_fixedDataTable.ColumnGroup, _extends({}, props, {
        header: _react["default"].createElement(_Header["default"], {
          style: _objectSpread({}, headerStyle, {}, groupStyle)
        }, label)
      }), Object.keys(columns).map(function (key) {
        var column = columns[key];
        return _this2.renderColumn(column);
      }));
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(column) {
      var _this3 = this;

      var _this$state3 = this.state,
          rows = _this$state3.rows,
          config = _this$state3.config;
      var label = column.label,
          headerStyle = column.headerStyle;
      return _react["default"].createElement(_fixedDataTable.Column, _extends({}, column, {
        isResizable: true,
        header: _react["default"].createElement(_Header["default"], {
          config: config,
          column: column,
          style: headerStyle,
          onSearch: this.onSearch,
          onSort: this.onSort,
          onHide: this.onHide
        }, label),
        cell: function cell(_ref5) {
          var rowIndex = _ref5.rowIndex,
              cellProps = _objectWithoutProperties(_ref5, ["rowIndex"]);

          return _react["default"].createElement(_Cell["default"], _extends({}, cellProps, {
            rowIndex: rowIndex,
            onClick: _this3.props.onClick,
            column: column,
            row: rows[rowIndex]
          }));
        },
        footer: function footer(_ref6) {
          var columnKey = _ref6.columnKey;
          return column.sum && _react["default"].createElement(_Cell["default"], {
            total: true,
            column: column,
            row: _defineProperty({}, columnKey, rows.reduce(function (a, b) {
              return a + b[columnKey];
            }, 0))
          });
        }
      }));
    }
  }, {
    key: "renderColumns",
    value: function renderColumns() {
      var _this$state4 = this.state,
          columns = _this$state4.columns,
          hasGroup = _this$state4.config.hasGroup;
      var render = hasGroup ? this.renderGroup : this.renderColumn;
      return Object.keys(columns).map(function (key) {
        return render(columns[key]);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state5 = this.state,
          rows = _this$state5.rows,
          columns = _this$state5.columns,
          height = _this$state5.height,
          config = _this$state5.config;
      return _react["default"].createElement("div", _extends({}, this.props, {
        rows: rows,
        columns: columns,
        config: config,
        height: height,
        onReset: this.onReset
      }), _react["default"].createElement(_AutoSizer["default"], {
        key: "table"
      }, function (_ref8) {
        var width = _ref8.width;
        return _react["default"].createElement("div", null, _react["default"].createElement(_fixedDataTable.Table, _extends({}, _this4.props, {
          width: width,
          rowsCount: rows.length,
          onContentHeightChange: function onContentHeightChange(contentHeight) {
            return _this4.setState({
              height: contentHeight
            });
          },
          onColumnResizeEndCallback: _this4.onResize
        }), _this4.renderColumns()));
      }));
    }
  }]);

  return DataTable;
}(_react.Component);

DataTable.propTypes = {
  columns: _propTypes["default"].object.isRequired,
  rows: _propTypes["default"].array.isRequired
};
DataTable.defaultProps = {
  columns: {},
  rows: [],
  maxHeight: 700,
  menuHeight: 0,
  headerHeight: 56,
  groupHeaderHeight: 50,
  rowHeight: 40,
  onClick: null,
  isColumnResizing: false
};
var _default = DataTable;
exports["default"] = _default;