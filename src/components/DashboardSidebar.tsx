import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";

function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">

      {/* Brand */}
      <div className="dashboard-brand">
        <NavLink to="/dashboard">
          Eclectary
        </NavLink>

        <span>Creator Dashboard</span>
      </div>


      {/* Main Navigation */}
      <nav className="dashboard-nav" aria-label="Creator dashboard">

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>⌂</span>
          Overview
        </NavLink>


        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>▣</span>
          Products
        </NavLink>


        <NavLink
          to="/dashboard/products/new"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>＋</span>
          Add Product
        </NavLink>


        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>□</span>
          Orders
        </NavLink>


        <NavLink
          to="/dashboard/messages"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>✉</span>
          Messages
        </NavLink>


        <NavLink
          to="/dashboard/analytics"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>⌁</span>
          Analytics
        </NavLink>

      </nav>


      {/* Store Management */}
      <div className="dashboard-section">

        <p className="dashboard-section-title">
          Store
        </p>

        <NavLink
          to="/dashboard/store"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>◈</span>
          Store Profile
        </NavLink>


        <NavLink
          to="/dashboard/store/appearance"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>✦</span>
          Store Appearance
        </NavLink>


        <NavLink
          to="/dashboard/reviews"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>★</span>
          Reviews
        </NavLink>

      </div>


      {/* Account */}
      <div className="dashboard-section">

        <p className="dashboard-section-title">
          Account
        </p>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive ? "dashboard-link active" : "dashboard-link"
          }
        >
          <span>⚙</span>
          Settings
        </NavLink>

      </div>


      {/* Return to Marketplace */}
      <div className="dashboard-sidebar-bottom">

        <NavLink
          to="/"
          className="dashboard-marketplace-link"
        >
          ← Return to Marketplace
        </NavLink>

      </div>

    </aside>
  );
}

export default DashboardSidebar;