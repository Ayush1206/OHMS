// components/ClientComponentWrapper.tsx
"use client";

import React, { useState } from "react";
import { Addmission, Admin, Login, NavCompo, ProfileHome, Userprofile } from "@/components";

const ClientComponentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState("");

  const toggleMainComponent = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <NavCompo onNavigate={toggleMainComponent} />
      <main className="overflow-hidden pt-[68px]">
        {activeComponent === "Admission" && <Addmission />}
        {activeComponent === "OfficeBoy" && <Userprofile />}
        {activeComponent === "ProfileHome" && <ProfileHome />}
        {activeComponent === "LogIn" && <Login />}
        {children}
      </main>
    </>
  );
};

export default ClientComponentWrapper;
