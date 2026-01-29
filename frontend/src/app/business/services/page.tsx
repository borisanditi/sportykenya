import React from 'react';

export default function ServicesPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-brand-black">Our Services</h1>
            <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead text-xl mb-6">
                    Beyond news, SportyKenya provides specialized sports media services.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-brand-red">Media Coverage</h3>
                        <p>Comprehensive coverage of local leagues, tournaments, and sporting events.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-brand-green">Data Analytics</h3>
                        <p>In-depth match statistics, player performance analysis, and historical data.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-brand-black">Content Production</h3>
                        <p>High-quality video production, photography, and written content for sports organizations.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-brand-gold">Consultancy</h3>
                        <p>Digital strategy and brand positioning for sports entities and athletes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
