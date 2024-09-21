"use client";

import React, { useState } from "react";
import axios from "axios";

interface Section {
  sectionName: string;
  strength: number;
  classTeacher?: string;
  roomNumber?: string;
  tuitionFee: number;
  transportationFee: number;
  extracurricularFee: number;
  labFee: number;
}


interface ClassData {
  className: string;
  sections: Section[];
}

const AddClass: React.FC = () => {
  const [className, setClassName] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([
    { sectionName: "", strength: 0, tuitionFee: 0, transportationFee: 0, extracurricularFee: 0, labFee: 0 },
  ]);


  // Handle adding a new section
  const addSection = () => {
    setSections([...sections, { sectionName: "", strength: 0, tuitionFee: 0, transportationFee: 0, extracurricularFee: 0, labFee: 0 }]);
  };

  // Handle changing section values
  const handleSectionChange = (index: number, field: string, value: string | number) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Class data
    const classData = {
      className,
      sections: sections.map(({ tuitionFee, transportationFee, extracurricularFee, labFee, ...rest }) => ({
        ...rest,
        tuitionFee,
        transportationFee,
        extracurricularFee,
        labFee,
      })),
    };

    console.log("logging class data:", classData);

    try {
      // Axios POST request to send class data to the API
      const response = await axios.post("/api/classes", classData);
      if (response.status === 200) {
        alert("Class and sections successfully saved!");
      }
    } catch (error) {
      console.error("Error saving class data:", error);
      alert("An error occurred while saving.");
    }
  };



  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Class Name:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full border rounded p-2 mt-2"
            required
          />
        </div>

        {sections.map((section, index) => (
          <div key={index} className="mb-6 border p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Section {index + 1}</h3>
            <div className="mb-2">
              <label className="block">Section Name:</label>
              <input
                type="text"
                value={section.sectionName}
                onChange={(e) =>
                  handleSectionChange(index, "sectionName", e.target.value)
                }
                className="w-full border rounded p-2 mt-2"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block">Strength:</label>
              <input
                type="number"
                value={section.strength}
                onChange={(e) =>
                  handleSectionChange(index, "strength", parseInt(e.target.value, 10))
                }
                className="w-full border rounded p-2 mt-2"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block">Class Teacher (Optional):</label>
              <input
                type="text"
                value={section.classTeacher || ""}
                onChange={(e) =>
                  handleSectionChange(index, "classTeacher", e.target.value)
                }
                className="w-full border rounded p-2 mt-2"
              />
            </div>

            <div className="mb-2">
              <label className="block">Room Number (Optional):</label>
              <input
                type="text"
                value={section.roomNumber || ""}
                onChange={(e) =>
                  handleSectionChange(index, "roomNumber", e.target.value)
                }
                className="w-full border rounded p-2 mt-2"
              />
            </div>

            <div className="mb-2">
              <label className="block">Tuition Fee:</label>
              <input
                type="number"
                value={section.tuitionFee}
                onChange={(e) =>
                  handleSectionChange(index, "tuitionFee", parseInt(e.target.value, 10))
                }
                className="w-full border rounded p-2 mt-2"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block">Transportation Fee:</label>
              <input
                type="number"
                value={section.transportationFee}
                onChange={(e) =>
                  handleSectionChange(index, "transportationFee", parseInt(e.target.value, 10))
                }
                className="w-full border rounded p-2 mt-2"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block">Extracurricular Fee:</label>
              <input
                type="number"
                value={section.extracurricularFee}
                onChange={(e) =>
                  handleSectionChange(index, "extracurricularFee", parseInt(e.target.value, 10))
                }
                className="w-full border rounded p-2 mt-2"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block">Lab Fee:</label>
              <input
                type="number"
                value={section.labFee}
                onChange={(e) =>
                  handleSectionChange(index, "labFee", parseInt(e.target.value, 10))
                }
                className="w-full border rounded p-2 mt-2"
                required
              />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold">
                Total Fee Per Student: ₹
                {section.tuitionFee + section.transportationFee + section.extracurricularFee + section.labFee}
              </h3>
            </div>


          </div>
        ))}

        <div className="mb-6">
          <button
            type="button"
            onClick={addSection}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Another Section
          </button>
        </div>

        <div className="flex space-x-4">
          <button
            type="reset"
            onClick={() => {
              setClassName("");
              setSections([{ sectionName: "", strength: 0, tuitionFee: 0, transportationFee: 0, extracurricularFee: 0, labFee: 0 }]);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
