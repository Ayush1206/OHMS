import React, { useState } from 'react';
import { Bars3Icon, StarIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC = () => {
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
          <div className="py-2 px-5">
            <button onClick={toggleDropdown} className="text-white w-full text-left">
              Classes
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col pl-4 mt-2 space-y-2"
                >
                  {/* Dropdown Items */}
                  {['Class 1', 'Class 2', 'Class 3'].map((className, index) => (
                    <a href="#" key={index} className={`flex items-center text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out ${className === classTeacherFor ? "border-2 border-pink-500 shadow-md shadow-pink-500/50 rounded-lg" : ""}`}>
                      {className === classTeacherFor && <StarIcon className="h-5 w-5 mr-2 text-yellow-400" />}
                      {className}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Settings</a>
          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Logout</a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
