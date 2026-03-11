import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, ChevronRight, MapPin, Clock, Calendar, Plus } from 'lucide-react';

const BookingsView = ({ bookingsData, bookingTab, setBookingTab, setSelectedBooking, setCurrentChat, setMessagesViewStep, setCurrentView }) => {
    const filteredBookings = bookingsData.filter(b => b.type === bookingTab);
    return (
        <div className="flex-1 p-4 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen pt-16 lg:pt-10 overflow-x-hidden relative flex flex-col">
            <h1 className="hidden lg:block text-base font-black text-[#0f172a] mb-4 uppercase tracking-[0.05em]">Bookings</h1>
            <div className="flex items-center gap-5 border-b border-gray-50 mb-4 overflow-x-auto scrollbar-hide">
                {['active', 'completed', 'canceled'].map(tab => (
                    <button key={tab} onClick={() => setBookingTab(tab)} className={`pb-2 text-xs font-black uppercase tracking-[0.15em] relative whitespace-nowrap ${bookingTab === tab ? 'text-[#1E4E82]' : 'text-gray-400'}`}>
                        {tab}
                        {bookingTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E4E82] rounded-full" />}
                    </button>
                ))}
            </div>
            <div className="space-y-2.5 max-w-full flex-1 pb-32">
                {filteredBookings.map(booking => (
                    <div key={booking.id} onClick={() => setSelectedBooking(booking)} className="bg-white border border-gray-50 rounded-[14px] p-3 lg:p-3.5 relative hover:border-[#1E4E82]/20 transition-all cursor-pointer group shadow-sm active:scale-[0.99] overflow-hidden">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.15em]">{booking.id}</span>
                            <div className="p-0.5 bg-gray-50 rounded-full text-[#1E4E82] group-hover:bg-blue-50 transition-colors"><ChevronRight size={12} /></div>
                        </div>
                        <h4 className="text-base font-black text-[#0f172a] mb-0.5 tracking-tight">{booking.title}</h4>
                        <div className="space-y-0.5 mb-2 text-gray-400 font-bold text-[10px] uppercase tracking-wide">
                            <div className="flex items-center gap-1.5 opacity-80"><Calendar size={9} className="text-[#1E4E82]/60" /> {booking.date}</div>
                            <div className="flex items-center gap-1.5 opacity-80"><Clock size={9} className="text-[#1E4E82]/60" /> {booking.time}</div>
                            <div className="flex items-center gap-1.5 opacity-80"><MapPin size={9} className="text-[#1E4E82]/60" /> {booking.address}</div>
                        </div>
                        <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-100"><img src={booking.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"} alt="" className="w-full h-full object-cover" /></div>
                                <div><h5 className="font-bold text-gray-900 text-xs leading-none mb-0.5">{booking.artisan}</h5><p className="text-[9px] text-gray-400 uppercase font-black tracking-tighter">{booking.artisanRole}</p></div>
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
            <button onClick={() => setCurrentView('search')} className="fixed bottom-28 right-5 lg:right-10 w-10 h-10 bg-[#1E4E82] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 border border-white">
                <Plus size={18} strokeWidth={3} />
            </button>
        </div>
    );
};

export default BookingsView;
