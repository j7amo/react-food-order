/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import styles from './MealItemForm.module.css';
import Input from '../../../shared/Input/Input';

function MealItemForm({ id, onMealAdd }) {
  // we need input value from child component here in MealItemForm.
  // we can either solve this with 2-way binding approach:
  // const [amount, setAmount] = useState(1);
  //
  // const amountChangeHandler = (evt) => {
  //   setAmount(Number(evt.target.value));
  // };

  // OR with refs (in this case we'll have LESS code
  // but only if we are OK with UNcontrolled components):
  const ref = useRef();

  const addMealHandler = (evt) => {
    evt.preventDefault();
    // onMealAdd(amount);
    const amount = ref.current.value;
    const convertedAmount = Number(amount);

    if (
      amount.trim().length === 0
      || convertedAmount < 1
      || convertedAmount > 5
    ) {
      alert('Please enter correct amount (from 1 to 5)');

      return;
    }

    onMealAdd(convertedAmount);
  };

  return (
    <form className={styles.form} onSubmit={addMealHandler}>
      <Input
        label="Amount"
        input={{
          id,
          type: 'number',
          min: 1,
          max: 100,
          step: 1,
          defaultValue: 1,
          // value: amount,
        }}
        // onChange={amountChangeHandler}
        ref={ref}
      />
      <button type="submit">+ Add</button>
    </form>
  );
}

MealItemForm.propTypes = {
  id: PropTypes.string.isRequired,
  onMealAdd: PropTypes.func.isRequired,
};

export default MealItemForm;
