'use client';

import { useEffect, useRef, useState } from 'react';

export function EPLTable() {
    const containerRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Check if script is already loaded
        if (typeof window === 'undefined' || !containerRef.current) return;

        const scriptId = 'scorebat-jssdk';

        // Only inject script if it doesn't exist
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://www.scorebat.com/embed/embed.js?v=arrv';
            script.async = true;

            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(script, firstScript);
        }
    }, []);

    return (
        <section className="bg-white py-8 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-brand-black">
                        Premier League Standings
                    </h2>
                    <a
                        href="https://www.scorebat.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-brand-red transition-colors"
                    >
                        Powered by ScoreBat
                    </a>
                </div>

                {/* ScoreBat Competition Widget Container */}
                <div className="relative">
                    <div
                        ref={containerRef}
                        className="w-full overflow-hidden rounded-lg border border-gray-100 bg-white transition-all duration-300"
                        style={{ height: isExpanded ? '760px' : '450px' }}
                    >
                        <iframe
                            src="https://www.scorebat.com/embed/competition/england-premier-league/?token=MjczOTM2XzE3NzAwNDc2NjhfMDQxODkyNjA5OWMzOGM1NTUzOGNmMWIxOTk1MGFkZTM1ZTJmNGZlZQ=="
                            frameBorder="0"
                            width="600"
                            height="760"
                            allowFullScreen
                            allow="autoplay; fullscreen"
                            style={{ width: '100%', height: '760px', overflow: 'hidden', display: 'block' }}
                            className="_scorebatEmbeddedPlayer_"
                            title="ScoreBat Premier League Widget"
                        ></iframe>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 w-full py-2 px-4 bg-brand-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        {isExpanded ? (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                Show Less
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                See Full Table
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
