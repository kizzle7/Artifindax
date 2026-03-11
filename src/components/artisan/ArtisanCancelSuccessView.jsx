import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ArtisanCancelSuccessView = ({ onFinish }) => {
    return (
        <div className="p-6 pt-24 lg:pt-6 h-full flex flex-col items-center justify-center text-center max-w-md mx-auto animate-in zoom-in-95 duration-500">
            <div className="w-full aspect-square bg-red-50 rounded-[40px] mb-10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-white opacity-50" />
                <div className="relative z-10">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl ring-8 ring-red-50">
                        <CheckCircle2 size={64} className="text-red-500" strokeWidth={1.5} />
                    </div>
                </div>
                {/* Decorative particles */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-red-200 rounded-full animate-ping" />
                <div className="absolute bottom-20 right-10 w-3 h-3 bg-red-100 rounded-full animate-pulse" />
            </div>

            <h2 className="text-2xl font-black text-[#0f172a] mb-2 tracking-tight">Booking Cancelled</h2>
            <p className="text-gray-500 font-bold mb-12 px-4 text-sm leading-relaxed">
                The order has been successfully cancelled. We've notified the customer about this change.
            </p>

            <button
                onClick={onFinish}
                className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl shadow-blue-900/10 transition-all active:scale-95 hover:bg-[#1e3a5f]"
            >
                Finish
            </button>
        </div>
    );
};

export default ArtisanCancelSuccessView;
