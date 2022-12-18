import React from 'react';
import styles from './Header.module.css';
// one of the approaches of using images is just to import it as an object
// and assign to 'src' attribute of <img> element
import mealsImage from '../../assets/meals.jpeg';
import Button from '../shared/Button/Button';

function Header() {
  const cartOpenHandler = () => {
    console.log('open cart');
  };

  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <Button type="button" onClick={cartOpenHandler}>
          Open Cart
        </Button>
      </header>
      <div className={styles.mainImage}>
        <img src={mealsImage} alt="A table full of meals" />
      </div>
    </>
  );
}

export default Header;
