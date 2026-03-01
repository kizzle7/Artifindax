import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone, MessageSquare, ChevronLeft, ChevronRight, MapPin, Clock, Calendar, CreditCard, Plus, X, Star, Filter,
    SprayCan, Droplets, PlugZap, Car, PaintRoller, Smartphone, Armchair, Trees, Menu, Home, Briefcase, Settings, MessageCircle, Bell, Search,
    Mic, Send, Camera, Copy, Download, Share2, CheckCircle2, AlertCircle, MoreVertical, Flag, Ban, Wallet, ArrowRight, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import logo from '../assets/Artifinda logo 3.png';

// Mock Data
const CATEGORIES = [
    { id: 'cleaning', label: 'Cleaning', icon: SprayCan, color: '#fcf0ff', iconColor: '#9333ea' },
    { id: 'plumbing', label: 'Plumbing', icon: Droplets, color: '#e0f2fe', iconColor: '#0ea5e9' },
    { id: 'electronics', label: 'Electronics', icon: PlugZap, color: '#fee2e2', iconColor: '#ef4444' },
    { id: 'automobile', label: 'Automobile', icon: Car, color: '#f0fdf4', iconColor: '#22c55e' },
    { id: 'painting', label: 'Painting', icon: PaintRoller, color: '#fef3c7', iconColor: '#f59e0b' },
    { id: 'gadget', label: 'Gadget Repairs', icon: Smartphone, color: '#ede9fe', iconColor: '#8b5cf6' },
    { id: 'carpenter', label: 'Carpenter', icon: Armchair, color: '#ffedd5', iconColor: '#f97316' },
    { id: 'gardening', label: 'Gardening', icon: Trees, color: '#ecfdf5', iconColor: '#10b981' },
];

