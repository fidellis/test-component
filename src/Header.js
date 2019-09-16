import React, { Component } from 'react';
import PropTypes from 'prop-types';

const searchHeight = 30;
const styles = {
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
    borderColor: 'rgba(0,0,0,0.02)',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    // padding: 8,
  },
  hide: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: 5,
    color: 'rgba(0,0,0,0.2)',
    fontSize: 14,
  },
  search: {
    container:
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: searchHeight,
      },

    input: {
      width: '90%',
      height: 18,
      border: 1,
      borderColor: 'rgba(0, 0, 0, 0.14)',
      borderStyle: 'solid',
      borderRadius: 4,
    },

  },
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.onSort = this.onSort.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onSort(e) {
    e.preventDefault();

    if (this.props.onSort) {
      this.props.onSort(this.props.column);
    }
  }

  onHide(e) {
    e.preventDefault();

    if (this.props.onHide) {
      this.props.onHide(this.props.column);
    }
  }

  render() {
    const {
      children,
      column,
      width,
      height,
      onSearch,
      config,
      style,
    } = this.props;

    const labelHeight = config.hasSearch ? height - searchHeight : height;

    const sortable = column.sortable !== false;
    const sortIcon = column.sorted !== undefined && sortable ? column.sorted ? ' ↑' : ' ↓' : '';

    const allowsHide = column.allowsHide === true;
    const hideIcon = allowsHide && (<span style={styles.hide} onClick={this.onHide} title="Ocultar Coluna" >x</span>);

    const onClick = sortable ? this.onSort : null;
    const labelStyle = { padding: 8, cursor: sortable ? 'pointer' : null };

    const label = <span onClick={onClick} style={labelStyle}>{children}</span>;
    const search = column.search === true;
    const searchValue = column.searchValue || '';

    return (
      <div style={{ ...styles.container, ...style, height }}>
        <div style={{ ...styles.label, width, height: labelHeight }}>
          {hideIcon}
          {label}
          {sortIcon}
        </div>
        {search &&
        <div style={styles.search.container}>
          <input
            onChange={e => onSearch({ value: e.target.value, column })}
            value={searchValue}
            style={styles.search.input}
          />
        </div>}
      </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  column: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
  config: PropTypes.object.isRequired,
  onSort: PropTypes.func,
  onHide: PropTypes.func,
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  style: {},
  config: {},
  column: {},
  onSort: null,
  onHide: null,
  onSearch: null,
};

export default Header;

