import { motion } from "framer-motion";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Addmission = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-5"
    >
      <form className="space-y-4">
        {/* Name Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input type="text" placeholder="First name" className="input" />
            <input type="text" placeholder="Middle name" className="input" />
            <input type="text" placeholder="Last name" className="input" />
          </div>
        </div>

        {/* Date Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            className="input"
            dateFormat="MMMM d, yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>

        {/* Gender Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="flex gap-3">
            <div className="flex items-center">
              <input type="radio" name="gender" id="male" className="radio" />
              <label htmlFor="male" className="ml-2">
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="gender" id="female" className="radio" />
              <label htmlFor="female" className="ml-2">
                Female
              </label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="gender" id="other" className="radio" />
              <label htmlFor="other" className="ml-2">
                Other
              </label>
            </div>
          </div>
        </div>

        {/* Continuing the form with your specified fields... */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Contact
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Number" className="input" />
            <input type="text" placeholder="Relation" className="input" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="input w-full"
          />
        </div>

        {/* Mother Tongue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother Tongue
          </label>
          <input
            type="text"
            placeholder="Mother Tongue"
            className="input w-full"
          />
        </div>

        {/* Mailing Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mailing Address
          </label>
          <input
            type="text"
            placeholder="Street Address"
            className="input w-full mb-3"
          />
          <input
            type="text"
            placeholder="Street Address 2"
            className="input w-full mb-3"
          />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" className="input" />
            <input type="text" placeholder="State" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <input type="text" placeholder="Country" className="input" />
            <input type="text" placeholder="Zip Code" className="input" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="text-white font-bold py-2 w-full rounded bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Addmission;
