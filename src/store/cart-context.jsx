import React from 'react';

const CartContext = React.createContext({
  // we only define this here for the sake of auto-completion/suggestion by IDE
  items: [],
  totalAmount: '',
  addItem: () => {},
  removeItem: () => {},
});

export default CartContext;
