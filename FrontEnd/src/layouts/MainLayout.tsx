import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const collection = new URLSearchParams(location.search).get("collection");
  const isCollectionPageWithoutNavbar = (
    location.pathname === "/shop"
    && ["purely-handmade", "custom-printing", "digital-creations"].includes(collection ?? "")
  );

  return (
    <div className="app-layout">
      {!isHome && !isCollectionPageWithoutNavbar && <Navbar />}
      <main className="page-content" role="main">
        <Outlet />
      </main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default MainLayout;
