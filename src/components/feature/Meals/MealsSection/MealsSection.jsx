import React from 'react';
import MealsSummary from '../MealsSummary/MealsSummary';
import AvailableMeals from '../AvailableMeals/AvailableMeals';

function MealsSection() {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
}

export default MealsSection;
