'use client';


import React from 'react';

export function EPLTable() {

    return (
        <section className="bg-white py-8 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-brand-black">
                        Premier League Standings
                    </h2>
                    <a
                        href="https://www.scoreaxis.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-brand-red transition-colors"
                    >
                        Live data by ScoreAxis
                    </a>
                </div>

                {/* ScoreAxis Widget Container */}
                <div className="w-full overflow-hidden rounded-lg border border-gray-100 bg-white">
                    <iframe
                        src="https://widgets.scoreaxis.com/api/football/league-table/6232265abf1fa71a672159ec?widgetId=mf96ml3i36fi&lang=en&teamLogo=1&tableLines=0&homeAway=1&header=1&position=1&goals=1&gamesCount=1&diff=1&winCount=1&drawCount=1&loseCount=1&lastGames=1&points=1&teamsLimit=all&links=1&font=heebo&fontSize=14&rowDensity=100&widgetWidth=auto&widgetHeight=auto&bodyColor=%23ffffff&textColor=%23141416&linkColor=%23141416&borderColor=%23ecf1f7&tabColor=%23f3f8fd"
                        style={{ width: '100%', height: '600px', border: 'none' }}
                        title="ScoreAxis EPL League Table"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
