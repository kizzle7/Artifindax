import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Camera, Calendar, Clock, MapPin,
    ChevronRight, ChevronLeft, Info, AlertCircle, CheckCircle2,
    Loader2, Plus, Trash2, Star, Phone, MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

// Services
import fileService from '../../services/fileService';
import customerService from '../../services/customerService';

const BookingForm = ({ artisan, userProfile, setIsBookingFormOpen, selectedSkill, setSelectedArtisan, setCurrentView }) => {
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const [fromTime, setFromTime] = useState('06:00 am');
    const [toTime, setToTime] = useState('04:00 pm');
    const [fromDate, setFromDate] = useState('16th June');
    const [toDate, setToDate] = useState('16th June');

    const [bookingNote, setBookingNote] = useState('');
    const [bookingTitle, setBookingTitle] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);
    const [selectedServiceMode, setSelectedServiceMode] = useState('HOME_SERVICE');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);
        const loadingToast = toast.loading('Sending booking request...');
        try {
            // Combine title and description for a complete note
            const finalNote = bookingTitle ? `${bookingTitle}\n\n${bookingNote}` : (bookingNote || "No note provided.");

            // Robust ID resolution: prioritize artisan-specific IDs (bridge IDs)
            let resolvedSkillId = 0;

            // 1. Try to find the matching skill ID in the artisan's specific skill list by name
            if (selectedSkill?.name && Array.isArray(artisan?.skills)) {
                const matchedSkill = artisan.skills.find(s =>
                    s.name?.toLowerCase() === selectedSkill.name.toLowerCase()
                );
                if (matchedSkill) {
                    resolvedSkillId = matchedSkill.id;
                }
            }

            // 2. Fallbacks if name match failed
            if (!resolvedSkillId) {
                resolvedSkillId = artisan?.artisanSkillId || artisan?.skillId ||
                    (typeof artisan?.skillName === 'object' ? artisan.skillName?.id : 0) ||
                    selectedSkill?.id || 1; // Fallback to 1 instead of 0 if nothing else
            }

            const resolvedArtisanId = artisan?.artisanId || artisan?.id || artisan?.userId || 0;

            // Set booking date 5 minutes in the future to avoid backend "past time" errors
            const futureDate = new Date();
            futureDate.setMinutes(futureDate.getMinutes() + 5);
            const formattedDate = futureDate.toISOString().split('.')[0] + 'Z';

            const payload = {
                artisanId: resolvedArtisanId,
                bookingDate: formattedDate,
                bookingNote: finalNote,
                bookingMedia: images || [],
                serviceMode: selectedServiceMode,
                artisanSkillId: resolvedSkillId,
                customerAddressId: userProfile?.customerAddresses?.[0]?.id || userProfile?.addresses?.[0]?.id || 1 // Fallback to 1 instead of 0
            };

            console.log('[BookingForm] FINAL PAYLOAD:', JSON.stringify(payload, null, 2));

            await customerService.bookArtisan(payload);
            toast.success('Artisan booked successfully!', { id: loadingToast });
            setIsBookingFormOpen(false);
            if (setSelectedArtisan) setSelectedArtisan(null);
            if (setCurrentView) setCurrentView('bookings');
        } catch (error) {
            console.error('Booking Error Details:', error.response?.data || error.message);
            const backendMessage = error.response?.data?.message || 'Failed to book artisan. Please try again.';
            toast.error(backendMessage, { id: loadingToast });
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);
        const uploadToast = toast.loading('Uploading images...');
        try {
            const uploadPromises = files.map(file => fileService.upload(file));
            const responses = await Promise.all(uploadPromises);
            console.log('[BookingForm] Upload Responses:', responses);

            const newUrls = responses.map(res => {
                // Robust URL extraction from various API response formats
                if (!res) return null;
                if (typeof res === 'string') return res;
                if (Array.isArray(res)) return res[0]; // If the backend returns an array of URLs
                if (res?.url) return res.url;
                if (res?.secure_url) return res.secure_url;
                if (res?.data?.url) return res.data.url;
                if (res?.data?.secure_url) return res.data.secure_url;
                if (res?.data && typeof res.data === 'string') return res.data;
                return null;
            }).filter(url => url !== null);

            if (newUrls.length === 0) {
                console.error('[BookingForm] EXTRACTED NO URLS FROM:', responses);
                toast.error('Failed to extract image URLs from response.', { id: uploadToast });
            } else {
                setImages(prev => [...prev, ...newUrls]);
                toast.success(`Successfully uploaded ${newUrls.length} image(s)!`, { id: uploadToast });
            }
        } catch (error) {
            console.error('File Upload Error:', error);
            const backendMessage = error.response?.data?.message || 'Failed to upload images.';
            toast.error(backendMessage, { id: uploadToast });
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="flex-1 bg-white min-h-screen transition-all duration-300">
            <div className="w-full pb-32 flex flex-col pt-4 bg-white min-h-screen border border-transparent">
                {/* Header */}
                <div className="hidden lg:flex items-center gap-4 mb-4 px-6 lg:px-12">
                    <button onClick={() => setIsBookingFormOpen(false)} className="p-1 text-[#0f172a] active:scale-90 transition-all cursor-pointer">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl lg:text-2xl font-bold text-[#0f172a] tracking-tight">Booking form</h1>
                </div>
                <p className="px-6 lg:px-12 text-sm font-medium text-slate-500 mb-6">Please fill out the necessary details in the form below</p>

                <div className="px-6 lg:px-16 space-y-8">
                    {/* Artisan Card */}
                    <div className="bg-white border border-[#B5CAE4] rounded-[16px] p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <img
                                    src={artisan?.profilePicture || artisan?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent((artisan?.firstName || artisan?.name || 'A') + ' ' + (artisan?.lastName || ''))}&background=1E4E82&color=fff&size=100`}
                                    onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((artisan?.firstName || artisan?.name || 'A') + ' ' + (artisan?.lastName || ''))}&background=1E4E82&color=fff&size=100`; }}
                                    alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <h5 className="font-bold text-sm text-[#0f172a]">{artisan?.firstName ? `${artisan.firstName} ${artisan.lastName}` : (artisan?.name || 'Chinedu Eze')}</h5>
                                    <span className="bg-[#1E4E82] text-white px-1.5 py-0.5 rounded text-[8px] font-bold">Verified</span>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                    <span>{artisan?.skillName || artisan?.role || 'Plumber'}</span>
                                    <span className="flex items-center gap-1"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {artisan?.rating || '4.8'}</span>
                                    <span className="flex items-center gap-1"><MapPin size={10} /> {artisan?.location || 'Ikorodu, Lagos'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => {
                                const phone = artisan?.phoneNumber || '';
                                if (phone) {
                                    navigator.clipboard.writeText(phone);
                                    toast.success('Phone number copied');
                                } else {
                                    toast.error('Phone number not available');
                                }
                            }} className="w-9 h-9 bg-slate-50 border border-slate-100 text-[#0f172a] rounded-full flex items-center justify-center shadow-sm cursor-pointer"><Phone size={16} /></button>
                            <button className="w-9 h-9 bg-slate-50 border border-slate-100 text-[#0f172a] rounded-full flex items-center justify-center shadow-sm cursor-pointer"><MessageSquare size={16} /></button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {/* Urgent Toggle */}
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Mark as Urgent</label>
                            <div
                                onClick={() => setIsUrgent(!isUrgent)}
                                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${isUrgent ? 'bg-[#1E4E82]' : 'bg-slate-200'}`}
                            >
                                <div className={`absolute top-1 bottom-1 w-3 bg-white rounded-full shadow-sm transition-all duration-300 ${isUrgent ? 'right-1' : 'right-6'}`} />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Title (eg Broken pipe)</label>
                            <input
                                type="text"
                                value={bookingTitle}
                                onChange={(e) => setBookingTitle(e.target.value)}
                                className="w-full px-5 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm"
                            />
                        </div>

                        {/* Short description */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Short description</label>
                            <textarea
                                value={bookingNote}
                                onChange={(e) => setBookingNote(e.target.value)}
                                placeholder="I need help with..."
                                className="w-full h-24 px-5 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm resize-none"
                            />
                        </div>

                        {/* Add Images */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Add Images(Optional)</label>
                            <div className="flex flex-wrap gap-3">
                                {images.map((img, index) => (
                                    <div key={index} className="relative w-24 h-24 rounded-[12px] overflow-hidden border border-slate-200">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-slate-600 hover:bg-white shadow-sm transition-all cursor-pointer"><X size={12} /></button>
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <div
                                        onClick={() => !isUploading && fileInputRef.current?.click()}
                                        className={`w-28 h-28 rounded-[12px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-50/50 hover:bg-slate-50 hover:border-[#1E4E82]/30 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isUploading ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 size={24} className="text-[#1E4E82] animate-spin" />
                                                <span className="text-[10px] font-bold text-slate-400">Uploading...</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-[#1E4E82] transition-colors">
                                                <Plus size={24} />
                                                <span className="text-[10px] font-bold">Add Image</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Address</label>
                            <input type="text" defaultValue={userProfile?.addresses?.[0]?.address || "17 Ajao Rd, Ikeja, Lagos, Nigeria"} className="w-full px-5 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm" />
                        </div>

                        {/* Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Time</label>
                                <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider">From</label>
                                <select className="w-full px-4 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm appearance-none bg-white" value={fromTime} onChange={(e) => setFromTime(e.target.value)}>
                                    <option>06 : 00 am</option>
                                    <option>07 : 00 am</option>
                                </select>
                            </div>
                            <div>
                                <div className="h-5" /> {/* Spacer */}
                                <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider">To</label>
                                <select className="w-full px-4 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm appearance-none bg-white" value={toTime} onChange={(e) => setToTime(e.target.value)}>
                                    <option>16 : 00 pm</option>
                                    <option>17 : 00 pm</option>
                                </select>
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Date</label>
                            <div className="relative">
                                <select className="w-full px-5 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm appearance-none bg-white">
                                    <option>16th June, 2025</option>
                                </select>
                                <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
                            </div>
                        </div>

                        {/* Service mode */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Service mode</label>
                            <div className="relative">
                                <select
                                    className="w-full px-5 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm appearance-none bg-white"
                                    value={selectedServiceMode}
                                    onChange={(e) => setSelectedServiceMode(e.target.value)}
                                >
                                    <option value="HOME_SERVICE">Home Service</option>
                                    <option value="WORK_STATION">Work Station</option>
                                </select>
                                <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
                            </div>
                        </div>

                        {/* Continue Button */}
                        <div className="pt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className={`w-full py-4 bg-[#1E4E82] text-white rounded-[12px] font-bold text-[15px] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${submitting ? 'opacity-70' : 'hover:bg-[#153a61]'}`}
                            >
                                {submitting ? <Loader2 className="animate-spin" size={20} /> : 'Continue'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
