"use client";

import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

import { FaChevronLeft, FaChevronRight, FaPlus, FaCalendarDay, FaCalendarWeek, FaCalendarAlt } from "react-icons/fa";
import { format, addMonths, subMonths } from "date-fns";

// Define the color palette based on your theme
const COLORS = {
  porcelain: "#f0f1f2",
  darkerPorcelain: "#e1e3e5",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
};

// Placeholder for event data
interface Event {
  id: number;
  title: string;
  date: Date;
}

interface Student {
  name: string;
  rollNo: number;
  marks: number;
}

// Dummy data for multiple classes
const classData: Record<string, Student[]> = {
  ClassA: [
    { name: "John Doe", rollNo: 1, marks: 95 },
    { name: "Jane Smith", rollNo: 2, marks: 78 },
    { name: "Sam Brown", rollNo: 3, marks: 50 },
    { name: "Alice Johnson", rollNo: 4, marks: 35 },
    { name: "Chris White", rollNo: 5, marks: 82 },
  ],
  ClassB: [
    { name: "Tom Hardy", rollNo: 6, marks: 88 },
    { name: "Mia Clark", rollNo: 7, marks: 92 },
    { name: "Eva Adams", rollNo: 8, marks: 60 },
    { name: "Nathan Ford", rollNo: 9, marks: 45 },
    { name: "Lucas Green", rollNo: 10, marks: 70 },
  ],
};

const getScoreDistribution = (students: Student[]) => {
  const ranges = {
    "0-40": 0,
    "41-60": 0,
    "61-80": 0,
    "81-100": 0,
  };

  students.forEach((student) => {
    if (student.marks <= 40) ranges["0-40"]++;
    else if (student.marks <= 60) ranges["41-60"]++;
    else if (student.marks <= 80) ranges["61-80"]++;
    else ranges["81-100"]++;
  });

  return ranges;
};

// Bar chart data processing
const getClassAverageAndMax = (classes: Record<string, Student[]>) => {
  const classNames = Object.keys(classes);
  const avgMarks: number[] = [];
  const maxMarks: number[] = [];

  classNames.forEach((className) => {
    const students = classes[className];
    const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
    const avg = totalMarks / students.length;
    const max = Math.max(...students.map((student) => student.marks));

    avgMarks.push(avg);
    maxMarks.push(max);
  });

  return { classNames, avgMarks, maxMarks };
};

// PieChart component (updated)
const PieChart: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("ClassA");
  const [students, setStudents] = useState<Student[]>(classData[selectedClass]);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedClass(selected);
    setStudents(classData[selected]);
  };

  const scoreDistribution = getScoreDistribution(students);

  const data = {
    labels: ["0-40%", "41-60%", "61-80%", "81-100%"],
    datasets: [
      {
        label: "# of Students",
        data: Object.values(scoreDistribution),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 15,
        hoverBorderWidth: 3,
        hoverBorderColor: "#eb6042",
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">Score Distribution</h2>
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="p-2 border rounded"
        >
          <option value="ClassA">Class A</option>
          <option value="ClassB">Class B</option>
        </select>
      </div>

      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        }}
        className="shadow-lg" // 3D effect with shadow
      />
    </div>
  );
};

// BarChart component
const BarChart: React.FC = () => {
  const { classNames, avgMarks, maxMarks } = getClassAverageAndMax(classData);

  const data = {
    labels: classNames,
    datasets: [
      {
        label: "Average Marks",
        data: avgMarks,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Max Marks",
        data: maxMarks,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full">
      <h2 className="text-xl font-bold mb-4">Class Performance Comparison</h2>
      <Bar
        data={data}
        options={{
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

// Main component
const CombinedCharts: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <PieChart />
      </div>
      <div className="w-1/2">
        <BarChart />
      </div>
    </div>
  );
};

export default CombinedCharts;
