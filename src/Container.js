import React from 'react';
import Menu from './Menu';
import ReactLoading from 'react-loading';

const styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loading: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
};
const Container = (props) => {
  const { children, maxHeight, width, height, style, config, loading } = props;
  const { menuHeight } = config;

  return (
    <div style={{ width, ...style }}>
      {!!menuHeight && <Menu {...props} {...config} />}
      <div style={{ height: height < maxHeight ? height : maxHeight }}>
        {children}
      </div>
      {loading && <div style={styles.loading}><ReactLoading type="spin" color="#1976d2" height={50} width={50} /></div>}
    </div>
  );
};

Container.defaultProps = {
  width: '100%',
  style: styles.container,
  loading: false,
};

export default Container;
