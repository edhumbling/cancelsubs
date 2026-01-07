'use client';

import { useRef } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { parseCSV } from '@/lib/csvParser';
import { detectSubscriptions } from '@/lib/subscriptionDetector';
import { AnalysisResult } from '@/lib/types';

interface FileUploadZoneProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

export default function FileUploadZone({ onAnalysisComplete }: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    uploadState,
    files,
    error,
    handleFiles,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useFileUpload();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // Process files when upload is complete
  const processFiles = async () => {
    if (files.length === 0) return;

    // Combine all transactions from all files
    const allTransactions = files.flatMap(file => {
      const parsed = parseCSV(file.content);
      return parsed.transactions;
    });

    try {
      // Call Groq API for smarter analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions: allTransactions }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();

      // Calculate totals from AI results
      const aiSubscriptions = data.subscriptions;

      const totalMonthly = aiSubscriptions
        .filter((s: any) => s.frequency === 'monthly')
        .reduce((sum: number, s: any) => sum + s.amount, 0);

      const totalYearly = aiSubscriptions
        .filter((s: any) => s.frequency === 'yearly')
        .reduce((sum: number, s: any) => sum + s.amount, 0) + (totalMonthly * 12);

      const potentialSavings = aiSubscriptions
        .filter((s: any) => s.category === 'cancel')
        .reduce((sum: number, s: any) => {
          const yearly = s.frequency === 'yearly' ? s.amount : s.amount * 12;
          return sum + yearly;
        }, 0);

      const result: AnalysisResult = {
        subscriptions: aiSubscriptions,
        totalMonthly,
        totalYearly,
        potentialSavings,
        analyzedTransactions: allTransactions.length,
      };

      onAnalysisComplete?.(result);
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback to local detection if API fails
      const localResult = detectSubscriptions(allTransactions);
      onAnalysisComplete?.(localResult);
    }
  };

  // Trigger processing when files are ready
  if (uploadState === 'complete' && files.length > 0 && onAnalysisComplete) {
    setTimeout(processFiles, 100);
  }

  const getStateClass = () => {
    switch (uploadState) {
      case 'dragging': return 'dropzone dragging';
      case 'uploading': return 'dropzone uploading';
      case 'processing': return 'dropzone processing';
      case 'error': return 'dropzone error';
      default: return 'dropzone';
    }
  };

  return (
    <div className="upload-container">
      <div
        className={getStateClass()}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.pdf"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />

        {uploadState === 'processing' ? (
          <div className="content">
            <div className="spinner"></div>
            <p className="primary-text">Analyzing your statements...</p>
            <p className="secondary-text">Finding subscriptions</p>
          </div>
        ) : uploadState === 'error' ? (
          <div className="content">
            <p className="primary-text error-text">{error}</p>
            <p className="secondary-text">Click to try again</p>
          </div>
        ) : (
          <div className="content">
            <p className="primary-text">Drop your last 2-3 months of statements</p>
            <p className="secondary-text">CSV or PDF from any bank • Takes under 90 seconds</p>
          </div>
        )}
      </div>

      <p className="privacy-note">
        Your files are analyzed and immediately discarded. Nothing is stored.
      </p>

      <style jsx>{`
        .upload-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }
        
        .dropzone {
          position: relative;
          padding: 4rem 2rem;
          border: 2px dashed var(--border-dashed);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }
        
        .dropzone:hover,
        .dropzone.dragging {
          border-color: var(--accent-blue);
          background-color: rgba(59, 130, 246, 0.05);
        }
        
        .dropzone.processing {
          border-color: var(--accent-blue);
          cursor: wait;
        }
        
        .dropzone.error {
          border-color: var(--accent-red);
        }
        
        .file-input {
          display: none;
        }
        
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .primary-text {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .secondary-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        
        .error-text {
          color: var(--accent-red);
        }
        
        .privacy-note {
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 1rem;
        }
        
        .spinner {
          width: 24px;
          height: 24px;
          border: 2px solid var(--border);
          border-top-color: var(--accent-blue);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 0.5rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
