'use client';

import { useState } from 'react';
import { Subscription } from '@/lib/types';

interface SubscriptionWizardProps {
    subscriptions: Subscription[];
    onComplete: (categorizedSubscriptions: Subscription[]) => void;
    onCancel: () => void;
}

export default function SubscriptionWizard({
    subscriptions,
    onComplete,
    onCancel
}: SubscriptionWizardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [categorized, setCategorized] = useState<Subscription[]>([]);

    const currentSub = subscriptions[currentIndex];
    const progress = ((currentIndex) / subscriptions.length) * 100;

    const handleDecision = (category: 'keep' | 'cancel' | 'investigate') => {
        const updated: Subscription = { ...currentSub, category };
        const newCategorized = [...categorized, updated];

        if (currentIndex === subscriptions.length - 1) {
            // Last one, complete wizard
            onComplete(newCategorized);
        } else {
            setCategorized(newCategorized);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handleSkip = () => {
        // Keep original category
        const newCategorized = [...categorized, currentSub];
        if (currentIndex === subscriptions.length - 1) {
            onComplete(newCategorized);
        } else {
            setCategorized(newCategorized);
            setCurrentIndex(prev => prev + 1);
        }
    };

    if (!currentSub) {
        return null;
    }

    return (
        <div className="wizard-overlay">
            <div className="wizard-container">
                <div className="wizard-header">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="progress-text">
                        {currentIndex + 1} of {subscriptions.length} subscriptions
                    </p>
                </div>

                <div className="wizard-content">
                    <div className="subscription-info">
                        <h2 className="subscription-name">{currentSub.name}</h2>
                        <div className="subscription-details">
                            <span className="amount">${currentSub.amount.toFixed(2)}</span>
                            <span className="frequency">/{currentSub.frequency}</span>
                        </div>
                        {currentSub.description && currentSub.description !== currentSub.name && (
                            <p className="description">{currentSub.description}</p>
                        )}
                    </div>

                    <p className="question">Do you want to keep this subscription?</p>

                    <div className="decision-buttons">
                        <button
                            className="btn-cancel"
                            onClick={() => handleDecision('cancel')}
                        >
                            <span className="icon">✕</span>
                            Cancel It
                        </button>
                        <button
                            className="btn-investigate"
                            onClick={() => handleDecision('investigate')}
                        >
                            <span className="icon">?</span>
                            Not Sure
                        </button>
                        <button
                            className="btn-keep"
                            onClick={() => handleDecision('keep')}
                        >
                            <span className="icon">✓</span>
                            Keep It
                        </button>
                    </div>

                    <button className="btn-skip" onClick={handleSkip}>
                        Skip (use AI suggestion)
                    </button>
                </div>

                <div className="wizard-footer">
                    <button className="btn-exit" onClick={onCancel}>
                        Exit Wizard
                    </button>
                </div>
            </div>

            <style jsx>{`
                .wizard-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1rem;
                }

                .wizard-container {
                    background: var(--bg-secondary);
                    border: 1px solid var(--accent-blue);
                    border-radius: 8px;
                    max-width: 500px;
                    width: 100%;
                    box-shadow: 0 0 40px rgba(0, 243, 255, 0.2);
                }

                .wizard-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--border);
                }

                .progress-bar {
                    height: 4px;
                    background: var(--bg-tertiary);
                    border-radius: 2px;
                    overflow: hidden;
                    margin-bottom: 0.75rem;
                }

                .progress-fill {
                    height: 100%;
                    background: var(--accent-blue);
                    box-shadow: 0 0 10px var(--accent-blue);
                    transition: width 0.3s ease;
                }

                .progress-text {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    text-align: center;
                }

                .wizard-content {
                    padding: 2rem;
                    text-align: center;
                }

                .subscription-info {
                    margin-bottom: 2rem;
                }

                .subscription-name {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                }

                .subscription-details {
                    font-size: 1.25rem;
                }

                .amount {
                    color: var(--accent-green);
                    font-weight: 600;
                }

                .frequency {
                    color: var(--text-muted);
                }

                .description {
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                }

                .question {
                    font-size: 1.125rem;
                    color: var(--text-primary);
                    margin-bottom: 1.5rem;
                }

                .decision-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .decision-buttons button {
                    flex: 1;
                    padding: 1rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                .icon {
                    font-size: 1.5rem;
                }

                .btn-cancel {
                    background: rgba(255, 0, 85, 0.1);
                    border: 1px solid var(--accent-red);
                    color: var(--accent-red);
                }

                .btn-cancel:hover {
                    background: rgba(255, 0, 85, 0.2);
                    box-shadow: 0 0 15px rgba(255, 0, 85, 0.3);
                }

                .btn-investigate {
                    background: rgba(252, 238, 10, 0.1);
                    border: 1px solid var(--accent-yellow);
                    color: var(--accent-yellow);
                }

                .btn-investigate:hover {
                    background: rgba(252, 238, 10, 0.2);
                    box-shadow: 0 0 15px rgba(252, 238, 10, 0.3);
                }

                .btn-keep {
                    background: rgba(10, 255, 0, 0.1);
                    border: 1px solid var(--accent-green);
                    color: var(--accent-green);
                }

                .btn-keep:hover {
                    background: rgba(10, 255, 0, 0.2);
                    box-shadow: 0 0 15px rgba(10, 255, 0, 0.3);
                }

                .btn-skip {
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 0.875rem;
                    padding: 0.5rem 1rem;
                    transition: color 0.2s;
                }

                .btn-skip:hover {
                    color: var(--text-secondary);
                }

                .wizard-footer {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid var(--border);
                    text-align: center;
                }

                .btn-exit {
                    background: transparent;
                    border: 1px solid var(--border);
                    color: var(--text-muted);
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.875rem;
                    transition: all 0.2s;
                }

                .btn-exit:hover {
                    border-color: var(--text-muted);
                    color: var(--text-secondary);
                }

                @media (max-width: 480px) {
                    .decision-buttons {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
}
