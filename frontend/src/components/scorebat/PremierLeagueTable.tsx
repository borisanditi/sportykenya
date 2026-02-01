'use client';

import { useEffect, useRef } from 'react';

export function PremierLeagueTable() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;

        const scriptSrc = 'https://www.scorebat.com/embed/standings/premier-league/';

        if (containerRef.current.querySelector(`script[src="${scriptSrc}"]`)) return;

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                const scriptToRemove = containerRef.current.querySelector(`script[src="${scriptSrc}"]`);
                if (scriptToRemove) {
                    containerRef.current.removeChild(scriptToRemove);
                }
            }
        };
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="bg-brand-black text-white px-6 py-3 border-b border-gray-800">
                <h3 className="text-lg font-bold">Premier League Table</h3>
            </div>

            <div
                ref={containerRef}
                className="p-4 min-h-[500px] bg-white"
            >
                <iframe
                    id="scorebat-standings-premier-league"
                    src="https://www.scorebat.com/embed/standings/premier-league/"
                    style={{ width: '100%', height: '500px', border: 'none', display: 'block' }}
                    className="_scorebat_standings_iframe"
                    title="Premier League Standings"
                ></iframe>
            </div>
        </div>
    );
}
