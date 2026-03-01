import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AboutPage = () => {
    const [activeTab, setActiveTab] = useState('about');
    const [activeCategory, setActiveCategory] = useState('General');
    const [openFaq, setOpenFaq] = useState(null);

    const faqCategories = [
        'General',
        'Account & Profile',
        'Bookings',
        'Payments & Pricing',
        'Artisans & Services',
        'KYC Verification',
        'App & Technical Support',
        'Reviews & Ratings',
        'Support & Contact'
    ];

    const faqs = {
        'General': [
            { q: 'What is Artifinder?', a: 'Artifinder is Nigeria\'s trusted platform for discovering, booking, and working with verified local artisans — from electricians and plumbers to makeup artists and tailors.' },
            { q: 'How does the app work?', a: 'You can search for services near you, view verified artisan profiles, book a service, and pay securely through the app.' },
            { q: 'Do I need an account to use Artifinder?', a: 'You can browse services without an account, but you need to register to book an artisan and manage your orders.' },
            { q: 'Is Artifinder available across Nigeria?', a: 'Currently, we are active in major cities and expanding rapidly to cover all states in Nigeria.' }
        ],
        'Account & Profile': [
            { q: 'I forgot my password. What do I do?', a: 'Click on "Forgot Password" on the login screen. You will receive an email or SMS with instructions to reset it.' },
            { q: 'How do I update my profile information?', a: 'Go to your account settings in the dashboard where you can edit your name, contact details, and profile picture.' },
            { q: 'Is my personal information safe?', a: 'Yes, we strictly protect your privacy and adhere to Nigeria Data Protection Regulations (NDPR). We never share your details without consent.' },
            { q: 'How do I create an account?', a: 'You can sign up using your email address, phone number, or directly via Google/Apple sign-in.' }
        ],
        'Bookings': [
            { q: 'How do I book a service?', a: 'Find the service you need, select a verified artisan, choose a convenient time, and confirm your booking.' },
            { q: 'Can I book multiple services at once?', a: 'Yes, you can schedule different services with various artisans through your dashboard.' },
            { q: 'What if an artisan doesn\'t show up?', a: 'Our support team is ready to help. You can report a no-show, and we will either find a replacement or process a refund.' },
            { q: 'Can I cancel a booking?', a: 'Yes, cancellations are allowed within a specific timeframe. Please check our cancellation policy for details.' },
            { q: "How can I mark a booking as completed?", a: "Once the work is done, you can confirm completion in the app and leave a review for the artisan." }
        ],
        'Payments & Pricing': [
            { q: 'How do I pay for a service?', a: 'You can pay securely using your card, bank transfer, or in-app wallet via our integrated payment gateway.' },
            { q: 'Is it safe to pay through the app?', a: 'Absolutely. We use industry-standard encryption and secure payment processors to ensure your financial data is protected.' },
            { q: 'Can I get a refund?', a: 'Refunds are processed according to our refund policy, typically for cancellations or unresolved service issues.' },
            { q: 'How do I know if a price is fair?', a: 'Artifinder provides transparent pricing and estimates. You can also compare rates across different verified profiles.' }
        ],
        'Artisans & Services': [
            { q: 'How do I know an artisan is trustworthy?', a: 'Every artisan on Artifinder goes through a thorough KYC verification process and background check.' },
            { q: 'Can I message an artisan before booking?', a: 'Yes, our in-app messaging allows you to discuss project details and requirements before finalizing a booking.' },
            { q: 'What if I’m unhappy with the service?', a: 'We value quality. If you\'re dissatisfied, contact support, and we will work with you and the artisan to resolve the issue.' },
            { q: 'Can I favorite or save artisans I like?', a: 'Yes, you can save profiles to your "Favorites" list for easy access in the future.' }
        ],
        'KYC Verification': [
            { q: 'What is KYC verification and why is it required?', a: 'KYC (Know Your Customer) is a security measure to verify the identity of our artisans, ensuring a safe environment for all users.' },
            { q: 'How long does verification take?', a: 'The process typically takes 24-48 hours once all required documents are submitted.' },
            { q: 'What happens if I fail KYC verification?', a: 'If your verification is rejected, our team will provide feedback on the reasons and how you can rectify them.' }
        ],
        'App & Technical Support': [
            { q: 'The app is not loading properly. What should I do?', a: 'Try clearing your app cache or checking for updates in the Play Store/App Store. If the issue persists, contact support.' },
            { q: 'I can\'t log in. What might be wrong?', a: 'Ensure you are using the correct email/phone number. You can use the "Forgot Password" feature if needed.' },
            { q: 'How can I report a bug or glitch in the app?', a: 'You can report technical issues directly through the "Support & Contact" section in the app.' }
        ],
        'Reviews & Ratings': [
            { q: 'Can I edit or delete my review?', a: 'Reviews can be edited within a short period after posting. Contact support if you need to remove a review.' },
            { q: 'Why are reviews important?', a: 'Reviews help maintain community standards and allow other users to make informed decisions based on real experiences.' }
        ],
        'Support & Contact': [
            { q: 'How can I contact Artifinder support?', a: 'You can reach us via in-app chat, email at support@artifinda.com, or through our social media channels.' },
            { q: 'What are your support hours?', a: 'Our dedicated support team is available from 8:00 AM to 6:00 PM, Monday to Saturday.' }
        ]
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0f172a]">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Tab Navigation */}
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex justify-center mb-12">
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`px-12 py-4 text-xl font-bold border-b-2 transition-all ${activeTab === 'about' ? 'border-[#1e4e82] text-[#1e4e82]' : 'border-transparent text-[#0B0C0F]'}`}
                        >
                            About
                        </button>
                        <button
                            onClick={() => setActiveTab('faq')}
                            className={`px-12 py-4 text-xl font-bold border-b-2 transition-all ${activeTab === 'faq' ? 'border-[#1e4e82] text-[#1e4e82]' : 'border-transparent text-[#0B0C0F]'}`}
                        >
                            FAQs
                        </button>
                    </div>

                    {activeTab === 'about' ? (
                        /* About Content */
                        <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <section>
                                <h1 className="text-3xl md:text-3xl font-semibold mb-6 text-[#0f172a]">
                                    Connecting Skilled Hands with Everyday Needs
                                </h1>
                                <p className="text-md text-gray-600 leading-relaxed">
                                    Artifinder is Nigeria's trusted platform for discovering, booking, and working with verified local artisans — from electricians and plumbers to makeup artists and tailors. Whether you need a quick fix, a creative hand, or a long-term project partner, we make it easy to find skilled professionals near you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-6 text-[#0f172a]">What We Do:</h2>
                                <p className="text-md text-gray-600 leading-relaxed">
                                    We bridge the gap between quality service providers and customers who need reliable help, quickly and safely. Using location-based search, verified profiles, and secure in-app bookings, Artifinder is the fastest way to get things done on your terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-6 text-[#0f172a]">Our Mission:</h2>
                                <p className="text-md text-gray-600 leading-relaxed">
                                    To empower Nigerian artisans by giving them access to new customers, tools, and income while giving users a simple, safe way to book trustworthy service providers.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-6 text-[#0f172a]">Why Choose Us:</h2>
                                <ul className="space-y-4">
                                    {[
                                        'Verified Artisans you can trust',
                                        'Location-based matching for speed and convenience',
                                        'Wide range of services from home repairs to fashion and beauty',
                                        'In-app messaging & reviews for full transparency',
                                        'Secure payment options and real-time tracking'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-md text-gray-600">
                                            <span className="text-[#1e4e82] mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    ) : (
                        /* FAQ Content */
                        <div className="flex flex-col lg:flex-row gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Sidebar */}
                            <div
                                className="w-full lg:w-1/3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible items-start lg:items-center scrollbar-hide border-b lg:border-b-0 border-gray-200"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {faqCategories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setActiveCategory(cat);
                                            setOpenFaq(null);
                                        }}
                                        className={`flex-shrink-0 lg:w-full flex justify-center transition-all bg-white`}
                                    >
                                        <div className={`px-4 lg:px-0 lg:w-[60%] py-4 text-center border-b-2 hover:bg-gray-50 transition-colors ${activeCategory === cat ? 'bg-[#f0f6fc] border-[#1e4e82]' : 'border-transparent lg:border-gray-200'}`}>
                                            <span className={`text-sm sm:text-base font-bold whitespace-nowrap ${activeCategory === cat ? 'text-[#1e4e82]' : 'text-gray-800'}`}>
                                                {cat}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* FAQ List */}
                            <div className="lg:w-2/3 space-y-4">
                                {(faqs[activeCategory] || []).map((faq, index) => (
                                    <div key={index} className={`overflow-hidden ${openFaq === index ? '' : 'border-b border-gray-500'}`}>
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className={`w-full flex items-center justify-between py-6 text-left hover:text-[#1e4e82] transition-colors ${openFaq === index ? 'border-b border-gray-500' : ''}`}
                                        >
                                            <span className="text-lg font-bold text-[#0f172a] pr-8">{faq.q}</span>
                                            {openFaq === index ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                                        </button>
                                        {openFaq === index && (
                                            <div className="mx-2 mb-4 bg-[#EAF2FA] p-6 animate-in fade-in duration-300 rounded-b-xl">
                                                <p className="text-gray-700 text-sm md:text-md leading-relaxed text-center">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
