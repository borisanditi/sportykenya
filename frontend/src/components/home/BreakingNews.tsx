'use client';

import Link from 'next/link';

// Mock data for now
const breakingNews = [
    { id: 1, title: "Harambee Stars qualify for AFCON 2027!", href: "/news/harambee-stars-afcon" },
    { id: 2, title: "Kipchoge sets new course record in Berlin", href: "/news/kipchoge-berlin" },
    { id: 3, title: "Gor Mahia wins the Mashemeji Derby 2-0", href: "/news/gor-mahia-wins" },
];

export function BreakingNews() {
    return (
        <div className="bg-brand-red text-white text-sm font-medium py-2 overflow-hidden relative">
            <div className="container mx-auto flex items-center">
                <span className="bg-brand-red z-10 px-4 font-bold uppercase tracking-wider shrink-0">
                    Breaking News
                </span>
                <div className="flex-1 overflow-hidden relative h-5">
                    <div className="animate-marquee whitespace-nowrap absolute top-0 left-0 flex gap-8">
                        {/* Duplicate content for seamless loop */}
                        {[...breakingNews, ...breakingNews].map((news, index) => (
                            <Link key={`${news.id}-${index}`} href={news.href} className="hover:underline inline-block">
                                {news.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
