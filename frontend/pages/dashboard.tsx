import DualPanes from "@/components/Layouts/DualPanes";
import Sidebar from "@/components/Sidebar";
import APIPane from "@/components/Subsections/Dashboard/APIPane";
import Content from "@/components/Subsections/Dashboard/Content";
import React, { useState } from "react";

function Dashboard() {
  const [activePlaygroundId, setActivePlaygroundId] = useState("");


  return (
    <>
      <Sidebar onPlaygroundClick={setActivePlaygroundId}/>
      <div className="min-h-screen w-screen">
        <DualPanes
        leftPane={<APIPane/>}
        rightPane={<Content activePlaygroundId={activePlaygroundId}/>}
        />
      </div>
    </>
  );
}

export default Dashboard;
