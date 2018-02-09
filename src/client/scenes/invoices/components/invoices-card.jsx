import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { InvoicesList } from './invoices-list';
import { CreateInvoiceModal } from '../../create-invoice/create-invoice-modal';

export const InvoicesCard = ({ invoices, onInvoiceCreated }) => {
  return (
    <Card>
      <CardHeader>
        <span className="card-header-title">Invoices</span>
        <div className="float-right">
          <CreateInvoiceModal onInvoiceCreated={onInvoiceCreated} />
        </div>
      </CardHeader>
      <CardBody>
        <InvoicesList invoices={invoices} />
      </CardBody>
    </Card>
  );
};

InvoicesCard.propTypes = {
  invoices: PropTypes.array.isRequired,
  onInvoiceCreated: PropTypes.func,
};
