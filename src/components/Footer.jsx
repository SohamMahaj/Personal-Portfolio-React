import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} Soham Mahajan. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/placeholder-github" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/placeholder-linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:placeholder@email.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
