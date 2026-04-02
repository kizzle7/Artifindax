import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowUpRight, ChevronDown, Clock, CheckCircle2 } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { earningsData, workStatsData } from '../../constants/artisanData';
import UserIcon from './UserIcon';

const ArtisanHomeView = ({ setCurrentView, setSettingsStep, userProfile }) => {
    const isAvailable = userProfile.status === 'ACTIVE';

    return (
        <div className="space-y-6">
            {/* Header / Welcome Area */}
            <div className="flex items-center justify-between">
                <div onClick={() => { setCurrentView('settings'); setSettingsStep('profile'); }} className="flex items-center gap-4 cursor-pointer group">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
                        <img 
                            src={userProfile.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent((userProfile.firstName || 'A') + ' ' + (userProfile.lastName || ''))}&background=1E4E82&color=fff&size=150`}
                            onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((userProfile.firstName || 'A') + ' ' + (userProfile.lastName || ''))}&background=1E4E82&color=fff&size=150`; }}
                            alt="Profile" className="w-full h-full object-cover" 
                        />
                    </div>
                    <div>
                        <h1 className="hidden lg:block text-lg font-bold text-[#0f172a] group-hover:text-[#1E4E82] transition-colors">Hi, {userProfile.firstName}</h1>
                        <h1 className="lg:hidden text-lg font-bold text-[#0f172a] group-hover:text-[#1E4E82] transition-colors">Hi, {userProfile.firstName}!</h1>
                        <p className="text-xs text-gray-500">{userProfile.addresses[0]?.address || 'Your Location'}</p>
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <button onClick={() => setCurrentView('notifications')} className="p-2 text-gray-400 hover:text-gray-600 relative cursor-pointer">
                        <Bell size={24} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-600 font-bold uppercase tracking-wider text-[11px]">Availability</span>
                <button
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center cursor-pointer ${isAvailable ? 'bg-[#1E4E82]' : 'bg-gray-300'}`}
                >
                    <motion.div
                        animate={{ x: isAvailable ? 24 : 0 }}
                        className="w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                </button>
            </div>

            {/* Balance Card */}
            <div className="bg-black text-white p-6 rounded-[24px] relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs opacity-70">Available Balance</span>
                    <button className="p-1 rounded-full border border-white/20 cursor-pointer">
                        <ArrowUpRight size={16} />
                    </button>
                </div>
                <div className="flex justify-between items-end">
                    <h2 className="text-3xl font-bold">₦125,000.00</h2>
                    <button className="bg-white text-black px-6 py-2 rounded-xl text-sm font-bold cursor-pointer">
                        Withdraw
                    </button>
                </div>
            </div>

            {/* Category Filter & Stats */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#0f172a]">Category</h3>
                    <div className="relative">
                        <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-1.5 pr-10 text-xs font-medium focus:outline-none">
                            <option>Electrician</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between h-32 relative group cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-gray-50 rounded-lg">
                                <Clock size={16} className="text-gray-600" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Ongoing</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[#0f172a]">7</span>
                            <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-black transition-colors">
                                <ArrowUpRight size={14} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between h-32 relative group cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-gray-50 rounded-lg">
                                <CheckCircle2 size={16} className="text-gray-600" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Completed</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[#0f172a]">28</span>
                            <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-black transition-colors">
                                <ArrowUpRight size={14} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Earnings Chart */}
            <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-[#0f172a]">Earnings</h3>
                    <div className="relative">
                        <select className="appearance-none bg-gray-50 rounded-lg px-4 py-1.5 pr-8 text-[10px] font-bold focus:outline-none text-gray-500 uppercase">
                            <option>monthly</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Total</p>
                        <p className="text-sm font-bold">₦20,560.32</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Average</p>
                        <p className="text-sm font-bold">₦836.52</p>
                    </div>
                </div>
                <div className="h-[200px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData}>
                            <defs>
                                <linearGradient id="colorJan" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.5} />
                                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorFeb" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FB7185" stopOpacity={0.5} />
                                    <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorMar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.5} />
                                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="jan" stroke="#38BDF8" strokeWidth={1.5} fillOpacity={1} fill="url(#colorJan)" dot={{ r: 3, fill: '#fff', strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
                            <Area type="monotone" dataKey="feb" stroke="#FB7185" strokeWidth={1.5} fillOpacity={1} fill="url(#colorFeb)" dot={{ r: 3, fill: '#fff', strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
                            <Area type="monotone" dataKey="mar" stroke="#818CF8" strokeWidth={1.5} fillOpacity={1} fill="url(#colorMar)" dot={{ r: 3, fill: '#fff', strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-[#38BDF8]"></div><span className="text-[10px] text-gray-400 font-bold">Jan</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-[#FB7185]"></div><span className="text-[10px] text-gray-400 font-bold">Feb</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-[#818CF8]"></div><span className="text-[10px] text-gray-400 font-bold">Mar</span></div>
                </div>
            </div>

            {/* Work Stats Chart */}
            <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-[#0f172a] mb-6">Work stats</h3>
                <div className="flex flex-col items-center">
                    <div className="h-[240px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={workStatsData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                                    {workStatsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
                    </div>
                    <div className="w-full space-y-3 mt-4">
                        {workStatsData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs text-gray-600 font-medium">{item.name}</span>
                                </div>
                                <span className="text-xs font-bold text-[#0f172a]">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanHomeView;
