import React, { useState } from 'react'

const COLORS = {
    porcelain: "#f0f1f2",
    darkerPorcelain: "#e1e3e5",
    william: "#3b5b6a",
    burntSienna: "#eb6042",
    porsche: "#e5aa5d",
    softGrey: "#8a9ba8",
  };

const NavBar = () => {
    const [activeComponent, setActiveComponent] = useState<string>("profile");
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    return (
        <><div
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
            <hr className="border-t-2 border-softGrey fixed w-[90%] md:w-[85%] top-16" /></>


    )
}

export default NavBar