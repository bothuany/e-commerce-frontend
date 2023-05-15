import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useCart } from "../contexts/CartContext";
import { useClassifier } from "../contexts/ClassifierContext";
import { useParams } from "react-router-dom";

import Alert from "../components/Alert";
import axios from "axios";
import dir from "../config/dir.json";
import colorList from "../config/colors.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { addToCart } = useCart();
  const { colors: defaultColors, sizes: defaultSizes } = useClassifier();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("Success!");
  const [alertText, setAlertText] = useState(
    "Chosen product added to your cart."
  );
  const { name } = useParams();

  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selectedColor, setSelectedColor] = useState({ name: "" });
  const [selectedSize, setSelectedSize] = useState({ name: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${dir.api}/api/products/?name=${name}`
        );
        const responseData = response.data;

        setProduct(responseData.product);
        setStocks(responseData.stocks);

        setColors(
          responseData.stocks.map((stock) => {
            if (stock.quantity > 0) {
              return { ...stock.color, inStock: true };
            } else {
              return { ...stock.color, inStock: false };
            }
          })
        );
        setSelectedColor({ ...responseData.stocks[0].color });
        setSelectedSize({ id: 0 });
        setSizes(
          responseData.stocks.map((stock) => {
            if (stock.quantity > 0) {
              return { ...stock.size, inStock: true };
            } else {
              return { ...stock.size, inStock: false };
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [name, defaultColors, defaultSizes]);

  const getStockInfos = (colorID, sizeID) => {
    let stockID = null;
    let quantity = 0;

    stocks.some((stock) => {
      if (stock.color.id === colorID && stock.size.id === sizeID) {
        stockID = stock.id;
        quantity = stock.quantity;
        return true;
      }
    });

    return { stockID, quantity };
  };

  const isColorExists = (colorID) => {
    let exists = false;
    colors.some((color) => {
      if (color.id === colorID) {
        exists = true;
        return true;
      }
    });
    return exists;
  };

  const isSizeExists = (sizeID) => {
    let exists = false;
    sizes.some((size) => {
      if (size.id === sizeID) {
        exists = true;
        return true;
      }
    });
    return exists;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { stockID: selectedStockID, quantity } = getStockInfos(
      selectedColor.id,
      selectedSize.id
    );

    if (!selectedStockID) {
      setAlertText("Please select a color and a size.");
      setAlertType("error");
      setAlertTitle("Error!");
      setShowAlert(true);
      return;
    }
    addToCart({
      ...product,
      quantity: 1,
      color: selectedColor.name,
      size: selectedSize.name,
      stockID: selectedStockID,
    });

    setShowAlert(true);
  };

  return (
    <div className="bg-white justify-center flex">
      {product ? (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.category.name + "   /"}

              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  &nbsp;&nbsp;
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {product.images.map((image) => {
              return (
                <div
                  className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"
                  key={image}
                >
                  <img
                    src={image}
                    alt="image"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              );
            })}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {`$${product.price.toFixed(2)}`}
              </p>

              <form className="mt-10" onSubmit={handleSubmit}>
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex  items-center space-x-3">
                      {defaultColors.map((color) => {
                        if (isColorExists(color.id)) {
                          return (
                            <RadioGroup.Option
                              key={color.name}
                              value={color}
                              style={{
                                backgroundColor:
                                  colorList[color.name.toLowerCase()],
                              }}
                              className={({ active, checked }) =>
                                classNames(
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                )
                              }
                            >
                              <RadioGroup.Label as="span" className="sr-only">
                                {color.name}
                              </RadioGroup.Label>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  "h-8 w-8 rounded-full border border-black border-opacity-10"
                                )}
                              />
                            </RadioGroup.Option>
                          );
                        }
                      })}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {defaultSizes.map((size) => {
                        if (isSizeExists(size.id)) {
                          return (
                            <RadioGroup.Option
                              key={size.name}
                              value={size}
                              disabled={
                                selectedColor
                                  ? getStockInfos(selectedColor.id, size.id)
                                      .quantity < 0
                                  : true
                              }
                              className={({ active }) =>
                                classNames(
                                  (
                                    selectedColor
                                      ? getStockInfos(selectedColor.id, size.id)
                                          .quantity > 0
                                      : false
                                  )
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  active ? "ring-2 ring-violet-500" : "",
                                  "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size.name}
                                  </RadioGroup.Label>
                                  {size.inStock ? (
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-violet-500"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-md"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    ></span>
                                  )}
                                </>
                              )}
                            </RadioGroup.Option>
                          );
                        }
                      })}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-600 px-8 py-3 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showAlert ? (
        <Alert
          type={alertType}
          title={alertTitle}
          text={alertText}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}
    </div>
  );
}
