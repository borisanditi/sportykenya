import Link from 'next/link';
import Image from 'next/image';
import { getArticleHref } from '@/lib/utils';
import { client } from '@/lib/sanity';
import {
    ARTICLES_BY_CATEGORY_QUERY,
    FOOTBALL_ARTICLES_QUERY,
    KENYAN_SPORTS_QUERY
} from '@/lib/queries';

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category).replace(/-/g, ' ');

    // Capitalize for display
    const title = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
    const isFootball = decodedCategory.toLowerCase().includes('football');
    const isKenyanSports = decodedCategory.toLowerCase().includes('kenyan-sports');

    let articles = [];

    try {
        if (isFootball) {
            articles = await client.fetch(FOOTBALL_ARTICLES_QUERY);
        } else if (isKenyanSports) {
            articles = await client.fetch(KENYAN_SPORTS_QUERY);
        } else {
            articles = await client.fetch(ARTICLES_BY_CATEGORY_QUERY, { categorySlug: category });
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-black border-l-4 border-brand-red pl-4">
                        {title} News
                    </h1>
                </div>

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((item: any) => (
                            <article key={item._id} className="bg-white group shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative h-48 overflow-hidden">
                                    {item.mainImage && (
                                        <Image
                                            src={item.mainImage}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        {item.categories?.[0] && (
                                            <span className={`${item.categories[0].color || 'text-brand-red'} text-xs font-bold uppercase`}>
                                                {item.categories[0].title}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-500">
                                            {new Date(item.publishedAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold mb-3 leading-tight group-hover:text-brand-red transition-colors">
                                        <Link href={getArticleHref(item)}>
                                            {item.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {item.excerpt}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No articles found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
