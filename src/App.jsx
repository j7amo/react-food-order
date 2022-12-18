import React from 'react';
import Header from './components/layout/Header';
import MealsSection from './components/feature/Meals/MealsSection/MealsSection';

function App() {
  return (
    <div>
      <Header />
      <main>
        <MealsSection />
      </main>
    </div>
  );
}

export default App;
