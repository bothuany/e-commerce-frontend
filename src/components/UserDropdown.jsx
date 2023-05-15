import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function UserDropdown() {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const signOut = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <button
          onClick={handleModal}
          className="group -m-2 flex items-center p-2"
        >
          <i className="fa-solid fa-user fa-lg"></i>
        </button>

        {/* Dropdown */}
        {isModalOpen && user ? (
          <div
            ref={dropdownRef}
            id="userDropdown"
            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0 mt-2"
          >
            {/* Dropdown content */}
            <div className="px-4 py-3 text-sm text-gray-900">
              <div>{user.user.name}</div>
              <div className="font-medium truncate">{user.user.email}</div>
              <div className="font-medium truncate text-purple-800">
                {user.user.role.at(0) + user.user.role.slice(1).toLowerCase()}
              </div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="avatarButton"
            >
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-1" onClick={signOut}>
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sign out
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default UserDropdown;
