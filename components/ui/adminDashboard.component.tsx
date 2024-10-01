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
        className="ml-[10%] md:ml-[5%] w-[90%] md:w-[95%] h-full"
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
  )
}

export default AdminDashboard