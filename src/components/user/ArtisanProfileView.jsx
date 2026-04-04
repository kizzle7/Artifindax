import React, { useState } from 'react';
import { ChevronLeft, MapPin, Phone, MessageSquare, Star, Share2, Home, Briefcase, CheckCircle2, Mail, MoreVertical, AlertTriangle, Loader2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import BookingForm from './BookingForm';
import reportService from '../../services/reportService';

const ArtisanProfileView = ({ artisan, setSelectedArtisan, setIsBookingFormOpen, isBookingFormOpen, userProfile, setCurrentView, selectedSkill, bookingsData, setCurrentChat, setMessagesViewStep }) => {
    const [activeTab, setActiveTab] = useState('About');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reporting, setReporting] = useState(false);
    const [reportDetails, setReportDetails] = useState('');
    const [reportType, setReportType] = useState('HARASSMENT');

    if (isBookingFormOpen) return <BookingForm artisan={artisan} setIsBookingFormOpen={setIsBookingFormOpen} setSelectedArtisan={setSelectedArtisan} userProfile={userProfile} selectedSkill={selectedSkill} setCurrentView={setCurrentView} />;

    const handleReport = async () => {
        if (!reportDetails.trim()) return;
        setReporting(true);
        const reportToast = toast.loading('Submitting report...');
        try {
            await reportService.reportAbuse({
                artisanId: artisan?.artisanId || artisan?.id || 0,
                reportType: reportType,
                details: reportDetails
            });
            toast.success('Report submitted successfully.', { id: reportToast });
            setIsReportModalOpen(false);
            setReportDetails('');
        } catch (error) {
            const backendMessage = error.response?.data?.message || 'Failed to submit report. Please try again.';
            toast.error(backendMessage, { id: reportToast });
        } finally {
            setReporting(false);
        }
    };

    return (
        <div className="flex-1 bg-white min-h-screen transition-all duration-300">
            <div className="w-full pb-32 animate-in slide-in-from-right-4 duration-500 lg:py-8 flex flex-col pt-2 bg-white min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6 px-4 lg:px-8">
                    <div className="hidden lg:flex items-center gap-4">
                        <button onClick={() => setSelectedArtisan(null)} className="p-1 -ml-1 text-[#0f172a] active:scale-90 transition-transform cursor-pointer">
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                        <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">View Profile</h1>
                    </div>
                    <div className="relative">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                            <MoreVertical size={24} />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={() => { setIsReportModalOpen(true); setIsMenuOpen(false); }}
                                    className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                                >
                                    <AlertTriangle size={16} /> Report Artisan
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Banner & Profile Picture */}
                <div className="relative mb-20 px-4 lg:px-8">
                    <div className="h-32 lg:h-56 rounded-[20px] overflow-hidden shadow-sm bg-gradient-to-r from-slate-400 to-slate-200" />
                    <div className="absolute -bottom-16 left-8 lg:left-16">
                        <div className="w-32 h-32 rounded-full border-[6px] border-white overflow-hidden shadow-sm relative bg-[#1E4E82]">
                            <img
                                src={artisan.profilePicture || artisan.image || `https://ui-avatars.com/api/?name=${encodeURIComponent((artisan.firstName || artisan.name || 'A') + ' ' + (artisan.lastName || ''))}&background=1E4E82&color=fff&size=150`}
                                onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((artisan.firstName || artisan.name || 'A') + ' ' + (artisan.lastName || ''))}&background=1E4E82&color=fff&size=150`; }}
                                alt="" className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                        </div>
                    </div>
                </div>

                {/* Artisan Info Section */}
                <div className="px-5 lg:px-16 space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h1 className="text-2xl lg:text-3xl font-bold text-[#0f172a] tracking-tight">{artisan.firstName ? `${artisan.firstName} ${artisan.lastName}` : (artisan.name || 'Artisan')}</h1>
                                {(artisan.isVerified || artisan.status === 'ACTIVE') && <span className="bg-[#1E4E82] text-white px-2 py-0.5 rounded text-[10px] font-bold">verified</span>}
                            </div>
                            <p className="text-base font-bold text-[#0f172a] tracking-tight">{typeof (artisan.skillName) === 'object' ? artisan.skillName.name : (artisan.skillName || artisan.role || 'Service Partner')}</p>
                            <div className="flex items-center gap-4 mt-1 text-slate-500 font-semibold text-xs uppercase tracking-tight">
                                <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400" /> {artisan.location || 'Nearby'}</span>
                                <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /> {artisan.rating || artisan.artisanRating || '5.0'} {artisan.reviewCount ? `(${artisan.reviewCount} reviews)` : '(New)'}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 shrink-0 mt-2">
                            <button onClick={() => {
                                if (userProfile?.kycApprovalStatus !== 'APPROVED') {
                                    toast.error('Your account is not yet verified. Communication is restricted.');
                                    return;
                                }
                                const phone =
                                    artisan.phoneNumber ||
                                    artisan.phone ||
                                    artisan.appUser?.phoneNumber ||
                                    artisan.appUser?.phone ||
                                    artisan.user?.phoneNumber ||
                                    artisan.user?.phone ||
                                    (artisan.bio && /^[0-9+ \-]{8,20}$/.test(artisan.bio) ? artisan.bio : null) ||
                                    artisan.contactNumber ||
                                    artisan.mobileNumber ||
                                    artisan.mobile ||
                                    artisan.contact ||
                                    '';

                                console.log('[Phone Debug]', {
                                    artisanId: artisan.artisanId || artisan.id,
                                    bio: artisan.bio,
                                    bioMatch: artisan.bio ? /^[0-9+ \-]{8,20}$/.test(artisan.bio) : false,
                                    phoneNumber: artisan.phoneNumber,
                                    phone_field: artisan.phone,
                                    resolvedPhone: phone || 'NONE'
                                });

                                if (phone) {
                                    navigator.clipboard.writeText(phone);
                                    toast.success(`Phone number copied`);
                                } else {
                                    toast.error('Phone number not available');
                                }
                            }}
                                className="p-2.5 bg-[#1E4E82] text-white rounded-[10px] shadow-sm active:scale-95 transition-all cursor-pointer">
                                <Phone size={16} />
                            </button>
                            <button onClick={() => {
                                if (userProfile?.kycApprovalStatus !== 'APPROVED') {
                                    toast.error('Your account is not yet verified. Communication is restricted.');
                                    return;
                                }
                                const artisanIdToMatch = artisan.artisanId || artisan.id;

                                console.log('[Chat Debug]', {
                                    artisanIdToMatch,
                                    typeOfMatch: typeof artisanIdToMatch,
                                    totalBookings: (bookingsData || []).length,
                                    bookings: (bookingsData || []).map(b => ({
                                        bookingId: b.id,
                                        bArtisanId: b.artisanId,
                                        bArtisanIdType: typeof b.artisanId,
                                        bArtisanObjId: b.artisan?.id,
                                        matchesById: b.artisanId === artisanIdToMatch,
                                        matchesByObjId: b.artisan?.id === artisanIdToMatch,
                                    })),
                                });

                                const existingBooking = (bookingsData || []).find(b =>
                                    String(b.artisanId) === String(artisanIdToMatch) || 
                                    String(b.artisan?.id) === String(artisanIdToMatch)
                                );
                                if (existingBooking) {
                                    setCurrentChat({
                                        id: existingBooking.id,
                                        artisan: `${existingBooking.artisan?.appUser?.firstName || ''} ${existingBooking.artisan?.appUser?.lastName || ''}`.trim() || existingBooking.artisanName || 'Artisan',
                                        artisanPhone: existingBooking.artisan?.appUser?.phoneNumber || existingBooking.artisan?.phoneNumber || '',
                                        bookingId: existingBooking.id,
                                        artisanId: existingBooking.artisanId || existingBooking.artisan?.id,
                                        status: existingBooking.bookingStatus || 'ACTIVE'
                                    });
                                    setMessagesViewStep('chat');
                                    setCurrentView('messages');
                                } else {
                                    toast('Please book this artisan to start chatting.', { icon: '💬' });
                                }
                            }} className="p-2.5 bg-slate-50 text-[#0f172a] rounded-[10px] border border-slate-100 active:scale-95 transition-all cursor-pointer">
                                <MessageSquare size={16} />
                            </button>
                        </div>
                    </div>


                    {/* Tabs */}
                    <div className="flex border-b border-slate-100">
                        {['About', 'Reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-12 lg:px-24 py-4 text-sm font-bold transition-all relative cursor-pointer ${activeTab === tab ? 'text-[#1E4E82]' : 'text-slate-400'}`}
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1E4E82] rounded-t-full" />}
                            </button>
                        ))}
                    </div>
                    {activeTab === 'About' && (
                        <div className="space-y-8 animate-in fade-in duration-500 pt-2 pb-12">
                            {/* <div>
                                <h3 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Minimum rate(/hr)</h3>
                                <p className="text-[15px] font-black text-[#0f172a]">₦{artisan.price || artisan.rate || '3500'}</p>
                            </div> */}

                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Gender</h3>
                                <p className="text-[15px] font-bold text-[#0f172a]">{artisan.gender || 'Not specified'}</p>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-wide">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(artisan.skills && artisan.skills.length > 0 ? artisan.skills : [artisan.skillName || 'Service Partner']).map((skill, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-blue-50 text-[#1E4E82] text-[10px] font-bold rounded-full uppercase tracking-tight">
                                            {typeof skill === 'object' ? skill.name : skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Bio</h3>
                                <p className="text-sm lg:text-base font-bold text-[#0f172a] leading-relaxed max-w-4xl text-slate-600">
                                    {artisan.bio || `Highly skilled ${typeof (artisan.skillName) === 'object' ? artisan.skillName.name : (artisan.skillName || 'professional')} with a commitment to excellence. Dedicated to providing top-tier service and ensuring total customer satisfaction for every project.`}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wide">Years of Experience</h3>
                                <p className="text-sm font-bold text-[#0f172a]">{artisan.yearsOfExperience || '2+ years'}</p>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-wide">Gallery</h3>
                                {artisan.gallery && artisan.gallery.length > 0 ? (
                                    <div className="grid grid-cols-4 gap-3 max-w-lg">
                                        {artisan.gallery.map((img, i) => (
                                            <div key={i} className="aspect-square rounded-xl shadow-sm overflow-hidden border border-slate-100 transition-transform hover:scale-105">
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center max-w-sm">
                                        <Briefcase size={24} className="text-slate-300 mb-2" />
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">No works showcased yet</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-wide">Availability</h3>
                                <div className="space-y-4 max-w-md">
                                    {artisan.availability ? (
                                        Object.entries(artisan.availability).map(([day, schedule]) => (
                                            <div key={day} className={`flex justify-between items-center text-xs font-bold ${schedule.active ? 'text-[#0f172a]' : 'text-slate-300'}`}>
                                                <span className="w-24">{day}</span>
                                                <div className="flex items-center gap-6">
                                                    {schedule.active ? (
                                                        <>
                                                            <span className="tracking-widest">{schedule.from}</span>
                                                            <span className="text-slate-400 font-medium lowercase">to</span>
                                                            <span className="tracking-widest">{schedule.to}</span>
                                                        </>
                                                    ) : (
                                                        <span className="uppercase tracking-widest text-[9px] opacity-50">Unavailable</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-4 px-5 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3">
                                            <Clock size={16} className="text-[#1E4E82]" />
                                            <div>
                                                <p className="text-[11px] font-black text-[#1E4E82] uppercase tracking-wider">Standard Business Hours</p>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter opacity-70">Mon - Sat | 08:00 AM - 06:00 PM</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Service mode</h3>
                                <p className="text-base font-bold text-[#0f172a]">{artisan.serviceMode || 'Home Service'}</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Reviews' && (
                        <div className="space-y-3 animate-in fade-in duration-500 pt-2 pb-12">
                            {artisan.reviews && artisan.reviews.length > 0 ? (
                                <>
                                    <h3 className="text-xs font-bold text-slate-500 mb-2">{artisan.reviews.length} review{artisan.reviews.length !== 1 ? 's' : ''}</h3>
                                    {artisan.reviews.map((review, i) => (
                                        <div key={i} className="bg-slate-50 p-4 lg:py-5 lg:px-6 rounded-[12px] border border-slate-100">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name || 'User')}&background=1E4E82&color=fff&size=100`}
                                                        onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name || 'User')}&background=1E4E82&color=fff&size=100`; }}
                                                        alt="" className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <h5 className="font-bold text-xs text-[#0f172a]">{review.name || 'Anonymous'}</h5>
                                                        <div className="flex gap-0.5 mt-0.5">
                                                            {[...Array(5)].map((_, idx) => (
                                                                <Star key={idx} size={10} className={idx < (review.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-[9px] text-slate-400 font-bold">{review.date || ''}</span>
                                            </div>
                                            <p className="text-[11px] text-[#0f172a] font-medium leading-relaxed">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-center py-12">
                                    <Star size={32} className="text-slate-200 mb-4" />
                                    <h4 className="text-sm font-black text-[#0f172a] mb-1 uppercase tracking-widest">No Reviews Yet</h4>
                                    <p className="text-slate-400 font-bold text-xs max-w-[200px]">Be the first to review this artisan after booking their service.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* Fixed Bottom Action Bar */}
                <div className="fixed bottom-0 left-0 lg:left-[240px] right-0 p-4 lg:p-6 bg-white border-t border-slate-100 flex gap-4 z-50">
                    {!artisan.hideBookNow && (
                        <button
                            onClick={() => {
                                if (userProfile?.kycApprovalStatus !== 'APPROVED') {
                                    toast.error('Your account is not yet verified. Please wait for admin approval to book artisans.');
                                    return;
                                }
                                setIsBookingFormOpen(true);
                            }}
                            className="flex-1 bg-[#1E4E82] text-white py-3.5 rounded-lg font-bold text-sm shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                        >
                            Book Now
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (userProfile?.kycApprovalStatus !== 'APPROVED') {
                                toast.error('Your account is not yet verified. Communication is restricted.');
                                return;
                            }
                            const artisanIdToMatch = artisan.artisanId || artisan.id;
                            const existingBooking = (bookingsData || []).find(b =>
                                String(b.artisanId) === String(artisanIdToMatch) || 
                                String(b.artisan?.id) === String(artisanIdToMatch)
                            );
                            if (existingBooking) {
                                setCurrentChat({
                                    id: existingBooking.id,
                                    artisan: `${existingBooking.artisan?.appUser?.firstName || ''} ${existingBooking.artisan?.appUser?.lastName || ''}`.trim() || existingBooking.artisanName || 'Artisan',
                                    artisanPhone: existingBooking.artisan?.appUser?.phoneNumber || existingBooking.artisan?.phoneNumber || '',
                                    bookingId: existingBooking.id,
                                    artisanId: existingBooking.artisanId || existingBooking.artisan?.id,
                                    status: existingBooking.bookingStatus || 'ACTIVE'
                                });
                                setMessagesViewStep('chat');
                                setCurrentView('messages');
                            } else {
                                toast('Please book this artisan to start chatting.', { icon: '💬' });
                            }
                        }}
                        className="flex-1 bg-white text-[#1E4E82] py-3.5 rounded-lg font-bold text-sm border-2 border-[#1E4E82] active:scale-[0.98] transition-all cursor-pointer"
                    >
                        Message
                    </button>
                </div>

                {/* Report Modal */}
                {isReportModalOpen && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[24px] w-full max-w-md p-6 lg:p-8 animate-in zoom-in-95 duration-300 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#0f172a]">Report Artisan</h3>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-tight">Harassment & Misconduct</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Reason for Reporting</label>
                                    <select
                                        value={reportType}
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-600 focus:outline-none font-bold text-slate-700 text-sm appearance-none bg-white transition-colors mb-4"
                                    >
                                        <option value="HARASSMENT">Harassment</option>
                                        <option value="SCAM">Scam or Fraud</option>
                                        <option value="POOR_SERVICE">Extremely Poor Service</option>
                                        <option value="MISCONDUCT">Professional Misconduct</option>
                                    </select>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Additional Details</label>
                                    <textarea
                                        value={reportDetails}
                                        onChange={(e) => setReportDetails(e.target.value)}
                                        placeholder="Describe the issue in detail..."
                                        className="w-full h-32 px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-600 focus:outline-none font-bold text-slate-700 text-sm resize-none transition-colors"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setIsReportModalOpen(false)}
                                        className="flex-1 py-3.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleReport}
                                        disabled={reporting || !reportDetails.trim()}
                                        className={`flex-1 py-3.5 bg-red-600 text-white rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 ${reporting || !reportDetails.trim() ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
                                    >
                                        {reporting ? <Loader2 className="animate-spin" size={18} /> : 'Submit Report'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtisanProfileView;
