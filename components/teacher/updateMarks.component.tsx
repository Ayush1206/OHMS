"use client";
import React, { useState } from "react";

// Define the type for student data
interface Student {
  id: number;
  name: string;
  rollNo: number;
}

const studentsData: Student[] = [
  { id: 1, name: "John Doe", rollNo: 101 },
  { id: 2, name: "Jane Smith", rollNo: 102 },
  { id: 3, name: "Sam Brown", rollNo: 103 },
  // Add more students here
];

const UpdateMarks: React.FC = () => {
  // Define state types
  const [marks, setMarks] = useState<Record<number, number>>({});
  const [answerSheets, setAnswerSheets] = useState<Record<number, File | null>>({});

  // Function to handle marks input
  const handleMarksChange = (studentId: number, value: string) => {
    const marksValue = Number(value);
    if (!isNaN(marksValue)) {
      setMarks((prevMarks) => ({
        ...prevMarks,
        [studentId]: marksValue,
      }));
    }
  };

  // Function to handle file upload
  const handleFileUpload = (studentId: number, file: File | null) => {
    setAnswerSheets((prevSheets) => ({
      ...prevSheets,
      [studentId]: file,
    }));
  };

  // Function to handle submit all
  const handleSubmitAll = () => {
    console.log("Marks Submitted:", marks);
    console.log("Answer Sheets Uploaded:", answerSheets);
    alert("All data submitted successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Update Marks</h2>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border p-4 text-left">Name</th>
            <th className="border p-4 text-left">Roll No</th>
            <th className="border p-4 text-left">Upload Answer Sheet</th>
            <th className="border p-4 text-left">Add Marks</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student.id}>
              <td className="border p-4">{student.name}</td>
              <td className="border p-4">{student.rollNo}</td>
              <td className="border p-4">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    handleFileUpload(student.id, file);
                  }}
                />
              </td>
              <td className="border p-4">
                <input
                  type="number"
                  value={marks[student.id] !== undefined ? marks[student.id] : ""}
                  onChange={(e) => handleMarksChange(student.id, e.target.value)}
                  placeholder="Enter marks"
                  className="border rounded p-2 w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-right">
        <button
          onClick={handleSubmitAll}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit All
        </button>
      </div>
    </div>
  );
};

export default UpdateMarks;
