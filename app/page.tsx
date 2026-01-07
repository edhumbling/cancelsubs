'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Hero from '@/components/Hero';
import FileUploadZone from '@/components/FileUploadZone';
import AnalysisResults from '@/components/AnalysisResults';
import TestimonialsGrid from '@/components/TestimonialsGrid';
import Footer from '@/components/Footer';
import SubscriptionWizard from '@/components/SubscriptionWizard';
import { AnalysisResult, Subscription } from '@/lib/types';

type AppState = 'upload' | 'wizard' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [pendingSubscriptions, setPendingSubscriptions] = useState<Subscription[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    // Instead of going directly to results, show the wizard first
    setPendingSubscriptions(result.subscriptions);
    setAnalysisResult(result);
    setAppState('wizard');
  };

  const handleWizardComplete = (categorizedSubscriptions: Subscription[]) => {
    if (analysisResult) {
      // Update the result with user-categorized subscriptions
      const updatedResult: AnalysisResult = {
        ...analysisResult,
        subscriptions: categorizedSubscriptions,
        // Recalculate potential savings based on user decisions
        potentialSavings: categorizedSubscriptions
          .filter(s => s.category === 'cancel')
          .reduce((sum, s) => {
            const yearly = s.frequency === 'yearly' ? s.amount : s.amount * 12;
            return sum + yearly;
          }, 0)
      };
      setAnalysisResult(updatedResult);
    }
    setAppState('results');
  };

  const handleWizardCancel = () => {
    // Skip wizard and go directly to results with AI suggestions
    setAppState('results');
  };

  const handleReset = () => {
    setAppState('upload');
    setAnalysisResult(null);
    setPendingSubscriptions([]);
  };

  return (
    <main>
      <Header />
      <AnnouncementBanner />
      <Hero />

      {appState === 'results' && analysisResult ? (
        <AnalysisResults result={analysisResult} onReset={handleReset} />
      ) : appState === 'upload' ? (
        <FileUploadZone onAnalysisComplete={handleAnalysisComplete} />
      ) : null}

      {appState === 'wizard' && pendingSubscriptions.length > 0 && (
        <SubscriptionWizard
          subscriptions={pendingSubscriptions}
          onComplete={handleWizardComplete}
          onCancel={handleWizardCancel}
        />
      )}

      <div className="divider"></div>

      <TestimonialsGrid />
      <Footer />

      <style jsx>{`
        main {
          min-height: 100vh;
        }
        
        .divider {
          max-width: var(--container-max);
          margin: 3rem auto;
          padding: 0 var(--container-padding);
        }
        
        .divider::after {
          content: '';
          display: block;
          height: 1px;
          background-color: var(--border);
        }
      `}</style>
    </main>
  );
}
