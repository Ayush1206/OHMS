// components/FeeReport.tsx

import React from 'react';
import DefaulterList from './defaulterList.component';
import FeePieChart from '../common/feePieChart';

const FeeReport: React.FC = () => {
  return (
    <div className="p-6 flex">
      {/* Left Side: Defaulter List */}
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-4">Fee Defaulter List</h2>
        <DefaulterList />
      </div>

      {/* Right Side: Placeholder for Charts */}
      <div className="w-1/2 pl-4">
        <h2 className="text-2xl font-bold mb-4">Fee Reports & Analytics</h2>
        <FeePieChart />
      </div>
    </div>
  );
};

export default FeeReport;
