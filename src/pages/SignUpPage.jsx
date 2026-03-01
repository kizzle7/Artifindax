import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Eye, EyeOff, Camera, Upload, CheckCircle2, ArrowRight, ChevronDown,
    SprayCan, Droplets, PlugZap, PaintRoller, Armchair, Trees, Zap, Smartphone, HardHat,
    Car, WashingMachine, PartyPopper, Utensils, Scissors, GraduationCap, Pill, Truck, Sparkles, X, Check
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import signupBg from '../assets/SIGNUP.png';
import successIllustration from '../assets/Frame 1000004078.png';

const CATEGORIES = [
    { id: 'cleaning', label: 'Cleaning', icon: SprayCan, color: '#9333ea' },
    { id: 'plumbing', label: 'Plumbing', icon: Droplets, color: '#1e4e82' },
    { id: 'electronics', label: 'Electronics', icon: PlugZap, color: '#991b1b' },
    { id: 'painting', label: 'Painting', icon: PaintRoller, color: '#eab308' },
    { id: 'carpentry', label: 'Carpentry', icon: Armchair, color: '#713f12' },
    { id: 'gardening', label: 'Gardening', icon: Trees, color: '#22c55e' },
    { id: 'welding', label: 'Welding & metal work', icon: Zap, color: '#1e293b' },
    { id: 'gadget', label: 'Gadget Repairs', icon: Smartphone, color: '#059669' },
    { id: 'masonry', label: 'Masonry', icon: HardHat, color: '#475569' },
    { id: 'automobile', label: 'Automobile', icon: Car, color: '#0ea5e9' },
    { id: 'laundry', label: 'Laundry', icon: WashingMachine, color: '#1e3a8a' },
    { id: 'events', label: 'Events & Planning', icon: PartyPopper, color: '#7c3aed' },
    { id: 'catering', label: 'Catering', icon: Utensils, color: '#ea580c' },
    { id: 'fashion', label: 'Fashion', icon: Scissors, color: '#eab308' },
    { id: 'tutoring', label: 'Tutoring', icon: GraduationCap, color: '#2563eb' },
    { id: 'health', label: 'Health & wellness', icon: Pill, color: '#dc2626' },
    { id: 'delivery', label: 'Delivery', icon: Truck, color: '#f97316' },
    { id: 'beauty', label: 'Beauty & Wellness', icon: Sparkles, color: '#db2777' },
];

const SKILLS_BY_CATEGORY = {
    plumbing: ['Bathroom Installation', 'Leak Repairs', 'Plumbing Design', 'Drainage Systems', 'Water Tank Installation & Cleaning', 'Water Pressure Issues', 'Burst Pipe Repairs', 'Borehole Drilling & Maintenance', 'Pump Installation & Repairs', 'Full Bathroom Plumbing', 'Filtration & Treatment', 'Blocked Drain Clearing', 'Water Heater Installation', 'Copper & PVC Piping', 'Soakaway Construction & Maintenance', 'Septic Tank Installation'],
    // Mocking others for now...
    cleaning: ['Deep Cleaning', 'Office Cleaning', 'Home Cleaning', 'Window Cleaning', 'Post-Construction'],
    electronics: ['TV Repair', 'Laptop Repair', 'AC Repair', 'Fridge Repair', 'Washing Machine Repair'],
};

