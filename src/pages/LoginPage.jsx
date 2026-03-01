import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, Eye, EyeOff, ArrowRight, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import loginBg from '../assets/RP.png';
import successIllustration from '../assets/Frame 1000004078.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loginData, setLoginData] = useState({ phone: '', password: '' });
    const [recoverData, setRecoverData] = useState({ phone: '' });
    const [resetData, setResetData] = useState({ password: '', confirmPassword: '' });

    const validatePassword = (pass) => ({
        hasUpper: /[A-Z]/.test(pass),
        hasLower: /[a-z]/.test(pass),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
        isLongEnough: pass.length >= 8
    });

    const resetValidation = validatePassword(resetData.password);
    const passwordsMatch = resetData.password === resetData.confirmPassword && resetData.password !== '';
    const isResetValid = resetValidation.hasUpper && resetValidation.hasLower &&
        resetValidation.hasSpecial && resetValidation.isLongEnough && passwordsMatch;

    const renderStep = () => {
        switch (step) {
            case 1: // Login
                return (
                    <div className="relative z-10 w-full max-w-md p-6 lg:p-10 lg:bg-white/70 lg:backdrop-blur-md lg:rounded-[40px] lg:shadow-2xl mx-4">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-[#0f172a] mb-2 lg:hidden">Login</h1>
                            <p className="text-gray-600 text-sm lg:hidden">Welcome back! Please enter your details to login.</p>
                        </div>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone Number</label>
                                <div className="flex">
                                    <div className="flex items-center gap-2 px-3 bg-white border border-[#1e4e82] border-r-0 rounded-l-xl text-sm font-medium">
                                        <span className="text-lg">🇳🇬</span>
                                        <ChevronDown size={14} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={loginData.phone}
                                        onChange={(e) => setLoginData({ ...loginData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                                        placeholder="+234"
                                        className="w-full px-4 py-3.5 border border-[#1e4e82] rounded-r-xl focus:outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        placeholder="********"
                                        className="w-full px-4 py-3.5 border border-[#1e4e82] rounded-xl focus:outline-none pr-12 text-sm"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#1E4E82] rounded-sm opacity-0" />
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">Keep me logged in</span>
                                </label>
                                <button type="button" onClick={() => setStep(2)} className="text-xs text-[#1E4E82] font-semibold hover:underline">Forgot password?</button>
                            </div>

                            <p className="text-[11px] text-gray-400 text-center px-4 leading-relaxed">
                                By signing up you agree to our <a href="#" className="text-[#1E4E82] font-semibold hover:underline">terms of use</a> and <a href="#" className="text-[#1E4E82] font-semibold hover:underline">privacy policy</a>
                            </p>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!loginData.phone || !loginData.password}
                                style={{ backgroundColor: (!loginData.phone || !loginData.password) ? '#D6E5F5' : '#1E4E82' }}
                                className={`w-full py-4 rounded-xl text-lg font-bold transition-all relative group ${(!loginData.phone || !loginData.password) ? 'cursor-not-allowed' : 'hover:bg-[#163a61]'}`}
                            >
                                <span>Login</span>
                            </Button>

                            <p className="text-center text-sm text-gray-600">
                                Don't have an account? <Link to="/signup" className="text-[#1E4E82] font-bold hover:underline">Sign Up</Link>
                            </p>
                        </form>
                    </div>
                );

            case 2: // Recover Password
                return (
                    <div className="relative z-10 w-full max-w-sm p-6 lg:p-10 lg:bg-white/70 lg:backdrop-blur-md lg:rounded-[40px] lg:shadow-2xl mx-4">
                        <div className="mb-8">
                            <h1 className="text-xl font-bold text-[#0f172a] mb-2">Recover Password</h1>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                No worries! Enter your registered phone number and we’ll send you a link to reset your password.
                            </p>
                        </div>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone Number</label>
                                <div className="flex">
                                    <div className="flex items-center gap-2 px-3 bg-white border border-[#1e4e82] border-r-0 rounded-l-xl text-sm font-medium">
                                        <span className="text-lg">🇳🇬</span>
                                        <ChevronDown size={14} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={recoverData.phone}
                                        onChange={(e) => setRecoverData({ phone: e.target.value.replace(/[^0-9]/g, '') })}
                                        placeholder="+234"
                                        className="w-full px-4 py-3.5 border border-[#1e4e82] rounded-r-xl focus:outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!recoverData.phone}
                                style={{ backgroundColor: !recoverData.phone ? '#D6E5F5' : '#1E4E82' }}
                                className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${!recoverData.phone ? 'cursor-not-allowed' : 'hover:bg-[#163a61]'}`}
                            >
                                <span>Send</span>
                            </Button>
                        </form>
                    </div>
                );

            case 3: // Reset Password
                return (
                    <div className="relative z-10 w-full max-w-sm p-6 lg:p-10 lg:bg-white/70 lg:backdrop-blur-md lg:rounded-[40px] lg:shadow-2xl mx-4">
                        <div className="mb-8">
                            <h1 className="text-xl font-bold text-[#0f172a] mb-2">Reset your Password</h1>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Enter your new password below. Make sure it’s strong and secure.
                            </p>
                        </div>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if (isResetValid) setStep(4); }}>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider ml-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={resetData.password}
                                        onChange={(e) => setResetData({ ...resetData, password: e.target.value })}
                                        placeholder="********"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1e4e82] text-sm shadow-sm"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider ml-1">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={resetData.confirmPassword}
                                        onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                                        placeholder="Artifinda001."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1e4e82] text-sm shadow-sm"
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 px-1">
                                <div className="flex items-center gap-2">
                                    <Check size={14} className={resetValidation.isLongEnough ? "text-green-500" : "text-gray-300"} />
                                    <span className={`text-[10px] font-medium ${resetValidation.isLongEnough ? "text-gray-700" : "text-gray-400"}`}>8 characters minimum</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={14} className={(resetValidation.hasUpper && resetValidation.hasLower) ? "text-green-500" : "text-gray-300"} />
                                    <span className={`text-[10px] font-medium ${(resetValidation.hasUpper && resetValidation.hasLower) ? "text-gray-700" : "text-gray-400"}`}>Upper & Lowercase letters</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={14} className={resetValidation.hasSpecial ? "text-green-500" : "text-gray-300"} />
                                    <span className={`text-[10px] font-medium ${resetValidation.hasSpecial ? "text-gray-700" : "text-gray-400"}`}>A special character</span>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!isResetValid}
                                style={{ backgroundColor: !isResetValid ? '#D6E5F5' : '#1E4E82' }}
                                className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all ${!isResetValid ? 'cursor-not-allowed' : 'hover:bg-[#163a61]'}`}
                            >
                                <span>Send</span>
                            </Button>
                        </form>
                    </div>
                );

            case 4: // Success
                return (
                    <div className="flex flex-col items-center justify-center p-6 bg-white max-w-md mx-auto relative overflow-hidden text-center h-screen lg:h-auto lg:rounded-[40px] lg:p-10 lg:shadow-2xl animate-in fade-in duration-500">
                        <div className="w-full mb-6 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <img src={successIllustration} alt="All Set" className="w-[65%] lg:w-[80%] mx-auto object-contain" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-4">You're all Set!</h1>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[300px] mx-auto mb-10">
                            Start browsing trusted artisans near you and request help anytime.
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-3 rounded-xl text-lg font-bold transition-all relative group bg-[#1E4E82] shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95"
                        >
                            <span>Go to Home page</span>
                            <ArrowRight size={22} className="absolute right-8 transition-transform group-hover:translate-x-1.5" />
                        </Button>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-white lg:bg-transparent overflow-hidden">
            {/* Background for Auth Steps */}
            {step < 4 && (
                <div className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url(${loginBg})` }} />
            )}

            {/* Sticky/Fixed Elements */}
            <div className="fixed top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
                <button
                    onClick={() => { if (step > 1 && step < 4) setStep(step - 1); else navigate(-1); }}
                    className={`p-2 rounded-full shadow-lg transition-all hover:scale-110 ${step === 4 ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white hover:bg-black'}`}
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex w-full items-center justify-center"
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LoginPage;
