'use client';

import Image from 'next/image';
import { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <a
      href={testimonial.tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
    >
      <div className="header">
        <div className="avatar">
          {testimonial.avatarUrl ? (
            <Image src={testimonial.avatarUrl} alt={testimonial.author} width={40} height={40} />
          ) : (
            <span>{testimonial.author[0]}</span>
          )}
        </div>
        <div className="author-info">
          <span className="name">{testimonial.author}</span>
          <span className="handle">{testimonial.handle}</span>
        </div>
      </div>

      <p className="quote">&ldquo;{testimonial.quote}&rdquo;</p>

      {(testimonial.savings || testimonial.views) && (
        <div className="footer">
          {testimonial.savings && (
            <span className="savings">${testimonial.savings.toLocaleString()}/yr</span>
          )}
          {testimonial.views && (
            <span className="views">{testimonial.views} views</span>
          )}
        </div>
      )}

      <style jsx>{`
        .card {
          display: block;
          padding: 1.25rem;
          background-color: var(--bg-secondary);
          border: 2px dashed var(--border-dashed);
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }
        
        .header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .author-info {
          display: flex;
          flex-direction: column;
        }
        
        .name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .handle {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        
        .quote {
          font-size: 0.9375rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }
        
        .footer {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .savings {
          display: inline-flex;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--accent-green);
          color: white;
          border-radius: 0.25rem;
        }
        
        .views {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </a>
  );
}
