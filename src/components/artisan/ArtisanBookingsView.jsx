import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, AlertCircle, Calendar, Clock, MapPin, Phone, MessageSquare, Mail, Plus } from 'lucide-react';
import { ARTISAN_BOOKINGS } from '../../constants/artisanData';

const ArtisanBookingsView = ({ onSelectBooking, onCancel, onComplete, onAccept, setCurrentView }) => {
    const [activeTab, setActiveTab] = useState('Requests');
    const [activeSubTab, setActiveSubTab] = useState('Ongoing');

    const tabs = ['Requests', 'Active', 'Completed', 'Canceled'];

    const filteredBookings = ARTISAN_BOOKINGS.filter(b => {
        if (activeTab === 'Requests') return b.status === 'urgent';
        if (activeTab === 'Active') {
            if (activeSubTab === 'Ongoing') return b.status === 'ongoing';
            return b.status === 'scheduled';
        }
        if (activeTab === 'Completed') return b.status === 'completed';
        if (activeTab === 'Canceled') return b.status === 'canceled';
        return false;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'urgent': return <span className="px-2 py-1 bg-red-50 text-red-500 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><AlertCircle size={10} /> Urgent</span>;
            case 'scheduled': return <span className="px-2 py-1 bg-blue-50 text-blue-500 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> scheduled</span>;
            case 'ongoing': return <span className="px-2 py-1 bg-orange-50 text-orange-500 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> ongoing</span>;
            case 'completed': return <span className="px-2 py-1 bg-emerald-50 text-emerald-500 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> completed</span>;
            case 'canceled': return <span className="px-2 py-1 bg-red-50 text-red-400 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400" /> canceled</span>;
            default: return null;
        }
    };

    const getActionButtons = (status, booking) => {
        switch (status) {
            case 'urgent':
                return (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button onClick={() => onCancel(booking)} className="py-2.5 border border-[#1E4E82] text-[#1E4E82] rounded-xl font-bold text-sm">Ignore</button>
                        <button onClick={() => onAccept(booking)} className="py-2.5 bg-[#1E4E82] text-white rounded-xl font-bold text-sm">Accept</button>
                    </div>
                );
            case 'scheduled':
                return (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button onClick={() => onCancel(booking)} className="py-2.5 border border-[#1E4E82] text-[#1E4E82] rounded-xl font-bold text-sm">Cancel</button>
                        <button className="py-2.5 bg-[#1E4E82] text-white rounded-xl font-bold text-sm">Mark as Started</button>
                    </div>
                );
            case 'ongoing':
                return (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button onClick={() => onCancel(booking)} className="py-2.5 border border-[#1E4E82] text-[#1E4E82] rounded-xl font-bold text-sm">Cancel</button>
                        <button onClick={() => onComplete(booking)} className="py-2.5 bg-[#1E4E82] text-white rounded-xl font-bold text-sm">Mark as Completed</button>
                    </div>
                );
            case 'completed':
            case 'canceled':
                return (
                    <div className="mt-4">
                        <button className="w-full py-2.5 border border-[#1E4E82] text-[#1E4E82] rounded-xl font-bold text-sm uppercase tracking-widest">View Review</button>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="hidden lg:block text-2xl font-black text-[#0f172a] tracking-tight">Bookings</h1>

            {/* Main Tabs */}
            <div className="flex border-b border-gray-100 items-center justify-between lg:justify-center gap-4 lg:gap-8 mb-4 overflow-x-auto no-scrollbar scroll-smooth">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-bold transition-all relative shrink-0 min-w-fit px-2 ${activeTab === tab ? 'text-[#1E4E82]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {tab}
                        {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E4E82]" />}
                    </button>
                ))}
            </div>

            {/* Active Sub-tabs */}
            {activeTab === 'Active' && (
                <div className="flex justify-center mb-6">
                    <div className="bg-slate-100/50 p-1.5 rounded-2xl flex gap-1 items-center">
                        {['Ongoing', 'Upcoming'].map(sub => (
                            <button
                                key={sub}
                                onClick={() => setActiveSubTab(sub)}
                                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === sub ? 'bg-white text-[#0f172a] shadow-sm' : 'text-gray-400 hover:text-gray-500'}`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Bookings List */}
            <div className={`space-y-4 ${filteredBookings.length === 0 ? 'flex-1 flex flex-col items-center justify-center min-h-[400px]' : ''}`}>
                {filteredBookings.length > 0 ? (
                    filteredBookings.map(booking => (
                        <div key={booking.id} className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm w-full">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1 block">{booking.id}</span>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-black text-[#0f172a]">{booking.title}</h4>
                                        {getStatusBadge(booking.status)}
                                    </div>
                                </div>
                                <button onClick={() => onSelectBooking(booking)} className="p-2 border border-slate-400 rounded-full text-slate-400 hover:text-slate-600">
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            <p className="text-[11px] text-slate-500 font-bold leading-relaxed line-clamp-1 mb-4">{booking.shortDescription}</p>

                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-wrap gap-x-6 gap-y-2 max-w-[75%]">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400"><Calendar size={14} /> {booking.date}</div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400"><Clock size={14} /> {booking.time.from.split(' ')[0]} {booking.time.from.split(' ')[2]}</div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400"><MapPin size={14} /> {booking.address.split(',')[0]}</div>
                                </div>
                                <span className="text-xl font-black text-[#0f172a] shrink-0">₦{booking.payment.total}</span>
                            </div>

                            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={booking.customer.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                                    <span className="font-bold text-slate-700">{booking.customer.name}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-slate-50 rounded-xl text-blue-900"><Phone size={14} /></button>
                                    <button className="p-2 bg-slate-50 rounded-xl text-blue-900"><MessageSquare size={14} /></button>
                                    <button className="p-2 bg-slate-50 rounded-xl text-blue-900"><Mail size={14} /></button>
                                </div>
                            </div>

                            {getActionButtons(booking.status, booking)}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center text-center p-6">
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
                        <h2 className="text-2xl font-black text-[#0f172a] mb-2 tracking-tight">No Bookings yet!</h2>
                        <p className="text-slate-400 font-bold mb-8 max-w-[240px] leading-relaxed text-sm">You can view and manage your bookings on this page</p>
                        <button onClick={() => setCurrentView('dashboard')} className="w-full max-w-xs py-4.5 bg-[#1E4E82] text-white rounded-[20px] font-black text-sm shadow-xl active:scale-95 transition-all">
                            Book a Service Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtisanBookingsView;
