import React from 'react';
import PropTypes from 'prop-types';
import iconExport from './img/arrow_downward.svg';
import iconRefresh from './img/refresh.svg';
import { format, onExportCsv } from './utils';

const style = {
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
    fontSize: 14,
    color: '#626466',
  },
  title: {
    // fontSize: 28,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  action: {
    paddingRight: 6,
    cursor: 'pointer',
  },
  count: {
    display: 'flex',
  },
};

const Image = props => (<img {...props} style={style.action} />);

const Menu = (props) => {
  const { rows, columns, onReset, hasSearch, hasHide, reset, exportCsv, actions, menuHeight, title, count } = props;
  return (
    <div style={{ ...style.container, height: menuHeight }}>
      <div style={style.title}>{title}</div>

      <div style={style.actions}>
        {actions.map(action => <div style={style.action}>{action}</div>)}

        {(hasHide || reset) && (
          <Image src={iconRefresh} title="Atualizar" onClick={onReset} />
        )}
        {exportCsv && (
          <Image src={iconExport} title="Exportar" onClick={() => (props.onExportCsv ? props.onExportCsv({ rows, columns }) : onExportCsv({ rows, columns }))} />
        )}

        {count && <div style={style.count}>{format(rows.length, 'INTEGER')} Registros</div>}
      </div>
    </div>
  )
  ;
};

Menu.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  exportCsv: PropTypes.bool,
  onReset: PropTypes.func.isRequired,
  hasSearch: PropTypes.bool,
  hasHide: PropTypes.bool,
  menuHeight: PropTypes.number,
  title: PropTypes.string,
  actions: PropTypes.array,
};

Menu.defaultProps = {
  rows: [],
  columns: {},
  hasSearch: false,
  hasHide: false,
  menuHeight: 0,
  title: null,
  exportCsv: false,
  onExportCsv,
  actions: [],
  count: false,
};

export default Menu;
