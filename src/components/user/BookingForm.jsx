import React, { useState, useRef } from 'react';
import { ChevronLeft, MapPin, Phone, MessageSquare, Star, Plus, X, Loader2 } from 'lucide-react';
import fileService from '../../services/fileService';

const BookingForm = ({ artisan, setIsBookingFormOpen, userProfile, setSelectedArtisan }) => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const [fromTime, setFromTime] = useState('06:00 am');
    const [toTime, setToTime] = useState('04:00 pm');
    const [fromDate, setFromDate] = useState('16th June');
    const [toDate, setToDate] = useState('16th June');

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const response = await fileService.upload(file);
            // Assuming response contains the image URL in response.secure_url or response.url or response.data.url
            const imageUrl = response.data?.url || response.url || response.secure_url;
            if (imageUrl) {
                setImages([...images, imageUrl]);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="flex-1 lg:ml-[240px] bg-white min-h-screen transition-all duration-300">
            <div className="w-full pb-32 flex flex-col pt-4 bg-white min-h-screen border border-transparent">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4 px-6 lg:px-12">
                    <button onClick={() => setIsBookingFormOpen(false)} className="p-1 text-[#0f172a] active:scale-90 transition-all">
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
                                <img src={artisan?.profilePicture || artisan?.image || 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=100'} alt="" className="w-full h-full object-cover" />
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
                            <button className="w-9 h-9 bg-slate-50 border border-slate-100 text-[#0f172a] rounded-full flex items-center justify-center shadow-sm"><Phone size={16} /></button>
                            <button className="w-9 h-9 bg-slate-50 border border-slate-100 text-[#0f172a] rounded-full flex items-center justify-center shadow-sm"><MessageSquare size={16} /></button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {/* Urgent Toggle */}
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Mark as Urgent</label>
                            <div className="w-10 h-5 bg-[#1E4E82] rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 bottom-1 w-3 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Title (eg Broken pipe)</label>
                            <input type="text" className="w-full px-5 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm" />
                        </div>

                        {/* Short description */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Short description</label>
                            <textarea placeholder="I need help with..." className="w-full h-24 px-5 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm resize-none" />
                        </div>

                        {/* Add Images */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Add Images(Optional)</label>
                            <div className="flex flex-wrap gap-3">
                                {images.map((img, index) => (
                                    <div key={index} className="relative w-24 h-24 rounded-[12px] overflow-hidden border border-slate-200">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-slate-600 hover:bg-white shadow-sm transition-all"><X size={12} /></button>
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <div 
                                        onClick={() => !uploading && fileInputRef.current?.click()}
                                        className={`w-28 h-28 rounded-[12px] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#1E4E82]/30 hover:bg-slate-50'}`}
                                    >
                                        {uploading ? <Loader2 size={24} className="text-slate-400 animate-spin" /> : <Plus size={24} className="text-slate-400" />}
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
                                <select className="w-full px-5 py-4 rounded-[12px] border border-slate-300 focus:border-[#1E4E82] focus:outline-none font-bold text-[#0f172a] text-sm appearance-none bg-white">
                                    <option>Select...</option>
                                    <option>Home Service</option>
                                    <option>Work Station</option>
                                </select>
                                <ChevronRight size={16} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
                            </div>
                        </div>

                        {/* Continue Button */}
                        <div className="pt-4">
                            <button onClick={() => setIsBookingFormOpen(false)} className="w-full py-4 bg-[#D6E4F4] text-[#1E4E82] rounded-[12px] font-bold text-[15px] shadow-sm active:scale-[0.98] transition-all">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
