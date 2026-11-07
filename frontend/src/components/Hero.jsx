import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Hero() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get(`${API}/api/profile`)
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, []);

  return (
    <section id="hero" className="hero">
      {profile.photo_url && (
        <img
          src={profile.photo_url}
          alt={profile.name || 'Profile'}
          className="hero-photo"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}

      <h1>Hi, I'm <span className="accent">{profile.name || 'a developer'}</span></h1>
      <p className="tagline">{profile.bio}</p>

      <div className="hero-buttons">
        {profile.github_url && (
          <a href={profile.github_url} target="_blank" rel="noreferrer" className="btn">GitHub</a>
        )}
        {profile.linkedin_url && (
          <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="btn outline">LinkedIn</a>
        )}
      </div>
    </section>
  );
}