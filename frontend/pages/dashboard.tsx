import DualPanes from "@/components/Layouts/DualPanes";
import Sidebar from "@/components/Sidebar";
import APIPane from "@/components/Subsections/Dashboard/APIPane";
import Content from "@/components/Subsections/Dashboard/Content";
import React from "react";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen w-screen">
        <DualPanes
        leftPane={<APIPane/>}
        rightPane={<Content/>}
        />
      </div>
    </>
  );
}

export default Dashboard;
