import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Input.module.css';

// function Input({ input, label }) {
const Input = React.forwardRef(({ input, label }, ref) => (
  <div className={styles.input}>
    <label htmlFor={input.id}>{label}</label>
    <input
      id={input.id}
      type={input.type}
      min={input.min}
      max={input.max}
      step={input.step}
      defaultValue={input.defaultValue}
      ref={ref}
    />
  </div>
));

Input.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    defaultValue: PropTypes.number.isRequired,
    // value: PropTypes.number.isRequired,
  }).isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default Input;
