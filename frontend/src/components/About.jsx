import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

export default function About() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get(`${API}/api/profile`)
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, []);

  return (
    <section id="about" className="section">
      <h2>About Me</h2>
      <p>{profile.bio}</p>
      {profile.email && (
        <p>📧 <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
      )}
    </section>
  );
}