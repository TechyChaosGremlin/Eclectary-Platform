import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-content" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
