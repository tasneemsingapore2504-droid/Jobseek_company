import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function CompanyLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 col-lg-10 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default CompanyLayout;
