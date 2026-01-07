'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Hero from '@/components/Hero';
import FileUploadZone from '@/components/FileUploadZone';
import AnalysisResults from '@/components/AnalysisResults';
import TestimonialsGrid from '@/components/TestimonialsGrid';
import Footer from '@/components/Footer';
import { AnalysisResult } from '@/lib/types';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <main>
      <Header />
      <AnnouncementBanner />
      <Hero />

      {analysisResult ? (
        <AnalysisResults result={analysisResult} onReset={handleReset} />
      ) : (
        <FileUploadZone onAnalysisComplete={handleAnalysisComplete} />
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
