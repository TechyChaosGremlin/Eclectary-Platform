import { Link } from "react-router-dom";
import "./DashboardHeader.css";

function DashboardHeader() {
  return (
    <header className="dashboard-header">

      {/* Mobile Menu */}
      <button
        type="button"
        className="dashboard-menu-button"
        aria-label="Open dashboard menu"
      >
        ☰
      </button>


      {/* Page Heading */}
      <div className="dashboard-header-title">
        <h1>Creator Dashboard</h1>
        <p>Manage your Eclectary shop</p>
      </div>


      {/* Header Actions */}
      <div className="dashboard-header-actions">

        {/* View Store */}
        <Link
          to="/"
          className="dashboard-view-store"
        >
          View Store
        </Link>


        {/* Notifications */}
        <button
          type="button"
          className="dashboard-notifications"
          aria-label="Notifications"
        >
          🔔
        </button>


        {/* Creator Account */}
        <Link
          to="/dashboard/settings"
          className="dashboard-account"
        >
          <div className="dashboard-avatar">
            C
          </div>

          <div className="dashboard-account-info">
            <span className="dashboard-account-name">
              Creator
            </span>

            <span className="dashboard-account-role">
              Seller
            </span>
          </div>
        </Link>

      </div>

    </header>
  );
}

export default DashboardHeader;