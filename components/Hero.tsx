'use client';

export default function Hero() {
    return (
        <section className="hero">
            <h1 className="title">cancel subs</h1>
            <p className="subtitle">Find and cancel forgotten subscriptions</p>

            <a
                href="https://github.com/yourusername/cancelsubs"
                target="_blank"
                rel="noopener noreferrer"
                className="stars-badge"
            >
                <svg
                    viewBox="0 0 16 16"
                    width="14"
                    height="14"
                    fill="currentColor"
                >
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                </svg>
                <span>269</span>
            </a>

            <style jsx>{`
        .hero {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 2rem var(--container-padding) 3rem;
          text-align: center;
        }
        
        .title {
          font-size: clamp(2.5rem, 10vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .subtitle {
          font-size: 1.125rem;
          color: var(--accent-blue);
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        
        .stars-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--border);
          border-radius: 9999px;
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .stars-badge:hover {
          background-color: var(--bg-tertiary);
          border-color: var(--border-hover);
        }
        
        .stars-badge svg {
          color: var(--accent-yellow);
        }
      `}</style>
        </section>
    );
}
