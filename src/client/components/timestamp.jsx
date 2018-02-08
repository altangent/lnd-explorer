import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const Timestamp = ({ timestamp }) => {
  if (typeof timestamp === 'string') timestamp = parseInt(timestamp);
  return <span>{timestamp ? moment.unix(timestamp).format('l LT') : 'N/A'}</span>;
};

Timestamp.propTypes = {
  timestamp: PropTypes.any,
};
