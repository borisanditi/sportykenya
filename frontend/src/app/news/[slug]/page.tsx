import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { ARTICLE_BY_SLUG_QUERY } from '@/lib/queries';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let article = null;
    try {
        article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
    } catch (error) {
        console.error('Error fetching article:', error);
    }

    if (!article) {
        notFound();
    }

    return (
        <article className="bg-white min-h-screen pb-12">
            {/* Hero Image */}
            <div className="relative h-[400px] lg:h-[500px] w-full">
                {article.mainImage && (
                    <Image
                        src={article.mainImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 max-w-7xl mx-auto">
                    {article.categories?.[0] && (
                        <span className={`${article.categories[0].color || 'bg-brand-red'} text-white text-sm font-bold px-3 py-1 uppercase mb-4 inline-block`}>
                            {article.categories[0].title}
                        </span>
                    )}
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
                        {article.title}
                    </h1>
                    <div className="flex items-center text-gray-300 text-sm gap-4">
                        {article.author && (
                            <span>By <span className="text-white font-semibold">{article.author.name}</span></span>
                        )}
                        <span>•</span>
                        <span>
                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* Specific details for sports */}
                {(article.league || article.sportType) && (
                    <div className="mb-8 p-4 bg-gray-50 border-l-4 border-brand-red flex flex-wrap gap-6 text-sm">
                        {article.league && (
                            <div>
                                <span className="text-gray-500 uppercase font-bold text-[10px] block">League</span>
                                <span className="font-semibold text-gray-900">{article.league.replace(/-/g, ' ')}</span>
                            </div>
                        )}
                        {article.sportType && (
                            <div>
                                <span className="text-gray-500 uppercase font-bold text-[10px] block">Sport</span>
                                <span className="font-semibold text-gray-900">{article.sportType}</span>
                            </div>
                        )}
                        {article.athleteName && (
                            <div>
                                <span className="text-gray-500 uppercase font-bold text-[10px] block">Athlete/Team</span>
                                <span className="font-semibold text-gray-900">{article.athleteName}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="prose prose-xl prose-red max-w-none prose-headings:text-gray-900 prose-p:text-gray-900 prose-li:text-gray-900 prose-strong:text-gray-900 leading-relaxed">
                    <PortableText
                        value={article.body}
                        components={{
                            types: {
                                cloudinaryImage: ({ value }: any) => (
                                    <figure className="my-8">
                                        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                                            <Image
                                                src={value.url}
                                                alt={value.alt || ''}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {value.caption && (
                                            <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
                                                {value.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                ),
                            },
                        }}
                    />
                </div>
            </div>
        </article>
    );
}
