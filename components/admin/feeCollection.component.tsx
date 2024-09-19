"use client";

import React, { useState } from "react";
import axios from "axios";

// Define the StudentData interface
interface StudentData {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  profileImage: string;
  totalFee: number;
  feesPaid: number;
  feesDue: number;
}

const FeeCollection = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [studentData, setStudentData] = useState<StudentData | null>(null); // Set the type to StudentData or null
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  
  // Search function to fetch student data from JSON
  const handleSearch = async () => {
    const response = await axios.get('/api/students');
    const students = response.data.students;
    
    const student = students.find((student: StudentData) => student.rollNo === searchValue);
    if (student) {
      setStudentData(student);
    } else {
      alert('Student not found');
      setStudentData(null); // Reset if no student is found
    }
  };
  
  // Submit function to update student fees
  const handleSubmit = async () => {
    if (studentData) {
      const updatedFeesPaid = parseFloat(studentData.feesPaid.toString()) + parseFloat(paymentAmount);
      const updatedFeesDue = studentData.totalFee - updatedFeesPaid;

      const updatedStudent = {
        id: studentData.id,
        feesPaid: updatedFeesPaid,
        feesDue: updatedFeesDue,
      };
      
      await axios.post('/api/updateFee', updatedStudent);
      alert('Fees updated successfully');
      setStudentData(null); // Reset the form
      setPaymentAmount(''); // Reset the payment input
    }
  };
  
  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-4">
        <label className="mr-2 text-lg font-semibold">Search by Roll/Register No:</label>
        <input 
          type="text" 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)} 
          className="p-2 border rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">Search</button>
      </div>

      {studentData && (
        <div className="border p-4 rounded-lg shadow-lg bg-white">
          <div className="flex items-center mb-4">
            <img src={studentData?.profileImage} alt="Profile" className="h-16 w-16 rounded-full mr-4"/>
            <div>
              <p><strong>Name:</strong> {studentData?.name}</p>
              <p><strong>Roll No:</strong> {studentData?.rollNo}</p>
              <p><strong>Class:</strong> {studentData?.class} - {studentData?.section}</p>
            </div>
          </div>
          <p><strong>Total Fees:</strong> ₹{studentData?.totalFee}</p>
          <p><strong>Fees Paid:</strong> ₹{studentData?.feesPaid}</p>
          <p><strong>Fees Due:</strong> ₹{studentData?.feesDue}</p>

          {/* Fee Payment Input */}
          <div className="mt-4">
            <label className="mr-2 text-lg font-semibold">Enter Payment Amount:</label>
            <input 
              type="number" 
              value={paymentAmount} 
              onChange={(e) => setPaymentAmount(e.target.value)} 
              className="p-2 border rounded"
            />
          </div>

          <button 
            onClick={handleSubmit} 
            className="bg-green-500 text-white p-2 mt-4 rounded"
          >
            Submit Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default FeeCollection;
