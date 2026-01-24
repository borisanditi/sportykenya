'use client';

import Script from 'next/script';




declare global {
    namespace JSX {
        interface IntrinsicElements {
            'api-sports-widget': any;
        }
    }
}

interface FootballDashboardProps {
    apiKey?: string;
}

export function FootballDashboard({ apiKey }: FootballDashboardProps) {
    console.log('FootballDashboard: API Key status:', apiKey ? 'Present' : 'Missing');
    if (!apiKey) {
        console.warn('FootballDashboard: No API key provided');
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-bold mb-4 text-brand-black">Premier League Standings</h2>
            <div id="epl-standings" className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
                <api-sports-widget
                    data-type="standings"
                    data-league="39"
                    data-season="2025" // Using 2024 for the current season usually, but user said 2025. I'll stick to user request or check current date. 2026-01-23 means 2025-2026 season? Or 2025 season. User said 2025.
                    data-key={apiKey}
                    data-theme="dark"
                    className="w-full"
                ></api-sports-widget>
            </div>
            <Script
                src="https://widgets.api-sports.io/2.0.3/widgets.js"
                type="module"
                strategy="afterInteractive"
            />
        </div>
    );
}
