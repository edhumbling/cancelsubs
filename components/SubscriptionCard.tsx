'use client';

import { Subscription } from '@/lib/types';

interface SubscriptionCardProps {
  subscription: Subscription;
  isSelected: boolean;
  onToggle: (id: string) => void;
  blurred: boolean;
}

export default function SubscriptionCard({
  subscription,
  isSelected,
  onToggle,
  blurred
}: SubscriptionCardProps) {
  const getCategoryColor = () => {
    switch (subscription.category) {
      case 'cancel': return 'var(--accent-red)';
      case 'keep': return 'var(--accent-green)';
      default: return 'var(--accent-yellow)';
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getFrequencyLabel = () => {
    switch (subscription.frequency) {
      case 'weekly': return '/week';
      case 'yearly': return '/year';
      default: return '/mo';
    }
  };

  return (
    <div className={`card ${isSelected ? 'selected' : ''}`}>
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(subscription.id)}
        />
        <span className="checkmark"></span>
      </label>

      <div className="info">
        <span className={`name ${blurred ? 'blurred' : ''}`}>
          {subscription.name}
        </span>
        <span className="description">{subscription.frequency}</span>
      </div>

      <div className="amount-section">
        <span className="amount">
          {formatAmount(subscription.amount)}
          <span className="frequency">{getFrequencyLabel()}</span>
        </span>
        <span className="category-badge" style={{ backgroundColor: getCategoryColor() }}>
          {subscription.category}
        </span>

        {subscription.cancelUrl && (
          <a
            href={subscription.cancelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cancel-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Cancel Now
          </a>
        )}
      </div>

      <style jsx>{`
        .card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .card:hover {
          border-color: var(--accent-blue);
          box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
          transform: translateY(-2px);
        }
        
        .card.selected {
          border-color: var(--accent-blue);
          background-color: rgba(0, 243, 255, 0.03);
          box-shadow: 0 0 20px rgba(0, 243, 255, 0.15);
        }
        
        .checkbox-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        
        .checkbox-wrapper input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        
        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid var(--border-hover);
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .checkbox-wrapper input:checked + .checkmark {
          background-color: var(--accent-blue);
          border-color: var(--accent-blue);
          box-shadow: 0 0 10px var(--accent-blue);
        }
        
        .checkbox-wrapper input:checked + .checkmark::after {
          content: '✓';
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        
        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 0;
        }
        
        .name {
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .name.blurred {
          filter: blur(6px);
          user-select: none;
        }
        
        .description {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: capitalize;
        }
        
        .amount-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }
        
        .amount {
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .frequency {
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--text-muted);
        }
        
        .category-badge {
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          color: white;
          letter-spacing: 0.05em;
        }

        .cancel-btn {
          margin-top: 0.5rem;
          padding: 0.25rem 0.75rem;
          background-color: transparent;
          border: 1px solid var(--accent-red);
          color: var(--accent-red);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 0.25rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .cancel-btn:hover {
          background-color: var(--accent-red);
          color: white;
        }
      `}</style>
    </div>
  );
}
