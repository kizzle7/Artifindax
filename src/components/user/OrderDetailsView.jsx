import { ChevronLeft, MapPin, Phone, MessageSquare, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderDetailsView = ({ booking, setSelectedBooking, handleCancelBooking, setCurrentChat, setCurrentView, setMessagesViewStep, setSelectedArtisan }) => {
    if (!booking) return null;
    return (
        <div className="flex-1 lg:ml-[240px] bg-[#F8FAFC] min-h-screen transition-all duration-300">
            <div className="max-w-6xl mx-auto w-full pb-6 animate-in slide-in-from-right-4 duration-500 px-0 lg:px-4 flex flex-col pt-20 lg:pt-6 bg-[#F8FAFC] min-h-screen">
                <div className="hidden lg:flex items-center gap-4 mb-2 pb-4 border-b border-slate-100 mt-2">
                    <button onClick={() => setSelectedBooking(null)} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform cursor-pointer"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black text-[#0f172a] tracking-tight mb-1">Order Details</h1>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${['NEW', 'ACCEPTED'].includes(booking.bookingStatus) ? 'bg-blue-50 text-[#1E4E82]' :
                                booking.bookingStatus === 'COMPLETED' ? 'bg-green-50 text-green-600' :
                                    'bg-red-50 text-red-600'
                                }`}>
                                {booking.bookingStatus || 'NEW'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full space-y-4 px-4 lg:px-0">
                    <div className="bg-white border border-slate-100 rounded-[24px] p-4 lg:p-6 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3 lg:gap-4">
                            <button
                                onClick={() => {
                                    if (setSelectedArtisan && booking.artisan) {
                                        // Flatten the artisan object for the profile view
                                        const profileArtisan = {
                                            ...booking.artisan,
                                            firstName: booking.artisan.appUser?.firstName || '',
                                            lastName: booking.artisan.appUser?.lastName || '',
                                            profilePicture: booking.artisan.appUser?.profilePicture || booking.avatar,
                                            skillName: booking.artisanCategorySkill?.skill?.name || booking.artisanCategorySkill?.artisanCategory?.category?.name || booking.artisanRole || 'Service Partner',
                                            rating: booking.artisanRating || '5.0',
                                            price: booking.price || booking.artisanCategorySkill?.artisanCategory?.rateAmount || '3500',
                                            bio: booking.artisan.bio,
                                            skills: booking.artisanCategorySkill?.skill?.name ? [booking.artisanCategorySkill.skill.name] : (booking.artisanCategorySkill?.artisanCategory?.category?.name ? [booking.artisanCategorySkill.artisanCategory.category.name] : []),
                                            yearsOfExperience: booking.artisan.yearsOfExperience,
                                            availability: booking.artisan.artisanAvailability,
                                            gender: booking.artisan.appUser?.gender || booking.artisan.gender,
                                            hideBookNow: true
                                        };
                                        setSelectedArtisan(profileArtisan);
                                        setSelectedBooking(null);
                                        setCurrentView('search');
                                    }
                                }}
                                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden shrink-0 shadow-inner ring-2 ring-slate-50 hover:ring-[#1E4E82] transition-all active:scale-95 cursor-pointer"
                            >
                                <img
                                    src={booking.artisan?.appUser?.profilePicture || booking.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.artisan?.appUser?.firstName || '') + ' ' + (booking.artisan?.appUser?.lastName || ''))}&background=1E4E82&color=fff&size=150`}
                                    onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((booking.artisan?.appUser?.firstName || 'A') + ' ' + (booking.artisan?.appUser?.lastName || ''))}&background=1E4E82&color=fff&size=150`; }}
                                    alt="" className="w-full h-full object-cover" />
                            </button>
                            <div>
                                <button
                                    onClick={() => {
                                        if (setSelectedArtisan && booking.artisan) {
                                            // Flatten the artisan object for the profile view
                                            const profileArtisan = {
                                                ...booking.artisan,
                                                firstName: booking.artisan.appUser?.firstName || '',
                                                lastName: booking.artisan.appUser?.lastName || '',
                                                profilePicture: booking.artisan.appUser?.profilePicture || booking.avatar,
                                                skillName: booking.artisanCategorySkill?.skill?.name || booking.artisanCategorySkill?.artisanCategory?.category?.name || booking.artisanRole || 'Service Partner',
                                                rating: booking.artisanRating || '5.0',
                                                price: booking.price || booking.artisanCategorySkill?.artisanCategory?.rateAmount || '3500',
                                                bio: booking.artisan.bio,
                                                skills: booking.artisanCategorySkill?.skill?.name ? [booking.artisanCategorySkill.skill.name] : (booking.artisanCategorySkill?.artisanCategory?.category?.name ? [booking.artisanCategorySkill.artisanCategory.category.name] : []),
                                                yearsOfExperience: booking.artisan.yearsOfExperience,
                                                availability: booking.artisan.artisanAvailability,
                                                gender: booking.artisan.appUser?.gender || booking.artisan.gender,
                                                hideBookNow: true
                                            };
                                            setSelectedArtisan(profileArtisan);
                                            setSelectedBooking(null);
                                            setCurrentView('search');
                                        }
                                    }}
                                    className="font-black text-base lg:text-lg text-[#0f172a] mb-0.5 leading-tight hover:text-[#1E4E82] transition-colors block text-left cursor-pointer"
                                >
                                    {booking.artisan?.appUser
                                        ? `${booking.artisan.appUser.firstName || ''} ${booking.artisan.appUser.lastName || ''}`.trim()
                                        : (booking.artisanName || 'Artisan')}
                                </button>
                                <div className="flex items-center gap-2 text-[8px] font-black uppercase text-slate-400 tracking-widest">
                                    <span>{booking.artisanCategorySkill?.skill?.name || booking.artisanCategorySkill?.artisanCategory?.category?.name || booking.artisanRole || 'Professional'}</span>
                                    <span className="flex items-center gap-0.5"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {booking.artisanRating || booking.artisan?.rating || '5.0'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            <button onClick={() => {
                                const phone = booking.artisan?.appUser?.phoneNumber || booking.artisan?.phoneNumber || '';
                                if (phone) {
                                    navigator.clipboard.writeText(phone);
                                    toast.success('Phone number copied');
                                } else {
                                    toast.error('Phone number not available');
                                }
                            }} className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all cursor-pointer"><Phone size={14} /></button>
                            <button onClick={() => {
                                const artisanObj = booking.artisan;
                                const name = artisanObj?.appUser
                                    ? `${artisanObj.appUser.firstName || ''} ${artisanObj.appUser.lastName || ''}`.trim()
                                    : (booking.artisanName || 'Artisan');
                                const avatar = artisanObj?.appUser?.profilePicture || booking.avatar;

                                setCurrentChat({
                                    id: booking.id,
                                    artisan: name,
                                    avatar: avatar,
                                    location: booking.customerAddress?.address?.address || booking.location,
                                    phoneNumber: artisanObj?.appUser?.phoneNumber || booking.artisan?.phoneNumber || ''
                                });
                                setCurrentView('messages');
                                setMessagesViewStep('chat');
                                setSelectedBooking(null);
                            }} className="p-2.5 bg-slate-50 rounded-xl text-blue-900 shadow-sm active:scale-95 transition-all cursor-pointer"><MessageSquare size={14} /></button>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-[24px] p-6 lg:p-8 shadow-sm space-y-6">
                        <section>
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">TITLE & DESCRIPTION</h6>
                            <h2 className="text-lg lg:text-xl font-black text-[#0f172a] mb-2 tracking-tight">
                                {booking.bookingNote ? (booking.bookingNote.includes('\n\n') ? booking.bookingNote.split('\n\n')[0] : booking.bookingNote) : 'Service Booking'}
                            </h2>
                            <p className="text-[11px] lg:text-xs text-slate-500 font-bold leading-relaxed">
                                {booking.bookingNote && booking.bookingNote.includes('\n\n') ? booking.bookingNote.split('\n\n')[1] : (booking.bookingNote || 'No description provided.')}
                            </p>
                        </section>
                        <section>
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">LOCATION</h6>
                            <div className="flex items-center gap-2 text-xs lg:text-sm font-bold text-[#0f172a]">
                                <MapPin size={14} className="text-[#1E4E82]" />
                                {booking.customerAddress?.address?.address || booking.address || 'Address not provided'}
                            </div>
                        </section>
                        {booking.bookingMedia && booking.bookingMedia.length > 0 && (
                            <section>
                                <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3">MEDIA</h6>
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {booking.bookingMedia.map((url, idx) => (
                                        <div key={idx} className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm transition-transform hover:scale-105 cursor-pointer">
                                            <img src={url} alt={`Booking media ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        <section className="flex flex-wrap gap-6">
                            <div className="flex-1 min-w-[80px]">
                                <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">DATE</h6>
                                <p className="text-sm lg:text-base font-black text-[#0f172a]">
                                    {booking.bookingDate ? new Date(booking.bookingDate.replace(' ', 'T')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : (booking.date || 'TBD')}
                                </p>
                            </div>
                            <div className="flex-1 min-w-[80px]">
                                <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">TIME</h6>
                                <p className="text-sm lg:text-base font-black text-[#0f172a]">
                                    {booking.bookingDate ? new Date(booking.bookingDate.replace(' ', 'T')).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : (booking.time || '--:--')}
                                </p>
                            </div>
                        </section>
                        {/* <div className="pt-6 border-t border-slate-50">
                            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-4">PAYMENT SUMMARY</h6>
                            <div className="space-y-2.5">
                                <div className="flex justify-between font-bold text-[10px] lg:text-xs text-slate-400"><span>Service Charge</span><span className="text-[#0f172a]">₦900</span></div>
                                <div className="flex justify-between text-xl lg:text-2xl font-black text-[#0f172a] pt-4 mt-2 border-t border-slate-50">
                                    <span>Total</span>
                                    <span>₦{booking.price || booking.artisanCategorySkill?.artisanCategory?.rateAmount || '0.00'}</span>
                                </div>
                            </div>
                        </div> */}
                        {booking.bookingStatus === 'NEW' && (
                            <button onClick={() => handleCancelBooking(booking.id)} className="w-full py-3.5 text-[#b91c1c] font-black text-xs border border-red-100 rounded-xl hover:bg-red-50 transition-all active:scale-[0.98] cursor-pointer">Cancel Booking</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsView;
