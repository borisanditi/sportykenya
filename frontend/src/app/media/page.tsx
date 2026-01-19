import Image from 'next/image';

const videos = [
    {
        id: 1,
        title: "Highlights: Gor Mahia vs AFC Leopards",
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
        duration: "10:24",
    },
    {
        id: 2,
        title: "Interview: Ferdinand Omanyala on Olympics",
        thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
        duration: "05:12",
    },
    {
        id: 3,
        title: "Top 10 Goals of the Season",
        thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1000&auto=format&fit=crop",
        duration: "08:45",
    },
];

export default function MediaPage() {
    return (
        <div className="bg-brand-black min-h-screen text-white py-12">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold border-l-4 border-brand-red pl-4">
                        SportyKenya Media
                    </h1>
                    <div className="flex gap-4">
                        <button className="text-sm font-semibold hover:text-brand-red">Videos</button>
                        <button className="text-sm font-semibold text-gray-400 hover:text-brand-red">Photos</button>
                    </div>
                </div>

                {/* Featured Video */}
                <div className="mb-12">
                    <div className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden group cursor-pointer">
                        <Image
                            src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?q=80&w=2070&auto=format&fit=crop"
                            alt="Featured Video"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-brand-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                            <h2 className="text-2xl font-bold">Live: Post-Match Analysis - Kenya vs Tanzania</h2>
                        </div>
                    </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <div key={video.id} className="group cursor-pointer">
                            <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-3">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-2 right-2 bg-black/80 text-xs font-bold px-1.5 py-0.5 rounded">
                                    {video.duration}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <div className="w-12 h-12 bg-brand-red/90 rounded-full flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold leading-tight group-hover:text-brand-red transition-colors">
                                {video.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
