import React from "react";
import StockInput from "./StockInput";

let idCounter = 1;

function StocksInput({ colors, sizes, stocks, setStocks }) {
  const handleAddStock = (e) => {
    e.preventDefault();
    idCounter++;

    const newStock = {
      id: idCounter,
      colorID: "",
      sizeID: "",
      quantity: 0,
    };
    setStocks([...stocks, newStock]);
  };

  const handleStockChange = (index, newValue) => {
    const updatedStocks = [...stocks];
    updatedStocks[index] = { ...updatedStocks[index], ...newValue };
    setStocks(updatedStocks);
  };

  return (
    <div>
      {stocks.map((stock, index) => {
        return (
          <StockInput
            key={stock.id}
            value={stock}
            colors={colors}
            sizes={sizes}
            stocks={stocks}
            setStocks={setStocks}
            onChange={(newStock) => handleStockChange(index, newStock)}
          />
        );
      })}
      <br />
      <div className="flex justify-center">
        <button
          onClick={handleAddStock}
          className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add Stock
        </button>
      </div>
    </div>
  );
}

export default StocksInput;
