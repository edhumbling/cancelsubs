'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <Link href="/" className="logo">
                    cancel subs
                </Link>
                <a
                    href="https://github.com/yourusername/cancelsubs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-btn"
                >
                    <svg
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        fill="currentColor"
                    >
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                    </svg>
                    <span>Star</span>
                </a>
            </div>

            <style jsx>{`
        .header {
          padding: 1rem 0;
        }
        
        .header-content {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
        }
        
        .logo:hover {
          color: var(--accent-blue);
        }
        
        .github-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--border);
          border-radius: 0.375rem;
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .github-btn:hover {
          background-color: var(--bg-tertiary);
          border-color: var(--border-hover);
        }
        
        .github-btn svg {
          color: var(--accent-yellow);
        }
      `}</style>
        </header>
    );
}
