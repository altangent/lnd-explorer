import React from 'react';
import PropTypes from 'prop-types';
import { BtcAmount } from '../../../components/btc-amount';
import { Hex } from '../../../components/hex';

export const DecodedPaymentRequest = ({ payreq }) => {
  if (!payreq) return '';
  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-sm-3">Destination:</div>
        <div className="col-sm-9">
          <Hex value={payreq.destination} substrLength={36} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">Payment hash:</div>
        <div className="col-sm-9">
          <Hex value={payreq.payment_hash} substrLength={36} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">Amount:</div>
        <div className="col-sm-9">
          <BtcAmount satoshi={payreq.num_satoshis} />
        </div>
      </div>
    </div>
  );
};

DecodedPaymentRequest.propTypes = {
  payreq: PropTypes.object,
};
