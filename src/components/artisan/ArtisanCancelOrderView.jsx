import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { getDetailStatusBadge } from './ArtisanOrderDetailsView';

const ArtisanCancelOrderView = ({ booking, onBack, onSubmit, reason, setReason, otherReason, setOtherReason }) => {
    const reasons = ['Personal Emergency', "Can't Reach Customer", 'Location Issue', 'Job Mismatch', 'Other'];

    return (
        <div className="animate-in slide-in-from-right-4 duration-500">
            <div className="hidden lg:flex items-center justify-between gap-4 mb-8 pb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform cursor-pointer"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Cancel Order</h1>
                </div>
                {getDetailStatusBadge(booking?.bookingStatus)}
            </div>

            <p className="text-slate-500 font-bold mb-8">Please let us know the reason for your cancellation below</p>

            <div className="space-y-4 mb-10">
                {reasons.map((r) => (
                    <label key={r} className="flex items-center gap-4 cursor-pointer group">
                        <div onClick={() => setReason(r)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${reason === r ? 'border-[#1E4E82] bg-[#1E4E82]' : 'border-slate-300'}`}>
                            {reason === r && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className={`font-black text-lg transition-colors ${reason === r ? 'text-[#0f172a]' : 'text-slate-500 group-hover:text-slate-700'}`}>{r}</span>
                    </label>
                ))}
            </div>

            {reason === 'Other' && (
                <div className="mb-10 animate-in fade-in slide-in-from-top-2 duration-300">
                    <textarea value={otherReason} onChange={(e) => setOtherReason(e.target.value)} placeholder="Type here..."
                        className="w-full h-40 p-5 bg-white border border-slate-200 rounded-[20px] text-slate-700 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#1E4E82]/20 focus:border-[#1E4E82] transition-all" />
                </div>
            )}

            <div className="flex justify-center mt-20">
                <button disabled={!reason || (reason === 'Other' && !otherReason)} onClick={onSubmit}
                    className="px-20 py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98] cursor-pointer">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ArtisanCancelOrderView;
