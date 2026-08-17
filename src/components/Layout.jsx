import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ theme, toggleTheme }) {
  return (
    <div className="layout-wrapper">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
