import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'reactstrap';
import { InvoicesList } from './invoices-list';
import { CreateInvoiceModal } from '../../create-invoice/create-invoice-modal';

export const InvoicesCard = ({ invoices }) => {
  return (
    <Card>
      <CardHeader>
        Invoices
        <div className="float-sm-right">
          <CreateInvoiceModal />
        </div>
      </CardHeader>
      <InvoicesList invoices={invoices} />
    </Card>
  );
};

InvoicesCard.propTypes = {
  invoices: PropTypes.array.isRequired,
};