const CategorySelection = ({ selectedCategory, onSelect, onNext, onPrev }) => (
    <div className="min-h-screen bg-white p-6 max-w-lg mx-auto flex flex-col pt-12 items-center text-center">
        <div className="w-full mb-8">
            <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md hover:bg-black transition-colors">
                <ChevronLeft size={18} />
            </button>
        </div>
        <h1 className="text-xl font-bold text-[#0f172a] mb-2 px-4">Set up your account</h1>
        <p className="text-sm text-gray-500 mb-8 px-4 leading-snug">Please select category your occupation is classified under</p>

        <div className="grid grid-cols-3 gap-3 mb-10 w-full max-w-md">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all border-2 h-24 ${selectedCategory === cat.id ? 'border-[#1e4e82] bg-[#f0f9ff] shadow-inner' : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}
                >
                    <cat.icon size={26} style={{ color: cat.color }} className="mb-2" />
                    <span className="text-[9px] font-bold text-center leading-tight">{cat.label}</span>
                </button>
            ))}
        </div>

        <Button
            onClick={selectedCategory ? onNext : null}
            disabled={!selectedCategory}
            style={{ backgroundColor: !selectedCategory ? '#D6E5F5' : '#1E4E82' }}
            className={`w-full max-w-sm py-3.5 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative group shadow-lg ${!selectedCategory ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
        >
            <span>Next</span>
            <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
);

const SkillMapping = ({ category, selectedSkills, onToggle, onNext, onPrev }) => {
    const skills = SKILLS_BY_CATEGORY[category] || [];
    const categoryInfo = CATEGORIES.find(c => c.id === category);

    return (
        <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col pt-12">
            <div className="mb-8">
                <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md">
                    <ChevronLeft size={18} />
                </button>
            </div>
            <h1 className="text-xl font-bold text-[#0f172a] mb-2">Set up your account</h1>
            <p className="text-xs text-gray-500 mb-8">Select the skills that apply to you in this category</p>

            <div className="flex items-center gap-2 mb-4 bg-[#f0f9ff] py-1.5 px-3 rounded-full self-start">
                {categoryInfo && <categoryInfo.icon size={14} style={{ color: categoryInfo.color }} />}
                <span className="text-[#1E4E82] text-xs font-bold">{categoryInfo?.label}</span>
            </div>

            <div className="min-h-[120px] p-4 border-2 border-gray-300 rounded-2xl mb-8 flex flex-wrap gap-2 items-start content-start shadow-sm bg-gray-50/30">
                {selectedSkills.map(skill => (
                    <div key={skill} className="bg-[#1E4E82] text-white px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-2 shadow-sm animate-in fade-in zoom-in duration-200">
                        {skill}
                        <button onClick={() => onToggle(skill)}><X size={14} /></button>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-10 pb-4 overflow-y-auto max-h-[300px]">
                {skills.filter(s => !selectedSkills.includes(s)).map(skill => (
                    <button
                        key={skill}
                        onClick={() => onToggle(skill)}
                        className="bg-[#D6E5F5] text-[#1E4E82] px-4 py-1.5 rounded-full text-[11px] font-bold hover:bg-[#c8def5] transition-colors border border-transparent active:scale-95"
                    >
                        + {skill}
                    </button>
                ))}
            </div>

            <Button
                onClick={selectedSkills.length > 0 ? onNext : null}
                disabled={selectedSkills.length === 0}
                style={{ backgroundColor: selectedSkills.length === 0 ? '#D6E5F5' : '#1E4E82' }}
                className={`w-full py-3.5 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative group shadow-lg ${selectedSkills.length === 0 ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
            >
                <span>Next</span>
                <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
    );
};

