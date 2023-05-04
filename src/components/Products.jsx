import React from "react";
import Product from "./Product";

function Products() {
  const products = [
    {
      id: 1,
      name: "Basic Tee",
      description: "T-shirt",
      price: 31,
      images: [
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      ],
      category: {
        id: 1,
        name: "clothes",
      },
      seller: {
        id: 1,
        name: "oscar",
        email: "oscar@gmail.com",
        phoneNumber: "31313131",
        companyName: "Koton",
        companyPhone: "1313131",
      },
    },
    {
      id: 2,
      name: "Basic Tee",
      description: "T-shirt",
      price: 31,
      images: [
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      ],
      category: {
        id: 1,
        name: "clothes",
      },
      seller: {
        id: 1,
        name: "oscar",
        email: "oscar@gmail.com",
        phoneNumber: "31313131",
        companyName: "Koton",
        companyPhone: "1313131",
      },
    },
    {
      id: 3,
      name: "Basic Tee",
      description: "T-shirt",
      price: 31,
      images: [
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      ],
      category: {
        id: 1,
        name: "clothes",
      },
      seller: {
        id: 1,
        name: "oscar",
        email: "oscar@gmail.com",
        phoneNumber: "31313131",
        companyName: "Koton",
        companyPhone: "1313131",
      },
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product product={product} key={product.id}></Product>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