const POPULAR_SERVICES = [
    { id: 1, title: 'Office Cleaning', price: '1000', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'Sink repair', price: '1000', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
    { id: 3, title: 'Solar Installation', price: '10000', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400' },
];

const TOP_ARTISANS = [
    { id: 1, name: 'Ayo Falokun', role: 'Plumber', rating: 4.8, distance: '1.2km', skills: ['Fixes', 'Pipe Installations', 'Drainage', 'Maintenance', 'Borehole sinking'], image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200', price: '3500' },
    { id: 2, name: 'Janet Oge', role: 'Electrician', rating: 4.8, distance: '1.2km', skills: ['Wiring', 'Installations', 'Solar installations', 'Solar upgrades'], image: 'https://images.unsplash.com/photo-1567532939604-b6c5b0adcc2c?auto=format&fit=crop&q=80&w=200', price: '2500' },
    { id: 3, name: 'Aaron Black', role: 'Painter', rating: 4.8, distance: '1.2km', skills: ['Wall painting', 'Wall art', 'Murals', 'Screeding', 'Interior'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', price: '3000', isVerified: true },
];

const BOOKINGS = [
    { id: '#001345', title: 'AC Repair', status: 'scheduled', date: '24th June, 2025', time: '12:00pm', address: '14 Selsun Street, Maitama, Abuja', artisan: 'Chinedu Eze', artisanRole: 'Electrician', artisanRating: 4.8, artisanReviews: 120, artisanLocation: 'Ikorodu, Lagos', price: '5800', type: 'active' },
    { id: '#001346', title: 'AC Repair', status: 'scheduled', date: '24th June, 2025', time: '12:00pm', address: '14 Selsun Street, Maitama, Abuja', artisan: 'Janet Oge', artisanRole: 'Electrician', artisanRating: 4.8, artisanReviews: 120, price: '5800', type: 'active', isVerified: true },
    { id: 4, artisan: 'Janet Oge', artisanRole: 'Electrician', artisanRating: 4.8, status: 'canceled', service: 'AC Repair', date: '24th June, 2025', time: '12:00pm', idTag: '#001345', price: 7900 },
];

const MESSAGES = [
    { id: 1, artisan: 'Chinedu Eze', lastMessage: 'Good day ma! I have left the old scre...', time: '12:00 PM', unread: 1, hasInvoice: false, location: 'Ikorodu, Lagos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { id: 2, artisan: 'Chinedu Eze', lastMessage: 'Invoice sent for the AC Repair', time: '12:00 PM', unread: 1, hasInvoice: true, location: 'Ikorodu, Lagos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { id: 3, artisan: 'Janet Oge', lastMessage: 'I will be there by 10am tomorrow', time: 'Yesterday', unread: 0, hasInvoice: false, location: 'Maitama, Abuja', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
];

const NOTIFICATIONS = [
    { id: 1, title: 'Booking Confirmed', description: 'Ifeanyi Okonkwo has confirmed your plumbing service for 2:00 PM today.', time: '2:45pm', date: 'today', dot: true, type: 'confirmed' },
    { id: 2, title: 'Artisan is on their way', description: 'Amina Yusuf is en route to your location. Get ready!.', time: '9:35am', date: '09/06', dot: true, type: 'on_way' },
    { id: 3, title: 'Service Reminder', description: 'You have a scheduled cleaning service tomorrow at 10:00 AM.', time: '9:35am', date: '09/06', dot: false, type: 'reminder' },
    { id: 4, title: 'Leave a Review', description: 'Rate your recent service with Chinyere Nwankwo to help others.', time: '3:25pm', date: '09/06', dot: false, type: 'review', rating: 4.8 }
];

const BANNERS = [
    { title: 'Get 15% off', sub: 'your first order', tag: 'New User', color: 'bg-[#F9D4A1]', icon: '🎫' },
    { title: 'FREE QUOTES', sub: 'No booking fees on all orders', tag: 'Weekend deal', color: 'bg-[#9882C7]', icon: '🏷️' },
    { title: 'Get 5% off', sub: 'on your 5th order', tag: 'New User', color: 'bg-[#C7E9C7]', icon: '💎' },
];

const Sidebar = ({ currentView, setCurrentView, setSelectedBooking }) => (
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
                    onClick={() => { setCurrentView(item.id); setSelectedBooking(null); }}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-bold tracking-wider text-[11px] ${currentView === item.id ? 'bg-white text-[#1E4E82]' : 'hover:bg-white/10 opacity-70 hover:opacity-100'}`}
                >
                    <item.icon size={18} fill={currentView === item.id ? 'currentColor' : 'none'} />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    </div>
);

const MobileHeader = ({ currentView, isMenuOpen, setIsMenuOpen, selectedBooking, setSelectedBooking, notificationsViewStep, setNotificationsViewStep, currentChat, messagesViewStep, setCurrentView, selectedArtisan, setSelectedArtisan }) => {
    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white z-50 px-5 flex items-center justify-between border-b border-gray-100 backdrop-blur-md bg-white/90">
            <div className="flex items-center gap-3">
                {(currentView !== 'home' || selectedBooking || (currentView === 'notifications' && notificationsViewStep === 'detail') || selectedArtisan) && (
                    <button onClick={() => {
                        if (selectedBooking) setSelectedBooking(null);
                        else if (selectedArtisan) setSelectedArtisan(null);
                        else if (currentView === 'notifications' && notificationsViewStep === 'detail') setNotificationsViewStep('list');
                        else setCurrentView('home');
                    }} className="p-1 -ml-1 text-[#0f172a] active:scale-90 transition-transform">
                        <ChevronLeft size={22} strokeWidth={2.5} />
                    </button>
                )}
                <h1 className={`${(currentView === 'notifications' && notificationsViewStep === 'detail') ? 'text-base' : 'text-lg'} font-black text-[#0f172a] capitalize tracking-tight`}>
                    {selectedBooking ? 'Order Details' :
                        (currentView === 'messages' && messagesViewStep === 'chat') ? currentChat?.artisan :
                            (currentView === 'notifications' && notificationsViewStep === 'detail') ? 'Notifications' :
                                (currentView === 'search' ? (selectedArtisan ? 'View Profile' : 'Search') : currentView)}
                </h1>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-900">{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </header>
    );
};

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, currentView, setCurrentView, setSelectedBooking, setNotificationsViewStep }) => (
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
                            onClick={() => { setCurrentView(item.id); setSelectedBooking(null); setIsMenuOpen(false); if (item.id === 'notifications') setNotificationsViewStep('list'); }}
                            className={`flex items-center gap-3.5 px-6 py-3.5 rounded-2xl transition-all font-bold tracking-wider w-full justify-center text-sm ${currentView === item.id ? 'bg-[#1E4E82] text-white shadow-lg' : 'text-gray-600'}`}
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

const HomeView = ({ setCurrentView, setNotificationsViewStep, TOP_ARTISANS, setIsMenuOpen, isMenuOpen }) => {
    const repeatedBanners = [...BANNERS, ...BANNERS, ...BANNERS];
    return (
        <div className="flex-1 p-4 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen pt-16 lg:pt-10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden ring-2 ring-white shadow-sm shrink-0">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-base font-black text-[#0f172a] leading-tight">Welcome</h2>
                        <p className="text-gray-400 text-[8px] flex items-center gap-1 font-black uppercase tracking-widest opacity-70"><MapPin size={8} /> 17 Ajao Rd, Ikeja, Lagos</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <button onClick={() => { setCurrentView('notifications'); setNotificationsViewStep('list'); }} className="p-2 bg-white rounded-xl shadow-sm relative transition-all active:scale-90 border border-gray-50"><Bell size={16} className="text-gray-600" /><span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" /></button>
                </div>
            </div>
            <div className="relative mb-6" onClick={() => setCurrentView('search')}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input type="text" readOnly placeholder="Search task or category" className="w-full bg-white pl-11 pr-4 py-3 rounded-2xl cursor-pointer border border-gray-100 focus:border-[#1E4E82]/20 transition-all text-gray-700 text-xs shadow-sm" />
            </div>
            <div className="relative overflow-hidden mb-8 h-[145px]">
                <motion.div className="flex gap-4 w-max" animate={{ x: [0, -BANNERS.length * 276] }} transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}>
                    {repeatedBanners.map((banner, i) => (
                        <div key={i} className={`min-w-[260px] p-4 rounded-[20px] flex flex-col justify-between h-[130px] ${banner.color} relative overflow-hidden shadow-sm`}>
                            <div className="z-10">
                                <span className="text-[7px] bg-white/30 px-2 py-0.5 rounded-full text-white font-bold uppercase tracking-widest">{banner.tag}</span>
                                <h3 className="text-base font-black text-white mt-1.5 leading-tight">{banner.title}</h3>
                                <p className="text-white/80 text-[9px] mt-0.5 font-bold">{banner.sub}</p>
                            </div>
                            <button className="z-10 self-end bg-white/20 text-white text-[7px] font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-widest hover:bg-white/40 transition-colors">Claim now</button>
                            <div className="absolute right-2 bottom-0 text-6xl opacity-20 pointer-events-none">{banner.icon}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <h3 className="text-xs font-black text-[#0f172a] mb-4 uppercase tracking-[0.1em] opacity-80">Top Rated</h3>
            <div className="flex flex-col gap-2.5 pb-24">
                {TOP_ARTISANS.map(artisan => (
                    <div key={artisan.id} className="bg-white p-3.5 rounded-[16px] border border-gray-100 flex items-center gap-3.5 shadow-sm hover:border-[#1E4E82]/20 transition-all group overflow-hidden">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform"><img src={artisan.image} alt="" className="w-full h-full object-cover" /></div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-[#0f172a] truncate">{artisan.name}</h4>
                            <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-tight"><span>{artisan.role}</span><span className="flex items-center gap-1"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {artisan.rating}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BookingsView = ({ bookingsData, bookingTab, setBookingTab, setSelectedBooking, setCurrentChat, setMessagesViewStep, setCurrentView }) => {
    const filteredBookings = bookingsData.filter(b => b.type === bookingTab);
    return (
        <div className="flex-1 p-4 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen pt-16 lg:pt-10 overflow-x-hidden relative flex flex-col">
            <h1 className="hidden lg:block text-base font-black text-[#0f172a] mb-4 uppercase tracking-[0.05em]">Bookings</h1>
            <div className="flex items-center gap-5 border-b border-gray-50 mb-4 overflow-x-auto scrollbar-hide">
                {['active', 'completed', 'canceled'].map(tab => (
                    <button key={tab} onClick={() => setBookingTab(tab)} className={`pb-2 text-[8px] font-black uppercase tracking-[0.15em] relative whitespace-nowrap ${bookingTab === tab ? 'text-[#1E4E82]' : 'text-gray-400'}`}>
                        {tab}
                        {bookingTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E4E82] rounded-full" />}
                    </button>
                ))}
            </div>
            <div className="space-y-2.5 max-w-4xl flex-1 pb-32">
                {filteredBookings.map(booking => (
                    <div key={booking.id} onClick={() => setSelectedBooking(booking)} className="bg-white border border-gray-50 rounded-[14px] p-3 lg:p-3.5 relative hover:border-[#1E4E82]/20 transition-all cursor-pointer group shadow-sm active:scale-[0.99] overflow-hidden">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[7px] text-gray-300 font-black uppercase tracking-[0.15em]">{booking.id}</span>
                            <div className="p-0.5 bg-gray-50 rounded-full text-[#1E4E82] group-hover:bg-blue-50 transition-colors"><ChevronRight size={12} /></div>
                        </div>
                        <h4 className="text-sm font-black text-[#0f172a] mb-0.5 tracking-tight">{booking.title}</h4>
                        <div className="space-y-0.5 mb-2 text-gray-400 font-bold text-[8px] uppercase tracking-wide">
                            <div className="flex items-center gap-1.5 opacity-80"><Calendar size={9} className="text-[#1E4E82]/60" /> {booking.date}</div>
                            <div className="flex items-center gap-1.5 opacity-80"><Clock size={9} className="text-[#1E4E82]/60" /> {booking.time}</div>
                            <div className="flex items-center gap-1.5 opacity-80"><MapPin size={9} className="text-[#1E4E82]/60" /> {booking.address}</div>
                        </div>
                        <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-100"><img src={booking.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"} alt="" className="w-full h-full object-cover" /></div>
                                <div><h5 className="font-bold text-gray-900 text-[9px] leading-none mb-0.5">{booking.artisan}</h5><p className="text-[6px] text-gray-400 uppercase font-black tracking-tighter">{booking.artisanRole}</p></div>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-1.5 bg-slate-50 rounded-lg text-[#1E4E82] active:scale-95 transition-all hover:bg-blue-50"><Phone size={10} /></button>
                                <button className="p-1.5 bg-slate-50 rounded-lg text-[#1E4E82] active:scale-95 transition-all hover:bg-blue-50" onClick={(e) => { e.stopPropagation(); setCurrentChat({ artisan: booking.artisan, avatar: booking.avatar, location: booking.location }); setCurrentView('messages'); setMessagesViewStep('chat'); }}><MessageSquare size={10} /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredBookings.length === 0 && <div className="text-center py-8 bg-slate-50/20 rounded-[20px] border border-dashed border-slate-100 flex flex-col items-center justify-center"><p className="text-gray-300 font-extrabold uppercase tracking-widest text-[7px]">No {bookingTab} bookings</p></div>}
            </div>
            <button className="fixed bottom-28 right-5 lg:right-10 w-10 h-10 bg-[#1E4E82] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 border border-white"><Plus size={18} strokeWidth={3} /></button>
        </div>
    );
};

const UserDashboard = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('home');
    const [bookingTab, setBookingTab] = useState('active');
    const [bookingsData, setBookingsData] = useState(BOOKINGS);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Notifications State
    const [notificationsViewStep, setNotificationsViewStep] = useState('list');
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Messages & Payment State
    const [messagesViewStep, setMessagesViewStep] = useState('list');
    const [currentChat, setCurrentChat] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [searchMessages, setSearchMessages] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [zoomedImage, setZoomedImage] = useState(null);
    const [selectedArtisan, setSelectedArtisan] = useState(null);
    const [recentSearches, setRecentSearches] = useState(['Plumber', 'Hairdresser']);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filtersEnabled, setFiltersEnabled] = useState(false);
    const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [selectedReportOption, setSelectedReportOption] = useState(null);

    const handleCancelBooking = (bookingId) => {
        setBookingsData(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'canceled', type: 'canceled' } : b));
        setSelectedBooking(null);
    };



    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} setSelectedBooking={setSelectedBooking} />
            <MobileHeader
                currentView={currentView}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                selectedBooking={selectedBooking}
                setSelectedBooking={setSelectedBooking}
                notificationsViewStep={notificationsViewStep}
                setNotificationsViewStep={setNotificationsViewStep}
                currentChat={currentChat}
                messagesViewStep={messagesViewStep}
                setCurrentView={setCurrentView}
                selectedArtisan={selectedArtisan}
                setSelectedArtisan={setSelectedArtisan}
            />
            <MobileMenu
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                currentView={currentView}
                setCurrentView={setCurrentView}
                setSelectedBooking={setSelectedBooking}
                setNotificationsViewStep={setNotificationsViewStep}
            />
            <FilterModal isFilterModalOpen={isFilterModalOpen} setIsFilterModalOpen={setIsFilterModalOpen} setFiltersEnabled={setFiltersEnabled} />
            <AnimatePresence mode="wait">
                <motion.div key={selectedBooking ? `details-${selectedBooking.id}` : currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex-1 w-full">
                    {selectedBooking ? <OrderDetailsView booking={selectedBooking} setSelectedBooking={setSelectedBooking} handleCancelBooking={handleCancelBooking} setCurrentChat={setCurrentChat} setCurrentView={setCurrentView} setMessagesViewStep={setMessagesViewStep} /> : (
                        <>
                            {currentView === 'home' && <HomeView setCurrentView={setCurrentView} setNotificationsViewStep={setNotificationsViewStep} TOP_ARTISANS={TOP_ARTISANS} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />}
                            {currentView === 'bookings' && <BookingsView bookingsData={bookingsData} bookingTab={bookingTab} setBookingTab={setBookingTab} setSelectedBooking={setSelectedBooking} setCurrentChat={setCurrentChat} setMessagesViewStep={setMessagesViewStep} setCurrentView={setCurrentView} />}
                            {currentView === 'messages' && <MessagesView
                                messagesViewStep={messagesViewStep}
                                setMessagesViewStep={setMessagesViewStep}
                                currentChat={currentChat}
                                setCurrentChat={setCurrentChat}
                                chatMessages={chatMessages}
                                setChatMessages={setChatMessages}
                                searchMessages={searchMessages}
                                setSearchMessages={setSearchMessages}
                                zoomedImage={zoomedImage}
                                setZoomedImage={setZoomedImage}
                                showMenuModal={showMenuModal}
                                setShowMenuModal={setShowMenuModal}
                                selectedReportOption={selectedReportOption}
                                setSelectedReportOption={setSelectedReportOption}
                                setCurrentView={setCurrentView}
                            />}
                            {currentView === 'notifications' && <NotificationsView notificationsViewStep={notificationsViewStep} setNotificationsViewStep={setNotificationsViewStep} selectedNotification={selectedNotification} setSelectedNotification={setSelectedNotification} setCurrentView={setCurrentView} />}
                            {currentView === 'settings' && <div className="flex-1 p-6 lg:ml-[240px] pt-24 lg:pt-10 h-screen flex flex-col items-center justify-center text-gray-300 font-bold uppercase tracking-widest"><Settings size={48} className="mb-4 opacity-10" /> Settings Coming Soon</div>}
                            {currentView === 'search' && <SearchView
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                recentSearches={recentSearches}
                                setRecentSearches={setRecentSearches}
                                selectedArtisan={selectedArtisan}
                                setSelectedArtisan={setSelectedArtisan}
                                isMenuOpen={isMenuOpen}
                                setIsMenuOpen={setIsMenuOpen}
                                setIsFilterModalOpen={setIsFilterModalOpen}
                                setCurrentView={setCurrentView}
                                isBookingFormOpen={isBookingFormOpen}
                                setIsBookingFormOpen={setIsBookingFormOpen}
                                filtersEnabled={filtersEnabled}
                                setFiltersEnabled={setFiltersEnabled}
                            />}
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const MessagesView = ({ messagesViewStep, setMessagesViewStep, currentChat, setCurrentChat, chatMessages, setChatMessages, searchMessages, setSearchMessages, zoomedImage, setZoomedImage, showMenuModal, setShowMenuModal, selectedReportOption, setSelectedReportOption, setCurrentView }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime(prev => (prev < 9 ? prev + 1 : 0));
            }, 1000);
        } else {
            setRecordingTime(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);
    const renderList = () => {
        const filteredMessages = MESSAGES.filter(m =>
            m.artisan.toLowerCase().includes(searchMessages.toLowerCase()) ||
            m.lastMessage.toLowerCase().includes(searchMessages.toLowerCase())
        );

        return (
            <div className="flex-1 lg:ml-[240px] bg-white min-h-screen pt-16 lg:pt-10 p-5 lg:p-8">
                <div className="hidden lg:flex items-center gap-3 mb-6">
                    <button onClick={() => setCurrentView('home')} className="p-1 -ml-1 text-[#0f172a] lg:hidden"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Messages</h1>
                </div>
                <div className="relative mb-6 max-w-4xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchMessages}
                        onChange={(e) => setSearchMessages(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-100 bg-white focus:outline-none focus:border-[#1E4E82]/30 text-gray-700 font-bold text-xs shadow-sm"
                    />
                </div>
                <div className="space-y-1">
                    {filteredMessages.map((msg) => (
                        <div key={msg.id} onClick={() => {
                            setCurrentChat(msg);
                            setChatMessages([
                                { id: 1, type: 'text', content: 'Share details of the event', sender: 'artisan', time: '2:30pm' },
                                ...(msg.hasInvoice ? [{ id: 2, type: 'invoice', content: 'IN00254', sender: 'artisan', time: '2:30pm' }] : []),
                                { id: 3, type: 'text', content: 'I will be there in 30 mins', sender: 'user', time: '2:30pm' }
                            ]);
                            setMessagesViewStep('chat');
                        }} className="flex items-center gap-3 p-3.5 hover:bg-slate-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 rounded-xl">
                            <div className="w-11 h-11 rounded-full bg-slate-200 overflow-hidden shrink-0 shadow-inner"><img src={msg.avatar} alt="" className="w-full h-full object-cover" /></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <h4 className="font-bold text-[#0f172a] truncate text-xs">{msg.artisan}</h4>
                                    <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">{msg.time}</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        {msg.hasInvoice && <span className="flex items-center gap-1 px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-[7px] font-black text-gray-500 uppercase shrink-0"><CreditCard size={8} /> invoice</span>}
                                        <p className="text-[10px] text-gray-400 truncate font-bold">{msg.lastMessage}</p>
                                    </div>
                                    {msg.unread > 0 && <span className="w-4 h-4 bg-[#1E4E82] text-white text-[8px] font-black rounded-full flex items-center justify-center shrink-0">{msg.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredMessages.length === 0 && <div className="text-center py-10 text-gray-300 font-black uppercase tracking-widest text-[8px]">No conversations found</div>}
                </div>
            </div>
        );
    };

    const renderReport = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-24 lg:pt-0">
            <div className="fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 flex items-center gap-4 border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('chat')} className="p-2 -ml-2 text-[#0f172a]"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Report</h1>
            </div>
            <div className="p-6 space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Why are you reporting this artisan?</p>
                {['Fake Profile', 'Harassment', 'Poor Quality Service', 'Overpricing', 'No-show', 'Other'].map((option) => (
                    <button key={option} onClick={() => setSelectedReportOption(option)} className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${selectedReportOption === option ? 'border-[#1E4E82] bg-blue-50/30' : 'border-gray-50 bg-white'}`}>
                        <span className={`font-bold ${selectedReportOption === option ? 'text-[#1E4E82]' : 'text-[#0f172a]'}`}>{option}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedReportOption === option ? 'border-[#1E4E82]' : 'border-gray-200'}`}>
                            {selectedReportOption === option && <div className="w-3 h-3 rounded-full bg-[#1E4E82]" />}
                        </div>
                    </button>
                ))}
            </div>
            <div className="mt-auto p-6 pb-12">
                <button
                    disabled={!selectedReportOption}
                    onClick={() => {
                        if (selectedReportOption === 'Other') setMessagesViewStep('report_other');
                        else setMessagesViewStep('feedback');
                    }}
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 ${selectedReportOption ? 'bg-[#1E4E82] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                    Submit
                </button>
            </div>
        </div>
    );

    const renderReportOther = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-24 lg:pt-0">
            <div className="fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 flex items-center gap-4 border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('report')} className="p-2 -ml-2 text-[#0f172a]"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Report</h1>
            </div>
            <div className="p-8">
                <h2 className="text-xl font-bold text-[#0f172a] mb-2">Help us understand...</h2>
                <p className="text-sm font-medium text-gray-400 mb-8">Please provide more details about the issue you encountered with this artisan.</p>
                <textarea
                    className="w-full h-48 bg-slate-50 rounded-[32px] p-6 focus:outline-none border-2 border-transparent focus:border-[#1E4E82]/20 font-medium text-[#0f172a] resize-none"
                    placeholder="Type here..."
                ></textarea>
            </div>
            <div className="mt-auto p-6 pb-12">
                <button onClick={() => setMessagesViewStep('feedback')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">Submit</button>
            </div>
        </div>
    );

    const renderFeedback = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center pt-24 lg:pt-0">
            <div className="w-64 h-64 mb-8 bg-[#fcf0ff] rounded-full flex items-center justify-center relative">
                <CheckCircle2 size={80} className="text-[#1E4E82]" />
                <motion.div initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-blue-100/30 rounded-full" />
            </div>
            <h1 className="text-3xl font-black text-[#0f172a] mb-4">Thanks for the feedback!</h1>
            <p className="text-gray-400 font-bold mb-12 max-w-xs leading-relaxed uppercase tracking-tight text-sm">We've received your report and will investigate it promptly to ensure a safer community.</p>
            <button onClick={() => { setCurrentView('home'); setMessagesViewStep('list'); }} className="w-full max-w-sm py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">Find New Artisan</button>
        </div>
    );

    const renderChat = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-24 lg:pt-0 overflow-x-hidden relative">
            <div className="fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-20 lg:h-16 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <button onClick={() => setMessagesViewStep('list')} className="p-2 -ml-2 text-[#0f172a]"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm"><img src={currentChat?.avatar} alt="" className="w-full h-full object-cover" /></div>
                    <div className="min-w-0"><h4 className="font-bold text-[#0f172a] -mb-1 truncate text-sm">{currentChat?.artisan}</h4><div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate"><MapPin size={8} /> {currentChat?.location}</div></div>
                </div>
                <div className="flex items-center gap-1.5">
                    {currentChat?.hasInvoice && <button onClick={() => setMessagesViewStep('invoice_detail')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors animate-pulse"><CreditCard size={20} strokeWidth={2.5} /></button>}
                    <button className="p-2 text-[#1E4E82] hover:bg-blue-50 rounded-full transition-colors"><Phone size={20} strokeWidth={2.5} /></button>
                    <div className="relative">
                        <button onClick={() => setShowMenuModal(!showMenuModal)} className="p-2 text-[#1E4E82] hover:bg-blue-50 rounded-full transition-colors"><MoreVertical size={20} strokeWidth={2.5} /></button>
                        {showMenuModal && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 overflow-hidden">
                                <button onClick={() => { setShowMenuModal(false); setMessagesViewStep('report'); }} className="w-full px-6 py-3.5 flex items-center gap-3 text-sm font-bold text-[#0f172a] hover:bg-blue-50 transition-colors uppercase tracking-tight"><Flag size={18} className="text-blue-900 fill-blue-900" /> Report</button>
                                <button onClick={() => { setShowMenuModal(false); setMessagesViewStep('block'); }} className="w-full px-6 py-3.5 flex items-center gap-3 text-sm font-bold text-[#b91c1c] hover:bg-red-50 transition-colors uppercase tracking-tight"><Ban size={18} /> Block</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 space-y-8 overflow-y-auto pb-32 scroll-smooth">
                <div className="flex justify-center"><span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">Today</span></div>

                {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end ml-auto' : 'items-start'} gap-1 max-w-[85%]`}>
                        {msg.type === 'text' && (
                            <div className={`${msg.sender === 'user' ? 'bg-[#1E4E82] text-white rounded-tr-none' : 'bg-[#F1F5F9] text-[#0f172a] rounded-tl-none'} p-4 font-medium text-sm rounded-[24px] leading-relaxed shadow-sm`}>
                                {msg.content}
                            </div>
                        )}
                        {msg.type === 'image' && (
                            <div onClick={() => setZoomedImage(msg.content)} className="rounded-[24px] overflow-hidden border-4 border-white shadow-xl cursor-pointer hover:scale-[1.02] transition-transform max-w-[240px]">
                                <img src={msg.content} alt="Sent attachment" className="w-full h-auto object-cover max-h-64" />
                            </div>
                        )}
                        {msg.type === 'invoice' && (
                            <div className="bg-[#F1F5F9] p-4 rounded-[24px] rounded-tl-none w-full sm:w-80 border border-gray-50">
                                <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm ring-1 ring-black/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400"><CreditCard size={20} /></div>
                                        <span className="font-extrabold text-[#0f172a]">{msg.content}</span>
                                    </div>
                                    <button onClick={() => setMessagesViewStep('invoice_detail')} className="px-3.5 py-2 bg-blue-50 text-[#1E4E82] text-[10px] font-black uppercase tracking-tighter rounded-xl transition-colors hover:bg-blue-100">View Details</button>
                                </div>
                            </div>
                        )}
                        {msg.type === 'rejected' && (
                            <div className="bg-red-50 border-2 border-red-100 p-4 rounded-[24px] rounded-tl-none flex items-center gap-3 text-red-600 font-bold text-sm">
                                <AlertCircle size={20} /> Invoice Rejected
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 px-1 mt-1">
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{msg.time}</span>
                            {msg.sender === 'user' && <CheckCircle2 size={12} className="text-blue-400" />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 lg:sticky lg:bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-4 pb-10 lg:pb-6 z-40">
                <div className="max-w-4xl mx-auto flex flex-col gap-2">
                    {isRecording && (
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-4 bg-red-50 p-4 rounded-2xl border border-red-100 mb-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                            <span className="font-bold text-red-600 text-sm">Recording: 0:0{recordingTime}</span>
                            <div className="flex-1 bg-red-200 h-1 rounded-full overflow-hidden"><motion.div className="bg-red-500 h-full" animate={{ width: ['0%', '100%'] }} transition={{ duration: 10, repeat: Infinity }} /></div>
                            <button onClick={() => setIsRecording(false)} className="text-red-500 font-bold text-xs uppercase tracking-widest">Cancel</button>
                        </motion.div>
                    )}
                    <div className="flex items-center gap-4">
                        <button onClick={() => {
                            const newMsg = { id: Date.now(), type: 'image', content: 'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=600', sender: 'user', time: '2:30pm' };
                            setChatMessages(prev => [...prev, newMsg]);
                        }} className="p-3 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-full transition-colors active:scale-90"><Camera size={26} /></button>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full pl-6 pr-14 py-3.5 rounded-full border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-inner font-medium text-sm"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                        const newMsg = { id: Date.now(), type: 'text', content: e.target.value, sender: 'user', time: '2:30pm' };
                                        setChatMessages(prev => [...prev, newMsg]);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all ${isRecording ? 'text-red-500 bg-red-50 scale-125' : 'text-[#1E4E82] hover:bg-blue-50'}`} onClick={() => {
                                if (!isRecording) {
                                    setIsRecording(true);
                                    setRecordingTime(0);
                                } else {
                                    setIsRecording(false);
                                }
                            }}><Mic size={24} /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Zoome Image Modal */}
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomedImage(null)} className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-6 lg:p-20">
                        <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full"><X size={32} /></button>
                        <img src={zoomedImage} alt="Zoomed" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Block Modal */}
            {messagesViewStep === 'block' && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[32px] p-10 max-w-sm w-full text-center shadow-2xl">
                        <h2 className="text-2xl font-black text-[#0f172a] mb-3">Block this Artisan?</h2>
                        <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10 uppercase tracking-tight">They won't be able to contact you or see your bookings anymore.</p>
                        <div className="space-y-4">
                            <button onClick={() => setMessagesViewStep('list')} className="w-full py-4.5 bg-[#b91c1c] text-white rounded-2xl font-bold transition-transform active:scale-95 shadow-xl">Block</button>
                            <button onClick={() => setMessagesViewStep('chat')} className="w-full py-4.5 bg-gray-100 text-gray-600 rounded-2xl font-bold transition-transform active:scale-95">Cancel</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );

    const renderInvoiceDetail = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-24 lg:pt-0">
            <div className="fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 flex items-center gap-4 border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('chat')} className="p-2 -ml-2 text-[#0f172a]"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Invoice - IN00254</h1>
            </div>
            <div className="p-6 space-y-8 overflow-y-auto pb-32">
                <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking ID</span>
                            <h4 className="text-xl font-black text-[#0f172a]">#001345</h4>
                        </div>
                        <span className="bg-[#1E4E82] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">AC Repair</span>
                    </div>
                    <div className="space-y-4 text-sm font-bold text-slate-500">
                        <div className="flex items-center gap-2"><Calendar size={16} /> 24th June, 2025</div>
                        <div className="flex items-center gap-2"><Clock size={16} /> 12:00pm</div>
                        <div className="flex items-center gap-2"><MapPin size={16} /> 14 Selsun Street, Maitama, Abuja</div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-2">Payment Summary</h3>
                    <div className="space-y-4 px-2">
                        <div className="flex justify-between font-bold text-gray-500"><span>Service Charge</span><span className="text-[#0f172a]">₦900</span></div>
                        <div className="flex justify-between font-bold text-gray-500"><span>Artisan Fee</span><span className="text-[#0f172a]">₦8,000</span></div>
                        <div className="flex justify-between font-bold text-gray-500"><span>Discount (5%)</span><span className="text-emerald-500">- ₦445</span></div>
                        <div className="flex justify-between text-3xl font-black text-[#0f172a] pt-6 border-t border-slate-100"><span>Total</span><span>₦8,455</span></div>
                    </div>
                </div>
            </div>
            <div className="fixed lg:sticky bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 space-y-4">
                <button onClick={() => setMessagesViewStep('payment')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">Make Payment</button>
                <button onClick={() => {
                    setChatMessages(prev => [...prev.filter(m => m.type !== 'invoice'), { id: Date.now(), type: 'rejected', sender: 'artisan', time: '2:30pm' }]);
                    setMessagesViewStep('chat');
                }} className="w-full py-5 text-[#1E4E82] font-black text-base active:scale-95 transition-all uppercase tracking-widest">Reject Invoice</button>
            </div>
        </div>
    );

    const renderPaymentMethod = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-24 lg:pt-0">
            <div className="fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 flex items-center gap-4 border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('invoice_detail')} className="p-2 -ml-2 text-[#0f172a]"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Payment</h1>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Select payment method</p>
                <div className="space-y-3">
                    {['Pay with Card', 'Bank Transfer', 'Apple Pay', 'Google Pay'].map((method) => (
                        <button key={method} onClick={() => {
                            if (method === 'Pay with Card') setMessagesViewStep('select_card');
                            else if (method === 'Bank Transfer') setMessagesViewStep('bank_transfer');
                            else setMessagesViewStep('success');
                        }} className="w-full p-6 border-2 border-gray-50 rounded-[24px] flex items-center justify-between hover:border-[#1E4E82]/20 hover:bg-slate-50 transition-all font-bold text-[#0f172a]">
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                                <span>{method}</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-300" />
                        </button>
                    ))}
                </div>
                <div className="pt-8 space-y-4 text-sm font-extrabold px-2">
                    <div className="flex justify-between text-gray-400 tracking-widest uppercase"><span>Total Fee</span><span className="text-blue-900 border-b-2 border-blue-900 leading-tight">₦8,455</span></div>
                </div>
            </div>
            <div className="mt-auto p-6 pb-12">
                <button onClick={() => setMessagesViewStep('success')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">Proceed</button>
            </div>
        </div>
    );

    const renderSelectCard = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-24 lg:pt-0">
            <div className="fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => setMessagesViewStep('payment')} className="p-2 -ml-2 text-[#0f172a]"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Select Card</h1>
                </div>
                <div className="flex gap-4"><Search size={24} className="text-gray-400" /><Plus size={24} className="text-gray-400" /></div>
            </div>
            <div className="p-8 space-y-6">
                <div className="bg-gradient-to-br from-[#1E4E82] to-[#0f172a] p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
                    <div className="flex justify-between items-start mb-12"><div className="w-12 h-10 bg-white/20 rounded-md backdrop-blur-sm" /><span className="font-extrabold italic text-xl">VISA</span></div>
                    <div className="text-2xl font-black tracking-[0.2em] mb-8">**** **** **** 5678</div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60"><span>Ayo Falokun</span><span>08 / 26</span></div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                </div>
            </div>
            <div className="mt-auto p-6 pb-12">
                <button onClick={() => setMessagesViewStep('success')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">Proceed</button>
            </div>
        </div>
    );

    const renderBankTransfer = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-24 lg:pt-0">
            <div className="fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => setMessagesViewStep('payment')} className="p-2 -ml-2 text-[#0f172a]"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Bank Transfer</h1>
                </div>
                <Plus size={24} className="text-gray-400" />
            </div>
            <div className="p-8 space-y-10">
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b-2 border-slate-50 pb-4">
                        <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Account Number</span><h3 className="text-3xl font-black text-[#0f172a]">0123456789</h3></div>
                        <button className="p-3 bg-slate-50 rounded-xl text-blue-900"><Copy size={20} /></button>
                    </div>
                    <div className="flex justify-between items-end border-b-2 border-slate-50 pb-4">
                        <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Bank Name</span><h3 className="text-2xl font-bold text-[#0f172a]">Access Bank</h3></div>
                    </div>
                    <div className="flex justify-between items-end border-b-2 border-slate-50 pb-4">
                        <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Account Name</span><h3 className="text-2xl font-bold text-[#0f172a]">Artifinda Limited</h3></div>
                    </div>
                </div>
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex justify-between items-center text-xl font-black">
                    <span className="text-slate-400 text-sm uppercase tracking-widest">Total Fee</span>
                    <span className="text-[#1E4E82]">₦8,455</span>
                </div>
            </div>
            <div className="mt-auto p-6 pb-12">
                <button onClick={() => setMessagesViewStep('success')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">Proceed</button>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center pt-24 lg:pt-0">
            <div className="w-64 h-64 mb-10 bg-emerald-50 rounded-full flex items-center justify-center relative">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 z-10"><CheckCircle2 size={48} /></div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute inset-0 bg-emerald-100/40 rounded-full" />
            </div>
            <h1 className="text-4xl font-black text-[#0f172a] mb-4">Payment Successful!</h1>
            <p className="text-gray-400 font-bold mb-12 max-w-xs leading-relaxed uppercase tracking-tight text-sm">Your payment of ₦8,455 has been processed successfully. Your artisan has been notified.</p>
            <div className="w-full max-w-sm space-y-4">
                <button onClick={() => setMessagesViewStep('receipt')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">View Receipt</button>
                <button onClick={() => { setCurrentView('home'); setMessagesViewStep('list'); }} className="w-full py-5 text-[#1E4E82] font-black text-base active:scale-95 transition-all uppercase tracking-widest">Go to Dashboard</button>
            </div>
        </div>
    );

    const renderReceipt = () => (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen flex flex-col pt-16 lg:pt-10">
            <div className="hidden lg:flex fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-16 flex items-center justify-between border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('chat')} className="p-2 -ml-2 text-[#0f172a]"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Receipt</h1>
                <button className="p-2 bg-slate-50 rounded-xl text-blue-900"><Share2 size={18} /></button>
            </div>
            <div className="p-4 lg:p-10 flex-1">
                <div className="bg-white border border-slate-100 rounded-[24px] p-6 lg:p-8 shadow-xl space-y-6 max-w-2xl mx-auto">
                    <div className="text-center pb-6 border-b border-slate-50">
                        <h2 className="text-3xl font-black text-[#0f172a] mb-1">₦8,455</h2>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest">Successful</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: 'Date & Time', value: '24th June, 2025 | 2:30pm' },
                            { label: 'Transaction ID', value: 'ART-092-124-912' },
                            { label: 'Paid To', value: 'Chinedu Eze' },
                            { label: 'Service', value: 'AC Repair' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{item.label}</span><span className="font-bold text-[#0f172a] text-xs">{item.value}</span></div>
                        ))}
                    </div>
                    <div className="pt-6 border-t border-slate-50 space-y-3">
                        <div className="flex justify-between font-bold text-slate-400 text-xs text-xs"><span>Service Charge</span><span className="text-[#0f172a]">₦900</span></div>
                        <div className="flex justify-between font-bold text-slate-400 text-xs text-xs"><span>Artisan Fee</span><span className="text-[#0f172a]">₦8,000</span></div>
                        <div className="flex justify-between font-bold text-slate-400 text-xs text-xs"><span>Discount</span><span className="text-emerald-500">- ₦445</span></div>
                    </div>
                </div>
            </div>
            <div className="mt-auto p-5 pb-10 max-w-2xl mx-auto w-full">
                <button className="w-full py-4 bg-[#1E4E82] text-white rounded-xl font-black text-base shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"><Download size={20} /> Download Receipt</button>
            </div>
        </div>
    );

    if (messagesViewStep === 'list') return renderList();
    if (messagesViewStep === 'chat' || messagesViewStep === 'block') return renderChat();
    if (messagesViewStep === 'report') return renderReport();
    if (messagesViewStep === 'report_other') return renderReportOther();
    if (messagesViewStep === 'feedback') return renderFeedback();
    if (messagesViewStep === 'invoice_detail') return renderInvoiceDetail();
    if (messagesViewStep === 'payment') return renderPaymentMethod();
    if (messagesViewStep === 'select_card') return renderSelectCard();
    if (messagesViewStep === 'bank_transfer') return renderBankTransfer();
    if (messagesViewStep === 'success') return renderSuccess();
    if (messagesViewStep === 'receipt') return renderReceipt();
    return null;
};

const NotificationsView = ({ notificationsViewStep, setNotificationsViewStep, selectedNotification, setSelectedNotification, setCurrentView }) => {
    const renderList = () => (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full pb-32 lg:pb-10 flex flex-col pt-16 lg:pt-6 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                <div className="hidden lg:flex items-center gap-3 px-8 mb-6 border-b border-slate-50 pb-4">
                    <button onClick={() => setCurrentView('home')} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Notifications</h1>
                </div>

                {notificationsData.length > 0 ? (
                    <div className="w-full px-2 lg:px-8">
                        {notificationsData.map((notif) => (
                            <div
                                key={notif.id}
                                onClick={() => {
                                    setSelectedNotification(notif);
                                    setNotificationsViewStep('detail');
                                }}
                                className="group flex flex-col gap-0.5 p-4 hover:bg-slate-50 cursor-pointer transition-all border-b border-gray-50 last:border-0 active:scale-[0.99]"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`shrink-0 w-2 h-2 rounded-full ${notif.dot ? 'bg-[#1E4E82] shadow-[0_0_6px_rgba(30,78,130,0.3)]' : 'bg-transparent'}`} />
                                        <h4 className="font-black text-[#0f172a] text-sm lg:text-base tracking-tight group-hover:text-[#1E4E82] transition-colors">{notif.title}</h4>
                                    </div>
                                    <div className="text-right flex flex-col items-end shrink-0">
                                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{notif.date}</span>
                                        <span className="text-[9px] text-gray-400 font-bold tracking-tight">{notif.time}</span>
                                    </div>
                                </div>
                                <div className="pl-4 pr-2">
                                    <p className="text-[11px] lg:text-xs text-gray-400 font-bold leading-relaxed max-w-2xl">{notif.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : renderEmpty()}
            </div>
        </div>
    );

    const renderEmpty = () => (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full flex flex-col items-center p-6 text-center pt-20 lg:pt-16 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                <div className="w-full max-w-xs mb-10 flex justify-center scale-90">
                    <div className="relative w-64 h-40">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-14 h-32 bg-slate-100 rounded-full flex flex-col items-center justify-between p-1.5 pt-4">
                            <div className="w-2 h-16 bg-slate-200 rounded-full" />
                            <div className="w-8 h-8 bg-slate-100 rounded-full border-2 border-white" />
                        </div>
                    </div>
                </div>
                <h2 className="text-xl lg:text-2xl font-black text-[#0f172a] mb-2 tracking-tight">No Notifications yet!</h2>
                <p className="text-gray-400 font-black mb-8 max-w-xs leading-relaxed uppercase tracking-widest text-[10px]">
                    We'll let you know as soon as you have something.
                </p>
                <button
                    onClick={() => setCurrentView('home')}
                    className="w-full max-w-xs py-4 bg-[#1E4E82] text-white rounded-[20px] font-black text-sm shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                    <span>Go to Home</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );

    const renderDetail = () => {
        const isConfirmed = selectedNotification?.type === 'confirmed';

        return (
            <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
                <div className="w-full pb-32 flex flex-col pt-16 lg:pt-6 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                    <div className="hidden lg:flex items-center gap-3 px-8 mb-6 border-b border-slate-50 pb-4">
                        <button onClick={() => setNotificationsViewStep('list')} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                        <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Notification Detail</h1>
                    </div>

                    <div className="w-full px-5 lg:px-8 space-y-8 flex flex-col items-center text-center">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-lg lg:text-xl font-black text-[#0f172a] tracking-tight">
                                {isConfirmed ? 'Booking Confirmed' : selectedNotification?.title}
                            </h2>
                            <div className="space-y-3 text-gray-500 font-bold text-xs lg:text-sm leading-relaxed">
                                {isConfirmed ? (
                                    <>
                                        <p>Your appointment for AC Repair has been confirmed.</p>
                                        <p>The artisan will arrive on <span className="text-[#0f172a] font-black">Thursday, June 15 at 2:00 PM.</span></p>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-6">Review the details below</p>
                                    </>
                                ) : (
                                    <p>{selectedNotification?.description}</p>
                                )}
                            </div>
                        </div>

                        {(isConfirmed || selectedNotification?.type === 'on_way' || selectedNotification?.type === 'reminder') && (
                            <div className="w-full max-w-xl bg-white border border-gray-100 rounded-[32px] p-6 lg:p-8 shadow-xl shadow-blue-900/[0.03] text-left">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="min-w-0">
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-0.5">#001345</span>
                                        <h3 className="text-lg lg:text-xl font-black text-[#0f172a] truncate">AC Repair</h3>
                                    </div>
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#1E4E82] rounded-full text-[9px] font-black uppercase tracking-widest ring-1 ring-blue-100/50">
                                        <div className="w-1.5 h-1.5 bg-[#1E4E82] rounded-full animate-pulse" />
                                        scheduled
                                    </span>
                                </div>

                                <div className="space-y-2.5 mb-8">
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><Calendar size={14} className="text-[#1E4E82]" /> 24th June, 2025</div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><Clock size={14} className="text-[#1E4E82]" /> 12:00pm</div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 min-w-0"><MapPin size={14} className="text-[#1E4E82] shrink-0" /> <span className="truncate">Maitama, Abuja</span></div>
                                </div>

                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="" className="w-full h-full object-cover" /></div>
                                        <div className="text-left min-w-0">
                                            <h5 className="font-bold text-[#0f172a] text-xs truncate">Chinedu Eze</h5>
                                            <p className="text-[9px] font-black text-slate-400 uppercase">Electrician • 4.8★</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <button className="p-2 bg-white rounded-xl text-[#1E4E82] shadow-sm active:scale-95 transition-all"><Phone size={16} /></button>
                                        <button className="p-2 bg-white rounded-xl text-[#1E4E82] shadow-sm active:scale-95 transition-all"><MessageSquare size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => setCurrentView('bookings')}
                            className="w-full max-w-xl py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            <span>View in Bookings</span>
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (notificationsViewStep === 'list') return renderList();
    if (notificationsViewStep === 'detail') return renderDetail();
    if (notificationsViewStep === 'empty') return renderEmpty();
    return null;
};


const SearchView = ({ searchQuery, setSearchQuery, recentSearches, setRecentSearches, selectedArtisan, setSelectedArtisan, isMenuOpen, setIsMenuOpen, setIsFilterModalOpen, setCurrentView, isBookingFormOpen, setIsBookingFormOpen, filtersEnabled, setFiltersEnabled }) => {
    const filteredArtisans = TOP_ARTISANS.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full pb-32 flex flex-col pt-16 lg:pt-6 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm px-5 lg:px-8">
                <div className="hidden lg:flex items-center justify-between gap-4 mb-6 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => { if (selectedArtisan) setSelectedArtisan(null); else setCurrentView('home'); }} className="p-1 -ml-1 text-[#0f172a] active:scale-90 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                        <h1 className="text-xl font-black text-[#0f172a] tracking-tight">{selectedArtisan ? 'View Profile' : 'Search'}</h1>
                    </div>
                </div>

                {!selectedArtisan ? (
                    <div className="w-full">
                        <div className="relative mb-6 group">
                            <input
                                type="text"
                                placeholder="Search task or category"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-5 pr-14 py-3.5 rounded-2xl border border-gray-100 bg-white focus:outline-none focus:border-[#1E4E82]/30 text-[#0f172a] font-bold text-sm transition-all shadow-sm placeholder:text-slate-300"
                            />
                            <button
                                onClick={() => setIsFilterModalOpen(true)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#1E4E82] hover:bg-blue-50 rounded-xl transition-all active:scale-95"
                            >
                                <Filter size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        {!searchQuery && recentSearches.length > 0 && (
                            <div className="mb-8 animate-in fade-in duration-500">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Recents</h3>
                                    <button onClick={() => setRecentSearches([])} className="text-[9px] font-black text-[#1E4E82]/60 hover:text-[#1E4E82] transition-colors uppercase tracking-tight">Clear All</button>
                                </div>
                                <div className="space-y-1">
                                    {recentSearches.map((s, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSearchQuery(s)}
                                            className="w-full p-4 text-left text-gray-600 font-bold hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 active:scale-[0.99] text-xs px-2"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {searchQuery && (
                            <div className="animate-in fade-in duration-500">
                                {filtersEnabled && (
                                    <div className="w-full bg-[#E8F0FE] border border-blue-100 text-[#1E4E82] py-3.5 px-5 rounded-[14px] mb-6 flex justify-between items-center shadow-sm">
                                        <span className="text-xs font-bold tracking-wide flex items-center gap-2">
                                            <Filter size={14} className="fill-[#1E4E82]" />
                                            Filters enabled
                                        </span>
                                        <button onClick={() => setFiltersEnabled(false)} className="text-[9px] font-bold uppercase tracking-widest hover:text-blue-900 active:scale-95 transition-all">
                                            Clear
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-[12px] font-medium text-gray-500 mb-6">Results for <span className="text-[#1E4E82]">"{searchQuery}" ({filteredArtisans.length})</span></h3>
                                <div className="space-y-4 pb-20">
                                    {filteredArtisans.map((artisan) => (
                                        <div
                                            key={artisan.id}
                                            onClick={() => setSelectedArtisan(artisan)}
                                            className="bg-white border border-gray-100 rounded-[20px] p-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between shadow-sm hover:border-[#1E4E82]/20 transition-all cursor-pointer group active:scale-[0.99] relative overflow-hidden"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500 relative">
                                                    <img src={artisan.image} alt="" className="w-full h-full object-cover" />
                                                    {artisan.isVerified && <div className="absolute top-0.5 right-0.5 bg-[#1E4E82] text-white p-0.5 rounded-full border border-white"><CheckCircle2 size={8} strokeWidth={3} /></div>}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                                        <h5 className="font-medium text-[14px] text-[#0f172a] tracking-tight">{artisan.name}</h5>
                                                        <span className={`text-[7px] font-medium px-1.5 py-0.5 rounded-sm uppercase tracking-tighter border ${artisan.isVerified ? 'bg-[#1E4E82] text-white border-blue-900' : 'bg-orange-500 text-white border-orange-600'}`}>
                                                            {artisan.isVerified ? 'Verified' : 'Pending'}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-bold uppercase tracking-tight text-gray-400">
                                                        <span className="text-[#1E4E82]">{artisan.role}</span>
                                                        <span className="flex items-center gap-1 text-gray-500"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {artisan.rating}</span>
                                                        <span className="flex items-center gap-1"><MapPin size={10} /> {artisan.distance}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex lg:flex-col lg:items-end justify-between items-center shrink-0">
                                                <div className="text-lg font-medium text-[#0f172a]">₦{artisan.price}<span className="text-[8px] text-gray-400 uppercase tracking-[0.2em] block lg:text-right">/hr</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <ArtisanProfileView artisan={selectedArtisan} setSelectedArtisan={setSelectedArtisan} setIsBookingFormOpen={setIsBookingFormOpen} isBookingFormOpen={isBookingFormOpen} />
                )}
            </div>
        </div>
    );
};


const FilterModal = ({ isFilterModalOpen, setIsFilterModalOpen, setFiltersEnabled }) => {
    const [priceRange, setPriceRange] = useState(1500);
    const [address, setAddress] = useState('17 Ajao Rd, Ikeja, Lagos, Nigeria');
    const [fromTime, setFromTime] = useState('06 : 00 am');
    const [toTime, setToTime] = useState('16 : 00 pm');
    const [fromDate, setFromDate] = useState('16th June, 2025');
    const [toDate, setToDate] = useState('16th June, 2025');
    const [serviceMode, setServiceMode] = useState('Select...');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // UI state
    const [showFromDateCalendar, setShowFromDateCalendar] = useState(false);
    const [showServiceModeDropdown, setShowServiceModeDropdown] = useState(false);

    const ADDRESS_SUGGESTIONS = [
        '17 Ajao Rd, Ikeja, Lagos, Nigeria',
        '22 Opebi Road, Ikeja, Lagos',
        'Lekki Phase 1, Lagos, Nigeria'
    ];

    const filteredSuggestions = ADDRESS_SUGGESTIONS.filter(item =>
        item.toLowerCase().includes(address.toLowerCase())
    );

    if (!isFilterModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-[#4A5568]/50 animate-in fade-in duration-300 px-6">
            <div className="bg-white w-full max-w-[420px] shadow-2xl relative" style={{ borderRadius: '12px' }}>
                <div className="p-7">
                    {/* Header */}
                    <div className="relative flex justify-center items-center mb-6">
                        <button onClick={() => setIsFilterModalOpen(false)} className="absolute left-0 p-1 rounded-md border border-slate-300 text-slate-500 hover:bg-slate-50 cursor-pointer">
                            <ChevronLeft size={16} />
                        </button>
                        <h2 className="text-[15px] font-bold text-[#0f172a]">Filter</h2>
                        <button onClick={() => setIsFilterModalOpen(false)} className="absolute right-0 p-1 rounded-full border border-slate-500 text-slate-600 hover:bg-slate-50 cursor-pointer">
                            <X size={14} />
                        </button>
                    </div>

                    <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1 pb-2 scrollbar-hide">
                        {/* Price Range */}
                        <div>
                            <h4 className="text-[12px] text-slate-500 mb-7">Price range(₦/hour)</h4>
                            <div className="px-2">
                                <div className="relative mb-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="500"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        className="w-full h-1 bg-slate-200 rounded-full appearance-none flex items-center cursor-pointer relative z-10 
                                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                                            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1E4E82] [&::-webkit-slider-thumb]:rounded-full"
                                        style={{
                                            background: `linear-gradient(to right, #1E4E82 ${(priceRange / 10000) * 100}%, #e2e8f0 ${(priceRange / 10000) * 100}%)`
                                        }}
                                    />
                                    {/* Tooltip */}
                                    <div
                                        className="absolute -top-7 bg-[#1E4E82] text-white text-[9px] font-medium px-1.5 py-0.5 rounded shadow pointer-events-none transform -translate-x-1/2"
                                        style={{ left: `${(priceRange / 10000) * 100}%` }}
                                    >
                                        {priceRange}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1E4E82]" />
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] items-center text-[#1E4E82] font-medium">
                                    <span>0</span>
                                    <span className="text-slate-400">10,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="relative">
                            <h4 className="text-[12px] text-slate-600 mb-1.5 font-medium">Address</h4>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value); setShowSuggestions(true); }}
                                onFocus={() => setShowSuggestions(true)}
                                className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 focus:border-[#1E4E82]/40 focus:outline-none text-slate-700 bg-white text-[11px] transition-all"
                            />
                            {showSuggestions && address.length > 0 && filteredSuggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg mt-1 shadow-xl z-[110] overflow-hidden max-h-40 overflow-y-auto">
                                    {filteredSuggestions.map((s, i) => (
                                        <div
                                            key={i}
                                            onClick={() => { setAddress(s); setShowSuggestions(false); }}
                                            className="px-4 py-2.5 text-[11px] text-slate-600 hover:bg-slate-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center gap-2"
                                        >
                                            <MapPin size={10} className="text-slate-400" />
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Availability */}
                        <div>
                            <h4 className="text-[12px] text-slate-600 mb-1.5 font-medium">Availability</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-slate-500 mb-1">From</p>
                                    <input type="text" value={fromTime} onChange={e => setFromTime(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white focus:outline-none focus:border-[#1E4E82]/50" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 mb-1">To</p>
                                    <input type="text" value={toTime} onChange={e => setToTime(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white focus:outline-none focus:border-[#1E4E82]/50" />
                                </div>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="relative z-[60]">
                            <h4 className="text-[12px] text-slate-600 mb-1.5 font-medium">Date</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <p className="text-[10px] text-slate-500 mb-1">From</p>
                                    <div
                                        onClick={() => setShowFromDateCalendar(!showFromDateCalendar)}
                                        className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white flex justify-between items-center cursor-pointer"
                                    >
                                        <span>{fromDate}</span>
                                        <ChevronDown size={14} className="text-slate-600" />
                                    </div>
                                    {showFromDateCalendar && (
                                        <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-[100] w-64 text-[11px] font-medium">
                                            <div className="flex justify-center items-center bg-black text-white rounded-[6px] py-1 mb-4 max-w-max mx-auto px-4 text-xs">
                                                <span>June</span>
                                            </div>
                                            <div className="grid grid-cols-7 gap-1 text-center text-slate-500 mb-3 text-[10px]">
                                                <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
                                            </div>
                                            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-slate-700">
                                                <div className="text-slate-300">26</div><div className="text-slate-300">27</div><div className="text-slate-300">28</div><div className="text-slate-300">29</div><div className="text-slate-300">30</div><div className="text-slate-300">31</div><div>1</div>
                                                <div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div>
                                                <div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div>
                                                <div className="bg-[#1E4E82] text-white rounded-md cursor-pointer flex items-center justify-center p-1 relative">
                                                    16
                                                </div>
                                                <div className="cursor-pointer p-1">17</div><div className="cursor-pointer p-1">18</div><div className="cursor-pointer p-1">19</div><div className="cursor-pointer p-1">20</div><div className="cursor-pointer p-1">21</div><div className="cursor-pointer p-1">22</div>
                                                <div className="p-1">23</div><div className="p-1">24</div><div className="p-1">25</div><div className="p-1">26</div><div className="p-1">27</div><div className="p-1">28</div><div className="p-1">29</div>
                                                <div className="p-1">30</div><div className="text-blue-300 p-1">1</div><div className="text-blue-300 p-1">2</div><div className="text-blue-300 p-1">3</div><div className="text-blue-300 p-1">4</div><div className="text-blue-300 p-1">5</div><div className="text-blue-300 p-1">6</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    <p className="text-[10px] text-slate-500 mb-1">To</p>
                                    <div className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white flex justify-between items-center cursor-pointer">
                                        <span>{toDate}</span>
                                        <ChevronDown size={14} className="text-slate-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service Mode */}
                        <div className="relative z-50">
                            <h4 className="text-[12px] text-slate-600 mb-1.5 font-medium">Service mode</h4>
                            <div
                                onClick={() => setShowServiceModeDropdown(!showServiceModeDropdown)}
                                className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white flex justify-between items-center cursor-pointer"
                            >
                                <span>{serviceMode}</span>
                                <ChevronDown size={14} className="text-slate-600" />
                            </div>
                            {showServiceModeDropdown && (
                                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-[10px] shadow-lg z-[100] overflow-hidden py-1">
                                    {['Select...', 'Home Service', 'Work Station', 'Both'].map((opt, i) => (
                                        <div
                                            key={i}
                                            onClick={() => { setServiceMode(opt); setShowServiceModeDropdown(false); }}
                                            className="px-4 py-2.5 text-[11px] text-slate-600 hover:bg-slate-50 cursor-pointer border-b border-gray-50 max-w-full last:border-0"
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={() => {
                                setFiltersEnabled(true);
                                setIsFilterModalOpen(false);
                            }}
                            className="w-full py-3 bg-[#D6E6F9] text-[#1E4E82] rounded-[10px] font-bold text-[13px] shadow-sm active:scale-95 transition-all hover:bg-[#c6dbf5]"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ArtisanProfileView = ({ artisan, setSelectedArtisan, setIsBookingFormOpen, isBookingFormOpen }) => {
    const [activeTab, setActiveTab] = useState('About');

    if (isBookingFormOpen) return <BookingForm artisan={artisan} setIsBookingFormOpen={setIsBookingFormOpen} setSelectedArtisan={setSelectedArtisan} />;

    return (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full pb-32 animate-in slide-in-from-right-4 duration-500 lg:px-6 lg:py-6 flex flex-col pt-2 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                {/* Header Area */}
                <div className="relative h-28 lg:h-48 rounded-[20px] overflow-hidden mb-12 shadow-sm bg-slate-50 group mx-4 lg:mx-0 mt-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E4E82]/10 to-slate-100" />
                    <button onClick={() => setSelectedArtisan(null)} className="absolute top-3 left-3 lg:top-4 lg:left-4 p-2 bg-white shadow-sm rounded-xl text-slate-600 active:scale-90 z-20 transition-transform hover:bg-slate-50">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="absolute top-3 right-3 lg:top-4 lg:right-4 p-2 bg-white shadow-sm rounded-xl text-slate-600 z-20 transition-transform hover:bg-slate-50">
                        <Share2 size={18} />
                    </button>

                    <div className="absolute -bottom-6 lg:-bottom-8 left-5 lg:left-8 flex items-end gap-3 px-1">
                        <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full border-4 border-white overflow-hidden shadow-sm relative bg-white">
                            <img src={artisan.image} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-1 right-1 lg:top-2 lg:right-2 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                        </div>
                    </div>
                </div>

                <div className="px-5 lg:px-8 space-y-6 lg:space-y-8 w-full">
                    <div className="pt-2">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <h1 className="text-xl lg:text-3xl font-black text-[#0f172a] tracking-tight leading-none">{artisan.name}</h1>
                            {artisan.isVerified && <span className="bg-[#1E4E82] text-white px-2 py-0.5 rounded-md text-[9px] lg:text-[10px] font-bold uppercase tracking-widest shadow-sm">Verified</span>}
                        </div>
                        <p className="text-xs lg:text-sm font-semibold text-slate-500 tracking-tight flex items-center gap-1.5 uppercase">
                            {artisan.role} <span className="text-slate-300">•</span> <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400" /> 2.1km</span>
                        </p>
                        <div className="flex items-center gap-1.5 mt-2.5 text-slate-500 font-bold text-[10px] lg:text-[11px] uppercase tracking-wider">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'} />)}
                            </div>
                            <span>4.8 (28 reviews)</span>
                        </div>
                    </div>

                    <div className="flex gap-2 lg:gap-3 border-b border-slate-100 pb-5">
                        {['About', 'Reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2.5 lg:px-8 lg:py-3 text-[13px] lg:text-sm font-bold rounded-full transition-all tracking-wide ${activeTab === tab ? 'bg-[#1E4E82] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'About' && (
                        <div className="space-y-8 animate-in fade-in duration-500 pt-2 lg:flex lg:gap-12 lg:space-y-0">
                            {/* Left Column contents */}
                            <div className="flex-1 space-y-8">
                                {/* Summary details */}
                                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center shadow-sm">
                                        <span className="block text-[10px] lg:text-xs text-slate-400 font-bold mb-1.5 uppercase tracking-widest">Base Rate</span>
                                        <span className="block text-sm lg:text-base font-black text-[#0f172a]">₦{artisan.price}/hr</span>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center shadow-sm">
                                        <span className="block text-[10px] lg:text-xs text-slate-400 font-bold mb-1.5 uppercase tracking-widest">Gender</span>
                                        <span className="block text-sm lg:text-base font-black text-[#0f172a]">Male</span>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center shadow-sm">
                                        <span className="block text-[10px] lg:text-xs text-slate-400 font-bold mb-1.5 uppercase tracking-widest">Experience</span>
                                        <span className="block text-sm lg:text-base font-black text-[#0f172a]">5+ Yrs</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs lg:text-sm font-black text-[#0f172a] mb-3 uppercase tracking-widest opacity-80">Bio</h3>
                                    <p className="text-[13px] lg:text-sm text-slate-500 font-medium leading-relaxed">
                                        Passionate about safe and efficient piping and plumbing repairs. I've been fixing plumbing faults for over 5 years. I specialize in residential and commercial plumbing, tackling everything from minor leaks to complete system overhauls. My topmost priority is providing durable solutions with a high standard of craftsmanship.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xs lg:text-sm font-black text-[#0f172a] mb-4 uppercase tracking-widest opacity-80">Skills & Expertise</h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {artisan.skills.map((skill, i) => (
                                            <span key={i} className="px-4 py-2 bg-[#F0F5FA] text-[#1E4E82] text-[11px] font-bold rounded-xl border border-blue-100/50 uppercase tracking-tight">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column contents */}
                            <div className="lg:w-[360px] space-y-8">
                                <div>
                                    <h3 className="text-xs lg:text-sm font-black text-[#0f172a] mb-3 uppercase tracking-widest opacity-80">Service Mode</h3>
                                    <div className="flex flex-col gap-3">
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-lg shadow-sm text-[#1E4E82]"><Home size={16} /></div> Home Service
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-lg shadow-sm text-[#1E4E82]"><Briefcase size={16} /></div> Work Station
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs lg:text-sm font-black text-[#0f172a] uppercase tracking-widest opacity-80">Gallery</h3>
                                        <button className="text-[10px] text-[#1E4E82] font-black uppercase tracking-widest hover:underline bg-blue-50 px-2.5 py-1 rounded-md">View All</button>
                                    </div>
                                    <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 lg:gap-3">
                                        <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden"><img src="https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=200" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" /></div>
                                        <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden"><img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" /></div>
                                        <div className="hidden lg:block aspect-square bg-slate-100 rounded-2xl overflow-hidden"><img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=200" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" /></div>
                                        <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-black cursor-pointer hover:bg-slate-100 hover:text-slate-600 transition-colors">+12</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs lg:text-sm font-black text-[#0f172a] mb-3 uppercase tracking-widest opacity-80">Availability</h3>
                                    <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                            <div key={day} className="flex justify-between items-center py-2 border-b border-slate-200/50 last:border-0">
                                                <span className="text-xs text-slate-500 font-bold">{day}</span>
                                                <span className="text-[11px] font-black tracking-widest text-[#0f172a]">08:00 AM - 06:00 PM</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center py-2 border-b border-slate-200/50 last:border-0">
                                            <span className="text-xs text-slate-500 font-bold">Saturday</span>
                                            <span className="text-[11px] font-black tracking-widest text-[#0f172a]">10:00 AM - 04:00 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-200/50 last:border-0">
                                            <span className="text-xs text-slate-400 font-bold italic">Sunday</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-200">Unavailable</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Reviews' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in duration-500 pt-2 lg:max-w-4xl">
                            {[
                                { name: 'Aisha B.', date: '12/01/2025', rating: 5, comment: "Amazing service! Very professional and helpful." },
                                { name: 'David O.', date: '05/01/2025', rating: 4, comment: "Fixed my pipes quickly. Will call again if needed." },
                                { name: 'Samuel K.', date: '22/12/2024', rating: 5, comment: "Arrived on time and did an excellent job. Highly recommended." },
                                { name: 'Grace E.', date: '15/12/2024', rating: 4, comment: "Very polite and explains everything he does. Good work." },
                            ].map((rev, i) => (
                                <div key={i} className="bg-white p-5 lg:p-6 rounded-[24px] border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm">
                                                {rev.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-sm text-[#0f172a] lg:mb-1 tracking-tight">{rev.name}</h5>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, idx) => <Star key={idx} size={10} className={idx < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'} />)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold tracking-widest">{rev.date}</span>
                                    </div>
                                    <p className="text-[13px] text-slate-600 font-medium leading-relaxed">"{rev.comment}"</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom Fixed Action Bar */}
                <div className="fixed bottom-0 left-0 lg:left-[240px] right-0 p-4 lg:p-6 bg-white border-t border-slate-100 flex gap-3 z-50 lg:mx-auto">
                    <button
                        onClick={() => setIsBookingFormOpen(true)}
                        className="flex-1 lg:max-w-lg mx-auto bg-[#1E4E82] text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs lg:text-sm shadow-[0_4px_14px_0_rgba(30,78,130,0.39)] hover:bg-[#153e6b] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Book Service Now
                    </button>
                    <div className="flex gap-3 lg:absolute lg:right-10">
                        <button className="flex items-center justify-center w-[54px] h-[54px] bg-[#E8F0FE] text-[#1E4E82] rounded-2xl transition-all hover:bg-blue-100 active:scale-95 shadow-sm">
                            <Phone size={22} strokeWidth={2.5} />
                        </button>
                        <button className="flex items-center justify-center w-[54px] h-[54px] bg-[#E8F0FE] text-[#1E4E82] rounded-2xl transition-all hover:bg-blue-100 active:scale-95 shadow-sm">
                            <MessageSquare size={22} className="fill-[#1E4E82] text-[#1E4E82]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingForm = ({ artisan, setIsBookingFormOpen, setSelectedArtisan }) => {
    const [fromTime, setFromTime] = useState('06:00 am');
    const [toTime, setToTime] = useState('04:00 pm');
    const [fromDate, setFromDate] = useState('16th June');
    const [toDate, setToDate] = useState('16th June');

    return (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full pb-32 animate-in slide-in-from-bottom-10 lg:slide-in-from-right-10 duration-500 flex flex-col pt-4 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                <div className="flex items-center justify-between mb-4 lg:hidden px-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => { setIsBookingFormOpen(false); }} className="p-2 bg-slate-50 rounded-xl text-slate-800 active:scale-90 transition-all hover:bg-slate-100"><ChevronLeft size={18} /></button>
                        <h1 className="text-[15px] font-bold text-[#0f172a] uppercase tracking-widest leading-none">Booking form</h1>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-3 px-8 mb-8 pb-4 border-b border-slate-100">
                    <button onClick={() => { setIsBookingFormOpen(false); }} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Booking Form</h1>
                </div>

                <div className="w-full px-5 lg:px-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column (Artisan Details) */}
                    <div>
                        <p className="text-[13px] lg:text-sm font-medium text-slate-500 mb-6 tracking-tight">Please fill out the necessary details below to secure your booking.</p>

                        {/* Artisan Card with Contact Icons */}
                        <div className="bg-slate-50 border border-slate-100 rounded-[20px] p-5 lg:p-6 mb-8 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img src={artisan.image} alt="" className="w-13 h-13 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                    <div className="absolute top-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <h5 className="font-bold text-[14px] lg:text-base text-[#0f172a] leading-none tracking-tight">{artisan.name}</h5>
                                        {artisan.isVerified && <span className="bg-[#1E4E82] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Verified</span>}
                                    </div>
                                    <p className="text-[11px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        {artisan.role} • <span className="flex items-center gap-1"><Star size={10} className="text-yellow-400 fill-yellow-400" /> 4.8</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2.5">
                                <button className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white border border-slate-100 text-[#1E4E82] rounded-2xl shadow-sm hover:bg-blue-50 transition-colors">
                                    <Phone size={16} />
                                </button>
                                <button className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white border border-slate-100 text-[#1E4E82] rounded-2xl shadow-sm hover:bg-blue-50 transition-colors">
                                    <MessageSquare size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-6 py-5 bg-white rounded-[20px] border border-slate-200 shadow-sm mb-6 lg:mb-0">
                            <span className="text-sm lg:text-base font-black text-[#0f172a] tracking-tight uppercase">Mark as Urgent</span>
                            <div className="w-12 h-6 bg-[#1E4E82] rounded-full p-1 relative cursor-pointer shadow-inner transition-colors">
                                <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Form Details) */}
                    <div className="space-y-6">
                        <div className="group">
                            <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1 group-focus-within:text-[#1E4E82] transition-colors">Title</h4>
                            <input
                                type="text"
                                placeholder="e.g. Broken pipe"
                                className="w-full px-6 py-4 rounded-[20px] border border-slate-200 focus:border-[#1E4E82] focus:ring-4 focus:ring-blue-50 focus:outline-none font-bold text-slate-700 bg-white text-sm shadow-sm transition-all placeholder:text-slate-300"
                            />
                        </div>

                        <div className="group">
                            <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1 group-focus-within:text-[#1E4E82] transition-colors">Short description</h4>
                            <textarea
                                placeholder="I need help with..."
                                className="w-full h-32 px-6 py-5 rounded-[20px] border border-slate-200 focus:border-[#1E4E82] focus:ring-4 focus:ring-blue-50 focus:outline-none font-bold text-slate-700 bg-white text-sm resize-none shadow-sm transition-all placeholder:text-slate-300"
                            />
                        </div>

                        <div>
                            <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Add Images (Optional)</h4>
                            <div className="w-full h-32 rounded-[20px] border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-[#1E4E82]/30 transition-all group relative">
                                <div className="text-center">
                                    <div className="mx-auto w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1E4E82] group-hover:scale-105 transition-all mb-3 border border-slate-100">
                                        <Plus size={20} className="stroke-[3px]" />
                                    </div>
                                    <span className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Upload media</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Address</h4>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="17 Ajao Rd, Ikeja, Lagos, Nigeria"
                                    className="w-full px-6 py-4 rounded-[20px] border border-slate-200 focus:border-[#1E4E82] focus:ring-4 focus:ring-blue-50 focus:outline-none font-bold text-slate-700 bg-white text-sm shadow-sm transition-all placeholder:text-slate-300 pr-12"
                                />
                                <MapPin size={18} strokeWidth={2.5} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1E4E82] transition-colors" />
                            </div>
                        </div>

                        {/* Range Selectors */}
                        <div className="grid grid-cols-2 gap-4 lg:gap-6">
                            <div>
                                <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Time</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 mb-1 lg:text-[10px]">From</p>
                                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-xs shadow-sm outline-none appearance-none focus:ring-4 focus:ring-blue-50 focus:border-[#1E4E82] transition-all" value={fromTime} onChange={(e) => setFromTime(e.target.value)}>
                                            <option>06:00 am</option><option>07:00 am</option><option>08:00 am</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 mb-1 lg:text-[10px]">To</p>
                                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-xs shadow-sm outline-none appearance-none focus:ring-4 focus:ring-blue-50 focus:border-[#1E4E82] transition-all" value={toTime} onChange={(e) => setToTime(e.target.value)}>
                                            <option>03:00 pm</option><option>04:00 pm</option><option>05:00 pm</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Date</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 mb-1 lg:text-[10px]">From</p>
                                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-xs shadow-sm outline-none appearance-none focus:ring-4 focus:ring-blue-50 focus:border-[#1E4E82] transition-all" value={fromDate} onChange={(e) => setFromDate(e.target.value)}>
                                            <option>16th June</option><option>17th June</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 mb-1 lg:text-[10px]">To</p>
                                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-xs shadow-sm outline-none appearance-none focus:ring-4 focus:ring-blue-50 focus:border-[#1E4E82] transition-all" value={toDate} onChange={(e) => setToDate(e.target.value)}>
                                            <option>16th June</option><option>17th June</option><option>18th June</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Date</h4>
                            <div className="p-4 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-sm shadow-sm flex justify-between items-center group cursor-pointer hover:border-[#1E4E82] hover:ring-4 hover:ring-blue-50 transition-all">
                                <span>16th June, 2025</span>
                                <ChevronRight size={16} className="rotate-90 text-slate-400 group-hover:text-blue-500" strokeWidth={3} />
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Service mode</h4>
                            <div className="p-4 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-sm shadow-sm flex justify-between items-center group cursor-pointer hover:border-[#1E4E82] hover:ring-4 hover:ring-blue-50 transition-all">
                                <span>Select...</span>
                                <ChevronRight size={16} className="rotate-90 text-slate-400 group-hover:text-blue-500" strokeWidth={3} />
                            </div>
                        </div>

                        <div className="pt-10 mb-8">
                            <button
                                onClick={() => setIsBookingFormOpen(false)}
                                className="w-full py-4 bg-[#1E4E82] text-white rounded-[20px] font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl active:scale-[0.98] transition-all hover:bg-[#153a63]"
                            >
                                Continue to Next Step
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderDetailsView = ({ booking, setSelectedBooking, handleCancelBooking, setCurrentChat, setCurrentView, setMessagesViewStep }) => {
    if (!booking) return null;
    return (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full pb-24 animate-in slide-in-from-right-4 duration-500 lg:px-8 lg:py-6 flex flex-col pt-20 lg:pt-4 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                <div className="fixed lg:hidden top-0 left-0 right-0 bg-white z-40 px-5 h-16 flex items-center gap-4 border-b border-gray-100">
                    <button onClick={() => setSelectedBooking(null)} className="p-2 bg-slate-50 rounded-full text-[#0f172a] active:scale-90 transition-all"><ChevronLeft size={20} strokeWidth={2.5} /></button>
                    <h1 className="text-lg font-black text-[#0f172a] tracking-tight">Order Details</h1>
                </div>

                <div className="hidden lg:flex items-center gap-4 mb-8 pb-4 border-b border-slate-100 mt-2">
                    <button onClick={() => setSelectedBooking(null)} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Order Details</h1>
                </div>

                <div className="w-full space-y-4 px-4 lg:px-0">
                    <div className="bg-white border border-slate-100 rounded-[24px] p-4 lg:p-6 flex items-center justify-between shadow-sm ring-1 ring-black/[0.01]">
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden shrink-0 shadow-inner ring-2 ring-slate-50">
                                <img src={booking.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h5 className="font-black text-base lg:text-lg text-[#0f172a] mb-0.5 leading-tight">{booking.artisan}</h5>
                                <div className="flex items-center gap-2 text-[8px] font-black uppercase text-slate-400 tracking-widest">
                                    <span>{booking.artisanRole}</span>
                                    <span className="flex items-center gap-0.5"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {booking.artisanRating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            <button className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><Phone size={14} /></button>
                            <button onClick={() => { setCurrentChat({ artisan: booking.artisan, avatar: booking.avatar, location: booking.location }); setCurrentView('messages'); setMessagesViewStep('chat'); setSelectedBooking(null); }} className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><MessageSquare size={14} /></button>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[24px] p-6 lg:p-8 shadow-sm space-y-6">
                        <section>
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">TITLE & DESCRIPTION</h6>
                            <h2 className="text-lg lg:text-xl font-black text-[#0f172a] mb-2 tracking-tight">{booking.title}</h2>
                            <p className="text-[11px] lg:text-xs text-slate-500 font-bold leading-relaxed">
                                My AC is leaking water into my room and making a weird loud noise and i need it fixed as soon as possible.
                            </p>
                        </section>

                        <section>
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">LOCATION</h6>
                            <div className="flex items-center gap-2 text-xs lg:text-sm font-bold text-[#0f172a]">
                                <MapPin size={14} className="text-[#1E4E82]" /> {booking.address}
                            </div>
                        </section>

                        <section className="flex flex-wrap gap-6">
                            <div className="flex-1 min-w-[80px]">
                                <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">DATE</h6>
                                <p className="text-sm lg:text-base font-black text-[#0f172a]">{booking.date}</p>
                            </div>
                            <div className="flex-1 min-w-[80px]">
                                <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">TIME</h6>
                                <p className="text-sm lg:text-base font-black text-[#0f172a]">{booking.time}</p>
                            </div>
                        </section>

                        <div className="pt-6 border-t border-slate-50">
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-4">PAYMENT SUMMARY</h6>
                            <div className="space-y-2.5">
                                <div className="flex justify-between font-bold text-[10px] lg:text-xs text-slate-400">
                                    <span>Service Charge</span>
                                    <span className="text-[#0f172a]">₦900</span>
                                </div>
                                <div className="flex justify-between text-xl lg:text-2xl font-black text-[#0f172a] pt-4 mt-2 border-t border-slate-50">
                                    <span>Total</span>
                                    <span>₦{booking.price}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="w-full py-3.5 text-[#b91c1c] font-black text-xs border border-red-100 rounded-xl hover:bg-red-50 transition-all active:scale-[0.98]"
                        >
                            Cancel Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
