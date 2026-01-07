'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a
                        href="https://twitter.com/intent/tweet?text=Just%20saved%20%24_____%2Fyr%20with%20cancelsubs.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-link"
                    >
                        Share your savings →
                    </a>
                </div>

                <nav className="footer-nav">
                    <Link href="/privacy">Privacy</Link>
                    <span className="separator">·</span>
                    <Link href="/terms">Terms</Link>
                    <span className="separator">·</span>
                    <Link href="/faq">FAQ</Link>
                    <span className="separator">·</span>
                    <a href="mailto:hello@cancelsubs.io">Contact</a>
                </nav>

                <p className="copyright">
                    © {currentYear} Cancel Subs
                </p>
            </div>

            <style jsx>{`
        .footer {
          padding: 3rem 0;
          margin-top: 4rem;
          border-top: 1px solid var(--border);
        }
        
        .footer-content {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
        }
        
        .footer-links {
          display: flex;
          gap: 1rem;
        }
        
        .share-link {
          color: var(--accent-blue);
          font-weight: 500;
          transition: opacity 0.2s ease;
        }
        
        .share-link:hover {
          opacity: 0.8;
        }
        
        .footer-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .footer-nav a {
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }
        
        .footer-nav a:hover {
          color: var(--text-primary);
        }
        
        .separator {
          color: var(--text-muted);
        }
        
        .copyright {
          color: var(--text-muted);
          font-size: 0.75rem;
        }
      `}</style>
        </footer>
    );
}
