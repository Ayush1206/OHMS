import React, { useState } from 'react';
import { Bars3Icon, StarIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarAdmin: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const classTeacherFor = "Class 2";

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  return (
    <>
      <div className="sm:hidden fixed top-0 left-0 z-20">
        <button onClick={toggleSidebar} className="p-4">
          <Bars3Icon className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      <div className={`fixed top-0 left-0 h-screen w-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 bg-gradient-to-b from-purple-500 via-pink-500 to-white z-10`}>

        <div className="text-white text-xl font-bold p-5"></div>
        <nav className="flex flex-col space-y-2">
          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Home</a>
          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Profile</a>
          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Fee Management</a>

          {/* Dropdown Toggle */}
          

          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Settings</a>
          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Logout</a>
        </nav>
      </div>
    </>
  );
};

export default SidebarAdmin;
