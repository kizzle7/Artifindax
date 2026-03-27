import React from 'react';
import { ChevronLeft, Filter, Info, CheckCircle2, MapPin, Star, Search } from 'lucide-react';
import ArtisanProfileView from './ArtisanProfileView';
import DashboardSkeleton from '../ui/DashboardSkeleton';

const SearchView = ({
    searchQuery, setSearchQuery, isFilterModalOpen, setIsFilterModalOpen,
    popularServices, loadingPopular, categories, loadingCategories,
    categorySkills, loadingSkills, searchResults,
    loadingSearch, selectedCategory, setSelectedCategory, selectedSkill, setSelectedSkill,
    handleCategoryClick, handleSkillClick, selectedArtisan, setSelectedArtisan,
    setIsBookingFormOpen, isBookingFormOpen, setCurrentView,
    setCategorySkills, setSearchResults, userProfile
}) => {
    const filteredCategories = (categories || []).filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 lg:ml-[240px] bg-white min-h-screen transition-all duration-300">
            <div className="w-full pb-32 flex flex-col pt-16 lg:pt-0 bg-white min-h-screen border border-transparent">
                {!selectedArtisan && (
                    <div className="hidden lg:flex items-center justify-between gap-4 mb-6 pt-8 pb-4 border-b border-slate-50 px-8">
                        <div className="flex items-center gap-3">
                            <button onClick={() => {
                                if (selectedSkill) { setSelectedSkill(null); setSearchResults([]); }
                                else if (selectedCategory) { setSelectedCategory(null); setCategorySkills([]); }
                                else { setCurrentView('home'); }
                            }} className="p-1 -ml-1 text-[#0f172a] active:scale-90 transition-transform cursor-pointer"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                            <h1 className="text-xl font-black text-[#0f172a] tracking-tight">
                                {selectedSkill ? selectedSkill.name : selectedCategory ? selectedCategory.name : 'Search'}
                            </h1>
                        </div>
                    </div>
                )}
                {!selectedArtisan ? (
                    <div className="w-full px-5 lg:px-8">
                        <div className="relative mb-6 group">
                            <input type="text" placeholder="Search for artisan or service..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-5 pr-14 py-3.5 rounded-2xl border border-gray-100 bg-white focus:outline-none focus:border-[#1E4E82]/30 text-[#0f172a] font-bold text-sm transition-all shadow-sm placeholder:text-slate-300" />
                            <button onClick={() => setIsFilterModalOpen(true)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#1E4E82] hover:bg-blue-50 rounded-xl transition-all active:scale-95 cursor-pointer">
                                <Filter size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                        {!selectedSkill && !selectedCategory && (
                            <div className="animate-in fade-in duration-500">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{searchQuery ? `Categories for "${searchQuery}"` : 'Browse Categories'}</h3>
                                {loadingCategories ? <DashboardSkeleton type="user-category" /> : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                        {filteredCategories.length > 0 ? (
                                            filteredCategories.map((category) => (
                                                <button key={category.id} onClick={() => { if (searchQuery) setSearchQuery(''); handleCategoryClick(category); }}
                                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-gray-100 hover:border-blue-200 transition-all active:scale-95 cursor-pointer">
                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-900 shadow-sm overflow-hidden">
                                                        {category.image ? <img src={category.image} alt="" className="w-full h-full object-cover" /> : <Info size={24} />}
                                                    </div>
                                                    <span className="text-[11px] font-black text-[#0f172a] uppercase tracking-tighter">{category.name}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="col-span-2 md:col-span-4 text-center py-12 bg-slate-50/50 rounded-[28px] border border-dashed border-gray-200">
                                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mb-2">No Categories Found</p>
                                                <p className="text-gray-400 text-xs">Try a different search term.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        {selectedCategory && !selectedSkill && (
                            <div className="animate-in slide-in-from-right duration-300">
                                <div className="flex items-center gap-2 mb-6">
                                    <button onClick={() => setSelectedCategory(null)} className="text-blue-900 text-xs font-black uppercase tracking-widest cursor-pointer">Back to Categories</button>
                                </div>
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Skills for {selectedCategory.name}</h3>
                                {loadingSkills ? <DashboardSkeleton type="user-skill" /> : (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {categorySkills.map((skill) => (
                                            <button key={skill.id} onClick={() => handleSkillClick(skill)}
                                                className="px-5 py-2.5 bg-white border border-gray-100 rounded-full text-xs font-bold text-[#0f172a] hover:border-blue-900 hover:text-blue-900 transition-all active:scale-95 cursor-pointer">
                                                {skill.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {selectedSkill && (
                            <div className="animate-in fade-in duration-500">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[12px] font-medium text-gray-500">Artisans for <span className="text-[#1E4E82]">"{selectedSkill?.name}" ({searchResults.length || 0})</span></h3>
                                    {selectedSkill && <button onClick={() => { setSelectedSkill(null); setSearchResults([]); }} className="text-[9px] font-black text-blue-900 uppercase">Clear</button>}
                                </div>
                                {loadingSearch ? <DashboardSkeleton type="user-results" /> : searchResults.length > 0 ? (
                                    <div className="space-y-4 pb-20">
                                        {searchResults.map((artisan, index) => (
                                            <div key={artisan.id || artisan.email || `artisan-${index}`} onClick={() => setSelectedArtisan(artisan)}
                                                className="bg-white border border-gray-100 rounded-[20px] p-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between shadow-sm hover:border-[#1E4E82]/20 transition-all cursor-pointer group active:scale-[0.99]">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500 relative">
                                                        <img src={artisan.image || artisan.profilePicture} alt="" className="w-full h-full object-cover" />
                                                        {artisan.isVerified && <div className="absolute top-0.5 right-0.5 bg-[#1E4E82] text-white p-0.5 rounded-full border border-white"><CheckCircle2 size={8} strokeWidth={3} /></div>}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                                            <h5 className="font-medium text-[14px] text-[#0f172a] tracking-tight">{artisan.firstName} {artisan.lastName}</h5>
                                                            <span className={`text-[7px] font-medium px-1.5 py-0.5 rounded-sm uppercase tracking-tighter border ${artisan.status === 'ACTIVE' ? 'bg-[#1E4E82] text-white border-blue-900' : 'bg-orange-500 text-white border-orange-600'}`}>{artisan.status === 'ACTIVE' ? 'Verified' : 'Pending'}</span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-bold uppercase tracking-tight text-gray-400">
                                                            <span className="text-[#1E4E82]">
                                                                {typeof (artisan.skillName) === 'object' ? artisan.skillName.name : (artisan.skillName || selectedSkill?.name)}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-gray-500"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {artisan.rating || '4.5'}</span>
                                                            <span className="flex items-center gap-1"><MapPin size={10} /> {artisan.distance || '2.4km away'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex lg:flex-col lg:items-end justify-between items-center shrink-0">
                                                    {/* <div className="text-lg font-medium text-[#0f172a]">₦{artisan.rate || '4,500'}<span className="text-[8px] text-gray-400 uppercase tracking-[0.2em] block lg:text-right">/hr</span></div> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="text-slate-200" size={32} /></div>
                                        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">No Service Found</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <ArtisanProfileView artisan={selectedArtisan} setSelectedArtisan={setSelectedArtisan} setIsBookingFormOpen={setIsBookingFormOpen} isBookingFormOpen={isBookingFormOpen} userProfile={userProfile} selectedSkill={selectedSkill} setCurrentView={setCurrentView} />
                )}
            </div>
        </div>
    );
};

export default SearchView;
