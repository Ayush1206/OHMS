import React from 'react';
import DefaulterList from './defaulterList.component';
import FeePieChart from '../common/feePieChart';

const FeeReport: React.FC = () => {
  return (
    <div className="p-6 flex flex-col lg:flex-row">
      {/* Left Side: Defaulter List */}
      <div className="w-full lg:w-1/2 lg:pr-4 mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold mb-4">Fee Defaulter List</h2>
        <DefaulterList />
      </div>

      {/* Right Side: Placeholder for Charts */}
      <div className="w-full lg:w-1/2 lg:pl-4">
        <h2 className="text-2xl font-bold mb-4">Fee Reports & Analytics</h2>
        <FeePieChart />
      </div>
    </div>
  );
};

export default FeeReport;
