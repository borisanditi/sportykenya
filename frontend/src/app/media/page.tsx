import { client } from '@/lib/sanity';
import { MEDIA_ITEMS_QUERY } from '@/lib/queries';
import MediaGallery from '@/components/media/MediaGallery';

export const revalidate = 60; // Revalidate every minute

export default async function MediaPage() {
    const mediaItems = await client.fetch(MEDIA_ITEMS_QUERY);

    const videos = mediaItems.filter((item: any) => item.mediaType === 'video');
    const photos = mediaItems.filter((item: any) => item.mediaType === 'image' || item.mediaType === 'gallery');

    return (
        <div className="bg-brand-black min-h-screen text-white py-12">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <MediaGallery videos={videos} photos={photos} />
            </div>
        </div>
    );
}
