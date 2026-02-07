'use client';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';


export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        if (form.current) {
            emailjs.sendForm(
                'service_xnauywb',
                'template_9djdfsa',
                form.current,
                'jFZYrwejQJ5DP2eWR'
            )
                .then((result) => {
                    console.log(result.text);
                    setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
                    form.current?.reset();
                }, (error) => {
                    console.log(error.text);
                    setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

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

                    {status.message && (
                        <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {status.message}
                        </div>
                    )}

                    <form ref={form} onSubmit={sendEmail} className="space-y-6">
                        <div>
                            <label htmlFor="user_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="user_name"
                                    id="user_name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-green sm:text-sm sm:leading-6 px-3"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="user_email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="user_email"
                                    id="user_email"
                                    required
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
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="News Tip / Editorial">News Tip / Editorial</option>
                                    <option value="Advertising & Partnerships">Advertising & Partnerships</option>
                                    <option value="Technical Support">Technical Support</option>
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
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-green sm:text-sm sm:leading-6 px-3"
                                    defaultValue={''}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md bg-brand-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Editorial Team</h3>
                        <p className="text-gray-600">sportykenya.co.ke@gmail.com</p>
                        <p className="text-gray-600">+254 741 213889</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Advertising</h3>
                        <p className="text-gray-600">sportykenya.co.ke@gmail.com</p>
                        <p className="text-gray-600">Nairobi, Kenya</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
