import { motion } from "framer-motion";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddEmployee = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);

    const resetForm = () => {
        setStartDate(null);
        // Cast the element to HTMLFormElement to use the reset method
        (document.getElementById('addEmployeeForm') as HTMLFormElement).reset();
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
      };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-8">Add Employee</h1>
            <form id="addEmployeeForm" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            placeholder="Mobile"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <select
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        >
                            <option>Employee Role</option>
                            <option>Manager</option>
                            <option>Developer</option>
                            <option>Designer</option>
                            <option>Tester</option>
                        </select>
                        <input
                            type="file"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Date of Joining"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                            type="number"
                            placeholder="CTC"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Other Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Father/Husband Name"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <select
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        >
                            <option>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Experience"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            placeholder="Government ID"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            placeholder="Education"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            placeholder="Blood Group"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Date of Birth"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            placeholder="Home Address"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Reset
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </motion.button>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee