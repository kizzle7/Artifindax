import React from 'react';
import { ChevronLeft, Plus, XCircle, Calendar, Clock, MapPin, Phone, MessageSquare, Mail } from 'lucide-react';
import { getDetailStatusBadge } from './ArtisanOrderDetailsView';

const ArtisanGenerateInvoiceView = ({ booking, items, setItems, onSubmit, onBack }) => {
    const addItem = () => setItems([...items, { description: '', amount: '' }]);
    const removeItem = (index) => {
        if (items.length > 1) setItems(items.filter((_, i) => i !== index));
    };
    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    return (
        <div className="animate-in slide-in-from-right-4 duration-500 pb-20">
            <div className="hidden lg:flex items-center justify-between mb-8 pb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Generate Invoice</h1>
                </div>
                {getDetailStatusBadge(booking.status)}
            </div>

            <div className="bg-white border border-slate-100 rounded-[24px] p-6 mb-8 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">#{booking.id || '---'}</span>
                        <h4 className="font-black text-[#0f172a] text-lg">{booking.bookingNote ? (booking.bookingNote.split('\n\n')[0]) : 'Service Booking'}</h4>
                    </div>
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed mb-6">{booking.bookingNote && booking.bookingNote.includes('\n\n') ? booking.bookingNote.split('\n\n')[1] : (booking.bookingNote || 'No description provided.')}</p>
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-400 mb-6">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#1E4E82]/60" /> {booking.bookingDate ? new Date(booking.bookingDate.replace(' ', 'T')).toLocaleDateString('en-GB') : 'TBD'}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#1E4E82]/60" /> {booking.bookingDate ? new Date(booking.bookingDate.replace(' ', 'T')).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#1E4E82]/60" /> {booking.customerAddress?.address?.address?.split(',')[0] || booking.address?.split(',')[0] || 'Address TBD'}</span>
                </div>
                <div className="pt-4 border-t border-slate-50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img
                            src={booking.customer?.appUser?.profilePicture || booking.customer?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.customer?.appUser?.firstName || 'C') + ' ' + (booking.customer?.appUser?.lastName || ''))}&background=1E4E82&color=fff&size=100`}
                            onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.customer?.appUser?.firstName || 'C') + ' ' + (booking.customer?.appUser?.lastName || ''))}&background=1E4E82&color=fff&size=100`; }}
                            alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-slate-700">{booking.customer?.appUser ? `${booking.customer.appUser.firstName} ${booking.customer.appUser.lastName}` : (booking.customer?.name || 'Customer')}</span>
                </div>
            </div>

            <div className="space-y-6 mb-10">
                {items.map((item, index) => (
                    <div key={index} className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm relative">
                        <div className="flex justify-between items-center mb-6">
                            <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Item {index + 1}</h6>
                            {items.length > 1 && (
                                <button onClick={() => removeItem(index)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                                    <XCircle size={18} />
                                </button>
                            )}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Description</label>
                                <input type="text" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} placeholder="e.g. AC Repair"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#1E4E82]/10" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₦</span>
                                    <input type="number" value={item.amount} onChange={(e) => updateItem(index, 'amount', e.target.value)} placeholder="0"
                                        className="w-full pl-10 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#1E4E82]/10" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={addItem} className="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-[20px] text-slate-500 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 mb-12 hover:border-[#1E4E82] hover:text-[#1E4E82] transition-all">
                <Plus size={18} strokeWidth={2.5} /> Add new item
            </button>

            <div className="flex justify-center">
                <button disabled={items.some(k => !k.description || !k.amount)} onClick={onSubmit}
                    className="w-full lg:w-80 py-4 bg-[#DBEAFE] text-[#1E4E82] rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/5 active:scale-[0.98] transition-all disabled:opacity-50">
                    Preview
                </button>
            </div>
        </div>
    );
};

export default ArtisanGenerateInvoiceView;
