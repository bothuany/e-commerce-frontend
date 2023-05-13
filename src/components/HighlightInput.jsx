import React from "react";

function HighlightInput({ value, onChange, onRemove }) {
  return (
    <div className="mt-1 sm:col-span-2">
      <div className="flex justify-content-between">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="Type highlight"
          required=""
        />
        <button
          type="button"
          onClick={onRemove}
          className="text-red-700   hover:text-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    </div>
  );
}

export default HighlightInput;
