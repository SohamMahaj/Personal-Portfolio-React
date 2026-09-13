import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profilePhoto from "../assets/Soham_profile_photo.jpeg";
import resume from "../assets/Soham_final_resume.pdf";
import "./Home.css";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return (
      <div className="loading-container container section">
        <div className="spinner"></div>
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  return (
    <div className="home-container container section animate-fade-in">
      <div className="hero-content">
        <h1>Hi, I'm <span className="highlight">Soham Mahajan</span></h1>
        <h2>Computer Science Engineering Student at NIT Warangal</h2>
        <p className="hero-description">
          Passionate about software development and full-stack engineering.
          I love solving problems with Data Structures and Algorithms and building practical applications.
        </p>

        <div className="cta-group">
          <Link to="/projects" className="btn-primary">View Projects</Link>
          <Link to="/contact" className="btn-outline">Contact Me</Link>
          <a href={resume} target="_blank" rel="noopener noreferrer" className="btn-outline">Download Resume</a>
        </div>

        <div className="social-links">
          <a href="https://github.com/placeholder-github" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/placeholder-linkedin" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="hero-image-wrapper">
        <img
          src={profilePhoto}
          alt="Soham Mahajan"
          className="hero-profile-img"
        />
      </div>
    </div>
  );
}

export default Home;
