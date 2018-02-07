import React from 'react';
import PropTypes from 'prop-types';

export const ModalAlert = ({ message, alertType, error }) => {
  if (!message && !error) return '';
  if (error) alertType = 'danger';
  return (
    <div className="modal-alert">
      <div className={'alert alert-' + alertType}>{message || error.message}</div>
    </div>
  );
};

ModalAlert.propTypes = {
  error: PropTypes.object,
  message: PropTypes.string,
  alertType: PropTypes.string,
};
