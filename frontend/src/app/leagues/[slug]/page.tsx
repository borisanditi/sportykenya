import { notFound } from 'next/navigation';
import Link from 'next/link';

const SCOREBAT_TOKEN =
    'MjczOTM2XzE3NzAwNDc2NjhfMDQxODkyNjA5OWMzOGM1NTUzOGNmMWIxOTk1MGFkZTM1ZTJmNGZlZQ==';

const ALL_LEAGUES = [
    { name: 'Kenyan Premier League', slug: 'kenya-premier-league', flag: '🇰🇪', region: 'East Africa' },
    { name: 'Tanzania Ligi Kuu', slug: 'tanzainia-ligi-kuu-bara', flag: '🇹🇿', region: 'East Africa' },
    { name: 'Uganda Premier League', slug: 'uganda-premier-league', flag: '🇺🇬', region: 'East Africa' },
    { name: 'Premier League', slug: 'england-premier-league', region: 'Top Leagues', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg' },
    { name: 'La Liga', slug: 'spain-la-liga', region: 'Top Leagues', logo: 'https://media.api-sports.io/football/leagues/140.png' },
    { name: 'Serie A', slug: 'italy-serie-a', region: 'Top Leagues', logo: 'https://media.api-sports.io/football/leagues/135.png' },
    { name: 'Bundesliga', slug: 'germany-bundesliga', region: 'Top Leagues', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg' },
    { name: 'Ligue 1', slug: 'france-ligue-1', region: 'Top Leagues', logo: 'https://media.api-sports.io/football/leagues/61.png' },

];

export function generateStaticParams() {
    return ALL_LEAGUES.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const league = ALL_LEAGUES.find((l) => l.slug === slug);
    return {
        title: league ? `${league.name} | SportyKenya` : 'League | SportyKenya',
        description: league ? `Live scores, highlights and standings for ${league.name}` : '',
    };
}

export default async function LeaguePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const league = ALL_LEAGUES.find((l) => l.slug === slug);

    if (!league) notFound();

    const embedUrl = `https://www.scorebat.com/embed/competition/${league.slug}/?token=${SCOREBAT_TOKEN}`;

    const eastAfrica = ALL_LEAGUES.filter((l) => l.region === 'East Africa');
    const topLeagues = ALL_LEAGUES.filter((l) => l.region === 'Top Leagues');

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white">
            {/* Hero banner */}
            <div className="bg-brand-black border-b border-white/10 py-8 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    {league.flag && <span className="text-5xl">{league.flag}</span>}
                    {league.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={league.logo} alt={league.name} className="h-14 w-14 object-contain" />
                    )}
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{league.region}</p>
                        <h1 className="text-3xl font-extrabold">{league.name}</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                {/* Main widget */}
                <div className="flex-1">
                    <h2 className="text-lg font-bold mb-4 text-brand-gold uppercase tracking-wide">
                        Live Matches &amp; Highlights
                    </h2>
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
                        <iframe
                            src={embedUrl}
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            className="_scorebatEmbeddedPlayer_ w-full"
                            style={{ height: '760px', display: 'block' }}
                            title={`${league.name} ScoreBat widget`}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-right">
                        Powered by{' '}
                        <a href="https://www.scorebat.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                            ScoreBat
                        </a>
                    </p>
                </div>

                {/* Sidebar: other leagues */}
                <aside className="lg:w-64 flex-shrink-0">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                        🌍 East Africa
                    </h3>
                    <div className="space-y-1 mb-6">
                        {eastAfrica.map((l) => (
                            <SidebarLeague key={l.slug} league={l} active={l.slug === slug} />
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">
                            Top Leagues
                        </h3>
                        <div className="space-y-1">
                            {topLeagues.map((l) => (
                                <SidebarLeague key={l.slug} league={l} active={l.slug === slug} />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function SidebarLeague({
    league,
    active,
}: {
    league: (typeof ALL_LEAGUES)[number];
    active: boolean;
}) {
    return (
        <Link
            href={`/leagues/${league.slug}`}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${active
                    ? 'bg-brand-gold/20 text-brand-gold ring-1 ring-brand-gold/40'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
        >
            {league.flag && <span className="text-base">{league.flag}</span>}
            {!league.flag && league.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={league.logo} alt={league.name} className="h-5 w-5 object-contain flex-shrink-0" />
            )}
            <span className="flex-1 truncate">{league.name}</span>
            {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold flex-shrink-0" />
            )}
        </Link>
    );
}
