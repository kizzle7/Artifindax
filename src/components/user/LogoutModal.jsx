import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoutModal = ({ showLogoutModal, setShowLogoutModal, onLogout }) => (
    <AnimatePresence>
        {showLogoutModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogoutModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl text-center">
                    <h3 className="text-xl font-bold text-[#0f172a] mb-8">Are you sure you want to logout?</h3>
                    <div className="space-y-3">
                        <button onClick={onLogout} className="w-full py-4 bg-[#DDE6F5] text-[#1E4E82] font-bold rounded-2xl transition-all hover:bg-[#1E4E82] hover:text-white">Yes, Logout</button>
                        <button onClick={() => setShowLogoutModal(false)} className="w-full py-4 bg-[#1E4E82] text-white font-bold rounded-2xl transition-all shadow-lg">No, go back</button>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default LogoutModal;
