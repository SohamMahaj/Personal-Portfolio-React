import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { API_BASE_URL } from "../config";
import "./Projects.css";

function ProjectList({ projectData }) {
  return (
    <div className="projects-grid">
      {projectData.map((project) => (
        <ProjectCard 
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          techStack={project.techStack}
          image={project.image}
          link={project.link}
        />
      ))}
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/projects`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load projects (Status: ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to connect to backend server");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE_URL}/api/projects`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load projects (Status: ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to connect to backend server");
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="projects-container container section text-center">
        <div className="spinner"></div>
        <h2>Loading Projects...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-container container section text-center">
        <div className="error-container">
          <h2>Failed to Load Projects</h2>
          <p>{error}</p>
          <button className="btn-primary mt-4" onClick={handleRetry}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container container section animate-fade-in">
      <h1 className="page-title">My Projects</h1>
      <p className="projects-subtitle">Here are some of the practical applications I've built.</p>
      <ProjectList projectData={projects} />
    </div>
  );
}

export default Projects;
