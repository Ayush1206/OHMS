"use client";

import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { format, addMonths, subMonths } from "date-fns";
import { FaPlus, FaCheckCircle } from "react-icons/fa";

const COLORS = {
  porcelain: "#f0f1f2",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
};

// Sample Leave Data for Calendar (Right Side)
const leaveData = [
  { date: "2024-01-15", type: "Medical", status: "approved", day: "Monday" },
  { date: "2024-02-20", type: "Casual", status: "pending", day: "Tuesday" },
  { date: "2024-03-10", type: "Paid", status: "rejected", day: "Thursday" },
];

const holidayData = [
  { date: "2024-01-26", name: "Republic Day", day: "Friday" },
  { date: "2024-08-15", name: "Independence Day", day: "Thursday" },
  { date: "2024-10-02", name: "Gandhi Jayanti", day: "Wednesday" },
];

// Sample Leave Balances
const totalLeaves = 30;
const usedLeaves = 10;
const remainingLeaves = totalLeaves - usedLeaves;

const LeaveApplication = () => {
  const [leaveType, setLeaveType] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [leaveReason, setLeaveReason] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      leaveType,
      dateRange,
      leaveReason,
      file,
    });
  };

  const colorByStatus = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-200";
      case "pending":
        return "bg-yellow-200";
      case "rejected":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-8"
      style={{ backgroundColor: COLORS.porcelain }}
    >
      {/* Left Side - Leave Application */}
      <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Leave Type</option>
              <option value="Medical">Medical</option>
              <option value="Casual">Casual</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Date Range</label>
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full lg:w-1/2 border p-2 rounded"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full lg:w-1/2 border p-2 rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Reason</label>
            <textarea
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Leave reason..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Supporting Documents</label>
            <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />
          </div>
          <button type="submit" className="bg-burntSienna text-white px-4 py-2 rounded w-full lg:w-auto">
            Submit
          </button>
        </form>
      </div>

      {/* Right Side - Leave and Holiday Calendar */}
      <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Leave Calendar</h2>
        <div className="mb-4">
          <p>
            Total Leaves: {totalLeaves} | Used: {usedLeaves} | Remaining: {remainingLeaves}
          </p>
        </div>
        <div className="border rounded-lg shadow p-4 overflow-x-auto" style={{ backgroundColor: COLORS.porcelain }}>
          <h3 className="font-semibold mb-2">Leave Records</h3>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Leave Type</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Day</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((leave, index) => (
                <tr key={index} className={`${colorByStatus(leave.status)} border`}>
                  <td className="px-4 py-2">{leave.date}</td>
                  <td className="px-4 py-2">{leave.type}</td>
                  <td className="px-4 py-2">{leave.status}</td>
                  <td className="px-4 py-2">{leave.day}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Holiday Calendar Section */}
        <div className="mt-6 border rounded-lg shadow p-4 overflow-x-auto" style={{ backgroundColor: COLORS.porcelain }}>
          <h3 className="font-semibold mb-2">Holiday Calendar</h3>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Holiday Name</th>
                <th className="px-4 py-2 border">Day</th>
              </tr>
            </thead>
            <tbody>
              {holidayData.map((holiday, index) => (
                <tr key={index} className="border">
                  <td className="px-4 py-2">{holiday.date}</td>
                  <td className="px-4 py-2">{holiday.name}</td>
                  <td className="px-4 py-2">{holiday.day}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
