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

const classes = [
    { name: "Class 1A", isHeadmaster: true },
    { name: "Class 2B", isHeadmaster: false },
    { name: "Class 3C", isHeadmaster: false },
    { name: "Class 4D", isHeadmaster: true },
];


const TeacherSidebar: React.FC<{ onSelect: (component: string) => void }> = ({
    onSelect,
}) => {

    const [activeComponent, setActiveComponent] = useState<string>("calendar");
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClassesClick = () => {
        setIsModalOpen(true);
    };

    const handleClassClick = (classItem: any) => {
        // Example: Navigate to class details page or show class information
        console.log(`Clicked on class: ${classItem.name}`);
        router.push(`/class/${classItem.id}`);
        // You could add navigation logic here (e.g., with React Router or Next.js)
    };

    const handleInventoryClick = () => {
        router.push("/inventory"); // Navigate to the inventory page
    };


    return (
        <div
            className={`h-full fixed top-0 left-0 flex flex-col items-center md:items-start md:pl-6 py-6 md:w-[15%] w-[10%]`}
            style={{ backgroundColor: COLORS.william }}
        >
            <h2 className="text-white text-2xl font-bold mb-8 text-center hidden md:block">
                OHMS
            </h2>
            <ul className="space-y-8 text-white">
                <li>
                    <button
                        onClick={() => onSelect("profile")}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaUserCircle size={24} />
                        <span className="text-lg hidden md:inline">Ayush</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect("calendar")}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaRegCalendarCheck size={24} />
                        <span className="text-lg hidden md:inline">My Calendar</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect("schedule")}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaCalendarAlt size={24} />
                        <span className="text-lg hidden md:inline">My Schedule</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect("addExam")}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaClipboardCheck size={24} />
                        <span className="text-lg hidden md:inline">Create Exam</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect("updateMarks")}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaPen size={24} />
                        <span className="text-lg hidden md:inline">Update Marks</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleClassesClick()}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaChalkboardTeacher size={24} />
                        <span className="text-lg hidden md:inline">Classes</span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect("examReport")}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaBell size={24} />
                        <span className="text-lg hidden md:inline">Exam Report</span>
                    </button>
                </li>

                <li>
                    <button
                        onClick={handleInventoryClick}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaBox size={24} />
                        <span className="text-lg hidden md:inline">College Inventory</span>
                    </button>
                </li>

                <li>
                    <button
                        onClick={() => onSelect("leave")}
                        className="flex items-center justify-center md:justify-start space-x-4 hover:text-burntSienna"
                    >
                        <FaBell size={24} />
                        <span className="text-lg hidden md:inline">Leave Application</span>
                    </button>
                </li>

            </ul>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={() => setIsModalOpen(false)} // Close modal
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-center mb-6">Your Classes</h2>
                        <ul className="space-y-4">
                            {classes.map((classItem, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
                                >
                                    {/* Make the class name clickable */}
                                    <span
                                        onClick={() => handleClassClick(classItem)}  // Trigger class click handler
                                        className="text-lg text-blue-500 cursor-pointer hover:underline"
                                    >
                                        {classItem.name}
                                    </span>

                                    {classItem.isHeadmaster && (
                                        <span className="text-sm text-green-600 flex items-center space-x-2">
                                            <FaCheckCircle className="text-green-500" />
                                            <span>Class teacher</span>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            )}

        </div>
    );
};

export default TeacherSidebar