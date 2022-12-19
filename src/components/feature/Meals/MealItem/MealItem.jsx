import React, { useContext } from 'react';
import * as PropTypes from 'prop-types';
import styles from './MealItem.module.css';
import MealItemForm from '../MealItemForm/MealItemForm';
import CartContext from '../../../../store/cart-context';

function MealItem({
  id, name, description, price,
}) {
  const { addItem } = useContext(CartContext);
  const addMealHandler = (amount) => {
    addItem({
      id,
      name,
      description,
      price,
      amount,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{`$${price}`}</div>
      </div>
      <MealItemForm id={id} onMealAdd={addMealHandler} />
    </li>
  );
}

MealItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default MealItem;
