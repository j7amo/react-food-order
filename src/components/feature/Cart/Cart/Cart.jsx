import React, { useContext } from 'react';
import * as PropTypes from 'prop-types';
import styles from './Cart.module.css';
import Modal from '../../../shared/Modal/Modal';
import CartContext from '../../../../store/cart-context';

function Cart({ onCartClose }) {
  const { items, totalAmount, addItem } = useContext(CartContext);

  return (
    <Modal onClose={onCartClose}>
      <ul className={styles.cartItems}>
        {items.map(({
          id, name, description, price, amount,
        }) => (amount ? (
          <li key={id} className={styles.cartItem}>
            <div>
              <div>{name}</div>
              <div>{description}</div>
              <div>{`$${price}`}</div>
            </div>
            <div className={styles.controls}>
              <button
                type="button"
                onClick={() => addItem({
                  id,
                  name,
                  description,
                  price,
                  amount: -1,
                })}
                disabled={amount === 0}
              >
                -
              </button>
              <div>{amount}</div>
              <button
                type="button"
                onClick={() => addItem({
                  id,
                  name,
                  description,
                  price,
                  amount: 1,
                })}
                disabled={amount === 5}
              >
                +
              </button>
            </div>
          </li>
        ) : null))}
      </ul>
      <div className={styles.total}>
        <span>Total amount:</span>
        <span>{`$${totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.buttonAlt}
          onClick={onCartClose}
        >
          Close
        </button>
        {items.length > 0 && (
          <button type="button" className={styles.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
}

Cart.propTypes = {
  onCartClose: PropTypes.func.isRequired,
};

export default Cart;
