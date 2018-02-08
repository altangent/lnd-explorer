import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

export const DefList = ({ children, labelWidth = 2 }) => (
  <ListGroup className="list-group-flush def-list">
    {React.Children.map(children, child => React.cloneElement(child, { labelWidth }))}
  </ListGroup>
);

DefList.propTypes = {
  children: PropTypes.any,
  labelWidth: PropTypes.number,
};

export const DefListItem = ({ children, labelWidth }) => (
  <ListGroupItem>
    <div className="row">
      {React.Children.map(children, child => React.cloneElement(child, { labelWidth }))}
    </div>
  </ListGroupItem>
);

DefListItem.propTypes = {
  children: PropTypes.any,
  labelWidth: PropTypes.number,
};

export const DefListLabel = ({ children, labelWidth }) => (
  <div className={'def-list-label col-sm-' + labelWidth}>{children}</div>
);

DefListLabel.propTypes = {
  children: PropTypes.any,
  labelWidth: PropTypes.number,
};

export const DefListValue = ({ children, labelWidth }) => (
  <div className={'col-sm-' + (12 - labelWidth)}>{children}</div>
);

DefListValue.propTypes = {
  children: PropTypes.any,
  labelWidth: PropTypes.number,
};
