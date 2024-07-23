import React, { useState } from 'react';
import { PolarArea } from 'react-chartjs-2';

import { AddEmployee, Admin, SidebarAdmin } from '..';
import FeeManagement from './FeeManagment.component';
import Settings from './Settings.component';
import AddStudents from './AddStudents.components';


const ProfileHome = () => {

    const [activeComponent, setActiveComponent] = useState('Admin');


    const renderComponent = () => {
        switch (activeComponent) {
          case 'Admin':
            return <Admin />;
          case 'FeeManagement':
            return <FeeManagement />;
          case 'AddEmployee':
            return <AddEmployee />;
          case 'AddStudents':
            return <AddStudents />
          case 'Settings':
            return <Settings />;
          default:
            return <Admin />;
        }
      };
 
  return (
    <div className="flex min-h-screen">
    <SidebarAdmin setActiveComponent={setActiveComponent} />
    <div className="flex-grow p-4">
      {renderComponent()}
    </div>
  </div>
  );
};

export default ProfileHome;
