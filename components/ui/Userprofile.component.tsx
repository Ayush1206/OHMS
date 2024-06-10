import React from 'react';
import Sidebar from './Sidebar.component';
import LineChartComponent from './LineChart.component';

const Userprofile = () => {
  const lectures = [
    { name: 'Advanced Mathematics', time: '10:00 AM - 11:00 AM', room: 'Room 204' },
    { name: 'Advanced Mathematics', time: '13:00 PM - 14:00 PM', room: 'Room 208' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow overflow-auto ml-0 sm:ml-40"> {/* Removed h-screen to avoid potential overflow issues with the viewport height */}
        <div className="flex flex-col">
          {/* Upper Section */}
          <div className="flex-1 flex items-center p-4 space-x-4"> {/* Use space-x-4 for spacing between elements */}
            <div className="w-1/2 flex justify-center">
              <img src={"/images/dummy.webp"} alt="Profile" className="h-64 w-64 rounded-full object-cover" />
            </div>
            <div className="w-1/2">
              <div className="ml-4">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-lg">Teacher</p>
                <p className="text-md">Expertise: Computers</p>
                <p className="text-md">Experience: 5 Years</p>
                <p className="text-md">Working in school from: 1 Years</p>
              </div>
            </div>
          </div>

          {/* Lower Section */}
          <div className="flex-1 flex p-4">
            {/* Chart Container on the Left */}
            <div className="flex-grow p-2" style={{ flexBasis: '66.666667%' }}> {/* Use flex-grow with a custom flexBasis */}
              <LineChartComponent />
            </div>

            {/* Class Information on the Right */}
            <div className="flex-initial p-2" style={{ flexBasis: '33.333333%' }}> {/* Reduced padding and use flex-initial with a custom flexBasis */}
              <h3 className="text-lg font-semibold mb-2">Today's Remaining Lectures:</h3>
              {lectures.map((lecture, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-200 rounded-full shadow text-sm">
                  <p className="font-semibold">{`${lecture.name} - ${lecture.time} - ${lecture.room}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
