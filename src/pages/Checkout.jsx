import React, { useEffect, useState } from "react";
import {
  CheckBadgeIcon,
  InformationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import dir from "../config/dir.json";
import Alert from "../components/Alert";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderID } = state;
  let idGenerator = 1;
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("Success!");
  const [alertText, setAlertText] = useState("Payment successful!");
  const [paymentMethod, setPaymentMethod] = useState("Visa");

  let totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");

    setIsLoading(true);

    const payment = {
      paymentMethod,
      amount: totalPrice,
      orderID: orderID,
    };

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    console.log(dir.api + "/api/payments/pay", payment, config);
    await axios
      .post(dir.api + "/api/payments/pay", payment, config)
      .then((res) => {
        setAlertType("success");
        setAlertTitle("Success!");
        setAlertText("Payment successful!");
        setShowAlert(true);
      })
      .catch((err) => {
        setAlertType("error");
        setAlertTitle("Error!");
        setAlertText("Something went wrong. Please try again.");
        setShowAlert(true);
      });
    setIsLoading(false);
  };
  return (
    <div className="relative mx-auto w-full max-w-7xl bg-white">
      <div className="grid grid-cols-10">
        {/* :CHECKOUT FORM CONTAINER */}
        <div className="col-span-full lg:col-span-6 py-6 sm:py-12 lg:py-24 px-4">
          <div className="mx-auto w-full max-w-lg">
            {/* ::Title */}
            <h1 className="relative text-2xl sm:text-3xl text-gray-700 font-medium">
              Secure Checkout
              <span className="mt-2 w-10 sm:w-20 h-1 block bg-violet-600" />
            </h1>

            {/* ::Checkout Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col space-y-4"
            >
              {/* :::Email address */}
              <div>
                {/* ::::label */}
                <label
                  htmlFor="email"
                  className="text-xs text-gray-500 font-semibold"
                >
                  Email
                </label>
                {/* ::::input */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="myaddress@example.com"
                  className="form-input mt-1 w-full block shadow-sm rounded border-gray-300 bg-gray-50 text-sm placeholder-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>
              {/* :::Card number */}
              <div className="relative">
                {/* ::::label */}
                <label
                  htmlFor="card-number"
                  className="text-xs text-gray-500 font-semibold"
                >
                  Card number
                </label>
                {/* ::::input */}
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234-5678-XXXX-XXXX"
                  className="form-input pr-10 w-full block shadow-sm rounded border-gray-300 bg-gray-50 text-sm placeholder-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
                {/* ::::visa logo */}
                <img
                  src="https://fancytailwind.com/static/visa-icon-5282a8660b2ad42cbdcf817d51129c0a.png"
                  alt=""
                  className="absolute bottom-3 right-3 max-h-4"
                />
              </div>
              {/* :::Expiration date */}
              <div>
                {/* ::::title */}
                <p className="text-xs text-gray-500 font-semibold">
                  Expiration date
                </p>
                <div className="mr-6 flex flex-wrap">
                  {/* ::::select month */}
                  <div className="my-1">
                    <label htmlFor="month" className="sr-only">
                      Select expiration month
                    </label>
                    <select
                      name="month"
                      id="month"
                      className={`form-select shadow-sm rounded border-gray-300 bg-gray-50 text-sm cursor-pointer focus:border-violet-500 focus:ring-1 focus:ring-violet-500`}
                    >
                      <option value="">Month</option>
                    </select>
                  </div>
                  {/* ::::select year */}
                  <div className="my-1 ml-3 mr-6">
                    <label htmlFor="year" className="sr-only">
                      Select expiration year
                    </label>
                    <select
                      name="year"
                      id="year"
                      className={`form-select shadow-sm rounded border-gray-300 bg-gray-50 text-sm cursor-pointer focus:border-violet-500 focus:ring-1 focus:ring-violet-500`}
                    >
                      <option value="">Year</option>
                    </select>
                  </div>
                  {/* ::::security code */}
                  <div className="my-1 relative">
                    <label htmlFor="security-code" className="sr-only">
                      Security code
                    </label>
                    <input
                      type="text"
                      id="security-code"
                      name="security-code"
                      placeholder="Security code"
                      className="form-input w-36 block shadow-sm rounded border-gray-300 bg-gray-50 text-sm placeholder-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    />
                    <button className="absolute top-1/2 -right-6 inline-flex justify-center items-center text-gray-400 hover:text-violet-600 transform -translate-y-1/2">
                      <InformationCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              {/* :::Card name */}
              <div>
                {/* ::::label */}
                <label htmlFor="card-name" className="sr-only">
                  Card name
                </label>
                {/* ::::input */}
                <input
                  type="text"
                  id="card-name"
                  name="card-name"
                  placeholder="Name on the card"
                  className="form-input mt-1 w-full block shadow-sm rounded border-gray-300 bg-gray-50 text-sm placeholder-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </form>

            {/* ::Info */}
            <p className="mt-10 text-center text-sm text-gray-500 font-semibold">
              By placing this order you agree to the{" "}
              <a
                href="#link"
                className="text-violet-400 underline hover:text-violet-600 whitespace-nowrap"
              >
                Terms and Conditions
              </a>
            </p>

            {/* ::Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-4 py-2.5 px-4 w-full inline-flex justify-center items-center rounded bg-violet-600 text-base sm:text-lg text-white text-opacity-80 font-semibold tracking-wide hover:text-opacity-100"
            >
              <LockClosedIcon className="mr-3 w-5 h-5" />
              Place Order
            </button>
          </div>
        </div>

        {/* :RECAP CONTAINER */}
        <div className="col-span-full lg:col-span-4 relative py-6 sm:py-12 lg:py-24 pl-8 pr-4 flex flex-col">
          {/* ::Title */}
          <h2 className="sr-only">Order summary</h2>

          {/* ::Background Image */}
          <div>
            <img
              src="https://www.supplychainmovement.com/wp-content/uploads/2021/03/online-shopping.jpeg"
              alt=""
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-violet-800 to-violet-400 opacity-75" />
          </div>

          {/* ::Order Summary */}
          <div className="relative">
            {/* :::Item list */}
            <ul className="space-y-5">
              {cartItems.map((item) => (
                <li
                  key={item.id + idGenerator++}
                  className="flex justify-between"
                >
                  {/* ::::item infos */}
                  <div className="inline-flex">
                    <img src={item.images[0]} alt="" className="max-h-16" />
                    <div className="ml-3">
                      <p className="text-base text-white font-semibold">
                        {item.name}
                      </p>
                      <p className="text-sm text-white text-opacity-80 font-medium">
                        {item.companyName}
                      </p>
                    </div>
                  </div>
                  {/* ::::item price */}
                  <p className="text-sm text-white font-semibold">{`$${(
                    item.price * item.quantity
                  ).toFixed(2)}`}</p>
                </li>
              ))}
            </ul>
            {/* :::Separation */}
            <div className="my-5 w-full h-0.5 bg-white bg-opacity-30" />
            {/* :::Total */}
            <div className="space-y-2">
              {/* ::::total price */}
              <p className="flex justify-between text-lg text-white font-bold">
                <span>Total price:</span>
                <span>{`$${totalPrice.toFixed(2)}`}</span>
              </p>
            </div>
          </div>

          {/* ::Guarantee */}
          <div className="relative mt-10 flex">
            <CheckBadgeIcon className="mr-3 w-10 h-10 text-yellow-400" />
            <p className="flex flex-col">
              <span className="text-sm text-white font-bold">
                Money Back Guarantee
              </span>
              <span className="text-xs text-white font-medium">
                within 30 days of purchase
              </span>
            </p>
          </div>
        </div>
      </div>
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
};

export default Checkout;
