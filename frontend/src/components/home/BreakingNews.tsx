'use client';

import Link from 'next/link';

interface BreakingNewsItem {
    _id: string;
    title: string;
    slug: { current: string };
}

interface BreakingNewsProps {
    news: BreakingNewsItem[];
}

export function BreakingNews({ news = [] }: BreakingNewsProps) {
    if (!news.length) return null;

    return (
        <div className="bg-brand-red text-white text-sm font-medium py-2 overflow-hidden relative">
            <div className="container mx-auto flex items-center">
                <span className="bg-brand-red z-10 px-4 font-bold uppercase tracking-wider shrink-0">
                    Breaking News
                </span>
                <div className="flex-1 overflow-hidden relative h-5">
                    <div className="animate-marquee whitespace-nowrap absolute top-0 left-0 flex gap-8">
                        {/* Duplicate content for seamless loop */}
                        {[...news, ...news].map((item, index) => (
                            <Link key={`${item._id}-${index}`} href={`/news/${item.slug.current}`} className="hover:underline inline-block">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
