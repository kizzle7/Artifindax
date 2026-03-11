const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/ArtisanDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Icons
content = content.replace(
    'Mic, Send, Camera, Flag, Ban, Copy, Share2, Download, Image, CreditCard',
    'Mic, Send, Camera, Flag, Ban, Copy, Share2, Download, Image, CreditCard, User, ShieldCheck, RefreshCw, Info, HelpCircle, Lock, Shield, LogOut, EyeOff, Twitter, Facebook, Instagram'
);

// 2. Add Mock Data
const mockData = `
const USER_PROFILE = {
    firstName: 'Chinedu',
    lastName: 'Eze',
    phone: '08012345678',
    gender: 'Male',
    dob: '12/05/1990',
    email: 'chinedu.eze@artifinda.com',
    addresses: [
        { id: 1, type: 'Home', address: '17 Ajao Rd, Ikeja, Lagos, Nigeria', isDefault: true, status: 'verified' }
    ]
};

const FAQ_DATA = [
    { id: 1, category: 'General', q: "What is Artifinda?", a: "Artifinda is a platform that connects you with skilled artisans for your home and office needs." },
    { id: 2, category: 'General', q: "Is Artifinda available in my city?", a: "We are currently operating in major cities across Nigeria and expanding rapidly." },
    { id: 3, category: 'Account & Profile', q: "How do I create an account?", a: "Simply click the sign-up button on the landing page and follow the prompts." },
    { id: 4, category: 'Account & Profile', q: "How do I verify my account?", a: "Go to settings, then addresses to upload your verification documents." },
    { id: 5, category: 'Account & Profile', q: "Can I change my profile information?", a: "Yes, you can update your details in the Profile section of your settings." },
    { id: 6, category: 'Account & Profile', q: "How do I change my password?", a: "Navigate to Settings > Change Password to update your login credentials." },
    { id: 7, category: 'Account & Profile', q: "What if I forgot my password?", a: "Use the 'Forgot Password' link on the login page to reset it via email." },
    { id: 9, category: 'Bookings', q: "How do I manage my bookings?", a: "Check the Bookings tab to see scheduled, ongoing, and completed jobs." },
    { id: 10, category: 'Bookings', q: "Can I cancel a booking?", a: "Yes, you can do this from the Order Details view before you start the job." },
    { id: 11, category: 'Bookings', q: "How do I receive payments?", a: "Payments are settled into your Artisan wallet after the job is confirmed complete." },
    { id: 14, category: 'Bookings', q: "Can I communicate with the customer?", a: "Yes, use the built-in chat feature to talk with your assigned customer." },
    { id: 15, category: 'Bookings', q: "What happens if the customer doesn't show up?", a: "Contact support immediately for resolution." },
    { id: 16, category: 'Payments', q: "Is payment safe?", a: "Yes, we use industry-standard encryption to protect your financial data." },
];
`;
content = content.replace('const ARTISAN_BOOKINGS = [', mockData + '\nconst ARTISAN_BOOKINGS = [');

// 3. Add State
const stateVariables = `
    const [selectedReportOption, setSelectedReportOption] = useState(null);

    // Settings State
    const [settingsStep, setSettingsStep] = useState('main'); // 'main', 'profile', 'addresses', 'password', 'pin', 'faq', 'contact', 'about', 'password_success', 'pin_success'
    const [settingsSubStep, setSettingsSubStep] = useState('list'); // 'list', 'add'
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [userProfile, setUserProfile] = useState(USER_PROFILE);
    const [faqCategory, setFaqCategory] = useState('General');
    const [visibleFaq, setVisibleFaq] = useState(null);

    const toggleFaq = (id) => setVisibleFaq(visibleFaq === id ? null : id);
`;
content = content.replace('const [selectedReportOption, setSelectedReportOption] = useState(null);', stateVariables);

