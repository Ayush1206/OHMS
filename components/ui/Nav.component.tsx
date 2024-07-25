"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface NavbarProps {
  onNavigate: (componentName: string) => void;
}

const NavCompo: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleServicesDropdown = () => setIsServicesOpen(!isServicesOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (name: string) => {
    onNavigate(name);
    setIsServicesOpen(false); // Close the dropdown after navigating
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-lg font-semibold py-4">
            OHMS
          </a>
          <div className="space-x-4 hidden sm:flex">
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">
              Home
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">
              About
            </a>
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleServicesDropdown} className="hover:text-gray-200 transition-colors duration-200">
                Services
              </button>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md overflow-hidden shadow-lg"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleToggle("Admission")}
                  >
                    Admission Form
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleToggle("OfficeBoy")}
                  >
                    User Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleToggle("ProfileHome")}
                  >
                    Admin Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleToggle("StudentDashboard")}
                  >
                    Student Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleToggle("LogIn")}
                  >
                    Login
                  </a>
                </motion.div>
              )}
            </div>
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">
              Contact
            </a>
          </div>
          <button onClick={toggleMobileMenu} className="sm:hidden py-4">
            Menu
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-4 py-2 flex flex-col">
              <a href="#" className="hover:text-gray-200">
                Home
              </a>
              <a href="#" className="hover:text-gray-200">
                About
              </a>
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleServicesDropdown} className="hover:text-gray-200 transition-colors duration-200">
                  Services
                </button>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md overflow-hidden shadow-lg"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleToggle("Admission")}
                    >
                      Admission Form
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleToggle("OfficeBoy")}
                    >
                      User Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleToggle("Admin")}
                    >
                      Admin Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleToggle("LogIn")}
                    >
                      Login
                    </a>
                  </motion.div>
                )}
              </div>
              <a href="#" className="hover:text-gray-200">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavCompo;
