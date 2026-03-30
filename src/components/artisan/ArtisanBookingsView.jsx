import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, AlertCircle, Calendar, Clock, MapPin, Phone, MessageSquare, Mail, Plus } from 'lucide-react';
import DashboardSkeleton from '../ui/DashboardSkeleton';

const ArtisanBookingsView = ({ bookingsData, loadingBookings, onSelectBooking, onCancel, onComplete, onAccept, setCurrentView, activeTab, setActiveTab }) => {
    const tabs = ['New', 'Ongoing', 'Completed', 'Canceled'];

    const filteredBookings = (bookingsData || []).filter(b => {
        const s = (b.bookingStatus || b.status || '').toString().trim().toUpperCase();
        if (activeTab === 'New') return ['NEW', 'PENDING'].includes(s);
        if (activeTab === 'Ongoing') return ['ACCEPTED'].includes(s);
        if (activeTab === 'Completed') return ['COMPLETED', 'FINISHED'].includes(s);
        if (activeTab === 'Canceled') return ['REJECTED', 'CANCELLED', 'CANCELED', 'DECLINED', 'EXPIRED'].includes(s);
        return false;
    });

    const getStatusBadge = (status) => {
        const s = (status || '').toUpperCase();
        switch (s) {
            case 'NEW': return <span className="px-2 py-1 bg-blue-50 text-blue-500 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> New</span>;
            case 'ACCEPTED': return <span className="px-2 py-1 bg-indigo-50 text-indigo-500 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Accepted</span>;
            case 'COMPLETED': return <span className="px-2 py-1 bg-emerald-50 text-emerald-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-900" /> completed</span>;
            case 'REJECTED':
            case 'CANCELLED':
            case 'CANCELED': return <span className="px-2 py-1 bg-red-50 text-red-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-900" /> canceled</span>;
            default: return null;
        }
    };

    const getActionButtons = (status, booking) => {
        const s = (status || '').toUpperCase();
        switch (s) {
            case 'NEW':
                return (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button onClick={() => onCancel(booking)} className="py-2.5 border border-[#dc2626] text-[#dc2626] rounded-xl font-bold text-sm">Reject</button>
                        <button onClick={() => onAccept(booking)} className="py-2.5 bg-[#1E4E82] text-white rounded-xl font-bold text-sm">Accept</button>
                    </div>
                );
            case 'ACCEPTED':
                return (
                    <div className="grid grid-cols-1 gap-3 mt-4">
                        <button onClick={() => onComplete(booking)} className="py-2.5 bg-[#1E4E82] text-white rounded-xl font-bold text-sm">Complete</button>
                    </div>
                );
            case 'COMPLETED':
            case 'REJECTED':
            case 'CANCELLED':
            case 'CANCELED':
                return (
                    <div className="mt-4">
                        <button className="w-full py-2.5 border border-slate-200 text-slate-400 rounded-xl font-bold text-sm uppercase tracking-widest cursor-not-allowed">No actions available</button>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="space-y-2">
            <h1 className="hidden lg:block text-2xl font-black text-[#0f172a] tracking-tight">Bookings</h1>

            {/* Main Tabs */}
            <div className="flex border-b border-gray-100 items-center justify-between lg:justify-center gap-4 lg:gap-8 mb-4 overflow-x-auto no-scrollbar scroll-smooth">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-bold transition-all relative shrink-0 min-w-fit px-2 cursor-pointer ${activeTab === tab ? 'text-[#1E4E82]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {tab}
                        {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E4E82]" />}
                    </button>
                ))}
            </div>


            {/* Bookings List */}
            <div className={`space-y-4 ${filteredBookings.length === 0 && !loadingBookings ? 'flex-1 flex flex-col items-center justify-center min-h-[400px]' : ''}`}>
                {loadingBookings ? (
                    <DashboardSkeleton type="bookings" />
                ) : filteredBookings.length > 0 ? (
                    filteredBookings.map(booking => {
                        const dateObj = booking.bookingDate ? new Date(booking.bookingDate.replace(' ', 'T')) : null;
                        const displayDate = dateObj && !isNaN(dateObj) ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : (booking.date || 'TBD');
                        const displayTime = dateObj && !isNaN(dateObj) ? dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : (booking.time || '--:--');

                        return (
                            <div key={booking.id} className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm w-full transition-all hover:border-[#1E4E82]/10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1 block">#{booking.id || '---'}</span>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-black text-[#0f172a]">{booking.bookingNote ? (booking.bookingNote.includes('\n\n') ? booking.bookingNote.split('\n\n')[0] : booking.bookingNote) : 'Service Booking'}</h4>
                                            {getStatusBadge(booking.bookingStatus)}
                                        </div>
                                    </div>
                                    <button onClick={() => onSelectBooking(booking)} className="p-2 border border-slate-200 rounded-full text-slate-400 hover:text-[#1E4E82] hover:bg-blue-50 transition-all cursor-pointer">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>

                                <p className="text-[11px] text-slate-500 font-bold leading-relaxed line-clamp-1 mb-4">
                                    {booking.bookingNote && booking.bookingNote.includes('\n\n') ? booking.bookingNote.split('\n\n')[1] : (booking.bookingNote || 'No description provided.')}
                                </p>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 max-w-[75%]">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400"><Calendar size={14} className="text-[#1E4E82]/60" /> {displayDate}</div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400"><Clock size={14} className="text-[#1E4E82]/60" /> {displayTime}</div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400"><MapPin size={14} className="text-[#1E4E82]/60" /> {booking.customerAddress?.address?.address?.split(',')[0] || booking.address?.split(',')[0] || 'Address TBD'}</div>
                                    </div>
                                    {/* <span className="text-xl font-black text-[#0f172a] shrink-0">₦{booking.price || booking.artisanCategorySkill?.artisanCategory?.rateAmount || '0.00'}</span> */}
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-50 shadow-inner">
                                            <img
                                                src={booking.customer?.profilePicture || booking.customer?.appUser?.profilePicture || booking.customer?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.customer?.appUser?.firstName || booking.customer?.firstName || 'C') + ' ' + (booking.customer?.appUser?.lastName || booking.customer?.lastName || ''))}&background=1E4E82&color=fff&size=100`}
                                                onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.customer?.appUser?.firstName || booking.customer?.firstName || 'C') + ' ' + (booking.customer?.appUser?.lastName || booking.customer?.lastName || ''))}&background=1E4E82&color=fff&size=100`; }}
                                                alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-bold text-slate-700 text-sm">{booking.customer?.appUser ? `${booking.customer.appUser.firstName} ${booking.customer.appUser.lastName}` : (booking.customer?.name || 'Customer')}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-slate-50 rounded-xl text-[#1E4E82] hover:bg-blue-50 transition-colors"><Phone size={14} /></button>
                                        <button onClick={() => { if (onMessageClick) onMessageClick(booking); }} className="p-2 bg-slate-50 rounded-xl text-[#1E4E82] hover:bg-blue-50 transition-colors"><MessageSquare size={14} /></button>
                                    </div>
                                </div>

                                {getActionButtons(booking.bookingStatus, booking)}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center text-center py-12 px-6">
                        <div className="w-full max-w-xs mb-8 flex justify-center scale-90">
                            <div className="relative w-64 h-40">
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-14 h-32 bg-slate-100 rounded-full flex flex-col items-center justify-between p-1.5 pt-4">
                                    <div className="w-2 h-16 bg-slate-200 rounded-full" />
                                    <div className="w-8 h-8 bg-slate-100 rounded-full border-2 border-white" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pt-8">
                                    <div className="flex gap-3 items-end">
                                        <div className="w-8 h-16 bg-slate-200 rounded-t-lg opacity-40" />
                                        <div className="w-8 h-24 bg-slate-300 rounded-t-lg opacity-40" />
                                        <div className="w-8 h-20 bg-slate-200 rounded-t-lg opacity-40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-xl font-black text-[#0f172a] mb-2 tracking-tight uppercase">No {activeTab} Bookings</h2>
                        <p className="text-slate-400 font-bold mb-8 max-w-[240px] leading-relaxed text-xs">You don't have any bookings in this category yet. Keep up the good work!</p>
                        <button onClick={() => setCurrentView('dashboard')} className="w-full max-w-xs py-4.5 bg-[#1E4E82] text-white rounded-[20px] font-black text-sm shadow-xl active:scale-95 transition-all">
                            Back to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtisanBookingsView;
