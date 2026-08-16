import { Outlet } from "react-router-dom";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

import "./DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">

      <DashboardSidebar />

      <div className="dashboard-main">

        <DashboardHeader />

        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;