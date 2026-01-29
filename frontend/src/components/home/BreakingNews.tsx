'use client';

import Link from 'next/link';

interface BreakingNewsItem {
    _id: string;
    title: string;
    slug: { current: string };
    articleSlug?: string;
    articleType?: string;
    externalLink?: string;
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
                        {[...news, ...news].map((item, index) => {
                            // Determine the link URL
                            let href = '#';
                            if (item.articleSlug && item.articleType) {
                                // Link to the actual article
                                if (item.articleType === 'footballArticle') {
                                    href = `/football/${item.articleSlug}`;
                                } else if (item.articleType === 'kenyanSportsArticle') {
                                    href = `/kenyan-sports/${item.articleSlug}`;
                                } else {
                                    href = `/news/${item.articleSlug}`;
                                }
                            } else if (item.externalLink) {
                                href = item.externalLink;
                            }

                            return (
                                <Link
                                    key={`${item._id}-${index}`}
                                    href={href}
                                    className="hover:underline inline-block"
                                    {...(item.externalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
