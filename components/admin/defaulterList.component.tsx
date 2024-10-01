"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

interface Defaulter {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  profileImage: string;
  totalFee: number;
  feesPaid: number;
  feesDue: number;
  dueDate: string;
}

const DefaulterList: React.FC = () => {
  const [defaulters, setDefaulters] = useState<Defaulter[]>([]);
  const [filteredDefaulters, setFilteredDefaulters] = useState<Defaulter[]>([]);
  const [searchRollNo, setSearchRollNo] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const fetchDefaulters = async () => {
      try {
        const response = await axios.get('/api/defaulters');
        setDefaulters(response.data.defaulters);
        setFilteredDefaulters(response.data.defaulters);
      } catch (error) {
        console.error('Error fetching defaulters:', error);
      }
    };

    fetchDefaulters();
  }, []);

  // Filter by class and roll number
  useEffect(() => {
    let filtered = defaulters;

    // Filter by class
    if (selectedClass !== 'All') {
      filtered = filtered.filter(
        (student) => student.class === selectedClass
      );
    }

    // Search by roll number
    if (searchRollNo !== '') {
      filtered = filtered.filter((student) =>
        student.rollNo.toLowerCase().includes(searchRollNo.toLowerCase())
      );
    }

    setFilteredDefaulters(filtered);
    setSearchPerformed(true);
  }, [searchRollNo, selectedClass, defaulters]);

  return (
    <div className="p-4">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <label className="mr-2">Filter by Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="All">All</option>
            <option value="10">Class 10</option>
            <option value="9">Class 9</option>
            <option value="8">Class 8</option>
            {/* Add more classes as needed */}
          </select>
        </div>
        <div>
          <input
            type="text"
            value={searchRollNo}
            onChange={(e) => setSearchRollNo(e.target.value)}
            placeholder="Search by Roll No"
            className="p-2 border rounded w-full md:w-auto"
          />
        </div>
      </div>

      {/* Defaulter List */}
      {filteredDefaulters.length === 0 && searchPerformed ? (
        <p>No defaulters found based on the filters.</p>
      ) : (
        <div className="space-y-4">
          {filteredDefaulters.map((student) => (
            <div
              key={student.id}
              className="border p-4 rounded-lg shadow-lg flex flex-col sm:flex-row"
            >
              <img
                src={student.profileImage}
                alt={student.name}
                className="h-16 w-16 rounded-full mr-4 mb-4 sm:mb-0"
              />
              <div>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll No:</strong> {student.rollNo}</p>
                <p><strong>Class:</strong> {student.class} - {student.section}</p>
                <p><strong>Fees Due:</strong> ₹{student.feesDue}</p>
                <p><strong>Due Date:</strong> {moment(student.dueDate).format('DD MMM YYYY')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DefaulterList;
