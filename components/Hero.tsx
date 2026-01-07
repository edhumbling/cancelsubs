'use client';

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="title glitch" data-text="cancel subs">cancel subs</h1>
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
          font-size: clamp(3rem, 10vw, 5rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          position: relative;
        }

        .glitch {
            position: relative;
            color: var(--text-primary);
        }

        .glitch::before,
        .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .glitch::before {
            left: 2px;
            text-shadow: -1px 0 var(--accent-red);
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim-1 5s infinite linear alternate-reverse;
        }

        .glitch::after {
            left: -2px;
            text-shadow: -1px 0 var(--accent-blue);
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim-2 5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim-1 {
            0% { clip: rect(30px, 9999px, 10px, 0); }
            5% { clip: rect(70px, 9999px, 90px, 0); }
            10% { clip: rect(40px, 9999px, 20px, 0); }
            15% { clip: rect(90px, 9999px, 10px, 0); }
            20% { clip: rect(10px, 9999px, 80px, 0); }
            25% { clip: rect(60px, 9999px, 30px, 0); }
            30% { clip: rect(20px, 9999px, 50px, 0); }
            100% { clip: rect(0, 0, 0, 0); }
        }

        @keyframes glitch-anim-2 {
            0% { clip: rect(10px, 9999px, 80px, 0); }
            5% { clip: rect(30px, 9999px, 10px, 0); }
            10% { clip: rect(90px, 9999px, 20px, 0); }
            15% { clip: rect(10px, 9999px, 60px, 0); }
            20% { clip: rect(50px, 9999px, 90px, 0); }
            25% { clip: rect(20px, 9999px, 40px, 0); }
            30% { clip: rect(70px, 9999px, 30px, 0); }
            100% { clip: rect(0, 0, 0, 0); }
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
