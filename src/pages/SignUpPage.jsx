import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Eye, EyeOff, Camera, Upload, CheckCircle2, ArrowRight, ChevronDown,
    SprayCan, Droplets, PlugZap, PaintRoller, Armchair, Trees, Zap, Smartphone, HardHat,
    Car, WashingMachine, PartyPopper, Utensils, Scissors, GraduationCap, Pill, Truck, Sparkles, X, Check
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import signupBg from '../assets/SIGNUP.png';
import successIllustration from '../assets/Frame 1000004078.png';
import authService from '../services/authService';
import categoryService from '../services/categoryService';
import { useForm } from 'react-hook-form';
import Location from '../components/form/Location';

// Fallback icons if API returns names we don't have
const ICON_MAP = {
    SprayCan, Droplets, PlugZap, PaintRoller, Armchair, Trees, Zap, Smartphone, HardHat,
    Car, WashingMachine, PartyPopper, Utensils, Scissors, GraduationCap, Pill, Truck, Sparkles
};

const getIcon = (iconName) => ICON_MAP[iconName] || Smartphone;


const CategorySelection = ({ categories, selectedCategory, onSelect, onNext, onPrev, loading }) => (
    <div className="min-h-screen bg-white p-6 max-w-lg mx-auto flex flex-col pt-12 items-center text-center">
        <div className="w-full mb-8">
            <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md hover:bg-black transition-colors">
                <ChevronLeft size={18} />
            </button>
        </div>
        <h1 className="text-xl font-bold text-[#0f172a] mb-2 px-4">Set up your account</h1>
        <p className="text-sm text-gray-500 mb-8 px-4 leading-snug">Please select category your occupation is classified under</p>

        {loading ? (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E4E82]"></div>
            </div>
        ) : (
            <div className="grid grid-cols-3 gap-3 mb-10 w-full max-w-md">
                {categories.map((cat) => {
                    const Icon = getIcon(cat.icon);
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all border-2 h-24 ${selectedCategory === cat.id ? 'border-[#1e4e82] bg-[#f0f9ff] shadow-inner' : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}
                        >
                            <Icon size={26} style={{ color: cat.color || '#1E4E82' }} className="mb-2" />
                            <span className="text-[9px] font-bold text-center leading-tight">{cat.name}</span>
                        </button>
                    )
                })}
            </div>
        )}

        <Button
            onClick={selectedCategory ? onNext : null}
            disabled={!selectedCategory || loading}
            style={{ backgroundColor: !selectedCategory ? '#D6E5F5' : '#1E4E82' }}
            className={`w-full max-w-sm py-3.5 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative group shadow-lg ${!selectedCategory ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
        >
            <span>Next</span>
            <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
);

const SkillMapping = ({ category, skills, selectedSkills, onToggle, onNext, onPrev, categories, loading }) => {
    const categoryInfo = categories.find(c => c.id === category);

    return (
        <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col pt-12">
            <div className="mb-8">
                <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md">
                    <ChevronLeft size={18} />
                </button>
            </div>
            <h1 className="text-xl font-bold text-[#0f172a] mb-2">Set up your account</h1>
            <p className="text-xs text-gray-500 mb-8">Select the skills that apply to you in this category</p>

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E4E82]"></div>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2 mb-4 bg-[#f0f9ff] py-1.5 px-3 rounded-full self-start">
                        {categoryInfo && (() => {
                            const Icon = getIcon(categoryInfo.icon);
                            return <Icon size={14} style={{ color: categoryInfo.color }} />
                        })()}
                        <span className="text-[#1E4E82] text-xs font-bold">{categoryInfo?.name}</span>
                    </div>

                    <div className="min-h-[120px] p-4 border-2 border-gray-300 rounded-2xl mb-8 flex flex-wrap gap-2 items-start content-start shadow-sm bg-gray-50/30">
                        {selectedSkills.map(skillId => {
                            const skill = skills.find(s => s.id === skillId);
                            if (!skill) return null;
                            return (
                                <div key={skillId} className="bg-[#1E4E82] text-white px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-2 shadow-sm animate-in fade-in zoom-in duration-200">
                                    {skill.name}
                                    <button onClick={() => onToggle(skillId)}><X size={14} /></button>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-10 pb-4 overflow-y-auto max-h-[300px]">
                        {skills.filter(s => !selectedSkills.includes(s.id)).map(skill => (
                            <button
                                key={skill.id}
                                onClick={() => onToggle(skill.id)}
                                className="bg-[#D6E5F5] text-[#1E4E82] px-4 py-1.5 rounded-full text-[11px] font-bold hover:bg-[#c8def5] transition-colors border border-transparent active:scale-95"
                            >
                                {skill.name}
                            </button>
                        ))}
                    </div>
                </>
            )}

            <Button
                onClick={selectedSkills.length > 0 ? onNext : null}
                disabled={selectedSkills.length === 0 || loading}
                className="w-full mt-auto py-3.5 rounded-2xl text-white font-bold bg-[#1E4E82] relative group"
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

const NextOfKin = ({ data, onChange, onNext, onPrev, loading, error }) => {
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

                {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}

                <Button
                    variant="primary"
                    type="submit"
                    disabled={!isValid || loading}
                    style={{ backgroundColor: (!isValid || loading) ? '#D6E5F5' : '#1E4E82' }}
                    className={`w-full py-4 rounded-2xl text-lg text-white font-bold mt-4 transition-all relative group shadow-lg ${(!isValid || loading) ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
                >
                    {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div> : (
                        <>
                            <span>Complete</span>
                            <ArrowRight size={22} className="absolute right-8 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
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

const SetPinStep = ({ pin, setPin, onNext, onPrev, loading, error }) => {
    const handlePinChange = (index, value) => {
        if (value.length > 1) return;
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        if (value && index < 5) document.getElementById(`pin-${index + 1}`)?.focus();
    };

    const isPinComplete = pin.every(digit => digit !== '');

    return (
        <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col pt-12 items-center text-center">
            <div className="w-full mb-8 flex items-center">
                <button onClick={onPrev} className="p-1.5 rounded-full bg-gray-900 text-white shadow-md hover:bg-black transition-colors">
                    <ChevronLeft size={18} />
                </button>
            </div>
            <h1 className="text-xl font-bold text-[#0f172a] mb-2 px-4">Set a 6-Digit PIN</h1>
            <p className="text-sm text-gray-500 mb-8 px-4 leading-snug">
                For quick and secure access to your account, please create a 6-digit login PIN. You’ll use this every time you open the app.
            </p>

            <div className="flex gap-2 mb-4 justify-center w-full">
                {pin.map((digit, idx) => (
                    <input
                        key={idx}
                        id={`pin-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePinChange(idx, e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-[45px] h-[55px] text-center text-xl font-bold border border-gray-300 rounded-xl focus:outline-none focus:border-[#1E4E82] transition-all"
                    />
                ))}
            </div>

            {error && <p className="text-red-500 text-xs mb-6 px-4">{error}</p>}

            <Button
                onClick={isPinComplete ? onNext : null}
                disabled={!isPinComplete || loading}
                style={{ backgroundColor: (!isPinComplete || loading) ? '#D6E5F5' : '#1E4E82' }}
                className={`w-full py-3.5 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative shadow-lg ${(!isPinComplete || loading) ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
            >
                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div> : <span>Set</span>}
            </Button>
        </div>
    );
};

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
        let numbersOnly = val.replace(/[^0-9]/g, '');
        if (numbersOnly.startsWith('234')) numbersOnly = numbersOnly.slice(3);
        if (numbersOnly.startsWith('0')) numbersOnly = numbersOnly.slice(1);
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

const OtpVerification = ({ otp, handleOtpChange, formatTime, timer, onVerify, onResend, prevStep, loading, error }) => {
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
                <div className="w-full flex flex-col items-center">
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
                            onClick={onResend}
                            disabled={timer > 0 || loading}
                            className={`text-[#1E4E82] font-semibold ml-1 ${timer > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                        >
                            Resend {timer > 0 && formatTime(timer)}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

                    <Button
                        variant="primary"
                        onClick={onVerify}
                        disabled={!isValid || loading}
                        style={{ backgroundColor: (!isValid || loading) ? '#D6E5F5' : '#1E4E82' }}
                        className={`w-full py-3 rounded-[15px] text-lg font-bold transition-all relative group ${(!isValid || loading) ? 'cursor-not-allowed' : 'hover:bg-[#163a61]'}`}
                    >
                        {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div> : (
                            <>
                                <span>Verify</span>
                                <ArrowRight size={18} className="absolute right-8 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </Button>
                </div>
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
        <Button variant="primary" onClick={() => navigate('/dashboard')} className="w-full py-3 rounded-xl text-lg font-bold transition-all relative group bg-[#1E4E82]">
            <span>Go to Home page</span>
            <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
);

// --- Onboarding Step Helper ---
const OnboardingStep = ({ title, subtitle, children, onNext, onPrev, disabled, nextLabel = "Next", loading = false }) => (
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
            disabled={disabled || loading}
            style={{ backgroundColor: (disabled || loading) ? '#D6E5F5' : '#1E4E82' }}
            className={`w-full py-3.5 rounded-2xl text-lg text-white font-bold mb-6 transition-all relative group shadow-lg ${(disabled || loading) ? 'cursor-not-allowed' : 'hover:bg-[#163a61] active:scale-95'}`}
        >
            {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
            ) : (
                <>
                    <span>{nextLabel}</span>
                    <ArrowRight size={20} className="absolute right-8 transition-transform group-hover:translate-x-1" />
                </>
            )}
        </Button>
    </div>
);

// --- Main Page Component ---

const SignUpPage = () => {
    const navigate = useNavigate();
    const { role: urlRole } = useParams();
    const { control, watch, setValue, register, formState: { errors } } = useForm({
        defaultValues: {
            addressContact: null
        }
    });

    const initialRole = urlRole || 'user';
    const [userType, setUserType] = useState(initialRole);
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [signupRef, setSignupRef] = useState('');
    const [timer, setTimer] = useState(179);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isExperienceOpen, setIsExperienceOpen] = useState(false);
    const dropdownRef = useRef(null);
    const expDropdownRef = useRef(null);

    const [apiCategories, setApiCategories] = useState([]);
    const [apiSkills, setApiSkills] = useState([]);
    const [fetchingCategories, setFetchingCategories] = useState(false);
    const [fetchingSkills, setFetchingSkills] = useState(false);
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(!!window.google);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const [regData, setRegData] = useState({ phone: '', firstName: '', lastName: '', password: '', confirmPassword: '' });
    const [formData, setFormData] = useState({
        email: '',
        gender: '',
        idType: '',
        idNumber: '',
        address: '',
        dob: '',
        idFile: null,
        profilePic: null,
        latitude: 0,
        longitude: 0
    });
    const [artisanData, setArtisanData] = useState({
        category: '', // This will hold the numeric ID from API
        skills: [],    // This will hold numeric IDs from API
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
        if (step === 3 && timer > 0) interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [step, timer]);

    // Check for Google Maps availability periodically if not loaded
    useEffect(() => {
        if (!isGoogleLoaded) {
            const checkGoogle = setInterval(() => {
                if (window.google && window.google.maps && window.google.maps.places) {
                    console.log("Google Maps Places library loaded successfully!");
                    setIsGoogleLoaded(true);
                    clearInterval(checkGoogle);
                } else {
                    console.log("Waiting for Google Maps Places library...");
                }
            }, 1000);
            return () => clearInterval(checkGoogle);
        }
    }, [isGoogleLoaded]);

    // Fetch categories when step becomes 14
    useEffect(() => {
        if (step === 14 && apiCategories.length === 0) {
            const fetchCategories = async () => {
                setFetchingCategories(true);
                try {
                    const data = await categoryService.getCategories();
                    setApiCategories(data);
                } catch (err) {
                    setError('Failed to load categories. Please try again.');
                } finally {
                    setFetchingCategories(false);
                }
            };
            fetchCategories();
        }
    }, [step, apiCategories.length]);

    // Geocomplete logic moved to Location component

    // Fetch skills when a category is selected and we move to step 15
    useEffect(() => {
        if (step === 15 && artisanData.category) {
            const fetchSkills = async () => {
                setFetchingSkills(true);
                try {
                    const data = await categoryService.getSkills(artisanData.category);
                    setApiSkills(data);
                } catch (err) {
                    setError('Failed to load skills for this category.');
                } finally {
                    setFetchingSkills(false);
                }
            };
            fetchSkills();
        }
    }, [step, artisanData.category]);

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
        if (step === 12 && (userType === 'customer' || userType === 'user')) {
            handleSubmitOnboarding();
        } else if (step === 20 && userType === 'artisan') {
            handleSubmitOnboarding();
        } else if (step === 12 && userType === 'artisan') {
            setStep(14); // Go to Categories
        } else {
            setStep(step + 1);
        }
    };
    const prevStep = () => {
        if (step === 13) {
            setStep(11);
        } else if (step === 1) {
            navigate(-1);
        } else {
            setStep(step - 1);
        }
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError('');
        try {
            const payload = {
                firstName: regData.firstName,
                lastName: regData.lastName,
                countryCode: "234",
                phoneNumber: regData.phone,
                password: regData.password,
                deviceType: "MOBILE",
                deviceIdentifier: authService.getDeviceIdentifier(),
                accountType: userType === 'artisan' ? 'ARTISAN' : 'CUSTOMER',
                loginPin: pin.join('')
            };
            const response = await authService.signUp(payload);
            setSignupRef(response.signupRef);
            setStep(3); // Move to OTP
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAutoLogin = async () => {
        try {
            const loginPayload = {
                username: regData.phone,
                secret: pin.join(''),
                loginMode: 'LOGINPIN',
                deviceIdentifier: authService.getDeviceIdentifier(),
                countryCode: "234",
                deviceType: 'MOBILE'
            };
            await authService.login(loginPayload);
        } catch (err) {
            console.error('Auto-login failed:', err);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError('');
        try {
            const payload = {
                signupRef: signupRef,
                countryCode: "234",
                phoneNumber: regData.phone,
                otp: otp.join('')
            };
            await authService.verifyPhoneNumber(payload);

            // Auto-login after verification to get the token for KYC
            await handleAutoLogin();

            setStep(4); // Move to AccountCreated
        } catch (err) {
            setError(err.message || 'Verification failed. Please check your code.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            await authService.initiateOtp({
                countryCode: "234",
                phoneNumber: regData.phone,
                otpType: "PHONE_VERIFICATION"
            });
            setTimer(179);
        } catch (err) {
            console.error('Resend failed:', err);
        }
    };

    const formatTimeTo24h = (timeStr) => {
        if (!timeStr) return "08:00";
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') hours = '00';
        if (modifier?.toLowerCase() === 'pm') hours = parseInt(hours, 10) + 12;
        return `${String(hours).padStart(2, '0')}:${minutes}`;
    };

    const handleSubmitOnboarding = async () => {
        setLoading(true);
        setError('');
        try {
            const genderMap = { 'Male': 'MALE', 'Female': 'FEMALE', 'Other': 'OTHER' };
            const idTypeMap = {
                'NIN': 'NIN',
                'Voters Card': 'VOTERS_CARD',
                'Drivers License': 'DRIVERS_LICENSE',
                'International Passport': 'INTERNATIONAL_PASSPORT'
            };
            const experienceMap = {
                '< 1 year': 0,
                '1 - 2 years': 2,
                '3 - 4 years': 4,
                '5 - 6 years': 6,
                '7 - 8 years': 8,
                '9 - 10 years': 10,
                '> 10 years': 15
            };
            const serviceModeMap = {
                'Home Service': ['HOME_SERVICE'],
                'Work Station': ['WORK_STATION'],
                'Both': ['HOME_SERVICE', 'WORK_STATION']
            };

            const basePayload = {
                emailAddress: formData.email,
                gender: genderMap[formData.gender] || 'MALE',
                identificationType: idTypeMap[formData.idType] || 'NIN',
                identification: formData.idNumber || "string",
                address: formData.address,
                addressVerificationFile: formData.idFile ? formData.idFile.name : "string",
                profilePicture: formData.profilePic ? formData.profilePic.name : "string",
                latitude: formData.latitude || 0,
                longitude: formData.longitude || 0,
                dateOfBirth: formData.dob || "2000-01-01"
            };

            if (userType === 'customer' || userType === 'user') {
                await authService.submitCustomerOnboarding(basePayload);
                setStep(13);
            } else {
                // Transform availability to array format - Send all 7 days
                const availabilityArray = Object.entries(artisanData.availability)
                    .map(([day, schedule]) => ({
                        dayOfWeek: day.toUpperCase(),
                        startTime: formatTimeTo24h(schedule.from),
                        endTime: formatTimeTo24h(schedule.to)
                    }));

                // Split next of kin name
                const nokNameParts = (artisanData.nextOfKin.name || "").trim().split(' ');
                const nokFirstName = nokNameParts[0] || "string";
                const nokLastName = nokNameParts.slice(1).join(' ') || "string";

                const artisanPayload = {
                    countryCode: "234",
                    phoneNumber: regData.phone,
                    ...basePayload,
                    categoryId: parseInt(artisanData.category, 10),
                    skillIds: artisanData.skills.map(id => parseInt(id, 10)),
                    bio: artisanData.bio,
                    proof: formData.idFile ? formData.idFile.name : "string",
                    yearsOfExperience: parseInt(experienceMap[artisanData.experience] || 0, 10),
                    serviceModes: serviceModeMap[artisanData.serviceMode] || ["HOME_SERVICE"],
                    availability: availabilityArray,
                    nextOfKin: {
                        firstName: nokFirstName,
                        lastName: nokLastName,
                        phoneNumber: artisanData.nextOfKin.phone,
                        emailAddress: artisanData.nextOfKin.email
                    }
                };
                
                console.log("Submitting Artisan KYC Payload:", JSON.stringify(artisanPayload, null, 2));
                await authService.submitArtisanOnboarding(artisanPayload);
                setStep(21);
            }
        } catch (err) {
            setError(err.message || 'Onboarding submission failed.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <RegistrationForm navigate={navigate} nextStep={() => setStep(2)} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} regData={regData} setRegData={setRegData} />;
            case 2: return <SetPinStep pin={pin} setPin={setPin} onNext={handleSignUp} onPrev={() => setStep(1)} loading={loading} error={error} />;
            case 3: return <OtpVerification otp={otp} handleOtpChange={handleOtpChange} formatTime={formatTime} timer={timer} onVerify={handleVerifyOtp} onResend={handleResendOtp} prevStep={() => setStep(2)} loading={loading} error={error} />;
            case 4: return <AccountCreated successIllustration={successIllustration} prevStep={() => setStep(3)} nextStep={nextStep} navigate={navigate} />;
            case 5: return (
                <OnboardingStep title="Set up your account" subtitle="Please enter your valid email address" onNext={nextStep} onPrev={prevStep} disabled={!validateEmail(formData.email)}>
                    <div className="relative">
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none text-sm" />
                        {validateEmail(formData.email) && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" size={20} />}
                    </div>
                </OnboardingStep>
            );
            case 6: return (
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
            case 7: return (
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
            case 8: return (
                <OnboardingStep title="Set up your account" subtitle={`Please enter your ${formData.idType || 'ID'} number`} onNext={nextStep} onPrev={prevStep} disabled={formData.idNumber.length < 5}>
                    <div className="relative">
                        <input type="text" value={formData.idNumber} onChange={e => setFormData({ ...formData, idNumber: e.target.value })} className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none text-sm" placeholder="1234567890" />
                        {formData.idNumber.length > 5 && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" size={20} />}
                    </div>
                </OnboardingStep>
            );
            case 9: return (
                <OnboardingStep title="Set up your account" subtitle="Please enter your current residential address" onNext={nextStep} onPrev={prevStep} disabled={formData.address.length < 5}>
                    <div className="space-y-4 pt-4">
                        <Location
                            setLocationInfo={(info) => {
                                setFormData(prev => ({ 
                                    ...prev, 
                                    latitude: info.latitude, 
                                    longitude: info.longitude, 
                                    address: info.clearAddress 
                                }));
                            }}
                            setCity={() => {}} 
                            setState={() => {}} 
                            setPostal={() => {}}
                            register={register}
                            control={control}
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                        />
                    </div>
                </OnboardingStep>
            );
            case 10: return (
                <OnboardingStep title="Set up your account" subtitle="Please state your date of birth" onNext={nextStep} onPrev={prevStep} disabled={!formData.dob}>
                    <input type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none text-sm" />
                </OnboardingStep>
            );
            case 11: return (
                <OnboardingStep title="Set up your account" subtitle={`Please upload an image of your ${formData.idType || 'ID'} for verification`} onNext={nextStep} onPrev={prevStep} disabled={!formData.idFile}>
                    <label className="w-full cursor-pointer">
                        <input type="file" className="hidden" onChange={(e) => setFormData({ ...formData, idFile: e.target.files[0] })} />
                        <div className="w-full py-3 border border-gray-400 rounded-xl flex items-center justify-center gap-2 text-[#1e4e82] text-sm">
                            {formData.idFile ? <div className="flex items-center gap-3 w-full px-4"><Camera size={20} className="text-[#0f172a]" /><span className="text-[#0f172a] font-medium">{formData.idFile.name}</span></div> : <><span>Upload</span><Upload size={18} /></>}
                        </div>
                    </label>
                </OnboardingStep>
            );
            case 12: return (
                <OnboardingStep
                    title="Set up your account"
                    subtitle="Upload your profile picture"
                    onNext={nextStep}
                    onPrev={prevStep}
                    disabled={!formData.profilePic}
                    loading={loading}
                    nextLabel={userType === 'customer' ? 'Complete' : 'Next'}
                >
                    <div className="flex flex-col items-center justify-center pt-8">
                        <label className="relative cursor-pointer">
                            <input type="file" className="hidden" onChange={(e) => setFormData({ ...formData, profilePic: e.target.files[0] })} />
                            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                                {formData.profilePic ? <img src={URL.createObjectURL(formData.profilePic)} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#cbd5e1] flex items-center justify-center"><Camera size={48} className="text-[#64748b]" /></div>}
                            </div>
                            <div className="absolute bottom-2 right-2 p-3 bg-[#1e4e82] text-white rounded-full shadow-lg border-2 border-white"><Camera size={20} /></div>
                        </label>
                        {error && <p className="text-red-500 text-xs mt-4">{error}</p>}
                    </div>
                </OnboardingStep>
            );
            case 13: return <FinalSuccess successIllustration={successIllustration} prevStep={() => setStep(12)} navigate={navigate} />;
            case 14: return (
                <CategorySelection
                    categories={apiCategories}
                    selectedCategory={artisanData.category}
                    onSelect={(cat) => setArtisanData({ ...artisanData, category: cat })}
                    onNext={nextStep}
                    onPrev={prevStep}
                    loading={fetchingCategories}
                />
            );
            case 15: return (
                <SkillMapping
                    category={artisanData.category}
                    categories={apiCategories}
                    skills={apiSkills}
                    selectedSkills={artisanData.skills}
                    onToggle={(skillId) => {
                        const newSkills = artisanData.skills.includes(skillId)
                            ? artisanData.skills.filter(s => s !== skillId)
                            : [...artisanData.skills, skillId];
                        setArtisanData({ ...artisanData, skills: newSkills });
                    }}
                    onNext={nextStep}
                    onPrev={prevStep}
                    loading={fetchingSkills}
                />
            );
            case 16: return (
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
            case 17: return (
                <ServiceModeSelection
                    value={artisanData.serviceMode}
                    onChange={(mode) => setArtisanData({ ...artisanData, serviceMode: mode })}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 18: return (
                <AvailabilitySelection
                    artisanData={artisanData}
                    setArtisanData={setArtisanData}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 19: return (
                <BioSet
                    value={artisanData.bio}
                    onChange={(val) => setArtisanData({ ...artisanData, bio: val })}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            );
            case 20: return (
                <NextOfKin
                    data={artisanData.nextOfKin}
                    onChange={(val) => setArtisanData({ ...artisanData, nextOfKin: val })}
                    onNext={nextStep}
                    onPrev={prevStep}
                    loading={loading}
                    error={error}
                />
            );
            case 21: return <ArtisanSuccess successIllustration={successIllustration} navigate={navigate} />;
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