// 4. Update handleBack
const oldHandleBack = `        else if (currentView === 'messages') {
            if (messagesViewStep === 'chat' || messagesViewStep === 'block') setMessagesViewStep('list');
            else if (messagesViewStep === 'report') setMessagesViewStep('chat');
            else if (messagesViewStep === 'report_other') setMessagesViewStep('report');
            else if (messagesViewStep === 'feedback') {
                setCurrentView('dashboard');
                setMessagesViewStep('list');
            }
            else if (messagesViewStep === 'invoice_detail' || messagesViewStep === 'receipt') setMessagesViewStep('chat');
            else {
                setCurrentView('dashboard');
                setMessagesViewStep('list');
            }
        }`;

const newHandleBack = `        else if (currentView === 'settings') {
            if (settingsStep === 'main') setCurrentView('dashboard');
            else if (settingsStep === 'addresses' && settingsSubStep === 'add') setSettingsSubStep('list');
            else setSettingsStep('main');
        }
        else if (currentView === 'messages') {
            if (messagesViewStep === 'chat' || messagesViewStep === 'block') setMessagesViewStep('list');
            else if (messagesViewStep === 'report') setMessagesViewStep('chat');
            else if (messagesViewStep === 'report_other') setMessagesViewStep('report');
            else if (messagesViewStep === 'feedback') {
                setCurrentView('dashboard');
                setMessagesViewStep('list');
            }
            else if (messagesViewStep === 'invoice_detail' || messagesViewStep === 'receipt') setMessagesViewStep('chat');
            else {
                setCurrentView('dashboard');
                setMessagesViewStep('list');
            }
        }`;
content = content.replace(oldHandleBack, newHandleBack);

