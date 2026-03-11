import React from 'react';
import { motion } from 'framer-motion';

const CancellationModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] p-8 lg:p-12 max-w-lg w-full text-center shadow-2xl ring-1 ring-black/5"
        >
            <h3 className="text-xl font-black text-[#0f172a] mb-3">Are you sure you want to cancel this booking?</h3>
            <p className="text-sm text-slate-500 font-bold mb-10 leading-relaxed px-4">This action may affect your rating and job visibility.</p>
            <div className="space-y-3">
                <button onClick={onConfirm} className="w-full py-4 bg-indigo-100 text-[#1E4E82] rounded-[20px] font-black text-sm uppercase tracking-widest hover:bg-indigo-200 transition-colors">
                    Yes, Cancel
                </button>
                <button onClick={onCancel} className="w-full py-4 bg-[#1E4E82] text-white rounded-[20px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all">
                    No, go back
                </button>
            </div>
        </motion.div>
    </div>
);

export default CancellationModal;
