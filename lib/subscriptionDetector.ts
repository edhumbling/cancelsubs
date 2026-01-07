import { Transaction, Subscription, AnalysisResult } from './types';
import { isLikelySubscription, extractServiceName } from './csvParser';

/**
 * Analyze transactions to detect recurring subscriptions
 */
export function detectSubscriptions(transactions: Transaction[]): AnalysisResult {
    // Group transactions by similar descriptions
    const grouped = groupSimilarTransactions(transactions);

    // Identify recurring patterns
    const subscriptions: Subscription[] = [];

    for (const [key, txns] of Object.entries(grouped)) {
        if (txns.length >= 2) {
            // Multiple occurrences suggest a subscription
            const subscription = analyzeGroup(key, txns);
            if (subscription) {
                subscriptions.push(subscription);
            }
        } else if (txns.length === 1 && isLikelySubscription(txns[0].description)) {
            // Single occurrence but matches known subscription
            const subscription = analyzeGroup(key, txns);
            if (subscription) {
                subscriptions.push(subscription);
            }
        }
    }

    // Sort by amount (highest first)
    subscriptions.sort((a, b) => b.amount - a.amount);

    // Calculate totals
    const totalMonthly = subscriptions
        .filter(s => s.frequency === 'monthly')
        .reduce((sum, s) => sum + s.amount, 0);

    const totalYearly = subscriptions
        .filter(s => s.frequency === 'yearly')
        .reduce((sum, s) => sum + s.amount, 0) + (totalMonthly * 12);

    const potentialSavings = subscriptions
        .filter(s => s.category === 'cancel')
        .reduce((sum, s) => {
            const yearly = s.frequency === 'yearly' ? s.amount : s.amount * 12;
            return sum + yearly;
        }, 0);

    return {
        subscriptions,
        totalMonthly,
        totalYearly,
        potentialSavings,
        analyzedTransactions: transactions.length,
    };
}

/**
 * Group transactions with similar descriptions
 */
function groupSimilarTransactions(transactions: Transaction[]): Record<string, Transaction[]> {
    const groups: Record<string, Transaction[]> = {};

    for (const txn of transactions) {
        const key = normalizeDescription(txn.description);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(txn);
    }

    return groups;
}

/**
 * Normalize description for grouping
 */
function normalizeDescription(description: string): string {
    return description
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 20);
}

/**
 * Analyze a group of similar transactions
 */
function analyzeGroup(key: string, transactions: Transaction[]): Subscription | null {
    if (transactions.length === 0) return null;

    const amounts = transactions.map(t => t.amount);
    const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length;

    // Skip very small amounts (likely not subscriptions)
    if (avgAmount < 1) return null;

    // Determine frequency based on dates
    const frequency = determineFrequency(transactions);

    // Auto-categorize based on known services
    const firstTxn = transactions[0];
    const serviceName = extractServiceName(firstTxn.description);
    const isKnown = isLikelySubscription(firstTxn.description);

    return {
        id: generateId(),
        name: serviceName,
        description: firstTxn.description,
        amount: Math.round(avgAmount * 100) / 100,
        frequency,
        category: isKnown ? 'investigate' : 'investigate',
        transactions,
    };
}

/**
 * Determine subscription frequency from transaction dates
 */
function determineFrequency(transactions: Transaction[]): 'monthly' | 'yearly' | 'weekly' | 'unknown' {
    if (transactions.length < 2) return 'monthly'; // Assume monthly for single transactions

    // Parse dates and calculate intervals
    const dates = transactions
        .map(t => new Date(t.date))
        .filter(d => !isNaN(d.getTime()))
        .sort((a, b) => a.getTime() - b.getTime());

    if (dates.length < 2) return 'unknown';

    // Calculate average interval in days
    let totalDays = 0;
    for (let i = 1; i < dates.length; i++) {
        const diff = dates[i].getTime() - dates[i - 1].getTime();
        totalDays += diff / (1000 * 60 * 60 * 24);
    }
    const avgDays = totalDays / (dates.length - 1);

    // Classify based on interval
    if (avgDays <= 10) return 'weekly';
    if (avgDays <= 45) return 'monthly';
    if (avgDays >= 300) return 'yearly';

    return 'monthly';
}

/**
 * Generate a unique ID
 */
function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}
