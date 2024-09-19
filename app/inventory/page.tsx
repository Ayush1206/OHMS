"use client";

import React, { useEffect, useState } from "react";
import {
    FaBox,
    FaBook,
    FaBasketballBall,
    FaChalkboard,
    FaFlask,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Sidebar } from "@/components/admin";

// Define the color palette based on your theme
const COLORS = {
    porcelain: "#f0f1f2",
    darkerPorcelain: "#e1e3e5",
    william: "#3b5b6a",
    burntSienna: "#eb6042",
    porsche: "#e5aa5d",
    softGrey: "#8a9ba8",
    softBlue: "#ADD8E6",
    softGreen: "#98FB98",
    softYellow: "#FFED86",
    softRed: "#FF7F7F",
};

// Define an interface for the inventory categories
interface InventoryCategory {
    name: string;
    totalItems: number;
    icon: JSX.Element;
}

// Color codes for each category
const categoryColors: Record<string, string> = {
    "Lab Inventory": COLORS.softRed,
    "Classroom Essentials": COLORS.softGreen,
    Library: COLORS.softBlue,
    "Sports Items": COLORS.softYellow,
    Books: COLORS.softGrey,
};

// Icon mapping
const categoryIcons: Record<string, JSX.Element> = {
    "Lab Inventory": <FaFlask />,
    "Classroom Essentials": <FaChalkboard />,
    Library: <FaBook />,
    "Sports Items": <FaBasketballBall />,
    Books: <FaBox />,
};

const InventoryPage: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string>("inventory");
    const [inventoryData, setInventoryData] = useState<InventoryCategory[]>([]);
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();
    const [isFormOpen, setIsFormOpen] = useState(false); // To control the form visibility
    const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
    const [formData, setFormData] = useState({ itemName: "", quantity: 0, reason: "" }); // Form data

    const categories = ["Lab Inventory", "Classroom Essentials", "Library", "Sports Items", "Books"]; // Add your categories

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        const requestData = {
            category: selectedCategory,
            itemName: formData.itemName,
            quantity: formData.quantity,
            reason: formData.reason,
        };

        // POST request to save the data to JSON (fake it here for now)
        await axios.post("/api/supplies-request", requestData);
        setIsFormOpen(false); // Close the form on submission
    };


    // Fetch inventory data from the API
    useEffect(() => {
        async function fetchInventory() {
            try {
                const response = await axios.get("/api/inventory");
                setInventoryData(response.data.categories);
                setLoading(false); // Stop loading when data is fetched
            } catch (error) {
                console.error("Error fetching inventory data:", error);
                setLoading(false); // Stop loading even if there's an error
            }
        }

        fetchInventory();
    }, []);

    // Shimmer effect for loading
    const renderShimmers = () => {
        return Array(6).fill(0).map((_, index) => (
            <div
                key={index}
                className="bg-gray-200 animate-pulse shadow-md rounded-lg p-8 flex flex-col items-center"
                style={{ width: "240px", height: "220px" }}
            />
        ));
    };

    // Function to render inventory categories
    const renderInventoryCategories = () => {
        return inventoryData.map((category, index) => (
            <div
                key={index}
                className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow"
                style={{ width: "240px", height: "220px", cursor: "pointer", margin: "10px" }}
                onClick={() =>
                    router.push(
                        `/inventory/${category.name.toLowerCase().replace(/\s+/g, "-")}`
                    )
                }
            >
                <div className="text-5xl text-burntSienna mb-6">
                    {categoryIcons[category.name]}
                </div>
                <h2 className="text-xl font-bold">{category.name}</h2>
                <p className="text-gray-500">{category.totalItems} Items</p>
            </div>
        ));
    };

    return (
        <div className="flex">
            {/* Sidebar - same as dashboard */}
            <Sidebar onSelect={setActiveComponent} />

            {/* Main content */}
            <div className="ml-[10%] md:ml-[15%] w-[90%] md:w-[85%] h-full">
                {/* Header - same as dashboard */}
                <div
                    className="fixed w-[90%] md:w-[85%] top-0 flex justify-between items-center px-6 py-3 z-10"
                    style={{ backgroundColor: COLORS.darkerPorcelain }}
                >
                    <h1
                        className="text-william text-2xl font-semibold"
                        style={{ color: COLORS.william }}
                    >
                        Inventory Management
                    </h1>
                    
                </div>

                <hr className="border-t-2 border-softGrey fixed w-[90%] md:w-[85%] top-16" />

                {/* Inventory Category Title */}
                <div className="pt-24 px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.william }}>
                        Inventory Management
                    </h2>
                    <button
                        onClick={() => setIsFormOpen(true)}  // To open the form
                        className="bg-burntSienna text-white px-4 py-2 rounded hover:bg-william"
                    >
                        Request Supplies
                    </button>
                </div>

                {/* Inventory Category Cards */}
                <div
                    className="pt-6 p-6"
                    style={{ backgroundColor: COLORS.porcelain }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {loading ? renderShimmers() : renderInventoryCategories()}
                    </div>
                </div>

                {isFormOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={() => setIsFormOpen(false)} // Close the modal when clicked outside
                    >
                        {/* Stop click propagation on the modal container itself */}
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicked inside the modal
                        >
                            {/* X icon for closing the modal */}
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            >
                                &times;
                            </button>

                            <h2 className="text-xl font-bold mb-4">Request Supplies</h2>

                            {/* Category Dropdown */}
                            <select
                                className="w-full border rounded p-2 mb-4"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            {/* Show the remaining fields only after category is selected */}
                            {selectedCategory && (
                                <>
                                    <input
                                        type="text"
                                        name="itemName"
                                        placeholder="Item Name"
                                        className="w-full border rounded p-2 mb-4"
                                        onChange={handleFormChange}
                                    />

                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        className="w-full border rounded p-2 mb-4"
                                        onChange={handleFormChange}
                                    />

                                    <input
                                        type="text"
                                        name="reason"
                                        placeholder="Reason"
                                        className="w-full border rounded p-2 mb-4"
                                        onChange={handleFormChange}
                                    />

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            onClick={() => setIsFormOpen(false)} // Close the form
                                            className="bg-gray-300 text-black px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="bg-burntSienna text-white px-4 py-2 rounded hover:bg-william"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default InventoryPage;
