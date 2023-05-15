import React, { useEffect, useState } from "react";
import CartProducts from "../components/CartProducts";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";
import dir from "../config/dir.json";
import Alert from "../components/Alert";
import { useUser } from "../contexts/UserContext";

function Cart() {
  const { cartItems, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("Success!");
  const [alertText, setAlertText] = useState("Redirecting to checkout page...");
  const { user } = useUser();
  const navigate = useNavigate();

  let totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  useEffect(() => {
    totalPrice = cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    const confirmCartObject = {
      orderItems: cartItems.map((item) => {
        return { stockID: item.stockID, quantity: item.quantity };
      }),
      order: {
        address,
        phoneNumber,
      },
    };

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .post(dir.api + "/api/invoices/confirm-cart", confirmCartObject, config)
      .then((res) => {
        setAlertType("success");
        setAlertTitle("Success!");
        setAlertText("Redirecting to checkout page...");
        setShowAlert(true);
        setIsLoading(false);

        navigate("/checkout", { state: { orderID: res.data } });
      })
      .catch((err) => {
        console.log(err);
        setAlertType("error");
        setAlertTitle("Error!");
        setAlertText("Something went wrong. Please try again.");
        setShowAlert(true);
      });
    setIsLoading(false);
  };

  return (
    <div className="mx-auto py-5 w-full max-w-3xl bg-white">
      <div className="flex flex-col items-center">
        {/* :TITLE */}
        <h2 className="text-center text-3xl text-gray-700 font-semibold">
          Shopping Cart
        </h2>

        {/* :PRODUCT LIST */}
        <CartProducts products={cartItems} />

        {/* :SUBTOTAL */}
        <div className="py-7 px-10 w-full">
          {/* ::Subtotal */}
          <p className="flex justify-between items-baseline">
            <span className="text-base text-gray-700 font-semibold">
              Subtotal:
            </span>
            <span className="text-2xl text-black font-bold">{`$${totalPrice.toFixed(
              2
            )}`}</span>
          </p>
          {/* ::Shipping Info */}
          <p className="mt-2 text-sm text-gray-500">
            Shipping and taxes will be calculated at checkout
          </p>
        </div>

        {/* Order form inculdes address and phoneNumber */}
        <form
          onSubmit={handleSubmit}
          className="mt-5 px-10 w-full flex flex-col"
        >
          {/* ::Address */}
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="relative block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-8"
              placeholder="Address"
            />
          </div>
          {/* ::Phone Number */}
          <div className="flex flex-col mt-3">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="0123456789"
              autoComplete="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="relative block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-8"
            />
          </div>
          {/* :ACTIONS */}
          <div className="mt-5">
            {/* ::Checkout Button */}
            <button
              type="submit"
              className="py-2 w-full rounded bg-violet-500 text-center text-base text-white hover:bg-violet-600"
            >
              Checkout
            </button>
            {/* ::Continue Shopping */}
            <p className="mt-3 text-center text-base text-gray-500">
              or{" "}
              <Link
                to="/search"
                className="inline-flex items-center text-center text-sm text-violet-500 hover:text-violet-600 font-semibold"
              >
                Continue Shopping
                <span className="ml-2" aria-hidden="true">
                  {" "}
                  &rarr;
                </span>
              </Link>
            </p>

            {/* ::Clear Button */}
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="mt-2 py-2 w-full rounded bg-red-500 text-center text-base text-white hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <Modal
        title={"Warning"}
        text={"Your cart is going to be cleared. Are you sure?"}
        acceptMessage={"Yes"}
        acceptAction={clearCart}
        showModal={showModal}
        setShowModal={setShowModal}
      />
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

export default Cart;
