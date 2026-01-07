'use client';

import { useState } from 'react';
import { AnalysisResult, Subscription } from '@/lib/types';
import SubscriptionCard from './SubscriptionCard';

interface AnalysisResultsProps {
    result: AnalysisResult;
    onReset: () => void;
}

export default function AnalysisResults({ result, onReset }: AnalysisResultsProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [blurred, setBlurred] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        cancel: true,
        investigate: true,
        keep: false,
    });

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const toggleSection = (section: 'cancel' | 'investigate' | 'keep') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const copyToClipboard = () => {
        const selected = result.subscriptions.filter(s => selectedIds.has(s.id));
        const text = selected.map(s => `${s.name}: $${s.amount}/${s.frequency}`).join('\n');
        navigator.clipboard.writeText(text);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const cancelSubs = result.subscriptions.filter(s => s.category === 'cancel');
    const investigateSubs = result.subscriptions.filter(s => s.category === 'investigate');
    const keepSubs = result.subscriptions.filter(s => s.category === 'keep');

    const renderSection = (
        title: string,
        subs: Subscription[],
        key: 'cancel' | 'investigate' | 'keep',
        color: string
    ) => (
        <div className="section">
            <button
                className="section-header"
                onClick={() => toggleSection(key)}
            >
                <span className="section-title">
                    <span className="dot" style={{ backgroundColor: color }}></span>
                    {title}
                    <span className="count">({subs.length})</span>
                </span>
                <span className={`chevron ${expandedSections[key] ? 'expanded' : ''}`}>▼</span>
            </button>

            {expandedSections[key] && (
                <div className="section-content">
                    {subs.length === 0 ? (
                        <p className="empty">No subscriptions in this category</p>
                    ) : (
                        subs.map(sub => (
                            <SubscriptionCard
                                key={sub.id}
                                subscription={sub}
                                isSelected={selectedIds.has(sub.id)}
                                onToggle={toggleSelection}
                                blurred={blurred}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="results-container">
            <div className="results-header">
                <div className="stats">
                    <div className="stat">
                        <span className="stat-label">Analyzed</span>
                        <span className="stat-value">{result.analyzedTransactions} transactions</span>
                    </div>
                    <div className="stat highlight">
                        <span className="stat-label">Potential Savings</span>
                        <span className="stat-value savings">{formatCurrency(result.totalYearly)}/year</span>
                    </div>
                </div>

                <div className="actions">
                    <button className="action-btn" onClick={() => setBlurred(!blurred)}>
                        {blurred ? '👁️ Show' : '🔒 Blur'}
                    </button>
                    <button
                        className="action-btn"
                        onClick={copyToClipboard}
                        disabled={selectedIds.size === 0}
                    >
                        📋 Copy ({selectedIds.size})
                    </button>
                    <button className="action-btn secondary" onClick={onReset}>
                        ↺ Start Over
                    </button>
                </div>
            </div>

            <div className="sections">
                {renderSection('Cancel', cancelSubs, 'cancel', 'var(--accent-red)')}
                {renderSection('Investigate', investigateSubs, 'investigate', 'var(--accent-yellow)')}
                {renderSection('Keep', keepSubs, 'keep', 'var(--accent-green)')}
            </div>

            <style jsx>{`
        .results-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }
        
        .results-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        @media (min-width: 640px) {
          .results-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        
        .stats {
          display: flex;
          gap: 2rem;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .stat-value {
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .stat-value.savings {
          color: var(--accent-green);
          font-size: 1.25rem;
        }
        
        .actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--border);
          border-radius: 0.375rem;
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .action-btn:hover:not(:disabled) {
          border-color: var(--border-hover);
          background-color: var(--border);
        }
        
        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .action-btn.secondary {
          background-color: transparent;
          color: var(--text-secondary);
        }
        
        .sections {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .section {
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1rem;
          background-color: var(--bg-secondary);
          border: none;
          cursor: pointer;
          color: var(--text-primary);
          font-size: 1rem;
          text-align: left;
        }
        
        .section-header:hover {
          background-color: var(--bg-tertiary);
        }
        
        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .count {
          font-weight: 400;
          color: var(--text-muted);
        }
        
        .chevron {
          font-size: 0.75rem;
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }
        
        .chevron.expanded {
          transform: rotate(180deg);
        }
        
        .section-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          background-color: var(--bg-primary);
        }
        
        .empty {
          color: var(--text-muted);
          font-size: 0.875rem;
          text-align: center;
          padding: 1rem;
        }
      `}</style>
        </div>
    );
}
