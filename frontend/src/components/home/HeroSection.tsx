import Link from 'next/link';
import Image from 'next/image';
import { getArticleHref } from '@/lib/utils';


interface HeroStory {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: string;
    publishedAt: string;
    excerpt: string;
    priority: number;
    categories?: {
        title: string;
        slug: { current: string };
        color?: string;
    }[];
    linkedArticle?: {
        slug: { current: string };
        _type: string;
    };
}

interface HeroSectionProps {
    stories: HeroStory[];
}

export function HeroSection({ stories = [] }: HeroSectionProps) {
    if (!stories.length) return null;

    const featuredStory = stories[0];
    const subStories = stories.slice(1, 4);

    return (
        <section className="bg-brand-black text-white">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3">
                {/* Main Featured Story */}
                <div className="lg:col-span-2 relative min-h-[400px] flex items-end p-8 group overflow-hidden">
                    {featuredStory.mainImage && (
                        <>
                            <Image
                                src={featuredStory.mainImage}
                                alt={featuredStory.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
                        </>
                    )}
                    <div className="relative z-10 max-w-2xl">
                        {featuredStory.categories?.[0] && (
                            <span className={`${featuredStory.categories[0].color || 'bg-brand-red'} text-white text-xs font-bold px-2 py-1 uppercase mb-2 inline-block`}>
                                {featuredStory.categories[0].title}
                            </span>
                        )}
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                            <Link href={getArticleHref(featuredStory)} className="hover:text-brand-gold transition-colors">
                                {featuredStory.title}
                            </Link>
                        </h2>
                        <p className="text-gray-300 text-sm">
                            {new Date(featuredStory.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>

                {/* Side Stories */}
                <div className="bg-gray-900 flex flex-col">
                    {subStories.map((story) => (
                        <div
                            key={story._id}
                            className="flex-1 p-6 border-b border-gray-800 last:border-0 flex flex-col justify-end relative overflow-hidden group min-h-[140px]"
                        >
                            {/* Background Image for Side Stories */}
                            {story.mainImage && (
                                <>
                                    <Image
                                        src={story.mainImage}
                                        alt={story.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                        className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                                </>
                            )}

                            <div className="relative z-10">
                                <div className="text-xs text-gray-400 mb-1 flex justify-between items-center">
                                    <span className="text-brand-red font-semibold uppercase">{story.categories?.[0]?.title || 'News'}</span>
                                    <span>
                                        {new Date(story.publishedAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold leading-snug">
                                    <Link href={getArticleHref(story)} className="hover:text-brand-gold transition-colors">
                                        {story.title}
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
