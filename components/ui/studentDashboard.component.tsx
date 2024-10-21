"use client";

import React, { useState } from "react";

import { Classes, ClassReport, CreateExam, LeaveApplication, MyCalendar, MySchedule, Profile, TeacherSidebar, UpdateMarks } from "../teacher";

import { StudentProfile, StudentSidebar } from "../student";
import NavBar from "../common/navBar";
import TeacherNav from "../teacher/teacherNav.component";


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
const StudentDashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("profile");

  // Function to render the right component based on the active state
  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <StudentProfile />;
      case "calendar":
        return <MyCalendar />;
      case "schedule":
        return <MySchedule />;
      // Add other cases as needed...
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <StudentSidebar onSelect={setActiveComponent} />

      {/* Main Content Area */}
      <div
        className={`ml-[8%] md:ml-[5%] w-[92%] md:w-[95%]`}
        //className="ml-[10%] md:ml-[15%] w-[90%] md:w-[85%] h-full"
        style={{ backgroundColor: COLORS.porcelain }}
      >
        {/* Fixed Navbar */}
        <NavBar />

        {/* Content Area */}
        <div className="pt-20 p-6" style={{ backgroundColor: COLORS.porcelain }}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
