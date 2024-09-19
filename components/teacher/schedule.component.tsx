"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { format, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths } from "date-fns";
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt } from "react-icons/fa"; // Import icons


// Define the color palette based on your theme
const COLORS = {
  porcelain: "#f0f1f2",
  darkerPorcelain: "#e1e3e5",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
};

// Placeholder for class data
interface ClassSchedule {
  id: number;
  title: string;
  date: Date;
  time: string;
  room: string;
}

const sampleClasses: ClassSchedule[] = [
  { id: 1, title: "Maths", date: new Date(), time: "10:00 AM - 11:00 AM", room: "Room 201" },
  { id: 2, title: "Physics", date: new Date(), time: "12:00 PM - 1:00 PM", room: "Room 202" },
  // Add more sample classes
];

const MySchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");

  const handlePrevious = () => {
    switch (viewMode) {
      case "day":
        setCurrentDate(subDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (viewMode) {
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
    }
  };

  const renderClassesForDay = () => {
    const todayClasses = sampleClasses.filter(
      (cls) => format(cls.date, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd")
    );
    return (
      <>
        {todayClasses.map((cls) => (
          <div key={cls.id} className="p-4 bg-white rounded shadow mb-2">
            <h3 className="text-lg font-semibold">{cls.title}</h3>
            <p>{cls.time}</p>
            <p>{cls.room}</p>
          </div>
        ))}
        {todayClasses.length === 0 && <p>No classes scheduled for today.</p>}
      </>
    );
  };

  const renderClassesForWeek = () => {
    const startOfWeek = subDays(currentDate, currentDate.getDay());
    return (
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, index) => {
          const day = addDays(startOfWeek, index);
          const dayClasses = sampleClasses.filter(
            (cls) => format(cls.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
          );
          return (
            <div key={index} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">{format(day, "EEEE, MMM d")}</h3>
              {dayClasses.length ? (
                dayClasses.map((cls) => (
                  <div key={cls.id} className="mt-2">
                    <p>{cls.title}</p>
                    <p>{cls.time}</p>
                  </div>
                ))
              ) : (
                <p>No classes</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderClassesForMonth = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return (
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 30 }).map((_, index) => {
          const day = addDays(startOfMonth, index);
          const dayClasses = sampleClasses.filter(
            (cls) => format(cls.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
          );
          return (
            <div key={index} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">{format(day, "MMM d")}</h3>
              {dayClasses.length ? (
                dayClasses.map((cls) => (
                  <div key={cls.id} className="mt-2">
                    <p>{cls.title}</p>
                    <p>{cls.time}</p>
                  </div>
                ))
              ) : (
                <p>No classes</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6" style={{ backgroundColor: COLORS.porcelain }}>
      {/* Header Section with Navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button onClick={handlePrevious} className="mr-4 hover:text-burntSienna">
            <FaChevronLeft size={20} />
          </button>
          <span className="text-xl font-semibold" style={{ color: COLORS.william }}>
            {format(currentDate, viewMode === "month" ? "MMMM yyyy" : "MMMM d, yyyy")}
          </span>
          <button onClick={handleNext} className="ml-4 hover:text-burntSienna">
            <FaChevronRight size={20} />
          </button>
        </div>
        <div>
          <button
            onClick={() => setViewMode("day")}
            className={`mr-2 ${viewMode === "day" ? "text-burntSienna" : "text-william"} hover:text-burntSienna`}
          >
            <FaCalendarDay size={20} /> {/* Day icon */}
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`mr-2 ${viewMode === "week" ? "text-burntSienna" : "text-william"} hover:text-burntSienna`}
          >
            <FaCalendarWeek size={20} /> {/* Week icon */}
          </button>
          <button
            onClick={() => setViewMode("month")}
            className={`mr-2 ${viewMode === "month" ? "text-burntSienna" : "text-william"} hover:text-burntSienna`}
          >
            <FaCalendarAlt size={20} /> {/* Month icon */}
          </button>
        </div>
      </div>

      {/* Class Schedule View */}
      <div className="border rounded-lg shadow p-4" style={{ backgroundColor: COLORS.darkerPorcelain }}>
        {viewMode === "day" && renderClassesForDay()}
        {viewMode === "week" && renderClassesForWeek()}
        {viewMode === "month" && renderClassesForMonth()}
      </div>

    </div>
  );
};

export default MySchedule;
