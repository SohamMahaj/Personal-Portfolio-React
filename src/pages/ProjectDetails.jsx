import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="container section text-center">
        <h2>Project Not Found</h2>
        <p>The project you are looking for does not exist.</p>
        <Link to="/projects" className="btn-primary mt-4">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="project-details-container container section animate-fade-in">
      <Link to="/projects" className="btn-outline mb-4">← Back to Projects</Link>
      
      <div className="details-header">
        <h1>{project.title}</h1>
        <div className="project-tech-tags">
          {project.techStack.map((tech, index) => (
            <span key={index} className="tech-badge">{tech}</span>
          ))}
        </div>
      </div>

      <img src={project.image} alt={project.title} className="details-image" />

      <div className="details-content">
        <section className="details-section">
          <h2>Overview</h2>
          <p>{project.description}</p>
        </section>

        <section className="details-section">
          <h2>Key Features</h2>
          <ul className="features-list">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="details-section">
          <h2>Links</h2>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View Live/Repository
          </a>
        </section>
      </div>
    </div>
  );
}

export default ProjectDetails;
