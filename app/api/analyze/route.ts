import Groq from 'groq-sdk';
import { Transaction, Subscription } from '@/lib/types';
import { NextResponse } from 'next/server';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

interface AIResponseSubscription {
    name: string;
    amount: number;
    frequency: 'monthly' | 'yearly' | 'weekly' | 'unknown';
    category: 'cancel' | 'keep' | 'investigate';
    cancel_url?: string;
}

export async function POST(req: Request) {
    try {
        const { transactions }: { transactions: Transaction[] } = await req.json();

        if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
            return NextResponse.json({ error: 'No transactions provided' }, { status: 400 });
        }

        // Limit to 200 transactions per batch to fit in context/avoid time limits
        const batch = transactions.slice(0, 200).map((t: Transaction) =>
            `${t.date} | ${t.description} | $${t.amount}`
        ).join('\n');

        const prompt = `
      Analyze these bank transactions and identify RECURRING SUBSCRIPTIONS.
      Ignore one-off purchases (like coffee, groceries, gas, transfers).
      
      Look for:
      - SaaS: Netflix, Spotify, Adobe, Zoom, Dropbox, etc.
      - Utilities: Electric, Water, Internet, Phone
      - Memberships: Gym, Clubs
      - Recurring services: Insurance, Loans
      
      Return ONLY a JSON object with a "subscriptions" array.
      Each item should have:
      - name: Clean service name (e.g. "Netflix")
      - amount: The monthly cost
      - frequency: 'monthly' or 'yearly'
      - category: 'cancel' (junk/unused), 'keep' (utilities/essential), or 'investigate' (unsure)
      - cancel_url: The direct cancellation URL for the service (e.g. "https://www.netflix.com/cancelplan"). If unknown, provide a Google Search URL query for "how to cancel [Service Name]".
      
      Transactions:
      ${batch}
    `;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a financial assistant that identifies subscriptions from bank statements. Output valid JSON only.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0,
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            throw new Error('No response from AI');
        }

        const result = JSON.parse(content);

        // Add IDs and ensure valid structure
        const subscriptions: Subscription[] = (result.subscriptions || []).map((sub: AIResponseSubscription) => ({
            id: Math.random().toString(36).substring(2, 9),
            name: sub.name || 'Unknown Subscription',
            description: sub.name, // Use name as description since we don't have original txn link easily
            amount: Number(sub.amount) || 0,
            frequency: sub.frequency || 'monthly',
            category: sub.category || 'investigate',
            cancelUrl: sub.cancel_url,
            transactions: [], // We can't easily link back to original txns in this batch mode without more complexity
        }));

        return NextResponse.json({ subscriptions });
    } catch (error) {
        console.error('Groq Analysis Error:', error);
        return NextResponse.json({ error: 'Failed to analyze transactions' }, { status: 500 });
    }
}
