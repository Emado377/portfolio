import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/skills`)
      .then(res => setSkills(res.data))
      .catch(console.error);
  }, []);

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = [...(acc[s.category] || []), s.name];
    return acc;
  }, {});

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="skill-group">
          <h3>{category}</h3>
          <div className="badges">
            {items.map(name => (
              <span key={name} className="badge">{name}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}