import React from 'react';
import { Home, Briefcase, MessageCircle, Settings, LogOut } from 'lucide-react';
import logo from '../../assets/Artifinda logo 3.png';

const Sidebar = ({ currentView, setCurrentView, setSelectedBooking, setNotificationsViewStep, setMessagesViewStep, setSettingsStep, setShowLogoutModal }) => (
    <div className="hidden lg:flex w-[240px] bg-[#1E4E82] h-screen fixed left-0 top-0 flex-col p-6 text-white z-50">
        <div className="mb-10"><img src={logo} alt="Artifinda" className="h-8 brightness-0 invert" /></div>
        <nav className="flex flex-col gap-3">
            {[
                { id: 'home', icon: Home, label: 'HOME' },
                { id: 'bookings', icon: Briefcase, label: 'BOOKINGS' },
                { id: 'messages', icon: MessageCircle, label: 'MESSAGES' },
                { id: 'settings', icon: Settings, label: 'SETTINGS' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        setCurrentView(item.id);
                        setSelectedBooking(null);
                        if (item.id === 'notifications') setNotificationsViewStep('list');
                        if (item.id === 'messages') setMessagesViewStep('list');
                        if (item.id === 'settings') setSettingsStep('main');
                    }}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-bold tracking-wider text-[11px] cursor-pointer ${currentView === item.id ? 'bg-white text-[#1E4E82]' : 'hover:bg-white/10 opacity-70 hover:opacity-100'}`}
                >
                    <item.icon size={18} fill={currentView === item.id ? 'currentColor' : 'none'} />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
        <div className="mt-auto">
            <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-bold tracking-wider text-[11px] w-full hover:bg-white/10 opacity-70 hover:opacity-100 cursor-pointer"
            >
                <LogOut size={18} />
                <span>LOGOUT</span>
            </button>
        </div>
    </div>
);

export default Sidebar;
