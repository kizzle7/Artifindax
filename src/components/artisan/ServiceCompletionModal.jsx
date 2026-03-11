import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ServiceCompletionModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0f172a]/40 backdrop-blur-sm animate-in fade-in duration-300">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1E4E82]" />
            <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-blue-50 text-[#1E4E82] rounded-full flex items-center justify-center ring-8 ring-blue-50/50">
                    <CheckCircle2 size={32} strokeWidth={2.5} />
                </div>
            </div>
            <h3 className="text-xl font-black text-[#0f172a] mb-3">Confirm Service Completion</h3>
            <p className="text-sm text-slate-500 font-bold mb-8 leading-relaxed">
                Have you completed the service for this customer? Once confirmed, they will be notified to approve and rate your work.
            </p>
            <div className="space-y-3">
                <button onClick={onConfirm} className="w-full py-4 bg-[#DBEAFE] text-[#1E4E82] rounded-[16px] font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all">
                    Yes, Mark as Completed
                </button>
                <button onClick={onCancel} className="w-full py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all shadow-lg shadow-blue-900/10">
                    No, go back
                </button>
            </div>
        </motion.div>
    </div>
);

export default ServiceCompletionModal;
