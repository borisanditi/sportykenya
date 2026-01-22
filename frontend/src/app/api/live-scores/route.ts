import { NextResponse } from 'next/server';

// In-memory cache
let cache: {
    data: any;
    timestamp: number;
} | null = null;

const CACHE_DURATION = 60 * 1000; // 60 seconds

export async function GET() {
    try {
        // Check cache
        if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
            return NextResponse.json(cache.data);
        }

        const apiKey = process.env.RAPIDAPI_KEY;
        const apiHost = process.env.RAPIDAPI_HOST;

        if (!apiKey || !apiHost) {
            return NextResponse.json(
                { error: 'API configuration missing' },
                { status: 500 }
            );
        }

        // Fetch live Premier League matches from RapidAPI
        const response = await fetch(
            'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&live=all',
            {
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': apiHost,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`API-Football responded with status ${response.status}`);
        }

        const data = await response.json();

        // Filter and format the data
        const matches = data.response?.map((match: any) => ({
            homeTeam: match.teams?.home?.name || 'Unknown',
            awayTeam: match.teams?.away?.name || 'Unknown',
            homeScore: match.goals?.home ?? 0,
            awayScore: match.goals?.away ?? 0,
            status: match.fixture?.status?.short || 'NS',
            minute: match.fixture?.status?.elapsed || null,
            homeLogo: match.teams?.home?.logo || '',
            awayLogo: match.teams?.away?.logo || '',
        })) || [];

        // Update cache
        cache = {
            data: matches,
            timestamp: Date.now(),
        };

        return NextResponse.json(matches);
    } catch (error) {
        console.error('Error fetching live scores:', error);
        return NextResponse.json(
            { error: 'Failed to fetch live scores' },
            { status: 500 }
        );
    }
}
