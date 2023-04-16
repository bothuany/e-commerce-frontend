import React, { useEffect } from "react";
import CartProducts from "../components/CartProducts";
import { useCart } from "../contexts/CartContext";
function Cart() {
  const { cartItems, clearCart } = useCart();

  let totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  useEffect(() => {
    totalPrice = cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [cartItems]);

  return (
    <div className="mx-auto py-5 w-full max-w-3xl bg-white">
      <div className="flex flex-col items-center">
        {/* :TITLE */}
        <h2 className="text-center text-3xl text-gray-700 font-semibold">
          Shopping Cart
        </h2>

        {/* :PRODUCT LIST */}
        <CartProducts products={cartItems} />

        {/* :SUBTOTAL */}
        <div className="py-7 px-10 w-full">
          {/* ::Subtotal */}
          <p className="flex justify-between items-baseline">
            <span className="text-base text-gray-700 font-semibold">
              Subtotal:
            </span>
            <span className="text-2xl text-black font-bold">{`$${totalPrice.toFixed(
              2
            )}`}</span>
          </p>
          {/* ::Shipping Info */}
          <p className="mt-2 text-sm text-gray-500">
            Shipping and taxes will be calculated at checkout
          </p>
        </div>

        {/* :ACTIONS */}
        <div className="px-10 w-full flex flex-col">
          {/* ::Checkout Button */}
          <a
            href="#goToCheckout"
            className="py-2 w-full rounded bg-indigo-500 text-center text-base text-white hover:bg-indigo-600"
          >
            Checkout
          </a>

          {/* ::Continue Shopping */}
          <p className="mt-3 text-center text-base text-gray-500">
            or{" "}
            <a
              href="#shoppingPage"
              className="inline-flex items-center text-center text-sm text-indigo-500 hover:text-indigo-600 font-semibold"
            >
              Continue Shopping
              <span className="ml-2" aria-hidden="true">
                {" "}
                &rarr;
              </span>
            </a>
          </p>

          {/* ::Clear Button */}
          <button
            onClick={() => {
              clearCart();
            }}
            className="mt-2 py-2 w-full rounded bg-red-500 text-center text-base text-white hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
