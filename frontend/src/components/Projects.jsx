import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="section"><h2>Projects</h2><p>Loading…</p></section>;
  }

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(p => (
          <article key={p.id} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="badges">
              {p.tech_stack?.map((t, i) => (
                <span key={i} className="badge">{t}</span>
              ))}
            </div>
            <div className="project-links">
              {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer">Live Demo →</a>}
              {p.repo_url && <a href={p.repo_url} target="_blank" rel="noreferrer">Code →</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}