import React from 'react';
import { ChevronLeft, Phone, MessageSquare, Mail } from 'lucide-react';

export const getDetailStatusBadge = (status) => {
    const s = (status || '').toUpperCase();
    switch (s) {
        case 'NEW': return <span className="px-2 py-1 bg-blue-50 text-blue-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-blue-900" /> New Request</span>;
        case 'ACCEPTED': return <span className="px-2 py-1 bg-indigo-50 text-indigo-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-indigo-900" /> accepted</span>;
        case 'COMPLETED': return <span className="px-2 py-1 bg-emerald-50 text-emerald-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-emerald-900" /> completed</span>;
        case 'REJECTED':
        case 'CANCELLED':
        case 'CANCELED': return <span className="px-2 py-1 bg-red-50 text-red-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-red-900" /> canceled</span>;
        default: return null;
    }
};

const ArtisanOrderDetailsView = ({ booking, onBack, onCancel, onComplete, onAccept, onMessageClick }) => {
    if (!booking) return null;

    const getActionButtons = (status) => {
        const s = (status || '').toUpperCase();
        switch (s) {
            case 'NEW':
                return (
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button onClick={() => onCancel(booking)} className="py-4 border-2 border-[#dc2626] text-[#dc2626] rounded-[16px] font-black text-sm uppercase tracking-widest">Reject</button>
                        <button onClick={() => onAccept(booking)} className="py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10">Accept</button>
                    </div>
                );
            case 'ACCEPTED':
                return (
                    <div className="grid grid-cols-1 gap-4 mt-8">
                        <button onClick={() => onComplete(booking)} className="py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10 cursor-pointer active:scale-[0.98] transition-all">Mark as Completed</button>
                    </div>
                );
            case 'COMPLETED':
            case 'REJECTED':
            case 'CANCELLED':
            case 'CANCELED':
                return (
                    <div className="mt-8">
                        <button className="w-full py-4 border-2 border-slate-200 text-slate-400 rounded-[16px] font-black text-sm uppercase tracking-widest cursor-not-allowed">No actions available</button>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="animate-in slide-in-from-right-4 duration-500 pb-10">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-8 pb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Order Details</h1>
                </div>
                {getDetailStatusBadge(booking.status)}
            </div>

            <div className="bg-white border border-slate-100 rounded-[24px] p-4 lg:p-6 flex items-center justify-between shadow-sm ring-1 ring-black/[0.01] mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 shadow-inner ring-2 ring-slate-50">
                        <img
                            src={booking.customer?.profilePicture || booking.customer?.appUser?.profilePicture || booking.customer?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.customer?.appUser?.firstName || booking.customer?.firstName || 'C') + ' ' + (booking.customer?.appUser?.lastName || booking.customer?.lastName || ''))}&background=1E4E82&color=fff&size=150`}
                            onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.customer?.appUser?.firstName || booking.customer?.firstName || 'C') + ' ' + (booking.customer?.appUser?.lastName || booking.customer?.lastName || ''))}&background=1E4E82&color=fff&size=150`; }}
                            alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h5 className="font-black text-lg text-[#0f172a] mb-0.5 leading-tight">{booking.customer?.appUser ? `${booking.customer.appUser.firstName} ${booking.customer.appUser.lastName}` : (booking.customer?.name || 'Customer')}</h5>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><Phone size={16} /></button>
                    <button onClick={() => { if(onMessageClick) onMessageClick(booking); }} className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><MessageSquare size={16} /></button>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[28px] p-6 lg:p-8 shadow-sm ring-1 ring-black/[0.01] space-y-8">
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Title</h6>
                    <h2 className="text-xl font-black text-[#0f172a] tracking-tight">{booking.bookingNote ? (booking.bookingNote.includes('\n\n') ? booking.bookingNote.split('\n\n')[0] : booking.bookingNote) : 'Service Booking'}</h2>
                </section>
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Description</h6>
                    <p className="text-sm text-slate-600 font-bold leading-relaxed">{booking.bookingNote && booking.bookingNote.includes('\n\n') ? booking.bookingNote.split('\n\n')[1] : (booking.bookingNote || 'No description provided.')}</p>
                </section>
                {booking.bookingMedia && booking.bookingMedia.length > 0 && (
                    <section>
                        <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">Images</h6>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                            {booking.bookingMedia.map((url, idx) => (
                                <div key={idx} className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm">
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Address</h6>
                    <p className="text-base font-black text-[#0f172a]">{booking.customerAddress?.address?.address || booking.address || 'Address TBD'}</p>
                </section>
                <section className="grid grid-cols-2 gap-6">
                    <div>
                        <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Date</h6>
                        <p className="text-base font-black text-[#0f172a]">{booking.bookingDate ? new Date(booking.bookingDate.replace(' ', 'T')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : (booking.date || 'TBD')}</p>
                    </div>
                    <div>
                        <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Time</h6>
                        <p className="text-base font-black text-[#0f172a]">{booking.bookingDate ? new Date(booking.bookingDate.replace(' ', 'T')).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : (booking.time || '--:--')}</p>
                    </div>
                </section>
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Service mode</h6>
                    <p className="text-base font-black text-[#0f172a]">{booking.serviceMode?.replace('_', ' ') || 'Home Service'}</p>
                </section>
                {/* <section className="pt-8 border-t border-gray-100">
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Payment Summary</h6>
                    <div className="flex justify-between items-center pt-5 border-t border-gray-100 mt-2">
                        <span className="text-base font-black text-[#0f172a]">Total Amount</span>
                        <span className="text-xl font-black text-[#0f172a]">₦{booking.price || booking.artisanCategorySkill?.artisanCategory?.rateAmount || '0.00'}</span>
                    </div>
                </section> */}
            </div>

            {getActionButtons(booking.status)}
        </div>
    );
};

export default ArtisanOrderDetailsView;
