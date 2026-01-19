export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-brand-black mb-8 border-l-4 border-brand-green pl-4">
                    Contact Us
                </h1>

                <div className="bg-white shadow-sm rounded-lg p-8">
                    <p className="text-lg text-gray-700 mb-8">
                        We&apos;d love to hear from you. Whether you have a news tip, advertising inquiry, or just want to say hello, fill out the form below.
                    </p>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-green sm:text-sm sm:leading-6 px-3"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-green sm:text-sm sm:leading-6 px-3"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                                Subject
                            </label>
                            <div className="mt-2">
                                <select
                                    id="subject"
                                    name="subject"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-green sm:text-sm sm:leading-6 px-3"
                                >
                                    <option>General Inquiry</option>
                                    <option>News Tip / Editorial</option>
                                    <option>Advertising & Partnerships</option>
                                    <option>Technical Support</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                                Message
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-green sm:text-sm sm:leading-6 px-3"
                                    defaultValue={''}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-brand-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green transition-colors"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Editorial Team</h3>
                        <p className="text-gray-600">editor@sportykenya.com</p>
                        <p className="text-gray-600">+254 700 000 000</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Advertising</h3>
                        <p className="text-gray-600">ads@sportykenya.com</p>
                        <p className="text-gray-600">Nairobi, Kenya</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
