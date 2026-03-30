import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bell, Search, Star, Info } from 'lucide-react';
import { BANNERS } from '../../constants/userData';
import DashboardSkeleton from '../ui/DashboardSkeleton';

const HomeView = ({ userProfile, setCurrentView, setNotificationsViewStep, topArtisans, loadingTopRated, setIsMenuOpen, isMenuOpen, handleCategoryClick, popularServices, setSearchQuery, loadingPopular }) => {
    const repeatedBanners = [...BANNERS, ...BANNERS, ...BANNERS];
    return (
        <div className="flex-1 p-4 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen pt-16 lg:pt-10 transition-all duration-300">
            <div className="hidden lg:flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden ring-2 ring-white shadow-sm shrink-0 flex items-center justify-center cursor-pointer">
                        {userProfile.profilePicture ? (
                            <img src={userProfile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="bg-[#1E4E82] text-white w-full h-full flex items-center justify-center font-black text-xs">
                                {userProfile.firstName?.charAt(0)}{userProfile.lastName?.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-base font-black text-[#0f172a] leading-tight">Hi, {userProfile.firstName}</h2>
                        <p className="text-gray-400 text-[8px] flex items-center gap-1 font-black uppercase tracking-widest opacity-70"><MapPin size={8} /> {userProfile.addresses[0]?.address || 'Your Location'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <button onClick={() => { setCurrentView('notifications'); setNotificationsViewStep('list'); }} className="p-2 bg-white rounded-xl shadow-sm relative transition-all active:scale-90 border border-gray-50 cursor-pointer"><Bell size={16} className="text-gray-600" /><span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" /></button>
                </div>
            </div>
            <div className="relative mb-6 cursor-pointer" onClick={() => setCurrentView('search')}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input type="text" readOnly placeholder="Search for artisan or service" className="w-full bg-white pl-11 pr-4 py-3 rounded-2xl cursor-pointer border border-gray-100 focus:border-[#1E4E82]/20 transition-all text-gray-700 text-xs shadow-sm" />
            </div>
            <div className="relative overflow-hidden mb-8 h-[145px]">
                <motion.div className="flex gap-4 w-max" animate={{ x: [0, -BANNERS.length * 276] }} transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}>
                    {repeatedBanners.map((banner, i) => (
                        <div key={i} className={`min-w-[260px] p-4 rounded-[20px] flex flex-col justify-between h-[130px] ${banner.color} relative overflow-hidden shadow-sm`}>
                            <div className="z-10">
                                <span className="text-[7px] bg-white/30 px-2 py-0.5 rounded-full text-white font-bold uppercase tracking-widest">{banner.tag}</span>
                                <h3 className="text-base font-black text-white mt-1.5 leading-tight">{banner.title}</h3>
                                <p className="text-white/80 text-[9px] mt-0.5 font-bold">{banner.sub}</p>
                            </div>
                            <button className="z-10 self-end bg-white/20 text-white text-[7px] font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-widest hover:bg-white/40 transition-colors cursor-pointer">Claim now</button>
                            <div className="absolute right-2 bottom-0 text-6xl opacity-20 pointer-events-none">{banner.icon}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <h3 className="text-xs font-black text-[#0f172a] mb-4 uppercase tracking-[0.1em] opacity-80">Popular Services</h3>
            {loadingPopular ? (
                <DashboardSkeleton type="user-category" />
            ) : (
                <div className="grid grid-cols-4 gap-3 mb-8 px-1 overflow-x-auto pb-2 -mx-1 lg:mx-0 lg:overflow-visible">
                    {popularServices.slice(0, 4).map((item) => (
                        <button key={item.id} onClick={() => handleCategoryClick(item.category)}
                            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-50 hover:border-blue-200 transition-all active:scale-95 min-w-[80px] cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-900 shadow-inner overflow-hidden">
                                {item.category?.image ? <img src={item.category.image} alt="" className="w-full h-full object-cover" /> : <Info size={16} />}
                            </div>
                            <span className="text-[8px] font-black text-[#0f172a] uppercase tracking-tighter text-center line-clamp-1">{item.name}</span>
                        </button>
                    ))}
                </div>
            )}
            <h3 className="text-xs font-black text-[#0f172a] mb-4 uppercase tracking-[0.1em] opacity-80">Top Rated</h3>
            <div className="flex flex-col gap-2.5 pb-24">
                {loadingTopRated ? (
                    <DashboardSkeleton type="user-results" />
                ) : (
                    <>
                        {topArtisans.length > 0 ? (
                            topArtisans.map(artisan => (
                                <div key={artisan.id} onClick={() => {
                                    const role = artisan.artisanRole || artisan.role || 'Professional';
                                    const service = popularServices.find(s => s.name.toLowerCase().includes(role.toLowerCase()));
                                    if (service) { setCurrentView('search'); handleCategoryClick(service.category); }
                                    else { setCurrentView('search'); setSearchQuery(role); }
                                }}
                                    className="bg-white p-3.5 rounded-[16px] border border-gray-100 flex items-center gap-3.5 shadow-sm hover:border-[#1E4E82]/20 transition-all group cursor-pointer overflow-hidden active:scale-[0.98]">
                                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                                        <img
                                            src={artisan.profilePicture || artisan.image || `https://ui-avatars.com/api/?name=${encodeURIComponent((artisan.firstName || artisan.name || 'A') + ' ' + (artisan.lastName || ''))}&background=1E4E82&color=fff&size=150`}
                                            onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((artisan.firstName || artisan.name || 'A') + ' ' + (artisan.lastName || ''))}&background=1E4E82&color=fff&size=150`; }}
                                            alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-xs text-[#0f172a] truncate">{artisan.firstName ? `${artisan.firstName} ${artisan.lastName}` : (artisan.name || 'Artisan')}</h4>
                                        <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-tight">
                                            <span>{artisan.artisanRole || artisan.role || 'Service Partner'}</span>
                                            <span className="flex items-center gap-1"><Star size={10} className="text-yellow-400 fill-yellow-400" />{artisan.rating || artisan.artisanRating || 5.0}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                        <div className="flex flex-col items-center text-center py-12 px-6 bg-white rounded-[24px] border border-dashed border-slate-100">
                            <div className="w-full max-w-xs mb-6 flex justify-center scale-90">
                                <div className="relative w-48 h-32">
                                    {/* Abstract Star/Award Illustration */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm ring-8 ring-yellow-50/30">
                                        <Star size={32} className="text-yellow-400 fill-yellow-400" />
                                    </div>
                                    <div className="absolute left-1/4 top-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border-2 border-white shadow-sm -rotate-12">
                                        <MapPin size={16} className="text-[#1E4E82]/30" />
                                    </div>
                                    <div className="absolute right-1/4 bottom-4 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border-2 border-white shadow-sm rotate-12">
                                        <div className="w-4 h-1 bg-slate-200 rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-[11px] font-black text-[#0f172a] mb-1 uppercase tracking-widest">No Top Artisans Nearby</h4>
                            <p className="text-slate-400 font-bold max-w-[200px] leading-relaxed text-[10px]">We couldn't find any top-rated artisans in your current area just yet. Try searching for specific services!</p>
                        </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeView;
