import { Outlet } from "react-router-dom";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

import "./SellerLayout.css";

function SellerLayout() {
  return (
    <div className="seller-layout">

      {/* Seller Navigation */}
      <DashboardSidebar />

      {/* Seller Application */}
      <div className="seller-main">

        {/* Seller Header */}
        <DashboardHeader />

        {/* Current Seller Page */}
        <main className="seller-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default SellerLayout;