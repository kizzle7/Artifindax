import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, X } from 'lucide-react';
import Button from './Button';

const OnboardingReminder = ({ status, userType, onClose }) => {
    const navigate = useNavigate();

    // Only show if status is exactly PHONE_VERIFIED
    if (status !== 'PHONE_VERIFIED') return null;

    const handleComplete = () => {
        // Redirect back to signup flow (persistence will take care of the step)
        navigate('/signup');
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-8 lg:w-[400px] z-50"
            >
                <div className="bg-white rounded-[24px] shadow-2xl border border-blue-50 overflow-hidden">
                    <div className="p-5 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="text-[#1E4E82]" size={24} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-bold text-[#0f172a] text-base">Finish setting up</h3>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                Complete your profile to unlock all features and start booking top-rated artisans.
                            </p>
                            <Button
                                variant="primary"
                                onClick={handleComplete}
                                className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 group"
                            >
                                <span>Complete now</span>
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-[#1E4E82] to-[#3b82f6] w-full" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OnboardingReminder;
