import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';

const ConfirmationModal = ({ open, message, onConfirm, onCancel }) => {
    return (
      <Modal open={open} onClose={onCancel}>
        <div className="modal">
          <div className="modal-content"> 
            <p>{message}</p>
            <div className="modal-buttons">
              <Button onClick={onConfirm} variant="contained" color="primary">
                Yes
              </Button>
              <Button onClick={onCancel} variant="contained" color="secondary">
                No
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

export default ConfirmationModal;
