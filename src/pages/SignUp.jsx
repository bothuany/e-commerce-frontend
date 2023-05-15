import React, { useEffect, useState } from "react";
import PasswordChecklist from "react-password-checklist";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dir from "../config/dir.json";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("Success!");
  const [alertText, setAlertText] = useState(
    "You have successfully registered."
  );
  const [type, setType] = useState("customer");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/");
    }
  }, [navigate]);

  function handleSetPassword(event) {
    setPassword(event.target.value);
  }
  function handleSetMatchPassword(event) {
    setPasswordAgain(event.target.value);
  }
  function handleSetName(event) {
    setName(event.target.value);
  }
  function handleSetSurname(event) {
    setSurname(event.target.value);
  }
  function handleSetPhoneNumber(event) {
    setPhoneNumber(event.target.value);
  }
  function handleSetCompanyName(event) {
    setCompanyName(event.target.value);
  }
  function handleSetCompanyPhoneNumber(event) {
    setCompanyPhoneNumber(event.target.value);
  }
  function handleSetEmail(event) {
    setEmail(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userInfo = {
      role: type,
      name: name + " " + surname,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      companyName: companyName,
      companyPhoneNumber: companyPhoneNumber,
    };

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(dir.api + "/api/auth/register", userInfo, config)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setAlertType("success");
        setAlertTitle("Success!");
        setAlertText("You have successfully registered.");
        setShowAlert(true);
        navigate("/");
      })
      .catch((err) => {
        setAlertType("error");
        setAlertTitle("Error!");
        setAlertText("You have entered an invalid information.");
        setShowAlert(true);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  const onOptionChange = (e) => {
    if (type === "customer") setType("seller");
    if (type === "seller") setType("customer");
  };

  return (
    <div className="w-full py-10 px-1 sm:px-5 flex flex-col ">
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-7 lg:px-8 mb-16 text-center ">
        <div className="w-full max-w-md space-y-8  ">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=violet&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="John"
                      onChange={handleSetName}
                      value={name}
                      id="name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="surname"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Surname
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      required
                      name="surname"
                      id="surname"
                      placeholder="Smith"
                      onChange={handleSetSurname}
                      value={surname}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      required
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="0123456789"
                      onChange={handleSetPhoneNumber}
                      value={phoneNumber}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={handleSetEmail}
                    />
                  </div>
                </div>
              </div>

              <br></br>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleSetPassword}
                  required
                  className="relative block w-full rounded-b-md border-0 py-2 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-8"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Password Again
                </label>
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  value={passwordAgain}
                  onChange={handleSetMatchPassword}
                  required
                  className="relative block w-full rounded-b-md border-0 pl-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-8"
                />
              </div>
              <br />
              <PasswordChecklist
                rules={["match", "minLength"]}
                minLength={8}
                value={password}
                valueAgain={passwordAgain}
              />
            </div>
            {type === "seller" ? (
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Company Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      required
                      name="companyName"
                      placeholder="Wearwell"
                      onChange={handleSetCompanyName}
                      value={companyName}
                      id="companyName"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="companyPhoneNumber"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Company Phone Number
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      required
                      name="companyPhoneNumber"
                      id="companyPhoneNumber"
                      placeholder="0123456789"
                      onChange={handleSetCompanyPhoneNumber}
                      value={companyPhoneNumber}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I accept the Terms of Use & Privacy Policy.
                </label>
              </div>
              <div className="flex items-center ">
                <span className=" mr-3 text-sm font-medium text-gray-900 ">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={onOptionChange}
                  />
                  <div className="w-11 h-6 bg-violet-600 rounded-full peer  peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-violet-00 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative flex w-full justify-center rounded-md ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-500"
                } px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600`}
              >
                Sign up
              </button>
            </div>
          </form>
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
    </div>
  );
}

export default SignUp;
