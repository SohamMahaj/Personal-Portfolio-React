import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);

        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`);
        if (response.status === 404) {
          if (isMounted) {
            setNotFound(true);
            setLoading(false);
          }
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to load project (Status: ${response.status})`);
        }

        const data = await response.json();
        if (isMounted) {
          setProject(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load project details");
          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (loading) {
    return (
      <div className="project-details-container container section text-center">
        <div className="spinner"></div>
        <h2>Loading Project Details...</h2>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container section text-center">
        <h2>Project Not Found</h2>
        <p>The project you are looking for does not exist.</p>
        <Link to="/projects" className="btn-primary mt-4">Back to Projects</Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container section text-center">
        <div className="error-container">
          <h2>Failed to Load Project</h2>
          <p>{error}</p>
          <Link to="/projects" className="btn-primary mt-4">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-details-container container section animate-fade-in">
      <Link to="/projects" className="btn-outline mb-4">← Back to Projects</Link>
      
      <div className="details-header">
        <h1>{project.title}</h1>
        <div className="project-tech-tags">
          {project.techStack?.map((tech, index) => (
            <span key={index} className="tech-badge">{tech}</span>
          ))}
        </div>
      </div>

      {project.image && (
        <img src={project.image} alt={project.title} className="details-image" />
      )}

      <div className="details-content">
        <section className="details-section">
          <h2>Overview</h2>
          <p>{project.description}</p>
        </section>

        {project.features && project.features.length > 0 && (
          <section className="details-section">
            <h2>Key Features</h2>
            <ul className="features-list">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {project.link && (
          <section className="details-section">
            <h2>Links</h2>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
              View Live/Repository
            </a>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
