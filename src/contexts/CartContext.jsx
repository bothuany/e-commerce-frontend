import React, { useState, createContext, useContext } from "react";

const tempProducts = [
  {
    id: 1,
    name: "Funny Shirt Dog",
    href: "#productLink",
    price: 40,
    color: "black",
    size: "medium",
    stock: "In stock",
    quantity: 1,
    imageSrc:
      "https://fancytailwind.com/static/tshirt-drole4-fc12e960a18b5db459e63da559b564fa.webp",
    imageAlt: "Description of the product picture",
  },
  {
    id: 2,
    name: "Funny Shirt Monkey",
    href: "#productLink",
    price: 28,
    color: "green",
    size: "Large",
    stock: "Will ship in 7-15 days",
    quantity: 1,
    imageSrc:
      "https://fancytailwind.com/static/tshirt-drole3-0f77e5c73ae6e9a95e8521c3b5495542.webp",
    imageAlt: "Description of the product picture",
  },
];
const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  //const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState(tempProducts);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
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
export { useCart, CartContextProvider };
