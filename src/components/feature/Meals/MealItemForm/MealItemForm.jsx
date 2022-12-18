/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './MealItemForm.module.css';
import Input from '../../../shared/Input/Input';

function MealItemForm({ id }) {
  return (
    <form className={styles.form}>
      <Input
        label="Amount"
        input={{
          id,
          type: 'number',
          min: 1,
          max: 100,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button type="button">+ Add</button>
    </form>
  );
}

MealItemForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MealItemForm;
