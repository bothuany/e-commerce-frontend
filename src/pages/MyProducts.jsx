import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import dir from "../config/dir.json";
/*import HighlightsInput from "../components/HighlightsInput";
import StocksInput from "../components/StocksInput";
import ImagesInput from "../components/ImagesInput";*/
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [details, setDetails] = useState([]);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [stocks, setStocks] = useState([
    { id: 1, colorID: "", sizeID: "", quantity: 0 },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("Success!");
  const [alertText, setAlertText] = useState(
    "You have successfully added a new product."
  );

  const [myProducts, setMyProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (selected && myProducts.length > 0) {
      const foundProduct = myProducts.find(
        (myProduct) => myProduct.product.id === selected
      );

      setProductName(foundProduct.product.name);
      setDescription(foundProduct.product.description);
      setHighlights(foundProduct.product.highlights);
      setDetails(foundProduct.product.details);
      setPrice(foundProduct.product.price);
      setCategory(foundProduct.product.categoryID);
      setImages(foundProduct.product.images);
      setStocks(foundProduct.stocks);
    }
  }, [selected, myProducts]);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(dir.api + "/api/categories");
      setCategories(data);
    };

    fetchCategories();

    const fetchSizes = async () => {
      const { data } = await axios.get(dir.api + "/api/sizes");
      setSizes(data);
    };
    fetchSizes();

    const fetchColors = async () => {
      const { data } = await axios.get(dir.api + "/api/colors");
      setColors(data);
    };
    fetchColors();

    const fetchMyProducts = async () => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        dir.api + "/api/products/seller/" + user.user.id,
        config
      );
      setMyProducts(data);
    };
    fetchMyProducts();
  }, []);

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const newProduct = {
      product: {
        name: productName,
        description: description,
        highlights: highlights,
        details: details,
        price: price,
        categoryID: category,
        images: images,
      },
      stocks: stocks,
    };
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .put(
        dir.api + "/api/products/update-sale",
        { id: selected, product: newProduct },
        config
      )
      .then((res) => {
        setAlertType("success");
        setAlertTitle("Success!");
        setAlertText("You have successfully updated your product.");
        setShowAlert(true);
      })
      .catch((err) => {
        console.log({ id: selected, product: newProduct });
        setAlertType("error");
        setAlertTitle("Error!");
        setAlertText("Something went wrong. Please try again.");
        setShowAlert(true);
      });

    setIsLoading(false);
  };*/

  const onRemove = async () => {
    alert("Are you sure you want to delete this product?");

    setIsLoading(true);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .delete(dir.api + "/api/products/" + selected, config)
      .then((res) => {
        setAlertType("success");
        setAlertTitle("Success!");
        setAlertText("You have successfully deleted a product.");
        setShowAlert(true);
      })
      .catch((err) => {
        setAlertType("error");
        setAlertTitle("Error!");
        setAlertText("Something went wrong. Please try again.");
        setShowAlert(true);
      });
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-6xl w-full lg:py-16">
      <div className="min-w-screen">
        <label
          htmlFor="product"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Product
        </label>
        <select
          id="product"
          onChange={(e) => setSelected(e.target.value)}
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        >
          <option value="">Select Your Product</option>
          {myProducts.map((myProduct) => (
            <option key={myProduct.product.id} value={myProduct.product.id}>
              {myProduct.product.name}
            </option>
          ))}
        </select>
      </div>
      {selected && (
        <section className="bg-white ">
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-900 ">
              Your product
            </h2>
            <form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    disabled
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Type product name"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="descriptions"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    id="descriptions"
                    disabled
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
                    placeholder="Write descriptions..."
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Detail
                  </label>
                  <textarea
                    id="details"
                    disabled
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
                    placeholder="Write details..."
                  ></textarea>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    disabled
                    onChange={(e) => {
                      if (e.target.value < 0) return;
                      setPrice(e.target.value);
                    }}
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="$29"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    disabled
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center">
                {/*
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`mt-3 text-white  ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800"
                  } focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2`}
                >
                  Save
                </button>
                */}
                <button
                  disabled={isLoading}
                  onClick={onRemove}
                  className={`mt-3 text-white  ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-700 hover:bg-red-800"
                  } focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2`}
                >
                  Delete
                </button>
              </div>
            </form>
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
        </section>
      )}
    </div>
  );
}

export default MyProducts;
