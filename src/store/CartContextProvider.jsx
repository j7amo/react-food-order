import React, { useMemo, useReducer } from 'react';
import * as PropTypes from 'prop-types';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      let updatedItems;

      const itemToUpdateIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (itemToUpdateIndex !== -1) {
        const itemToUpdate = state.items[itemToUpdateIndex];
        itemToUpdate.amount += action.payload.amount;
        updatedItems = [
          ...state.items.slice(0, itemToUpdateIndex),
          itemToUpdate,
          ...state.items.slice(itemToUpdateIndex + 1),
        ];
      } else {
        updatedItems = [...state.items, action.payload];
      }

      const updatedAmount = updatedItems.reduce(
        (acc, item) => acc + item.amount * item.price,
        0,
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id,
      );
      const updatedAmount = updatedItems.reduce(
        (prev, item) => item.amount * item.price,
        0,
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }
    case 'REMOVE_ALL_ITEMS': {
      return {
        ...state,
        items: [],
        totalAmount: 0,
      };
    }
    default:
      return state;
  }
};

function CartContextProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  };

  const removeAllItemsFromCartHandler = () => {
    dispatch({
      type: 'REMOVE_ALL_ITEMS',
    });
  };

  const cartContext = useMemo(
    () => ({
      // we have data
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      // and ways of updating it
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
      removeAllItems: removeAllItemsFromCartHandler,
    }),
    [cartState.items, cartState.totalAmount],
  );

  return (
    //  here we pass 'cartContext' object(which is our store) via prop
    // and this enables us to access this 'value' prop (which is REQUIRED)
    // at any level of nesting inside this component
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CartContextProvider;
