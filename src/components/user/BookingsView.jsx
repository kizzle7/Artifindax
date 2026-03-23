import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, ChevronRight, MapPin, Clock, Calendar, Plus } from 'lucide-react';

const BookingsView = ({ bookingsData, bookingTab, setBookingTab, setSelectedBooking, setCurrentChat, setMessagesViewStep, setCurrentView, loadingBookings }) => {
    const getStatusGroup = (status) => {
        const s = (status || '').toString().trim().toUpperCase();
        if (['NEW', 'ACCEPTED', 'PENDING', 'ONGOING'].includes(s)) return 'ongoing';
        if (['COMPLETED', 'FINISHED'].includes(s)) return 'completed';
        if (['REJECTED', 'CANCELLED', 'CANCELED', 'DECLINED', 'EXPIRED'].includes(s)) return 'canceled';
        return 'ongoing'; // Default for unknown/active-like states
    };

    const filteredBookings = bookingsData.filter(b => getStatusGroup(b.bookingStatus || b.status) === bookingTab);

    return (
        <div className="flex-1 p-4 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen pt-16 lg:pt-10 overflow-x-hidden relative flex flex-col">
            <h1 className="hidden lg:block text-base font-black text-[#0f172a] mb-4 uppercase tracking-[0.05em]">Bookings</h1>
            <div className="flex items-center gap-5 border-b border-gray-50 mb-4 overflow-x-auto scrollbar-hide">
                {['ongoing', 'completed', 'canceled'].map(tab => (
                    <button key={tab} onClick={() => setBookingTab(tab)} className={`pb-2 text-xs font-black uppercase tracking-[0.15em] relative whitespace-nowrap cursor-pointer ${bookingTab === tab ? 'text-[#1E4E82]' : 'text-gray-400'}`}>
                        {tab}
                        {bookingTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E4E82] rounded-full" />}
                    </button>
                ))}
            </div>
            <div className="space-y-2.5 max-w-full flex-1 pb-32">
                {loadingBookings ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <div className="w-8 h-8 border-2 border-[#1E4E82] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1E4E82]">Fetching your bookings...</p>
                    </div>
                ) : (
                    <>
                        {filteredBookings.map(booking => {
                            // Extract title from bookingNote
                            const displayTitle = booking.bookingNote || 'Service Booking';

                            const artisan = booking.artisan;
                            const artisanName = artisan?.appUser
                                ? `${artisan.appUser.firstName || ''} ${artisan.appUser.lastName || ''}`.trim()
                                : (booking.artisanName || 'Artisan');

                            const artisanRole = booking.artisanCategorySkill?.artisanCategory?.category?.name || booking.artisanRole || 'Professional';
                            const artisanAvatar = artisan?.appUser?.profilePicture || booking.avatar;

                            const dateObj = booking.bookingDate ? new Date(booking.bookingDate.replace(' ', 'T')) : null;
                            const displayDate = dateObj && !isNaN(dateObj) ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : (booking.date || 'To be decided');
                            const displayTime = dateObj && !isNaN(dateObj) ? dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : (booking.time || '--:--');

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={booking.id}
                                    onClick={() => setSelectedBooking(booking)}
                                    className="bg-white border border-gray-50 rounded-[14px] p-3 lg:p-3.5 relative hover:border-[#1E4E82]/20 transition-all cursor-pointer group shadow-sm active:scale-[0.99] overflow-hidden"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.15em]">#{booking.id || '---'}</span>
                                        <div className="p-0.5 bg-gray-50 rounded-full text-[#1E4E82] group-hover:bg-blue-50 transition-colors"><ChevronRight size={12} /></div>
                                    </div>
                                    <h4 className="text-base font-black text-[#0f172a] mb-0.5 tracking-tight capitalize">{displayTitle}</h4>
                                    <div className="space-y-0.5 mb-2 text-gray-400 font-bold text-[10px] uppercase tracking-wide">
                                        <div className="flex items-center gap-1.5 opacity-80"><Calendar size={9} className="text-[#1E4E82]/60" /> {displayDate}</div>
                                        <div className="flex items-center gap-1.5 opacity-80"><Clock size={9} className="text-[#1E4E82]/60" /> {displayTime}</div>
                                        <div className="flex items-center gap-1.5 opacity-80"><MapPin size={9} className="text-[#1E4E82]/60" /> {booking.serviceMode?.replace('_', ' ') || 'Home Service'}</div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-100">
                                                <img
                                                    src={artisanAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artisanName)}&background=1E4E82&color=fff&size=150`}
                                                    onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisanName || 'Artisan')}&background=1E4E82&color=fff&size=150`; }}
                                                    alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-gray-900 text-xs leading-none mb-0.5">{artisanName}</h5>
                                                <p className="text-[9px] text-gray-400 uppercase font-black tracking-tighter">{artisanRole}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider ${bookingTab === 'ongoing' ? 'bg-blue-50 text-[#1E4E82]' :
                                                bookingTab === 'completed' ? 'bg-green-50 text-green-600' :
                                                    'bg-red-50 text-red-600'
                                                }`}>
                                                {booking.bookingStatus || booking.status}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                        {filteredBookings.length === 0 && (
                            <div className="text-center py-8 bg-slate-50/20 rounded-[20px] border border-dashed border-slate-100 flex flex-col items-center justify-center">
                                <p className="text-gray-300 font-extrabold uppercase tracking-widest text-[7px]">No {bookingTab} bookings</p>
                            </div>
                        )}
                    </>
                )}
            </div>
            <button onClick={() => setCurrentView('search')} className="fixed bottom-28 right-5 lg:right-10 w-10 h-10 bg-[#1E4E82] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 border border-white cursor-pointer">
                <Plus size={18} strokeWidth={3} />
            </button>
        </div>
    );
};

export default BookingsView;
