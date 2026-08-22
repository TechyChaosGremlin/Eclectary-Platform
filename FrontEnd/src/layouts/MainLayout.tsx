import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="app-layout">
      {!isHome && <Navbar />}
      <main className="page-content" role="main">
        <Outlet />
      </main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default MainLayout;