const ExperienceSelection = ({ value, onChange, onNext, onPrev, isOpen, setIsOpen, dropdownRef }) => (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col pt-12">
        <div className="mb-8">
            <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md hover:bg-black transition-colors">
                <ChevronLeft size={18} />
            </button>
        </div>
        <h1 className="text-xl font-bold text-[#0f172a] mb-2">Set up your account</h1>
        <p className="text-xs text-gray-500 mb-8 leading-snug">How many years of experience do you have in this field</p>

        <div className="relative mb-auto" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl flex items-center justify-between cursor-pointer bg-white"
            >
                <span className={`text-base ${value ? "text-[#0f172a] font-medium" : "text-gray-400"}`}>
                    {value || "Select Experience"}
                </span>
                <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={20} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden"
                    >
                        {['< 1 year', '1 - 2 years', '3 - 4 years', '5 - 6 years', '7 - 8 years', '9 - 10 years', '> 10 years'].map((exp) => (
                            <button
                                key={exp}
                                onClick={() => { onChange(exp); setIsOpen(false); }}
                                className={`w-full py-4 px-6 text-left text-sm border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${value === exp ? 'text-[#1E4E82] font-bold bg-blue-50/50' : 'text-gray-600'}`}
                            >
                                {exp}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <Button
            onClick={value ? onNext : null}
            disabled={!value}
            style={{ backgroundColor: !value ? '#D6E5F5' : '#1E4E82' }}
            className={`w-full py-3.5 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative group shadow-lg ${!value ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
        >
            <span>Next</span>
            <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
);

const ServiceModeSelection = ({ value, onChange, onNext, onPrev }) => (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col pt-12">
        <div className="mb-8">
            <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md">
                <ChevronLeft size={18} />
            </button>
        </div>
        <h1 className="text-xl font-bold text-[#0f172a] mb-2">Set up your account</h1>
        <p className="text-xs text-gray-500 mb-12">Please select your preferred service mode</p>

        <div className="space-y-8 mb-auto px-4">
            {['Home Service', 'Work Station', 'Both'].map((mode) => (
                <label key={mode} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${value === mode ? 'border-[#1E4E82] bg-[#1E4E82]' : 'border-gray-400 group-hover:border-gray-500'}`}>
                        {value === mode && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                    </div>
                    <input type="radio" className="hidden" checked={value === mode} onChange={() => onChange(mode)} />
                    <span className={`text-base transition-colors ${value === mode ? 'text-[#0f172a] font-bold' : 'text-gray-600'}`}>{mode}</span>
                </label>
            ))}
        </div>

        <Button
            onClick={value ? onNext : null}
            disabled={!value}
            style={{ backgroundColor: !value ? '#D6E5F5' : '#1E4E82' }}
            className={`w-full py-3.5 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative group shadow-lg ${!value ? 'cursor-not-allowed' : 'hover:bg-[#163a61]'}`}
        >
            <span>Next</span>
            <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
);

const AvailabilitySelection = ({ artisanData, setArtisanData, onNext, onPrev }) => {
    const toggleDay = (day) => {
        setArtisanData({
            ...artisanData,
            availability: {
                ...artisanData.availability,
                [day]: { ...artisanData.availability[day], active: !artisanData.availability[day].active }
            }
        });
    };

    const updateTime = (day, field, value) => {
        setArtisanData({
            ...artisanData,
            availability: {
                ...artisanData.availability,
                [day]: { ...artisanData.availability[day], [field]: value }
            }
        });
    };

    return (
        <div className="min-h-screen bg-white p-6 max-w-lg mx-auto flex flex-col pt-12">
            <div className="w-full mb-8">
                <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md hover:bg-black transition-colors">
                    <ChevronLeft size={18} />
                </button>
            </div>
            <h1 className="text-xl font-bold text-[#0f172a] mb-2 px-2">Set up your account</h1>
            <p className="text-xs text-gray-500 mb-8 px-2 leading-snug">Set your rate and available work hours</p>

            <div className="mb-8 px-2">
                <label className="block text-[11px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-wider">Minimum Rate</label>
                <div className="relative">
                    <input
                        type="number"
                        placeholder="500"
                        value={artisanData.rate}
                        onChange={e => setArtisanData({ ...artisanData, rate: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#1E4E82] transition-all text-base font-medium pr-16 shadow-sm"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₦/hour</span>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6 px-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Availability</span>
                <div className={`w-10 h-5 rounded-full relative p-1 flex items-center transition-colors cursor-pointer shadow-inner ${Object.values(artisanData.availability).some(d => d.active) ? 'bg-[#1E4E82] justify-end' : 'bg-[#C4CBD4] justify-start'}`}>
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
            </div>

            <div className="space-y-4 mb-10 overflow-x-auto px-1">
                {Object.entries(artisanData.availability).map(([day, schedule]) => (
                    <div key={day} className="flex items-center gap-3 min-w-[340px]">
                        <button
                            onClick={() => toggleDay(day)}
                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${schedule.active ? 'border-[#1E4E82] bg-[#1E4E82]' : 'border-gray-300 bg-white'}`}
                        >
                            {schedule.active && <Check size={14} className="text-white" />}
                        </button>
                        <span className={`text-[11px] font-bold w-20 transition-colors ${schedule.active ? 'text-[#0f172a]' : 'text-gray-400'}`}>{day}</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text" value={schedule.from}
                                onChange={e => updateTime(day, 'from', e.target.value)}
                                className={`w-28 px-2 py-2.5 border-2 rounded-xl text-[11px] font-bold text-center focus:outline-none transition-all ${schedule.active ? 'border-gray-300 text-[#1E4E82] bg-white' : 'border-gray-100 text-gray-300 bg-gray-50/50'}`}
                            />
                            <span className="text-[10px] text-gray-400 font-medium lowercase">to</span>
                            <input
                                type="text" value={schedule.to}
                                onChange={e => updateTime(day, 'to', e.target.value)}
                                className={`w-28 px-2 py-2.5 border-2 rounded-xl text-[11px] font-bold text-center focus:outline-none transition-all ${schedule.active ? 'border-gray-300 text-[#1E4E82] bg-white' : 'border-gray-100 text-gray-300 bg-gray-50/50'}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                onClick={artisanData.rate ? onNext : null}
                disabled={!artisanData.rate}
                style={{ backgroundColor: !artisanData.rate ? '#D6E5F5' : '#1E4E82' }}
                className={`w-full py-4 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative group shadow-lg ${!artisanData.rate ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
            >
                <span>Next</span>
                <ArrowRight size={22} className="absolute right-8 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
    );
};

const BioSet = ({ value, onChange, onNext, onPrev }) => (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col pt-12">
        <div className="mb-8">
            <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md">
                <ChevronLeft size={18} />
            </button>
        </div>
        <h1 className="text-xl font-bold text-[#0f172a] mb-2 px-2">Set up your account</h1>
        <p className="text-xs text-gray-500 mb-12 px-2">Set your bio. Tell us a bit about yourself</p>

        <form
            onSubmit={(e) => { e.preventDefault(); if (value.length > 5) onNext(); }}
            className="flex-1 flex flex-col"
        >
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#1E4E82] transition-colors text-base resize-none mb-auto shadow-sm"
                placeholder="Describe your skills and services..."
            />

            <Button
                variant="primary"
                type="submit"
                disabled={value.length <= 5}
                style={{ backgroundColor: value.length <= 5 ? '#D6E5F5' : '#1E4E82' }}
                className={`w-full py-4 rounded-2xl text-lg text-white font-bold mb-6 mt-12 transition-all relative group shadow-lg ${value.length <= 5 ? 'cursor-not-allowed' : 'hover:bg-[#163a61]'}`}
            >
                <span>Next</span>
                <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
            </Button>
        </form>
    </div>
);

const NextOfKin = ({ data, onChange, onNext, onPrev }) => {
    const isValid = data.name && data.relationship && data.phone && data.email && data.email.includes('@');

    return (
        <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col pt-12">
            <div className="mb-8">
                <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md hover:bg-black transition-colors">
                    <ChevronLeft size={18} />
                </button>
            </div>
            <h1 className="text-xl font-bold text-[#0f172a] mb-2 px-2">Set up your account</h1>
            <p className="text-xs text-gray-500 mb-8 px-2">Tell us about your next of kin</p>

            <form
                onSubmit={(e) => { e.preventDefault(); if (isValid) onNext(); }}
                className="flex-1 flex flex-col"
            >
                <div className="space-y-4 mb-auto">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Full Name</label>
                        <input
                            type="text" value={data.name}
                            onChange={e => onChange({ ...data, name: e.target.value })}
                            className="w-full px-4 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#1e4e82] text-sm shadow-sm transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Relationship</label>
                        <input
                            type="text" value={data.relationship}
                            onChange={e => onChange({ ...data, relationship: e.target.value })}
                            className="w-full px-4 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#1e4e82] text-sm shadow-sm transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Phone Number</label>
                        <input
                            type="tel" value={data.phone}
                            onChange={e => onChange({ ...data, phone: e.target.value.replace(/[^0-9]/g, '') })}
                            className="w-full px-4 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#1e4e82] text-sm shadow-sm transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-3.5 ml-1 uppercase tracking-wider">Email Address</label>
                        <input
                            type="email" value={data.email || ''}
                            onChange={e => onChange({ ...data, email: e.target.value })}
                            placeholder="nextofkin@example.com"
                            className="w-full px-4 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#1e4e82] text-sm shadow-sm transition-all"
                        />
                    </div>
                </div>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={!isValid}
                    style={{ backgroundColor: !isValid ? '#D6E5F5' : '#1E4E82' }}
                    className={`w-full py-4 rounded-2xl text-lg text-white font-bold mt-4 transition-all relative group shadow-lg ${!isValid ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
                >
                    <span>Next</span>
                    <ArrowRight size={22} className="absolute right-8 transition-transform group-hover:translate-x-1" />
                </Button>
            </form>
        </div>
    );
};

const ArtisanSuccess = ({ successIllustration, navigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white max-w-md mx-auto relative overflow-hidden text-center">
        <div className="w-full mb-6 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <img src={successIllustration} alt="All Set" className="w-[65%] lg:w-[75%] object-contain" />
        </div>

        <div className="mb-12 px-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <h1 className="text-2xl font-extrabold text-[#0f172a] mb-4">You're all Set!</h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[300px] mx-auto">
                Start browsing trusted artisans near you and request help anytime.
            </p>
        </div>

        <Button
            variant="primary"
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 rounded-2xl text-lg font-bold transition-all relative group bg-[#1E4E82] shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300"
        >
            <span>Go to Home page</span>
            <ArrowRight size={22} className="absolute right-8 transition-transform group-hover:translate-x-1.5" />
        </Button>
    </div>
);

// --- Step Components (Defined outside to prevent focus loss) ---

const RegistrationForm = ({ navigate, nextStep, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, regData, setRegData }) => {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validatePassword = (pass) => {
        const hasUpper = /[A-Z]/.test(pass);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        const isLongEnough = pass.length >= 8;
        return { hasUpper, hasSpecial, isLongEnough };
    };

    const passValidation = validatePassword(regData.password || "");
    const passwordsMatch = regData.password === regData.confirmPassword && regData.password !== "";
    const isValid = regData.phone && regData.firstName && regData.lastName &&
        passValidation.hasUpper && passValidation.hasSpecial &&
        passValidation.isLongEnough && passwordsMatch;

    const handleBlur = (field) => setTouched({ ...touched, [field]: true });

    const handlePhoneChange = (val) => {
        const numbersOnly = val.replace(/[^0-9]/g, '');
        setRegData({ ...regData, phone: numbersOnly });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-white lg:bg-transparent">
            <div className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${signupBg})` }} />
            <div className="lg:hidden fixed top-0 left-0 right-0 p-6 flex items-center justify-between z-10 bg-white">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-gray-900 text-white"><ChevronLeft size={20} /></button>
                <div className="flex flex-col gap-1.5">
                    {[1, 2, 3].map(i => <div key={i} className="w-6 h-0.5 bg-gray-900" />)}
                </div>
            </div>
            <div className="relative z-10 w-full max-w-md p-6 lg:p-8 lg:bg-white/70 lg:backdrop-blur-md lg:rounded-[40px] lg:shadow-2xl mx-4">
                <div className="mb-6 lg:hidden mt-12">
                    <h1 className="text-xl font-bold text-[#0f172a] mb-1">Create User Account</h1>
                    <p className="text-gray-600 text-xs">Looking for trusted artisans near you? Browse, book, and manage services easily and securely.</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (isValid) nextStep(); }}>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number</label>
                        <div className="flex">
                            <div className="flex items-center gap-2 px-3 py-3 border border-[#1e4e82] rounded-l-xl bg-white/50"><span className="text-xl">🇳🇬</span><ChevronDown className="rotate-270" size={14} /></div>
                            <input
                                type="tel"
                                value={regData.phone}
                                onChange={e => handlePhoneChange(e.target.value)}
                                onBlur={() => handleBlur('phone')}
                                placeholder="8012345678"
                                className={`flex-1 px-4 py-3 border border-l-0 border-[#1e4e82] rounded-r-xl focus:outline-none text-sm ${touched.phone && !regData.phone ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {touched.phone && !regData.phone && <p className="text-red-500 text-[10px] mt-1 ml-1">Phone number is required</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">First Name</label>
                        <input
                            type="text"
                            value={regData.firstName}
                            onChange={e => setRegData({ ...regData, firstName: e.target.value })}
                            onBlur={() => handleBlur('firstName')}
                            className={`w-full px-4 py-3 border border-[#1e4e82] rounded-xl focus:outline-none text-sm ${touched.firstName && !regData.firstName ? 'border-red-500' : ''}`}
                        />
                        {touched.firstName && !regData.firstName && <p className="text-red-500 text-[10px] mt-1 ml-1">The field is empty</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last Name</label>
                        <input
                            type="text"
                            value={regData.lastName}
                            onChange={e => setRegData({ ...regData, lastName: e.target.value })}
                            onBlur={() => handleBlur('lastName')}
                            className={`w-full px-4 py-3 border border-[#1e4e82] rounded-xl focus:outline-none text-sm ${touched.lastName && !regData.lastName ? 'border-red-500' : ''}`}
                        />
                        {touched.lastName && !regData.lastName && <p className="text-red-500 text-[10px] mt-1 ml-1">The field is empty</p>}
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={regData.password}
                                    onChange={e => setRegData({ ...regData, password: e.target.value })}
                                    onBlur={() => handleBlur('password')}
                                    placeholder="********"
                                    className={`w-full px-4 py-3 border border-[#1e4e82] rounded-xl focus:outline-none pr-12 text-sm ${touched.password && (!passValidation.isLongEnough || !passValidation.hasUpper || !passValidation.hasSpecial) ? 'border-red-500' : ''}`}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {touched.password && (
                                <div className="mt-1.5 space-y-1 ml-1">
                                    {!passValidation.isLongEnough && <p className="text-red-500 text-[10px]">Must be at least 8 characters</p>}
                                    {!passValidation.hasUpper && <p className="text-red-500 text-[10px]">Must contain an uppercase letter</p>}
                                    {!passValidation.hasSpecial && <p className="text-red-500 text-[10px]">Must contain a special character</p>}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={regData.confirmPassword}
                                    onChange={e => setRegData({ ...regData, confirmPassword: e.target.value })}
                                    onBlur={() => handleBlur('confirmPassword')}
                                    placeholder="********"
                                    className={`w-full px-4 py-3 border border-[#1e4e82] rounded-xl focus:outline-none pr-12 text-sm ${touched.confirmPassword && !passwordsMatch ? 'border-red-500' : ''}`}
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {touched.confirmPassword && !passwordsMatch && <p className="text-red-500 text-[10px] mt-1 ml-1">Passwords do not match</p>}
                        </div>
                    </div>
                    <div className="text-center py-2 lg:hidden"><p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-[#1e4e82] font-bold">Login</Link></p></div>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!isValid}
                        style={{ backgroundColor: !isValid ? '#D6E5F5' : '#1E4E82' }}
                        className={`w-full py-3 rounded-xl text-base font-bold transition-colors relative group ${!isValid ? 'cursor-not-allowed' : 'hover:bg-[#163a61]'}`}
                    >
                        <span>Sign up</span>
                        <ArrowRight size={18} className="absolute right-8 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <div className="hidden lg:block text-center mt-6"><p className="text-gray-600">Already have an account? <Link to="/login" className="text-[#1e4e82] font-bold">Login</Link></p></div>
                </form>
            </div>
        </div>
    );
};

const OtpVerification = ({ otp, handleOtpChange, formatTime, timer, nextStep, prevStep }) => {
    const isValid = otp.every(digit => digit !== '');

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-white lg:bg-transparent">
            <div className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${signupBg})` }} />
            <div className="lg:hidden fixed top-0 left-0 right-0 p-6 flex items-center justify-between z-10 bg-white">
                <button onClick={prevStep} className="p-2 rounded-full bg-gray-900 text-white">
                    <ChevronLeft size={20} />
                </button>
            </div>

            <div className="relative z-10 w-full max-w-sm p-6 lg:bg-white/70 lg:backdrop-blur-md lg:rounded-[40px] lg:shadow-2xl mx-4 text-center flex flex-col items-center">
                <form
                    onSubmit={(e) => { e.preventDefault(); if (isValid) nextStep(); }}
                    className="w-full flex flex-col items-center"
                >
                    <h1 className="text-[22px] font-bold text-[#0f172a] mb-2">Verify your phone number</h1>
                    <p className="text-gray-600 text-[14px] mb-8 leading-snug max-w-[300px]">
                        We've sent a 4-digit verification code to your phone number. Please enter it below to continue.
                    </p>

                    <div className="flex justify-center gap-2.5 mb-5">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] text-center text-2xl font-bold bg-[#A2AFBE] text-white rounded-[15px] focus:outline-none border-none transition-all"
                            />
                        ))}
                    </div>

                    <div className="text-[14px] text-gray-600 mb-10 self-start lg:self-center">
                        Didn't get code? <button
                            type="button"
                            disabled={timer > 0}
                            className={`text-[#1E4E82] font-semibold ml-1 ${timer > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                        >
                            Resend {timer > 0 && formatTime(timer)}
                        </button>
                    </div>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!isValid}
                        style={{ backgroundColor: !isValid ? '#D6E5F5' : '#1E4E82' }}
                        className={`w-full py-3 rounded-[15px] text-lg font-bold transition-all relative group ${!isValid ? 'cursor-not-allowed' : 'hover:bg-[#163a61]'}`}
                    >
                        <span>Verify</span>
                        <ArrowRight size={18} className="absolute right-8 transition-transform group-hover:translate-x-1" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

const AccountCreated = ({ successIllustration, prevStep, nextStep, navigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white max-w-md mx-auto">
        <div className="fixed top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
            <button onClick={prevStep} className="p-2 rounded-full bg-gray-900 text-white"><ChevronLeft size={20} /></button>
            <div className="flex flex-col gap-1.5">{[1, 2, 3].map(i => <div key={i} className="w-6 h-0.5 bg-gray-900" />)}</div>
        </div>
        <div className="w-full mb-8"><img src={successIllustration} alt="Account Created" className="w-[80%] mx-auto" /></div>
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-4 text-center">Account Successfully Created</h1>
        <p className="text-gray-600 text-center text-sm mb-10 px-4">To access the full experience, tell us a bit more about yourself. Verified users get faster service and better matches.</p>
        <div className="w-full space-y-4">
            <Button
                variant="primary"
                onClick={nextStep}
                style={{ backgroundColor: '#1E4E82' }}
                className="w-full py-3 rounded-xl text-lg font-bold transition-colors relative group hover:bg-[#163a61]"
            >
                <span>Let's get to know you</span>
                <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="plain" onClick={() => navigate('/')} className="w-full py-3 rounded-xl text-lg bg-[#D6E5F5] text-[#1E4E82] font-bold relative group">
                <span>Skip for now</span>
            </Button>
        </div>
    </div>
);

const FinalSuccess = ({ successIllustration, prevStep, navigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white max-w-md mx-auto">
        <div className="fixed top-0 left-0 right-0 p-6">
            <button onClick={prevStep} className="p-2 rounded-full bg-gray-900 text-white"><ChevronLeft size={20} /></button>
        </div>
        <div className="w-full mb-8"><img src={successIllustration} alt="All Set" className="w-[80%] mx-auto" /></div>
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-4 text-center">You're all Set!</h1>
        <p className="text-gray-600 text-center text-sm mb-10">Start browsing trusted artisans near you and request help anytime.</p>
        <Button variant="primary" onClick={() => navigate('/')} className="w-full py-3 rounded-xl text-lg font-bold transition-all relative group bg-[#1E4E82]">
            <span>Go to Home page</span>
            <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
);

// --- Onboarding Step Helper ---
const OnboardingStep = ({ title, subtitle, children, onNext, onPrev, disabled }) => (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col pt-12">
        <div className="mb-8">
            <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md hover:bg-black transition-colors">
                <ChevronLeft size={18} />
            </button>
        </div>
        <h1 className="text-xl font-bold text-[#0f172a] mb-2">{title}</h1>
        <p className="text-xs text-gray-500 mb-12">{subtitle}</p>

        <div className="flex-1 space-y-4">{children}</div>

        <Button
            onClick={onNext}
            disabled={disabled}
            style={{ backgroundColor: disabled ? '#D6E5F5' : '#1E4E82' }}
            className={`w-full py-3.5 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative group shadow-lg ${disabled ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
        >
            <span>Next</span>
            <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
);

// --- Main Page Component ---

const SignUpPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialRole = searchParams.get('role') || 'user';
    const [userType, setUserType] = useState(initialRole);
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(179);
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isExperienceOpen, setIsExperienceOpen] = useState(false);
    const dropdownRef = useRef(null);
    const expDropdownRef = useRef(null);

    const [regData, setRegData] = useState({ phone: '', firstName: '', lastName: '', password: '', confirmPassword: '' });
    const [formData, setFormData] = useState({ email: '', gender: '', idType: '', address: '', dob: '', idFile: null, profilePic: null });
    const [artisanData, setArtisanData] = useState({
        category: '',
        skills: [],
        experience: '',
        serviceMode: '',
        rate: '',
        availability: {
            Monday: { active: false, from: '09:00 am', to: '06:00 pm' },
            Tuesday: { active: false, from: '09:00 am', to: '06:00 pm' },
            Wednesday: { active: false, from: '09:00 am', to: '06:00 pm' },
            Thursday: { active: false, from: '09:00 am', to: '06:00 pm' },
            Friday: { active: false, from: '09:00 am', to: '06:00 pm' },
            Saturday: { active: false, from: '09:00 am', to: '06:00 pm' },
            Sunday: { active: false, from: '09:00 am', to: '06:00 pm' }
        },
        bio: '',
        nextOfKin: { name: '', relationship: '', phone: '', email: '' }
    });

    useEffect(() => {
        let interval;
        if (step === 2 && timer > 0) interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [step, timer]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
    };

    const nextStep = () => {
        if (step === 10) {
            if (userType === 'artisan') {
                setStep(12); // Go to Categories
            } else {
                setStep(11); // Success
            }
        } else {
            setStep(step + 1);
        }
    };
    const prevStep = () => {
        if (step === 12) {
            setStep(10);
        } else {
            setStep(step - 1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <RegistrationForm navigate={navigate} nextStep={nextStep} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} regData={regData} setRegData={setRegData} />;
            case 2: return <OtpVerification otp={otp} handleOtpChange={handleOtpChange} formatTime={formatTime} timer={timer} nextStep={nextStep} prevStep={prevStep} />;
            case 3: return <AccountCreated successIllustration={successIllustration} prevStep={prevStep} nextStep={nextStep} navigate={navigate} />;
            case 4: return (
                <OnboardingStep title="Set up your account" subtitle="Please enter your valid email address" onNext={nextStep} onPrev={prevStep} disabled={!formData.email.includes('@')}>
                    <div className="relative">
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none text-sm" />
                        {formData.email.includes('@') && formData.email.includes('.') && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" size={20} />}
                    </div>
                </OnboardingStep>
            );
            case 5: return (
                <OnboardingStep title="Set up your account" subtitle="Please select your gender" onNext={nextStep} onPrev={prevStep} disabled={!formData.gender}>
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={() => setIsGenderOpen(!isGenderOpen)}
                            className="w-full px-4 py-3 border border-gray-600 rounded-xl flex items-center justify-between cursor-pointer"
                        >
                            <span className={`text-sm ${formData.gender ? "text-[#0f172a]" : "text-gray-400"}`}>
                                {formData.gender || "Select Gender"}
                            </span>
                            <ChevronDown className={`transition-transform ${isGenderOpen ? "rotate-180" : ""}`} size={18} />
                        </div>
                        <AnimatePresence>
                            {isGenderOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden"
                                >
                                    {['Male', 'Female', 'Other'].map((g) => (
                                        <button key={g} onClick={() => { setFormData({ ...formData, gender: g }); setIsGenderOpen(false); }} className="w-full py-3 px-6 text-left text-base border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            {g}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </OnboardingStep>
            );
            case 6: return (
                <OnboardingStep title="Set up your account" subtitle="Please select your preferred means of identification" onNext={nextStep} onPrev={prevStep} disabled={!formData.idType}>
                    <div className="space-y-6 pt-4">
                        {['NIN', 'Voters Card', 'Drivers License', 'International Passport'].map((id) => (
                            <label key={id} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.idType === id ? 'border-[#1e4e82] bg-[#1e4e82]' : 'border-gray-400'}`}>
                                    {formData.idType === id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                </div>
                                <input type="radio" className="hidden" checked={formData.idType === id} onChange={() => setFormData({ ...formData, idType: id })} />
                                <span className={`text-lg transition-colors ${formData.idType === id ? 'text-[#0f172a] font-bold' : 'text-gray-600'}`}>{id}</span>
                            </label>
                        ))}
                    </div>
                </OnboardingStep>
            );
            case 7: return (
                <OnboardingStep title="Set up your account" subtitle="Please enter your current residential address" onNext={nextStep} onPrev={prevStep} disabled={formData.address.length < 5}>
                    <div className="relative">
                        <input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none text-sm" />
                        {formData.address.length > 5 && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" size={20} />}
                    </div>
                </OnboardingStep>
            );
            case 8: return (
                <OnboardingStep title="Set up your account" subtitle="Please state your date of birth" onNext={nextStep} onPrev={prevStep} disabled={!formData.dob}>
                    <input type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none text-sm" />
                </OnboardingStep>
            );
            case 9: return (
                <OnboardingStep title="Set up your account" subtitle={`Please upload an image of your ${formData.idType || 'ID'} for verification`} onNext={nextStep} onPrev={prevStep} disabled={!formData.idFile}>
                    <label className="w-full cursor-pointer">
                        <input type="file" className="hidden" onChange={(e) => setFormData({ ...formData, idFile: e.target.files[0] })} />
                        <div className="w-full py-3 border border-gray-400 rounded-xl flex items-center justify-center gap-2 text-[#1e4e82] text-sm">
                            {formData.idFile ? <div className="flex items-center gap-3 w-full px-4"><Camera size={20} className="text-[#0f172a]" /><span className="text-[#0f172a] font-medium">{formData.idFile.name}</span></div> : <><span>Upload</span><Upload size={18} /></>}
                        </div>
                    </label>
                </OnboardingStep>
            );
            case 10: return (
                <OnboardingStep title="Set up your account" subtitle="Upload your profile picture" onNext={nextStep} onPrev={prevStep} disabled={!formData.profilePic}>
                    <div className="flex flex-col items-center justify-center pt-8">
                        <label className="relative cursor-pointer">
                            <input type="file" className="hidden" onChange={(e) => setFormData({ ...formData, profilePic: e.target.files[0] })} />
                            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                                {formData.profilePic ? <img src={URL.createObjectURL(formData.profilePic)} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#cbd5e1] flex items-center justify-center"><Camera size={48} className="text-[#64748b]" /></div>}
                            </div>
                            <div className="absolute bottom-2 right-2 p-3 bg-[#1e4e82] text-white rounded-full shadow-lg border-2 border-white"><Camera size={20} /></div>
                        </label>
                    </div>
                </OnboardingStep>
            );
            case 11: return <FinalSuccess successIllustration={successIllustration} prevStep={prevStep} navigate={navigate} />;
            case 12: return (
                <CategorySelection
                    selectedCategory={artisanData.category}
                    onSelect={(cat) => setArtisanData({ ...artisanData, category: cat })}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 13: return (
                <SkillMapping
                    category={artisanData.category}
                    selectedSkills={artisanData.skills}
                    onToggle={(skill) => {
                        const newSkills = artisanData.skills.includes(skill)
                            ? artisanData.skills.filter(s => s !== skill)
                            : [...artisanData.skills, skill];
                        setArtisanData({ ...artisanData, skills: newSkills });
                    }}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 14: return (
                <ExperienceSelection
                    value={artisanData.experience}
                    onChange={(exp) => setArtisanData({ ...artisanData, experience: exp })}
                    onNext={nextStep}
                    onPrev={prevStep}
                    isOpen={isExperienceOpen}
                    setIsOpen={setIsExperienceOpen}
                    dropdownRef={expDropdownRef}
                />
            );
            case 15: return (
                <ServiceModeSelection
                    value={artisanData.serviceMode}
                    onChange={(mode) => setArtisanData({ ...artisanData, serviceMode: mode })}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 16: return (
                <AvailabilitySelection
                    artisanData={artisanData}
                    setArtisanData={setArtisanData}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 17: return (
                <BioSet
                    value={artisanData.bio}
                    onChange={(val) => setArtisanData({ ...artisanData, bio: val })}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 18: return (
                <NextOfKin
                    data={artisanData.nextOfKin}
                    onChange={(val) => setArtisanData({ ...artisanData, nextOfKin: val })}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 19: return <ArtisanSuccess successIllustration={successIllustration} navigate={navigate} />;
            default: return null;
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                {renderStep()}
            </motion.div>
        </AnimatePresence>
    );
};

export default SignUpPage;
