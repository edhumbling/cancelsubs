'use client';

export default function AnnouncementBanner() {
    return (
        <div className="banner">
            <div className="banner-content">
                <span className="badge">NEW</span>
                <span className="text">PDF support now available →</span>
            </div>

            <style jsx>{`
        .banner {
          max-width: var(--container-max);
          margin: 0 auto 2rem;
          padding: 0 var(--container-padding);
        }
        
        .banner-content {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          border: 2px dashed var(--border-dashed);
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.125rem 0.5rem;
          font-size: 0.625rem;
          font-weight: 700;
          background-color: var(--accent-blue);
          color: white;
          border-radius: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .text {
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
