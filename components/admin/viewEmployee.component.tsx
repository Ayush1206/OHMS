"use client";

import React, { useState } from "react";

// Placeholder data for employees
const employees = [
  {
    id: "E001",
    name: "John Doe",
    type: "Teacher",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    id: "E002",
    name: "Jane Smith",
    type: "Staff",
    phone: "987-654-3210",
    email: "jane.smith@example.com",
  },
  {
    id: "E003",
    name: "Mike Johnson",
    type: "Teacher",
    phone: "555-666-7777",
    email: "mike.johnson@example.com",
  },
  {
    id: "E004",
    name: "Linda Brown",
    type: "Security",
    phone: "888-999-0000",
    email: "linda.brown@example.com",
  },
  // Add more employee data as needed
];

const ViewEmployee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    let results = employees;

    if (employeeId) {
      results = results.filter((employee) =>
        employee.id.toLowerCase().includes(employeeId.toLowerCase())
      );
    }

    if (employeeType) {
      results = results.filter(
        (employee) =>
          employee.type.toLowerCase() === employeeType.toLowerCase()
      );
    }

    setFilteredEmployees(results);
    setSearchPerformed(true);
  };

  const handleReset = () => {
    setEmployeeId("");
    setEmployeeType("");
    setFilteredEmployees([]);
    setSearchPerformed(false);
  };

  return (
    <div className="p-6">
      {/* Search and Filter Section */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border px-4 py-2 rounded w-1/2"
        />
        <select
          value={employeeType}
          onChange={(e) => setEmployeeType(e.target.value)}
          className="border px-4 py-2 rounded w-1/4"
        >
          <option value="">Filter by Employee Type</option>
          <option value="Teacher">Teacher</option>
          <option value="Staff">Staff</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Security">Security</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-burntSienna text-white px-6 py-2 rounded hover:bg-william"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* Employee Cards Section */}
      {searchPerformed && filteredEmployees.length === 0 && (
        <p>No employees found based on the search criteria.</p>
      )}

      {filteredEmployees.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${employee.name}&background=0D8ABC&color=fff`} // Placeholder image
                alt={employee.name}
                className="h-24 w-24 rounded-full object-cover mb-4"
              />
              <p className="font-bold text-lg">{employee.name}</p>
              <p>Employee ID: {employee.id}</p>
              <p>Type: {employee.type}</p>
              <p>Phone: {employee.phone}</p>
              <p>Email: {employee.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewEmployee;
