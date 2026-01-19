export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen py-12">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-brand-black mb-8 border-l-4 border-brand-red pl-4">
                    About SportyKenya
                </h1>

                <div className="prose prose-lg text-gray-700">
                    <p className="lead text-xl text-gray-900 font-semibold mb-6">
                        SportyKenya is the premier digital destination for sports news, analysis, and entertainment in Kenya and East Africa.
                    </p>

                    <p className="mb-6">
                        Founded with a passion for local talent and international excellence, we bridge the gap between Kenyan sports fans and the global arena. From the dusty pitches of local academies to the grand stadiums of the Premier League, we cover it all.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">Our Mission</h2>
                    <p className="mb-6">
                        To empower, entertain, and inform Kenyan sports enthusiasts by providing accurate, timely, and engaging content that celebrates our sporting culture.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">What We Cover</h2>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li><strong>Football:</strong> Kenyan Premier League, Harambee Stars, EPL, La Liga, and more.</li>
                        <li><strong>Athletics:</strong> Tracking our world-beating runners from track to marathon.</li>
                        <li><strong>Rugby:</strong> Shujaa, Kenya Cup, and international tournaments.</li>
                        <li><strong>Motorsports:</strong> WRC Safari Rally and local autocross.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">Contact Us</h2>
                    <p>
                        For editorial inquiries, advertising, or feedback, please visit our <a href="/contact" className="text-brand-red hover:underline">Contact Page</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
