import React from 'react';
import PropTypes from 'prop-types';

const Action = ({ icon, ...props }) => (
  <i className="md-icon material-icons" {...props} >{icon}</i>
);

Action.propTypes = {
  icon: PropTypes.string.isRequired,
};

Action.defaultProps = {
  style: {
    fontSize: 26,
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
  },
};

export default Action;
