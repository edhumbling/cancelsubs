'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: 'Is my data safe?',
        answer: 'Yes! Your bank statements are processed entirely in your browser. No data is ever sent to our servers or stored anywhere. When you close the tab, everything is gone.',
    },
    {
        question: 'What file formats do you support?',
        answer: 'We support CSV exports from most major banks (Chase, Bank of America, Apple Card, etc.) and PDF statements. CSV typically works better for accurate detection.',
    },
    {
        question: 'How does the subscription detection work?',
        answer: 'We analyze your transactions looking for recurring patterns — similar amounts charged at regular intervals. We also check against a database of known subscription services.',
    },
    {
        question: 'Why do some subscriptions show as "Investigate"?',
        answer: 'If we\'re not 100% sure something is a subscription, we mark it for investigation. This helps you double-check before making any decisions.',
    },
    {
        question: 'Does this actually cancel my subscriptions?',
        answer: 'No, Cancel Subs only identifies your subscriptions and helps you organize them. You\'ll need to cancel services yourself through their respective platforms.',
    },
    {
        question: 'How many months of statements should I upload?',
        answer: 'We recommend 2-3 months of statements. This helps identify monthly subscriptions accurately and catch yearly charges that might only appear once.',
    },
    {
        question: 'Is there a cost to use Cancel Subs?',
        answer: 'The basic subscription finder is free. We may offer premium features in the future, but the core functionality will always be free.',
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main>
            <Header />

            <article className="content">
                <Link href="/" className="back-link">← Back to home</Link>

                <h1>Frequently Asked Questions</h1>
                <p className="subtitle">Everything you need to know about Cancel Subs</p>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span className="icon">{openIndex === index ? '−' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="contact-section">
                    <h2>Still have questions?</h2>
                    <p>
                        Reach out to us at{' '}
                        <a href="mailto:hello@cancelsubs.io">hello@cancelsubs.io</a>
                    </p>
                </div>
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
        
        .subtitle {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .faq-item {
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .faq-item.open {
          border-color: var(--border-hover);
        }
        
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1rem 1.25rem;
          background-color: var(--bg-secondary);
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
          text-align: left;
        }
        
        .faq-question:hover {
          background-color: var(--bg-tertiary);
        }
        
        .icon {
          font-size: 1.25rem;
          color: var(--text-muted);
        }
        
        .faq-answer {
          padding: 1rem 1.25rem;
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border);
        }
        
        .faq-answer p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        
        .contact-section {
          margin-top: 3rem;
          padding: 2rem;
          background-color: var(--bg-secondary);
          border-radius: 0.5rem;
          text-align: center;
        }
        
        .contact-section h2 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .contact-section p {
          color: var(--text-secondary);
          margin: 0;
        }
        
        .contact-section a {
          color: var(--accent-blue);
        }
      `}</style>
        </main>
    );
}
