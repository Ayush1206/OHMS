"use client";

import React, { useState } from "react";

// Define color palette
const COLORS = {
  porcelain: "#f0f1f2",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
};

// Available classes list (this would ideally come from a backend or database)
const availableClasses = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
];

const CreateExam = () => {
  const [examName, setExamName] = useState("");
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [maxMarks, setMaxMarks] = useState("");
  const [passingMarks, setPassingMarks] = useState("");
  const [invigilatorName, setInvigilatorName] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviewMode(true);
  };

  // Reset the form after submission
  const handleReset = () => {
    setPreviewMode(false);
    setExamName("");
    setSubject("");
    setExamDate("");
    setStartTime("");
    setEndTime("");
    setSelectedClasses([]);
    setSelectAll(false);
    setMaxMarks("");
    setPassingMarks("");
    setInvigilatorName("");
  };

  // Handle class selection
  const handleClassSelection = (className: string) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter((cls) => cls !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  // Handle "Select All" toggle
  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedClasses(availableClasses);
    } else {
      setSelectedClasses([]);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="p-6" style={{ backgroundColor: COLORS.porcelain }}>
      <h1 className="text-2xl font-bold" style={{ color: COLORS.william }}>
        Create Exam
      </h1>

      {!previewMode ? (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Exam Name */}
          <div>
            <label className="block text-william text-sm font-semibold">Exam Name</label>
            <input
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="Enter Exam Name"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-william text-sm font-semibold">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md"
              required
            >
              <option value="">Select Subject</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
            </select>
          </div>

          {/* Class/Grade - Multi-selection with "Select All" */}
          <div>
            <label className="block text-william text-sm font-semibold">Class/Grade</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <span className="text-sm">Select All Classes</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {availableClasses.map((className, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedClasses.includes(className)}
                    onChange={() => handleClassSelection(className)}
                    className="mr-2"
                  />
                  <span>{className}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Date */}
          <div>
            <label className="block text-william text-sm font-semibold">Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          {/* Time */}
          <div className="flex space-x-4">
            <div>
              <label className="block text-william text-sm font-semibold">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-william text-sm font-semibold">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Maximum and Passing Marks */}
          <div className="flex space-x-4">
            <div>
              <label className="block text-william text-sm font-semibold">Maximum Marks</label>
              <input
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="Enter Max Marks"
                required
              />
            </div>
            <div>
              <label className="block text-william text-sm font-semibold">Passing Marks</label>
              <input
                type="number"
                value={passingMarks}
                onChange={(e) => setPassingMarks(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="Enter Passing Marks"
                required
              />
            </div>
          </div>

          {/* Invigilator Name */}
          <div>
            <label className="block text-william text-sm font-semibold">Invigilator Name (Optional)</label>
            <input
              type="text"
              value={invigilatorName}
              onChange={(e) => setInvigilatorName(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="Enter Invigilator Name"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-burntSienna text-white px-4 py-2 mt-4 rounded-md hover:bg-william"
          >
            Preview Exam
          </button>
        </form>
      ) : (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">Preview Exam Details</h2>
          <p><strong>Exam Name:</strong> {examName}</p>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Classes:</strong> {selectedClasses.join(", ")}</p>
          <p><strong>Exam Date:</strong> {examDate}</p>
          <p><strong>Start Time:</strong> {startTime}</p>
          <p><strong>End Time:</strong> {endTime}</p>
          <p><strong>Maximum Marks:</strong> {maxMarks}</p>
          <p><strong>Passing Marks:</strong> {passingMarks}</p>
          <p><strong>Invigilator Name:</strong> {invigilatorName}</p>

          {/* Reset and Submit Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleReset}
              className="bg-porsche text-white px-4 py-2 rounded-md hover:bg-william"
            >
              Reset
            </button>
            <button
              onClick={() => alert("Exam created successfully!")}
              className="bg-burntSienna text-white px-4 py-2 rounded-md hover:bg-william"
            >
              Submit Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
