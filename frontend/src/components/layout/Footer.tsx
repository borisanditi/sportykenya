import Link from 'next/link';

const navigation = {
    main: [
        { name: 'Home', href: '/' },
        { name: 'News', href: '/news' },
        { name: 'Football', href: '/football' },
        { name: 'Kenyan Sports', href: '/kenyan-sports' },
        { name: 'Media', href: '/media' },
    ],
    business: [
        { name: 'Advertising', href: '/business/advertising' },
        { name: 'Services', href: '/business/services' },
        { name: 'Contact', href: '/contact' },
        { name: 'About Us', href: '/about' },
    ],
    social: [
        { name: 'Facebook', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'YouTube', href: '#' },
    ],
};

export function Footer() {
    return (
        <footer className="bg-brand-black text-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="text-2xl font-bold text-white">
                            <span className="text-brand-red">Sporty</span><span className="text-brand-green">Kenya</span>
                        </Link>
                        <p className="text-sm leading-6 text-gray-300">
                            The #1 source for Kenyan and International sports news.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.main.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Business</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.business.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">
                        &copy; {new Date().getFullYear()} SportyKenya Media. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
