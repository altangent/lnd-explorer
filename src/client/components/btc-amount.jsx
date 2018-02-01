import React from 'react';

export const BtcAmount = ({ satoshi = 0 }) => (
  <div className="btc-amount">
    <div className="in-btc">{(satoshi / 1e8).toFixed(8)} BTC</div>
    <div className="in-sat">{satoshi} sat</div>
  </div>
);
