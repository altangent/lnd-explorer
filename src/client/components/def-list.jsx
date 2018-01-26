import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export const DefList = ({ children }) => (
  <ListGroup className="list-group-flush">{children}</ListGroup>
);

export const DefListItem = ({ children }) => (
  <ListGroupItem>
    <div className="row">{children}</div>
  </ListGroupItem>
);

export const DefListLabel = ({ children }) => <div className="col-sm-2">{children}</div>;

export const DefListValue = ({ children }) => <div className="col-sm-10">{children}</div>;
