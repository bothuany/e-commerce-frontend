import React from "react";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import QuantityInput from "./QuantityInput";
import { useCart } from "../contexts/CartContext";

function CartProduct({ product, index }) {
  const { removeFromCart, setItemQuantity } = useCart();
  const handleQuantityChange = (newQuantity) => {
    setItemQuantity(product.id, newQuantity);
  };
  return (
    <li
      key={product.id}
      className={`p-4 flex ${index !== 0 && "border-t border-gray-200"}`}
    >
      {/* ::Picture */}
      <div className="flex-shrink-0 aspect-w-5 aspect-h-1 w-1/4 sm:w-1/5">
        <img
          src={product.images[0]}
          alt="image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* ::Product Infos */}
      <div className="ml-5 w-full flex flex-col">
        {/* :::Name & Price */}
        <div className="flex justify-between space-x-5">
          <a
            href={product.href}
            className="text-base text-gray-700 font-semibold hover:text-black hover:underline"
          >
            {product.name}
          </a>
          <span className="text-lg text-gray-700 font-semibold">{`$${(
            product.price * product.quantity
          ).toFixed(2)}`}</span>
        </div>
        {/* :::Color */}
        <p className="mt-1 text-sm text-gray-400 capitalize">{product.color}</p>
        {/* :::Size */}
        <p className="mt-1 mb-5 text-sm text-gray-400 capitalize">
          {product.size}
        </p>
        <QuantityInput
          quantity={product.quantity}
          onQuantityChange={handleQuantityChange}
        />
        {/* :::Actions */}
        <div className="mt-auto flex justify-between space-x-5">
          {/* ::::stock */}
          <span className="inline-flex items-center space-x-2">
            {product.stock === "In stock" ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : product.stock === "Out of stock" ? (
              <XMarkIcon className="w-4 h-4 text-red-500" />
            ) : (
              <ClockIcon className="w-4 h-4 text-gray-300" />
            )}
            <span className="text-sm text-gray-500 font-medium">
              {product.stock}
            </span>
          </span>
          {/* ::::remove */}
          <button
            className="text-sm text-indigo-500 font-semibold hover:underline hover:text-indigo-700"
            onClick={() => {
              removeFromCart(product.id);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartProduct;
