import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";

function Product({ product }) {
  return (
    <div key={product.id} className="group relative">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.images[0]}
          alt="image"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/products/${slugify(product.name).toLowerCase()}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.companyName}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{`$${product.price.toFixed(
          2
        )}`}</p>
      </div>
    </div>
  );
}

export default Product;
