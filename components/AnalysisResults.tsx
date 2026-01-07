'use client';

import { useState } from 'react';
import { AnalysisResult, Subscription } from '@/lib/types';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function AnalysisResults({ result, onReset }: AnalysisResultsProps) {
  const [blurred, setBlurred] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    cancel: true,
    investigate: true,
    keep: false,
  });

  const toggleSection = (section: 'cancel' | 'investigate' | 'keep') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = () => {
    if (!result) return;
    const cancelList = result.subscriptions
      .filter(s => s.category === 'cancel')
      .map(s => `${s.name}: $${s.amount}/${s.frequency}`)
      .join('\n');
    navigator.clipboard.writeText(cancelList);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!result) return null; // Safety check for load state

  const cancelSubs = result.subscriptions.filter(s => s.category === 'cancel');
  const investigateSubs = result.subscriptions.filter(s => s.category === 'investigate');
  const keepSubs = result.subscriptions.filter(s => s.category === 'keep');

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).split('/').join('.'); // 01.07.2026 style

  // MILITANT TABLE RENDERER
  const renderMilitantTable = (subs: Subscription[], isCancelled: boolean = false) => (
    <div className="militant-table-wrapper">
      <table className="militant-table">
        <thead>
          <tr>
            <th className="col-check">OPT</th>
            <th className="col-service">SERVICE_ID</th>
            <th className="col-cost">COST_MO</th>
            <th className="col-status">CURRENT_STATUS</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((sub, idx) => (
            <tr key={sub.id} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td className="col-check">
                <span className="check-box">☒</span>
              </td>
              <td className="col-service">
                <div className={`service-name ${isCancelled ? 'strike' : ''} ${blurred ? 'blur' : ''}`}>
                  {sub.name.toUpperCase()}
                </div>
                <div className="service-sub">ID: {sub.id.toUpperCase()}</div>
              </td>
              <td className={`col-cost ${isCancelled ? 'strike' : ''}`}>
                <span className="mono-num">${Math.round(sub.frequency === 'yearly' ? sub.amount / 12 : sub.amount)}</span>
              </td>
              <td className="col-status">
                {sub.cancelUrl ? (
                  <a
                    href={sub.cancelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="militant-link"
                  >
                    [ TERMINATE ]
                  </a>
                ) : (
                  <span className="status-pending">PENDING_ACTION</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSection = (
    title: string,
    subs: Subscription[],
    key: 'cancel' | 'investigate' | 'keep',
    accentColor: string
  ) => (
    <div className="militant-section" style={{ borderColor: accentColor }}>
      <button
        className="section-header"
        onClick={() => toggleSection(key)}
        style={{ borderLeft: `4px solid ${accentColor}` }}
      >
        <div className="header-content">
          <span className="section-title">
            {`> ${title.toUpperCase()}`}
          </span>
          <span className="count-badge" style={{ backgroundColor: accentColor, color: '#000' }}>
            {subs.length.toString().padStart(2, '0')}
          </span>
        </div>
        <span className={`chevron ${expandedSections[key] ? 'expanded' : ''}`}>▼</span>
      </button>

      {expandedSections[key] && subs.length > 0 && (
        <div className="section-content">
          {renderMilitantTable(subs, key === 'cancel')}
        </div>
      )}
    </div>
  );

  return (
    <div className="results-container">
      {/* MILITANT HEADER */}
      <div className="militant-header">
        <div className="header-meta">
          <span>RUNTIME: {formattedDate}</span>
          <span>TARGETS: {result.subscriptions.length}</span>
          <span>SCAN_DEPTH: {result.analyzedTransactions} TXNS</span>
        </div>

        <h1 className="mission-title">
          MISSION REPORT: <span className="highlight-save">SAVED {formatCurrency(result.potentialSavings)}/YR</span>
        </h1>

        <div className="status-bar">
          <div className="stat-block">
            <span className="label">ELIMINATED</span>
            <span className="value" style={{ color: 'var(--accent-green)' }}>{cancelSubs.length}</span>
          </div>
          <div className="stat-block">
            <span className="label">RETAINED</span>
            <span className="value" style={{ color: 'var(--accent-blue)' }}>{keepSubs.length}</span>
          </div>
        </div>
      </div>

      {/* ACTION GRID */}
      <div className="action-grid">
        <button className="militant-btn" onClick={() => setBlurred(!blurred)}>
          {blurred ? '[ REVEAL INTEL ]' : '[ REDACT INTEL ]'}
        </button>
        <button className="militant-btn" onClick={copyToClipboard}>
          [ COPY REPORT ]
        </button>
        <button className="militant-btn warning" onClick={onReset}>
          [ ABORT / RESET ]
        </button>
      </div>

      <div className="cyber-divider"></div>

      <div className="sections-wrapper">
        {renderSection('ELIMINATION TARGETS', cancelSubs, 'cancel', 'var(--accent-green)')}
        {renderSection('UNKNOWN ENTITIES', investigateSubs, 'investigate', 'var(--accent-yellow)')}
        {renderSection('AUTHORIZED ASSETS', keepSubs, 'keep', 'var(--accent-blue)')}
      </div>

      <style jsx>{`
                .results-container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 2rem var(--container-padding);
                    font-family: 'Inter', monospace;
                }

                .militant-header {
                    margin-bottom: 2rem;
                    border-left: 2px solid var(--border);
                    padding-left: 1.5rem;
                }

                .header-meta {
                    display: flex;
                    gap: 1.5rem;
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    font-family: monospace;
                    margin-bottom: 0.5rem;
                }

                .mission-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 900;
                    text-transform: uppercase;
                    line-height: 1;
                    letter-spacing: -1px;
                    margin-bottom: 1rem;
                }

                .highlight-save {
                    color: var(--accent-green);
                    text-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
                }

                .status-bar {
                    display: flex;
                    gap: 2rem;
                    font-family: monospace;
                }

                .stat-block {
                    display: flex;
                    gap: 0.5rem;
                    align-items: baseline;
                }

                .stat-block .label {
                    color: var(--text-secondary);
                    font-size: 0.8rem;
                }

                .stat-block .value {
                    font-weight: bold;
                    font-size: 1.2rem;
                }

                /* ACTION GRID */
                .action-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .militant-btn {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    color: var(--text-primary);
                    padding: 0.75rem 1rem;
                    font-family: monospace;
                    font-size: 0.8rem;
                    cursor: pointer;
                    text-transform: uppercase;
                    transition: all 0.2s;
                    letter-spacing: 1px;
                }

                .militant-btn:hover {
                    background: var(--text-primary);
                    color: var(--bg-primary);
                    border-color: var(--text-primary);
                }

                .militant-btn.warning:hover {
                    border-color: var(--accent-red);
                    color: var(--accent-red);
                    background: transparent;
                }

                .cyber-divider {
                    height: 2px;
                    background: repeating-linear-gradient(
                        90deg,
                        var(--border) 0,
                        var(--border) 10px,
                        transparent 10px,
                        transparent 20px
                    );
                    margin-bottom: 2rem;
                }

                /* MILITANT TABLE STYLES */
                .militant-section {
                    margin-bottom: 1rem;
                    border: 1px solid var(--border);
                    background: var(--bg-secondary);
                }

                .section-header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: var(--bg-tertiary);
                    border: none;
                    cursor: pointer;
                    color: var(--text-primary);
                }

                .section-header:hover {
                    filter: brightness(1.2);
                }

                .header-content {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .section-title {
                    font-family: monospace;
                    font-weight: bold;
                    letter-spacing: 1px;
                }

                .count-badge {
                    padding: 2px 6px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    border-radius: 2px;
                }

                .section-content {
                    padding: 0;
                }

                .militant-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: monospace;
                    font-size: 0.85rem;
                }

                .militant-table th {
                    text-align: left;
                    padding: 0.75rem 1rem;
                    color: var(--text-muted);
                    border-bottom: 1px solid var(--border);
                    font-weight: normal;
                }

                .militant-table td {
                    padding: 1rem;
                    border-bottom: 1px solid var(--border);
                    vertical-align: middle;
                }

                .row-even { background: var(--bg-secondary); }
                .row-odd { background: var(--bg-primary); }

                .col-check { width: 40px; text-align: center; color: var(--text-muted); }
                .col-cost { text-align: right; width: 100px; }
                .col-status { width: 150px; text-align: right; }

                .service-name {
                    font-weight: bold;
                    letter-spacing: 0.5px;
                    margin-bottom: 2px;
                }
                
                .service-sub {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                }

                .check-box { opacity: 0.5; }

                .strike {
                    text-decoration: line-through;
                    opacity: 0.5;
                }

                .blur { filter: blur(4px); }

                .mono-num {
                    font-family: monospace;
                    letter-spacing: -0.5px;
                }

                .militant-link {
                    display: inline-block;
                    border: 1px solid var(--accent-red);
                    color: var(--accent-red);
                    padding: 4px 8px;
                    font-size: 0.7rem;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .militant-link:hover {
                    background: var(--accent-red);
                    color: black;
                }

                .status-pending {
                    color: var(--text-muted);
                    font-size: 0.7rem;
                }

                .chevron { transition: transform 0.2s; }
                .chevron.expanded { transform: rotate(180deg); }

                @media (max-width: 600px) {
                    .col-status { display: none; }
                    .mission-title { font-size: 1.5rem; }
                }
            `}</style>
    </div>
  );
}
