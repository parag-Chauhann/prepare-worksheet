// ErrorModal.js
import React from 'react';
import './ErrorModal.css'; // Make sure to style your modal as needed

const ErrorModal = ({ show, handleClose, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
