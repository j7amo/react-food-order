/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Checkout.module.css';
import useInput from '../../../hooks/use-input';
import { validateText } from '../../../utils/utils';

function Checkout(props) {
  const { onCancel, onConfirm } = props;
  const {
    value: name,
    isInputValid: isNameValid,
    showError: showNameError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(validateText);

  const {
    value: street,
    isInputValid: isStreetValid,
    showError: showStreetError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(validateText);

  const {
    value: postal,
    isInputValid: isPostalValid,
    showError: showPostalError,
    inputChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(validateText);

  const {
    value: city,
    isInputValid: isCityValid,
    showError: showCityError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(validateText);

  const isFormValid = isNameValid && isStreetValid && isPostalValid && isCityValid;

  const confirmHandler = (evt) => {
    evt.preventDefault();

    if (!isFormValid) {
      return;
    }

    onConfirm({
      name,
      street,
      postal,
      city,
    });

    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };

  const nameStyles = `${styles.control} ${showNameError ? styles.invalid : ''}`;
  const streetStyles = `${styles.control} ${
    showStreetError ? styles.invalid : ''
  }`;
  const postalStyles = `${styles.control} ${
    showPostalError ? styles.invalid : ''
  }`;
  const cityStyles = `${styles.control} ${showCityError ? styles.invalid : ''}`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameStyles}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {showNameError && (
          <p className={styles.errorText}>Name cannot be empty</p>
        )}
      </div>
      <div className={streetStyles}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {showStreetError && (
          <p className={styles.errorText}>Street cannot be empty</p>
        )}
      </div>
      <div className={postalStyles}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {showPostalError && (
          <p className={styles.errorText}>Postal cannot be empty</p>
        )}
      </div>
      <div className={cityStyles}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {showCityError && (
          <p className={styles.errorText}>City cannot be empty</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.submit} type="submit" disabled={!isFormValid}>
          Confirm
        </button>
      </div>
    </form>
  );
}

Checkout.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Checkout;
