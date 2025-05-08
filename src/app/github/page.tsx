'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

// IMPORTANT: Replace 'YOUR_GITHUB_USERNAME' with the actual GitHub username.
// For a real application, consider using an environment variable for the username.
const GITHUB_USERNAME = 'octocat'; // Replace with user's GitHub username or a well-known one for placeholder

export default function GitHubFeedPage() 
{
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        // Fetching public repositories, sorted by push date, limited to 6 for display
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`);
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch GitHub repositories:", err);
        // Set placeholder data on error to still show the layout
        setRepos([
          { id: 1, name: "Placeholder Repo 1", html_url: "#", description: "This is a placeholder because GitHub API failed.", stargazers_count: 0, forks_count: 0, language: "JavaScript" },
          { id: 2, name: "Placeholder Repo 2", html_url: "#", description: "Please check your internet connection or GitHub username.", stargazers_count: 0, forks_count: 0, language: "TypeScript" },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '1.5rem',
    margin: '1rem',
    width: 'clamp(280px, 100%, 350px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const linkStyle: React.CSSProperties = {
    color: '#61DAFB',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#ffffff', textAlign: 'center' }}>
        My GitHub Activity
      </h1>

      {loading && <p style={{ fontSize: '1.2rem' }}>Loading repositories...</p>}
      {error && <p style={{ fontSize: '1.2rem', color: 'red' }}>Error: {error}. Displaying placeholder data.</p>}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        width: '100%',
        maxWidth: '1200px',
      }}>
        {repos.map(repo => (
          <div key={repo.id} style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {repo.name}
                </a>
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#cccccc', marginBottom: '1rem', minHeight: '50px' }}>
                {repo.description || 'No description available.'}
              </p>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#aaaaaa', marginTop: 'auto' }}>
              <span>⭐ {repo.stargazers_count}</span>
              <span style={{ marginLeft: '1rem' }}>🍴 {repo.forks_count}</span>
              {repo.language && <span style={{ marginLeft: '1rem', backgroundColor: '#61DAFB', color: '#1e1e2f', padding: '2px 6px', borderRadius: '4px' }}>{repo.language}</span>}
            </div>
          </div>
        ))}
      </div>

      <Link href="/" style={{ color: '#61DAFB', textDecoration: 'underline', fontSize: '1rem', marginTop: '3rem' }}>
        Back to Home
      </Link>
    </div>
  );
}
