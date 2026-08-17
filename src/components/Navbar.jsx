import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="navbar-brand">
          <NavLink to="/Home">Soham Mahajan</NavLink>
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/Home" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </li>
          <li>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
