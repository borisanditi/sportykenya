"use client";

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity'; // Ensure this matches your project's sanity image helper
import Link from 'next/link';

interface MediaItem {
    _id: string;
    title: string;
    slug: { current: string };
    mediaType: 'video' | 'image' | 'gallery';
    image?: any;
    videoUrl?: string;
    embedCode?: string;
    gallery?: any[];
    caption?: string;
    publishedAt: string;
    relatedArticle?: {
        slug: { current: string };
        title: string;
    };
}

interface MediaGalleryProps {
    videos: MediaItem[];
    photos: MediaItem[];
}

export default function MediaGallery({ videos, photos }: MediaGalleryProps) {
    const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');
    const items = activeTab === 'videos' ? videos : photos;
    const featureditem = items[0];
    const gridItems = items.slice(1);

    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        } catch (e) {
            return null;
        }
    };

    const renderVideoContent = (item: MediaItem, isFeatured: boolean = false) => {
        // Priority 1: Embed Code (User pasted iframe)
        if (item.embedCode) {
            return (
                <div
                    className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                    dangerouslySetInnerHTML={{ __html: item.embedCode }}
                />
            );
        }

        // Priority 2: Video URL (Auto-embed YouTube)
        if (item.videoUrl) {
            const embedUrl = getYouTubeEmbedUrl(item.videoUrl);
            if (embedUrl) {
                return (
                    <iframe
                        src={embedUrl}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                );
            }
        }

        // Priority 3: Thumbnail with Play Icon (Fallback)
        const imageUrl = item.image ? urlFor(item.image).url() : '/placeholder-video.jpg'; // Need a fallback image strategy

        return (
            <>
                <div className="relative w-full h-full">
                    {item.image && (
                        <Image
                            src={imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    )}
                    {!item.image && !item.videoUrl && !item.embedCode && (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                            No Preview
                        </div>
                    )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-brand-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                </div>

                {/* Overlay Title for Featured */}
                {isFeatured && (
                    <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full pointer-events-auto">
                        <h2 className="text-2xl font-bold">{item.title}</h2>
                        {item.relatedArticle && (
                            <Link href={`/${item.relatedArticle.slug.current}`} className="text-sm text-brand-red hover:underline mt-2 inline-block">
                                Read Article &rarr;
                            </Link>
                        )}
                    </div>
                )}
            </>
        );
    };


    const renderPhotoContent = (item: MediaItem, isFeatured: boolean = false) => {
        const imageUrl = item.image ? urlFor(item.image).url() : null;

        if (!imageUrl) return null;

        return (
            <>
                <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                {isFeatured && (
                    <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                        <h2 className="text-2xl font-bold">{item.title}</h2>
                        {item.relatedArticle && (
                            <Link href={`/${item.relatedArticle.slug.current}`} className="text-sm text-brand-red hover:underline mt-2 inline-block">
                                Read Article &rarr;
                            </Link>
                        )}
                    </div>
                )}
                {/* Gallery Indicator if multiple images */}
                {item.gallery && item.gallery.length > 0 && (
                    <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <span>+{item.gallery.length}</span>
                        <span>Photos</span>
                    </div>
                )}
            </>
        );
    };


    return (
        <div>
            {/* Tabs */}
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold border-l-4 border-brand-red pl-4">
                    SportyKenya Media
                </h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`text-sm font-semibold transition-colors ${activeTab === 'videos' ? 'text-brand-red' : 'text-gray-400 hover:text-white'}`}
                    >
                        Videos
                    </button>
                    <button
                        onClick={() => setActiveTab('photos')}
                        className={`text-sm font-semibold transition-colors ${activeTab === 'photos' ? 'text-brand-red' : 'text-gray-400 hover:text-white'}`}
                    >
                        Photos
                    </button>
                </div>
            </div>

            {/* Content */}
            {items.length === 0 ? (
                <div className="text-center py-20 bg-gray-900 rounded-lg">
                    <p className="text-gray-400">No content available yet.</p>
                </div>
            ) : (
                <>
                    {/* Featured Item */}
                    {featureditem && (
                        <div className="mb-12">
                            <div className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden group">
                                {activeTab === 'videos'
                                    ? renderVideoContent(featureditem, true)
                                    : renderPhotoContent(featureditem, true)
                                }
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gridItems.map((item) => (
                            <div key={item._id} className="group cursor-pointer">
                                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-3">
                                    {activeTab === 'videos'
                                        ? renderVideoContent(item)
                                        : renderPhotoContent(item)
                                    }
                                </div>
                                <h3 className="font-bold leading-tight group-hover:text-brand-red transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                {/* Date or Duration can go here */}
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(item.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
