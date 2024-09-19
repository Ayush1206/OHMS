// components/AddEventModal.tsx
"use client";

import React, { useState } from "react";

// Define the color palette based on your theme
const COLORS = {
    porcelain: "#f0f1f2",
    darkerPorcelain: "#e1e3e5",
    william: "#3b5b6a",
    burntSienna: "#eb6042",
    porsche: "#e5aa5d",
    softGrey: "#8a9ba8",
};

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddEvent: (event: { title: string; type: string; description: string; date: Date }) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = () => {
        if (!title || !type || !description || !date ) {
          alert("Please fill out all fields.");
          return;
        }
      
        // Create a new event object
        const newEvent = {
          title,
          type,
          description,
          date: new Date(date),
        };
      
        onAddEvent(newEvent);
        onClose();
      };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80" style={{ backgroundColor: COLORS.porcelain }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.william }}>Add Event</h2>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2 p-2 w-full border rounded"
                />
                <input
                    type="text"
                    placeholder="Event Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mb-2 p-2 w-full border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-2 p-2 w-full border rounded"
                />
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mb-4 p-2 w-full border rounded"
                />
                {/* <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mb-4 p-2 w-full border rounded"
                /> */}
                <div className="flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-burntSienna text-white px-4 py-2 rounded hover:bg-william"
                    >
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="text-william hover:text-burntSienna"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;
