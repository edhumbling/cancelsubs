import { Transaction } from './types';

// Common subscription keywords to help identify recurring charges
const SUBSCRIPTION_KEYWORDS = [
    'netflix', 'spotify', 'hulu', 'disney', 'hbo', 'amazon prime', 'apple',
    'google', 'youtube', 'adobe', 'microsoft', 'dropbox', 'slack', 'zoom',
    'notion', 'figma', 'canva', 'grammarly', 'linkedin', 'twitter', 'x premium',
    'github', 'heroku', 'vercel', 'aws', 'digitalocean', 'cloudflare',
    'gym', 'fitness', 'peloton', 'headspace', 'calm', 'audible', 'kindle',
    'openai', 'chatgpt', 'claude', 'anthropic', 'midjourney',
    'crunchyroll', 'paramount', 'peacock', 'espn', 'sling', 'fubo',
    'doordash', 'uber', 'lyft', 'instacart', 'grubhub',
    'patreon', 'substack', 'medium', 'new york times', 'washington post',
    'icloud', 'google one', 'onedrive', '1password', 'lastpass', 'nordvpn',
    'expressvpn', 'surfshark', 'dashlane', 'bitwarden'
];

export interface ParsedCSV {
    headers: string[];
    rows: string[][];
    transactions: Transaction[];
}

/**
 * Parse CSV content into structured data
 */
export function parseCSV(content: string): ParsedCSV {
    const lines = content.trim().split(/\r?\n/);

    if (lines.length < 2) {
        return { headers: [], rows: [], transactions: [] };
    }

    // Parse headers
    const headers = parseCSVLine(lines[0]);

    // Parse data rows
    const rows = lines.slice(1).map(line => parseCSVLine(line));

    // Try to identify column mappings
    const columnMap = identifyColumns(headers);

    // Convert to transactions
    const transactions = rows
        .filter(row => row.length >= 3)
        .map(row => ({
            date: row[columnMap.date] || row[0] || '',
            description: row[columnMap.description] || row[1] || '',
            amount: parseAmount(row[columnMap.amount] || row[2] || '0'),
            category: row[columnMap.category] || undefined,
        }))
        .filter(t => t.description && !isNaN(t.amount));

    return { headers, rows, transactions };
}

/**
 * Parse a single CSV line handling quoted values
 */
function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

/**
 * Try to identify which columns contain date, description, and amount
 */
function identifyColumns(headers: string[]): { date: number; description: number; amount: number; category: number } {
    const lowerHeaders = headers.map(h => h.toLowerCase());

    return {
        date: lowerHeaders.findIndex(h =>
            h.includes('date') || h.includes('posted') || h.includes('transaction date')
        ),
        description: lowerHeaders.findIndex(h =>
            h.includes('description') || h.includes('merchant') || h.includes('name') || h.includes('payee')
        ),
        amount: lowerHeaders.findIndex(h =>
            h.includes('amount') || h.includes('debit') || h.includes('charge') || h.includes('total')
        ),
        category: lowerHeaders.findIndex(h =>
            h.includes('category') || h.includes('type')
        ),
    };
}

/**
 * Parse amount string to number
 */
function parseAmount(amountStr: string): number {
    // Remove currency symbols, parentheses (negative), and whitespace
    const cleaned = amountStr
        .replace(/[$€£¥]/g, '')
        .replace(/[()]/g, '-')
        .replace(/,/g, '')
        .trim();

    return Math.abs(parseFloat(cleaned)) || 0;
}

/**
 * Check if a description matches known subscription services
 */
export function isLikelySubscription(description: string): boolean {
    const lower = description.toLowerCase();
    return SUBSCRIPTION_KEYWORDS.some(keyword => lower.includes(keyword));
}

/**
 * Get subscription service name from description
 */
export function extractServiceName(description: string): string {
    const lower = description.toLowerCase();

    for (const keyword of SUBSCRIPTION_KEYWORDS) {
        if (lower.includes(keyword)) {
            // Capitalize first letter of each word
            return keyword.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
    }

    // Clean up the description for unknown services
    return description
        .replace(/[*#]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 30);
}
