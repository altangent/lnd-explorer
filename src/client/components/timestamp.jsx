import React from 'react';
import moment from 'moment';

export const Timestamp = ({ timestamp }) => (
  <span>
    {moment
      .unix(timestamp)
      .utc()
      .format()}
  </span>
);
