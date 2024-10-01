import React, { useState } from 'react'
import {
    FaCog,
    FaCalendarAlt,
    FaBell,
    FaUserCircle,
    FaChalkboardTeacher,
    FaRegCalendarCheck,
    FaClipboardCheck,
    FaPen,
    FaBox
} from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";


const COLORS = {
    porcelain: "#f0f1f2",
    darkerPorcelain: "#e1e3e5",
    william: "#3b5b6a",
    burntSienna: "#eb6042",
    porsche: "#e5aa5d",
    softGrey: "#8a9ba8",
};


const TeacherNav = () => {

    const [activeComponent, setActiveComponent] = useState<string>("calendar");
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);



    return (
        <>
            <div
                className="fixed w-[90%] md:w-[85%] top-0 flex justify-between items-center px-6 py-3 z-10"
                style={{ backgroundColor: COLORS.darkerPorcelain }}
            >
                <h1
                    className="text-william text-2xl font-semibold"
                    style={{ color: COLORS.william }}
                >
                    Dashboard
                </h1>
                <div className="hidden md:flex space-x-8 text-softGrey">
                    <button
                        onClick={() => setActiveComponent("calendar")}
                        className="hover:text-burntSienna"
                    >
                        Calendar
                    </button>
                    <button
                        onClick={() => setActiveComponent("notifications")}
                        className="hover:text-burntSienna"
                    >
                        Notifications
                    </button>
                    <button
                        onClick={() => setActiveComponent("settings")}
                        className="hover:text-burntSienna"
                    >
                        Settings
                    </button>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="text-softGrey hover:text-burntSienna"
                    >
                        {showMobileMenu ? "✖" : "☰"}
                    </button>
                </div>
            </div>
            <hr className="border-t-2 border-softGrey fixed w-[90%] md:w-[85%] top-16" />

            {showMobileMenu && (
          <div className="absolute top-16 left-[10%] md:left-[15%] w-[90%] md:w-[85%] bg-white text-softGrey flex flex-col items-center z-20 shadow-lg">
            <button
              onClick={() => setActiveComponent("calendar")}
              className="py-2 hover:text-burntSienna"
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveComponent("notifications")}
              className="py-2 hover:text-burntSienna"
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveComponent("settings")}
              className="py-2 hover:text-burntSienna"
            >
              Settings
            </button>
          </div>
        )}

        </>
    );
};

export default TeacherNav