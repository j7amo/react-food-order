import React, { useState } from 'react';
import MealsSection from './components/feature/Meals/MealsSection/MealsSection';
import Cart from './components/feature/Cart/Cart/Cart';
import CartContextProvider from './store/CartContextProvider';
import Header from './components/layout/Header/Header';

function App() {
  const [isModalShown, setIsModalShown] = useState(false);

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  const hideModalHandler = () => {
    setIsModalShown(false);
  };

  return (
    // we can wrap the whole component tree with 'CartContextProvider'
    // because we need data and ways of updating it in different parts:
    // 1) Cart (data and methods)
    // 2) Header (data - to show the number on the badge)
    // 3) MealsSection (methods - to add meals to the Cart)
    <CartContextProvider>
      {isModalShown && (
        <Cart onCartClose={hideModalHandler} isModalShown={isModalShown} />
      )}
      <Header onCartOpen={showModalHandler} />
      <main>
        <MealsSection />
      </main>
    </CartContextProvider>
  );
}

export default App;
