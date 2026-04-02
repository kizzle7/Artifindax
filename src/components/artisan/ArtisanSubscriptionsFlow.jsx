import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CreditCard, Zap, Check, X, Shield, Wallet, Landmark, Smartphone, Search, Download, Share2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import toast from 'react-hot-toast';
import DashboardSkeleton from '../ui/DashboardSkeleton';
import subscriptionSuccessImg from '../../assets/payment (2).png';
import boostSuccessImg from '../../assets/boost-success.png';

const ArtisanSubscriptionsFlow = ({ onBack, userProfile, step = 'overview', setStep }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const [step, setStep] = useState('overview'); // Lifted to parent
    const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, yearly
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [plans, setPlans] = useState([]);
    const [history, setHistory] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [activeTier, setActiveTier] = useState('FREE');
    const [currentBoost, setCurrentBoost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ussdPayment, setUssdPayment] = useState(null); // { code, reference }
    const [selectedBoost, setSelectedBoost] = useState(null); // { id, name, price, durationCode }
    const [successPlanName, setSuccessPlanName] = useState(null);
    const [successBoostName, setSuccessBoostName] = useState(null);
    const [successType, setSuccessType] = useState('subscription'); // subscription, boost
    const [isFetchingData, setIsFetchingData] = useState(true);

    // Initial data fetch
    // Initial data fetch
    const fetchData = React.useCallback(async () => {
        setIsFetchingData(true);
        setLoading(true);
        try {
            // Step 1: Fetch current subscription to know active tier
            let activeTier = 'FREE';
            if (userProfile?.artisanCategoryId) {
                try {
                    const current = await paymentService.getCurrentSubscription(userProfile.artisanCategoryId);
                    console.log('[Subscription] Current Plan Response:', current);
                    setCurrentSubscription(current);
                    // Very resilient tier extraction
                    activeTier = current?.tier ||
                        current?.subscriptionTier ||
                        current?.plan ||
                        current?.data?.tier ||
                        current?.data?.subscriptionTier ||
                        'FREE';
                } catch (subErr) {
                    console.warn('Could not fetch current subscription (likely on free plan):', subErr);
                }

                // Step 1.5: Fetch current boost
                try {
                    const boostData = await paymentService.getCurrentBoost(userProfile.artisanCategoryId);
                    console.log('[Subscription] Current Boost Response:', boostData);

                    // Resiliently extract boost status/expiry from various possible shapes
                    const rawBoost = boostData?.data || (Array.isArray(boostData?.records) ? boostData.records[0] : boostData);
                    const expiry = rawBoost?.expiryDate || rawBoost?.expiry;

                    const isValidDate = expiry && !isNaN(new Date(expiry).getTime());
                    const isActive = rawBoost?.status === 'ACTIVE' || rawBoost?.status === 'SUCCESS' || isValidDate;

                    setCurrentBoost(isActive && isValidDate ? rawBoost : null);
                } catch (boostErr) {
                    console.warn('Could not fetch current boost:', boostErr);
                }
            }

            // Step 2: Fetch configurations and mark active plan
            const config = await paymentService.getConfigurations();
            if (config.subscriptionTierProps) {
                const mappedPlans = config.subscriptionTierProps.map(tier => ({
                    id: tier.name.toLowerCase(),
                    name: tier.name,
                    price: tier.price === 0 ? 'Free' : `₦${tier.price.toLocaleString()}`,
                    priceLabel: tier.price === 0 ? '' : '/month',
                    description: tier.description,
                    features: [
                        { text: 'Profile badge', included: true },
                        { text: 'Increased visibility', included: true },
                        { text: 'Increased Job leads', included: tier.name !== 'FREE' },
                        { text: 'Featured Listing', included: tier.name === 'ENTERPRISE' },
                        { text: 'In-app Priority Support', included: tier.name === 'ENTERPRISE' },
                    ],
                    isCurrent: tier.name.toUpperCase() === activeTier.toUpperCase(),
                    buttonText: tier.name.toUpperCase() === activeTier.toUpperCase()
                        ? 'Current Plan'
                        : `Upgrade to ${tier.name.charAt(0) + tier.name.slice(1).toLowerCase()}`,
                    bg: tier.name === 'FREE' ? 'bg-[#334155]' : tier.name === 'PREMIUM' ? 'bg-[#1E4E82]' : 'bg-[#2E0249]',
                    rawPrice: tier.price
                }));
                setPlans(mappedPlans);
                setActiveTier(activeTier);
            }

            // Step 3: Fetch payment history (resilient to multiple response shapes)
            try {
                const historyData = await paymentService.getPaymentHistory();
                console.log('[Subscription] History Response:', historyData);
                const records = Array.isArray(historyData)
                    ? historyData
                    : historyData?.records || historyData?.content || historyData?.data || [];

                const mappedHistory = records.map(r => {
                    // Resilient amount extraction (handling kobo)
                    let amountVal = r.amount ?? r.totalAmount ?? r.price ?? r.value ?? r.data?.amount;
                    if (r.amountKobo) amountVal = Number(r.amountKobo) / 100;

                    // Resilient date extraction
                    const rawDate = r.createdOn ?? r.createdAt ?? r.updatedAt ?? r.date ?? r.paymentDate ?? r.data?.createdAt;

                    return {
                        id: r.id || Math.random().toString(36).substr(2, 9),
                        type: r.txType || r.paymentType || r.type || 'Subscription',
                        date: rawDate
                            ? new Date(rawDate).toLocaleDateString() + ' • ' + new Date(rawDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : '—',
                        amount: amountVal != null ? `₦${Number(amountVal).toLocaleString()}` : '—',
                        status: r.paymentStatus || r.status || 'COMPLETED',
                        tier: r.tier || r.subscriptionTier || 'FREE',
                        reference: r.reference || r.transactionRef || r.paymentRef || '—',
                        txType: r.txType || r.paymentType || r.type,
                        raw: r
                    };
                });

                setHistory(mappedHistory);

                // Step 4: Fallback for activeTier if currentSubscription is missing or 'FREE'
                if (activeTier === 'FREE') {
                    const latestSuccess = mappedHistory.find(h =>
                        (h.status === 'SUCCESS' || h.status === 'COMPLETED' || h.status === 'ACTIVE') &&
                        h.tier !== 'FREE'
                    );
                    if (latestSuccess) {
                        console.log('[Subscription] Found successful tier in history:', latestSuccess.tier);
                        activeTier = latestSuccess.tier;
                        setActiveTier(activeTier);
                        // Update plans with the history-derived tier
                        setPlans(prev => prev.map(p => ({
                            ...p,
                            isCurrent: p.name.toUpperCase() === activeTier.toUpperCase(),
                            buttonText: p.name.toUpperCase() === activeTier.toUpperCase()
                                ? 'Current Plan'
                                : `Upgrade to ${p.name.charAt(0) + p.name.slice(1).toLowerCase()}`
                        })));
                    }
                }

                // Step 5: Fallback for currentBoost from history
                if (!currentBoost) {
                    const latestBoost = mappedHistory.find(h =>
                        (h.type?.toUpperCase().includes('BOOST') || h.txType?.toUpperCase().includes('BOOST')) &&
                        (h.status === 'SUCCESS' || h.status === 'COMPLETED' || h.status === 'ACTIVE')
                    );
                    if (latestBoost) {
                        console.log('[Subscription] Found successful boost in history:', latestBoost);

                        // Try to find the duration from raw data
                        const raw = latestBoost.raw || {};
                        const durationCode = raw.duration || raw.durationCode || (latestBoost.amount?.includes('1200') ? 'H72' : latestBoost.amount?.includes('3000') ? 'H168' : 'H24');
                        const hoursToAdd = durationCode === 'H72' ? 72 : durationCode === 'H168' ? 168 : 24;

                        const calculatedExpiry = new Date(new Date(latestBoost.raw?.createdOn || latestBoost.raw?.createdAt || latestBoost.date).getTime() + hoursToAdd * 60 * 60 * 1000).toISOString();

                        setCurrentBoost({
                            ...latestBoost,
                            expiryDate: latestBoost.expiryDate || latestBoost.expiry || calculatedExpiry,
                            isHistoryFallback: true
                        });
                    }
                }
            } catch (histErr) {
                console.warn('Could not fetch payment history:', histErr);
            }

        } catch (err) {
            console.error('Failed to fetch subscription data:', err);
        } finally {
            setLoading(false);
            setIsFetchingData(false);
        }
    }, [userProfile?.artisanCategoryId]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleVerify = async (ref, type = 'subscription') => {
        setLoading(true);
        const loadingToast = toast.loading('Verifying transaction...');
        try {
            const response = type.toLowerCase().includes('boost')
                ? await paymentService.verifyBoost(ref)
                : await paymentService.verifySubscription(ref);

            console.log(`[Subscription] Manual Verify result (${type}):`, response);
            toast.success(`${type.toLowerCase().includes('boost') ? 'Boost' : 'Subscription'} activated successfully!`, { id: loadingToast });
            
            // Set pending info for success message robustness
            const resolvedName = target?.name || (typeof target === 'string' ? target : null);
            
            if (type.toLowerCase().includes('boost')) {
                const name = resolvedName || 'Boost';
                setSuccessBoostName(name);
                sessionStorage.setItem('pendingBoostName', name);
                sessionStorage.removeItem('pendingPlanName');
            } else {
                const name = resolvedName || 'Subscription';
                setSuccessPlanName(name);
                sessionStorage.setItem('pendingPlanName', name);
                sessionStorage.removeItem('pendingBoostName');
            }

            setSuccessType(type.includes('boost') ? 'boost' : 'subscription');
            setStep('success');
            // Refresh counts/tiers after verification
            await fetchData();
        } catch (err) {
            console.error(`[Subscription] Manual Verify error (${type}):`, err);
            toast.error(err?.message || 'Verification failed. Please try again.', { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    // Handle Payment Verification
    React.useEffect(() => {
        const reference = searchParams.get('reference');
        if (reference && step !== 'success') {
            const verify = async () => {
                setLoading(true);
                try {
                    const paymentType = sessionStorage.getItem('pendingPaymentType') || 'subscription';
                    console.log('[Subscription] Verifying:', reference, 'Type:', paymentType);

                    if (paymentType === 'boost') {
                        await paymentService.verifyBoost(reference);
                    } else {
                        await paymentService.verifySubscription(reference);
                    }

                    toast.success('Payment verified successfully!');

                    // Retrieve pending info for success message robustness
                    const pendingPlan = sessionStorage.getItem('pendingPlanName');
                    const pendingBoost = sessionStorage.getItem('pendingBoostName');
                    if (pendingPlan) setSelectedPlan({ name: pendingPlan });
                    if (pendingBoost) setSelectedBoost({ name: pendingBoost });

                    await fetchData();
                    setStep('success');
                    setSuccessType(paymentType);
                    // Remove reference and clear type
                    setSearchParams({}, { replace: true });
                    sessionStorage.removeItem('pendingPaymentType');
                    // We keep pending names for a moment for the success screen
                } catch (err) {
                    toast.error('Payment verification failed.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            verify();
        }
    }, [searchParams, step, setSearchParams, fetchData]);

    const handlePlanSelect = async (plan) => {
        if (plan.isCurrent) {
            toast('You are already on this plan.', { icon: 'ℹ️' });
            return;
        }

        if (!userProfile?.artisanCategoryId) {
            toast.error('Artisan category not found. Please complete your profile first.');
            return;
        }

        // FREE plan — no payment needed, just inform the user
        if (plan.rawPrice === 0) {
            toast.success('You are already on the Free plan. Upgrade to Premium or Enterprise to unlock more features.');
            return;
        }

        setLoading(true);
        setSelectedPlan(plan);
        try {
            const currentOrigin = window.location.origin.includes('localhost') ? 'http://localhost:5173' : window.location.origin;
            const callbackUrl = `${currentOrigin}/verify-payment`;

            const payload = {
                artisanCategoryId: userProfile.artisanCategoryId,
                tier: plan.name,
                callbackUrl,
                callback_url: callbackUrl,
                redirectUrl: callbackUrl,
                redirect_url: callbackUrl,
                metadata: {
                    callback_url: callbackUrl
                }
            };

            // Store payment type for verification fallback
            sessionStorage.setItem('pendingPaymentType', 'subscription');
            sessionStorage.setItem('pendingPlanName', plan.name);
            sessionStorage.removeItem('pendingBoostName');

            const response = await paymentService.initiateSubscription(payload);
            console.log('[Subscription] Init response:', response);

            // Check for USSD payment (GTBank 737 or similar)
            const ussdCode = response?.data?.code || response?.code;
            if (ussdCode) {
                setUssdPayment({
                    code: ussdCode,
                    reference: response?.data?.reference || response?.reference,
                    channel: response?.data?.channel || response?.channel
                });
                setLoading(false);
                return;
            }

            // Extract checkout URL — covers Paystack & common backend formats
            const checkoutUrl =
                response?.authorizationUrl ||
                response?.checkoutUrl ||
                response?.data?.checkoutUrl ||
                response?.data?.authorizationUrl ||
                response?.data?.authorization_url ||
                response?.authorization_url ||
                response?.data?.link ||
                response?.link ||
                response?.paymentUrl ||
                response?.data?.paymentUrl ||
                response?.url;

            if (checkoutUrl) {
                toast.loading('Redirecting to payment page...');
                window.location.href = checkoutUrl;
            } else {
                toast.error('Could not initiate payment. No checkout URL returned.');
            }
        } catch (err) {
            const msg = err?.message || err?.error || 'Failed to initiate subscription';
            toast.error(msg);
        } finally {
            setLoading(false)
        }
    };

    const handleBoostSelect = async (boost) => {
        if (!userProfile?.artisanCategoryId) {
            toast.error('Artisan category not found.');
            return;
        }

        setLoading(true);
        setSelectedBoost(boost);
        try {
            const currentOrigin = window.location.origin.includes('localhost') ? 'http://localhost:5173' : window.location.origin;
            const callbackUrl = `${currentOrigin}/verify-payment`;

            const payload = {
                artisanCategoryId: userProfile.artisanCategoryId,
                duration: boost.durationCode,
                startWhen: 'NOW',
                callbackUrl,
                callback_url: callbackUrl,
                redirectUrl: callbackUrl,
                redirect_url: callbackUrl,
                metadata: {
                    callback_url: callbackUrl,
                    payment_type: 'boost'
                }
            };

            // Store payment type for verification fallback
            sessionStorage.setItem('pendingPaymentType', 'boost');
            sessionStorage.setItem('pendingBoostName', boost.name);
            sessionStorage.removeItem('pendingPlanName');

            const response = await paymentService.initiateBoost(payload);
            console.log('[Boost] Init response:', response);

            const checkoutUrl =
                response?.authorizationUrl ||
                response?.checkoutUrl ||
                response?.data?.checkoutUrl ||
                response?.data?.authorizationUrl ||
                response?.data?.authorization_url ||
                response?.authorization_url ||
                response?.url;

            if (checkoutUrl) {
                toast.loading('Redirecting to payment page...');
                window.location.href = checkoutUrl;
            } else {
                toast.error('Could not initiate boost payment.');
            }
        } catch (err) {
            toast.error(err?.message || 'Failed to initiate boost');
        } finally {
            setLoading(false);
        }
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
                            <Shield size={10} fill="currentColor" /> {activeTier || 'FREE'}
                        </span>
                        {currentSubscription?.expiryDate && (
                            <span className="text-xs font-bold text-gray-400">| expires {new Date(currentSubscription.expiryDate).toLocaleDateString()}</span>
                        )}
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
                        <h3 className="font-black text-lg mb-1">
                            {currentBoost && (currentBoost.expiryDate || currentBoost.expiry) && !isNaN(new Date(currentBoost.expiryDate || currentBoost.expiry).getTime()) ? 'Boost Active' : 'Apply Boost'}
                        </h3>
                        {currentBoost && (currentBoost.expiryDate || currentBoost.expiry) && !isNaN(new Date(currentBoost.expiryDate || currentBoost.expiry).getTime()) ? (
                            <div className="space-y-1">
                                <p className="text-white/70 text-sm font-medium leading-tight">
                                    Your profile is currently boosted.
                                </p>
                                <p className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-lg inline-block uppercase">
                                    Expires {new Date(currentBoost.expiryDate || currentBoost.expiry).toLocaleString()}
                                </p>
                            </div>
                        ) : (
                            <p className="text-white/70 text-sm font-medium leading-tight max-w-[280px]">
                                Show up higher and get more bookings in your selected category for the next few days.
                            </p>
                        )}
                    </div>
                </div>
                {(!currentBoost || (!currentBoost.expiryDate && !currentBoost.expiry)) && (
                    <button
                        onClick={() => setStep('boost')}
                        className="relative z-10 bg-white text-[#1E4E82] font-black px-6 py-2.5 rounded-xl text-sm shadow-lg active:scale-95 transition-transform"
                    >
                        Get Started
                    </button>
                )}
            </div>

            {/* Subscription History */}
            <div>
                <h3 className="text-base font-black text-[#0f172a] mb-4">Subscription History</h3>
                <div className="space-y-3">
                    {history.length > 0 ? history.map((item) => (
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
                            <div className="flex flex-col items-end gap-1">
                                <span className="font-black text-[#0f172a]">{item.amount}</span>
                                {item.status === 'INITIATED' ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleVerify(item.reference, item.type);
                                        }}
                                        className="text-[10px] bg-[#1E4E82] text-white px-2 py-1 rounded-lg font-black active:scale-95 transition-transform"
                                    >
                                        Verify
                                    </button>
                                ) : (
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${item.status === 'SUCCESS' || item.status === 'COMPLETED' || item.status === 'ACTIVE'
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-gray-50 text-gray-400'
                                        }`}>
                                        {item.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="bg-white border border-dashed border-slate-200 rounded-[32px] p-12 text-center flex flex-col items-center">
                            <div className="w-full max-w-xs mb-6 flex justify-center scale-90">
                                <div className="relative w-48 h-32">
                                    {/* Abstract Receipt/Wallet Illustration */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-16 h-20 bg-slate-50 rounded-lg flex flex-col items-center justify-between p-2 pt-4 border-2 border-white shadow-sm -rotate-6">
                                        <div className="w-8 h-1.5 bg-slate-100 rounded-full" />
                                        <div className="w-6 h-1 bg-slate-100 rounded-full" />
                                        <div className="w-4 h-4 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-6 w-16 h-20 bg-blue-50/50 rounded-lg border-2 border-white shadow-sm rotate-6" />
                                </div>
                            </div>
                            <h4 className="text-[11px] font-black text-[#0f172a] mb-1 uppercase tracking-widest">No History Found</h4>
                            <p className="text-slate-400 font-bold max-w-[200px] leading-relaxed text-[10px]">You haven't made any subscription or boost payments yet. Your receipts will appear here!</p>
                        </div>
                    )}
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
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="min-w-[300px] lg:min-w-0 bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-xl snap-center flex flex-col"
                    >
                        <div className={`${plan.bg} p-8 text-white h-40 flex flex-col justify-between relative`}>
                            <h4 className="font-black text-xs tracking-widest uppercase opacity-70">{plan.name}</h4>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black">{plan.price}</span>
                                <span className="text-sm font-bold opacity-70">{plan.priceLabel}</span>
                            </div>
                        </div>
                        <div className="p-8 space-y-6 flex-1 flex flex-col">
                            {/* HTML Description from API */}
                            <div
                                className="text-sm font-bold text-gray-500 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: plan.description }}
                            />

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
                            <div className="mt-auto pt-4">
                                <button
                                    onClick={() => handlePlanSelect(plan)}
                                    disabled={loading}
                                    className={`w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 ${plan.isCurrent
                                        ? 'bg-slate-100 text-[#334155] cursor-default'
                                        : 'bg-[#0f172a] text-white hover:shadow-2xl'
                                        }`}
                                >
                                    {loading && selectedPlan?.id === plan.id ? 'Loading...' : plan.buttonText}
                                </button>
                            </div>
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
                    <span className="text-gray-400 uppercase">{selectedPlan?.name} Subscription</span>
                    <span className="text-[#0f172a]">{selectedPlan?.price}</span>
                </div>
                <div className="h-[1px] bg-gray-100 my-4" />
                <div className="flex justify-between font-black text-lg pt-2">
                    <span className="text-[#0f172a]">Total</span>
                    <span className="text-[#0f172a]">{selectedPlan?.price}</span>
                </div>
            </div>

            <button
                onClick={() => selectedPlan && handlePlanSelect(selectedPlan)}
                disabled={loading}
                className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl active:scale-95 transition-transform mt-6 disabled:opacity-60"
            >
                {loading ? 'Processing...' : 'Proceed to Payment'}
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
                    src={successType === 'boost' ? boostSuccessImg : subscriptionSuccessImg}
                    alt="Success"
                    className="w-full h-80 object-contain"
                />
            </div>

            <h2 className="text-2xl font-black text-[#0f172a] mb-2">Payment Successful</h2>
            <p className="text-gray-500 font-bold mb-12 max-w-md">
                {successType === 'boost'
                    ? `You've successfully boosted your ${userProfile?.artisanCategoryName || 'Artisan'} account for ${successBoostName || sessionStorage.getItem('pendingBoostName') || selectedBoost?.name || 'the next few days'}.`
                    : `You've successfully subscribed to ${successPlanName || sessionStorage.getItem('pendingPlanName') || selectedPlan?.name || 'Starter'} plan under ${userProfile?.artisanCategoryName || 'Artisan category'}. Your badge and visibility are now updated.`
                }
            </p>

            <div className="w-full max-w-sm space-y-4">
                <button
                    onClick={() => {
                        sessionStorage.removeItem('pendingPlanName');
                        sessionStorage.removeItem('pendingBoostName');
                        setStep('overview');
                    }}
                    className="w-full py-5 border-2 border-slate-200 text-[#1E4E82] font-black rounded-[24px] hover:bg-slate-50 transition-colors active:scale-95"
                >
                    View My Subscriptions
                </button>
                <button
                    onClick={() => {
                        sessionStorage.removeItem('pendingPlanName');
                        sessionStorage.removeItem('pendingBoostName');
                        onBack();
                    }}
                    className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl active:scale-95 transition-transform"
                >
                    Go to Dashboard
                </button>
            </div>
        </motion.div>
    );

    const renderBoostSelection = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 pb-20"
        >
            <div className="flex items-center gap-3">
                <button onClick={() => setStep('overview')} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform">
                    <ChevronLeft size={24} strokeWidth={2.5} />
                </button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Boost your visibility</h1>
            </div>

            <p className="text-gray-500 font-bold text-sm -mt-4">
                Show up higher and get more bookings in your selected category for the next few days.
            </p>

            {/* Category Selector (Visual Only for now) */}
            <div className="relative">
                <div className="w-full h-16 bg-white border border-gray-200 rounded-[24px] px-6 flex items-center justify-between cursor-pointer">
                    <span className="font-black text-[#0f172a]">{userProfile?.artisanCategoryName || 'Select Category'}</span>
                    <ChevronRight size={20} className="rotate-90 text-gray-400" />
                </div>
            </div>

            {/* Duration Options */}
            <div className="space-y-3">
                {[
                    { id: '1day', name: '1 day', price: '₦500', durationCode: 'H24' },
                    { id: '3days', name: '3 days', price: '₦1200', durationCode: 'H72' },
                    { id: '7days', name: '7 days', price: '₦3000', durationCode: 'H168' },
                ].map((boost) => (
                    <label
                        key={boost.id}
                        className={`flex items-center justify-between p-6 bg-white border rounded-[24px] cursor-pointer transition-all active:scale-[0.99] ${selectedBoost?.id === boost.id ? 'border-[#1E4E82] shadow-md' : 'border-gray-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <input
                                type="radio"
                                name="boostDuration"
                                checked={selectedBoost?.id === boost.id}
                                onChange={() => setSelectedBoost(boost)}
                                className="w-5 h-5 accent-[#1E4E82]"
                            />
                            <span className="font-bold text-[#0f172a]">{boost.name} - <span className="font-black">{boost.price}</span></span>
                        </div>
                    </label>
                ))}
            </div>

            <button
                onClick={() => selectedBoost && handleBoostSelect(selectedBoost)}
                disabled={loading || !selectedBoost}
                className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl active:scale-95 transition-transform mt-8 disabled:opacity-60"
            >
                {loading ? 'Processing...' : 'Proceed'}
            </button>
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
                            { label: 'Date and Time', value: selectedReceipt?.date },
                            { label: 'Type', value: selectedReceipt?.type },
                            { label: 'Amount', value: selectedReceipt?.amount },
                            { label: 'Status', value: selectedReceipt?.status },
                        ].map((detail, idx) => (
                            <div key={idx} className="flex justify-between gap-4">
                                <span className="text-xs font-bold text-gray-400">{detail.label}</span>
                                <span className="text-xs font-black text-[#0f172a] text-right">{detail.value}</span>
                            </div>
                        ))}
                        <div className="flex justify-between gap-4 pt-2">
                            <span className="text-xs font-bold text-gray-400">Reference</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-[#1E4E82] break-all">{selectedReceipt?.reference || 'N/A'}</span>
                                <CreditCard size={14} className="text-gray-400 shrink-0" />
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
        <div className="min-h-screen relative">
            {isFetchingData ? (
                <div className="max-w-4xl mx-auto">
                    <DashboardSkeleton type={step === 'plans' ? 'subscription-plans' : 'subscription-overview'} />
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    {step === 'overview' && renderOverview()}
                    {step === 'plans' && renderPlans()}
                    {step === 'boost' && renderBoostSelection()}
                    {step === 'payment' && renderPayment()}
                    {step === 'success' && renderSuccess()}
                    {step === 'receipt' && renderReceipt()}
                </AnimatePresence>
            )}

            {/* USSD Payment Modal */}
            <AnimatePresence>
                {ussdPayment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black text-[#0f172a]">Pay via USSD</h2>
                                <button
                                    onClick={() => setUssdPayment(null)}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 font-medium mb-6">
                                Dial the code below from your GTBank phone number to complete your {selectedPlan?.name} subscription.
                            </p>

                            {/* USSD Code Display */}
                            <div className="bg-[#001D3D] rounded-2xl p-6 text-center mb-6">
                                <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-2">Dial this code</p>
                                <p className="text-3xl font-black text-white tracking-widest">{ussdPayment.code}</p>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-start gap-3">
                                    <span className="w-5 h-5 bg-[#1E4E82] text-white rounded-full text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <p className="text-sm font-bold text-gray-600">Open your phone dialer</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-5 h-5 bg-[#1E4E82] text-white rounded-full text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <p className="text-sm font-bold text-gray-600">Dial <strong>{ussdPayment.code}</strong> and press Call</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-5 h-5 bg-[#1E4E82] text-white rounded-full text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <p className="text-sm font-bold text-gray-600">Follow the prompts to authorize payment</p>
                                </div>
                            </div>

                            {ussdPayment.reference && (
                                <p className="text-[10px] text-gray-400 font-medium text-center mb-4">
                                    Ref: <span className="font-black">{ussdPayment.reference}</span>
                                </p>
                            )}

                            <button
                                onClick={() => { setUssdPayment(null); setStep('overview'); }}
                                className="w-full py-4 bg-[#1E4E82] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-transform"
                            >
                                I've Completed Payment
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArtisanSubscriptionsFlow;
