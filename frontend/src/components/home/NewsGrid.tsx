'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Category {
    title: string;
    slug: { current: string };
    color?: string;
}

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
    publishedAt: string;
    excerpt: string;
    categories: Category[];
}

interface NewsGridProps {
    posts: Post[];
}

export function NewsGrid({ posts = [] }: NewsGridProps) {
    if (!posts.length) return null;

    return (
        <section className="py-12 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Section Header */}
                <div className="bg-brand-black text-white px-4 py-2 flex items-center justify-between mb-6">
                    <h2 className="font-bold uppercase tracking-wider text-sm">Top News</h2>
                    <div className="hidden md:flex gap-4 text-xs font-medium">
                        <Link href="/news" className="bg-brand-red px-2 py-1">All Posts</Link>
                        <Link href="/football" className="hover:text-brand-gold px-2 py-1">Scores & Fixtures</Link>
                        <Link href="/transfers" className="hover:text-brand-gold px-2 py-1">Transfers</Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((item) => (
                        <article key={item._id} className="bg-white group shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full overflow-hidden">
                                {item.mainImage && (
                                    <Image
                                        src={item.mainImage}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                                {item.categories?.[0] && (
                                    <div className={`absolute top-4 left-4 ${item.categories[0].color || 'bg-brand-red'} text-white text-xs font-bold px-2 py-1 uppercase`}>
                                        {item.categories[0].title}
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-gray-500">
                                        {new Date(item.publishedAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-brand-red transition-colors">
                                    <Link href={`/news/${item.slug.current}`}>
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {item.excerpt}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
