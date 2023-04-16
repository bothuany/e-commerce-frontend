import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";


function SignUp() {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  function handleSetPassword(event) {
    setPassword(event.target.value);
  }
  function handleSetMatchPassword(event) {
    setPasswordAgain(event.target.value);
  }
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-7 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label
                htmlFor="name"
                className="block text-m font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                required
                className="relative block w-full rounded-t-md border-0 pl-2 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
              />
            </div>
            <div>
              <label
                htmlFor="surname"
                className="block text-m font-medium leading-6 text-gray-900"
              >
                Surname
              </label>
              <input
                id="surname"
                name="surname"
                type="name"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
              />
            </div>
            <div>
              <label
                htmlFor="email-address"
                className="block text-m font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
                placeholder="example@gmail.com"
              />
            </div>
            <br></br>

            <div>
              <label
                htmlFor="password"
                className="block text-m font-medium leading-6 text-gray-900"
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
                className="relative block w-full rounded-b-md border-0 py-2 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-m font-medium leading-6 text-gray-900"
              >
                Password Again :
              </label>
              <input
                id="passwordAgain"
                name="passwordAgain"
                type="password"
                value={passwordAgain}
                onChange={handleSetMatchPassword}
                required
                className="relative block w-full rounded-b-md border-0 pl-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-8"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I accept the terms of membership.
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
