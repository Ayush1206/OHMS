import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend);

// Define the structure for the student fee data
interface Student {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  totalFee: number;
  feesPaid: number;
  feesDue: number;
  dueDate: string;
}

// Define the structure of the API response
interface ApiResponse {
  students: Student[];
}

const FeePieChart: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalDue, setTotalDue] = useState<number>(0);

  // Fetch data from the API and calculate totals
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/students");
        const data = response.data.students;
        setStudents(data);

        // Calculate the totals
        let fees = 0;
        let paid = 0;
        let due = 0;

        data.forEach((student: Student) => {
          fees += student.totalFee;
          paid += student.feesPaid;
          due += student.feesDue;
        });

        setTotalFees(fees);
        setTotalPaid(paid);
        setTotalDue(due);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    };

    fetchStudentData();
  }, []);

  // Data for the pie chart
  const pieData = {
    labels: ["Total Fees", "Total Paid", "Total Due"],
    datasets: [
      {
        data: [totalFees, totalPaid, totalDue],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF5722"], // Colors for the chart
        hoverBackgroundColor: ["#66BB6A", "#42A5F5", "#FF7043"], // Hover colors
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  // Options for the pie chart
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const, // Add 'as const' to ensure TypeScript knows this value won't change
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
    },
    animation: {
      animateScale: true, // Adds scale animation
      animateRotate: true, // Adds rotate animation
    },
  };

  return (
    <div className="w-full h-80">
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
};

export default FeePieChart;
