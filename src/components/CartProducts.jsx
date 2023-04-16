import React from "react";
import CartProduct from "./CartProduct";
import { useCart } from "../contexts/CartContext";

function CartProducts({ handleQuantityChange }) {
  const { cartItems } = useCart();
  return (
    <div className="mt-5 min-w-full border-t border-b border-gray-200">
      <ul>
        {cartItems.map((cartItem, index) => (
          <CartProduct
            key={index}
            product={cartItem}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default CartProducts;
