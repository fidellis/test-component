import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, ColumnGroup, Column } from 'fixed-data-table-2';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import clone from 'lodash/clone';
// import Container from './Container';
import Header from './Header';
import Cell from './Cell';
import { getColumns, filter, sort, renderCell } from './utils';

import './data-table.css';

function prepareColumns({ columns, hasGroup, parent }) {
  const nextColums = {};

  Object.keys(columns).filter(key => columns[key].hide !== true).forEach((key) => {
    let column = columns[key];
    const params = {
      key,
      columnKey: key,
      parent,
      type: (column.type || 'STRING').toUpperCase(),
      width: column.width || 100,
      flexGrow: !column.width ? 1 : null,
    };

    if (column.columns) {
      column.columns = prepareColumns({ columns: column.columns, hasGroup: false, parent: key });
    } else if (hasGroup && !column.columns) {
      column = { columns: { [key]: { ...column, ...params } } };
    }

    nextColums[key] = {
      ...column,
      ...params,
    };
  });

  return nextColums;
}

function hasAttribute(originalColumns, attribute) {
  const columns = getColumns(originalColumns);
  return Object.keys(columns).some(key => getColumns(columns)[key][attribute]);
}

function getState(props) {
  const { rows, title, actions, exportCsv, count } = props;

  const hasGroup = Object.keys(props.columns).some(key => props.columns[key].columns);
  const columns = clone(prepareColumns({ columns: props.columns, hasGroup }));

  // Object.keys(columns).forEach((key) => {
  //   const column = columns[key];
  //   rows.forEach((row) => {
  //     row[key] = renderCell({ column, row });
  //   });
  // });

  const hasSearch = hasAttribute(columns, 'search');
  const hasHide = hasAttribute(columns, 'allowsHide');

  const menuHeight = props.menuHeight || ((count || hasHide || exportCsv || title || actions) ? 'auto' : props.menuHeight);

  return {
    columns,
    startColumns: columns,
    rows,
    startRows: rows.slice(),
    config: {
      hasGroup,
      hasSearch,
      hasHide,
      menuHeight,
    },
  };
}

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = getState(props);

    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onResize = this.onResize.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { rows, columns } = nextProps;

    if (columns !== this.props.columns) {
      this.setState(getState(nextProps));
    }

    if (rows !== this.props.rows) {
      this.setState(getState(nextProps));
    }
  }

  onSearch({ value, column }) {
    const { startRows } = this.state;
    const columns = getColumns(this.state.columns);
    column.searchValue = value;
    const filteredColumns = Object.keys(columns).filter(key => columns[key].searchValue).map(key => columns[key]);

    const data = filter(startRows.slice(), filteredColumns);
    this.setState({ rows: data });
  }

  onSort(column) {
    if (column.sortable === false) return;

    const { columns, rows } = this.state;

    column.sorted = !column.sorted;
    Object.keys(columns).forEach((key) => {
      if (columns[key] !== column) columns[key].sorted = undefined;
    });

    this.setState({ rows: sort(rows, column.key, column.sorted) });
  }

  onHide(column) {
    const { key, parent } = column;
    const nextColumns = this.state.columns;

    if (parent) {
      delete nextColumns[parent].columns[key];
    } else {
      delete nextColumns[key];
    }

    this.setState({ columns: nextColumns });
  }

  onReset() {
    const { startColumns, startRows } = this.state;
    this.setState({
      columns: clone(startColumns),
      rows: startRows,
    });
  }

  onResize(newColumnWidth, columnKey) {
    this.setState(({ columns }) => {
      const column = columns[columnKey];
      column.width = newColumnWidth;
      return { columns };
    });
  }

  renderGroup({ columns, label, headerStyle, ...props }) {
    const groupStyle = label ?
      {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRightStyle: 'solid',
        borderLeftStyle: 'solid',
        borderColor: '#d3d3d3',
      } : {};

    return (
      <ColumnGroup
        {...props}
        header={<Header style={{ ...headerStyle, ...groupStyle }}>{label}</Header>}
      >
        {Object.keys(columns).map((key) => {
          const column = columns[key];
          return this.renderColumn(column);
        })}
      </ColumnGroup>
    );
  }

  renderColumn(column) {
    const { rows, config } = this.state;
    const { label, headerStyle } = column;

    return (
      <Column
        {...column}
        isResizable
        header={
          <Header
            config={config}
            column={column}
            style={headerStyle}
            onSearch={this.onSearch}
            onSort={this.onSort}
            onHide={this.onHide}
          >
            {label}
          </Header>
        }
        cell={({ rowIndex, ...cellProps }) => (
          <Cell
            {...cellProps}
            rowIndex={rowIndex}
            onClick={this.props.onClick}
            column={column}
            row={rows[rowIndex]}
          />

        )}
        footer={({ columnKey }) => (
          column.sum &&
          <Cell
            total
            column={column}
            row={{ [columnKey]: rows.reduce((a, b) => a + b[columnKey], 0) }}
          />
        )}
      />
    );
  }

  renderColumns() {
    const { columns, config: { hasGroup } } = this.state;
    const render = hasGroup ? this.renderGroup : this.renderColumn;

    return Object.keys(columns).map(key => render(columns[key]));
  }

  render() {
    const { rows, columns, height, config } = this.state;

    return (
      <div
        {...this.props}
        rows={rows}
        columns={columns}
        config={config}
        height={height}
        onReset={this.onReset}
      >
        <AutoSizer key="table">
          {({ width }) => (
            <div>
              <Table
                {...this.props}
                width={width}
                rowsCount={rows.length}
                onContentHeightChange={contentHeight => this.setState({ height: contentHeight })}
                onColumnResizeEndCallback={this.onResize}
              >
                {this.renderColumns()}
              </Table>
            </div>
          )}
        </AutoSizer>
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
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
  isColumnResizing: false,
};

export default DataTable;
