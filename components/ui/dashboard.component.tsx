"use client";

import React, { useState } from "react";

import { Classes, ClassReport, CreateExam, LeaveApplication, MyCalendar, MySchedule, Profile, TeacherSidebar, UpdateMarks } from "../teacher";
import { FaCheckCircle } from "react-icons/fa";
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
        <TeacherNav />

        {/* Content Area */}
        <div className="pt-20 p-6" style={{ backgroundColor: COLORS.porcelain }}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
