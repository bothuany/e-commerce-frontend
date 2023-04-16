import React, { useState, useEffect } from "react";

const QuantityInput = ({ quantity, onQuantityChange }) => {
  const [value, setValue] = useState(quantity);

  const handleValueChange = (e) => {
    const newValue = parseInt(e.target.value);

    if (isNaN(newValue) || newValue < 1) {
      setValue("");
    } else {
      setValue(newValue);
      onQuantityChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + 1;

    setValue(newValue);
    onQuantityChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = value - 1;

    if (newValue >= 1) {
      setValue(newValue);
      onQuantityChange(newValue);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="bg-gray-300 text-gray-700 rounded-l px-2 py-1"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        className="border border-gray-300 rounded px-2 py-1 text-center w-10 mx-1"
        type="text"
        value={value}
        onChange={handleValueChange}
      />
      <button
        className="bg-gray-300 text-gray-700 rounded-r px-2 py-1"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
