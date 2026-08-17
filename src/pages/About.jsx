import SkillCategory from "../components/SkillCategory";
import ExperienceCard from "../components/ExperienceCard";
import { skills } from "../data/skills";
import { experience } from "../data/experience";
import { achievements } from "../data/achievements";
import profilePhoto from "../assets/Soham_profile_photo.jpeg";
import "./About.css";

function About() {
  return (
    <div className="about-container container section animate-fade-in">
      <h1 className="page-title">About Me</h1>
      
      <section className="about-section">
        <div className="about-bio-card">
          <img src={profilePhoto} alt="Soham Mahajan" className="about-profile-img" />
          <div className="about-bio-text">
            <p className="about-text">
              I am a Computer Science Engineering student at NIT Warangal with a strong interest in software engineering and full-stack development. I enjoy building practical applications and continuously improving my problem-solving skills through Data Structures and Algorithms. My goal is to leverage my skills to build impactful and efficient software solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Experience</h2>
        <div className="experience-list">
          {experience.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} />
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map((skillGroup, index) => (
            <SkillCategory 
              key={index} 
              category={skillGroup.category} 
              items={skillGroup.items} 
            />
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Achievements</h2>
        <div className="achievements-list">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <div>
                <h3>{achievement.title} — {achievement.event}</h3>
                <p className="achievement-year">{achievement.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
