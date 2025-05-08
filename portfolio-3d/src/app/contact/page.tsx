"/home/ubuntu/portfolio-3d/src/app/contact/page.tsx"

```tsx
// src/app/contact/page.tsx
'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';

// Placeholder social links - user should replace these
const socialLinks = {
  linkedin: "https://linkedin.com/in/yourusername",
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourusername",
  email: "mailto:youremail@example.com",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(false);
    setError(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Placeholder for form submission logic (e.g., API call)
    // For this example, we'll just simulate a successful submission.
    console.log("Form data submitted:", formData);
    // In a real app, you would send this data to a backend or a service like Formspree/Netlify Forms.
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' }); // Reset form
    
    // Hide success message after a few seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    marginBottom: '1rem',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '5px',
    color: 'white',
    fontSize: '1rem',
    fontFamily: "'Anonymous Pro', monospace",
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)', // Deep blue gradient
      color: 'white',
      padding: '2rem',
      fontFamily: "'Anonymous Pro', monospace",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'rgba(0,0,0,0.4)',
        padding: '2rem 3rem',
        borderRadius: '10px',
        boxShadow: '0 0 30px rgba(0,120,255,0.3)',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1.5rem', color: '#87CEFA' }}>Get In Touch</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#cccccc' }}>
          Have a question, a project idea, or just want to say hi? Feel free to reach out!
        </p>

        {isSubmitted && (
          <p style={{ color: '#00ff9b', background: 'rgba(0,255,155,0.1)', padding: '10px', borderRadius: '5px', marginBottom: '1rem' }}>
            Thank you for your message! I'll get back to you soon.
          </p>
        )}
        {error && (
          <p style={{ color: '#ff4d4d', background: 'rgba(255,77,77,0.1)', padding: '10px', borderRadius: '5px', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            rows={5} 
            value={formData.message}
            onChange={handleChange}
            style={{...inputStyle, resize: 'vertical'}}
          />
          <button 
            type="submit" 
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              backgroundColor: '#87CEFA',
              color: '#000428',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#76b6d9')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#87CEFA')}
          >
            Send Message
          </button>
        </form>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#87CEFA' }}>Connect with me:</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{color: '#87CEFA', fontSize: '1.8rem'}}>LI</a> 
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub" style={{color: '#87CEFA', fontSize: '1.8rem'}}>GH</a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" style={{color: '#87CEFA', fontSize: '1.8rem'}}>TW</a>
            <a href={socialLinks.email} title="Email" style={{color: '#87CEFA', fontSize: '1.8rem'}}>EM</a>
            {/* Replace text with actual icons for better UX */}
          </div>
        </div>

        <Link href="/" style={{ 
          color: '#87CEFA', 
          textDecoration: 'underline',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

```
This creates the Contact page at `/contact` with a functional (client-side validation and simulated submission) contact form and placeholder social media links. The user will need to replace the placeholder social links with their actual URLs and implement a proper backend or third-party service for form submissions in a real application. The styling is consistent with the portfolio's theme.

Next, I will update the todo.md.
