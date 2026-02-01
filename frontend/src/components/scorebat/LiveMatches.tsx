'use client';

import { useEffect, useRef } from 'react';

export function LiveMatches() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent duplicate script injection
        if (typeof window === 'undefined' || !containerRef.current) return;

        // Define the script source
        const scriptSrc = 'https://www.scorebat.com/embed/livescore/';

        // Check if script is already present in this container
        if (containerRef.current.querySelector(`script[src="${scriptSrc}"]`)) return;

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;

        // Append script to the specific container
        containerRef.current.appendChild(script);

        // Cleanup: remove the script (optional, but good practice if the component unmounts)
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
        <section className="bg-white py-8 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-brand-black flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                        Live Football Scores
                    </h2>
                    <span className="text-xs text-gray-500">Powered by ScoreBat</span>
                </div>

                {/* ScoreBat Widget Container */}
                <div
                    ref={containerRef}
                    className="w-full overflow-hidden rounded-lg border border-gray-100 min-h-[600px] bg-gray-50"
                >
                    {/* The iframe will be injected here by the script */}
                    <iframe
                        id="scorebat-livescore"
                        src="https://www.scorebat.com/embed/livescore/"
                        style={{ width: '100%', height: '600px', border: 'none', display: 'block' }}
                        className="_scorebat_livescore_iframe"
                        title="Live Scores"
                    ></iframe>
                </div>

                <p className="text-xs text-center text-gray-400 mt-4">
                    Live match data and streaming provided by third-party services.
                </p>
            </div>
        </section>
    );
}
