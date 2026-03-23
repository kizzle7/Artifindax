import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, MapPin, Phone, CreditCard, MoreVertical, Flag, Ban, Camera, X,
    CheckCircle2, AlertCircle, Search, Download, Share2, Copy, Plus, Send
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Client } from "@stomp/stompjs";
import chatService from '../../services/chatService';
import API_CONFIG from '../../config/apiConfig';

const MessagesView = ({ messagesViewStep, setMessagesViewStep, currentChat, setCurrentChat, chatMessages, setChatMessages, searchMessages, setSearchMessages, zoomedImage, setZoomedImage, showMenuModal, setShowMenuModal, selectedReportOption, setSelectedReportOption, setCurrentView, userProfile, bookingsData = [] }) => {
    const [input, setInput] = useState('');
    const [connected, setConnected] = useState(false);
    const [load, setLoad] = useState(false);
    const stompClientRef = React.useRef(null);
    const fileInputRef = React.useRef(null);

    const bookingId = currentChat?.id || currentChat?.bookingId || sessionStorage?.getItem("bookingId");
    const currentUserId = userProfile?.id || sessionStorage?.getItem('artID');

    useEffect(() => {
        if (bookingId) {
            getChats();
            connectWebSocket();
        }
        
        return () => {
             if (stompClientRef.current) {
                 stompClientRef.current.deactivate();
             }
        };
    }, [bookingId]);

    const connectWebSocket = () => {
        setLoad(true);
        if (!bookingId) {
            console.error("Booking ID missing for WebSocket connection");
            setLoad(false);
            return;
        }

        let wsUrl = API_CONFIG.WEBSOCKET_URL.replace(/^http/, 'ws');
        if (!wsUrl.endsWith('/websocket')) {
            wsUrl = wsUrl.endsWith('/') ? `${wsUrl}websocket` : `${wsUrl}/websocket`;
        }
        const stompClient = new Client({
            brokerURL: wsUrl,
            debug: (msg) => console.log("🔵 STOMP Debug:", msg),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("✅ Connected to WebSocket");
                setConnected(true);
                stompClient.subscribe(`/topic/chat/${bookingId}`, (message) => {
                    const chatMessage = JSON.parse(message.body);
                    console.log("📥 Received Message:", chatMessage);
                    setChatMessages((prev) => [...prev, chatMessage]);
                });
            },
            onDisconnect: () => {
                setLoad(false);
                console.log("❌ Disconnected from WebSocket");
                setConnected(false);
            },
            onStompError: (frame) => {
                console.error("Broker reported error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
                setLoad(false);
            },
            onWebSocketError: (event) => {
                console.error("WebSocket connection error:", event);
                setLoad(false);
            },
            onWebSocketClose: () => {
                console.log("WebSocket connection closed");
                setConnected(false);
                setLoad(false);
            }
        });

        stompClient.activate();
        stompClientRef.current = stompClient;
    };

    const getChats = async () => {
        if (!bookingId) return;
        try {
            const result = await chatService.getChats(bookingId);
            if (result) {
                setLoad(false);
                // The snippet showed Object.entries filter/map, adjusting to match
                const chatArray = Array.isArray(result) ? result :
                    Object.entries(result)
                        .filter(([key]) => key !== "status")
                        .map(([_, value]) => value);

                console.log("Fetched messages:", chatArray);
                setChatMessages(chatArray);
            }
        } catch (err) {
            console.error("Error fetching chats:", err);
            setLoad(false);
        }
    };

    const handleSendMessage = async (content, type = 'TEXT') => {
        if (!content.trim() && type === 'TEXT') return;

        const chatMessage = {
            bookingId: bookingId,
            messageType: type,
            content: content,
            userToken: localStorage.getItem('artifinda_token') || sessionStorage.getItem('token')
        };

        console.log("📤 Sending Message:", chatMessage);

        const optimisticMsg = {
            id: Date.now(),
            bookingId: bookingId,
            messageType: type,
            type: type === 'TEXT' ? 'text' : 'image',
            content: content,
            senderId: currentUserId,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, optimisticMsg]);

        if (stompClientRef.current && connected) {
            stompClientRef.current.publish({
                destination: "/app/send",
                body: JSON.stringify(chatMessage),
            });
        }
    };

    const handleMediaUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const toastId = toast.loading("Uploading media...");
        try {
            const formData = new FormData();
            formData.append("file", file);
            
            const response = await chatService.uploadFile(formData);
            const fileUrl = typeof response === 'string' ? response : (response.url || response.data?.url || response.data || response.message || response.fileUrl);

            await handleSendMessage(fileUrl, 'MEDIA');
            toast.success("Media sent", { id: toastId });
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload media", { id: toastId });
        }
    };



    const renderList = () => {
        // Build dynamic list of conversations based on bookings
        const chatList = bookingsData.filter(b => b.artisan).map(b => {
            const artisanName = b.artisan?.appUser ? `${b.artisan.appUser.firstName || ''} ${b.artisan.appUser.lastName || ''}`.trim() : (b.artisanName || 'Artisan');
            const avatar = b.artisan?.appUser?.profilePicture || b.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artisanName)}&background=1E4E82&color=fff&size=150`;
            return {
                id: b.id,
                bookingId: b.id,
                artisan: artisanName,
                avatar: avatar,
                location: b.customerAddress?.address?.address || b.location,
                phoneNumber: b.artisan?.appUser?.phoneNumber || b.artisan?.phoneNumber || '',
                lastMessage: b.bookingNote ? (b.bookingNote.includes('\n\n') ? b.bookingNote.split('\n\n')[0] : b.bookingNote) : 'View chat',
                time: new Date(b.bookingDate || b.createdAt || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric' }),
                unread: 0,
                hasInvoice: false
            };
        });

        const filteredMessages = chatList.filter(m =>
            m.artisan.toLowerCase().includes(searchMessages.toLowerCase()) ||
            m.lastMessage.toLowerCase().includes(searchMessages.toLowerCase())
        );

        return (
            <div className="flex-1 lg:ml-[240px] bg-white min-h-screen pt-16 lg:pt-10 p-5 lg:p-8">
                <div className="hidden lg:flex items-center gap-3 mb-6">
                    <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Messages</h1>
                </div>
                <div className="relative mb-6 max-w-4xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input type="text" placeholder="Search" value={searchMessages} onChange={(e) => setSearchMessages(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-100 bg-white focus:outline-none focus:border-[#1E4E82]/30 text-gray-700 font-bold text-sm shadow-sm" />
                </div>
                <div className="space-y-1">
                    {filteredMessages.map((msg) => (
                        <div key={msg.id} onClick={() => {
                            setCurrentChat(msg);
                            setChatMessages([]);
                            setMessagesViewStep('chat');
                        }} className="flex items-center gap-3 p-3.5 hover:bg-slate-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 rounded-xl">
                            <div className="w-11 h-11 rounded-full bg-slate-200 overflow-hidden shrink-0 shadow-inner"><img src={msg.avatar} alt="" className="w-full h-full object-cover" /></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <h4 className="font-bold text-[#0f172a] truncate text-sm">{msg.artisan}</h4>
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{msg.time}</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        {msg.hasInvoice && <span className="flex items-center gap-1 px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-[7px] font-black text-gray-500 uppercase shrink-0"><CreditCard size={8} /> invoice</span>}
                                        <p className="text-xs text-gray-400 truncate font-bold">{msg.lastMessage}</p>
                                    </div>
                                    {msg.unread > 0 && <span className="w-4 h-4 bg-[#1E4E82] text-white text-[8px] font-black rounded-full flex items-center justify-center shrink-0">{msg.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredMessages.length === 0 && <div className="text-center py-10 text-gray-300 font-black uppercase tracking-widest text-[8px]">No conversations found</div>}
                </div>
            </div>
        );
    };

    const renderReport = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col lg:pt-0 pt-16">
            <div className="hidden lg:flex sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 items-center gap-4 border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('chat')} className="p-2 -ml-2 text-[#0f172a] cursor-pointer"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Report</h1>
            </div>
            <div className="p-6 space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Why are you reporting this artisan?</p>
                {['Fake Profile', 'Harassment', 'Poor Quality Service', 'Overpricing', 'No-show', 'Other'].map((option) => (
                    <button key={option} onClick={() => setSelectedReportOption(option)} className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${selectedReportOption === option ? 'border-[#1E4E82] bg-blue-50/30' : 'border-gray-50 bg-white'}`}>
                        <span className={`font-bold ${selectedReportOption === option ? 'text-[#1E4E82]' : 'text-[#0f172a]'}`}>{option}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedReportOption === option ? 'border-[#1E4E82]' : 'border-gray-200'}`}>{selectedReportOption === option && <div className="w-3 h-3 rounded-full bg-[#1E4E82]" />}</div>
                    </button>
                ))}
            </div>
            <div className="mt-auto p-6 pb-12">
                <button disabled={!selectedReportOption} onClick={() => { if (selectedReportOption === 'Other') setMessagesViewStep('report_other'); else setMessagesViewStep('feedback'); }} className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 cursor-pointer ${selectedReportOption ? 'bg-[#1E4E82] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>Submit</button>
            </div>
        </div>
    );

    const renderReportOther = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col lg:pt-0 pt-16">
            <div className="hidden lg:flex sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 items-center gap-4 border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('report')} className="p-2 -ml-2 text-[#0f172a] cursor-pointer"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Report</h1>
            </div>
            <div className="p-8">
                <h2 className="text-xl font-bold text-[#0f172a] mb-2">Help us understand...</h2>
                <p className="text-sm font-medium text-gray-400 mb-8">Please provide more details about the issue you encountered.</p>
                <textarea className="w-full h-48 bg-slate-50 rounded-[32px] p-6 focus:outline-none border-2 border-transparent focus:border-[#1E4E82]/20 font-medium text-[#0f172a] resize-none" placeholder="Type here..."></textarea>
            </div>
            <div className="mt-auto p-6 pb-12"><button onClick={() => setMessagesViewStep('feedback')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer">Submit</button></div>
        </div>
    );

    const renderFeedback = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center pt-24 lg:pt-0">
            <div className="w-64 h-64 mb-8 bg-[#fcf0ff] rounded-full flex items-center justify-center relative">
                <CheckCircle2 size={80} className="text-[#1E4E82]" />
                <motion.div initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-blue-100/30 rounded-full" />
            </div>
            <h1 className="text-3xl font-black text-[#0f172a] mb-4">Thanks for the feedback!</h1>
            <p className="text-gray-400 font-bold mb-12 max-w-xs leading-relaxed uppercase tracking-tight text-sm">We've received your report and will investigate it promptly.</p>
            <button onClick={() => { setCurrentView('home'); setMessagesViewStep('list'); }} className="w-full max-w-sm py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer">Find New Artisan</button>
        </div>
    );

    const renderChat = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-16 lg:pt-0 overflow-x-hidden relative">
            <div className="hidden lg:flex sticky top-0 left-0 right-0 bg-white z-40 px-6 h-20 lg:h-16 items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <button onClick={() => setMessagesViewStep('list')} className="p-2 -ml-2 text-[#0f172a] cursor-pointer"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm cursor-pointer"><img src={currentChat?.avatar} alt="" className="w-full h-full object-cover" /></div>
                    <div className="min-w-0 cursor-pointer">
                        <h4 className="font-bold text-[#0f172a] -mb-1 truncate text-base">
                            {typeof currentChat?.artisan === 'object'
                                ? (currentChat.artisan.appUser ? `${currentChat.artisan.appUser.firstName} ${currentChat.artisan.appUser.lastName}` : 'Artisan')
                                : (currentChat?.artisan || 'Chat')}
                        </h4>
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-widest truncate"><MapPin size={8} /> {currentChat?.location}</div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    {currentChat?.hasInvoice && <button onClick={() => setMessagesViewStep('invoice_detail')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors animate-pulse"><CreditCard size={20} strokeWidth={2.5} /></button>}
                    <button onClick={() => {
                        const phone = currentChat?.phoneNumber || currentChat?.artisan?.phoneNumber || '';
                        if (phone) {
                            navigator.clipboard.writeText(phone);
                            toast.success('Phone number copied');
                        } else {
                            toast.error('Phone number not available');
                        }
                    }} className="p-2 text-[#1E4E82] hover:bg-blue-50 rounded-full transition-colors cursor-pointer"><Phone size={20} strokeWidth={2.5} /></button>
                    <div className="relative">
                        <button onClick={() => setShowMenuModal(!showMenuModal)} className="p-2 text-[#1E4E82] hover:bg-blue-50 rounded-full transition-colors cursor-pointer"><MoreVertical size={20} strokeWidth={2.5} /></button>
                        {showMenuModal && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 overflow-hidden">
                                <button onClick={() => { setShowMenuModal(false); setMessagesViewStep('report'); }} className="w-full px-6 py-3.5 flex items-center gap-3 text-sm font-bold text-[#0f172a] hover:bg-blue-50 transition-colors uppercase tracking-tight"><Flag size={18} className="text-blue-900 fill-blue-900" /> Report</button>
                                <button onClick={() => { setShowMenuModal(false); setMessagesViewStep('block'); }} className="w-full px-6 py-3.5 flex items-center gap-3 text-sm font-bold text-[#b91c1c] hover:bg-red-50 transition-colors uppercase tracking-tight"><Ban size={18} /> Block</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex-1 p-6 space-y-8 overflow-y-auto pb-32 scroll-smooth">
                {load && (
                    <div className="flex flex-col items-center justify-center py-10 opacity-50">
                        <div className="w-8 h-8 border-2 border-[#1E4E82] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1E4E82]">Loading messages...</p>
                    </div>
                )}
                <div className="flex justify-center"><span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">Today</span></div>
                {chatMessages.map((msg, idx) => {
                    const isMe = msg.sender === 'user' || msg.senderId === currentUserId || msg.userToken === sessionStorage.getItem("token");
                    const displayTime = msg.time || (msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
                    const isText = msg.type === 'text' || msg.messageType === 'TEXT';
                    const isMedia = msg.type === 'image' || msg.messageType === 'MEDIA';

                    return (
                        <div key={idx} className={`flex flex-col ${isMe ? 'items-end ml-auto' : 'items-start'} gap-1 max-w-[85%]`}>
                            {isText && <div className={`${isMe ? 'bg-[#1E4E82] text-white rounded-tr-none' : 'bg-[#F1F5F9] text-[#0f172a] rounded-tl-none'} p-4 font-medium text-base rounded-[24px] leading-relaxed shadow-sm break-words max-w-full text-left`}>{msg.content}</div>}
                            {isMedia && <div onClick={() => setZoomedImage(msg.content)} className="rounded-[24px] overflow-hidden border-4 border-white shadow-xl cursor-pointer hover:scale-[1.02] transition-transform max-w-[240px]"><img src={msg.content} alt="Sent attachment" className="w-full h-full object-cover max-h-64" /></div>}
                            {msg.type === 'invoice' && (
                                <div className="bg-[#F1F5F9] p-4 rounded-[24px] rounded-tl-none w-full sm:w-80 border border-gray-50">
                                    <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-3"><div className="p-2.5 bg-slate-50 rounded-xl text-slate-400"><CreditCard size={20} /></div><span className="font-extrabold text-[#0f172a]">{msg.content}</span></div>
                                        <button onClick={() => setMessagesViewStep('invoice_detail')} className="px-3.5 py-2 bg-blue-50 text-[#1E4E82] text-[10px] font-black uppercase tracking-tighter rounded-xl transition-colors hover:bg-blue-100 cursor-pointer">View Details</button>
                                    </div>
                                </div>
                            )}
                            {msg.type === 'rejected' && <div className="bg-red-50 border-2 border-red-100 p-4 rounded-[24px] rounded-tl-none flex items-center gap-3 text-red-600 font-bold text-sm"><AlertCircle size={20} /> Invoice Rejected</div>}
                            <div className="flex items-center gap-1.5 px-1 mt-1"><span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{displayTime}</span>{isMe && <CheckCircle2 size={12} className="text-blue-400" />}</div>
                        </div>
                    );
                })}
            </div>
            <div className="fixed bottom-0 lg:sticky lg:bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-4 pb-10 lg:pb-6 z-40">
                <div className="max-w-4xl mx-auto flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <button onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-full transition-colors active:scale-90 cursor-pointer"><Camera size={26} /></button>
                        <input type="file" hidden ref={fileInputRef} accept="image/*,video/*" onChange={handleMediaUpload} />
                        <div className="flex-1 relative border border-gray-100 bg-white rounded-full flex items-center pr-2">
                            <input type="text" placeholder="Type a message..." className="w-full pl-6 pr-4 py-3.5 bg-transparent focus:outline-none focus:ring-0 font-medium text-sm"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && input.trim()) {
                                        handleSendMessage(input);
                                        setInput('');
                                    }
                                }} />
                            <button className="p-2 rounded-full transition-all cursor-pointer text-[#1E4E82] hover:bg-blue-50" onClick={() => { if (input.trim()) { handleSendMessage(input); setInput(''); } }}><Send size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomedImage(null)} className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-6 lg:p-20 cursor-pointer">
                        <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full cursor-pointer"><X size={32} /></button>
                        <img src={zoomedImage} alt="Zoomed" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>
            {messagesViewStep === 'block' && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[32px] p-10 max-w-sm w-full text-center shadow-2xl">
                        <h2 className="text-2xl font-black text-[#0f172a] mb-3">Block this Artisan?</h2>
                        <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10 uppercase tracking-tight">They won't be able to contact you or see your bookings anymore.</p>
                        <div className="space-y-4">
                            <button onClick={() => setMessagesViewStep('list')} className="w-full py-4.5 bg-[#b91c1c] text-white rounded-2xl font-bold transition-transform active:scale-95 shadow-xl cursor-pointer">Block</button>
                            <button onClick={() => setMessagesViewStep('chat')} className="w-full py-4.5 bg-gray-100 text-gray-600 rounded-2xl font-bold transition-transform active:scale-95 cursor-pointer">Cancel</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );

    const renderInvoiceDetail = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-16 lg:pt-0">
            <div className="hidden lg:flex sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 items-center gap-4 border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('chat')} className="p-2 -ml-2 text-[#0f172a] cursor-pointer"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Invoice - IN00254</h1>
            </div>
            <div className="p-6 space-y-8 overflow-y-auto pb-32">
                <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking ID</span><h4 className="text-xl font-black text-[#0f172a]">#001345</h4></div>
                        <span className="bg-[#1E4E82] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">AC Repair</span>
                    </div>
                    <div className="space-y-4 text-sm font-bold text-slate-500">
                        <div className="flex items-center gap-2">📅 24th June, 2025</div>
                        <div className="flex items-center gap-2">🕐 12:00pm</div>
                        <div className="flex items-center gap-2">📍 14 Selsun Street, Maitama, Abuja</div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-2">Payment Summary</h3>
                    {/* <div className="space-y-4 px-2">
                        <div className="flex justify-between font-bold text-gray-500"><span>Service Charge</span><span className="text-[#0f172a]">₦900</span></div>
                        <div className="flex justify-between font-bold text-gray-500"><span>Artisan Fee</span><span className="text-[#0f172a]">₦8,000</span></div>
                        <div className="flex justify-between font-bold text-gray-500"><span>Discount (5%)</span><span className="text-emerald-500">- ₦445</span></div>
                        <div className="flex justify-between text-3xl font-black text-[#0f172a] pt-6 border-t border-slate-100"><span>Total</span><span>₦8,455</span></div>
                    </div> */}
                </div>
            </div>
            <div className="fixed lg:sticky bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 space-y-4">
                <button onClick={() => setMessagesViewStep('payment')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer">Make Payment</button>
                <button onClick={() => { setChatMessages(prev => [...prev.filter(m => m.type !== 'invoice'), { id: Date.now(), type: 'rejected', sender: 'artisan', time: '2:30pm' }]); setMessagesViewStep('chat'); }} className="w-full py-5 text-[#1E4E82] font-black text-base active:scale-95 transition-all uppercase tracking-widest cursor-pointer">Reject Invoice</button>
            </div>
        </div>
    );

    const renderPaymentMethod = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-16 lg:pt-0">
            <div className="hidden lg:flex sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 items-center gap-4 border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('invoice_detail')} className="p-2 -ml-2 text-[#0f172a] cursor-pointer"><ChevronLeft size={32} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Payment</h1>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Select payment method</p>
                <div className="space-y-3">
                    {['Pay with Card', 'Bank Transfer', 'Apple Pay', 'Google Pay'].map((method) => (
                        <button key={method} onClick={() => { if (method === 'Pay with Card') setMessagesViewStep('select_card'); else if (method === 'Bank Transfer') setMessagesViewStep('bank_transfer'); else setMessagesViewStep('success'); }} className="w-full p-6 border-2 border-gray-50 rounded-[24px] flex items-center justify-between hover:border-[#1E4E82]/20 hover:bg-slate-50 transition-all font-bold text-[#0f172a] cursor-pointer">
                            <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full border-2 border-slate-200" /><span>{method}</span></div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-auto p-6 pb-12"><button onClick={() => setMessagesViewStep('success')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer">Proceed</button></div>
        </div>
    );

    const renderSelectCard = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-16 lg:pt-0">
            <div className="hidden lg:flex sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-4"><button onClick={() => setMessagesViewStep('payment')} className="p-2 -ml-2 text-[#0f172a] cursor-pointer"><ChevronLeft size={32} strokeWidth={2.5} /></button><h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Select Card</h1></div>
                <div className="flex gap-4"><Plus size={24} className="text-gray-400" /></div>
            </div>
            <div className="p-8 space-y-6">
                <div className="bg-gradient-to-br from-[#1E4E82] to-[#0f172a] p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
                    <div className="flex justify-between items-start mb-12"><div className="w-12 h-10 bg-white/20 rounded-md backdrop-blur-sm" /><span className="font-extrabold italic text-xl">VISA</span></div>
                    <div className="text-2xl font-black tracking-[0.2em] mb-8">**** **** **** 5678</div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60"><span>Ayo Falokun</span><span>08 / 26</span></div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                </div>
            </div>
            <div className="mt-auto p-6 pb-12"><button onClick={() => setMessagesViewStep('success')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer">Proceed</button></div>
        </div>
    );

    const renderBankTransfer = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col pt-16 lg:pt-0">
            <div className="hidden lg:flex sticky top-0 left-0 right-0 bg-white z-40 px-6 h-24 lg:h-20 items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-4"><button onClick={() => setMessagesViewStep('payment')} className="p-2 -ml-2 text-[#0f172a] cursor-pointer"><ChevronLeft size={32} strokeWidth={2.5} /></button><h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Bank Transfer</h1></div>
                <Plus size={24} className="text-gray-400" />
            </div>
            <div className="p-8 space-y-10">
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b-2 border-slate-50 pb-4"><div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Account Number</span><h3 className="text-3xl font-black text-[#0f172a]">0123456789</h3></div><button className="p-3 bg-slate-50 rounded-xl text-blue-900 cursor-pointer"><Copy size={20} /></button></div>
                    <div className="flex justify-between items-end border-b-2 border-slate-50 pb-4"><div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Bank Name</span><h3 className="text-2xl font-bold text-[#0f172a]">Access Bank</h3></div></div>
                    <div className="flex justify-between items-end border-b-2 border-slate-50 pb-4"><div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Account Name</span><h3 className="text-2xl font-bold text-[#0f172a]">Artifinda Limited</h3></div></div>
                </div>
                {/* <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex justify-between items-center text-xl font-black"><span className="text-slate-400 text-sm uppercase tracking-widest">Total Fee</span><span className="text-[#1E4E82]">₦8,455</span></div> */}
            </div>
            <div className="mt-auto p-6 pb-12"><button onClick={() => setMessagesViewStep('success')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer">Proceed</button></div>
        </div>
    );

    const renderSuccess = () => (
        <div className="flex-1 lg:ml-[280px] bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center pt-24 lg:pt-0">
            <div className="w-64 h-64 mb-10 bg-emerald-50 rounded-full flex items-center justify-center relative">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 z-10"><CheckCircle2 size={48} /></div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute inset-0 bg-emerald-100/40 rounded-full" />
            </div>
            <h1 className="text-4xl font-black text-[#0f172a] mb-4">Payment Successful!</h1>
            {/* <p className="text-gray-400 font-bold mb-12 max-w-xs leading-relaxed uppercase tracking-tight text-sm">Your payment of ₦8,455 has been processed successfully.</p> */}
            <div className="w-full max-w-sm space-y-4">
                <button onClick={() => setMessagesViewStep('receipt')} className="w-full py-5 bg-[#1E4E82] text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer">View Receipt</button>
                <button onClick={() => { setCurrentView('home'); setMessagesViewStep('list'); }} className="w-full py-5 text-[#1E4E82] font-black text-base active:scale-95 transition-all uppercase tracking-widest cursor-pointer">Go to Dashboard</button>
            </div>
        </div>
    );

    const renderReceipt = () => (
        <div className="flex-1 lg:ml-[240px] bg-white lg:bg-[#F8FAFC] min-h-screen flex flex-col pt-16 lg:pt-10">
            <div className="hidden lg:flex fixed lg:sticky top-0 left-0 right-0 bg-white z-40 px-6 h-16 items-center justify-between border-b border-gray-50">
                <button onClick={() => setMessagesViewStep('chat')} className="p-2 -ml-2 text-[#0f172a] cursor-pointer"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                <h1 className="text-xl font-black text-[#0f172a] tracking-tight">Receipt</h1>
                <button className="p-2 bg-slate-50 rounded-xl text-blue-900 cursor-pointer"><Share2 size={18} /></button>
            </div>
            <div className="p-4 lg:p-10 flex-1">
                <div className="bg-white border border-slate-100 rounded-[24px] p-6 lg:p-8 shadow-xl space-y-6 max-w-2xl mx-auto">
                    {/* <div className="text-center pb-6 border-b border-slate-50"><h2 className="text-3xl font-black text-[#0f172a] mb-1">₦8,455</h2><span className="px-3 py-1 bg-emerald-50 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest">Successful</span></div> */}
                    <div className="space-y-4">{[{ label: 'Date & Time', value: '24th June, 2025 | 2:30pm' }, { label: 'Transaction ID', value: 'ART-092-124-912' }, { label: 'Paid To', value: 'Chinedu Eze' }, { label: 'Service', value: 'AC Repair' }].map((item, idx) => <div key={idx} className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{item.label}</span><span className="font-bold text-[#0f172a] text-xs">{item.value}</span></div>)}</div>
                    {/* <div className="pt-6 border-t border-slate-50 space-y-3">
                        <div className="flex justify-between font-bold text-slate-400 text-xs"><span>Service Charge</span><span className="text-[#0f172a]">₦900</span></div>
                        <div className="flex justify-between font-bold text-slate-400 text-xs"><span>Artisan Fee</span><span className="text-[#0f172a]">₦8,000</span></div>
                        <div className="flex justify-between font-bold text-slate-400 text-xs"><span>Discount</span><span className="text-emerald-500">- ₦445</span></div>
                    </div> */}
                </div>
            </div>
            <div className="mt-auto p-5 pb-10 max-w-2xl mx-auto w-full"><button className="w-full py-4 bg-[#1E4E82] text-white rounded-xl font-black text-base shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"><Download size={20} /> Download Receipt</button></div>
        </div>
    );

    if (messagesViewStep === 'list') return renderList();
    if (messagesViewStep === 'chat' || messagesViewStep === 'block') return renderChat();
    if (messagesViewStep === 'report') return renderReport();
    if (messagesViewStep === 'report_other') return renderReportOther();
    if (messagesViewStep === 'feedback') return renderFeedback();
    if (messagesViewStep === 'invoice_detail') return renderInvoiceDetail();
    if (messagesViewStep === 'payment') return renderPaymentMethod();
    if (messagesViewStep === 'select_card') return renderSelectCard();
    if (messagesViewStep === 'bank_transfer') return renderBankTransfer();
    if (messagesViewStep === 'success') return renderSuccess();
    if (messagesViewStep === 'receipt') return renderReceipt();
    return null;
};

export default MessagesView;
