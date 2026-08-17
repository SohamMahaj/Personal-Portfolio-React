import "./SkillCategory.css";

function SkillCategory({ category, items }) {
  return (
    <div className="skill-category">
      <h3 className="category-title">{category}</h3>
      <div className="skill-list">
        {items.map((skill, index) => (
          <span key={index} className="skill-badge">{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default SkillCategory;
