import React from 'react';
import { ChevronLeft, X, Menu } from 'lucide-react';

const MobileHeader = ({ currentView, isMenuOpen, setIsMenuOpen, selectedBooking, setSelectedBooking, notificationsViewStep, setNotificationsViewStep, currentChat, messagesViewStep, setCurrentView, selectedArtisan, setSelectedArtisan, settingsStep, setSettingsStep, settingsSubStep, setSettingsSubStep, isBookingFormOpen, setIsBookingFormOpen }) => {
    const getHeaderTitle = () => {
        if (isBookingFormOpen) return 'Booking Form';
        if (selectedBooking) return 'Order Details';
        if (currentView === 'messages' && messagesViewStep === 'chat') return currentChat?.artisan;
        if (currentView === 'notifications' && notificationsViewStep === 'detail') return 'Notifications';
        if (currentView === 'search') return selectedArtisan ? 'View Profile' : 'Search';
        if (currentView === 'settings') {
            if (settingsStep === 'profile') return 'Profile';
            if (settingsStep === 'password' || settingsStep === 'password_otp' || settingsStep === 'password_reset') return 'Change Password';
            if (settingsStep === 'pin' || settingsStep === 'pin_new') return 'Change Pin';
            if (settingsStep === 'addresses') return settingsSubStep === 'add' ? 'Add Address' : 'My Addresses';
            if (settingsStep === 'faq') return 'FAQs';
            if (settingsStep === 'contact') return 'Contact Us';
            if (settingsStep === 'about') return 'About Artifinda';
            return 'Settings';
        }
        return currentView;
    };

    const handleBack = () => {
        if (isBookingFormOpen) setIsBookingFormOpen(false);
        else if (selectedBooking) setSelectedBooking(null);
        else if (selectedArtisan) setSelectedArtisan(null);
        else if (currentView === 'notifications' && notificationsViewStep === 'detail') setNotificationsViewStep('list');
        else if (currentView === 'settings') {
            if (settingsStep === 'main') setCurrentView('home');
            else if (settingsStep === 'addresses' && settingsSubStep === 'add') setSettingsSubStep('list');
            else setSettingsStep('main');
        }
        else setCurrentView('home');
    };

    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white z-50 px-5 flex items-center justify-between border-b border-gray-100 backdrop-blur-md ">
            <div className="flex items-center gap-3">
                {(currentView !== 'home' || isBookingFormOpen || selectedBooking || (currentView === 'notifications' && notificationsViewStep === 'detail') || selectedArtisan || (currentView === 'settings' && settingsStep !== 'main')) && (
                    <button onClick={handleBack} className="w-10 h-10 -ml-1 text-[#0f172a] active:scale-95 transition-all border border-gray-100 rounded-[12px] flex items-center justify-center bg-white shadow-sm hover:bg-slate-50 cursor-pointer">
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                )}
                <h1 className={`${(currentView === 'notifications' && notificationsViewStep === 'detail') ? 'text-base' : 'text-lg'} font-black text-[#0f172a] capitalize tracking-tight`}>
                    {getHeaderTitle()}
                </h1>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-900 cursor-pointer">{isMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </header>
    );
};

export default MobileHeader;
