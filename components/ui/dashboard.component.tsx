"use client";

import React, { useState } from "react";

import { Classes, ClassReport, CreateExam, LeaveApplication, MyCalendar, MySchedule, Profile, TeacherSidebar, UpdateMarks } from "../teacher";
import { FaCheckCircle } from "react-icons/fa";


// Define the color palette based on your theme
const COLORS = {
  porcelain: "#f0f1f2",
  darkerPorcelain: "#e1e3e5",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
};

const classes = [
  { name: "Class 1A", isHeadmaster: true },
  { name: "Class 2B", isHeadmaster: false },
  { name: "Class 3C", isHeadmaster: false },
  { name: "Class 4D", isHeadmaster: true },
];



// Sidebar component


// Main dashboard component
const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("calendar");
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);



  // Function to render the right component based on the active state
  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile />;
      case "calendar":
        return <MyCalendar />;
      case "schedule":
        return <MySchedule />;
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
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex">
      <TeacherSidebar onSelect={setActiveComponent} />
      <div
        className="ml-[10%] md:ml-[15%] w-[90%] md:w-[85%] h-full"
        style={{ backgroundColor: COLORS.porcelain }}
      >
        {/* Fixed Navbar */}
        <div
          className="fixed w-[90%] md:w-[85%] top-0 flex justify-between items-center px-6 py-3 z-10"
          style={{ backgroundColor: COLORS.darkerPorcelain }}
        >
          <h1
            className="text-william text-2xl font-semibold"
            style={{ color: COLORS.william }}
          >
            Dashboard
          </h1>
          <div className="hidden md:flex space-x-8 text-softGrey">
            <button
              onClick={() => setActiveComponent("calendar")}
              className="hover:text-burntSienna"
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveComponent("notifications")}
              className="hover:text-burntSienna"
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveComponent("settings")}
              className="hover:text-burntSienna"
            >
              Settings
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-softGrey hover:text-burntSienna"
            >
              {showMobileMenu ? "✖" : "☰"}
            </button>
          </div>
        </div>
        <hr className="border-t-2 border-softGrey fixed w-[90%] md:w-[85%] top-16" />

        {/* Mobile Menu Options */}
        {showMobileMenu && (
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
        )}

        {/* Content Area */}
        <div className="pt-20 p-6" style={{ backgroundColor: COLORS.porcelain }}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
