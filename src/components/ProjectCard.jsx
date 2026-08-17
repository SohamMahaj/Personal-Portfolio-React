import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ id, title, description, techStack, image, link }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-content">
        <h3>{title}</h3>
        <p className="project-description">{description}</p>

        <div className="project-tech">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-badge">{tech}</span>
          ))}
        </div>

        <div className="project-actions">
          <button onClick={handleToggleDetails} className="btn-outline btn-sm">
            {showDetails ? "Hide Details" : "View Details"}
          </button>
          <Link to={`/projects/${id}`} className="btn-primary btn-sm">
            Open Page
          </Link>
        </div>

        {showDetails && (
          <div className="project-extra animate-fade-in">
            <p><strong>Demo Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">View Live/Repo</a></p>
            <p>Click "Open Page" to view full features and details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
