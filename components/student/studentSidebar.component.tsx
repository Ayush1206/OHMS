"use client";

import React, { useState } from "react";
import {
  FaUserCircle,

  FaTimes,
  FaBars
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const COLORS = {
  porcelain: "#f0f1f2",
  darkerPorcelain: "#e1e3e5",
  william: "#3b5b6a",
  burntSienna: "#eb6042",
  porsche: "#e5aa5d",
  softGrey: "#8a9ba8",
};

const StudentSidebar: React.FC<{ onSelect: (component: string) => void }> = ({
  onSelect,
}) => {


  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };


  const handleInventoryClick = () => {
    router.push("/inventory"); // Navigate to the inventory page
  };



  // Similar toggle functions for other sections

  return (
    <div
      className={`h-full fixed top-0 left-0 py-2 ${isExpanded ? "w-[100%] md:w-[15%]" : "w-[8%] md:w-[5%]"
        } flex flex-col items-center z-50 transition-width duration-300`}
      style={{ backgroundColor: COLORS.william }}
    >
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl absolute top-4 left-4"
      >
        {isExpanded ? <FaTimes /> : <FaBars />}
      </button>

      <ul className="space-y-8 mt-16 text-white w-full text-center">
        <li>
          <button
            onClick={() => onSelect("profile")}
            className="flex items-center justify-center pl-4 md:justify-start space-x-4 hover:text-[${COLORS.burntSienna}]"
          >
            <FaUserCircle size={24} className="min-w-[24px]" />
            {isExpanded && <span className="text-lg md:inline">Profile</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;

