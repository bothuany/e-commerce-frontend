import React, { useState } from "react";
import ImageInput from "./ImageInput";

function ImagesInput({ images, setImages }) {
  const handleImageChange = (index, newValue) => {
    const updatedImages = [...images];
    updatedImages[index] = newValue;
    setImages(updatedImages);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (images[images.length - 1] === "") return;
    setImages([...images, ""]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };
  return (
    <div className="sm:col-span-2">
      <div className="block mb-2 text-sm font-medium text-gray-900 ">
        Images
      </div>
      {images.map((image, index) => {
        return (
          <ImageInput
            key={index}
            value={image}
            onChange={(e) => handleImageChange(index, e.target.value)}
            onRemove={() => handleRemoveImage(index)}
          />
        );
      })}
      <div className="flex justify-center">
        <button
          onClick={handleAddImage}
          className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add Image
        </button>
      </div>
    </div>
  );
}

export default ImagesInput;
