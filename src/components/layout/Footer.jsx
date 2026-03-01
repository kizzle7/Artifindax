import React from 'react';
import logo from '../../assets/Artifinda logo 3.png';
import Button from '../ui/Button';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        'For Customers': [
            { name: 'Find Artisans', href: '/signup?role=user' },
            { name: 'How it works', href: '/#how-it-works' },
            { name: 'Safety&trust', href: '/about?tab=safety' },
            { name: 'Help Center', href: '/about?tab=faq' },
        ],
        'For Artisans': [
            { name: 'Join as Artisan', href: '/signup?role=artisan' },
            { name: 'Pro Support', href: '#' },
            { name: 'Success stories', href: '#' },
            { name: 'Resources', href: '#' },
        ],
        'Company': [
            { name: 'About Us', href: '/about' },
            { name: 'FAQs', href: '/about?tab=faq' },
            { name: 'Privacy policy', href: '#' },
            { name: 'Contact', href: '/#contact' },
            { name: 'Terms &', href: '#' },
        ],
    };

    return (
        <footer className="bg-[#1D4E82] text-white pt-12 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-4 w-full overflow-hidden">

                {/* Brand Info */}
                <div className="w-full md:col-span-3 lg:col-span-3 flex flex-col items-start gap-1">
                    <div className="mb-10 md:mb-0 flex flex-col items-start gap-1">
                        <img src={logo} alt="Artifinda Logo" className="h-14 w-auto object-contain brightness-0 invert" />
                        <span className="text-xs sm:text-sm text-[#D1D5DB] font-medium opacity-80 leading-relaxed">
                            ...help at your fingertips
                        </span>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="w-full md:col-span-5 lg:col-span-6 grid grid-cols-3 gap-2 sm:gap-4 md:gap-2 mb-4 md:mb-0">
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="flex flex-col gap-4 md:gap-6">
                            <h4 className="font-bold text-sm sm:text-base md:text-lg leading-tight">{title}</h4>
                            <ul className="flex flex-col gap-3 md:gap-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[#D1D5DB] hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm leading-snug">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Waitlist Section */}
                <div className="w-full md:col-span-4 lg:col-span-3 space-y-4 mb-10 md:mb-0 overflow-hidden">
                    <h4 className="hidden md:block font-bold text-lg mb-6 leading-tight">Join Our Waitlist</h4>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full px-6 py-3.5 rounded-xl bg-transparent border-2 border-white/20 text-white placeholder:text-gray-300 outline-none focus:border-[#ACCBEC] transition-all text-sm font-semibold"
                        />
                    </div>
                    <Button
                        variant="plain"
                        className="w-full py-4 text-center font-bold bg-[#D3E4F6] text-[#133253] rounded-2xl hover:bg-[#ACCBEC] transition-all text-md shadow-lg"
                    >
                        Join Waitlist
                    </Button>
                    {/* App Stores Badges Desktop Only (Moved to Right) */}
                    <div className="hidden md:flex flex-col gap-4 mt-8 w-full md:items-start lg:items-start">
                        {/* <span className="text-sm font-semibold opacity-90 lg:text-right w-full">Download our App</span> */}
                        <div className="flex flex-col lg:flex-row gap-3">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-[40px] w-auto" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-[40px] w-auto" />
                        </div>
                    </div>
                </div>
            </div>

            {/* App Stores Badges Mobile Only */}
            <div className="md:hidden flex items-center justify-between gap-2 mb-8 px-4 mt-2 bg-transparent max-w-7xl mx-auto">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-[44px] w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-[44px] w-auto" />
            </div>

            {/* Copyright */}
            <div className="text-center pt-8 border-t border-white/10 mt-4 md:mt-16 max-w-7xl mx-auto">
                <p className="text-[#D1D5DB]/50 text-[10px] md:text-xs font-medium tracking-wide">
                    © {currentYear} Artifinda. All rights reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
