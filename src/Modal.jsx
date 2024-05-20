import React from 'react';

const Modal = ({ isOpen, handleClose, handleConfirm }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <p>Two-minute warning!</p>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Modal;
