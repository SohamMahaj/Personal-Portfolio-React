import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container section text-center animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--accent)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/Home" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
