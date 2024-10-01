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
  FaBox,
  FaTimes,
  FaBars
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
  const [isStudentManagementPopupOpen, setIsStudentManagementPopupOpen] = useState(false);

  const [isEmployeeManagementOpen, setIsEmployeeManagementOpen] = useState(false);
  const [isEmployeeManagementPopupOpen, setIsEmployeeManagementPopupOpen] = useState(false);

  const [isClassManagementOpen, setIsClassManagementOpen] = useState(false);
  const [isClassManagementPopupOpen, setIsClassManagementPopupOpen] = useState(false);

  const [isFeeManagementOpen, setIsFeeManagementOpen] = useState(false);
  const [isFeeManagementPopupOpen, setIsFeeManagementPopupOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleStudentManagement = () => {
    if (isExpanded) {
      setIsStudentManagementOpen(!isStudentManagementOpen);
    } else {
      setIsStudentManagementPopupOpen(!isStudentManagementPopupOpen); // Show popup when sidebar is collapsed
      setIsEmployeeManagementPopupOpen(false);
      setIsClassManagementPopupOpen(false);
      setIsFeeManagementPopupOpen(false);
    }
  };

  const toggleEmployeeManagment = () => {


    if (isExpanded) {
      setIsEmployeeManagementOpen(!isEmployeeManagementOpen);
    } else {
      setIsEmployeeManagementPopupOpen(!isEmployeeManagementPopupOpen); // Show popup when sidebar is collapsed

      setIsStudentManagementPopupOpen(false);
      setIsClassManagementPopupOpen(false);
      setIsFeeManagementPopupOpen(false);
    }
  }

  const toggleClassManagement = () => {

    if (isExpanded) {
      setIsClassManagementOpen(!isClassManagementOpen);
    } else {
      setIsClassManagementPopupOpen(!isClassManagementPopupOpen); // Show popup when sidebar is collapsed
      setIsEmployeeManagementPopupOpen(false); // Show popup when sidebar is collapsed
      setIsStudentManagementPopupOpen(false);
      setIsFeeManagementPopupOpen(false);
    }
  }

  const toggleFeeManagement = () => {

    if (isExpanded) {
      setIsFeeManagementOpen(!isFeeManagementOpen);
    } else {
      setIsFeeManagementPopupOpen(!isFeeManagementPopupOpen); // Show popup when sidebar is collapsed

      setIsClassManagementPopupOpen(false); // Show popup when sidebar is collapsed
      setIsEmployeeManagementPopupOpen(false); // Show popup when sidebar is collapsed
      setIsStudentManagementPopupOpen(false);
    }
  }

  const handleInventoryClick = () => {
    router.push("/inventory"); // Navigate to the inventory page
  };

  const handleItemClick = (component: string) => {
    onSelect(component);
    setIsStudentManagementPopupOpen(false); // Close popup after selecting an option
  };

  // Similar toggle functions for other sections

  return (
    <div
      className={`h-full fixed top-0 left-0 py-2 ${isExpanded ? "w-[100%] md:w-[50%] " : "w-[8%] md:w-[5%]"
        } flex flex-col items-center z-50 transition-width duration-300`}
      style={{ backgroundColor: COLORS.william }}
    >
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl absolute top-4 left-4"
      >
        {isExpanded ? <FaTimes /> : <FaBars />}
      </button>

      {/* <h2 className="text-white text-2xl font-bold mb-8 text-center hidden md:block">
        OHMS
      </h2> */}
      <ul className="space-y-8 mt-16 text-white w-full text-center">
        <li>
          <button
            onClick={() => onSelect("profile")}
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-[${COLORS.burntSienna}"
          >
            <FaUserCircle size={24} className="min-w-[24px]" />
            {isExpanded && (
              <span className="text-lg md:inline">Profile</span>
            )}
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelect("calendar")}
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaRegCalendarCheck size={24} />
            {isExpanded && (
              <span className="text-lg md:inline">My Calendar</span>
            )}

          </button>
        </li>

        {/* Student Management - Expandable Section */}
        <li className="relative">
          <button
            onClick={toggleStudentManagement}
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaUserGraduate size={24} />
            {isExpanded && (
              <>
                <span className="text-lg md:inline">Student Management</span>
                {isStudentManagementOpen ? (
                  <FaChevronUp size={16} className="hidden md:inline" />
                ) : (
                  <FaChevronDown size={16} className="hidden md:inline" />
                )}
              </>
            )}
          </button>

          {/* Popup for Collapsed Sidebar */}
          {!isExpanded && isStudentManagementPopupOpen && (
            <div
              className="absolute text-white shadow-md rounded-lg p-4 w-64 z-50"
              style={{
                left: "110%", // Creates the space between sidebar and popup
                top: "0", // Starts from the top of the parent element
                backgroundColor: COLORS.william,
              }}
            >
              {/* Arrow to connect popup to parent */}
              <div
                className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"
              ></div>

              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => handleItemClick("addStudents")}
                    className="flex items-center space-x-2 hover:text-burntSienna"
                  >
                    <FaUserPlus size={16} />
                    <span>Add Students</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleItemClick("viewStudents")}
                    className="flex items-center space-x-2 hover:text-burntSienna"
                  >
                    <FaList size={16} />
                    <span>Manage Students</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleItemClick("transferStudents")}
                    className="flex items-center space-x-2 hover:text-burntSienna"
                  >
                    <FaExchangeAlt size={16} />
                    <span>Transfer Students</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleItemClick("viewPerformance")}
                    className="flex items-center space-x-2 hover:text-burntSienna"
                  >
                    <FaChartLine size={16} />
                    <span>View/Update Performance</span>
                  </button>
                </li>
              </ul>
            </div>
          )}

          {isExpanded && isStudentManagementOpen && (
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

        <li className="relative">
          <button
            onClick={toggleEmployeeManagment}
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaUsers size={24} />
            {isExpanded && (
              <>
                <span className="text-lg md:inline">Employees</span>
                {isEmployeeManagementOpen ? (
                  <FaChevronUp size={16} className="hidden md:inline" />
                ) : (
                  <FaChevronDown size={16} className="hidden md:inline" />
                )}
              </>
            )}
          </button>
          {!isExpanded && isEmployeeManagementPopupOpen && (
            <div
              className="absolute text-white shadow-md rounded-lg p-4 w-64 z-50"
              style={{
                left: "110%", // Creates the space between sidebar and popup
                top: "0", // Starts from the top of the parent element
                backgroundColor: COLORS.william,
              }}
            >
              {/* Arrow to connect popup to parent */}
              <div
                className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"
              ></div>

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
              </ul>
            </div>
          )}

          {isExpanded && isEmployeeManagementOpen && (
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

        <li className="relative">
          <button
            onClick={toggleClassManagement}
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaChalkboardTeacher size={24} />
            {isExpanded && (
              <>
                <span className="text-lg md:inline">Class Management</span>
                {isClassManagementOpen ? (
                  <FaChevronUp size={16} className="hidden md:inline" />
                ) : (
                  <FaChevronDown size={16} className="hidden md:inline" />
                )}
              </>
            )}
          </button>

          {!isExpanded && isClassManagementPopupOpen && (
            <div
              className="absolute text-white shadow-md rounded-lg p-4 w-64 z-50"
              style={{
                left: "110%", // Creates the space between sidebar and popup
                top: "0", // Starts from the top of the parent element
                backgroundColor: COLORS.william,
              }}
            >
              {/* Arrow to connect popup to parent */}
              <div
                className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"
              ></div>

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
            </div>
          )}

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

        <li className="relative">
          <button
            onClick={toggleFeeManagement}
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaMoneyCheckAlt size={24} />
            {isExpanded && (
              <>
                <span className="text-lg md:inline">Fee Management</span>
                {isFeeManagementOpen ? (
                  <FaChevronUp size={16} className="hidden md:inline" />
                ) : (
                  <FaChevronDown size={16} className="hidden md:inline" />
                )}
              </>
            )}
          </button>

          {!isExpanded && isFeeManagementPopupOpen && (
            <div
              className="absolute text-white shadow-md rounded-lg p-4 w-64 z-50"
              style={{
                left: "110%", // Creates the space between sidebar and popup
                top: "0", // Starts from the top of the parent element
                backgroundColor: COLORS.william,
              }}
            >
              {/* Arrow to connect popup to parent */}
              <div
                className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"
              ></div>

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
            </div>
          )}

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
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaBox size={24} />
            {isExpanded && (
              <span className="text-lg md:inline">Inventory</span>
            )}

          </button>
        </li>

        {/* <li>
          <button
            onClick={() => onSelect("")}
            className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaClipboardCheck size={24} />
            <span className="text-lg md:inline">Fee Setting</span>
          </button>
        </li> */}
        <li>
          <button
            onClick={() => onSelect("leave")}
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-burntSienna"
          >
            <FaBell size={24} />
            {isExpanded && (
              <span className="text-lg md:inline">Leave Application</span>
            )}

          </button>
        </li>


      </ul>
    </div>
  );
};

export default Sidebar;


// "use client";

// import React, { useState } from "react";
// import {
//   FaUserGraduate,
//   FaUserCircle,
//   FaBars,
//   FaTimes,
//   FaBox,
// } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// const COLORS = {
//   porcelain: "#f0f1f2",
//   darkerPorcelain: "#e1e3e5",
//   william: "#3b5b6a",
//   burntSienna: "#eb6042",
//   porsche: "#e5aa5d",
//   softGrey: "#8a9ba8",
// };

// const Sidebar: React.FC<{ onSelect: (component: string) => void }> = ({
//   onSelect,
// }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const router = useRouter();

//   // Toggle Sidebar
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Handle inventory click
//   const handleInventoryClick = () => {
//     router.push("/inventory");
//   };

//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 flex flex-col items-start ${
//           isSidebarOpen ? "w-full md:w-[50%]" : "w-[5%] md:w-[5%]"
//         }`}
//         style={{ backgroundColor: COLORS.william }}
//       >
//         {/* Sidebar Header */}
//         <div className="flex justify-between items-center p-4 w-full">
//           {/* OHMS logo - hidden on medium and small screens */}
//           {!isSidebarOpen && (
//             <h2 className="text-white text-xl font-bold ml-4 lg:ml-2 hidden lg:block">
//             OHMS
//           </h2>
//           )}
//           <button onClick={toggleSidebar} className="text-white">
//             {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Sidebar Links */}
//         <ul className="space-y-6 mt-6 w-full">
//           <li>
//             <button
//               onClick={() => onSelect("profile")}
//               className="flex items-center space-x-4 w-full px-4 py-3 hover:bg-porsche hover:text-white transition-all duration-200"
//             >
//               <FaUserCircle size={24} className="text-white" />
//               {isSidebarOpen && (
//                 <span className="text-white text-lg">Profile</span>
//               )}
//             </button>
//           </li>

//           <li>
//             <button
//               onClick={() => onSelect("students")}
//               className="flex items-center space-x-4 w-full px-4 py-3 hover:bg-porsche hover:text-white transition-all duration-200"
//             >
//               <FaUserGraduate size={24} className="text-white" />
//               {isSidebarOpen && (
//                 <span className="text-white text-lg">Students</span>
//               )}
//             </button>
//           </li>

//           <li>
//             <button
//               onClick={handleInventoryClick}
//               className="flex items-center space-x-4 w-full px-4 py-3 hover:bg-porsche hover:text-white transition-all duration-200"
//             >
//               <FaBox size={24} className="text-white" />
//               {isSidebarOpen && (
//                 <span className="text-white text-lg">Inventory</span>
//               )}
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Sidebar Overlay for Mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;


