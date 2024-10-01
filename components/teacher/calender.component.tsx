"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus, FaCalendarDay, FaCalendarWeek, FaCalendarAlt } from "react-icons/fa";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import AddEventModal from "../common/addEventForm";

// Define the color palette based on your theme
const COLORS = {
  porcelain: "#f0f1f2",
  darkerPorcelain: "#e1e3e5",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
};

// Placeholder for event data
interface Event {
  id: number;
  title: string;
  type: string;
  description: string;
  date: Date;
}

const MyCalendar: React.FC = () => {
  const [viewMode, setViewMode] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState("");

  const changeViewMode = (mode: string) => {
    setViewMode(mode);
  };

  const handlePrevious = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEventSubmit = (event: { title: string; type: string; description: string; date: Date }) => {
    const newEvent = {
      id: events.length + 1,
      ...event,
    };

    setEvents([...events, newEvent]);
  };

  // Function to render events (placeholder)
  const renderEvents = (events: Event[]) => {
    return events.map((event) => (
      <div key={event.id} className="bg-porsche p-2 rounded shadow mb-2">
        {event.title} - {event.date.toDateString()}
      </div>
    ));
  };

  return (
    <div className="p-6" style={{ backgroundColor: COLORS.porcelain }}>
      {/* Calendar Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center">
          <button onClick={handlePrevious} className="mr-4 hover:text-burntSienna">
            <FaChevronLeft size={20} />
          </button>
          <span className="text-xl font-semibold" style={{ color: COLORS.william }}>
            {format(currentDate, "MMMM yyyy")}
          </span>
          <button onClick={handleNext} className="ml-4 hover:text-burntSienna">
            <FaChevronRight size={20} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => changeViewMode("day")}
            className={`mr-2 ${viewMode === "day" ? "text-burntSienna" : "text-william"} hover:text-burntSienna`}
          >
            <FaCalendarDay size={20} />
          </button>
          <button
            onClick={() => changeViewMode("week")}
            className={`mr-2 ${viewMode === "week" ? "text-burntSienna" : "text-william"} hover:text-burntSienna`}
          >
            <FaCalendarWeek size={20} />
          </button>
          <button
            onClick={() => changeViewMode("month")}
            className={`mr-2 ${viewMode === "month" ? "text-burntSienna" : "text-william"} hover:text-burntSienna`}
          >
            <FaCalendarAlt size={20} />
          </button>
        </div>
        <button
          onClick={handleAddEvent}
          className="bg-burntSienna text-white px-4 py-2 rounded flex items-center hover:bg-william"
        >
          <FaPlus className="mr-2" />
          Add Event
        </button>
      </div>

      {/* Calendar View */}
      <div className="border rounded-lg shadow p-4" style={{ backgroundColor: COLORS.darkerPorcelain }}>
        {viewMode === "day" && <DayView events={events} />}
        {viewMode === "week" && <WeekView events={events} />}
        {viewMode === "month" && <MonthView events={events} currentDate={currentDate} />}
      </div>

      <AddEventModal isOpen={isModalOpen} onClose={handleCloseModal} onAddEvent={handleEventSubmit} />
    </div>
  );
};

// Day View Component
const DayView: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-william mb-4">Day View</h2>
      <div>{events.length ? renderEvents(events) : <p>No events for today.</p>}</div>
    </div>
  );
};

// Week View Component
const WeekView: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-william mb-4">Week View</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Day {index + 1}</h3>
            <div>{events.length ? renderEvents(events) : <p>No events.</p>}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Month View Component
const MonthView: React.FC<{ events: Event[]; currentDate: Date }> = ({ events, currentDate }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div>
      <h2 className="text-xl font-bold text-william mb-4">Month View</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day.toString()} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{format(day, "d")}</h3>
            <div>
              {events
                .filter((event) => isSameDay(event.date, day))
                .map((event) => (
                  <div
                    key={event.id}
                    className="bg-porsche p-2 rounded shadow mb-2 cursor-pointer"
                    title={event.description}
                    style={{ backgroundColor: COLORS.porsche }}
                  >
                    {event.title} - {format(event.date, "HH:mm")}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to render events
const renderEvents = (events: Event[]) => {
  return events.map((event) => (
    <div key={event.id} className="bg-porsche p-2 rounded shadow mb-2">
      {event.title} - {event.date.toDateString()}
    </div>
  ));
};

export default MyCalendar;
