"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Section {
  sectionName: string;
  strength: number;
  classTeacher?: string;
  roomNumber?: string;
}

interface ClassData {
  className: string;
  sections: Section[];
}

const ViewClasses: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch classes data on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("/api/classes");
        setClasses(response.data.classes);
        setFilteredClasses(response.data.classes);
      } catch (error) {
        console.error("Error fetching classes data:", error);
      }
    };

    fetchClasses();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = classes.filter((classItem) =>
      classItem.className.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClasses(filtered);
  }, [searchTerm, classes]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">View Classes</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search class by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 w-full border border-gray-300 rounded-lg"
        />
      </div>

      {/* Classes Listing */}
      {filteredClasses.length > 0 ? (
        <div className="space-y-10">
          {filteredClasses.map((classItem, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4">{classItem.className}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classItem.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-lg font-semibold">Section: {section.sectionName}</h4>
                      <p>
                        <strong>Class Teacher:</strong> {section.classTeacher || "N/A"}
                      </p>
                      <p>
                        <strong>Strength:</strong> {section.strength}
                      </p>
                      <p>
                        <strong>Room Number:</strong> {section.roomNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No classes found based on the filters.</p>
      )}
    </div>
  );
};

export default ViewClasses;
