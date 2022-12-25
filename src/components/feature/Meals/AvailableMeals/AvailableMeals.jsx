import React, { useCallback, useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import MealItem from '../MealItem/MealItem';
import Card from '../../../shared/Card/Card';
import useFetch from '../../../../hooks/use-fetch';

const requestConfig = {
  url: 'https://react-movies-b2487-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
};

function AvailableMeals() {
  const [meals, setMeals] = useState([]);

  const { sendRequest, isLoading, error } = useFetch();

  const applyData = useCallback((data) => {
    const transformedData = Object.entries(data).map(
      ([id, { name, description, price }]) => ({
        id,
        name,
        description,
        price,
      }),
    );

    setMeals(transformedData);
  }, []);

  useEffect(() => {
    sendRequest(requestConfig, applyData);
  }, [applyData, sendRequest]);

  return (
    <section className={styles.meals}>
      <Card>
        {isLoading && <p className={styles.loading}>Your meals are loading</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!isLoading && !error && (
          <ul>
            {meals.map(({
              id, name, description, price,
            }) => (
              <MealItem
                key={id}
                id={id}
                description={description}
                price={price}
                name={name}
              />
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
}

export default AvailableMeals;
