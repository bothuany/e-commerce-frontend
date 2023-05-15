import React from "react";
import { Link } from "react-router-dom";
import bgTransparentLogo from "../images/transparent-bg-logo.png";
const Footer = () => {
  return (
    <footer className="w-full py-5 sm:py-10 px-4 bg-violet-700 mt-auto">
      {" "}
      {/* Container */}
      <h2 className="sr-only">Footer</h2>
      <div className="flex flex-col-reverse sm:flex-row md:justify-between lg:justify-around">
        {/* :SITE NAME & SOCIAL NETWORKS */}
        <div className="relative mt-14 sm:mt-0 px-5 flex flex-col justify-center items-center text-gray-300">
          {/* ::Site name */}
          <Link to="/">
            <img
              src={bgTransparentLogo}
              alt="Logo"
              width="200"
              height="200"
            ></img>
          </Link>
          <br />
          <br />
          {/* ::Social & copyright */}
          <div className="mt-auto flex flex-col items-center">
            {/* :::Social */}
            <span className="inline-flex mt-6 w-full justify-center md:justify-start md:w-auto">
              {/* GitHub */}
              <a
                href="https://github.com/bothuany/e-commerce-frontend"
                className="fa-brands fa-github fa-lg ml-3 text-gray-300"
              >
                <span className="sr-only">GitHub</span>
              </a>

              {/* Linkedin */}
              <a
                href="#"
                className="fa-brands fa-linkedin fa-lg ml-3 text-gray-300"
              >
                <span className="sr-only">Linkedin</span>
              </a>
            </span>
            <br />

            {/* :::Copyright */}
            <span className="py-4 text-xs">
              &copy; {new Date().getFullYear()} , Wearwell All Rights Reserved.
            </span>
          </div>
          {/* ::Mobile separator line */}
          <span
            className="sm:hidden absolute -top-4 left-1/2 w-1/4 h-px bg-gray-300 transform -translate-x-1/2"
            aria-hidden="true"
          />
        </div>

        {/* :NAVIGATION */}
        <div className="grid grid-cols-3 gap-5 text-gray-300">
          {/* ::Navigation */}
          <div className="col-span-2 md:col-span-1 pb-0 md:py-3 px-4">
            <h3 className="py-1.5 md:py-4 text-center sm:text-left text-xl text-gray-400 font-bold tracking-wide">
              Navigation
            </h3>
            <nav className="flex justify-around md:flex-col font-medium list-none">
              <li>
                <Link to="/" className="hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#link" className="hover:text-gray-200">
                  About
                </Link>
              </li>
            </nav>
          </div>

          {/* ::Email */}
          <div className="col-span-2 md:col-span-1 pb-0 md:py-3 px-4 flex flex-col items-center sm:items-start">
            <h3 className="py-1.5 md:py-4 text-xl text-gray-400 font-bold tracking-wide">
              Wearwell Company
            </h3>
            <p className="inline-flex justify-center sm:justify-start text-sm text-gray-300 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href="mailto:rbdikmen@gmail.com">rbdikmen@gmail.com</a>
            </p>
            <p className="mt-2 inline-flex justify-center sm:justify-start text-sm text-gray-300 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href="mailto:caglasenn1@gmail.com">caglasenn1@gmail.com</a>
            </p>
            <p className="mt-2 inline-flex justify-center sm:justify-start text-sm text-gray-300 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href="mailto:iremakanoglu@gmail.com">iremakanoglu@gmail.com</a>
            </p>
          </div>
          {/* ::Phone */}
          <div className="col-span-2 md:col-span-1 pb-0 md:py-3 px-4 flex flex-col items-center sm:items-start">
            <h3 className="py-1.5 md:py-4 text-xl text-gray-400 font-bold tracking-wide">
              Phone contact
            </h3>
            <p className="inline-flex justify-center sm:justify-start text-sm text-gray-300 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>0530 123 45 67</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
