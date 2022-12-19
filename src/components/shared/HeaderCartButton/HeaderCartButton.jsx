/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../../feature/Cart/CartIcon/CartIcon';
import CartContext from '../../../store/cart-context';

function HeaderCartButton({ type, onClick, children }) {
  const [isButtonBumped, setIsButtonBumped] = useState(false);
  const { items } = useContext(CartContext);

  const totalAmount = items.reduce((acc, currItem) => acc + currItem.amount, 0);

  useEffect(() => {
    let timer;

    if (items && items.length > 0) {
      setIsButtonBumped(true);

      timer = setTimeout(() => {
        setIsButtonBumped(false);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [items, items.length]);

  return (
    <button
      className={`${styles.button} ${isButtonBumped ? styles.bump : ''}`}
      type={type}
      onClick={onClick}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>{children}</span>
      <span className={styles.badge}>{totalAmount}</span>
    </button>
  );
}

HeaderCartButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default HeaderCartButton;
