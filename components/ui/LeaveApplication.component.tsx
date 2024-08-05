"use client";

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Leave {
  date: Date;
  reason: string;
}

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const LeaveApplication: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const totalLeaves = 30;
  const usedLeaves = 10;
  const leaves: Leave[] = [
    { date: new Date(2024, 0, 15), reason: 'Medical leave' },
    { date: new Date(2024, 1, 5), reason: 'Personal leave' },
    // Add more leave records as needed
  ];

  const events = leaves.map((leave) => ({
    title: 'Leave',
    start: leave.date,
    end: leave.date,
  }));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold">Leave Application</h1>
        <div className="ml-4 flex items-center">
          <span className="text-lg font-semibold">{usedLeaves}/{totalLeaves} Leaves Used</span>
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
                className="absolute bg-white shadow-lg p-4 rounded-lg z-10"
                style={{ marginTop: '2rem', marginLeft: '-6rem' }}
              >
                <ul className="text-sm">
                  {leaves.map((leave, index) => (
                    <li key={index}>{format(leave.date, 'MMMM dd, yyyy')}: {leave.reason}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-8">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="border rounded-lg shadow-md"
        />
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
                  <label className="block text-sm font-bold mb-2" htmlFor="to">To:</label>
                  <input
                    type="email"
                    id="to"
                    className="w-full border rounded p-2"
                    placeholder="Principal's email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="cc">CC:</label>
                  <input
                    type="email"
                    id="cc"
                    className="w-full border rounded p-2"
                    placeholder="Department head's email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="bcc">BCC:</label>
                  <input
                    type="email"
                    id="bcc"
                    className="w-full border rounded p-2"
                    placeholder="HR email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="subject">Subject:</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full border rounded p-2"
                    placeholder="Leave Application"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="message">Message:</label>
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
