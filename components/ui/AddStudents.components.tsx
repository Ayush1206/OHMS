import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Addmission } from '..';

interface Student {
  Name: string;
  RollNo: string;
  Class: string;
  Section: string;
  Gender: string;
  Contact: string;
  DOB: string;
  Email: string;
  Mother_tounge: string;
  Adress: string;
  City: string;
  State: string;
  Country: string;
  ZipCode: string;
  Parent_Name: string;
  Parent_Contact: string;
  Parent_Email: string;
}

interface ParentGroup {
  Parent_Name: string;
  Parent_Contact: string;
  Parent_Email: string;
  children: Student[];
}

const AddStudents = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [parentGroups, setParentGroups] = useState<ParentGroup[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      { Name: '', RollNo: '', Class: '', Section: '', Gender: '', Contact: '', DOB: '', Email: '', Mother_tounge: '', Adress: '', City: '', State: '', Country: '', ZipCode: '', Parent_Name: "", Parent_Contact: "", Parent_Email: "" }
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'students_template.xlsx');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: Student[] = XLSX.utils.sheet_to_json(sheet);
        groupByParent(jsonData);
        setShowModal(true); // Show the modal after processing the file
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error reading file:', error);
        setError('Failed to read the file. Please ensure it is a valid Excel file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const groupByParent = (data: Student[]) => {
    const groups: { [key: string]: ParentGroup } = {};

    data.forEach((student) => {
      const parentKey = `${student.Parent_Name}-${student.Parent_Contact}-${student.Parent_Email}`;
      if (!groups[parentKey]) {
        groups[parentKey] = {
          Parent_Name: student.Parent_Name,
          Parent_Contact: student.Parent_Contact,
          Parent_Email: student.Parent_Email,
          children: [],
        };
      }
      groups[parentKey].children.push(student);
    });

    setParentGroups(Object.values(groups));
  };

  const handleConfirmation = () => {
    // Make an API call with the parentGroups data for bulk registration
    console.log('Confirmed Parent Groups:', parentGroups);
    setShowModal(false); // Close the modal after confirmation
    // Add your API call logic here
  };

  const handleEditStudent = (parentIndex: number, childIndex: number, field: keyof Student, value: string) => {
    const updatedGroups = [...parentGroups];
    updatedGroups[parentIndex].children[childIndex] = {
      ...updatedGroups[parentIndex].children[childIndex],
      [field]: value,
    };
    setParentGroups(updatedGroups);
  };

  const handleEditParent = (parentIndex: number, field: keyof ParentGroup, value: string) => {
    const updatedGroups = [...parentGroups];
    updatedGroups[parentIndex] = {
      ...updatedGroups[parentIndex],
      [field]: value,
    };
    setParentGroups(updatedGroups);
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
          <input type="file" className="hidden" id="fileUpload" onChange={handleFileUpload} />
          <label
            htmlFor="fileUpload"
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
          >
            Upload File
          </label>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-4/5 h-4/5 p-6 rounded-lg shadow-lg overflow-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none"
            >
              Close
            </button>
            <h2 className="text-xl font-semibold mb-4">Review Grouped Data:</h2>
            {parentGroups.map((group, parentIndex) => (
              <div key={parentIndex} className="mb-6 border p-4 rounded-lg shadow-lg">
                <h3 className="font-bold mb-2">Parent Information</h3>
                <div className="flex space-x-4 mb-4">
                  <input
                    type="text"
                    value={group.Parent_Name}
                    onChange={(e) => handleEditParent(parentIndex, 'Parent_Name', e.target.value)}
                    className="flex-grow px-2 py-1 border rounded"
                    placeholder="Parent Name"
                  />
                  <input
                    type="text"
                    value={group.Parent_Contact}
                    onChange={(e) => handleEditParent(parentIndex, 'Parent_Contact', e.target.value)}
                    className="flex-grow px-2 py-1 border rounded"
                    placeholder="Parent Contact"
                  />
                  <input
                    type="text"
                    value={group.Parent_Email}
                    onChange={(e) => handleEditParent(parentIndex, 'Parent_Email', e.target.value)}
                    className="flex-grow px-2 py-1 border rounded"
                    placeholder="Parent Email"
                  />
                </div>
                <h4 className="font-semibold mb-2">Children Details</h4>
                <ul className="list-disc list-inside">
                  {group.children.map((child, childIndex) => (
                    <li key={childIndex} className="flex flex-col mb-4">
                      <div className="flex space-x-4 mb-1">
                        <input
                          type="text"
                          value={child.Name}
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'Name', e.target.value)}
                          className="flex-grow px-2 py-1 border rounded"
                          placeholder="Child Name"
                        />
                        <input
                          type="date"
                          value={child.DOB || new Date().toISOString().split('T')[0]} // Default to current date
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'DOB', e.target.value)}
                          className="flex-grow px-2 py-1 border rounded"
                          placeholder="Date of Birth"
                        />
                      </div>
                      <div className="flex space-x-4 mb-1">
                        <input
                          type="text"
                          value={child.RollNo}
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'RollNo', e.target.value)}
                          className="w-1/3 px-2 py-1 border rounded"
                          placeholder="Roll No."
                        />
                        <input
                          type="text"
                          value={child.Class}
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'Class', e.target.value)}
                          className="w-1/3 px-2 py-1 border rounded"
                          placeholder="Class"
                        />
                        <input
                          type="text"
                          value={child.Section}
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'Section', e.target.value)}
                          className="w-1/3 px-2 py-1 border rounded"
                          placeholder="Section"
                        />
                      </div>
                      <div className="flex space-x-4 mb-1">
                        <input
                          type="text"
                          value={child.Adress}
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'Adress', e.target.value)}
                          className="flex-grow px-2 py-1 border rounded"
                          placeholder="Address"
                        />
                      </div>
                      <div className="flex space-x-4 mb-1">
                        <input
                          type="text"
                          value={child.City}
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'City', e.target.value)}
                          className="w-1/3 px-2 py-1 border rounded"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          value={child.Country}
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'Country', e.target.value)}
                          className="w-1/3 px-2 py-1 border rounded"
                          placeholder="Country"
                        />
                        <input
                          type="text"
                          value={child.ZipCode}
                          onChange={(e) => handleEditStudent(parentIndex, childIndex, 'ZipCode', e.target.value)}
                          className="w-1/3 px-2 py-1 border rounded"
                          placeholder="Zipcode"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button
              onClick={handleConfirmation}
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Confirm and Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudents;
