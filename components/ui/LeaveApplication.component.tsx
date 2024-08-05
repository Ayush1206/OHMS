"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Leave {
  date: Date;
  reason: string;
}

interface Holiday {
  date: Date;
  description: string;
}

const LeaveApplication: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const totalLeaves = 30;
  const usedLeaves = 10;

  // Example leave data
  const leaves: Leave[] = [
    { date: new Date(2024, 0, 15), reason: "Medical leave" },
    { date: new Date(2024, 1, 5), reason: "Personal leave" },
    // Add more leave records as needed
  ];

  // Example Indian holidays data
  const holidays: Holiday[] = [
    { date: new Date(2024, 0, 26), description: "Republic Day" },
    { date: new Date(2024, 2, 10), description: "Holi" },
    { date: new Date(2024, 3, 8), description: "Ram Navami" },
    { date: new Date(2024, 4, 23), description: "Eid al-Fitr" },
    { date: new Date(2024, 7, 15), description: "Independence Day" },
    { date: new Date(2024, 8, 19), description: "Ganesh Chaturthi" },
    { date: new Date(2024, 9, 2), description: "Mahatma Gandhi Jayanti" },
    { date: new Date(2024, 10, 1), description: "Diwali" },
    { date: new Date(2024, 11, 25), description: "Christmas" },
    // Add more holidays as needed
  ];

  const isLeaveDay = (date: Date) => {
    return leaves.some((leave) => leave.date.toDateString() === date.toDateString());
  };

  const isHoliday = (date: Date) => {
    return holidays.some((holiday) => holiday.date.toDateString() === date.toDateString());
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold">Leave Application</h1>
        <div className="ml-4 flex items-center relative">
          <span className="text-lg font-semibold">
            {usedLeaves}/{totalLeaves} Leaves Used
          </span>
          <div
            className="ml-2 cursor-pointer text-blue-500"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          >
            <FaInfoCircle />
          </div>
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bg-white shadow-lg p-4 rounded-lg z-10 left-0"
                style={{ marginTop: "2rem", width: "12rem" }}
              >
                <ul className="text-sm">
                  {leaves.map((leave, index) => (
                    <li key={index}>
                      {leave.date.toDateString()}: {leave.reason}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex mb-8">
        <div className="flex-grow">
          <Calendar
            tileClassName={({ date }) => {
              if (isLeaveDay(date)) {
                return "bg-red-200"; // Leave day
              } else if (isHoliday(date)) {
                return "bg-blue-200"; // Holiday
              }
              return "";
            }}
            className="custom-calendar"
          />
        </div>
        <div className="w-1/3 ml-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Holidays</h2>
          <ul className="space-y-2">
            {holidays.map((holiday, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1/4 text-sm font-medium">{holiday.date.toDateString()}</span>
                <span className="w-3/4 text-sm">{holiday.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
      >
        Apply for Leave
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            >
              <button
                onClick={toggleModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Leave Application</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="to">
                    To:
                  </label>
                  <input
                    type="email"
                    id="to"
                    className="w-full border rounded p-2"
                    placeholder="Principal's email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="cc">
                    CC:
                  </label>
                  <input
                    type="email"
                    id="cc"
                    className="w-full border rounded p-2"
                    placeholder="Department head's email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="bcc">
                    BCC:
                  </label>
                  <input
                    type="email"
                    id="bcc"
                    className="w-full border rounded p-2"
                    placeholder="HR email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="subject">
                    Subject:
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full border rounded p-2"
                    placeholder="Leave Application"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="message">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    className="w-full border rounded p-2"
                    rows={5}
                    placeholder="Your leave application message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none"
                >
                  Send
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaveApplication;
