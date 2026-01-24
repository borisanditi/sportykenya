'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
    title: string;
    slug: string;
}

interface HeaderProps {
    navigation?: NavigationItem[];
}

export function Header({ navigation = [] }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fallback navigation if CMS data is missing
    const navItems = navigation.length > 0 ? navigation : [
        { title: 'Home', slug: '/' },
        { title: 'News', slug: '/news' },
        { title: 'Football', slug: '/football' },
        { title: 'Kenyan Sports', slug: '/kenyan-sports' },
        { title: 'Media', slug: '/media' },
    ];

    return (
        <header className="bg-brand-black text-white sticky top-0 z-50">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold text-white">
                        <span className="text-brand-red">Sporty</span><span className="text-brand-green">Kenya</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navItems.map((item) => (
                        <Link key={item.title} href={item.slug} className="text-sm font-semibold leading-6 text-white hover:text-brand-gold transition-colors">
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button className="text-white hover:text-brand-gold">
                        <Search className="h-5 w-5" />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={cn("lg:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
                <div className="fixed inset-0 bg-black/80" onClick={() => setMobileMenuOpen(false)} />
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-brand-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold text-white">
                            <span className="text-brand-red">Sporty</span><span className="text-brand-green">Kenya</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.slug}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/10"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
