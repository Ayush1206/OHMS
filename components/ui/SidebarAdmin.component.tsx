import React, { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface SidebarAdminProps {
  setActiveComponent: (componentName: string) => void;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ setActiveComponent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
          <button
            onClick={() => setActiveComponent('Admin')}
            className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5"
          >
            Admin
          </button>
          <button
            onClick={() => setActiveComponent('UserProfile')}
            className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveComponent('FeeManagement')}
            className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5"
          >
            Fee Management
          </button>
          <button
            onClick={() => setActiveComponent('LeaveInfo')}
            className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5"
          >
            Leave info
          </button>
          <button
            onClick={() => setActiveComponent('AddEmployee')}
            className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5"
          >
            Add Employee
          </button>
          <button
            onClick={() => setActiveComponent('AddStudents')}
            className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5"
          >
            Add Students
          </button>
          <button
            onClick={() => setActiveComponent('Settings')}
            className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5"
          >
            Settings
          </button>
          {/* <Link href="/logout" passHref>
            <a className="text-white py-2 hover:text-gray-900 hover:bg-white transition duration-300 ease-in-out p-5">
              Logout
            </a>
          </Link> */}
        </nav>
      </div>
    </>
  );
};

export default SidebarAdmin;
