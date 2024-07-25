import React, { useState } from 'react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('viewGrades');
  const [activeExamTab, setActiveExamTab] = useState('weekly1');

  const exams = [
    { name: 'Weekly 1', key: 'weekly1' },
    { name: 'Weekly 2', key: 'weekly2' },
    { name: 'Quarterly', key: 'quarterly' },
    { name: 'Weekly 4', key: 'weekly4' },
    { name: 'Weekly 5', key: 'weekly5' },
    { name: 'Half Yearly', key: 'halfYearly' },
  ];

  const gradesData = {
    weekly1: [
      { subject: 'English', grade: '60/100' },
      { subject: 'Maths', grade: '45/100' },
      { subject: 'Science', grade: '75/100' },
    ],
    weekly2: [
      { subject: 'English', grade: '65/100' },
      { subject: 'Maths', grade: '55/100' },
      { subject: 'Science', grade: '70/100' },
    ],
    quarterly: [
      { subject: 'English', grade: '70/100' },
      { subject: 'Maths', grade: '60/100' },
      { subject: 'Science', grade: '80/100' },
    ],
    weekly4: [
      { subject: 'English', grade: '75/100' },
      { subject: 'Maths', grade: '50/100' },
      { subject: 'Science', grade: '85/100' },
    ],
    weekly5: [
      { subject: 'English', grade: '80/100' },
      { subject: 'Maths', grade: '65/100' },
      { subject: 'Science', grade: '90/100' },
    ],
    halfYearly: [
      { subject: 'English', grade: '85/100' },
      { subject: 'Maths', grade: '70/100' },
      { subject: 'Science', grade: '95/100' },
    ],
  };

  const notesData = [
    {
      subject: 'English',
      teacher: 'Prakash Chubey',
      notes: [
        { name: 'Note 1', link: '/notes/english_note1.pdf' },
        { name: 'Note 2', link: '/notes/english_note2.pdf' },
        { name: 'Note 3', link: '/notes/english_note3.pdf' },
      ],
    },
    {
      subject: 'Maths',
      teacher: 'Ravi Kumar',
      notes: [
        { name: 'Note 1', link: '/notes/maths_note1.pdf' },
        { name: 'Note 2', link: '/notes/maths_note2.pdf' },
        { name: 'Note 3', link: '/notes/maths_note3.pdf' },
      ],
    },
  ];

  const attendanceData = [
    { month: 'January', attendance: '90%' },
    { month: 'February', attendance: '85%' },
    { month: 'March', attendance: '88%' },
    // Add more months as needed
  ];


  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Student Dashboard</h1>
      <div className="flex mb-8">
        {/* Left Section */}
        <div className="w-1/3 flex flex-col items-center">
          <img src="/images/dummy.webp" alt="Profile" className="h-32 w-32 rounded-full object-cover mb-4" />
          <div>
            <p className="text-lg"><strong>Name:</strong> John Doe</p>
            <p className="text-lg"><strong>Class:</strong> 10th</p>
            <p className="text-lg"><strong>Age:</strong> 15</p>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Attendance</h2>
            <p className="text-lg"><strong>Total Attendance:</strong> 87%</p>
          </div>
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="px-4 py-2 border text-left">Month</th>
                <th className="px-4 py-2 border text-left">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((data, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="px-4 py-2 border-t">{data.month}</td>
                  <td className="px-4 py-2 border-t">{data.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <hr className="my-4 border-t-2 border-gray-200" />
      <div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab('viewGrades')}
            className={`px-4 py-2 mx-2 ${activeTab === 'viewGrades' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
          >
            View Grades
          </button>
          <button
            onClick={() => setActiveTab('viewNotes')}
            className={`px-4 py-2 mx-2 ${activeTab === 'viewNotes' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
          >
            View Notes
          </button>
        </div>
        {activeTab === 'viewGrades' ? (
          <>
            <div className="flex justify-center mb-4">
              {exams.map((exam) => (
                <button
                  key={exam.key}
                  onClick={() => setActiveExamTab(exam.key)}
                  className={`px-4 py-2 mx-2 ${activeExamTab === exam.key ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  {exam.name}
                </button>
              ))}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 border text-left">Subject</th>
                    <th className="px-4 py-2 border text-left">Grade</th>
                    <th className="px-4 py-2 border text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gradesData[activeExamTab].map((grade, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="px-4 py-2 border-t">{grade.subject}</td>
                      <td className="px-4 py-2 border-t">{grade.grade}</td>
                      <td className="px-4 py-2 border-t">
                        <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded">
                          View Answer Sheet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-4 py-2 border text-left">Subject Name</th>
                  <th className="px-4 py-2 border text-left">Teacher Associated</th>
                  <th className="px-4 py-2 border text-left">Notes Provided</th>
                </tr>
              </thead>
              <tbody>
                {notesData.map((note, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="px-4 py-2 border-t">{note.subject}</td>
                    <td className="px-4 py-2 border-t">{note.teacher}</td>
                    <td className="px-4 py-2 border-t space-x-2">
                      {note.notes.map((n, idx) => (
                        <a key={idx} href={n.link} download className="text-blue-500 underline">
                          {n.name}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
