import React from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ChevronDown, User, MapPin, Lock, Shield, ShieldCheck, RefreshCw, Info, HelpCircle, Phone, LogOut, EyeOff, Camera, PlusCircle, Home, Image, Mail, MessageCircle, Instagram, Twitter, Facebook } from 'lucide-react';
import { FAQ_DATA } from '../../constants/userData';
import LogoutModal from './LogoutModal';
import Location from '../form/Location';
import authService from '../../services/authService';
import userService from '../../services/userService';
import fileService from '../../services/fileService';
import kycService from '../../services/kycService';

const SettingsView = ({ settingsStep, setSettingsStep, settingsSubStep, setSettingsSubStep, showLogoutModal, setShowLogoutModal, userProfile, setUserProfile, faqCategory, setFaqCategory, visibleFaq, setVisibleFaq, toggleFaq, setCurrentView, refreshProfile }) => {
    const { control, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            addressContact: null
        }
    });

    const handleLogout = () => { authService.clearToken(); window.location.href = '/'; };

    const [profilePic, setProfilePic] = React.useState(userProfile?.profilePicture || null);

    React.useEffect(() => {
        if (userProfile?.profilePicture) {
            setProfilePic(userProfile.profilePicture);
        }
    }, [userProfile?.profilePicture]);

    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUpdateMessage('Uploading profile picture...');
        setIsUpdating(true);
        try {
            const response = await fileService.upload(file);
            console.log('[SettingsView] Profile Pic Response:', response);

            let imageUrl = '';
            // Robust parsing block
            if (typeof response === 'string') {
                imageUrl = response;
            } else if (Array.isArray(response)) {
                imageUrl = typeof response[0] === 'string' ? response[0] : (response[0]?.url || response[0]?.secure_url);
            } else if (response && typeof response === 'object') {
                if (response.url) imageUrl = response.url;
                else if (response.secure_url) imageUrl = response.secure_url;
                else if (response.data) {
                    if (typeof response.data === 'string') imageUrl = response.data;
                    else if (Array.isArray(response.data)) {
                        imageUrl = typeof response.data[0] === 'string' ? response.data[0] : (response.data[0]?.url || response.data[0]?.secure_url);
                    } else {
                        imageUrl = response.data.url || response.data.secure_url;
                    }
                }
            }

            if (imageUrl) {
                setProfilePic(imageUrl);
                setUserProfile(prev => ({ ...prev, profilePicture: imageUrl }));
                setUpdateMessage('Profile picture uploaded!');
                setTimeout(() => setUpdateMessage(''), 3000);
            } else {
                setUpdateMessage('Failed to parse uploaded image. Please try again.');
            }
        } catch (err) {
            setUpdateMessage('Failed to upload profile picture.');
        } finally {
            setIsUpdating(false);
        }
    };

    const [newAddress, setNewAddress] = React.useState({
        address: '',
        latitude: 0,
        longitude: 0,
        addressVerificationFile: ''
    });
    const [isAddingAddress, setIsAddingAddress] = React.useState(false);
    const [addressFilePreview, setAddressFilePreview] = React.useState(null);
    const [isUploadingFile, setIsUploadingFile] = React.useState(false);

    const [isUpdating, setIsUpdating] = React.useState(false);
    const [updateMessage, setUpdateMessage] = React.useState('');

    const handleLocationSelect = (loc) => {
        console.log("[Settings] Location Selected:", loc);
        setNewAddress(prev => ({
            ...prev,
            address: loc.address,
            latitude: loc.latitude,
            longitude: loc.longitude
        }));
    };

    const handleFileUpload = async (file) => {
        if (!file) return;
        setIsUploadingFile(true);
        setUpdateMessage('Uploading verification document...');

        // Local preview
        const blobUrl = URL.createObjectURL(file);
        setAddressFilePreview(blobUrl);

        try {
            const response = await fileService.upload(file);
            console.log('[SettingsView] Address Doc Response:', response);

            let imageUrl = '';
            // Robust parsing block
            if (typeof response === 'string') {
                imageUrl = response;
            } else if (Array.isArray(response)) {
                imageUrl = typeof response[0] === 'string' ? response[0] : (response[0]?.url || response[0]?.secure_url);
            } else if (response && typeof response === 'object') {
                if (response.url) imageUrl = response.url;
                else if (response.secure_url) imageUrl = response.secure_url;
                else if (response.data) {
                    if (typeof response.data === 'string') imageUrl = response.data;
                    else if (Array.isArray(response.data)) {
                        imageUrl = typeof response.data[0] === 'string' ? response.data[0] : (response.data[0]?.url || response.data[0]?.secure_url);
                    } else {
                        imageUrl = response.data.url || response.data.secure_url;
                    }
                }
            }

            if (imageUrl) {
                setNewAddress(prev => ({ ...prev, addressVerificationFile: imageUrl }));
                setUpdateMessage('Document uploaded!');
            }
        } catch (err) {
            console.error("Upload failed:", err);
            setUpdateMessage('Failed to upload document.');
            setAddressFilePreview(null);
        } finally {
            setIsUploadingFile(false);
        }
    };

    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        setUpdateMessage('');
        try {
            // Prepare payload based on the endpoint structure provided by the user
            // Note: The UI separates account-specific fields (gender, dob) but the endpoint expects them in 'accounts'
            // For now, we'll try to update the main fields.
            const payload = {
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                phoneNumber: userProfile.phone,
                gender: userProfile.gender,
                dateOfBirth: userProfile.dob,
                email: userProfile.email
            };
            const updatedData = await userService.updateProfile(payload);
            if (refreshProfile) await refreshProfile();

            // Map the returned data back to local state
            const account = updatedData.accounts?.find(acc => acc.accountType === 'CUSTOMER') || updatedData.accounts?.[0];
            setUserProfile({
                ...userProfile,
                firstName: updatedData.firstName || userProfile.firstName,
                lastName: updatedData.lastName || userProfile.lastName,
                phone: updatedData.phoneNumber || userProfile.phone,
                status: updatedData.status || userProfile.status,
                identityVerificationStatus: updatedData.identityVerificationStatus || userProfile.identityVerificationStatus,
            });

            setUpdateMessage('Profile updated successfully!');
            setTimeout(() => setUpdateMessage(''), 3000);
        } catch (err) {
            console.error("Failed to update profile:", err);
            setUpdateMessage('Failed to update profile. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleAddAddress = async () => {
        if (!newAddress.address) {
            setUpdateMessage('Please provide an address.');
            return;
        }
        if (!newAddress.addressVerificationFile) {
            setUpdateMessage('Please upload a verification document.');
            return;
        }
        setIsAddingAddress(true);
        setUpdateMessage('');
        try {
            console.log("[Settings] Submitting Address Request:", newAddress);
            await userService.addAddress(newAddress);
            setUpdateMessage('Address request sent successfully!');
            if (refreshProfile) await refreshProfile();
            setSettingsSubStep('list');
            setNewAddress({ address: '', latitude: 0, longitude: 0, addressVerificationFile: '' });
            setAddressFilePreview(null);
            setTimeout(() => setUpdateMessage(''), 3000);
        } catch (err) {
            console.error("Failed to add address:", err);
            const backendMsg = err.response?.data?.message || 'Failed to add address. Please try again.';
            setUpdateMessage(backendMsg);
        } finally {
            setIsAddingAddress(false);
        }
    };

    const renderMain = () => (
        <div className="px-4 pt-4 lg:pt-4">
            <h2 className="text-2xl font-black text-[#0f172a] hidden lg:block">Settings</h2>
            <div className="space-y-0">
                {[
                    { section: 'Profile', items: [{ id: 'profile', icon: User, label: 'Profile' }, { id: 'kyc', icon: ShieldCheck, label: 'KYC Verification' }, { id: 'artisan_switch', icon: RefreshCw, label: 'Switch to Artisan Account' }, { id: 'addresses', icon: MapPin, label: 'My Addresses' }] },
                    { section: 'Help & Support', items: [{ id: 'about', icon: Info, label: 'About' }, { id: 'contact', icon: Phone, label: 'Contact Us' }, { id: 'faq', icon: HelpCircle, label: 'FAQs' }] },
                    { section: 'Security', items: [{ id: 'password', icon: Lock, label: 'Change Password' }, { id: 'pin', icon: Shield, label: 'Change Login PIN' }] },
                ].map(group => (
                    <div key={group.section}>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.18em] pt-6 pb-3">{group.section}</p>
                        {group.items.map((item) => (
                            <button key={item.id} onClick={() => setSettingsStep(item.id)}
                                className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-slate-50 transition-colors -mx-1 px-1 rounded-lg active:scale-[0.99] cursor-pointer">
                                <div className="flex items-center gap-3"><item.icon size={18} className="text-[#1E4E82] shrink-0" /><span className="font-bold text-[#0f172a] text-sm">{item.label}</span></div>
                                <ChevronRight size={18} className="text-gray-300 shrink-0 ml-auto" />
                            </button>
                        ))}
                    </div>
                ))}
                <div className="pt-8">
                    <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-3 py-4 text-red-500 font-bold text-sm active:scale-[0.99] transition-transform cursor-pointer">
                        <LogOut size={18} /><span>Logout</span>
                    </button>
                </div>
            </div>
            <LogoutModal showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} onLogout={handleLogout} />
        </div>
    );

    const renderProfile = () => (
        <div className="lg:pt-4 pb-10 flex flex-col items-center">
            <div className="flex justify-center mb-10">
                <label className="relative cursor-pointer group">
                    <div className="w-28 h-28 rounded-full bg-slate-200 shadow-lg border-4 border-white overflow-hidden flex items-center justify-center">
                        <img
                            src={profilePic || userProfile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent((userProfile?.firstName || 'A') + ' ' + (userProfile?.lastName || ''))}&background=1E4E82&color=fff&size=150`}
                            onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((userProfile?.firstName || 'A') + ' ' + (userProfile?.lastName || ''))}&background=1E4E82&color=fff&size=150`; }}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#1E4E82] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"><Camera size={14} className="text-white" /></div>
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
                </label>
            </div>
            <div className="w-full max-w-4xl space-y-5 pb-8">
                {updateMessage && (
                    <div className={`text-center py-2 text-xs font-bold ${(updateMessage.toLowerCase().includes('success') || updateMessage.toLowerCase().includes('uploaded')) ? 'text-green-500' : 'text-red-500'}`}>
                        {updateMessage}
                    </div>
                )}
                {[
                    { label: 'Phone Number', type: 'tel', key: 'phone' }, { label: 'First Name', type: 'text', key: 'firstName' }, { label: 'Last Name', type: 'text', key: 'lastName' },
                    { label: 'Gender', type: 'text', key: 'gender' }, { label: 'Date of Birth', type: 'text', key: 'dob' }, { label: 'Email', type: 'email', key: 'email' }, { label: 'Address', type: 'text', key: 'address' },
                ].map((field, idx) => (
                    <div key={idx}>
                        <label className="text-xs font-bold text-gray-500 mb-2 block">{field.label}</label>
                        <input type={field.type} value={field.key === 'address' ? (userProfile.addresses[0]?.address || '') : (userProfile[field.key] || '')}
                            placeholder={field.label} onChange={(e) => {
                                if (field.key === 'address') { const na = [...userProfile.addresses]; if (na[0]) na[0].address = e.target.value; setUserProfile({ ...userProfile, addresses: na }); }
                                else setUserProfile({ ...userProfile, [field.key]: e.target.value });
                            }} className="w-full px-5 py-3 rounded-[10px] border border-[#15191E] bg-[#F8FAFC] font-bold text-[#0f172a] outline-none transition-colors" />
                    </div>
                ))}
                {updateMessage && (
                    <div className={`text-center py-2 text-xs font-bold ${(updateMessage.toLowerCase().includes('success') || updateMessage.toLowerCase().includes('uploaded')) ? 'text-green-500' : 'text-red-500'}`}>
                        {updateMessage}
                    </div>
                )}
                <button onClick={handleUpdateProfile} disabled={isUpdating} className="w-full py-4 bg-[#1E4E82] text-white font-black rounded-[10px] shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer">
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
            <div className="w-full max-w-md mt-6">
                <button onClick={() => setShowLogoutModal(true)} className="w-full py-3 bg-[#DC2626] text-white font-black rounded-[10px] shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer">
                    <LogOut size={20} strokeWidth={2.5} /> Logout
                </button>
            </div>
        </div>
    );

    const renderSuccess = (title, message) => (
        <div className="p-6 h-[calc(100vh-80px)] lg:h-screen flex flex-col items-center justify-center text-center max-w-md mx-auto bg-white">
            <div className="w-full aspect-square bg-slate-50 rounded-[40px] mb-10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white opacity-50" />
                <div className="relative z-10 scale-125"><img src="https://cdni.iconscout.com/illustration/premium/thumb/man-changing-password-illustration-download-in-svg-png-gif-formats--security-account-pack-cyber-security-illustrations-5205565.png" alt="Success" className="w-64 h-64 object-contain" /></div>
            </div>
            <h2 className="text-2xl font-black text-[#0f172a] mb-2">{title}</h2>
            <p className="text-gray-500 font-bold mb-12 px-4 text-sm leading-relaxed">{message}</p>
            <button onClick={() => setSettingsStep('main')} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl transition-transform active:scale-95 cursor-pointer">Continue</button>
        </div>
    );

    const renderPasswordFlow = () => {
        if (settingsStep === 'password_success') return renderSuccess("You're all Set!", "Your password has been changed successfully");
        if (settingsStep === 'password_otp') return (
            <div className="px-5 lg:px-8 lg:pt-6 pb-10 max-w-2xl">
                <p className="text-gray-500 font-bold text-sm mb-12">We've sent a 4-digit verification code to your phone number. Please enter it below to continue.</p>
                <div className="flex justify-center gap-4 mb-8">{[1, 2, 3, 4].map(i => <div key={i} className="w-14 h-14 rounded-2xl bg-slate-100 border border-gray-100" />)}</div>
                <div className="text-center mb-12"><p className="text-xs font-bold text-gray-400">Didn't get code? <span className="text-[#1E4E82]">Resend 2:59</span></p></div>
                <button onClick={() => setSettingsStep('password_reset')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] cursor-pointer">Verify</button>
            </div>
        );
        if (settingsStep === 'password_reset') return (
            <div className="px-5 lg:px-8 lg:pt-6 pb-10 max-w-2xl">
                <p className="text-gray-500 font-bold text-sm mb-12">Enter your new password below. Make sure it's strong and secure</p>
                <div className="space-y-6">
                    <div><label className="text-xs font-bold text-gray-500 mb-2 block">Old Password</label><div className="relative"><input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none font-bold pr-12" /><EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div></div>
                    <div><label className="text-xs font-bold text-gray-500 mb-2 block">New Password</label><div className="relative"><input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none font-bold pr-12" /><EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div></div>
                </div>
                <button onClick={() => setSettingsStep('password_success')} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl mb-6 cursor-pointer">Reset</button>
            </div>
        );
        return (
            <div className="px-5 lg:px-8 lg:pt-6 pb-10 max-w-2xl flex flex-col">
                <div className="space-y-6 flex-1">
                    <div><label className="text-xs font-bold text-gray-500 mb-2 block">Email</label><input type="email" defaultValue="artifinda@gmail.com" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none font-bold" /></div>
                    <div><label className="text-xs font-bold text-gray-500 mb-2 block">Old Password</label><div className="relative"><input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none font-bold pr-12" /><EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div></div>
                </div>
                <button onClick={() => setSettingsStep('password_otp')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] mb-6 cursor-pointer">Generate OTP</button>
            </div>
        );
    };

    const renderPinFlow = () => {
        if (settingsStep === 'pin_success') return renderSuccess("You're all Set!", "Your login pin has been changed successfully");
        if (settingsStep === 'pin_new') return (
            <div className="px-5 lg:px-8 lg:pt-6 pb-10 max-w-2xl">
                <p className="text-gray-500 font-bold text-sm mb-12">Enter new pin below</p>
                <div className="flex justify-center gap-2 mb-12">{[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-11 lg:w-14 h-14 rounded-2xl bg-slate-100 border border-gray-100" />)}</div>
                <button onClick={() => setSettingsStep('pin_success')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] cursor-pointer">Continue</button>
            </div>
        );
        return (
            <div className="px-5 lg:px-8 lg:pt-6 pb-10 max-w-2xl">
                <p className="text-gray-500 font-bold text-sm mb-12">Enter current pin below</p>
                <div className="flex justify-center gap-2 mb-12">{[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-11 lg:w-14 h-14 rounded-2xl bg-slate-100 border border-gray-100" />)}</div>
                <button onClick={() => setSettingsStep('pin_new')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] cursor-pointer">Continue</button>
            </div>
        );
    };

    const renderAddresses = () => {
        if (settingsSubStep === 'add') return (
            <div className="lg:pt-4 pb-10 max-w-2xl text-left">
                <div className="mb-8 hidden lg:block">
                    <p className="text-gray-500 font-bold text-sm">Please provide your address and a document for verification.</p>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1 uppercase tracking-widest">Search Address</label>
                        <Location
                            control={control}
                            watch={watch}
                            errors={errors}
                            setValue={setValue}
                            setLocationInfo={(loc) => {
                                if (loc?.clearAddress) {
                                    setNewAddress(prev => ({
                                        ...prev,
                                        address: loc.clearAddress,
                                        latitude: loc.latitude || 0,
                                        longitude: loc.longitude || 0
                                    }));
                                }
                            }}
                        />
                    </div>

                    {newAddress.address && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="text-xs font-bold text-gray-500 mb-2 block ml-1 uppercase tracking-widest">Selected Address</label>
                            <div className="w-full p-4.5 rounded-[20px] bg-[#1E4E82]/5 border border-[#1E4E82]/10 font-bold text-[#1E4E82] text-sm flex items-start gap-3">
                                <MapPin size={18} className="shrink-0 mt-0.5" />
                                <span>{newAddress.address}</span>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block ml-1 uppercase tracking-widest">Upload Verification Document</label>
                        <p className="text-[10px] text-slate-400 font-bold mb-3 ml-1 uppercase tracking-tight">Utility bills, rent receipts, or government documents</p>

                        <div className="relative group">
                            <div
                                className={`w-full border-2 border-dashed rounded-[28px] p-8 flex flex-col items-center justify-center text-center transition-all min-h-[160px] 
                                    ${addressFilePreview ? 'border-[#1E4E82] bg-blue-50/30' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'}
                                    ${isUploadingFile ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {addressFilePreview ? (
                                    <div className="relative w-full h-full flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm mb-3">
                                            <img src={addressFilePreview} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-xs font-bold text-[#1E4E82]">Document Attached</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setAddressFilePreview(null); setNewAddress(prev => ({ ...prev, addressVerificationFile: '' })); }}
                                            className="mt-2 text-[10px] font-black uppercase text-red-500 hover:text-red-600"
                                        >
                                            Change File
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1E4E82] mb-3 group-hover:scale-110 transition-transform">
                                            <Image size={24} />
                                        </div>
                                        <p className="text-xs font-bold text-slate-500">Tap to browse files</p>
                                    </>
                                )}

                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => handleFileUpload(e.target.files[0])}
                                    disabled={isUploadingFile}
                                />
                            </div>

                            {isUploadingFile && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/20 rounded-[28px] backdrop-blur-[1px]">
                                    <div className="w-6 h-6 border-2 border-[#1E4E82] border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {updateMessage && (
                    <div className={`text-center py-2 text-xs font-bold ${updateMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                        {updateMessage}
                    </div>
                )}
                <button
                    onClick={handleAddAddress}
                    disabled={isAddingAddress}
                    className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl mt-8 transition-all active:scale-95 disabled:opacity-50"
                >
                    {isAddingAddress ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        );
        return (
            <div className="lg:pt-4 pb-10 max-w-2xl text-left">
                <div className="space-y-4">
                    {userProfile.addresses.map((addr) => (
                        <div key={addr.id} className="p-6 bg-[#EEF4FB] border border-[#D1E1F4] rounded-[16px] shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#24639C] shrink-0"><Home size={20} /></div><h4 className="font-black text-[#24639C] text-sm">{addr.type === 'Home' ? 'Default Address' : addr.type}</h4></div>
                                {addr.status === 'verified' && <span className="text-[10px] font-black text-[#0F9E7B] bg-[#E3F9F1] px-3 py-1.5 rounded-lg uppercase tracking-wider">Verified</span>}
                            </div>
                            <div className="pl-13">
                                <p className="text-gray-500 font-bold text-xs mt-1 mb-4 leading-relaxed">{addr.address}</p>
                                <div className="flex items-center gap-2 text-[#0F9E7B] font-black text-[10px]"><MapPin size={14} /><span>Location verified</span></div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => setSettingsSubStep('add')} className="w-full h-24 mt-4 bg-white border border-[#D1E1F4] rounded-[16px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:bg-slate-50 shadow-sm">
                        <PlusCircle size={24} className="text-[#24639C]" /><span className="font-bold text-[#24639C] text-sm">Add New Address</span>
                    </button>
                </div>
            </div>
        );
    };

    const renderKyc = () => {
        // Specifically using kycApprovalStatus as the primary KYC indicator
        const kycStatus = userProfile?.kycApprovalStatus || 'NOT_STARTED';
        const getStatusColor = () => {
            switch(kycStatus.toUpperCase()) {
                case 'VERIFIED': 
                case 'APPROVED': return 'text-green-500 bg-green-50 border-green-100';
                case 'PENDING': return 'text-amber-500 bg-amber-50 border-amber-100';
                case 'REJECTED': return 'text-red-500 bg-red-50 border-red-100';
                default: return 'text-slate-400 bg-slate-50 border-slate-100';
            }
        };

        const firstNameRaw = userProfile?.firstName || '';
        const lastNameRaw = userProfile?.lastName || '';
        
        // Only show names that are not emails
        const displayFirstName = (firstNameRaw && !firstNameRaw.includes('@')) ? firstNameRaw : '';
        const displayLastName = (lastNameRaw && !lastNameRaw.includes('@')) ? lastNameRaw : '';
        const hasValidName = displayFirstName || displayLastName;

        return (
            <div className="lg:pt-4 pb-12 text-left max-w-2xl">
                {/* Status Card */}
                <div className={`p-6 rounded-[24px] border-2 mb-8 transition-all ${getStatusColor()}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Name</p>
                            <h3 className="text-lg font-black text-[#0f172a] transition-all">
                                {hasValidName ? `${displayFirstName} ${displayLastName}`.trim() : 'User'}
                            </h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">KYC Status</p>
                            <span className="text-xs font-black uppercase tracking-widest">{kycStatus}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderFaq = () => {
        const filteredFaqs = FAQ_DATA.filter(item => item.category === faqCategory);
        return (
            <div className="lg:pt-4 pb-12 text-left">
                <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                    {['General', 'Account & Profile', 'Bookings', 'Payments'].map(cat => (
                        <button key={cat} onClick={() => { setFaqCategory(cat); setVisibleFaq(null); }} className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 ${faqCategory === cat ? 'border-[#1E4E82] text-[#1E4E82]' : 'border-transparent text-gray-400'}`}>{cat}</button>
                    ))}
                </div>
                <div className="space-y-4">
                    {filteredFaqs.map(item => (
                        <div key={item.id} className="bg-white border border-slate-200 rounded-[16px] overflow-hidden shadow-sm">
                            <button onClick={() => toggleFaq(item.id)} className="w-full flex items-center justify-between p-6 text-left">
                                <span className={`font-bold text-sm ${visibleFaq === item.id ? 'text-[#1E4E82]' : 'text-[#0f172a]'}`}>{item.q}</span>
                                <div className={`transition-transform duration-300 ${visibleFaq === item.id ? 'rotate-180 text-[#1E4E82]' : 'text-gray-300'}`}><ChevronDown size={20} /></div>
                            </button>
                            <AnimatePresence>
                                {visibleFaq === item.id && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-50/50">
                                        <div className="px-6 pb-6 pt-2"><div className="w-full h-[1px] bg-slate-200 mb-4 opacity-50" /><p className="text-sm text-gray-500 font-bold leading-relaxed">{item.a}</p></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
                <div className="mt-12 p-8 bg-[#1e293b] rounded-[32px] text-center text-white shadow-xl">
                    <h4 className="text-xl font-black mb-2">Still need help?</h4>
                    <p className="text-gray-400 font-bold text-xs mb-8">Our support team is here for you 24/7</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {[{ icon: Mail, label: 'Email' }, { icon: Phone, label: 'Phone' }, { icon: MessageCircle, label: 'WhatsApp' }, { icon: Instagram, label: 'Instagram' }, { icon: Twitter, label: 'Twitter' }].map((s, i) => (
                            <button key={i} onClick={() => setSettingsStep('contact')} className="flex items-center gap-2 hover:text-blue-400 transition-colors text-xs font-bold"><s.icon size={16} /> {s.label}</button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderContact = () => (
        <div className="lg:pt-4 pb-10">
            <div className="space-y-4">
                {[
                    { icon: Mail, label: 'Email', value: 'support@artifinda.com', color: 'bg-blue-50 text-blue-500' },
                    { icon: Phone, label: 'Phone', value: '+234 812 345 6789', color: 'bg-green-50 text-green-500' },
                    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', color: 'bg-emerald-50 text-emerald-500' },
                    { icon: Twitter, label: 'Twitter', value: '@artifinda', color: 'bg-sky-50 text-sky-500' },
                    { icon: Facebook, label: 'Facebook', value: 'Artifinda Africa', color: 'bg-indigo-50 text-indigo-500' },
                    { icon: Instagram, label: 'Instagram', value: '@artifinda_global', color: 'bg-pink-50 text-pink-500' },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[28px] shadow-sm">
                        <div className="flex items-center gap-4"><div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}><item.icon size={24} /></div><div><h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</h4><p className="font-black text-[#0f172a] text-sm">{item.value}</p></div></div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className="lg:pt-4 pb-10">
            <div className="flex flex-col items-center mb-12">
                <div className="w-24 h-24 bg-[#1E4E82] rounded-[32px] flex items-center justify-center text-white text-3xl font-black mb-4 shadow-xl rotate-12">A</div>
                <h3 className="text-xl font-black text-[#0f172a]">Version 2.0.4</h3>
            </div>
            <div className="space-y-6 text-center px-4">
                <p className="text-gray-500 font-bold leading-relaxed">Artifinda is Africa's leading platform for connecting homeowners with verified, high-quality artisans.</p>
                <p className="text-gray-500 font-bold leading-relaxed">Our mission is to simplify the process of finding and hiring skilled workers while ensuring safety, quality, and transparency for both parties.</p>
                <div className="pt-12 border-t border-gray-100 flex justify-center gap-8">
                    <span className="text-xs font-black text-[#1E4E82] uppercase tracking-widest cursor-pointer">Terms</span>
                    <span className="text-xs font-black text-[#1E4E82] uppercase tracking-widest cursor-pointer">Privacy</span>
                    <span className="text-xs font-black text-[#1E4E82] uppercase tracking-widest cursor-pointer">Policy</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 lg:ml-[240px] bg-[#F8FAFC] min-h-screen transition-all duration-300">
            <div className="max-w-6xl mx-auto w-full px-5 lg:px-4 flex flex-col pt-20 lg:pt-6 bg-[#F8FAFC] min-h-screen overflow-y-auto no-scrollbar">
                {settingsStep !== 'main' && (
                    <div className="hidden lg:flex items-center gap-3 mb-4">
                        <button onClick={() => {
                            if (settingsStep === 'addresses' && settingsSubStep === 'add') setSettingsSubStep('list');
                            else setSettingsStep('main');
                        }} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform">
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                        <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
                            {settingsStep === 'profile' ? 'Profile' : settingsStep === 'addresses' ? 'My Addresses' :
                                (settingsStep === 'password' || settingsStep === 'password_otp' || settingsStep === 'password_reset') ? 'Change Password' :
                                    (settingsStep === 'pin' || settingsStep === 'pin_new') ? 'Change Login PIN' :
                                        settingsStep === 'faq' ? 'FAQs' : settingsStep === 'contact' ? 'Contact Us' : settingsStep === 'about' ? 'About Artifinda' : 'Settings'}
                        </h1>
                    </div>
                )}
                {settingsStep === 'main' && renderMain()}
                {settingsStep === 'profile' && renderProfile()}
                {(settingsStep === 'password' || settingsStep === 'password_otp' || settingsStep === 'password_reset' || settingsStep === 'password_success') && renderPasswordFlow()}
                {(settingsStep === 'pin' || settingsStep === 'pin_new' || settingsStep === 'pin_success') && renderPinFlow()}
                {settingsStep === 'addresses' && renderAddresses()}
                {settingsStep === 'kyc' && renderKyc()}
                {settingsStep === 'faq' && renderFaq()}
                {settingsStep === 'contact' && renderContact()}
                {settingsStep === 'about' && renderAbout()}
                {settingsStep === 'success' && renderSuccess("You're all set!", "Your changes have been saved successfully.")}
            </div>
        </div>
    );
};

export default SettingsView;
