import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import "./Projects.css";

// 2+ level prop drilling required by the assignment
// Projects Page -> ProjectList Component -> ProjectCard Component

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
  return (
    <div className="projects-container container section animate-fade-in">
      <h1 className="page-title">My Projects</h1>
      <p className="projects-subtitle">Here are some of the practical applications I've built.</p>
      
      {/* Passing data down to ProjectList to demonstrate prop drilling */}
      <ProjectList projectData={projects} />
    </div>
  );
}

export default Projects;
