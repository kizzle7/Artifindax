import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, MessageSquare, Star, Plus } from 'lucide-react';

const BookingForm = ({ artisan, setIsBookingFormOpen, userProfile }) => {
    const [fromTime, setFromTime] = useState('06:00 am');
    const [toTime, setToTime] = useState('04:00 pm');
    const [fromDate, setFromDate] = useState('16th June');
    const [toDate, setToDate] = useState('16th June');

    return (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full pb-32 flex flex-col pt-4 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                <div className="flex items-center gap-3 mb-4 lg:mb-8 px-4 lg:px-8 pb-4 border-b border-slate-100">
                    <button onClick={() => setIsBookingFormOpen(false)} className="p-2 bg-slate-50 lg:bg-transparent rounded-xl text-slate-800 active:scale-90 transition-all"><ChevronLeft size={18} /></button>
                    <h1 className="text-[15px] lg:text-2xl font-bold lg:font-black text-[#0f172a] uppercase lg:normal-case tracking-widest lg:tracking-tight">Booking form</h1>
                </div>
                <div className="w-full px-5 lg:px-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-6">Please fill out the necessary details below to secure your booking.</p>
                        <div className="bg-slate-50 border border-slate-100 rounded-[20px] p-5 mb-8 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img src={artisan?.profilePicture || artisan?.image} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-sm text-[#0f172a]">{artisan?.firstName ? `${artisan.firstName} ${artisan.lastName}` : artisan?.name}</h5>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">{artisan?.skillName || artisan?.role} • <Star size={10} className="text-yellow-400 fill-yellow-400" /> {artisan?.rating || '4.8'}</p>
                                </div>
                            </div>
                            <div className="flex gap-2.5">
                                <button className="flex items-center justify-center w-10 h-10 bg-white border border-slate-100 text-[#1E4E82] rounded-2xl shadow-sm"><Phone size={16} /></button>
                                <button className="flex items-center justify-center w-10 h-10 bg-white border border-slate-100 text-[#1E4E82] rounded-2xl shadow-sm"><MessageSquare size={16} /></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-6 py-5 bg-white rounded-[20px] border border-slate-200 shadow-sm">
                            <span className="text-sm font-black text-[#0f172a] tracking-tight uppercase">Mark as Urgent</span>
                            <div className="w-12 h-6 bg-[#1E4E82] rounded-full p-1 relative cursor-pointer"><div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full shadow-sm" /></div>
                        </div>
                    </div>
                    <div className="space-y-6 mt-6 lg:mt-0">
                        <div><h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Title</h4><input type="text" placeholder="e.g. Broken pipe" className="w-full px-6 py-4 rounded-[20px] border border-slate-200 focus:border-[#1E4E82] focus:outline-none font-bold text-slate-700 bg-white text-sm shadow-sm" /></div>
                        <div><h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Short description</h4><textarea placeholder="I need help with..." className="w-full h-32 px-6 py-5 rounded-[20px] border border-slate-200 focus:border-[#1E4E82] focus:outline-none font-bold text-slate-700 bg-white text-sm resize-none shadow-sm" /></div>
                        <div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Add Images (Optional)</h4>
                            <div className="w-full h-32 rounded-[20px] border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-[#1E4E82]/30 transition-all">
                                <div className="text-center"><div className="mx-auto w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1E4E82] mb-3 border border-slate-100"><Plus size={20} /></div><span className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Upload media</span></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Address</h4>
                            <div className="relative"><input type="text" defaultValue={userProfile?.addresses?.[0]?.address || "17 Ajao Rd, Ikeja, Lagos, Nigeria"} className="w-full px-6 py-4 rounded-[20px] border border-slate-200 focus:border-[#1E4E82] focus:outline-none font-bold text-slate-700 bg-white text-sm shadow-sm pr-12" /><MapPin size={18} strokeWidth={2.5} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Time</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><p className="text-[9px] font-bold text-slate-400 mb-1">From</p><select className="w-full px-3 py-3 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-xs shadow-sm outline-none appearance-none" value={fromTime} onChange={(e) => setFromTime(e.target.value)}><option>06:00 am</option><option>07:00 am</option><option>08:00 am</option></select></div>
                                    <div><p className="text-[9px] font-bold text-slate-400 mb-1">To</p><select className="w-full px-3 py-3 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-xs shadow-sm outline-none appearance-none" value={toTime} onChange={(e) => setToTime(e.target.value)}><option>03:00 pm</option><option>04:00 pm</option><option>05:00 pm</option></select></div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Date</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><p className="text-[9px] font-bold text-slate-400 mb-1">From</p><select className="w-full px-3 py-3 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-xs shadow-sm outline-none appearance-none" value={fromDate} onChange={(e) => setFromDate(e.target.value)}><option>16th June</option><option>17th June</option></select></div>
                                    <div><p className="text-[9px] font-bold text-slate-400 mb-1">To</p><select className="w-full px-3 py-3 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-xs shadow-sm outline-none appearance-none" value={toDate} onChange={(e) => setToDate(e.target.value)}><option>16th June</option><option>17th June</option><option>18th June</option></select></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">Service mode</h4>
                            <div className="p-4 bg-white border border-slate-200 rounded-[16px] font-bold text-slate-700 text-sm shadow-sm flex justify-between items-center cursor-pointer hover:border-[#1E4E82] transition-all"><span>Select...</span><ChevronRight size={16} className="rotate-90 text-slate-400" strokeWidth={3} /></div>
                        </div>
                        <div className="pt-6 mb-8"><button onClick={() => setIsBookingFormOpen(false)} className="w-full py-4 bg-[#1E4E82] text-white rounded-[20px] font-black text-sm uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all">Continue to Next Step</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
