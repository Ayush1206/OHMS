"use client";

import React, { useState } from "react";
import PieChart from "../common/pieChart";
import CombinedCharts from "../common/pieChart";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx"; // For XLSX/CSV
import jsPDF from "jspdf"; // For PDF
import html2canvas from "html2canvas";

// Sample data structure for top scorers and class-wise reports
const topScorers = [
    { name: "John Doe", rollNo: 1, class: "Class A", marks: 95, rank: 1 },
    { name: "Jane Smith", rollNo: 2, class: "Class B", marks: 90, rank: 2 },
    { name: "Alice Brown", rollNo: 3, class: "Class C", marks: 88, rank: 3 },
];

const classReports = {
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





const ClassReport = () => {
    const [activeTab, setActiveTab] = useState("topScorers");
    const [selectedSubject, setSelectedSubject] = useState("Math");
    const [selectedFormat, setSelectedFormat] = useState("xlsx");


    // Function to download CSV/XLSX
    const downloadCSV_XLSX = (format: string) => {
        const table = activeTab === "topScorers" ? topScorers : classReports[activeTab];
        const ws = XLSX.utils.json_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");

        const fileName = `class-report.${format}`;
        const buffer = XLSX.write(wb, { bookType: format, type: "array" });
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

    // Function to download as JPEG
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

    // Function to render table content based on active tab
    const renderTable = () => {
        if (activeTab === "topScorers") {
            return (
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
            );
        } else {
            const classData = classReports[activeTab];
            return (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Roll No</th>
                            <th className="px-4 py-2 border">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classData.map((student: any, index: any) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{student.name}</td>
                                <td className="px-4 py-2 border">{student.rollNo}</td>
                                <td className="px-4 py-2 border">{student.marks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    };

    return (
        <div className="p-6 relative">
            {/* <div className="mb-4">
        <label className="mr-2 text-lg font-semibold">Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
      </div> */}

            <div className="absolute top-0 right-0 flex items-center space-x-2 mt-4 mr-4">
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
                    className="bg-burntSienna text-white px-4 py-2 rounded hover:bg-william"
                >
                    Download Report
                </button>
            </div>

            {/* Tab navigation */}
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setActiveTab("topScorers")}
                    className={`px-4 py-2 ${activeTab === "topScorers" ? "bg-burntSienna text-white" : "bg-william text-white"
                        }`}
                >
                    Top Scorers
                </button>
                <button
                    onClick={() => setActiveTab("Class A")}
                    className={`px-4 py-2 ${activeTab === "Class A" ? "bg-burntSienna text-white" : "bg-william text-white"
                        }`}
                >
                    Class A
                </button>
                <button
                    onClick={() => setActiveTab("Class B")}
                    className={`px-4 py-2 ${activeTab === "Class B" ? "bg-burntSienna text-white" : "bg-william text-white"
                        }`}
                >
                    Class B
                </button>
                <button
                    onClick={() => setActiveTab("Class C")}
                    className={`px-4 py-2 ${activeTab === "Class C" ? "bg-burntSienna text-white" : "bg-william text-white"
                        }`}
                >
                    Class C
                </button>
            </div>

            {/* Table Content */}
            <div>{renderTable()}</div>

            <div className="mt-8">
                <CombinedCharts />
            </div>
        </div>
    );
};

export default ClassReport;
