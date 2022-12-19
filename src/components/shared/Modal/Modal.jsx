/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import * as PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

function Backdrop({ onClose }) {
  return <div className={styles.backdrop} onClick={onClose} />;
}

function ModalOverlay({ children }) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('overlays'),
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById('overlays'),
      )}
    </>
  );
}

Backdrop.propTypes = {
  onClose: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
  children: PropTypes.func.isRequired,
};

Modal.propTypes = {
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
