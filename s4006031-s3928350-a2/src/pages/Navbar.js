import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // State to control dropdown visibility
  const [isDropdown, setIsDropdown] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("sessionToken"); // Remove session token
    localStorage.removeItem("userDetails"); // Remove user details
    localStorage.removeItem("cart"); // Remove cart items
    window.location.href = "/"; // Redirect to homepage
  };

  


  
  return (
    <nav className="bg-green-600 text-white py-2 px-4 flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-yellow-300">Home</Link>
        </li>
        <li>
          <Link to="/product" className="hover:text-yellow-300">Shop</Link>
        </li>
        <li>
          <Link to="/special-deals" className="hover:text-yellow-300" style={{ color: 'red' }}>Sale</Link>
        </li>
        <li>
          <Link to="/vegetable-tips" className="hover:text-yellow-300" >Tips</Link>
        </li>
      </ul>
      <ul className="flex space-x-4">
        <li>
          <Link to="/sign-in" className="hover:text-yellow-300">Sign In</Link>
        </li>
        <li>
          <Link to="/sign-up" className="hover:text-yellow-300">Sign Up</Link>
        </li>
        <li>
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none hover:text-yellow-300">
              Profile
            </button>
            {isDropdown && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded-md z-10">
                <Link
                  to="/user-profile"
                  className="block px-4 py-2 hover:bg-gray-300 text-black hover:text-white"
                >
                  View Profile
                </Link>
                <Link
                  to="/cart"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-300 text-black hover:text-white"
                  >
                    View Shopping Cart
                  </Link>
                  <Link
                  to="/diet-plan"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-300 text-black hover:text-white"
                  >
                    Diet Plan
                  </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-300 text-black hover:text-white"
                >
                  Logout
                </button>
                
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
