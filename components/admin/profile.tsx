import React from 'react'
import { FaUsers, FaChalkboardTeacher, FaDollarSign, FaChartLine } from "react-icons/fa";
import SuppliesRequests from '../common/supplyRequestNotification';

const COLORS = {
  porcelain: "#f0f1f2",
  darkerPorcelain: "#e1e3e5",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
  lightRed: "#FF7F7F",
  color1: "#624E88", // Dark Purple
  color2: "#8967B3", // Medium Purple
  color3: "#CB80AB", // Pinkish
  color4: "#4F75FF", // Light Beige
  white: "#ffffff",
};


const StatisticsChartPlaceholder = () => {
  return (
    <div
      className="flex items-center justify-center h-full"
      style={{
        backgroundColor: COLORS.darkerPorcelain,
        borderRadius: "8px",
        minHeight: "300px",
      }}
    >
      <h2 className="text-xl font-semibold" style={{ color: COLORS.william }}>
        Statistics Chart (Placeholder)
      </h2>
    </div>
  );
};




const Profile = () => {
  const stats = [
    { title: "Total Students", value: 500, icon: <FaUsers size={32} />, color: COLORS.color1 },
    { title: "Total Teachers", value: 50, icon: <FaChalkboardTeacher size={32} />, color: COLORS.color2 },
    { title: "Revenue", value: "$500,000", icon: <FaDollarSign size={32} />, color: COLORS.color3 },
    { title: "Total Profit", value: "$100,000", icon: <FaChartLine size={32} />, color: COLORS.color4 },
  ];

  return (
    <div className="flex flex-col px-2 py-6">
      {/* Stats Cards */}
      <div className="flex flex-col sm:flex-row justify-between py-8 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg p-6 w-full sm:w-[300px] md:w-[250px] lg:w-[350px]"
            style={{
              backgroundColor: stat.color,
              color: COLORS.white, // White text for content
            }}
          >
            {/* Title */}
            <h2 className="text-lg font-semibold mb-4 text-center">{stat.title}</h2>

            {/* Icon and Data Side by Side */}
            <div className="flex justify-between items-center">
              <div className="text-4xl">{stat.icon}</div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>


      {/* Below the Cards: Two Sections */}
      <div className="flex flex-wrap justify-between mt-8 gap-4">
        {/* Left Section: Statistics Chart */}
        <div className="w-full md:w-[60%]">
          <StatisticsChartPlaceholder />
        </div>

        {/* Right Section: Supplies Requests */}
        <div className="w-full md:w-[35%]">
          <SuppliesRequests />
        </div>
      </div>
    </div>
  );

}

export default Profile