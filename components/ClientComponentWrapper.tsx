"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

const ClientComponentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState("");
  const [studentId, setStudentId] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   // Check URL for student ID
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const id = urlParams.get("studentId");
    
  //   if (id) {
  //     setActiveComponent("StudentDashboard");
  //     setStudentId(id); // Set the student ID state
  //   } else {
  //     setActiveComponent(""); // Reset to default if no ID
  //   }
  // }, [router]); // Listen to router changes

  const toggleMainComponent = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      {/* <NavCompo onNavigate={toggleMainComponent} /> */}
      <main className="overflow-hidden pt-[68px]">
        
        {children}
      </main>
    </>
  );
};

export default ClientComponentWrapper;
