import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, MessageCircle, Settings, LogOut } from 'lucide-react';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, currentView, setCurrentView, setSelectedBooking, setBookingsViewStep, setNotificationsViewStep, setMessagesViewStep, setShowLogoutModal }) => (
    <AnimatePresence>
        {isMenuOpen && (
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="lg:hidden fixed inset-0 z-40 bg-white pt-20 px-6 pb-12 overflow-y-auto"
            >
                <nav className="flex flex-col gap-2.5 mt-6">
                    {[
                        { id: 'dashboard', icon: Home, label: 'DASHBOARD' },
                        { id: 'bookings', icon: Briefcase, label: 'BOOKINGS' },
                        { id: 'messages', icon: MessageCircle, label: 'MESSAGES' },
                        { id: 'settings', icon: Settings, label: 'SETTINGS' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setCurrentView(item.id);
                                setSelectedBooking(null);
                                setBookingsViewStep('list');
                                setNotificationsViewStep('list');
                                setMessagesViewStep('list');
                                setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-3.5 px-6 py-3.5 rounded-2xl transition-all font-bold tracking-wider w-full justify-center text-sm cursor-pointer ${currentView === item.id ? 'bg-[#1E4E82] text-white shadow-lg' : 'text-gray-600'}`}
                        >
                            <item.icon size={20} fill={currentView === item.id ? 'currentColor' : 'none'} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                    <div className="w-full h-px bg-gray-100 my-4" />
                    <button
                        onClick={() => {
                            setShowLogoutModal(true);
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3.5 px-6 py-3.5 rounded-2xl transition-all font-bold tracking-wider w-full justify-center text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                    >
                        <LogOut size={20} />
                        <span>LOGOUT</span>
                    </button>
                </nav>
            </motion.div>
        )}
    </AnimatePresence>
);

export default MobileMenu;
