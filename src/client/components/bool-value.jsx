import React from 'react';
import PropTypes from 'prop-types';

export const BoolValue = ({ value }) => <span>{value ? 'True' : 'False'}</span>;

BoolValue.propTypes = {
  value: PropTypes.bool.isRequired,
};
