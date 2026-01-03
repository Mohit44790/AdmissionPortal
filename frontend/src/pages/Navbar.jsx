import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser, FaSignOutAlt } from "react-icons/fa";
// import dseu_logo from "../assets/logo/dseu_logo.png";
// import placeholder from "../assets/logo/placeholder-pfp.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
 const handleLogoClick = () => {
  navigate("/dashboard");
};

  // -------------------------------
  // Logout
  // -------------------------------
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
   
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 py-2 z-50 print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2  cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <img src="https://dseuadm.samarth.edu.in/assets/759660c7/site_files/dseu_logo.png" alt="DSEU Logo" className="h-12" />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  className="flex items-center gap-2 p-1.5  rounded-full transition-colors cursor-pointer"
>
  {/* GRADIENT RING */}
  <div className="relative">
  <div className="p-0.5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600">
    <div className="bg-white rounded-full p-0.5 ">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7Ruc3aDfDuCbY_FFQ-23U1on7qndeh-dNw&s"
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>
  </div>
</div>

</button>


            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">

               

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FaUser className="w-4 h-4 text-gray-400" />
                    Profile Info
                  </button>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
