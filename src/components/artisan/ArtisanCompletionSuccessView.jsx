import React from 'react';

const ArtisanCompletionSuccessView = ({ onFinish }) => (
    <div className="flex flex-col items-center justify-center pt-20 animate-in zoom-in-95 duration-500 text-center px-6">
        <div className="mb-12 relative scale-110">
            <div className="absolute inset-0 bg-blue-100 rounded-full scale-[2.2] blur-[80px] opacity-40 overflow-hidden" />
            <svg width="300" height="220" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                <path d="M60 180H240" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
                <rect x="180" y="80" width="60" height="80" rx="4" fill="#F8FAFC" />
                <path d="M180 80H240V160H180V80Z" fill="#334155" opacity="0.05" />
                <circle cx="210" cy="120" r="12" fill="#818CF8" />
                <path d="M204 120L208 124L216 116" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M120 180V80H150C152.2 80 154 81.8 154 84V176C154 178.2 152.2 180 150 180H120Z" fill="#1E4E82" />
                <rect x="120" y="80" width="24" height="100" rx="4" fill="#1E4E82" />
                <circle cx="132" cy="90" r="4" fill="#FDBA74" />
                <path d="M132 100V170" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
            </svg>
        </div>
        <h2 className="text-2xl font-black text-[#0f172a] mb-3">Work Completed</h2>
        <p className="text-sm text-slate-500 font-bold mb-10 leading-relaxed max-w-sm">
            Waiting for customer to confirm job completion. You'll be notified once it's approved.
        </p>
        <button onClick={onFinish} className="px-12 py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all">
            Go to Bookings
        </button>
    </div>
);

export default ArtisanCompletionSuccessView;
