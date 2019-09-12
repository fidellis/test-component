"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatInteger = formatInteger;
exports.formatDecimal = formatDecimal;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.formatCurrency = formatCurrency;
exports.removeSymbols = removeSymbols;
exports.format = format;
exports.renderCell = renderCell;
exports.sort = sort;
exports.getColumns = getColumns;
exports.exportCsv = exportCsv;
exports.onExportCsv = onExportCsv;
exports.filter = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _get = _interopRequireDefault(require("lodash/get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function formatInteger(valor) {
  return parseInt(valor || 0, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatDecimal(n, toFixed) {
  // return parseFloat(n).toLocaleString('pt-br', { minimumFractionDigits: 2 });
  return n ? parseFloat(n).toFixed(toFixed || toFixed === 0 ? toFixed : 2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.') : n;
}

function formatDate(date, mask) {
  return (0, _moment["default"])((0, _moment["default"])(date)._i.toString().slice(0, 10)).format(mask || 'DD/MM/YYYY');
}

function formatDateTime(date) {
  return (0, _moment["default"])(date).add('hour', 3).format('DD/MM/YYYY HH:mm');
}

function formatCurrency(value, decimals) {
  var parsedValue = parseFloat(value);
  var BILHAO = 1000000000;
  var MILHAO = 1000000;
  var MIL = 1000;

  if (Math.abs(parsedValue) >= BILHAO) {
    return "".concat(formatDecimal(parsedValue / BILHAO, decimals || 2), " bi");
  }

  if (Math.abs(parsedValue) >= MILHAO) {
    return "".concat(formatDecimal(parsedValue / MILHAO, decimals || 2), " mi");
  }

  if (Math.abs(parsedValue) >= MIL) {
    return "".concat(formatDecimal(parsedValue / MIL, decimals || 0), " mil");
  }

  return formatDecimal(value);
}

function removeSymbols(input) {
  var output = input;
  var map = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g
  }; // eslint-disable-next-line

  for (var c in map) {
    var regex = map[c];
    output = output.replace(regex, c);
  }

  return output;
}

function format(data) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  type = type.toUpperCase();

  if (type === 'DECIMAL') {
    return formatDecimal(data);
  } else if (type === 'INTEGER' && data) {
    return formatInteger(data);
  } else if (data && type === 'DATE') {
    return formatDate(data);
  } else if (data && type === 'DATETIME') {
    return formatDateTime(data);
  } else if (data && type === 'TIME') {
    return (0, _moment["default"])(data, 'HH:mm:ss').format('HH:mm');
  } else if (type === 'PERCENT') {
    return "".concat(formatDecimal(data), " %");
  } else if (type === 'BOOLEAN') {
    return data === true ? 'Sim' : data === false ? 'Não' : '';
  }

  return data || '';
}

function renderCell(_ref) {
  var column = _ref.column,
      row = _ref.row;
  var key = column.key,
      type = column.type,
      cellRenderer = column.cellRenderer;
  var value = cellRenderer ? cellRenderer({
    row: row,
    column: column
  }) : (0, _get["default"])(row, key);
  return format(value, type);
}

var filter = function filter(initialRows, filteredColumns) {
  var rows = initialRows;
  return rows.filter(function (row) {
    return filteredColumns.every(function (column) {
      var searchValue = column.searchValue;
      var value = (0, _get["default"])(row, column.key);
      var regex = new RegExp(removeSymbols(searchValue), 'ig');
      return regex.test(removeSymbols(format(value, column.type).toString()));
    });
  });
};

exports.filter = filter;

function sort(array, key, direction) {
  var ajuste = direction ? 1 : -1;
  var superior = 1 * ajuste;
  var inferior = -1 * ajuste; // eslint-disable-next-line

  array.sort(function (a, b) {
    var valueA = (0, _get["default"])(a, key);
    var valueB = (0, _get["default"])(b, key);
    if (valueA === undefined) return inferior;
    if (valueB === undefined) return inferior;

    if (Number(valueA)) {
      valueA = Number(valueA);
      valueB = Number(valueB);
    }

    return valueA > valueB ? superior : inferior;
  });
  return array;
}

function getColumns(columns) {
  var nextColumns = {};
  Object.keys(columns).forEach(function (key) {
    var column = columns[key];

    if (column.columns) {
      Object.keys(column.columns).forEach(function (key) {
        var group = column.columns[key];
        nextColumns[key] = group;
      });
    } else {
      nextColumns[key] = column;
    }
  });
  return nextColumns;
}

function exportCsv(data) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data-csv';
  var csvContent = 'data:text/csv;charset=utf-8,';
  var keys = Object.keys(data[0]).filter(function (k) {
    return k;
  });
  csvContent += "".concat(keys.join(';'), ";\r\n");
  data.forEach(function (d) {
    csvContent += "".concat(keys.map(function (k) {
      var v = d[k];
      if (v === null || v === undefined) return '';
      return v.toString().replace(/;/g, ' ').replace(/[\n\r]+/g, '');
    }).join(';'), ";\r\n");
  });
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', "".concat(filename, ".csv"));
  link.innerHTML = ' ';
  document.body.appendChild(link); // Required for FF

  link.click();
  setTimeout(function () {
    document.body.removeChild(link);
  });
}

function onExportCsv(_ref2) {
  var rows = _ref2.rows,
      columns = _ref2.columns;
  var csvData = rows.map(function (row) {
    var cData = {};
    Object.keys(columns).forEach(function (key) {
      var column = columns[key];
      var label = column.label,
          csvRenderer = column.csvRenderer,
          type = column.type;

      if (column.columns) {
        Object.keys(column.columns).forEach(function (key) {
          var c = column.columns[key];

          if (c.label) {
            cData[c.label] = renderCell({
              column: c,
              row: row,
              key: key
            });
          }
        });
      } else if (label) {
        var value = null;

        if (csvRenderer) {
          value = csvRenderer({
            column: column,
            row: row,
            key: key
          });
        } else {
          value = renderCell({
            column: column,
            row: row,
            key: key
          });

          if (_typeof(value) === 'object') {
            value = (0, _get["default"])(row, column.key);
          }

          if (!Number(value)) {
            value = value;
          }

          if (typeof value === 'string') {
            value = value.trim().replace(/\#/g, '');
          }
        }

        cData[column.label] = value;
      }
    }); // console.log(cData);

    return cData;
  });
  exportCsv(csvData);
}