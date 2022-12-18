/* eslint-disable react/button-has-type */
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Button.module.css';
import CartIcon from '../../feature/Cart/CartIcon/CartIcon';

function Button({ type, onClick, children }) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>{children}</span>
      <span className={styles.badge}>3</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
