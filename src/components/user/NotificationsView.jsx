import { ChevronLeft, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { NOTIFICATIONS } from '../../constants/userData';

const NotificationsView = ({ notificationsViewStep, setNotificationsViewStep, selectedNotification, setSelectedNotification, setCurrentView }) => {
    const renderEmpty = () => (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full flex flex-col items-center p-6 text-center pt-20 lg:pt-16 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                <div className="w-full max-w-xs mb-10 flex justify-center scale-90">
                    <div className="relative w-64 h-40">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-14 h-32 bg-slate-100 rounded-full flex flex-col items-center justify-between p-1.5 pt-4">
                            <div className="w-2 h-16 bg-slate-200 rounded-full" />
                            <div className="w-8 h-8 bg-slate-100 rounded-full border-2 border-white" />
                        </div>
                    </div>
                </div>
                <h2 className="text-xl lg:text-2xl font-black text-[#0f172a] mb-2 tracking-tight">No Notifications yet!</h2>
                <p className="text-gray-400 font-black mb-8 max-w-xs leading-relaxed uppercase tracking-widest text-[10px]">We'll let you know as soon as you have something.</p>
                <button onClick={() => setCurrentView('home')} className="w-full max-w-xs py-4 bg-[#1E4E82] text-white rounded-[20px] font-black text-sm shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                    <span>Go to Home</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );

    const renderList = () => (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
            <div className="w-full pb-32 lg:pb-10 flex flex-col pt-16 lg:pt-6 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                <div className="hidden lg:flex items-center gap-3 px-8 mb-6 border-b border-slate-50 pb-4">
                    <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Notifications</h1>
                </div>
                {NOTIFICATIONS.length > 0 ? (
                    <div className="w-full px-2 lg:px-8">
                        {NOTIFICATIONS.map((notif) => (
                            <div key={notif.id} onClick={() => { setSelectedNotification(notif); setNotificationsViewStep('detail'); }}
                                className="group flex flex-col gap-0.5 p-4 hover:bg-slate-50 cursor-pointer transition-all border-b border-gray-50 last:border-0 active:scale-[0.99]">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`shrink-0 w-2 h-2 rounded-full ${notif.dot ? 'bg-[#1E4E82] shadow-[0_0_6px_rgba(30,78,130,0.3)]' : 'bg-transparent'}`} />
                                        <h4 className="font-black text-[#0f172a] text-sm lg:text-base tracking-tight group-hover:text-[#1E4E82] transition-colors">{notif.title}</h4>
                                    </div>
                                    <div className="text-right flex flex-col items-end shrink-0">
                                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{notif.date}</span>
                                        <span className="text-[9px] text-gray-400 font-bold tracking-tight">{notif.time}</span>
                                    </div>
                                </div>
                                <div className="pl-4 pr-2">
                                    <p className="text-[11px] lg:text-xs text-gray-400 font-bold leading-relaxed max-w-2xl">{notif.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : renderEmpty()}
            </div>
        </div>
    );

    const renderDetail = () => {
        const isConfirmed = selectedNotification?.type === 'confirmed';
        return (
            <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen lg:p-6 transition-all duration-300">
                <div className="w-full pb-32 flex flex-col pt-16 lg:pt-6 bg-white min-h-screen border border-transparent lg:border-slate-100 lg:rounded-[24px] lg:shadow-sm">
                    <div className="hidden lg:flex items-center gap-3 px-8 mb-6 border-b border-slate-50 pb-4">
                        <button onClick={() => setNotificationsViewStep('list')} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform cursor-pointer"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                        <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Notification Detail</h1>
                    </div>
                    <div className="w-full px-5 lg:px-8 space-y-8 flex flex-col items-center text-center">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-lg lg:text-xl font-black text-[#0f172a] tracking-tight">{isConfirmed ? 'Booking Confirmed' : selectedNotification?.title}</h2>
                            <div className="space-y-3 text-gray-500 font-bold text-xs lg:text-sm leading-relaxed">
                                {isConfirmed ? (
                                    <>
                                        <p>Your appointment for AC Repair has been confirmed.</p>
                                        <p>The artisan will arrive on <span className="text-[#0f172a] font-black">Thursday, June 15 at 2:00 PM.</span></p>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-6">Review the details below</p>
                                    </>
                                ) : <p>{selectedNotification?.description}</p>}
                            </div>
                        </div>
                        {(isConfirmed || selectedNotification?.type === 'on_way' || selectedNotification?.type === 'reminder') && (
                            <div className="w-full max-w-xl bg-white border border-gray-100 rounded-[32px] p-6 lg:p-8 shadow-xl shadow-blue-900/[0.03] text-left">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="min-w-0">
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-0.5">#001345</span>
                                        <h3 className="text-lg lg:text-xl font-black text-[#0f172a] truncate">AC Repair</h3>
                                    </div>
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#1E4E82] rounded-full text-[9px] font-black uppercase tracking-widest ring-1 ring-blue-100/50">
                                        <div className="w-1.5 h-1.5 bg-[#1E4E82] rounded-full animate-pulse" /> scheduled
                                    </span>
                                </div>
                                <div className="space-y-2.5 mb-8">
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">📅 24th June, 2025</div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">🕐 12:00pm</div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 min-w-0">📍 <span className="truncate">Maitama, Abuja</span></div>
                                </div>
                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="" className="w-full h-full object-cover" /></div>
                                        <div className="text-left min-w-0">
                                            <h5 className="font-bold text-[#0f172a] text-xs truncate">Chinedu Eze</h5>
                                            <p className="text-[9px] font-black text-slate-400 uppercase">Electrician • 4.8★</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <button onClick={() => {
                                            const phone = selectedNotification?.phoneNumber || '+234 812 345 6789';
                                            navigator.clipboard.writeText(phone);
                                            toast.success('Phone number copied');
                                        }} className="p-2 bg-white rounded-xl text-[#1E4E82] shadow-sm active:scale-95 transition-all cursor-pointer"><Phone size={16} /></button>
                                        <button className="p-2 bg-white rounded-xl text-[#1E4E82] shadow-sm active:scale-95 transition-all cursor-pointer"><MessageSquare size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button onClick={() => setCurrentView('bookings')} className="w-full max-w-xl py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer">
                            <span>View in Bookings</span><ArrowRight size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (notificationsViewStep === 'list') return renderList();
    if (notificationsViewStep === 'detail') return renderDetail();
    if (notificationsViewStep === 'empty') return renderEmpty();
    return null;
};

export default NotificationsView;
