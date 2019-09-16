import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'fixed-data-table-2';
import Header from './Header';
import Cell from './Cell';
import { renderCell } from './utils';

const ColumnTable = ({ column, rows, config }) => {
  const { label } = column;

  return (
    <Column
      {...column}
      isResizable
      header={
        <Header
          config={config}
          column={column}
          onSearch={this.onSearch}
          onSort={this.onSort}
          onHide={this.onHide}
        >
          {label}
        </Header>
      }
      cell={cellProps => (
        <Cell
          {...cellProps}
          {...this.props}
          column={column}
          rows={rows}
          renderCell={renderCell}
        />

      )}
      footer={({ columnKey }) => (
        <Cell>
          {column.sum ? renderCell(rows.reduce((a, b) => a + b[columnKey], 0)) : null}
        </Cell>
      )}
    />
  );
};

ColumnTable.propTypes = {
  rows: PropTypes.array.isRequired,
  column: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,

};

ColumnTable.defaultProps = {
};

export default ColumnTable;
