import Link from 'next/link';
import Image from 'next/image';

interface HeroStory {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
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

    const getHref = (story: HeroStory) => {
        if (story.linkedArticle) {
            const type = story.linkedArticle._type;
            const slug = story.linkedArticle.slug.current;
            if (type === 'footballArticle') return `/football/${slug}`;
            if (type === 'kenyanSportsArticle') return `/kenyan-sports/${slug}`;
            return `/news/${slug}`;
        }
        return `/news/${story.slug.current}`;
    };

    return (
        <section className="bg-brand-black text-white">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3">
                {/* Main Featured Story */}
                <div className="lg:col-span-2 relative min-h-[400px] flex items-end p-8">
                    {featuredStory.mainImage && (
                        <Image
                            src={featuredStory.mainImage}
                            alt={featuredStory.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover"
                            priority
                            loading="eager"
                        />
                    )}
                    <div className="relative z-10 max-w-2xl">
                        {featuredStory.categories?.[0] && (
                            <span className={`${featuredStory.categories[0].color || 'bg-brand-red'} text-white text-xs font-bold px-2 py-1 uppercase mb-2 inline-block`}>
                                {featuredStory.categories[0].title}
                            </span>
                        )}
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                            <Link href={getHref(featuredStory)} className="hover:text-brand-gold transition-colors">
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
                    {subStories.map((story, index) => (
                        <div
                            key={story._id}
                            className={`flex-1 p-6 border-b border-gray-800 last:border-0 flex flex-col justify-center ${index === 1 ? 'bg-brand-red' : 'hover:bg-gray-800'} transition-colors`}
                        >
                            <div className="text-xs text-gray-400 mb-1 flex justify-between">
                                <span>{story.categories?.[0]?.title || 'News'}</span>
                                <span>
                                    {new Date(story.publishedAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold leading-snug">
                                <Link href={getHref(story)} className="hover:text-gray-300">
                                    {story.title}
                                </Link>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
