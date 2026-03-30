import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, MessageCircle, Bell, Settings } from 'lucide-react';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, currentView, setCurrentView, setSelectedBooking, setNotificationsViewStep, setMessagesViewStep, setSettingsStep }) => (
    <AnimatePresence>
        {isMenuOpen && (
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="lg:hidden fixed inset-0 z-30 bg-white pt-20 px-6 pb-12 overflow-y-auto">
                <nav className="flex flex-col gap-2.5 mt-6">
                    {[
                        { id: 'home', icon: Home, label: 'HOME' },
                        { id: 'bookings', icon: Briefcase, label: 'BOOKINGS' },
                        { id: 'messages', icon: MessageCircle, label: 'MESSAGES' },
                        { id: 'notifications', icon: Bell, label: 'NOTIFICATIONS' },
                        { id: 'settings', icon: Settings, label: 'SETTINGS' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setCurrentView(item.id);
                                setSelectedBooking(null);
                                setIsMenuOpen(false);
                                if (item.id === 'notifications') setNotificationsViewStep('list');
                                if (item.id === 'messages') setMessagesViewStep('list');
                                if (item.id === 'settings') setSettingsStep('main');
                            }}
                            className={`flex items-center gap-3.5 px-6 py-3.5 rounded-2xl transition-all font-bold tracking-wider w-full justify-center text-sm cursor-pointer ${currentView === item.id ? 'bg-[#1E4E82] text-white shadow-lg' : 'text-gray-600'}`}
                        >
                            <item.icon size={20} fill={currentView === item.id ? 'currentColor' : 'none'} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </motion.div>
        )}
    </AnimatePresence>
);

export default MobileMenu;
