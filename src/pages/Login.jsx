import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dir from "../config/dir.json";

function Login() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("Success!");
  const [alertText, setAlertText] = useState("You logged in successfully!");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(dir.api + "/api/auth/login", { email, password }, config)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setAlertType("success");
        setAlertTitle("Success!");
        setAlertText("You logged in successfully!");
        setShowAlert(true);
        navigate("/");
      })
      .catch((err) => {
        setAlertType("error");
        setAlertTitle("Error!");
        setAlertText("Invalid email or password!");
        setShowAlert(true);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=violet&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative block w-full rounded-t-md border-0 pl-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-8"
                placeholder="example@gmail.com"
              />
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-8"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Forgot your password?
              </a>
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
              Sign in
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
  );
}

export default Login;
