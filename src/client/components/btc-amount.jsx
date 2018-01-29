import React from 'react';

export const BtcAmount = ({ satoshi = 0 }) => (
  <div className="btc-amount">
    <div className="in-satoshi">{satoshi} sat</div>
    <div className="in-btc">{satoshi / 1e8} BTC</div>
  </div>
);
