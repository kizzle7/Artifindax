import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import paymentService from '../services/paymentService';

const PaymentVerifyPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying | success | failed
    const [message, setMessage] = useState('');
    const [reference, setReference] = useState('');

    useEffect(() => {
        const ref = searchParams.get('reference') || searchParams.get('trxref');

        if (!ref) {
            setStatus('failed');
            setMessage('No payment reference found. Please contact support.');
            return;
        }

        setReference(ref);

        const verify = async () => {
            try {
                const result = await paymentService.verifySubscription(ref);
                console.log('[PaymentVerify] Result:', result);
                setStatus('success');
                setMessage(result?.message || 'Your subscription has been activated successfully!');
            } catch (err) {
                console.error('[PaymentVerify] Error:', err);
                const errMsg = err?.message || err?.error || 'Payment verification failed. Please contact support.';
                setStatus('failed');
                setMessage(errMsg);
            }
        };

        verify();
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[40px] shadow-2xl w-full max-w-md p-10 text-center"
            >
                {status === 'verifying' && (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-20 h-20 rounded-full border-4 border-[#1E4E82] border-t-transparent mx-auto mb-6"
                        />
                        <h2 className="text-2xl font-black text-[#0f172a] mb-2">Verifying Payment</h2>
                        <p className="text-gray-400 font-bold text-sm">Please wait while we confirm your transaction...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-24 h-24 bg-[#E3F9F1] rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle size={52} className="text-[#0F9E7B]" strokeWidth={1.5} />
                        </motion.div>

                        <h2 className="text-2xl font-black text-[#0f172a] mb-2">Payment Successful!</h2>
                        <p className="text-gray-500 font-bold text-sm mb-2">{message}</p>

                        {reference && (
                            <p className="text-[11px] text-gray-400 font-medium bg-gray-50 rounded-xl px-4 py-2 mb-8 break-all">
                                Ref: <span className="font-black text-[#1E4E82]">{reference}</span>
                            </p>
                        )}

                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/artisan/dashboard?view=settings')}
                                className="w-full py-4 bg-[#1E4E82] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-transform"
                            >
                                View My Subscriptions
                            </button>
                            <button
                                onClick={() => navigate('/artisan/dashboard')}
                                className="w-full py-4 border-2 border-gray-200 text-[#1E4E82] font-black rounded-2xl hover:bg-gray-50 transition-colors"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </>
                )}

                {status === 'failed' && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <XCircle size={52} className="text-red-500" strokeWidth={1.5} />
                        </motion.div>

                        <h2 className="text-2xl font-black text-[#0f172a] mb-2">Verification Failed</h2>
                        <p className="text-gray-500 font-bold text-sm mb-8">{message}</p>

                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/artisan/dashboard?view=settings')}
                                className="w-full py-4 bg-[#1E4E82] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-transform"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/artisan/dashboard')}
                                className="w-full py-4 border-2 border-gray-200 text-gray-500 font-black rounded-2xl hover:bg-gray-50 transition-colors"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentVerifyPage;
