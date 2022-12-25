import React, { useCallback, useContext, useState } from 'react';
import * as PropTypes from 'prop-types';
import styles from './Cart.module.css';
import Modal from '../../../shared/Modal/Modal';
import CartContext from '../../../../store/cart-context';
import Checkout from '../../Checkout/Checkout';

function Cart({ onCartClose }) {
  const {
    items, totalAmount, addItem, removeAllItems,
  } = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const orderFormShowHandler = () => {
    setIsCheckout(true);
  };

  const orderFormHideHandler = useCallback(() => {
    setIsCheckout(false);
  }, []);

  const checkoutSubmitHandler = useCallback(
    async (userData) => {
      setIsSubmitting(true);

      try {
        const response = await fetch(
          'https://react-movies-b2487-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
          {
            method: 'POST',
            body: JSON.stringify({
              items,
              userData,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        setDidSubmit(true);
        const data = await response.json();
        console.log(data);
        removeAllItems();
      } catch (err) {
        console.log(err.message());
      }

      setIsSubmitting(false);
    },
    [items, removeAllItems],
  );

  let content = (
    <>
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
      {isCheckout && (
        <Checkout
          onCancel={orderFormHideHandler}
          onConfirm={checkoutSubmitHandler}
        />
      )}
      {!isCheckout && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.buttonAlt}
            onClick={onCartClose}
          >
            Close
          </button>
          {items.length > 0 && (
            <button
              type="button"
              className={styles.button}
              onClick={orderFormShowHandler}
            >
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  if (isSubmitting) {
    content = (
      <>
        <p>Sending order data...</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.buttonAlt}
            onClick={onCartClose}
          >
            Close
          </button>
        </div>
      </>
    );
  }

  if (didSubmit) {
    content = (
      <>
        <p>Order successfully submitted!</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.buttonAlt}
            onClick={onCartClose}
          >
            Close
          </button>
        </div>
      </>
    );
  }

  return <Modal onClose={onCartClose}>{content}</Modal>;
}

Cart.propTypes = {
  onCartClose: PropTypes.func.isRequired,
};

export default Cart;
