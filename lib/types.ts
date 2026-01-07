// Transaction Types
export interface Transaction {
    date: string;
    description: string;
    amount: number;
    category?: string;
}

// Subscription Detection
export interface Subscription {
    id: string;
    name: string;
    description: string;
    amount: number;
    frequency: 'monthly' | 'yearly' | 'weekly' | 'unknown';
    category: 'cancel' | 'keep' | 'investigate';
    transactions: Transaction[];
    logoUrl?: string;
    cancelUrl?: string;
}

// Analysis Results
export interface AnalysisResult {
    subscriptions: Subscription[];
    totalMonthly: number;
    totalYearly: number;
    potentialSavings: number;
    analyzedTransactions: number;
}

// File Upload State
export type UploadState = 'idle' | 'dragging' | 'uploading' | 'processing' | 'complete' | 'error';

export interface UploadedFile {
    name: string;
    size: number;
    type: string;
    content: string;
}

// Testimonial
export interface Testimonial {
    id: string;
    author: string;
    handle: string;
    avatarUrl: string;
    quote: string;
    savings?: number;
    views?: string;
    tweetUrl: string;
}
