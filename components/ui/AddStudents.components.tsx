import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Addmission } from '..';

const AddStudents = () => {
  const [activeTab, setActiveTab] = useState('single');

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      { Name: '', RollNo: '', Class: '', Section: '', Gender: '', Contact: '', DOB: '', Email: '', Mother_tounge: '', Adress: '', City: '', State: '', Country: '', ZipCode: '' }
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'students_template.xlsx');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Add Students</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('single')}
          className={`px-4 py-2 ${activeTab === 'single' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Add Single Student
        </button>
        <button
          onClick={() => setActiveTab('multiple')}
          className={`px-4 py-2 ${activeTab === 'multiple' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Add Multiple Students
        </button>
      </div>

      {activeTab === 'single' ? (
        <Addmission />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={downloadTemplate}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Download Template
          </button>
          <input type="file" className="hidden" id="fileUpload" />
          <label
            htmlFor="fileUpload"
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
          >
            Upload File
          </label>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStudents;
