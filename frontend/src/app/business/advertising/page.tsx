import React from 'react';

export default function AdvertisingPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-brand-black">Advertising with SportyKenya</h1>
            <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead text-xl mb-6">
                    Reach millions of sports enthusiasts across Kenya and East Africa.
                </p>
                <p>
                    SportyKenya offers premium advertising slots, sponsored content, and partnership opportunities
                    for brands looking to connect with a passionate sports audience.
                </p>
                <div className="bg-gray-50 p-8 rounded-lg mt-8 border-l-4 border-brand-red">
                    <h3 className="text-2xl font-bold mb-4">Contact Our Sales Team</h3>
                    <p className="mb-4">For rate cards and media kits, please email us at:</p>
                    <a href="mailto:ads@sportykenya.com" className="text-brand-red font-bold text-lg hover:underline">
                        ads@sportykenya.com
                    </a>
                </div>
            </div>
        </div>
    );
}
