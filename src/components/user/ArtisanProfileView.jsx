import React, { useState } from 'react';
import { ChevronLeft, MapPin, Phone, MessageSquare, Star, Share2, Home, Briefcase, CheckCircle2, Plus } from 'lucide-react';
import BookingForm from './BookingForm';

const ArtisanProfileView = ({ artisan, setSelectedArtisan, setIsBookingFormOpen, isBookingFormOpen, userProfile }) => {
    const [activeTab, setActiveTab] = useState('About');
    if (isBookingFormOpen) return <BookingForm artisan={artisan} setIsBookingFormOpen={setIsBookingFormOpen} setSelectedArtisan={setSelectedArtisan} userProfile={userProfile} />;

    return (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full pb-32 animate-in slide-in-from-right-4 duration-500 lg:px-6 lg:py-6 flex flex-col pt-2 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                <div className="relative h-28 lg:h-48 rounded-[20px] overflow-hidden mb-12 shadow-sm bg-slate-50 group mx-4 lg:mx-0 mt-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E4E82]/10 to-slate-100" />
                    <button onClick={() => setSelectedArtisan(null)} className="absolute top-3 left-3 lg:top-4 lg:left-4 p-2 bg-white shadow-sm rounded-xl text-slate-600 active:scale-90 z-20 transition-transform hover:bg-slate-50"><ChevronLeft size={20} /></button>
                    <button className="absolute top-3 right-3 lg:top-4 lg:right-4 p-2 bg-white shadow-sm rounded-xl text-slate-600 z-20 transition-transform hover:bg-slate-50"><Share2 size={18} /></button>
                    <div className="absolute -bottom-6 lg:-bottom-8 left-5 lg:left-8 flex items-end gap-3 px-1">
                        <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full border-4 border-white overflow-hidden shadow-sm relative bg-white">
                            <img src={artisan.profilePicture || artisan.image} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-1 right-1 lg:top-2 lg:right-2 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                        </div>
                    </div>
                </div>
                <div className="px-5 lg:px-8 space-y-6 lg:space-y-8 w-full">
                    <div className="pt-2">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <h1 className="text-xl lg:text-3xl font-black text-[#0f172a] tracking-tight leading-none">{artisan.firstName ? `${artisan.firstName} ${artisan.lastName}` : artisan.name}</h1>
                            {(artisan.isVerified || artisan.status === 'ACTIVE') && <span className="bg-[#1E4E82] text-white px-2 py-0.5 rounded-md text-[9px] lg:text-[10px] font-bold uppercase tracking-widest shadow-sm">Verified</span>}
                        </div>
                        <p className="text-xs lg:text-sm font-semibold text-slate-500 tracking-tight flex items-center gap-1.5 uppercase">{artisan.skillName || artisan.role} <span className="text-slate-300">•</span> <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400" /> {artisan.distance || '2.1km'}</span></p>
                        <div className="flex items-center gap-1.5 mt-2.5 text-slate-500 font-bold text-[10px] lg:text-[11px] uppercase tracking-wider">
                            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'} />)}</div>
                            <span>4.8 (28 reviews)</span>
                        </div>
                    </div>
                    <div className="flex gap-2 lg:gap-3 border-b border-slate-100 pb-5">
                        {['About', 'Reviews'].map((tab) => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 lg:px-8 lg:py-3 text-[13px] lg:text-sm font-bold rounded-full transition-all tracking-wide ${activeTab === tab ? 'bg-[#1E4E82] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>{tab}</button>
                        ))}
                    </div>
                    {activeTab === 'About' && (
                        <div className="space-y-8 animate-in fade-in duration-500 pt-2 lg:flex lg:gap-12 lg:space-y-0">
                            <div className="flex-1 space-y-8">
                                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center shadow-sm"><span className="block text-[10px] lg:text-xs text-slate-400 font-bold mb-1.5 uppercase tracking-widest">Base Rate</span><span className="block text-sm lg:text-base font-black text-[#0f172a]">₦{artisan.price}/hr</span></div>
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center shadow-sm"><span className="block text-[10px] lg:text-xs text-slate-400 font-bold mb-1.5 uppercase tracking-widest">Gender</span><span className="block text-sm lg:text-base font-black text-[#0f172a]">Male</span></div>
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center shadow-sm"><span className="block text-[10px] lg:text-xs text-slate-400 font-bold mb-1.5 uppercase tracking-widest">Experience</span><span className="block text-sm lg:text-base font-black text-[#0f172a]">5+ Yrs</span></div>
                                </div>
                                <div><h3 className="text-xs lg:text-sm font-black text-[#0f172a] mb-3 uppercase tracking-widest opacity-80">Bio</h3><p className="text-[13px] lg:text-sm text-slate-500 font-medium leading-relaxed">Passionate about safe and efficient piping and plumbing repairs. I've been fixing plumbing faults for over 5 years. I specialize in residential and commercial plumbing, tackling everything from minor leaks to complete system overhauls.</p></div>
                                <div>
                                    <h3 className="text-xs lg:text-sm font-black text-[#0f172a] mb-4 uppercase tracking-widest opacity-80">Skills & Expertise</h3>
                                    <div className="flex flex-wrap gap-2.5">{artisan.skills.map((skill, i) => <span key={i} className="px-4 py-2 bg-[#F0F5FA] text-[#1E4E82] text-[11px] font-bold rounded-xl border border-blue-100/50 uppercase tracking-tight">{skill}</span>)}</div>
                                </div>
                            </div>
                            <div className="lg:w-[360px] space-y-8">
                                <div>
                                    <h3 className="text-xs lg:text-sm font-black text-[#0f172a] mb-3 uppercase tracking-widest opacity-80">Service Mode</h3>
                                    <div className="flex flex-col gap-3">
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 flex items-center gap-3"><div className="p-2 bg-white rounded-lg shadow-sm text-[#1E4E82]"><Home size={16} /></div> Home Service</div>
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 flex items-center gap-3"><div className="p-2 bg-white rounded-lg shadow-sm text-[#1E4E82]"><Briefcase size={16} /></div> Work Station</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-3"><h3 className="text-xs lg:text-sm font-black text-[#0f172a] uppercase tracking-widest opacity-80">Gallery</h3><button className="text-[10px] text-[#1E4E82] font-black uppercase tracking-widest hover:underline bg-blue-50 px-2.5 py-1 rounded-md">View All</button></div>
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
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => <div key={day} className="flex justify-between items-center py-2 border-b border-slate-200/50 last:border-0"><span className="text-xs text-slate-500 font-bold">{day}</span><span className="text-[11px] font-black tracking-widest text-[#0f172a]">08:00 AM - 06:00 PM</span></div>)}
                                        <div className="flex justify-between items-center py-2 border-b border-slate-200/50"><span className="text-xs text-slate-500 font-bold">Saturday</span><span className="text-[11px] font-black tracking-widest text-[#0f172a]">10:00 AM - 04:00 PM</span></div>
                                        <div className="flex justify-between items-center py-2"><span className="text-xs text-slate-400 font-bold italic">Sunday</span><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-200">Unavailable</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Reviews' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in duration-500 pt-2 lg:max-w-4xl">
                            {[{ name: 'Aisha B.', date: '12/01/2025', rating: 5, comment: 'Amazing service! Very professional and helpful.' }, { name: 'David O.', date: '05/01/2025', rating: 4, comment: 'Fixed my pipes quickly. Will call again if needed.' }, { name: 'Samuel K.', date: '22/12/2024', rating: 5, comment: 'Arrived on time and did an excellent job. Highly recommended.' }, { name: 'Grace E.', date: '15/12/2024', rating: 4, comment: 'Very polite and explains everything he does. Good work.' }].map((rev, i) => (
                                <div key={i} className="bg-white p-5 lg:p-6 rounded-[24px] border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3"><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm">{rev.name.charAt(0)}</div><div><h5 className="font-bold text-sm text-[#0f172a] lg:mb-1 tracking-tight">{rev.name}</h5><div className="flex gap-0.5">{[...Array(5)].map((_, idx) => <Star key={idx} size={10} className={idx < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'} />)}</div></div></div>
                                        <span className="text-[10px] text-slate-400 font-bold tracking-widest">{rev.date}</span>
                                    </div>
                                    <p className="text-[13px] text-slate-600 font-medium leading-relaxed">"{rev.comment}"</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="fixed bottom-0 left-0 lg:left-[240px] right-0 p-4 lg:p-6 bg-white border-t border-slate-100 flex gap-3 z-50 lg:mx-auto">
                    <button onClick={() => setIsBookingFormOpen(true)} className="flex-1 lg:max-w-lg mx-auto bg-[#1E4E82] text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs lg:text-sm shadow-[0_4px_14px_0_rgba(30,78,130,0.39)] hover:bg-[#153e6b] transition-all hover:scale-[1.02] active:scale-[0.98]">Book Service Now</button>
                    <div className="flex gap-3 lg:absolute lg:right-10">
                        <button className="flex items-center justify-center w-[54px] h-[54px] bg-[#E8F0FE] text-[#1E4E82] rounded-2xl transition-all hover:bg-blue-100 active:scale-95 shadow-sm"><Phone size={22} strokeWidth={2.5} /></button>
                        <button className="flex items-center justify-center w-[54px] h-[54px] bg-[#E8F0FE] text-[#1E4E82] rounded-2xl transition-all hover:bg-blue-100 active:scale-95 shadow-sm"><MessageSquare size={22} className="fill-[#1E4E82] text-[#1E4E82]" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanProfileView;
