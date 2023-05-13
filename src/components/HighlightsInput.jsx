import React, { useState } from "react";
import HighlightInput from "./HighlightInput";

function HighlightsInput({ highlights, setHighlights }) {
  const handleHighlightChange = (index, newValue) => {
    const updatedHighlights = [...highlights];
    updatedHighlights[index] = newValue;
    setHighlights(updatedHighlights);
  };

  const handleAddHighlight = (e) => {
    e.preventDefault();
    if (highlights[highlights.length - 1] === "") return;
    setHighlights([...highlights, ""]);
  };

  const handleRemoveHighlight = (index) => {
    const updatedHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(updatedHighlights);
  };
  return (
    <div>
      <div className="block mb-2 text-sm font-medium text-gray-900 ">
        Highlights
      </div>
      {highlights.map((highlight, index) => {
        return (
          <HighlightInput
            key={index}
            value={highlight}
            onChange={(e) => handleHighlightChange(index, e.target.value)}
            onRemove={() => handleRemoveHighlight(index)}
          />
        );
      })}
      <div className="flex justify-center">
        <button
          onClick={handleAddHighlight}
          className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add Highlight
        </button>
      </div>
    </div>
  );
}

export default HighlightsInput;
