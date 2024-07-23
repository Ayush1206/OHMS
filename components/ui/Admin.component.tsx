import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale, // Import the RadialLinearScale for polar area charts
  TooltipItem,
  ChartDatasetProperties
} from 'chart.js';
import { SidebarAdmin } from '..';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale // Register the RadialLinearScale
);

interface CustomDataset extends ChartDatasetProperties<'polarArea', number[]> {
  boys: number[];
  girls: number[];
}

interface CustomTooltipItem extends TooltipItem<'polarArea'> {
  dataset: CustomDataset;
}

const polarData = {
  labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
  datasets: [{
    label: 'Total students',
    data: [11, 16, 7, 3, 14],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ],
    borderWidth: 1,
    boys: [6, 9, 4, 2, 7],
    girls: [5, 7, 3, 1, 7]
  }]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: CustomTooltipItem) {
          const dataIndex = tooltipItem.dataIndex;
          const dataset = tooltipItem.dataset;
          const boys = dataset.boys[dataIndex];
          const girls = dataset.girls[dataIndex];
          return [
            `Boys: ${boys}`,
            `Girls: ${girls}`
          ];
        }
      }
    }
  }
};



const Admin = () => {
  const lectures = [
    { name: 'Advanced Mathematics', time: '10:00 AM - 11:00 AM', room: 'Room 204' },
    { name: 'Advanced Mathematics', time: '13:00 PM - 14:00 PM', room: 'Room 208' },
  ];

  const tableData = [
    { field: "Total Payable Fees", value: "10L" },
    { field: "Total Fee Paid", value: "9L" },
    { field: "Pending Payment", value: "1L" }
  ];

  return (

    <div className="flex-grow overflow-auto ml-0 sm:ml-40"> {/* Removed h-screen to avoid potential overflow issues with the viewport height */}
      <div className="flex flex-col">
        {/* Upper Section */}
        <div className="flex-1 flex p-4">
          <div className="flex-1 flex space-x-4">
            {/* Profile Image and Bio Data */}
            <div className="flex flex-col items-center justify-center w-1/2">
              <img src={"/images/dummy.webp"} alt="Profile" className="h-64 w-64 rounded-full object-cover" />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-lg">Admin</p>
                <p className="text-md">Expertise: Office work</p>
                <p className="text-md">Experience: 5 Years</p>
                <p className="text-md">Working in school from: 1 Years</p>
              </div>
            </div>

            {/* Table Section */}
            <div className="flex flex-col w-1/2 mt-24">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.field}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr className="my-4 border-t-2 border-gray-200" /> {/* Visual break between sections */}
        {/* Lower Section */}
        <div className="flex-1 flex p-4">
          <div className="flex-1 flex flex-col items-center p-4">
            <div className="bg-blue-100 p-3 rounded-lg shadow-lg mb-4"> {/* Styled tab */}
              <h3 className="text-lg font-semibold text-black-800">Total Students: 100</h3>
            </div>
            <PolarArea data={polarData} options={options} />
          </div>
          <div className="flex-1 flex flex-col items-center p-4">
            <div className="bg-blue-100 p-3 rounded-lg shadow-lg mb-4"> {/* Styled tab */}
              <h3 className="text-lg font-semibold text-black-800">Total Teachers: 5</h3>
            </div>
            <PolarArea data={polarData} options={options} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Admin;
