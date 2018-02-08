import React from 'react';

export const InfoCard = ({ children }) => (
  <div className="card info-card">
    <div className="card-body">{children}</div>
  </div>
);

export const InfoCardTitle = ({ children }) => (
  <div className="row">
    <div className="col-sm-12">
      <div className="title">{children}</div>
    </div>
  </div>
);

export const InfoCardValue = ({ children, size }) => (
  <div className="row">
    <div className="col-sm-12">
      <div className={'value' + (size ? ' ' + size : '')}>{children}</div>
    </div>
  </div>
);
