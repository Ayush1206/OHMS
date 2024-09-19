"use client";

import React, { useState } from "react";

import { Classes, ClassReport, CreateExam, LeaveApplication, MyCalendar, MySchedule, UpdateMarks } from "../teacher";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AddClass, AddEmployee, AddStudentForm, FeeCollection, FeeReport, Profile, Sidebar, ViewClasses, ViewEmployee, ViewStudents } from "../admin";
import NavBar from "../common/navBar";

const COLORS = {
  porcelain: "#f0f1f2",
  darkerPorcelain: "#e1e3e5",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
};

// const Sidebar: React.FC<{ onSelect: (component: string) => void }> = ({
//   onSelect,
// }) => {

//   const router = useRouter();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isStudentManagementOpen, setIsStudentManagementOpen] = useState(false);
//   const [isEmployeeManagementOpen, setIsEmployeeManagementOpen] = useState(false);
//   const [isClassManagementOpen, setIsClassManagementOpen] = useState(false);
//   const [isFeeManagementOpen, setIsFeeManagementOpen] = useState(false);

//   const handleClassesClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleClassClick = (classItem: any) => {
//     // Example: Navigate to class details page or show class information
//     console.log(`Clicked on class: ${classItem.name}`);
//     router.push(`/class/${classItem.id}`);
//     // You could add navigation logic here (e.g., with React Router or Next.js)
//   };



  
// };


const AdminDashboard = () => {

  const [activeComponent, setActiveComponent] = useState<string>("profile");
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile />;
      case "calendar":
        return <MyCalendar />;
      case "addStudents":
        return <AddStudentForm />;
      case "classes":
        return <Classes />;
      case "leave":
        return <LeaveApplication />;
      case "addExam":
        return <CreateExam />;
      case "updateMarks":
        return <UpdateMarks />
      case "examReport":
        return <ClassReport />
      case "viewStudents":
        return <ViewStudents />
      case "addEmployee":
        return <AddEmployee />
      case "viewEmployee":
        return <ViewEmployee />
      case "addClass":
        return <AddClass />
      case "viewClasses":
        return <ViewClasses />
      case "feeCollection":
        return <FeeCollection />
      case "feeReport":
        return <FeeReport />
      default:
        return <Profile />;
    }
  };


  return (
    <div className="flex">
      <Sidebar onSelect={setActiveComponent} />
      <div
        className="ml-[10%] md:ml-[15%] w-[90%] md:w-[85%] h-full"
        style={{ backgroundColor: COLORS.porcelain }}
      >
        {/* Fixed Navbar */}
        <NavBar />

        {/* Mobile Menu Options */}
        {/* {showMobileMenu && (
        <div className="absolute top-16 left-[10%] md:left-[15%] w-[90%] md:w-[85%] bg-white text-softGrey flex flex-col items-center z-20 shadow-lg">
          <button
            onClick={() => setActiveComponent("calendar")}
            className="py-2 hover:text-burntSienna"
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveComponent("notifications")}
            className="py-2 hover:text-burntSienna"
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveComponent("settings")}
            className="py-2 hover:text-burntSienna"
          >
            Settings
          </button>
        </div>
      )} */}

        {/* Content Area */}
        <div className="pt-20 p-6" style={{ backgroundColor: COLORS.porcelain }}>
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard