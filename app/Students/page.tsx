import React from 'react';
import { motion } from 'framer-motion';

const students = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `Student ${index + 1}`,
  rollNo: 1001 + index,
  isMonitor: index === 0 // Assuming the first student is the class monitor
}));

export default function Sudents() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-5 gap-4">
        {students.map((student) => (
          <motion.div
            key={student.id}
            whileHover={{ scale: 1.05 }}
            className={`p-4 border rounded-lg shadow-lg bg-white flex flex-col items-center justify-center space-y-2 ${student.isMonitor ? "border-2 border-blue-500" : "border-gray-200"}`}>
            <img src="/images/student-placeholder.png" alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            <p className="text-lg font-semibold">{student.name}</p>
            <p>Roll No: {student.rollNo}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

