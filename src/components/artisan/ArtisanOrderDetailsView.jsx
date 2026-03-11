import React from 'react';
import { ChevronLeft, Phone, MessageSquare, Mail } from 'lucide-react';

export const getDetailStatusBadge = (status) => {
    switch (status) {
        case 'urgent': return null;
        case 'scheduled': return <span className="px-2 py-1 bg-blue-50 text-blue-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-blue-900" /> scheduled</span>;
        case 'ongoing': return <span className="px-2 py-1 bg-orange-50 text-orange-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-orange-900" /> ongoing</span>;
        case 'completed': return <span className="px-2 py-1 bg-emerald-50 text-emerald-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-emerald-900" /> completed</span>;
        case 'canceled': return <span className="px-2 py-1 bg-red-50 text-red-900 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-red-900" /> canceled</span>;
        default: return null;
    }
};

const ArtisanOrderDetailsView = ({ booking, onBack, onCancel, onComplete, onAccept }) => {
    if (!booking) return null;

    const getActionButtons = (status) => {
        switch (status) {
            case 'urgent':
                return (
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button onClick={() => onCancel(booking)} className="py-4 border-2 border-[#1E4E82] text-[#1E4E82] rounded-[16px] font-black text-sm uppercase tracking-widest">Ignore</button>
                        <button onClick={() => onAccept(booking)} className="py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10">Accept</button>
                    </div>
                );
            case 'scheduled':
                return (
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button onClick={() => onCancel(booking)} className="py-4 border-2 border-[#1E4E82] text-[#1E4E82] rounded-[16px] font-black text-sm uppercase tracking-widest">Cancel</button>
                        <button className="py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10">Mark as Started</button>
                    </div>
                );
            case 'ongoing':
                return (
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button onClick={() => onCancel(booking)} className="py-4 border-2 border-[#1E4E82] text-[#1E4E82] rounded-[16px] font-black text-sm uppercase tracking-widest">Cancel</button>
                        <button onClick={() => onComplete(booking)} className="py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10">Mark as Completed</button>
                    </div>
                );
            case 'completed':
            case 'canceled':
                return (
                    <div className="mt-8">
                        <button className="w-full py-4 border-2 border-[#1E4E82] text-[#1E4E82] rounded-[16px] font-black text-sm uppercase tracking-widest">View Review</button>
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
                        <img src={booking.customer.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h5 className="font-black text-lg text-[#0f172a] mb-0.5 leading-tight">{booking.customer.name}</h5>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><Phone size={16} /></button>
                    <button className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><MessageSquare size={16} /></button>
                    <button className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all"><Mail size={16} /></button>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[28px] p-6 lg:p-8 shadow-sm ring-1 ring-black/[0.01] space-y-8">
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Title</h6>
                    <h2 className="text-xl font-black text-[#0f172a] tracking-tight">{booking.title}</h2>
                </section>
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Short description</h6>
                    <p className="text-sm text-slate-600 font-bold leading-relaxed">{booking.shortDescription}</p>
                </section>
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">Images</h6>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {[1, 2, 3, 4].map(idx => (
                            <div key={idx} className="w-24 h-24 lg:w-32 lg:h-32 bg-[#8B5E5E] rounded-xl shrink-0"></div>
                        ))}
                    </div>
                </section>
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Address</h6>
                    <p className="text-base font-black text-[#0f172a]">{booking.address}</p>
                </section>
                <section className="grid grid-cols-2 gap-6">
                    <div>
                        <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Time</h6>
                        <div className="flex gap-16">
                            <div><p className="text-[10px] font-bold text-gray-400 mb-0.5">From</p><p className="text-base font-black text-[#0f172a]">{booking.time.from}</p></div>
                            <div><p className="text-[10px] font-bold text-gray-400 mb-0.5">To</p><p className="text-base font-black text-[#0f172a]">{booking.time.to}</p></div>
                        </div>
                    </div>
                </section>
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Date</h6>
                    <p className="text-base font-black text-[#0f172a]">{booking.date}</p>
                </section>
                <section>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Service mode</h6>
                    <p className="text-base font-black text-[#0f172a]">{booking.serviceMode}</p>
                </section>
                <section className="pt-8 border-t border-gray-100">
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Payment</h6>
                    <div className="space-y-3 mb-6">
                        {booking.payment.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center font-bold text-slate-500 text-sm">
                                <span>{item.label}</span>
                                <span className="text-[#0f172a]">₦{item.amount}</span>
                            </div>
                        ))}
                    </div>
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 pt-2">Payment details</h6>
                    <div className="space-y-3 pb-6 border-b border-gray-100">
                        <div className="flex justify-between items-center font-bold text-slate-500 text-sm"><span>Subtotal</span><span className="text-[#0f172a]">₦{booking.payment.items.reduce((acc, curr) => acc + curr.amount, 0)}</span></div>
                        <div className="flex justify-between items-center font-bold text-slate-500 text-sm"><span>Service Charge</span><span className="text-[#0f172a]">₦{booking.payment.serviceCharge}</span></div>
                        <div className="flex justify-between items-center font-bold text-slate-500 text-sm"><span>Discount</span><span className="text-[#0f172a]">{booking.payment.discount}%</span></div>
                    </div>
                    <div className="flex justify-between items-center pt-5 border-t border-gray-100 mt-2">
                        <span className="text-base font-black text-[#0f172a]">Total</span>
                        <span className="text-xl font-black text-[#0f172a]">₦{booking.payment.total}</span>
                    </div>
                </section>
            </div>

            {getActionButtons(booking.status)}
        </div>
    );
};

export default ArtisanOrderDetailsView;
