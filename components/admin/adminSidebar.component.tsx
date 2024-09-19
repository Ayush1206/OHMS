"use client";

import React, { useState } from "react";
import {
    FaCog,
    FaCalendarAlt,
    FaBell,
    FaUserCircle,
    FaChalkboardTeacher,
    FaRegCalendarCheck,
    FaClipboardCheck,
    FaPen,
    FaChevronUp,
    FaChevronDown,
    FaUserPlus,
    FaList,
    FaExchangeAlt,
    FaChartLine,
    FaUserGraduate,
    FaUsers,
    FaMoneyCheckAlt,
    FaBox
  } from "react-icons/fa";
import { useRouter } from "next/navigation"; 

const COLORS = {
    porcelain: "#f0f1f2",
    darkerPorcelain: "#e1e3e5",
    william: "#3b5b6a",
    burntSienna: "#eb6042",
    porsche: "#e5aa5d",
    softGrey: "#8a9ba8",
  };

const Sidebar: React.FC<{ onSelect: (component: string) => void }> = ({
    onSelect,
  }) => {
  const [isStudentManagementOpen, setIsStudentManagementOpen] = useState(false);
  const [isEmployeeManagementOpen, setIsEmployeeManagementOpen] = useState(false);
  const [isClassManagementOpen, setIsClassManagementOpen] = useState(false);
  const [isFeeManagementOpen, setIsFeeManagementOpen] = useState(false);

  const router = useRouter();

  
  const toggleStudentManagement = () => {
    setIsStudentManagementOpen(!isStudentManagementOpen);
  };

  const toggleEmployeeManagment = () => {
    setIsEmployeeManagementOpen(!isEmployeeManagementOpen);
  }

  const toggleClassManagement = () => {
    setIsClassManagementOpen(!isClassManagementOpen);
  }

  const toggleFeeManagement = () => {
    setIsFeeManagementOpen(!isFeeManagementOpen);
  }

  const handleInventoryClick = () => {
    router.push("/inventory"); // Navigate to the inventory page
  };

  // Similar toggle functions for other sections

  return (
    <div
      className={`h-full fixed top-0 left-0 flex flex-col items-center md:items-start md:pl-6 py-6 md:w-[15%] w-[10%]`}
      style={{ backgroundColor: COLORS.william }}
    >
      <h2 className="text-white text-2xl font-bold mb-8 text-center hidden md:block">
        OHMS
      </h2>
      <ul className="space-y-8 text-white">
        <li>
          <button
            onClick={() => onSelect("profile")}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaUserCircle size={24} />
            <span className="text-lg hidden md:inline">Profile</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelect("calendar")}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaRegCalendarCheck size={24} />
            <span className="text-lg hidden md:inline">My Calendar</span>
          </button>
        </li>

        {/* Student Management - Expandable Section */}
        <li>
          <button
            onClick={toggleStudentManagement}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaUserGraduate size={24} />
            <span className="text-lg hidden md:inline">Student Management</span>
            {isStudentManagementOpen ? (
              <FaChevronUp size={16} className="hidden md:inline" />
            ) : (
              <FaChevronDown size={16} className="hidden md:inline" />
            )}
          </button>
          {isStudentManagementOpen && (
            <ul className="ml-8 mt-4 space-y-4">
              <li>
                <button
                  onClick={() => onSelect("addStudents")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaUserPlus size={16} />
                  <span>Add Students</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelect("viewStudents")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaList size={16} />
                  <span>Manage Students</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelect("transferStudents")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaExchangeAlt size={16} />
                  <span>Transfer Students</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelect("viewPerformance")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaChartLine size={16} />
                  <span>View/Update Performance</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button
            onClick={toggleEmployeeManagment}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaUsers size={24} />
            <span className="text-lg hidden md:inline">Employees</span>
            {isEmployeeManagementOpen ? (
              <FaChevronUp size={16} className="hidden md:inline" />
            ) : (
              <FaChevronDown size={16} className="hidden md:inline" />
            )}
          </button>
          {isEmployeeManagementOpen && (
            <ul className="ml-8 mt-4 space-y-4">
              <li>
                <button
                  onClick={() => onSelect("addEmployee")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaUserPlus size={16} />
                  <span>Add Employee</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelect("viewEmployee")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaList size={16} />
                  <span>Manage Employees</span>
                </button>
              </li>
              {/* <li>
                    <button
                      onClick={() => onSelect("transferStudents")}
                      className="flex items-center space-x-2 hover:text-burntSienna"
                    >
                      <FaExchangeAlt size={16} />
                      <span>Transfer Students</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelect("viewPerformance")}
                      className="flex items-center space-x-2 hover:text-burntSienna"
                    >
                      <FaChartLine size={16} />
                      <span>View/Update Performance</span>
                    </button>
                  </li> */}
            </ul>
          )}
        </li>

        <li>
          <button
            onClick={toggleClassManagement}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaChalkboardTeacher size={24} />
            <span className="text-lg hidden md:inline">Class Management</span>
            {isClassManagementOpen ? (
              <FaChevronUp size={16} className="hidden md:inline" />
            ) : (
              <FaChevronDown size={16} className="hidden md:inline" />
            )}
          </button>
          {isClassManagementOpen && (
            <ul className="ml-8 mt-4 space-y-4">
              <li>
                <button
                  onClick={() => onSelect("addClass")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaUserPlus size={16} />
                  <span>Add Class</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelect("viewClasses")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaList size={16} />
                  <span>Manage Class</span>
                </button>
              </li>

            </ul>
          )}
        </li>

        <li>
          <button
            onClick={toggleFeeManagement}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaMoneyCheckAlt size={24} />
            <span className="text-lg hidden md:inline">Fee Management</span>
            {isFeeManagementOpen ? (
              <FaChevronUp size={16} className="hidden md:inline" />
            ) : (
              <FaChevronDown size={16} className="hidden md:inline" />
            )}
          </button>
          {isFeeManagementOpen && (
            <ul className="ml-8 mt-4 space-y-4">
              <li>
                <button
                  onClick={() => onSelect("feeCollection")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaUserPlus size={16} />
                  <span>Fee Collection</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelect("feeReport")}
                  className="flex items-center space-x-2 hover:text-burntSienna"
                >
                  <FaList size={16} />
                  <span>Fee Report</span>
                </button>
              </li>

            </ul>
          )}
        </li>

        <li>
          <button
            onClick={handleInventoryClick}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaBox size={24} />
            <span className="text-lg hidden md:inline">Inventory</span>
          </button>
        </li>

        {/* <li>
          <button
            onClick={() => onSelect("")}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaClipboardCheck size={24} />
            <span className="text-lg hidden md:inline">Fee Setting</span>
          </button>
        </li> */}
        <li>
          <button
            onClick={() => onSelect("leave")}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaBell size={24} />
            <span className="text-lg hidden md:inline">Leave Application</span>
          </button>
        </li>


      </ul>
    </div>
  );
};

export default Sidebar;
