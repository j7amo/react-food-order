import React, { useState } from 'react';
import MealsSection from './components/feature/Meals/MealsSection/MealsSection';
import Cart from './components/feature/Cart/Cart/Cart';
import CartContextProvider from './store/CartContextProvider';
import Header from './components/layout/Header/Header';

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = () => {
    setIsCartShown(true);
  };

  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    // we can wrap the whole component tree with 'CartContextProvider'
    // because we need data and ways of updating it in different parts:
    // 1) Cart (data and methods)
    // 2) Header (data - to show the number on the badge)
    // 3) MealsSection (methods - to add meals to the Cart)
    <CartContextProvider>
      {isCartShown && (
        <Cart onCartClose={hideCartHandler} isModalShown={isCartShown} />
      )}
      <Header onCartOpen={showCartHandler} />
      <main>
        <MealsSection />
      </main>
    </CartContextProvider>
  );
}

export default App;
