"use client";

import React, { useState, useEffect } from "react";

interface Student {
    id: number;
    name: string;
    rollNo: number;
    className: string;
    section: string;
    profileImage: string;
}

const studentsData: Student[] = [
    // Mock data of 50 students for demo purposes
    { id: 1, name: "John Doe", rollNo: 101, className: "Class A", section: "Section 1", profileImage: "/images/dummy.webp" },
    { id: 2, name: "Jane Smith", rollNo: 102, className: "Class A", section: "Section 1", profileImage: "/images/dummy.webp" },
    { id: 3, name: "Alice Brown", rollNo: 103, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 4, name: "Alice Brown", rollNo: 104, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 5, name: "Alice Brown", rollNo: 105, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 6, name: "Alice Brown", rollNo: 106, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 7, name: "Alice Brown", rollNo: 107, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 8, name: "Alice Brown", rollNo: 108, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 9, name: "Alice Brown", rollNo: 109, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 10, name: "Alice Brown", rollNo: 100, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 11, name: "Alice Brown", rollNo: 111, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 12, name: "Alice Brown", rollNo: 112, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 13, name: "Alice Brown", rollNo: 113, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 14, name: "Alice Brown", rollNo: 114, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 15, name: "Alice Brown", rollNo: 115, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 16, name: "Alice Brown", rollNo: 116, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 17, name: "Alice Brown", rollNo: 117, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 18, name: "Alice Brown", rollNo: 118, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 19, name: "Alice Brown", rollNo: 119, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 20, name: "Alice Brown", rollNo: 120, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 21, name: "Alice Brown", rollNo: 121, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 22, name: "Alice Brown", rollNo: 122, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 23, name: "Alice Brown", rollNo: 123, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 24, name: "Alice Brown", rollNo: 124, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 25, name: "Alice Brown", rollNo: 125, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 26, name: "Alice Brown", rollNo: 126, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 27, name: "Alice Brown", rollNo: 127, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 28, name: "Alice Brown", rollNo: 128, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 29, name: "Alice Brown", rollNo: 129, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 30, name: "Alice Brown", rollNo: 130, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 31, name: "Alice Brown", rollNo: 131, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    { id: 32, name: "Alice Brown", rollNo: 132, className: "Class A", section: "Section 2", profileImage: "/images/dummy.webp" },
    // Add more dummy students for the sake of demonstration
];

const ViewStudents: React.FC = () => {
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false); // NEW STATE
    const [searchRollNo, setSearchRollNo] = useState<string>("");
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [selectedSection, setSelectedSection] = useState<string>("");

    // Infinite Scroll States
    const [visibleStudents, setVisibleStudents] = useState<Student[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const studentsPerPage = 10;

    // Load more students on scroll
    const loadMoreStudents = () => {
        const newPage = page + 1;
        const newStudents = filteredStudents.slice(0, newPage * studentsPerPage);
        setVisibleStudents(newStudents);
        setPage(newPage);
        if (newStudents.length >= filteredStudents.length) {
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (filteredStudents.length > 0) {
            loadMoreStudents(); // Load initial set of students
        }
    }, [filteredStudents]);

    // Infinite scrolling effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                if (hasMore && filteredStudents.length > 0) {
                    loadMoreStudents();
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, page]);

    // Handle Search
    const handleSearch = () => {
        setSearchPerformed(true);
        let result = studentsData;


        if (searchRollNo) {
            result = result.filter((student) => student.rollNo === parseInt(searchRollNo));
        }

        if (selectedClass) {
            result = result.filter((student) => student.className === selectedClass);
        }

        if (selectedSection) {
            result = result.filter((student) => student.section === selectedSection);
        }

        setFilteredStudents(result);
        setPage(1); // Reset pagination for new search results
        setHasMore(true); // Reset scrolling
    };

    // Handle Reset
    const handleReset = () => {
        setSearchRollNo("");
        setSelectedClass("");
        setSelectedSection("");
        setFilteredStudents([]);
        setVisibleStudents([]);
        setSearchPerformed(false);
    };

    return (
        <div className="p-6">
            {/* Filter Section */}
            <div className="flex space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by Roll No"
                    value={searchRollNo}
                    onChange={(e) => setSearchRollNo(e.target.value)}
                    className="border p-2 rounded w-1/3"
                />
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border p-2 rounded w-1/3"
                >
                    <option value="">Select Class</option>
                    <option value="Class A">Class A</option>
                    <option value="Class B">Class B</option>
                </select>
                <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="border p-2 rounded w-1/3"
                >
                    <option value="">Select Section</option>
                    <option value="Section 1">Section 1</option>
                    <option value="Section 2">Section 2</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
                <button
                    onClick={handleReset}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Reset
                </button>
            </div>

            {/* Student Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {filteredStudents.length === 0 && searchPerformed ? (
                    <p>No students found based on the filters.</p>
                ) : (
                    visibleStudents.map((student) => (
                        <div
                            key={student.id}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
                        >
                            <img
                                src={student.profileImage}
                                alt={student.name}
                                className="h-24 w-24 rounded-full object-cover mb-4"
                            />
                            <p className="font-bold text-lg">{student.name}</p>
                            <p>Roll No: {student.rollNo}</p>
                            <p>
                                {student.className} - {student.section}
                            </p>
                        </div>
                    ))
                )}
            </div>
            {hasMore && filteredStudents.length > 0 && (
                <p className="text-center mt-4">Loading more students...</p>
            )}
        </div>
    );
};

export default ViewStudents;
