import React from 'react';
import { motion } from 'framer-motion';
import { X, LogOut } from 'lucide-react';

const LogoutModal = ({ showLogoutModal, setShowLogoutModal, onLogout }) => {
    if (!showLogoutModal) return null;
    return (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 lg:p-0">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[32px] p-6 lg:p-8 w-full max-w-[400px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-500" />
                <button onClick={() => setShowLogoutModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 text-gray-400 hover:text-gray-600 rounded-full transition-colors"><X size={20} /></button>
                <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 relative"><div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20" /><LogOut size={32} className="text-red-500 relative z-10 ml-1" /></div>
                    <h2 className="text-2xl font-black text-[#0f172a] mb-2 tracking-tight">Sign Out</h2>
                    <p className="text-gray-500 font-bold mb-8 text-sm leading-relaxed px-4">Are you sure you want to sign out? You will need to enter your credentials to access your account again.</p>
                    <div className="flex gap-3 w-full">
                        <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-4 bg-slate-100 text-gray-500 font-black rounded-[20px] transition-colors active:scale-95">Cancel</button>
                        <button onClick={onLogout} className="flex-1 py-4 bg-red-500 text-white font-black rounded-[20px] shadow-lg shadow-red-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"><LogOut size={18} /><span>Yes, Sign Out</span></button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LogoutModal;
