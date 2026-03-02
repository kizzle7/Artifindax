import React from 'react';
import { Mail, Phone, MessageSquare, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import editIcon from '../../assets/edit.png';
import shareIcon from '../../assets/share.png';
import cardPosIcon from '../../assets/card-pos.png';
import phoneMockup from '../../assets/iMockup - iPhone 14.png';
import shield from "../../assets/task-square.png"
import security from "../../assets/security-user.png"


const Steps = () => {
    const steps = [
        {
            id: 1,
            title: 'Describe your Project',
            text: 'Tell us what you need done in detail and you will be matched with the right professional.',
            icon: editIcon
        },
        {
            id: 2,
            title: 'Find an artisan near you',
            text: 'Receive quotes from verified artisans in your area. Compare profiles, reviews, and pricing.',
            icon: shareIcon
        },
        {
            id: 3,
            title: 'Book and Pay Securely',
            text: 'Choose your preferred artisan, go to them or have them come to you. Payment is secure.',
            icon: cardPosIcon
        }
    ];

    return (
        <section className="bg-white  relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div key={step.id} className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm group hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-[#ACCBEC] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                <img src={step.icon} alt={step.title} className="w-6 h-6 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0f172a] mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center mt-20">
                    <Link to="/signup/user">
                        <Button
                            variant="plain"
                            className="px-20 py-3 text-md font-bold bg-[#ACCBEC] text-[#133253] rounded-xl hover:bg-[#99bbdd] transition-all shadow-md"
                        >
                            Get Started
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4 my-4 w-full max-w-sm justify-center">
                        {/* <div className="h-px bg-gray-200 flex-1" /> */}
                        <span className="text-gray-400 font-medium">or</span>
                        {/* <div className="h-px bg-gray-200 flex-1" /> */}
                    </div>
                    <div className="flex items-center gap-6">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 cursor-pointer" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 cursor-pointer" />
                    </div>
                </div>
            </div>
        </section>
    );
};

import { ShieldCheck, ClipboardCheck, CheckCircle2 } from 'lucide-react';

const StayCards = () => (
    <>
        {/* Card 1: Our Safety Measures */}
        <div className="bg-[#EDF2F7] rounded-2xl p-6 relative overflow-hidden border-l-4 border-purple-600 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src={security} alt="Security" className="w-full h-auto" />
                </div>
                <h3 className="text-md font-bold text-[#0f172a]">Our Safety Measures</h3>
            </div>
            <ul className="space-y-1.5">
                {[
                    'All artisans go through identity verification and skill checks.',
                    'Customer reviews and ratings help you hire with confidence.',
                    'Secure in-app messaging and payments protect your privacy and money.'
                ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-snug">
                        <CheckCircle2 size={14} className="text-purple-600 flex-shrink-0 mt-0.5" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* Card 2: What You Can Do */}
        <div className="bg-[#EDF2F7] rounded-2xl p-4 relative overflow-hidden border-l-4 border-[#1E4E82] shadow-sm">
            <div className="flex items-center gap-1 mb-3">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src={shield} alt="Shield" className="w-full h-auto" />
                </div>
                <h3 className="text-md font-bold text-[#0f172a]">What You Can Do</h3>
            </div>
            <ul className="space-y-1.5">
                {[
                    'Always review artisan profiles before booking.',
                    'Confirm service details in the app - avoid off-app arrangements.',
                    'Report any suspicious behavior immediately.'
                ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-snug">
                        <CheckCircle2 size={14} className="text-[#1E4E82] flex-shrink-0 mt-0.5" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </>
);

const StaySafe = () => (
    <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 mt-24 lg:mt-0">
            {/* The Main Background Card */}
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-[0_24px_50px_-12px_#7C8CF580] rotate-8 transition-transform duration-500" style={{ height: 'auto', maxHeight: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Header Part */}
                    <div className="max-w-xs px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4 leading-tight">
                            Stay Safe! Stay Smart! <br />
                            Hire with Confidence!
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Your safety is our priority. While we work hard to connect you with trusted and verified artisans, we encourage all users to take simple steps to ensure a safe and smooth experience.
                        </p>
                    </div>

                    {/* Cards Part - Desktop only inside here */}
                    <div className="hidden lg:flex flex-col space-y-4 px-4">
                        <StayCards />
                    </div>
                </div>
            </div>

            {/* Mobile Cards - Pulled out and stacked vertically */}
            <div className="flex lg:hidden flex-col space-y-4 mt-12 px-2 relative z-10 transition-all duration-300">
                <StayCards />
            </div>
        </div>
    </section>
);

const ArtisanPartner = () => (
    <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap- items-center">
                {/* Left: Phone Mockup */}
                <div className="relative flex justify-center lg:justify-start">
                    <div className="relative z-10 w-50 lg:w-full lg:max-w-[320px] animate-float mb-12 lg:mb-0">
                        <img src={phoneMockup} alt="App Mockup" className="w-full h-auto drop-shadow-2xl" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-[80px] -z-10" />
                </div>

                {/* Right: Artisan CTA Design */}
                <div className="bg-[#133D72] rounded-xl p-8 md:p-12 text-left lg:w-[110%] mx-auto shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Are you an Artisan? Partner with Us Today!
                    </h2>
                    <p className="text-[#D1D5DB] text-md mb-8">
                        Are you a skilled worker looking to expand and earn your own way? Join us today!
                    </p>

                    <form className="space-y-4">
                        <div className="space-y-1.5 text-left">
                            <label className="text-white font-medium text-xs">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-5 py-3 rounded-xl bg-white text-[#133D72] outline-none placeholder:text-gray-400 text-sm"
                            />
                        </div>

                        <Link to="/signup/artisan">
                            <Button
                                variant="plain"
                                type="button"
                                className="w-full py-3.5 text-center font-bold bg-[#ACCBEC] text-[#133253] rounded-xl hover:bg-[#99bbdd] transition-all text-sm"
                            >
                                Join as Artisan
                            </Button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    </section>
);

const Questions = () => (
    <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-black text-[#0f172a] mb-12">Have any Questions?</h3>
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-8 p-8 bg-[#1e293b] rounded-3xl text-white shadow-xl items-center">
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Mail size={18} /> Email</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Phone size={18} /> Phone</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><MessageSquare size={18} /> WhatsApp</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Instagram size={18} /> Instagram</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors">𝕏 Twitter</a>
            </div>
        </div>
    </section>
);

export { Steps, StaySafe, ArtisanPartner, Questions };
