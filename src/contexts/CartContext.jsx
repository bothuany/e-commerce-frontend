import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    let info = isProductWithFeaturesAlreadyAdded(newItem);
    console.log(info);

    if (!info) {
      console.log("aaaa");
      setCartItems([...cartItems, newItem]);
    } else {
      console.log("bbbb");
      cartItems.map((item) => {
        if (item.id == info) {
          item.quantity += 1;
        }
      });
    }
  };

  const isProductWithFeaturesAlreadyAdded = (newItem) => {
    let result = false;
    cartItems.map((item) => {
      /*if (
        item.id === newItem.id &&
        item.color.id === newItem.color.id &&
        item.size.id === newItem.size.id
      )*/
      if (
        item.id === newItem.id &&
        item.color === newItem.color &&
        item.size === newItem.size
      ) {
        result = item.id;
        return item.id;
      }
    });

    return result;
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const setItemQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });

    setCartItems(updatedCart);
  };

  const values = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    setItemQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
