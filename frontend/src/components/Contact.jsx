import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get(`${API}/api/profile`)
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, []);

  return (
    <section id="contact" className="section">
      <h2>Get In Touch</h2>
      <p>I'm open to freelance work and full-time roles.</p>
      {profile.email && (
        <a href={`mailto:${profile.email}`} className="btn">Send Email</a>
      )}
    </section>
  );
}