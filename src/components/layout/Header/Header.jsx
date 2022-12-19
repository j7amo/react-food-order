import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Header.module.css';
// one of the approaches of using images is just to import it as an object
// and assign to 'src' attribute of <img> element
import mealsImage from '../../../assets/meals.jpeg';
import HeaderCartButton from '../../shared/HeaderCartButton/HeaderCartButton';

function Header({ onCartOpen }) {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton type="button" onClick={onCartOpen}>
          Open Cart
        </HeaderCartButton>
      </header>
      <div className={styles.mainImage}>
        <img src={mealsImage} alt="A table full of meals" />
      </div>
    </>
  );
}

Header.propTypes = {
  onCartOpen: PropTypes.func.isRequired,
};

export default Header;
