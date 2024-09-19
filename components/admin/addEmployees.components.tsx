"use client";

import React, { useState } from "react";

// Color palette (optional customization)
const COLORS = {
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porcelain: "#f0f1f2",
};

const AddEmployee: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    middleName: "",
    lastName: "",
    phoneNo: "",
    gender: "",
    bloodGroup: "",
    email: "",
    employeeType: "",
    addressLine: "",
    city: "",
    country: "",
    pincode: "",
    citizenship: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    console.log("Employee Added:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      middleName: "",
      lastName: "",
      phoneNo: "",
      gender: "",
      bloodGroup: "",
      email: "",
      employeeType: "",
      addressLine: "",
      city: "",
      country: "",
      pincode: "",
      citizenship: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone No</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded focus:outline-none"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address Line</label>
          <input
            type="text"
            name="addressLine"
            value={formData.addressLine}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
          </div>
        </div>

        {/* Citizenship */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Citizenship</label>
          <input
            type="text"
            name="citizenship"
            value={formData.citizenship}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded focus:outline-none"
          />
        </div>

        {/* Employee Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Employee Type</label>
          <select
            name="employeeType"
            value={formData.employeeType}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="Teacher">Teacher</option>
            <option value="Staff">Staff</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Security">Security</option>
          </select>
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="reset"
            onClick={handleReset}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-burntSienna text-white px-6 py-2 rounded hover:bg-william"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
