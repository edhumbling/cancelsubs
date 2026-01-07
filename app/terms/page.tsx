'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main>
      <Header />

      <article className="content">
        <Link href="/" className="back-link">← Back to home</Link>

        <h1>Terms of Service</h1>
        <p className="updated">Last updated: January 2026</p>

        <section>
          <h2>Welcome</h2>
          <p>
            By using Cancel Subs, you agree to these terms. They&apos;re pretty simple
            and designed to protect both you and us.
          </p>
        </section>

        <section>
          <h2>What Cancel Subs Does</h2>
          <p>
            Cancel Subs analyzes your bank statements to identify recurring subscriptions.
            We help you find what you&apos;re paying for — what you do with that information
            is up to you.
          </p>
        </section>

        <section>
          <h2>Your Responsibilities</h2>
          <ul>
            <li>Only upload your own bank statements</li>
            <li>Use the service for personal, non-commercial purposes</li>
            <li>Don&apos;t try to break or abuse the service</li>
          </ul>
        </section>

        <section>
          <h2>Accuracy Disclaimer</h2>
          <p>
            Our subscription detection is based on pattern matching and may not be 100%
            accurate. Always verify before canceling any service. We&apos;re a tool to help
            you identify potential subscriptions, not financial advice.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            Cancel Subs is provided &ldquo;as is&rdquo; without warranties. We&apos;re not responsible
            for any decisions you make based on the analysis, including accidentally
            canceling something important.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We may update these terms occasionally. Continued use of the service
            after changes means you accept the new terms.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions? Email us at{' '}
            <a href="mailto:hello@cancelsubs.io">hello@cancelsubs.io</a>
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
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent-blue);
        }
        
        a {
          color: var(--accent-blue);
        }
      `}</style>
    </main>
  );
}
