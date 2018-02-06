import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export const DefList = ({ children, labelWidth = 2 }) => (
  <ListGroup className="list-group-flush">
    {React.Children.map(children, child => React.cloneElement(child, { labelWidth }))}
  </ListGroup>
);

export const DefListItem = ({ children, labelWidth }) => (
  <ListGroupItem>
    <div className="row">
      {React.Children.map(children, child => React.cloneElement(child, { labelWidth }))}
    </div>
  </ListGroupItem>
);

export const DefListLabel = ({ children, labelWidth }) => (
  <div className={'col-sm-' + labelWidth}>{children}</div>
);

export const DefListValue = ({ children, labelWidth }) => (
  <div className={'col-sm-' + (12 - labelWidth)}>{children}</div>
);
