'use client';

import Link from 'next/link';
import { X } from 'lucide-react';

interface League {
    name: string;
    slug: string;
    flag?: string;
    logo?: string;
}

const EAST_AFRICA: League[] = [
    { name: 'Kenyan Premier League', slug: 'kenya-premier-league', flag: '🇰🇪' },
    { name: 'Tanzania Ligi Kuu', slug: 'tanzainia-ligi-kuu-bara', flag: '🇹🇿' },
    { name: 'Uganda Premier League', slug: 'uganda-premier-league', flag: '🇺🇬' },
];

const TOP_LEAGUES: League[] = [
    {
        name: 'Premier League',
        slug: 'england-premier-league',
        logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    },
    {
        name: 'La Liga',
        slug: 'spain-la-liga',
        logo: 'https://media.api-sports.io/football/leagues/140.png',
    },
    {
        name: 'Serie A',
        slug: 'italy-serie-a',
        logo: 'https://media.api-sports.io/football/leagues/135.png',
    },
    {
        name: 'Bundesliga',
        slug: 'germany-bundesliga',
        logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg',
    },
    {
        name: 'Ligue 1',
        slug: 'france-ligue-1',
        logo: 'https://media.api-sports.io/football/leagues/61.png',
    },
];

interface LeaguesDrawerProps {
    open: boolean;
    onClose: () => void;
}

export function LeaguesDrawer({ open, onClose }: LeaguesDrawerProps) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer panel */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-[#111] text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <span className="text-base font-bold tracking-wide uppercase text-brand-gold">
                        Leagues
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close leagues menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto">
                    {/* East Africa section */}
                    <div className="px-4 pt-5 pb-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-3 px-1">
                            🌍 East Africa
                        </p>
                        <div className="space-y-1">
                            {EAST_AFRICA.map((league) => (
                                <LeagueRow
                                    key={league.slug}
                                    league={league}
                                    onClose={onClose}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-3 border-t border-white/10" />

                    {/* Top Leagues section */}
                    <div className="px-4 pb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3 px-1">
                            Top Leagues
                        </p>
                        <div className="space-y-1">
                            {TOP_LEAGUES.map((league) => (
                                <LeagueRow
                                    key={league.slug}
                                    league={league}
                                    onClose={onClose}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer attribution */}
                <div className="px-5 py-3 border-t border-white/10 text-center">
                    <a
                        href="https://www.scorebat.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-brand-gold transition-colors"
                    >
                        Powered by ScoreBat
                    </a>
                </div>
            </div>
        </>
    );
}

function LeagueRow({
    league,
    onClose,
}: {
    league: League;
    onClose: () => void;
}) {
    return (
        <Link
            href={`/leagues/${league.slug}`}
            onClick={onClose}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 text-gray-200 hover:bg-white/10 hover:text-white group"
        >
            {league.flag && <span className="text-xl leading-none">{league.flag}</span>}
            {league.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={league.logo}
                    alt={league.name}
                    className="h-6 w-6 object-contain flex-shrink-0"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            )}
            <span className="text-sm font-medium flex-1">{league.name}</span>
            <svg
                className="h-4 w-4 text-gray-500 group-hover:text-brand-gold transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    );
}

export { EAST_AFRICA, TOP_LEAGUES };
export type { League };
