import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CreditCard, Zap, Check, X, Shield, Wallet, Landmark, Smartphone, Search, Download, Share2 } from 'lucide-react';
import Button from '../ui/Button';

// Mock Data
const SUBSCRIPTION_HISTORY = [
    { id: 1, type: 'Payment for Starter', date: '24th June, 2025 • 12:00pm', amount: '₦5800', status: 'Success' },
    { id: 2, type: 'Boost', date: '24th June, 2025 • 12:00pm', amount: '₦5800', status: 'Success' },
    { id: 3, type: 'Payment for Starter', date: '24th June, 2025 • 12:00pm', amount: '₦5800', status: 'Success' },
    { id: 4, type: 'Boost', date: '24th June, 2025 • 12:00pm', amount: '₦5800', status: 'Success' },
    { id: 5, type: 'Payment for Starter', date: '24th June, 2025 • 12:00pm', amount: '₦5800', status: 'Success' },
    { id: 6, type: 'Payment for Starter', date: '24th June, 2025 • 12:00pm', amount: '₦5800', status: 'Success' },
    { id: 7, type: 'Payment for Starter', date: '24th June, 2025 • 12:00pm', amount: '₦5800', status: 'Success' },
    { id: 8, type: 'Payment for Starter', date: '24th June, 2025 • 12:00pm', amount: '₦5800', status: 'Success' },
];

const PLANS = [
    {
        id: 'basic',
        name: 'BASIC',
        price: 'Free',
        priceLabel: '',
        features: [
            { text: 'Profile badge', included: true },
            { text: 'Increased visibility', included: true },
            { text: 'Increased Job leads', included: false },
            { text: 'Featured Listing', included: false },
            { text: 'In-app Priority Support', included: false },
        ],
        buttonText: 'Current Plan',
        isCurrent: true,
        bg: 'bg-[#334155]',
    },
    {
        id: 'starter',
        name: 'STARTER',
        price: '₦1,000',
        priceLabel: '/month',
        features: [
            { text: 'Profile badge', included: true },
            { text: 'Increased visibility', included: true },
            { text: 'Increased Job leads', included: true },
            { text: 'Featured Listing', included: false },
            { text: 'In-app Priority Support', included: false },
        ],
        buttonText: 'Upgrade to Starter',
        isCurrent: false,
        bg: 'bg-[#1E4E82]',
    },
    {
        id: 'pro',
        name: 'PRO',
        price: '₦3000',
        priceLabel: '/month',
        features: [
            { text: 'Profile badge', included: true },
            { text: 'Increased visibility', included: true },
            { text: 'Increased Job leads', included: true },
            { text: 'Featured Listing', included: true },
            { text: 'In-app Priority Support', included: true },
        ],
        buttonText: 'Go Pro',
        isCurrent: false,
        bg: 'bg-[#2E0249]',
    }
];

