"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Student {
  id: number;
  name: string;
  rollNo: number;
  profilePic: string;
  isMonitor?: boolean;
}

const studentsData: Student[] = [
  { id: 1, name: 'John Doe', rollNo: 1, profilePic: '/images/dummy.webp', isMonitor: true },
  { id: 2, name: 'Chpad Chuniyan', rollNo: 2, profilePic: '/images/dummy.webp' },
  { id: 3, name: 'Jane Joe', rollNo: 3, profilePic: '/images/dummy.webp' },
  { id: 4, name: 'Illuminati', rollNo: 4, profilePic: '/images/dummy.webp' },
  { id: 5, name: 'Carriminati', rollNo: 5, profilePic: '/images/dummy.webp' },
  // Add more students
];

const ClassPage = () => {
  const [isAttendanceMode, setAttendanceMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const router = useRouter();

  const toggleAttendanceMode = () => {
    setAttendanceMode(!isAttendanceMode);
    setSelectedStudents([]); // Reset selection when toggling
  };

  const handleSelectStudent = (studentId: number) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleSubmitAttendance = () => {
    console.log('Selected Student IDs:', selectedStudents);
    setAttendanceMode(!isAttendanceMode);
    // Handle the submission logic (e.g., API call)
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Class Students</h1>
        <button
          onClick={toggleAttendanceMode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isAttendanceMode ? 'Cancel Attendance' : 'Add Attendance'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {studentsData.map((student) => (
          <div
            key={student.id}
            className={`p-4 rounded-lg shadow-md relative ${
              student.isMonitor ? 'border-2 border-yellow-500' : 'border'
            }`}
          >
            <img
              src={student.profilePic}
              alt={student.name}
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
            <div className="text-center mt-2">
              <h2 className="text-lg font-semibold">{student.name}</h2>
              <p>Roll No: {student.rollNo}</p>
              {student.isMonitor && (
                <p className="text-sm text-yellow-500 font-semibold">Class Monitor</p>
              )}
            </div>

            {isAttendanceMode && (
              <div
                onClick={() => handleSelectStudent(student.id)}
                className={`absolute top-2 right-2 w-6 h-6 border-2 rounded-full cursor-pointer flex items-center justify-center ${
                  selectedStudents.includes(student.id) ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {selectedStudents.includes(student.id) ? '✓' : ''}
              </div>
            )}
          </div>
        ))}
      </div>

      {isAttendanceMode && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmitAttendance}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassPage;
