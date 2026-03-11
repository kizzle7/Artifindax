import React from 'react';
import { ChevronLeft, Bell, X, Menu } from 'lucide-react';
import { getDetailStatusBadge } from './ArtisanOrderDetailsView';

const MobileHeader = ({ currentView, isMenuOpen, setIsMenuOpen, selectedBooking, onBack, bookingsViewStep, notificationsViewStep, setCurrentView, messagesViewStep, currentChat, settingsStep, settingsSubStep }) => {
    const showBack = (currentView === 'bookings' && bookingsViewStep === 'detail') ||
        (currentView === 'notifications' && notificationsViewStep === 'detail') ||
        (currentView === 'messages' && messagesViewStep !== 'list') ||
        (currentView === 'settings' && settingsStep !== 'main') ||
        ['cancel-reason', 'confirm-completion', 'cancel-success', 'completion-success', 'generate-invoice', 'invoice-preview'].includes(currentView);

    const getHeaderTitle = () => {
        if (currentView === 'confirm-completion') return 'Confirm Service Completion';
        if (currentView === 'completion-success') return 'Work Completed';
        if (currentView === 'cancel-reason') return 'Cancel Order';
        if (currentView === 'cancel-success') return 'Booking Cancelled';
        if (currentView === 'generate-invoice') return 'Generate Invoice';
        if (currentView === 'invoice-preview') return 'Invoice Preview';
        if (currentView === 'notifications' && notificationsViewStep === 'detail') return 'Notifications';
        if (currentView === 'messages') {
            if (messagesViewStep === 'chat' || messagesViewStep === 'block') return currentChat?.customer;
            if (messagesViewStep === 'report' || messagesViewStep === 'report_other' || messagesViewStep === 'feedback') return 'Report';
            if (messagesViewStep === 'invoice_detail') return `Invoice - IN00254`;
            if (messagesViewStep === 'receipt') return 'Receipt';
            return 'Messages';
        }
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
        if (selectedBooking) return 'Order Details';
        if (currentView === 'dashboard') return 'Dashboard';
        return currentView;
    };

    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white z-50 px-5 flex items-center justify-between border-b border-gray-100 backdrop-blur-md bg-white/90">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button onClick={onBack} className="w-10 h-10 -ml-1 text-[#0f172a] active:scale-95 transition-all border border-gray-100 rounded-[12px] flex items-center justify-center bg-white shadow-sm hover:bg-slate-50">
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                )}
                <h1 className="text-lg font-black text-[#0f172a] capitalize tracking-tight whitespace-nowrap">
                    {getHeaderTitle()}
                </h1>
            </div>

            <div className="flex items-center gap-2">
                {currentView === 'dashboard' && (
                    <button onClick={() => setCurrentView('notifications')} className="p-2 bg-white rounded-xl shadow-sm relative transition-all active:scale-90 border border-gray-50">
                        <Bell size={18} className="text-gray-600" />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                    </button>
                )}
                {selectedBooking && ['bookings', 'confirm-completion', 'generate-invoice', 'invoice-preview'].includes(currentView) && getDetailStatusBadge(selectedBooking.status)}
                {!showBack && (
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-900 border border-gray-100 rounded-[12px] bg-white shadow-sm flex items-center justify-center">
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                )}
            </div>
        </header>
    );
};

export default MobileHeader;
