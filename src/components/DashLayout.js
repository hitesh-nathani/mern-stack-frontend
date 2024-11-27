import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";

function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="dash">
        <Outlet />
      </div>
    </>
  );
}

export default DashLayout;