const ArtisanSubscriptionsFlow = ({ onBack, userProfile }) => {
    const [step, setStep] = useState('overview'); // overview, plans, payment, success, receipt
    const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, yearly
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    const handlePlanSelect = (plan) => {
        if (plan.isCurrent) return;
        setSelectedPlan(plan);
        setStep('payment');
    };

    const renderOverview = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 pb-20"
        >
            <div className="flex items-center gap-3 mb-6">
                <button onClick={onBack} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform lg:hidden">
                    <ChevronLeft size={24} strokeWidth={2.5} />
                </button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">My Subscriptions</h1>
            </div>

            {/* Current Plan Card */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-wider mb-2">Current Plan</h3>
                    <div className="flex items-center gap-2">
                        <span className="bg-[#334155] text-white text-[10px] font-black px-2 py-1 rounded flex items-center gap-1 uppercase">
                            <Shield size={10} fill="currentColor" /> Basic
                        </span>
                        <span className="text-xs font-bold text-gray-400">| expires 07/25</span>
                    </div>
                </div>
                <button 
                    onClick={() => setStep('plans')}
                    className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm font-black text-[#0f172a] hover:bg-gray-50 transition-colors"
                >
                    view plans <ChevronRight size={16} />
                </button>
            </div>

            {/* Apply Boost Card */}
            <div className="bg-[#1E4E82] rounded-[24px] p-6 text-white flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10 flex gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                        <Zap size={24} fill="white" />
                    </div>
                    <div>
                        <h3 className="font-black text-lg mb-1">Apply Boost</h3>
                        <p className="text-white/70 text-sm font-medium leading-tight max-w-[280px]">
                            Show up higher and get more bookings in your selected category for the next few days.
                        </p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-[#1E4E82] font-black px-6 py-2.5 rounded-xl text-sm shadow-lg active:scale-95 transition-transform">
                    Get Started
                </button>
            </div>

            {/* Subscription History */}
            <div>
                <h3 className="text-base font-black text-[#0f172a] mb-4">Subscription History</h3>
                <div className="space-y-3">
                    {SUBSCRIPTION_HISTORY.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => { setSelectedReceipt(item); setStep('receipt'); }}
                            className="bg-white border border-gray-100 rounded-[20px] p-4 flex items-center justify-between cursor-pointer hover:border-[#1E4E82]/30 hover:shadow-sm transition-all active:scale-[0.99]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#E3F9F1] text-[#0F9E7B] rounded-full flex items-center justify-center shrink-0">
                                    <CreditCard size={18} />
                                </div>
                                <div>
                                    <h4 className="font-black text-[#0f172a] text-sm">{item.type}</h4>
                                    <p className="text-[11px] font-bold text-gray-400">{item.date}</p>
                                </div>
                            </div>
                            <span className="font-black text-[#0f172a]">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );

    const renderPlans = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 pb-20"
        >
            <div className="flex items-center gap-3">
                <button onClick={() => setStep('overview')} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform">
                    <ChevronLeft size={24} strokeWidth={2.5} />
                </button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Subscription Plans</h1>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center">
                <div className="bg-[#EEF4FB] p-1 rounded-full flex gap-1">
                    <button 
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-8 py-2 rounded-full text-sm font-black transition-all ${billingCycle === 'monthly' ? 'bg-[#001D3D] text-white shadow-lg' : 'text-[#001D3D]/60'}`}
                    >
                        Monthly
                    </button>
                    <button 
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-8 py-2 rounded-full text-sm font-black transition-all ${billingCycle === 'yearly' ? 'bg-[#001D3D] text-white shadow-lg' : 'text-[#001D3D]/60'}`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Plans Grid / Slider */}
            <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x overflow-y-visible py-4 -mx-5 px-5 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3">
                {PLANS.map((plan) => (
                    <div 
                        key={plan.id}
                        className="min-w-[300px] lg:min-w-0 bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-xl snap-center"
                    >
                        <div className={`${plan.bg} p-8 text-white h-48 flex flex-col justify-between relative`}>
                            <h4 className="font-black text-xs tracking-widest uppercase opacity-70">{plan.name}</h4>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black">{plan.price}</span>
                                <span className="text-sm font-bold opacity-70">{plan.priceLabel}</span>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <ul className="space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        {feature.included ? (
                                            <div className="w-5 h-5 bg-[#0F9E7B] rounded-full flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-white" />
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 bg-[#DC2626] rounded-full flex items-center justify-center shrink-0">
                                                <X size={12} className="text-white" />
                                            </div>
                                        )}
                                        <span className={`text-sm font-bold ${feature.included ? 'text-[#0f172a]' : 'text-gray-400 line-through decoration-2'}`}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => handlePlanSelect(plan)}
                                className={`w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg ${
                                    plan.isCurrent 
                                    ? 'bg-slate-100 text-[#334155] cursor-default' 
                                    : 'bg-[#0f172a] text-white hover:shadow-2xl'
                                }`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination dots for mobile */}
            <div className="lg:hidden flex justify-center gap-2">
                <div className="w-6 h-2 bg-[#1E4E82] rounded-full" />
                <div className="w-2 h-2 bg-gray-200 rounded-full" />
                <div className="w-2 h-2 bg-gray-200 rounded-full" />
            </div>
        </motion.div>
    );

    const renderPayment = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 pb-20 max-w-2xl mx-auto"
        >
            <div className="flex items-center gap-3">
                <button onClick={() => setStep('plans')} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform">
                    <ChevronLeft size={24} strokeWidth={2.5} />
                </button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Payment</h1>
            </div>

            <p className="text-gray-500 font-bold text-sm">Please select preferred payment method</p>

            {/* Payment Methods */}
            <div className="space-y-3">
                {[
                    { id: 'card', name: 'Pay with Card', icon: CreditCard },
                    { id: 'wallet', name: 'Pay with Wallet', icon: Wallet, extra: '₦15800' },
                    { id: 'bank', name: 'Bank Transfer', icon: Landmark },
                    { id: 'apple', name: 'Apple Pay', icon: Smartphone },
                    { id: 'google', name: 'Google Pay', icon: Smartphone, labelIcon: 'GPay' },
                ].map((method) => (
                    <label key={method.id} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[24px] cursor-pointer hover:border-[#1E4E82]/30 transition-all active:scale-[0.99] group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 text-slate-500 group-hover:bg-[#1E4E82]/5 group-hover:text-[#1E4E82] rounded-[18px] flex items-center justify-center shrink-0 transition-colors">
                                <method.icon size={24} />
                            </div>
                            <span className="font-black text-[#0f172a]">{method.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {method.extra && <span className="font-black text-[#001D3D] text-sm">{method.extra}</span>}
                            <input type="radio" name="paymentMethod" className="w-5 h-5 accent-[#1E4E82]" />
                        </div>
                    </label>
                ))}
            </div>

            {/* Promo Code */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        placeholder="Enter Promo code" 
                        className="w-full h-14 px-6 rounded-2xl border border-gray-100 outline-none focus:border-[#1E4E82]/30 font-bold"
                    />
                </div>
                <button className="bg-[#1E4E82] text-white font-black px-8 rounded-2xl active:scale-95 transition-transform shadow-lg">
                    Apply
                </button>
            </div>

            {/* Summary */}
            <div className="space-y-4 pt-6">
                <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-400 uppercase">AC Repair</span>
                    <span className="text-[#0f172a]">₦5800</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-400 uppercase">New fuse</span>
                    <span className="text-[#0f172a]">₦1200</span>
                </div>
                <div className="h-[1px] bg-gray-100 my-4" />
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-gray-400 uppercase">Subtotal</span>
                        <span className="text-[#0f172a]">₦7000</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-gray-400 uppercase">Service Charge</span>
                        <span className="text-[#0f172a]">₦900</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-gray-400 uppercase">Discount</span>
                        <span className="text-[#0f172a]">0%</span>
                    </div>
                </div>
                <div className="flex justify-between font-black text-lg pt-2">
                    <span className="text-[#0f172a]">Total</span>
                    <span className="text-[#0f172a]">₦7900</span>
                </div>
            </div>

            <button 
                onClick={() => setStep('success')}
                className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl active:scale-95 transition-transform mt-6"
            >
                Proceed
            </button>
        </motion.div>
    );

    const renderSuccess = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 px-5"
        >
            <div className="w-full max-w-sm mb-12">
                <img 
                    src="https://img.freepik.com/premium-vector/online-payment-concept-character-successfully-paying-bill-using-mobile-banking_293060-1092.jpg" 
                    alt="Success" 
                    className="w-full h-auto object-contain"
                />
            </div>
            
            <h2 className="text-2xl font-black text-[#0f172a] mb-2">Payment Successful</h2>
            <p className="text-gray-500 font-bold mb-12 max-w-md">
                You've successfully subscribed to {selectedPlan?.name || 'Starter'} plan under Tailoring. Your badge and visibility are now updated.
            </p>

            <div className="w-full max-w-sm space-y-4">
                <button 
                    onClick={() => setStep('overview')}
                    className="w-full py-5 border-2 border-slate-200 text-[#1E4E82] font-black rounded-[24px] hover:bg-slate-50 transition-colors active:scale-95"
                >
                    View My Subscriptions
                </button>
                <button 
                    onClick={onBack}
                    className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl active:scale-95 transition-transform"
                >
                    Go to Dashboard
                </button>
            </div>
        </motion.div>
    );

    const renderReceipt = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto pb-20"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <button onClick={() => setStep('overview')} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Receipt</h1>
                </div>
                <button className="p-2 bg-slate-100 rounded-full text-gray-500 hover:text-[#1E4E82] transition-colors">
                    <Share2 size={20} />
                </button>
            </div>

            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden relative border border-gray-100">
                {/* Receipt Content */}
                <div className="p-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#0F9E7B] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#0F9E7B]/20">
                        <Check size={32} className="text-white" />
                    </div>
                    
                    <span className="text-4xl font-black text-[#0f172a] mb-1">{selectedReceipt?.amount || '₦5800'}</span>
                    <span className="bg-[#E3F9F1] text-[#0F9E7B] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-12">
                        Successful
                    </span>

                    <div className="w-full space-y-6">
                        {[
                            { label: 'Date and Time', value: '24th June, 2025; 12:00pm' },
                            { label: 'Service', value: 'AC Repair' },
                            { label: 'Provider', value: 'Chinedu Eze' },
                            { label: 'Fee', value: '₦4900' },
                            { label: 'Service Charge', value: '₦900' },
                            { label: 'Discount', value: '0%' },
                            { label: 'Total', value: '₦5800' },
                        ].map((detail, idx) => (
                            <div key={idx} className="flex justify-between gap-4">
                                <span className="text-xs font-bold text-gray-400">{detail.label}</span>
                                <span className="text-xs font-black text-[#0f172a] text-right">{detail.value}</span>
                            </div>
                        ))}
                        <div className="flex justify-between gap-4 pt-2">
                            <span className="text-xs font-bold text-gray-400">Reference</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-[#1E4E82]">BEDCUCHUHDSJ7376354</span>
                                <CreditCard size={14} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Watermark/Logo */}
                    <div className="mt-20 opacity-[0.03] select-none pointer-events-none">
                        <h2 className="text-4xl font-black tracking-[0.2em] italic">ARTIFINDA</h2>
                    </div>
                </div>

                <div className="h-4 bg-[#0F9E7B]/5 w-full border-t border-dashed border-[#0F9E7B]/20" />
            </div>

            <button className="w-full py-5 bg-[#001D3D] text-white font-black rounded-[24px] shadow-xl active:scale-95 transition-transform mt-8 flex items-center justify-center gap-3">
                <Download size={20} /> Download Receipt
            </button>
        </motion.div>
    );

    return (
        <div className="min-h-screen">
            <AnimatePresence mode="wait">
                {step === 'overview' && renderOverview()}
                {step === 'plans' && renderPlans()}
                {step === 'payment' && renderPayment()}
                {step === 'success' && renderSuccess()}
                {step === 'receipt' && renderReceipt()}
            </AnimatePresence>
        </div>
    );
};

export default ArtisanSubscriptionsFlow;
