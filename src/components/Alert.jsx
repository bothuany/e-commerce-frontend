import React, { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const Alert = ({ type, title, text, showAlert, setShowAlert }) => {
  //Type: success, error, warning, info

  const [isFadingOut, setIsFadingOut] = useState(false);

  let color = "green";
  let icon = <CheckCircleIcon className="w-6 h-6" />;
  if (type === "error") {
    color = "red";
    icon = <XCircleIcon className="w-6 h-6" />;
  } else if (type === "info") {
    color = "blue";
    icon = <InformationCircleIcon className="w-6 h-6" />;
  } else if (type === "warning") {
    color = "yellow";
    icon = <ExclamationCircleIcon className="w-6 h-6" />;
  }

  useEffect(() => {
    let timeoutId;
    if (showAlert) {
      timeoutId = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 500);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAlert, setShowAlert]);

  const containerClassNames = `
  fixed bottom-0 mb-10 rounded p-4 max-w-4xl flex border border-${color}-300 bg-${color}-100 
    transition-opacity duration-500 ${isFadingOut ? "opacity-0" : ""}`;

  return (
    <div className={containerClassNames}>
      {/* ::Icon */}
      <span className={`flex-shrink-0 text-${color}-500`}>{icon}</span>
      {/* ::Content */}
      <div className="ml-3 flex flex-col items-start space-y-2 text-sm">
        {/* :::alert title */}
        <h3 className={`text-${color}-800 font-semibold`}>{title}</h3>
        {/* :::alert message */}
        <p className={`text-${color}-600 font-medium antialiased`}>{text}</p>
      </div>
      {/* To pre-download required tailwindcss classes */}
      <div className="border-green-300 bg-green-100 text-green-800 text-green-600"></div>
      <div className="border-blue-300 bg-blue-100 text-blue-800 text-blue-600"></div>
      <div className="border-red-300 bg-red-100 text-red-800 text-red-600"></div>
      <div className="border-yellow-300 bg-yellow-100 text-yellow-800 text-yellow-600"></div>
    </div>
  );
};

export default Alert;
