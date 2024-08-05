import React, { useState } from 'react';
import { Bars3Icon, StarIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarAdminProps {
  setActiveComponent: (componentName: string) => void;
}

const Sidebar: React.FC<SidebarAdminProps> = ({ setActiveComponent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const classTeacherFor = "Class 2";

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
          <button
            onClick={() => setActiveComponent('LeaveInfo')}
            className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5"
          >
            Leave info
          </button>
          {/* <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Leave info</a> */}

          {/* Modal Toggle */}
          <div className="py-2 px-5">
            <button onClick={toggleModal} className="text-white w-full text-left">
              Classes
            </button>
          </div>

          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Settings</a>
          <a href="#" className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">Logout</a>
        </nav>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 w-96 shadow-lg relative"
            >
              <button
                onClick={toggleModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <h2 className="text-lg font-bold mb-4">Select a Class</h2>
              <div className="flex flex-col space-y-2">
                {['Class 1', 'Class 2', 'Class 3'].map((className, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out ${
                      className === classTeacherFor ? "border-2 border-pink-500 shadow-md shadow-pink-500/50 rounded-lg" : ""
                    }`}
                  >
                    <span>{className}</span>
                    {className === classTeacherFor && <StarIcon className="h-5 w-5 text-yellow-400" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
