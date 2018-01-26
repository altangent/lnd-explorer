import React from 'react';

export const BtcAmount = ({ satoshi = 0 }) => (
  <span>
    {satoshi} sat ({satoshi / 1e8} BTC)
  </span>
);
