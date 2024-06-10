"use client"

import { Addmission, Admin, Login, NavCompo, Userprofile } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("");

  const toggleMainComponent = (componentName: string) => {
    console.log("setting up activeComponent value to addmission  ",componentName);
    
    setActiveComponent(componentName);
  };

  return (
    <main className="overflow-hidden pt-[68px]">
      <NavCompo onNavigate={toggleMainComponent}></NavCompo>
      {activeComponent === "Admission" && <Addmission></Addmission>}
      {activeComponent === "OfficeBoy" && <Userprofile></Userprofile>}
      {activeComponent === "Admin" && <Admin></Admin>}
      {activeComponent === "LogIn" && <Login></Login>}
    </main>
  );
}
