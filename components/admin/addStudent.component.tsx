"use client";

import React, { useState } from "react";

const COLORS = {
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  porcelain: "#f0f1f2",
  coustomBlue: "#ADD8E6",
};

const AddStudentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    assignedClass: "",
    section: "",
    guardianFirstName: "",
    guardianMiddleName: "",
    guardianLastName: "",
    guardianPhone: "",
    guardianRelation: "",
    guardianEmail: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      dob: "",
      gender: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      assignedClass: "",
      section: "",
      guardianFirstName: "",
      guardianMiddleName: "",
      guardianLastName: "",
      guardianPhone: "",
      guardianRelation: "",
      guardianEmail: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-center mb-6" style={{ color: COLORS.william }}>Add Student</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.william }}>Student Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Middle Name"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-3 border rounded"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="DOB"
              className="p-3 border rounded"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-3 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3 border rounded col-span-2"
            />
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.william }}>Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="p-3 border rounded"
            />
          </div>
        </div>

        {/* Class and Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.william }}>Class & Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="assignedClass"
              value={formData.assignedClass}
              onChange={handleChange}
              className="p-3 border rounded"
            >
              <option value="">Select Class</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              {/* Add more options as needed */}
            </select>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="p-3 border rounded"
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        {/* Guardian Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.william }}>Guardian Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="guardianFirstName"
              value={formData.guardianFirstName}
              onChange={handleChange}
              placeholder="Guardian First Name"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="guardianMiddleName"
              value={formData.guardianMiddleName}
              onChange={handleChange}
              placeholder="Guardian Middle Name"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="guardianLastName"
              value={formData.guardianLastName}
              onChange={handleChange}
              placeholder="Guardian Last Name"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleChange}
              placeholder="Guardian Phone"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="guardianRelation"
              value={formData.guardianRelation}
              onChange={handleChange}
              placeholder="Relation"
              className="p-3 border rounded"
            />
            <input
              type="email"
              name="guardianEmail"
              value={formData.guardianEmail}
              onChange={handleChange}
              placeholder="Guardian Email"
              className="p-3 border rounded"
            />
          </div>
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex space-x-4 justify-end">
          <button
            type="reset"
            onClick={handleReset}
            className="bg-coustomBlue text-white px-6 py-2 rounded hover:bg-gray-500"
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

export default AddStudentForm;
