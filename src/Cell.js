import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import { renderCell } from './utils';

const styles = {
  COLUMN: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    fontSize: 12,
    color: '#626466',
  },
  ONCLICK: {
    cursor: 'pointer',
  },
  INTEGER: {
    justifyContent: 'flex-end',
  },
  DECIMAL: {
    justifyContent: 'flex-end',
  },
  NUMBER: {
    justifyContent: 'flex-end',
  },
  PERCENT: {
    justifyContent: 'flex-end',
  },
  BOOLEAN: {
    justifyContent: 'center',
  },
  DATE: {
    justifyContent: 'center',
  },
  DATETIME: {
    justifyContent: 'center',
  },
  TIME: {
    justifyContent: 'center',
  },
};

function getStyle({ column, value, onClick, rowIndex, row }) {
  const { type, align } = column;
  let style = {
    ...styles.COLUMN,
    ...styles[type],
    ...column.style,
  };

  if (column.styleRenderer) style = { ...style, ...column.styleRenderer({ value, rowIndex, row }) };
  if (onClick) style = { ...style, ...styles.ONCLICK };

  if (align) {
    let justifyContent = 'flex-start';
    if (align === 'center') {
      justifyContent = 'center';
    } else if (align === 'right') {
      justifyContent = 'flex-end';
    }
    style = { ...style, justifyContent };
  }

  return style;
}

const TableCell = ({
  columnKey,
  rowIndex,
  column,
  row,
  ...props
}) => {
  const onClick = column.onClick || props.onClick;
  const value = renderCell({ column, row });
  return (
    <Cell
      {...props}
      style={getStyle({ column, row, value, rowIndex, columnKey, onClick })}
      onClick={() => (onClick ? onClick({ row, column, rowIndex, columnKey }) : null)}
    >
      {value}
    </Cell>
  );
};

TableCell.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
};

TableCell.defaultProps = {
  column: {},
  row: {},
};

export default TableCell;
