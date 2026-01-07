'use client';

import { Testimonial } from '@/lib/types';
import TestimonialCard from './TestimonialCard';

const testimonials: Testimonial[] = [
    {
        id: '1',
        author: 'Alex Chen',
        handle: '@alexchen',
        avatarUrl: '',
        quote: 'Found $800 worth of subscriptions I forgot about. This tool paid for itself instantly.',
        savings: 800,
        tweetUrl: '#',
    },
    {
        id: '2',
        author: 'Sarah Miller',
        handle: '@sarahm',
        avatarUrl: '',
        quote: 'Holy shit, I was still paying for a gym membership from 2 years ago. Thanks for this!',
        savings: 420,
        tweetUrl: '#',
    },
    {
        id: '3',
        author: 'Dev Marcus',
        handle: '@devmarcus',
        avatarUrl: '',
        quote: 'Finally cancelled all those random SaaS tools I signed up for during hackathons.',
        savings: 1200,
        tweetUrl: '#',
    },
    {
        id: '4',
        author: 'Jordan Lee',
        handle: '@jordanlee',
        avatarUrl: '',
        quote: 'Simple, fast, and actually works. Found duplicate subscriptions I somehow had.',
        tweetUrl: '#',
    },
    {
        id: '5',
        author: 'Emma Wilson',
        handle: '@emmaw',
        avatarUrl: '',
        quote: 'Was skeptical but this found 6 subscriptions I completely forgot existed. Mind blown.',
        savings: 2400,
        tweetUrl: '#',
    },
    {
        id: '6',
        author: 'Mike Thompson',
        handle: '@miket',
        avatarUrl: '',
        quote: 'Took 2 minutes and saved me $300/month. Best ROI ever.',
        savings: 3600,
        tweetUrl: '#',
    },
];

export default function TestimonialsGrid() {
    return (
        <section className="testimonials">
            <div className="container">
                <h2 className="title">Wall of Savings</h2>
                <p className="subtitle">Real savings from real people</p>

                <div className="grid">
                    {testimonials.map(testimonial => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>

                <div className="share-cta">
                    <a
                        href="https://twitter.com/intent/tweet?text=Just%20saved%20%24_____%2Fyr%20with%20cancelsubs.io"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Share your savings →
                    </a>
                </div>
            </div>

            <style jsx>{`
        .testimonials {
          padding: 4rem 0;
        }
        
        .container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }
        
        .title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .subtitle {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        @media (min-width: 640px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .share-cta {
          text-align: center;
          margin-top: 2rem;
        }
        
        .share-cta a {
          color: var(--accent-blue);
          font-weight: 500;
          transition: opacity 0.2s ease;
        }
        
        .share-cta a:hover {
          opacity: 0.8;
        }
      `}</style>
        </section>
    );
}