// 5. Add ArtisanSettingsView component
const settingsViewComponent = \`

const LogoutModal = ({ showLogoutModal, setShowLogoutModal, onLogout }) => {
    if (!showLogoutModal) return null;
    return (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 lg:p-0">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[32px] p-6 lg:p-8 w-full max-w-[400px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-500" />
                <button onClick={() => setShowLogoutModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 text-gray-400 hover:text-gray-600 rounded-full transition-colors"><X size={20} /></button>
                <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 relative"><div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20" /><LogOut size={32} className="text-red-500 relative z-10 ml-1" /></div>
                    <h2 className="text-2xl font-black text-[#0f172a] mb-2 tracking-tight">Sign Out</h2>
                    <p className="text-gray-500 font-bold mb-8 text-sm leading-relaxed px-4">Are you sure you want to sign out? You will need to enter your credentials to access your account again.</p>
                    <div className="flex gap-3 w-full">
                        <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-4 bg-slate-100 text-gray-500 font-black rounded-[20px] transition-colors active:scale-95">Cancel</button>
                        <button onClick={onLogout} className="flex-1 py-4 bg-red-500 text-white font-black rounded-[20px] shadow-lg shadow-red-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"><LogOut size={18} /><span>Yes, Sign Out</span></button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ArtisanSettingsView = ({ settingsStep, setSettingsStep, settingsSubStep, setSettingsSubStep, showLogoutModal, setShowLogoutModal, userProfile, setUserProfile, faqCategory, setFaqCategory, visibleFaq, toggleFaq }) => {
    const handleLogout = () => {
        // Mock logout
        window.location.href = '/login';
    };

    const renderMain = () => (
        <div className="pt-24 lg:pt-4 pb-10 max-w-2xl">
            <h2 className="text-2xl font-black text-[#0f172a] mb-8 mt-4 lg:mt-0 px-4 lg:px-0 hidden lg:block">Settings</h2>
            
            {/* User Profile Summary */}
            <div className="flex items-center justify-between p-4 lg:p-6 bg-white border border-gray-100 rounded-[28px] shadow-sm mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
                        <User size={32} className="text-gray-400" />
                    </div>
                    <div>
                        <h3 className="font-black text-[#0f172a] text-lg">{userProfile.firstName} {userProfile.lastName}</h3>
                        <p className="text-gray-400 text-xs font-bold">{userProfile.email}</p>
                    </div>
                </div>
                <button onClick={() => setSettingsStep('profile')} className="hidden lg:block border-2 border-gray-200 text-gray-500 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors active:scale-95">Edit</button>
                <button onClick={() => setSettingsStep('profile')} className="lg:hidden p-2 bg-slate-50 text-gray-400 rounded-full active:scale-95 transition-transform"><ChevronRight size={20} /></button>
            </div>

            <div className="bg-white border border-gray-100 rounded-[28px] shadow-sm p-2 lg:p-4 divide-y divide-gray-100">
                {[
                    { section: 'Account', items: [
                        { id: 'profile', label: 'Personal Information', icon: User },
                        { id: 'addresses', label: 'Add/Manage Addresses', icon: MapPin },
                    ]},
                    { section: 'Security', items: [
                        { id: 'password', label: 'Change Password', icon: Lock },
                        { id: 'pin', label: 'Change Login PIN', icon: ShieldCheck },
                    ]},
                    { section: 'Support', items: [
                        { id: 'faq', label: 'FAQs', icon: HelpCircle },
                        { id: 'contact', label: 'Contact Us', icon: Phone },
                        { id: 'about', label: 'About Artifinda', icon: Info },
                    ]}
                ].map(group => (
                    <div key={group.section}>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.18em] pt-6 pb-3 ml-2 lg:ml-0">{group.section}</p>
                        {group.items.map((item, i) => (
                            <button key={item.id} onClick={() => setSettingsStep(item.id)}
                                className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-slate-50 transition-colors px-3 lg:px-4 rounded-xl active:scale-[0.99]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#1E4E82]/5 flex items-center justify-center text-[#1E4E82]">
                                        <item.icon size={18} />
                                    </div>
                                    <span className="font-bold text-[#0f172a] text-sm">{item.label}</span>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 shrink-0 ml-auto" />
                            </button>
                        ))}
                    </div>
                ))}
                
                <div className="pt-8 pb-4">
                    <button onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center justify-between py-4 hover:bg-red-50 transition-colors px-3 lg:px-4 rounded-xl active:scale-[0.99] text-red-500">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                <LogOut size={18} />
                            </div>
                            <span className="font-bold text-sm">Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            <LogoutModal showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} onLogout={handleLogout} />
        </div>
    );

    const [profilePic, setProfilePic] = React.useState(null);
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) setProfilePic(URL.createObjectURL(file));
    };

    const renderProfile = () => (
        <div className="pt-24 lg:pt-4 pb-10 flex flex-col items-center">
            <div className="w-full max-w-4xl text-left mt-4 lg:mt-0 mb-10 px-5 lg:px-0">
                <h2 className="text-2xl font-black text-[#0f172a] mb-2">Profile</h2>
                <p className="text-gray-500 font-bold text-sm">Update your personal information</p>
            </div>
            {/* Avatar upload */}
            <div className="flex justify-center mb-10">
                <label className="relative cursor-pointer group">
                    <div className="w-28 h-28 rounded-full bg-slate-200 shadow-lg border-4 border-white overflow-hidden flex items-center justify-center">
                        {profilePic
                            ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                            : <Camera size={32} className="text-gray-400" />
                        }
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#1E4E82] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Camera size={14} className="text-white" />
                    </div>
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
                </label>
            </div>
            {/* Fields */}
            <div className="w-full max-w-4xl space-y-5 pb-8 px-5 lg:px-0">
                {[
                    { label: 'Phone Number', type: 'tel', key: 'phone' },
                    { label: 'First Name', type: 'text', key: 'firstName' },
                    { label: 'Last Name', type: 'text', key: 'lastName' },
                    { label: 'Gender', type: 'text', key: 'gender' },
                    { label: 'Date of Birth', type: 'text', key: 'dob' },
                    { label: 'Email', type: 'email', key: 'email' },
                    { label: 'Address', type: 'text', key: 'address' },
                ].map((field, idx) => (
                    <div key={idx}>
                        <label className="text-xs font-bold text-gray-500 mb-2 block">{field.label}</label>
                        <input
                            type={field.type}
                            value={field.key === 'address' ? (userProfile.addresses[0]?.address || '') : (userProfile[field.key] || '')}
                            placeholder={field.label}
                            onChange={(e) => {
                                if (field.key === 'address') {
                                    const newAddresses = [...userProfile.addresses];
                                    if (newAddresses[0]) newAddresses[0].address = e.target.value;
                                    setUserProfile({ ...userProfile, addresses: newAddresses });
                                } else {
                                    setUserProfile({ ...userProfile, [field.key]: e.target.value });
                                }
                            }}
                            className="w-full px-5 py-3 rounded-[20px] border border-gray-200 focus:border-[#1E4E82]/30 outline-none transition-colors font-bold"
                        />
                    </div>
                ))}
            </div>
            {/* Logout */}
            <div className="w-full max-w-md px-5 lg:px-0">
                <button onClick={() => setShowLogoutModal(true)} className="w-full py-5 bg-[#DC2626] text-white font-black rounded-[24px] shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
                    <LogOut size={20} strokeWidth={2.5} /> Logout
                </button>
            </div>
        </div>
    );

    const renderSuccess = (title, message, nextStep = 'main') => (
        <div className="p-6 pt-24 lg:pt-6 lg:h-auto flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-full aspect-square bg-slate-50 rounded-[40px] mb-10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white opacity-50" />
                <div className="relative z-10 scale-125">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-changing-password-illustration-download-in-svg-png-gif-formats--security-account-pack-cyber-security-illustrations-5205565.png" alt="Success" className="w-64 h-64 object-contain" />
                </div>
            </div>
            <h2 className="text-2xl font-black text-[#0f172a] mb-2">{title}</h2>
            <p className="text-gray-500 font-bold mb-12 px-4 text-sm leading-relaxed">{message}</p>
            <button onClick={() => setSettingsStep(nextStep)} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl transition-transform active:scale-95">Continue</button>
        </div>
    );

    const renderPasswordFlow = () => {
        if (settingsStep === 'password_success') return renderSuccess("You're all Set!", "Your password has been changed successfully");
        if (settingsStep === 'password_otp') return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl">
                <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0">Verify your phone number</h2>
                <p className="text-gray-500 font-bold text-sm mb-12">We've sent a 4-digit verification code to your phone number. Please enter it below to continue.</p>
                <div className="flex justify-center gap-4 mb-8">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-14 h-14 lg:w-16 lg:h-16 rounded-[20px] bg-white border-2 border-slate-100" />)}
                </div>
                <div className="text-center mb-12">
                    <p className="text-xs font-bold text-gray-400">Didn't get code? <span className="text-[#1E4E82] ml-1">Resend 2:59</span></p>
                </div>
                <button onClick={() => setSettingsStep('password_reset')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px]">Verify</button>
            </div>
        );
        if (settingsStep === 'password_reset') return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl">
                <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0">Reset your Password</h2>
                <p className="text-gray-500 font-bold text-sm mb-12">Enter your new password below. Make sure it's strong and secure</p>
                <div className="space-y-6 flex-1">
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1">New Password</label>
                        <div className="relative"><input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold pr-12" /><EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Confirm New Password</label>
                        <div className="relative"><input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold pr-12" /><EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div>
                    </div>
                </div>
                <button onClick={() => setSettingsStep('password_success')} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl mt-8 mb-6">Reset</button>
            </div>
        );
        return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl flex flex-col h-[calc(100vh-80px)] lg:h-auto">
                <h2 className="text-2xl font-black text-[#0f172a] mb-8 mt-4 lg:mt-0">Change Password</h2>
                <div className="space-y-6 flex-1">
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Email / Phone</label>
                        <input type="email" defaultValue={userProfile.email} className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Old Password</label>
                        <div className="relative">
                            <input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold pr-12" />
                            <EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>
                <button onClick={() => setSettingsStep('password_otp')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] mb-6 mt-8">Generate OTP</button>
            </div>
        );
    };

    const renderPinFlow = () => {
        if (settingsStep === 'pin_success') return renderSuccess("You're all Set!", "Your login pin has been changed successfully");
        if (settingsStep === 'pin_new') return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl">
                <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0">Set a new 6-Digit PIN</h2>
                <p className="text-gray-500 font-bold text-sm mb-12">Enter new pin below</p>
                <div className="flex justify-center gap-2 lg:gap-3 mb-12">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-12 h-14 lg:w-14 lg:h-16 rounded-2xl bg-white border-2 border-slate-100" />)}
                </div>
                <button onClick={() => setSettingsStep('pin_success')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px]">Continue</button>
            </div>
        );
        return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl h-[calc(100vh-80px)] lg:h-auto flex flex-col">
                <div className="flex-1">
                    <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0">Change Login PIN</h2>
                    <p className="text-gray-500 font-bold text-sm mb-12">Enter current pin below</p>
                    <div className="flex justify-center gap-2 lg:gap-3 mb-12">
                        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-12 h-14 lg:w-14 lg:h-16 rounded-2xl bg-white border-2 border-slate-100" />)}
                    </div>
                </div>
                <button onClick={() => setSettingsStep('pin_new')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px]">Continue</button>
            </div>
        );
    };

    const renderAddresses = () => {
        if (settingsSubStep === 'add') return (
            <div className="pt-24 lg:pt-4 pb-10 max-w-2xl text-left px-5 lg:px-0">
                <div className="mb-8 mt-4 lg:mt-0">
                    <h2 className="text-2xl font-black text-[#0f172a] mb-2">Help us locate you better</h2>
                    <p className="text-gray-500 font-bold text-sm">Please provide your address and a document for verification.</p>
                </div>
                <div className="space-y-6 flex-1">
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Location</label>
                        <div className="relative"><input type="text" placeholder="Garki Area 1, Abuja" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold pr-12" /><MapPin size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Current coordinates</label>
                        <div className="w-full p-4.5 rounded-[20px] bg-slate-50 border border-gray-100 font-bold text-gray-400 text-sm flex items-center gap-3"><MapPin size={18} /> 4.5678° N, 12.3456° E</div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Upload a Document (Verification)</label>
                        <div className="w-full border-2 border-dashed border-gray-300 rounded-[24px] p-8 flex flex-col items-center justify-center text-center bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-gray-400 mb-4"><Image size={32} /></div>
                            <p className="text-sm font-bold text-gray-400 max-w-[200px]">Add documents like utility bills, rent receipts etc.</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => { setSettingsStep('addresses'); setSettingsSubStep('list'); }} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl mt-8 transition-transform active:scale-95">Submit</button>
            </div>
        );
        return (
            <div className="pt-24 lg:pt-4 pb-10 max-w-2xl text-left px-5 lg:px-0">
                <div className="mb-6 mt-4 lg:mt-0 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-[#0f172a]">My Addresses</h2>
                </div>
                <div className="space-y-4 mb-20">
                    {userProfile.addresses.map((addr) => (
                        <div key={addr.id} className="p-6 bg-[#EEF4FB] border border-[#D1E1F4] rounded-[24px] shadow-sm relative transition-all overflow-hidden group">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#24639C] shrink-0 shadow-sm border border-slate-50"><Home size={20} /></div>
                                    <h4 className="font-black text-[#24639C] text-sm tracking-tight">{addr.type === 'Home' ? 'Default Address' : addr.type}</h4>
                                </div>
                                {addr.status === 'verified' && (
                                    <span className="text-[10px] font-black text-[#0F9E7B] bg-[#E3F9F1] px-3 py-1.5 rounded-xl uppercase tracking-wider">Verified</span>
                                )}
                            </div>
                            <div className="pl-13">
                                <p className="text-gray-500 font-bold text-xs mt-1 mb-4 leading-relaxed max-w-xs">{addr.address}</p>
                                <div className="flex items-center gap-2 text-[#0F9E7B] font-black text-[10px]">
                                    <MapPin size={14} className="fill-[#0F9E7B]/10" />
                                    <span>Location verified</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => setSettingsSubStep('add')} className="w-full h-24 mt-4 bg-white border border-gray-200 border-dashed rounded-[24px] flex items-center justify-center gap-2 group transition-all active:scale-[0.98] hover:bg-slate-50 hover:border-solid hover:border-[#1E4E82]/30">
                        <Plus size={20} className="text-[#24639C] stroke-[2.5]" />
                        <span className="font-bold text-[#24639C] text-sm">Add New Address</span>
                    </button>
                    {userProfile.addresses.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-[28px] border border-dashed border-gray-200 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                            No addresses saved yet
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderFaq = () => {
        const filteredFaqs = FAQ_DATA.filter(item => item.category === faqCategory);

        return (
            <div className="pt-24 lg:pt-4 pb-12 text-left">
                <div className="mb-8 mt-4 lg:mt-0 px-5 lg:px-0">
                    <h2 className="text-2xl font-black text-[#0f172a] mb-2">FAQs</h2>
                    <p className="text-gray-500 font-bold text-sm">Find answers to commonly asked questions.</p>
                </div>

                {/* FAQ Tabs */}
                <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar px-5 lg:px-0">
                    {['General', 'Account & Profile', 'Bookings', 'Payments'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setFaqCategory(cat); setVisibleFaq(null); }}
                            className={\`px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 \${faqCategory === cat ? 'border-[#1E4E82] text-[#1E4E82]' : 'border-transparent text-gray-400'}\`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="space-y-4 px-5 lg:px-0">
                    {filteredFaqs.map(item => (
                        <div key={item.id} className="bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-sm transition-all hover:border-[#1E4E82]/20">
                            <button
                                onClick={() => toggleFaq(item.id)}
                                className="w-full flex items-center justify-between p-6 text-left transition-colors"
                            >
                                <span className={\`font-bold text-sm \${visibleFaq === item.id ? 'text-[#1E4E82]' : 'text-[#0f172a]'}\`}>{item.q}</span>
                                <div className={\`transition-transform duration-300 shrink-0 ml-4 \${visibleFaq === item.id ? 'rotate-180 text-[#1E4E82]' : 'text-gray-300'}\`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>
                            <AnimatePresence>
                                {visibleFaq === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-slate-50/50"
                                    >
                                        <div className="px-6 pb-6 pt-2">
                                            <div className="w-full h-[1px] bg-slate-200 mb-4 opacity-50" />
                                            <p className="text-sm text-gray-500 font-bold leading-relaxed">{item.a}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-12 text-gray-400 font-bold text-sm bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            No questions in this category yet.
                        </div>
                    )}
                </div>

                <div className="mt-12 p-8 bg-[#1e293b] rounded-[32px] text-center text-white shadow-xl mx-5 lg:mx-0">
                    <h4 className="text-xl font-black mb-2">Still need help?</h4>
                    <p className="text-gray-400 font-bold text-xs mb-8">Our support team is here for you 24/7</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {[
                            { icon: Mail, label: 'Email' },
                            { icon: Phone, label: 'Phone' },
                            { icon: MessageCircle, label: 'WhatsApp' },
                            { icon: Instagram, label: 'Instagram' },
                            { icon: Twitter, label: 'Twitter' },
                        ].map((s, i) => (
                            <button key={i} onClick={() => setSettingsStep('contact')} className="flex items-center gap-2 hover:text-blue-400 transition-colors text-xs font-bold">
                                <s.icon size={16} /> {s.label === 'Twitter' ? '𝕏' : ''} {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderContact = () => (
        <div className="pt-24 lg:pt-4 pb-10 px-5 lg:px-0">
            <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0">Contact Us</h2>
            <p className="text-gray-500 font-bold text-sm mb-12">We'd love to hear from you. Reach out through any of these channels.</p>

            <div className="space-y-4">
                {[
                    { icon: Mail, label: 'Email', value: 'support@artifinda.com', color: 'bg-blue-50 text-blue-500' },
                    { icon: Phone, label: 'Phone', value: '+234 812 345 6789', color: 'bg-green-50 text-green-500' },
                    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', color: 'bg-emerald-50 text-emerald-500' },
                    { icon: Twitter, label: 'Twitter', value: '@artifinda', color: 'bg-sky-50 text-sky-500' },
                    { icon: Facebook, label: 'Facebook', value: 'Artifinda Africa', color: 'bg-indigo-50 text-indigo-500' },
                    { icon: Instagram, label: 'Instagram', value: '@artifinda_global', color: 'bg-pink-50 text-pink-500' },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[24px] shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={\`w-12 h-12 rounded-full \${item.color} flex items-center justify-center\`}>
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</h4>
                                <p className="font-black text-[#0f172a] text-sm">{item.value}</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className="pt-24 lg:pt-4 pb-10 px-5 lg:px-0">
            <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0 lg:hidden px-4">About Artifinda</h2>
            <div className="flex flex-col items-center mb-12 mt-8 lg:mt-0">
                <div className="w-24 h-24 bg-[#1E4E82] rounded-[32px] flex items-center justify-center mb-6 shadow-xl shadow-[#1E4E82]/20">
                    <img src={logo} alt="Artifinda" className="h-10 brightness-0 invert" />
                </div>
                <h3 className="text-xl font-black text-[#0f172a]">Version 2.0.4</h3>
            </div>
            <div className="space-y-6 text-center lg:px-8">
                <p className="text-gray-500 font-bold leading-relaxed">Artifinda is Africa's leading platform for connecting homeowners with verified, high-quality artisans.</p>
                <p className="text-gray-500 font-bold leading-relaxed">Our mission is to simplify the process of finding and hiring skilled workers while ensuring safety, quality, and transparency for both parties.</p>
                <div className="pt-12 border-t border-gray-100 flex justify-center gap-8">
                    <span className="text-[10px] font-black text-[#1E4E82] uppercase tracking-[0.2em] cursor-pointer hover:text-[#0f172a] transition-colors">Terms</span>
                    <span className="text-[10px] font-black text-[#1E4E82] uppercase tracking-[0.2em] cursor-pointer hover:text-[#0f172a] transition-colors">Privacy</span>
                    <span className="text-[10px] font-black text-[#1E4E82] uppercase tracking-[0.2em] cursor-pointer hover:text-[#0f172a] transition-colors">Policy</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            {/* Desktop header - only on sub-steps */}
            {settingsStep !== 'main' && (
                <div className="hidden lg:flex items-center gap-3 mb-4">
                    <button onClick={() => {
                        if (settingsStep === 'addresses' && settingsSubStep === 'add') setSettingsSubStep('list');
                        else setSettingsStep('main');
                    }} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
                        {settingsStep === 'profile' ? 'Profile' :
                            settingsStep === 'addresses' ? 'My Addresses' :
                                (settingsStep === 'password' || settingsStep === 'password_otp' || settingsStep === 'password_reset') ? 'Change Password' :
                                    (settingsStep === 'pin' || settingsStep === 'pin_new') ? 'Change Login PIN' :
                                        settingsStep === 'faq' ? 'FAQs' :
                                            settingsStep === 'contact' ? 'Contact Us' :
                                                settingsStep === 'about' ? 'About Artifinda' : 'Settings'}
                    </h1>
                </div>
            )}
            {settingsStep === 'main' && renderMain()}
            {settingsStep === 'profile' && renderProfile()}
            {(settingsStep === 'password' || settingsStep === 'password_otp' || settingsStep === 'password_reset' || settingsStep === 'password_success') && renderPasswordFlow()}
            {(settingsStep === 'pin' || settingsStep === 'pin_new' || settingsStep === 'pin_success') && renderPinFlow()}
            {settingsStep === 'addresses' && renderAddresses()}
            {settingsStep === 'faq' && renderFaq()}
            {settingsStep === 'contact' && renderContact()}
            {settingsStep === 'about' && renderAbout()}
            {settingsStep === 'success' && renderSuccess("You're all set!", "Your changes have been saved successfully.")}
        </div>
    );
};

\`;
content = content.replace('const ArtisanDashboard = () => {', settingsViewComponent + 'const ArtisanDashboard = () => {');

// 6. Update renderView
const oldRenderViewSettings = \`case 'settings': return <div className="p-10 text-center text-gray-500">Settings Content Coming Soon</div>;\`;
const newRenderViewSettings = \`case 'settings':
                return (
                    <ArtisanSettingsView
                        settingsStep={settingsStep}
                        setSettingsStep={setSettingsStep}
                        settingsSubStep={settingsSubStep}
                        setSettingsSubStep={setSettingsSubStep}
                        showLogoutModal={showLogoutModal}
                        setShowLogoutModal={setShowLogoutModal}
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                        faqCategory={faqCategory}
                        setFaqCategory={setFaqCategory}
                        visibleFaq={visibleFaq}
                        toggleFaq={toggleFaq}
                    />
                );\`;
content = content.replace(oldRenderViewSettings, newRenderViewSettings);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched ArtisanDashboard.jsx');
