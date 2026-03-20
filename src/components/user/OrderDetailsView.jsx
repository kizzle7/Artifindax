import React from 'react';
import { ChevronLeft, MapPin, Phone, MessageSquare, Star } from 'lucide-react';

const OrderDetailsView = ({ booking, setSelectedBooking, handleCancelBooking, setCurrentChat, setCurrentView, setMessagesViewStep }) => {
    if (!booking) return null;
    return (
        <div className="flex-1 lg:ml-[240px] bg-[#F8FAFC] min-h-screen transition-all duration-300">
            <div className="max-w-6xl mx-auto w-full pb-6 animate-in slide-in-from-right-4 duration-500 px-5 lg:px-4 flex flex-col pt-20 lg:pt-6 bg-[#F8FAFC] min-h-screen">
                <div className="hidden lg:flex items-center gap-4 mb-2 pb-4 border-b border-slate-100 mt-2">
                    <button onClick={() => setSelectedBooking(null)} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight mb-1">Order Details</h1>
                </div>
                <div className="w-full space-y-4 px-4 lg:px-0">
                    <div className="bg-white border border-slate-100 rounded-[24px] p-4 lg:p-6 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden shrink-0 shadow-inner ring-2 ring-slate-50">
                                <img src={booking.artisan?.appUser?.profilePicture || booking.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h5 className="font-black text-base lg:text-lg text-[#0f172a] mb-0.5 leading-tight">
                                    {booking.artisan?.appUser
                                        ? `${booking.artisan.appUser.firstName || ''} ${booking.artisan.appUser.lastName || ''}`.trim()
                                        : (booking.artisanName || 'Artisan')}
                                </h5>
                                <div className="flex items-center gap-2 text-[8px] font-black uppercase text-slate-400 tracking-widest">
                                    <span>{booking.artisanCategorySkill?.artisanCategory?.category?.name || booking.artisanRole || 'Professional'}</span>
                                    <span className="flex items-center gap-0.5"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {booking.artisanRating || booking.artisan?.rating || '5.0'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            <button className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><Phone size={14} /></button>
                            <button onClick={() => {
                                const artisanObj = booking.artisan;
                                const name = artisanObj?.appUser
                                    ? `${artisanObj.appUser.firstName || ''} ${artisanObj.appUser.lastName || ''}`.trim()
                                    : (booking.artisanName || 'Artisan');
                                const avatar = artisanObj?.appUser?.profilePicture || booking.avatar;

                                setCurrentChat({
                                    artisan: name,
                                    avatar: avatar,
                                    location: booking.customerAddress?.address?.address || booking.location
                                });
                                setCurrentView('messages');
                                setMessagesViewStep('chat');
                                setSelectedBooking(null);
                            }} className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><MessageSquare size={14} /></button>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-[24px] p-6 lg:p-8 shadow-sm space-y-6">
                        <section>
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">TITLE & DESCRIPTION</h6>
                            <h2 className="text-lg lg:text-xl font-black text-[#0f172a] mb-2 tracking-tight">{booking.title}</h2>
                            <p className="text-[11px] lg:text-xs text-slate-500 font-bold leading-relaxed">My AC is leaking water into my room and making a weird loud noise and i need it fixed as soon as possible.</p>
                        </section>
                        <section>
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">LOCATION</h6>
                            <div className="flex items-center gap-2 text-xs lg:text-sm font-bold text-[#0f172a]"><MapPin size={14} className="text-[#1E4E82]" /> {booking.address}</div>
                        </section>
                        <section className="flex flex-wrap gap-6">
                            <div className="flex-1 min-w-[80px]"><h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">DATE</h6><p className="text-sm lg:text-base font-black text-[#0f172a]">{booking.date}</p></div>
                            <div className="flex-1 min-w-[80px]"><h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">TIME</h6><p className="text-sm lg:text-base font-black text-[#0f172a]">{booking.time}</p></div>
                        </section>
                        <div className="pt-6 border-t border-slate-50">
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-4">PAYMENT SUMMARY</h6>
                            <div className="space-y-2.5">
                                <div className="flex justify-between font-bold text-[10px] lg:text-xs text-slate-400"><span>Service Charge</span><span className="text-[#0f172a]">₦900</span></div>
                                <div className="flex justify-between text-xl lg:text-2xl font-black text-[#0f172a] pt-4 mt-2 border-t border-slate-50"><span>Total</span><span>₦{booking.price}</span></div>
                            </div>
                        </div>
                        <button onClick={() => handleCancelBooking(booking.id)} className="w-full py-3.5 text-[#b91c1c] font-black text-xs border border-red-100 rounded-xl hover:bg-red-50 transition-all active:scale-[0.98]">Cancel Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsView;
