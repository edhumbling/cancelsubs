'use client';

import { useEffect, useState } from 'react';

export default function ParsingAnimation() {
    const [progress, setProgress] = useState(0);
    const [log, setLog] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 1.5, 100));
        }, 30);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const logs = [
            'Initializing quantum matrix...',
            'Connecting to Groq Llama-3-8b...',
            'Parsing CSV structure...',
            'Decrypting transaction patterns...',
            'Identifying recurring charges...',
            'Analyzing frequencies...',
            'Calculating potential savings...',
            'Finalizing report...'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setLog(prev => [...prev.slice(-3), logs[i]]);
                i++;
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="parsing-container">
            <div className="scanner-line"></div>

            <div className="content">
                <div className="glitch-text" data-text="ANALYZING FINANCIAL DATA">
                    ANALYZING FINANCIAL DATA
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="terminal-logs">
                    {log.map((l, idx) => (
                        <div key={idx} className="log-line">
                            <span className="prompt">{'>'}</span> {l}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .parsing-container {
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                    padding: 3rem;
                    background: rgba(0, 0, 0, 0.8);
                    border: 1px solid var(--accent-blue);
                    border-radius: 4px;
                    overflow: hidden;
                    box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .scanner-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--accent-blue);
                    box-shadow: 0 0 10px var(--accent-blue);
                    animation: scan 1.5s linear infinite;
                    opacity: 0.5;
                }

                @keyframes scan {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }

                .glitch-text {
                    font-family: monospace;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--text-primary);
                    position: relative;
                    margin-bottom: 2rem;
                    letter-spacing: 2px;
                }

                .progress-bar-container {
                    width: 100%;
                    height: 4px;
                    background: var(--bg-tertiary);
                    margin-bottom: 1.5rem;
                    position: relative;
                    overflow: hidden;
                }

                .progress-bar {
                    height: 100%;
                    background: var(--accent-blue);
                    box-shadow: 0 0 10px var(--accent-blue);
                    transition: width 0.03s linear;
                }

                .terminal-logs {
                    width: 100%;
                    font-family: monospace;
                    font-size: 0.9rem;
                    color: var(--accent-green);
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .log-line {
                    opacity: 0;
                    animation: fadeIn 0.2s forwards;
                }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }

                .prompt {
                    color: var(--accent-blue);
                    margin-right: 0.5rem;
                }
            `}</style>
        </div>
    );
}
