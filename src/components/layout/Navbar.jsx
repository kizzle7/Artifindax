import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import logo from '../../assets/Artifinda logo 3.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '/#services', isHash: true },
        { name: 'How it works', href: '/#how-it-works', isHash: true },
        { name: 'Reviews', href: '/#reviews', isHash: true },
        { name: 'Contact Us', href: '/#contact', isHash: true },
        { name: 'About', href: '/about', isHash: false },
        { name: 'Blogs', href: '/#blogs', isHash: true },
    ];

    const isActive = (path) => {
        if (path === '/about' && location.pathname === '/about') return true;
        return false;
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Artifinda Logo" className="h-10 w-auto object-contain" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return link.isHash ? (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-semibold transition-colors hover:text-[#1e40af] ${active ? 'text-[#0f172a]' : 'text-gray-600'}`}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-sm font-semibold transition-colors hover:text-[#1e40af] ${active ? 'text-[#0f172a]' : 'text-gray-600'}`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/signup/artisan">
                        <Button variant="plain" className="px-5 py-2 text-sm bg-[#D6E5F5] text-[#1E4E82] hover:bg-[#c8d9eb]">Join as Artisan</Button>
                    </Link>
                    <Link to="/signup/user">
                        <Button variant="plain" className="px-5 py-2 text-sm bg-[#1E4E82] text-white hover:bg-[#163a61]">Get Started</Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Slide Down */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
                        />
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 left-0 right-0 bg-white rounded-b-2xl shadow-2xl px-6 py-8 lg:hidden z-50 overflow-hidden"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col gap-6 pt-10 items-center text-center">
                                {navLinks.map((link) => {
                                    const active = isActive(link.href);
                                    return link.isHash ? (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-lg font-bold transition-colors hover:text-[#1e40af] ${active ? 'text-[#0f172a]' : 'text-gray-800'}`}
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-lg font-bold transition-colors hover:text-[#1e40af] ${active ? 'text-[#0f172a]' : 'text-gray-800'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                                <div className="w-full h-px bg-gray-100 my-2" />
                                <div className="flex flex-col gap-3 w-full">
                                    <Link to="/signup/artisan" onClick={() => setIsOpen(false)} className="w-full">
                                        <Button variant="plain" className="w-full py-4 text-md bg-[#D6E5F5] text-[#1E4E82]">Join as Artisan</Button>
                                    </Link>
                                    <Link to="/signup/user" onClick={() => setIsOpen(false)} className="w-full">
                                        <Button variant="plain" className="w-full py-4 text-md bg-[#1E4E82] text-white">Get Started</Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
