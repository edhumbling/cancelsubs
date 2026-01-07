'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main>
      <Header />

      <article className="content">
        <Link href="/" className="back-link">← Back to home</Link>

        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: January 2026</p>

        <section>
          <h2>Your Privacy Matters</h2>
          <p>
            At Cancel Subs, we believe your financial data should stay yours.
            Here&apos;s exactly what happens when you use our service:
          </p>
        </section>

        <section>
          <h2>What We DO NOT Store</h2>
          <ul>
            <li><strong>Your bank statements</strong> - Files are analyzed in your browser and immediately discarded</li>
            <li><strong>Transaction history</strong> - We never see or store your individual transactions</li>
            <li><strong>Personal financial data</strong> - Nothing about your spending habits leaves your device</li>
          </ul>
        </section>

        <section>
          <h2>How It Works</h2>
          <p>
            When you upload a statement, processing happens entirely in your browser.
            No data is sent to our servers. The analysis runs locally using JavaScript,
            and when you close the tab, everything is gone.
          </p>
        </section>

        <section>
          <h2>What We May Collect</h2>
          <ul>
            <li><strong>Anonymous analytics</strong> - Page views, feature usage (no personal data)</li>
            <li><strong>Error reports</strong> - If something breaks, we may log the error type (not your data)</li>
          </ul>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            We may use standard analytics tools like Plausible or similar privacy-focused
            alternatives. We do not use advertising trackers or sell any data.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about privacy? Email us at{' '}
            <a href="mailto:privacy@cancelsubs.io">privacy@cancelsubs.io</a>
          </p>
        </section>
      </article>

      <Footer />

      <style jsx>{`
        main {
          min-height: 100vh;
        }
        
        .content {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 2rem var(--container-padding) 4rem;
        }
        
        .back-link {
          display: inline-block;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 2rem;
        }
        
        .back-link:hover {
          color: var(--accent-blue);
        }
        
        h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .updated {
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-bottom: 2rem;
        }
        
        section {
          margin-bottom: 2rem;
        }
        
        h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        
        p {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        
        ul {
          list-style: none;
          padding: 0;
        }
        
        li {
          color: var(--text-secondary);
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.6;
        }
        
        li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-green);
        }
        
        li strong {
          color: var(--text-primary);
        }
        
        a {
          color: var(--accent-blue);
        }
      `}</style>
    </main>
  );
}
