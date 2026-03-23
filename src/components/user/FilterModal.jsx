import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, X, MapPin } from 'lucide-react';

const FilterModal = ({ isFilterModalOpen, setIsFilterModalOpen, setFiltersEnabled }) => {
    const [priceRange, setPriceRange] = useState(1500);
    const [address, setAddress] = useState('17 Ajao Rd, Ikeja, Lagos, Nigeria');
    const [fromTime, setFromTime] = useState('06 : 00 am');
    const [toTime, setToTime] = useState('16 : 00 pm');
    const [fromDate, setFromDate] = useState('16th June, 2025');
    const [toDate, setToDate] = useState('16th June, 2025');
    const [serviceMode, setServiceMode] = useState('Select...');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showFromDateCalendar, setShowFromDateCalendar] = useState(false);
    const [showServiceModeDropdown, setShowServiceModeDropdown] = useState(false);

    const ADDRESS_SUGGESTIONS = ['17 Ajao Rd, Ikeja, Lagos, Nigeria', '22 Opebi Road, Ikeja, Lagos', 'Lekki Phase 1, Lagos, Nigeria'];
    const filteredSuggestions = ADDRESS_SUGGESTIONS.filter(item => item.toLowerCase().includes(address.toLowerCase()));

    if (!isFilterModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-[#4A5568]/50 animate-in fade-in duration-300 px-6">
            <div className="bg-white w-full max-w-[420px] shadow-2xl relative" style={{ borderRadius: '12px' }}>
                <div className="p-7">
                    <div className="relative flex justify-center items-center mb-6">
                        <button onClick={() => setIsFilterModalOpen(false)} className="absolute left-0 p-1 rounded-md border border-slate-300 text-slate-500 hover:bg-slate-50 cursor-pointer"><ChevronLeft size={16} /></button>
                        <h2 className="text-[15px] font-bold text-[#0f172a]">Filter</h2>
                        <button onClick={() => setIsFilterModalOpen(false)} className="absolute right-0 p-1 rounded-full border border-slate-500 text-slate-600 hover:bg-slate-50 cursor-pointer"><X size={14} /></button>
                    </div>
                    <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1 pb-2 scrollbar-hide">
                        {/* <div>
                            <h4 className="text-[12px] text-slate-500 mb-7">Price range(₦/hour)</h4>
                            <div className="px-2">
                                <div className="relative mb-3">
                                    <input type="range" min="0" max="10000" step="500" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                                        className="w-full h-1 bg-slate-200 rounded-full appearance-none flex items-center cursor-pointer relative z-10"
                                        style={{ background: `linear-gradient(to right, #1E4E82 ${(priceRange / 10000) * 100}%, #e2e8f0 ${(priceRange / 10000) * 100}%)` }} />
                                    <div className="absolute -top-7 bg-[#1E4E82] text-white text-[9px] font-medium px-1.5 py-0.5 rounded shadow pointer-events-none transform -translate-x-1/2" style={{ left: `${(priceRange / 10000) * 100}%` }}>
                                        {priceRange}<div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1E4E82]" />
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] items-center text-[#1E4E82] font-medium"><span>0</span><span className="text-slate-400">10,000</span></div>
                            </div>
                        </div> */}
                        <div className="relative">
                            <h4 className="text-[12px] text-slate-600 mb-1.5 font-medium">Address</h4>
                            <input type="text" value={address} onChange={(e) => { setAddress(e.target.value); setShowSuggestions(true); }} onFocus={() => setShowSuggestions(true)}
                                className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 focus:border-[#1E4E82]/40 focus:outline-none text-slate-700 bg-white text-[11px] transition-all" />
                            {showSuggestions && address.length > 0 && filteredSuggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg mt-1 shadow-xl z-[110] overflow-hidden max-h-40 overflow-y-auto">
                                    {filteredSuggestions.map((s, i) => <div key={i} onClick={() => { setAddress(s); setShowSuggestions(false); }} className="px-4 py-2.5 text-[11px] text-slate-600 hover:bg-slate-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center gap-2"><MapPin size={10} className="text-slate-400" />{s}</div>)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="text-[12px] text-slate-600 mb-1.5 font-medium">Availability</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-[10px] text-slate-500 mb-1">From</p><input type="text" value={fromTime} onChange={e => setFromTime(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white focus:outline-none focus:border-[#1E4E82]/50" /></div>
                                <div><p className="text-[10px] text-slate-500 mb-1">To</p><input type="text" value={toTime} onChange={e => setToTime(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white focus:outline-none focus:border-[#1E4E82]/50" /></div>
                            </div>
                        </div>
                        <div className="relative z-[60]">
                            <h4 className="text-[12px] text-slate-600 mb-1.5 font-medium">Date</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <p className="text-[10px] text-slate-500 mb-1">From</p>
                                    <div onClick={() => setShowFromDateCalendar(!showFromDateCalendar)} className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white flex justify-between items-center cursor-pointer">
                                        <span>{fromDate}</span><ChevronDown size={14} className="text-slate-600" />
                                    </div>
                                    {showFromDateCalendar && (
                                        <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-[100] w-64 text-[11px] font-medium">
                                            <div className="flex justify-center items-center bg-black text-white rounded-[6px] py-1 mb-4 max-w-max mx-auto px-4 text-xs"><span>June</span></div>
                                            <div className="grid grid-cols-7 gap-1 text-center text-slate-500 mb-3 text-[10px]"><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div></div>
                                            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-slate-700">
                                                <div className="text-slate-300">26</div><div className="text-slate-300">27</div><div className="text-slate-300">28</div><div className="text-slate-300">29</div><div className="text-slate-300">30</div><div className="text-slate-300">31</div><div>1</div>
                                                <div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div>
                                                <div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div>
                                                <div className="bg-[#1E4E82] text-white rounded-md cursor-pointer flex items-center justify-center p-1">16</div>
                                                <div className="cursor-pointer p-1">17</div><div className="cursor-pointer p-1">18</div><div className="cursor-pointer p-1">19</div><div className="cursor-pointer p-1">20</div><div className="cursor-pointer p-1">21</div><div className="cursor-pointer p-1">22</div>
                                                <div className="p-1">23</div><div className="p-1">24</div><div className="p-1">25</div><div className="p-1">26</div><div className="p-1">27</div><div className="p-1">28</div><div className="p-1">29</div>
                                                <div className="p-1">30</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    <p className="text-[10px] text-slate-500 mb-1">To</p>
                                    <div className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white flex justify-between items-center cursor-pointer"><span>{toDate}</span><ChevronDown size={14} className="text-slate-600" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-50">
                            <h4 className="text-[12px] text-slate-600 mb-1.5 font-medium">Service mode</h4>
                            <div onClick={() => setShowServiceModeDropdown(!showServiceModeDropdown)} className="w-full px-3 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-[11px] bg-white flex justify-between items-center cursor-pointer">
                                <span>{serviceMode}</span><ChevronDown size={14} className="text-slate-600" />
                            </div>
                            {showServiceModeDropdown && (
                                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-[10px] shadow-lg z-[100] overflow-hidden py-1">
                                    {['Select...', 'Home Service', 'Work Station', 'Both'].map((opt, i) => <div key={i} onClick={() => { setServiceMode(opt); setShowServiceModeDropdown(false); }} className="px-4 py-2.5 text-[11px] text-slate-600 hover:bg-slate-50 cursor-pointer border-b border-gray-50 max-w-full last:border-0">{opt}</div>)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-8">
                        <button onClick={() => { setFiltersEnabled(true); setIsFilterModalOpen(false); }} className="w-full py-3 bg-[#D6E6F9] text-[#1E4E82] rounded-[10px] font-bold text-[13px] shadow-sm active:scale-95 transition-all hover:bg-[#c6dbf5] cursor-pointer">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
