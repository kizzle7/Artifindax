import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import waitlistService from '../../services/waitlistService';

const WaitlistModal = ({ isOpen, onClose, initialEmail = '' }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: initialEmail,
        phoneNumber: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.emailAddress || !formData.phoneNumber) {
            setStatus('error');
            setErrorMessage('Please fill in all fields');
            return;
        }

        setStatus('loading');
        try {
            await waitlistService.joinWaitlist(formData);
            setStatus('success');
        } catch (err) {
            console.error('[Waitlist] Submission failed:', err);
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 min-h-screen">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#0B0C0F]/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100"
                >
                    {/* Header Image/Pattern */}
                    <div className="h-32 bg-[#1E4E82] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1E4E82] to-[#133253]" />
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                        
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                            <h2 className="text-2xl font-bold text-white mb-1">Join the Waitlist</h2>
                            <p className="text-blue-100 text-xs font-medium uppercase tracking-widest">Be the first to know</p>
                        </div>
                    </div>

                    <div className="p-8 lg:p-10">
                        {status === 'success' ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-6"
                            >
                                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0B0C0F] mb-3">You're on the list!</h3>
                                <p className="text-[#404A59] text-sm leading-relaxed mb-8">
                                    Thank you for joining our waitlist. We'll send you an update as soon as we're ready for you.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-[#1E4E82] text-white font-bold rounded-2xl hover:bg-[#133253] transition-all"
                                >
                                    Done
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-[#1E4E82] focus:bg-white outline-none text-[#0B0C0F] text-sm font-semibold transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            required
                                            value={formData.emailAddress}
                                            onChange={handleChange}
                                            placeholder="mail@example.com"
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-[#1E4E82] focus:bg-white outline-none text-[#0B0C0F] text-sm font-semibold transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            required
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="+234 800 000 0000"
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-[#1E4E82] focus:bg-white outline-none text-[#0B0C0F] text-sm font-semibold transition-all"
                                        />
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold"
                                    >
                                        <AlertCircle size={16} />
                                        <span>{errorMessage}</span>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4.5 bg-[#1E4E82] text-white font-black rounded-2xl shadow-xl hover:bg-[#133253] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        'Join Waitlist'
                                    )}
                                </button>
                                
                                <p className="text-[10px] text-center text-gray-400 font-medium px-4">
                                    By joining, you agree to receive updates about Artifinda. We value your privacy and won't spam you.
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default WaitlistModal;
