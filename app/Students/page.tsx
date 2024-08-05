"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Student {
  id: number;
  name: string;
  rollNo: number;
  className: string;
  profileImage: string;
}

const students: Student[] = [
  { id: 1, name: 'John Doe', rollNo: 1, className: 'Class A', profileImage: '/images/student.webp' },
  { id: 2, name: 'Jane Smith', rollNo: 2, className: 'Class A', profileImage: '/images/student.webp' },
  { id: 3, name: 'Sam Brown', rollNo: 3, className: 'Class A', profileImage: '/images/student.webp' },
  // Add more students as needed
];

const StudentsList = () => {
  const router = useRouter();
  const [attendanceMode, setAttendanceMode] = useState(false);
  const [presentStudents, setPresentStudents] = useState<Set<number>>(new Set());

  const handleCardClick = (studentId: number) => {
    if (attendanceMode) {
      setPresentStudents((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(studentId)) {
          newSet.delete(studentId);
        } else {
          newSet.add(studentId);
        }
        return newSet;
      });
    } else {
      router.push(`/Students/${studentId}`);
    }
  };

  const toggleAttendanceMode = () => {
    setAttendanceMode(!attendanceMode);
    if (attendanceMode) {
      setPresentStudents(new Set()); // Reset attendance when toggling off
    }
  };

  const handleSubmitAttendance = () => {
    console.log('Present Students:', Array.from(presentStudents));
    setPresentStudents(new Set()); // Reset attendance after submission
    setAttendanceMode(false); // Optionally toggle off attendance mode after submission
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">{attendanceMode ? 'Add Attendance Mode' : 'Students in Class A'}</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleAttendanceMode}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          {attendanceMode ? 'Cancel Attendance' : 'Add Attendance'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => handleCardClick(student.id)}
            className={`relative p-6 border rounded-lg shadow-lg bg-white flex flex-col items-center justify-center space-y-2 hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
              attendanceMode ? 'transform scale-95' : ''
            }`}
          >
            {attendanceMode && (
              <div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${
                  presentStudents.has(student.id) ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
            <img
              src={student.profileImage}
              alt={`${student.name} Profile`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <p className="text-lg font-semibold">{student.name}</p>
            <p>Roll No: {student.rollNo}</p>
            <p>Class: {student.className}</p>
          </div>
        ))}
      </div>
      {attendanceMode && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmitAttendance}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded focus:outline-none"
          >
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
