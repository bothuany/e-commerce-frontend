import React, { useEffect, useState } from "react";

function StockInput({ value, colors, sizes, onChange, stocks, setStocks }) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    onChange({ color, size, quantity });
  }, [color, size, quantity]);

  const onRemove = () => {
    const updatedStocks = stocks.filter((stock) => stock !== value);
    setStocks(updatedStocks);
  };

  return (
    <div className="flex mt-1 sm:col-span-2">
      <div className="w-1/3 mr-3">
        <label
          htmlFor="size"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Size
        </label>
        <select
          id="size"
          onChange={(e) => setSize(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        >
          <option value="">Select size</option>
          {sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/3 mr-3">
        <label
          htmlFor="color"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Color
        </label>
        <select
          id="color"
          onChange={(e) => setColor(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        >
          <option value="">Select color</option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/3">
        <label
          htmlFor="quantity"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Quantity
        </label>
        <input
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          name="quantity"
          id="quantity"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="200"
          required=""
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-red-700 hover:text-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center ml-2"
      >
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
    </div>
  );
}

export default StockInput;
