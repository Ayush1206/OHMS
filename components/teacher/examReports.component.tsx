"use client";

import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx"; // For XLSX/CSV
import jsPDF from "jspdf"; // For PDF
import html2canvas from "html2canvas";
import CombinedCharts from "../common/pieChart";

// Types for the top scorers and class reports data
type TopScorer = {
  name: string;
  rollNo: number;
  class: string;
  marks: number;
  rank: number;
};

type ClassReportData = {
  name: string;
  rollNo: number;
  marks: number;
};

// Sample data structure for top scorers and class-wise reports
const topScorers: TopScorer[] = [
  { name: "John Doe", rollNo: 1, class: "Class A", marks: 95, rank: 1 },
  { name: "Jane Smith", rollNo: 2, class: "Class B", marks: 90, rank: 2 },
  { name: "Alice Brown", rollNo: 3, class: "Class C", marks: 88, rank: 3 },
];

const classReports: { [key: string]: ClassReportData[] } = {
  "Class A": [
    { name: "John Doe", rollNo: 1, marks: 95 },
    { name: "Sam Wilson", rollNo: 2, marks: 80 },
  ],
  "Class B": [
    { name: "Jane Smith", rollNo: 1, marks: 90 },
    { name: "Paul Taylor", rollNo: 2, marks: 85 },
  ],
  "Class C": [
    { name: "Alice Brown", rollNo: 1, marks: 88 },
    { name: "Chris White", rollNo: 2, marks: 82 },
  ],
};

const ClassReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("topScorers");
  const [selectedFormat, setSelectedFormat] = useState<string>("xlsx");

  // Function to download CSV/XLSX
  const downloadCSV_XLSX = (format: string) => {
    const table = activeTab === "topScorers" ? topScorers : classReports[activeTab];
    const ws = XLSX.utils.json_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    const fileName = `class-report.${format}`;
    const buffer = XLSX.write(wb, { bookType: format as XLSX.BookType, type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.html(document.body, {
      callback: function (doc) {
        doc.save("class-report.pdf");
      },
      x: 10,
      y: 10,
    });
  };

  const downloadJPEG = () => {
    html2canvas(document.body).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "class-report.jpeg";
      link.click();
    });
  };

  const handleDownload = () => {
    switch (selectedFormat) {
      case "csv":
      case "xlsx":
        downloadCSV_XLSX(selectedFormat);
        break;
      case "pdf":
        downloadPDF();
        break;
      case "jpeg":
        downloadJPEG();
        break;
      default:
        break;
    }
  };

  const renderTable = () => {
    if (activeTab === "topScorers") {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Roll No</th>
                <th className="px-4 py-2 border">Class</th>
                <th className="px-4 py-2 border">Marks</th>
                <th className="px-4 py-2 border">Rank</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((student, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border">{student.rollNo}</td>
                  <td className="px-4 py-2 border">{student.class}</td>
                  <td className="px-4 py-2 border">{student.marks}</td>
                  <td className="px-4 py-2 border">{student.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      const classData = classReports[activeTab];
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Roll No</th>
                <th className="px-4 py-2 border">Marks</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((student, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border">{student.rollNo}</td>
                  <td className="px-4 py-2 border">{student.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="p-6">
      {/* Class Selection and Download Options */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <label className="font-semibold mb-2">Select Report</label>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="border rounded p-2"
          >
            <option value="topScorers">Top Scorers</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <label className="font-semibold">Download as:</label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="border rounded p-2"
          >
            <option value="csv">CSV</option>
            <option value="xlsx">XLSX</option>
            <option value="pdf">PDF</option>
            <option value="jpeg">JPEG</option>
          </select>
          <button
            onClick={handleDownload}
            className="bg-burntSienna text-white px-4 py-2 rounded hover:bg-william w-full sm:w-auto"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div>{renderTable()}</div>

      {/* Combined Charts Component */}
      <div className="mt-8">
        <CombinedCharts />
      </div>
    </div>
  );
};

export default ClassReport;
