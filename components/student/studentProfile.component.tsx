"use client";

import React, { useState } from "react";
import { FaUpload, FaEye, FaEdit } from "react-icons/fa";

const StudentProfile = () => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);

  const handleImageHover = () => {
    setIsImageHovered(true);
  };

  const handleImageLeave = () => {
    setIsImageHovered(false);
  };

  const handleViewImage = () => {
    setIsImageViewOpen(true);
  };

  const handleCloseImageView = () => {
    setIsImageViewOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-william mb-6">Student Profile</h2>

      {/* Profile Picture Section */}
      <div className="flex justify-center items-center mb-8">
        <div
          className="relative group"
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageLeave}
        >
          <img
            src="/images/teacherMale.webp"
            alt="Teacher Profile"
            className="w-40 h-40 rounded-full object-cover shadow-md transition-transform duration-300 ease-in-out"
          />

          {isImageHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <button
                onClick={handleViewImage}
                className="text-white mx-2 hover:text-burntSienna transition-colors"
              >
                <FaEye size={20} />
              </button>
              <button className="text-white mx-2 hover:text-burntSienna transition-colors">
                <FaUpload size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image View Modal */}
      {isImageViewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-96">
            <button
              onClick={handleCloseImageView}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <img
              src="/images/teacherMale.webp"
              alt="Enlarged Teacher Profile"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-porcelain p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-william mb-2">Personal Details</h3>
          <p>Name: John Doe</p>
          <p>Roll number: T12345</p>
          <p>Class: 10th A</p>
          <p>Date of Birth: Jan 1, 2005</p>
          <p>Contact: +91 9876543210</p>
          <p>Email: john.doe@example.com</p>
        </div>

        {/* Professional Information */}
        {/* <div className="bg-porcelain p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-william mb-2">Professional Details</h3>
          <p>Date of Joining: Jan 10, 2010</p>
        </div> */}
      </div>

      {/* Additional Sections */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-porcelain p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-william mb-2">Educational Background</h3>
          <p>Qualification: M.Sc. in Physics, B.Ed.</p>
          <p>Certifications: Certified in Advanced Teaching Methods</p>
        </div>

        <div className="bg-porcelain p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-william mb-2">Documents & Certificates</h3>
          <p>Upload documents related to certifications, degrees, etc.</p>
          <button className="mt-2 bg-burntSienna text-white px-4 py-2 rounded hover:bg-porsche transition">
            Upload Document
          </button>
        </div>
      </div> */}

      {/* Achievements and Awards */}
      <div className="bg-porcelain p-4 rounded-lg shadow-sm mt-6">
        <h3 className="text-lg font-bold text-william mb-2">Achievements and Awards</h3>
        <p>Awarded 'Best Hockey Player' in 2019.</p>
        <p>Ranked 1st in Last Year.</p>
      </div>

      {/* Leave and Attendance Records */}
      <div className="bg-porcelain p-4 rounded-lg shadow-sm mt-6">
        <h3 className="text-lg font-bold text-william mb-2">Leave and Attendance Records</h3>
        <p>Total Leaves Available: 15</p>
        <p>Leaves Taken: 5</p>
        <button className="mt-2 bg-burntSienna text-white px-4 py-2 rounded hover:bg-porsche transition">
          View Attendance
        </button>
      </div>

      {/* Contact and Support */}
      <div className="bg-porcelain p-4 rounded-lg shadow-sm mt-6">
        <h3 className="text-lg font-bold text-william mb-2">Contact and Support</h3>
        <p>For any issues, contact school administration or HR.</p>
        <p>Emergency Contact: +91 9876543210</p>
      </div>
    </div>
  );
};

export default StudentProfile;
