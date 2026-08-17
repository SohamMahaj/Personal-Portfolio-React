import "./ExperienceCard.css";

function ExperienceCard({ company, role, duration, description }) {
  return (
    <div className="experience-card">
      <div className="experience-header">
        <div>
          <h3 className="experience-role">{role}</h3>
          <h4 className="experience-company">{company}</h4>
        </div>
        <span className="experience-duration">{duration}</span>
      </div>
      <ul className="experience-description">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;
