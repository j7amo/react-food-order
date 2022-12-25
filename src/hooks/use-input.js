import { useState } from 'react';

const useInput = (validate) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const isInputValid = validate(value);
  const showError = isTouched && !isInputValid;

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const inputChangeHandler = (evt) => {
    setValue(evt.target.value);
  };

  const reset = () => {
    setIsTouched(false);
    setValue('');
  };

  return {
    value,
    isInputValid,
    showError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
