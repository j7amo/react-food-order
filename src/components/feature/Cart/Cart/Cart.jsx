import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Cart.module.css';

const DUMMY_MEAL = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
    amount: 2,
  },
];

function Cart({ items }) {
  return (
    <div>
      <ul className={styles.cartItems}>
        {DUMMY_MEAL.map(({
          id, name, description, amount, price,
        }) => (
          <li key={id}>
            <div>{name}</div>
            <div>{description}</div>
            <div>{amount}</div>
            <div>{price}</div>
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total amount:</span>
        <span>123</span>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.buttonAlt}>
          Close
        </button>
        <button type="button" className={styles.button}>
          Order
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Cart;
