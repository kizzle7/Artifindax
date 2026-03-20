import React from 'react';
import { ChevronLeft, Phone, MessageSquare, Mail } from 'lucide-react';
import { getDetailStatusBadge } from './ArtisanOrderDetailsView';

const ArtisanInvoicePreviewView = ({ booking, items, onSend, onEdit, onBack }) => {
    const subtotal = items.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    const serviceCharge = 900;
    const total = subtotal + serviceCharge;

    return (
        <div className="animate-in slide-in-from-right-4 duration-500 pb-20">
            <div className="hidden lg:flex items-center justify-between mb-8 pb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Invoice Preview</h1>
                </div>
                {getDetailStatusBadge(booking.status)}
            </div>

            <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm mb-12">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-50">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">#{booking.id || '---'}</span>
                        <h4 className="font-black text-[#0f172a] text-lg">{booking.bookingNote ? (booking.bookingNote.split('\n\n')[0]) : 'Service Booking'}</h4>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img
                            src={booking.customer?.appUser?.profilePicture || booking.customer?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.customer?.appUser?.firstName || 'C') + ' ' + (booking.customer?.appUser?.lastName || ''))}&background=1E4E82&color=fff&size=100`}
                            onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.customer?.appUser?.firstName || 'C') + ' ' + (booking.customer?.appUser?.lastName || ''))}&background=1E4E82&color=fff&size=100`; }}
                            alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-slate-700">{booking.customer?.appUser ? `${booking.customer.appUser.firstName} ${booking.customer.appUser.lastName}` : (booking.customer?.name || 'Customer')}</span>
                    <div className="flex gap-2 ml-auto">
                        <button className="w-8 h-8 bg-slate-50 rounded-lg text-slate-400 flex items-center justify-center"><Phone size={14} /></button>
                        <button className="w-8 h-8 bg-slate-50 rounded-lg text-slate-400 flex items-center justify-center"><MessageSquare size={14} /></button>
                        <button className="w-8 h-8 bg-slate-50 rounded-lg text-slate-400 flex items-center justify-center"><Mail size={14} /></button>
                    </div>
                </div>

                <div className="space-y-4 mb-10">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm font-bold">
                            <span className="text-slate-500">{item.description}</span>
                            <span className="text-[#0f172a]">₦{item.amount}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-50 mb-6">
                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Payment details</h6>
                    <div className="flex justify-between items-center text-sm font-bold text-slate-500"><span>Subtotal</span><span className="text-[#0f172a]">₦{subtotal}</span></div>
                    <div className="flex justify-between items-center text-sm font-bold text-slate-500"><span>Service Charge</span><span className="text-[#0f172a]">₦{serviceCharge}</span></div>
                    <div className="flex justify-between items-center text-sm font-bold text-slate-500"><span>Discount</span><span className="text-[#0f172a]">0%</span></div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <span className="text-lg font-black text-[#0f172a]">Total</span>
                    <span className="text-2xl font-black text-[#0f172a]">₦{total}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button onClick={onEdit} className="py-4 bg-[#DBEAFE]/60 text-[#1E4E82] rounded-[16px] font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all">Edit</button>
                <button onClick={onSend} className="py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all">Send</button>
            </div>
        </div>
    );
};

export default ArtisanInvoicePreviewView;
