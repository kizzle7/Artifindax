import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ChevronDown, User, MapPin, Lock, ShieldCheck, HelpCircle, Phone, Info, LogOut, EyeOff, Camera, Plus, Mail, MessageCircle, Twitter, Facebook, Instagram, Home, Image, CreditCard, CheckCircle2, FileText } from 'lucide-react';
import ArtisanSubscriptionsFlow from './ArtisanSubscriptionsFlow';
import { FAQ_DATA, USER_PROFILE } from '../../constants/artisanData';
import { useForm } from 'react-hook-form';
import Location from '../form/Location';
import LogoutModal from './LogoutModal';
import logo from '../../assets/Artifinda logo 3.png';
import userService from '../../services/userService';
import fileService from '../../services/fileService';

const ArtisanSettingsView = ({ settingsStep, setSettingsStep, settingsSubStep, setSettingsSubStep, subscriptionsStep, setSubscriptionsStep, showLogoutModal, setShowLogoutModal, userProfile, setUserProfile, faqCategory, setFaqCategory, visibleFaq, toggleFaq, handleLogout }) => {

    const { control, watch, setValue, register, formState: { errors } } = useForm({
        defaultValues: {
            addressContact: null
        }
    });

    const [locationInfo, setLocationInfo] = React.useState(null);
    const [verificationFile, setVerificationFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);
    const [isUploadingFile, setIsUploadingFile] = React.useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Immediate local preview
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);

        setIsUploadingFile(true);
        try {
            const response = await fileService.upload(file);
            console.log('[Settings] File Upload Response:', response);
            // Handle various possible response shapes (object with url, array, etc.)
            const imageUrl = response.data?.url || response.url || response.secure_url || (Array.isArray(response.data) ? response.data[0]?.url : null) || (Array.isArray(response) ? response[0]?.url : null);
            
            if (imageUrl) {
                setVerificationFile(imageUrl);
                setUpdateMessage('Verification document uploaded!');
            }
        } catch (err) {
            setUpdateMessage('Failed to upload document.');
        } finally {
            setIsUploadingFile(false);
        }
    };

    const [profilePic, setProfilePic] = React.useState(userProfile.profilePicture || null);
    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUpdateMessage('Uploading profile picture...');
        try {
            const response = await fileService.upload(file);
            const imageUrl = response.data?.url || response.url || response.secure_url;
            if (imageUrl) {
                setProfilePic(imageUrl);
                setUserProfile(prev => ({ ...prev, profilePicture: imageUrl }));
                setUpdateMessage('Profile picture uploaded!');
            }
        } catch (err) {
            setUpdateMessage('Failed to upload profile picture.');
        }
    };

    const [isUpdating, setIsUpdating] = React.useState(false);
    const [updateMessage, setUpdateMessage] = React.useState('');

    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        setUpdateMessage('');
        try {
            const payload = {
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                phoneNumber: userProfile.phone,
            };
            const updatedData = await userService.updateProfile(payload);

            const account = updatedData.accounts?.find(acc => acc.accountType === 'ARTISAN') || updatedData.accounts?.[0];
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
            console.error("Failed to update artisan profile:", err);
            setUpdateMessage('Failed to update profile. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const renderMain = () => (
        <div className="pt-24 lg:pt-4 pb-10">
            <h2 className="text-2xl font-black text-[#0f172a] mb-8 mt-4 lg:mt-0 px-4 lg:px-0 hidden lg:block">Settings</h2>
            <div className="flex items-center justify-between p-4 lg:p-6 bg-white border border-gray-100 rounded-[28px] shadow-sm mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
                        {(profilePic || userProfile.profilePicture) ? (
                            <img
                                src={profilePic || userProfile.profilePicture}
                                onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((userProfile.firstName || 'A') + ' ' + (userProfile.lastName || ''))}&background=1E4E82&color=fff&size=150`; }}
                                alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent((userProfile.firstName || 'A') + ' ' + (userProfile.lastName || ''))}&background=1E4E82&color=fff&size=150`}
                                alt="Profile" className="w-full h-full object-cover" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-black text-[#0f172a] text-lg">{userProfile.firstName} {userProfile.lastName}</h3>
                        <p className="text-gray-400 text-xs font-bold">{userProfile.email}</p>
                    </div>
                </div>
                <button onClick={() => setSettingsStep('profile')} className="hidden lg:block border-2 border-gray-200 text-gray-500 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors active:scale-95 cursor-pointer">Edit</button>
                <button onClick={() => setSettingsStep('profile')} className="lg:hidden p-2 bg-slate-50 text-gray-400 rounded-full active:scale-95 transition-transform cursor-pointer"><ChevronRight size={20} /></button>
            </div>
            <div className="bg-white border border-gray-100 rounded-[28px] shadow-sm p-2 lg:p-4 divide-y divide-gray-100">
                {[
                    { section: 'Account', items: [{ id: 'profile', label: 'Personal Information', icon: User }, { id: 'addresses', label: 'Add/Manage Addresses', icon: MapPin }, { id: 'subscriptions', label: 'My Subscriptions', icon: CreditCard }] },
                    { section: 'Security', items: [{ id: 'password', label: 'Change Password', icon: Lock }, { id: 'pin', label: 'Change Login PIN', icon: ShieldCheck }] },
                    { section: 'Support', items: [{ id: 'faq', label: 'FAQs', icon: HelpCircle }, { id: 'contact', label: 'Contact Us', icon: Phone }, { id: 'about', label: 'About Artifinda', icon: Info }] }
                ].map(group => (
                    <div key={group.section}>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.18em] pt-6 pb-3 ml-2 lg:ml-0">{group.section}</p>
                        {group.items.map((item) => (
                            <button key={item.id} onClick={() => setSettingsStep(item.id)}
                                className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-slate-50 transition-colors px-3 lg:px-4 rounded-xl active:scale-[0.99] cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#1E4E82]/5 flex items-center justify-center text-[#1E4E82]"><item.icon size={18} /></div>
                                    <span className="font-bold text-[#0f172a] text-sm">{item.label}</span>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 shrink-0 ml-auto" />
                            </button>
                        ))}
                    </div>
                ))}
                <div className="pt-8 pb-4">
                    <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center justify-between py-4 hover:bg-red-50 transition-colors px-3 lg:px-4 rounded-xl active:scale-[0.99] text-red-500 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center"><LogOut size={18} /></div>
                            <span className="font-bold text-sm">Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            <LogoutModal showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} onLogout={handleLogout} />
        </div>
    );

    const renderProfile = () => (
        <div className="pt-24 lg:pt-4 pb-10 flex flex-col items-center">
            <div className="w-full max-w-4xl text-left mt-4 lg:mt-0 mb-10 px-5 lg:px-0">
                <h2 className="text-2xl font-black text-[#0f172a] mb-2 hidden lg:block">Profile</h2>
                <p className="text-gray-500 font-bold text-sm">Update your personal information</p>
            </div>
            <div className="flex justify-center mb-10">
                <label className="relative cursor-pointer group">
                    <div className="w-28 h-28 rounded-full bg-slate-200 shadow-lg border-4 border-white overflow-hidden flex items-center justify-center">
                        {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : <Camera size={32} className="text-gray-400" />}
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#1E4E82] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Camera size={14} className="text-white" />
                    </div>
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
                </label>
            </div>
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
                        <input type={field.type} value={field.key === 'address' ? (userProfile.addresses[0]?.address || '') : (userProfile[field.key] || '')}
                            placeholder={field.label} onChange={(e) => {
                                if (field.key === 'address') {
                                    const newAddresses = [...userProfile.addresses];
                                    if (newAddresses[0]) newAddresses[0].address = e.target.value;
                                    setUserProfile({ ...userProfile, addresses: newAddresses });
                                } else { setUserProfile({ ...userProfile, [field.key]: e.target.value }); }
                            }} className="w-full px-5 py-3 rounded-[20px] border border-gray-200 focus:border-[#1E4E82]/30 outline-none transition-colors font-bold" />
                    </div>
                ))}
                {updateMessage && (
                    <div className={`text-center py-2 text-xs font-bold ${updateMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                        {updateMessage}
                    </div>
                )}
                <button onClick={handleUpdateProfile} disabled={isUpdating} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer">
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
            <div className="w-full max-w-md px-5 lg:px-0 mt-6">
                <button onClick={() => setShowLogoutModal(true)} className="w-full py-5 bg-[#DC2626] text-white font-black rounded-[24px] shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer">
                    <LogOut size={20} strokeWidth={2.5} /> Logout
                </button>
            </div>
        </div>
    );

    const renderSuccess = (title, message) => (
        <div className="p-6 pt-24 lg:pt-6 lg:h-auto flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-full aspect-square bg-slate-50 rounded-[40px] mb-10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white opacity-50" />
                <div className="relative z-10 scale-125">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-changing-password-illustration-download-in-svg-png-gif-formats--security-account-pack-cyber-security-illustrations-5205565.png" alt="Success" className="w-64 h-64 object-contain" />
                </div>
            </div>
            <h2 className="text-2xl font-black text-[#0f172a] mb-2">{title}</h2>
            <p className="text-gray-500 font-bold mb-12 px-4 text-sm leading-relaxed">{message}</p>
            <button onClick={() => setSettingsStep('main')} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl transition-transform active:scale-95 cursor-pointer">Continue</button>
        </div>
    );

    const renderPasswordFlow = () => {
        if (settingsStep === 'password_success') return renderSuccess("You're all Set!", "Your password has been changed successfully");
        if (settingsStep === 'password_otp') return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl">
                <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0 hidden lg:block">Verify your phone number</h2>
                <p className="text-gray-500 font-bold text-sm mb-12">We've sent a 4-digit verification code to your phone number. Please enter it below to continue.</p>
                <div className="flex justify-center gap-4 mb-8">{[1, 2, 3, 4].map(i => <div key={i} className="w-14 h-14 lg:w-16 lg:h-16 rounded-[20px] bg-white border-2 border-slate-100" />)}</div>
                <div className="text-center mb-12"><p className="text-xs font-bold text-gray-400">Didn't get code? <span className="text-[#1E4E82] ml-1">Resend 2:59</span></p></div>
                <button onClick={() => setSettingsStep('password_reset')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] cursor-pointer">Verify</button>
            </div>
        );
        if (settingsStep === 'password_reset') return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl">
                <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0 hidden lg:block">Reset your Password</h2>
                <p className="text-gray-500 font-bold text-sm mb-12">Enter your new password below. Make sure it's strong and secure</p>
                <div className="space-y-6 flex-1">
                    <div><label className="text-xs font-bold text-gray-500 mb-2 block ml-1">New Password</label><div className="relative"><input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold pr-12" /><EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div></div>
                    <div><label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Confirm New Password</label><div className="relative"><input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold pr-12" /><EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div></div>
                </div>
                <button onClick={() => setSettingsStep('password_success')} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl mt-8 mb-6 cursor-pointer">Reset</button>
            </div>
        );
        return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl flex flex-col h-[calc(100vh-80px)] lg:h-auto">
                <h2 className="text-2xl font-black text-[#0f172a] mb-8 mt-4 lg:mt-0 hidden lg:block">Change Password</h2>
                <div className="space-y-6 flex-1">
                    <div><label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Email / Phone</label><input type="email" defaultValue={userProfile.email} className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold" /></div>
                    <div><label className="text-xs font-bold text-gray-500 mb-2 block ml-1">Old Password</label><div className="relative"><input type="password" placeholder="********" className="w-full p-4.5 rounded-[20px] border border-gray-200 outline-none focus:border-[#1E4E82]/30 font-bold pr-12" /><EyeOff size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div></div>
                </div>
                <button onClick={() => setSettingsStep('password_otp')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] mb-6 mt-8 cursor-pointer">Generate OTP</button>
            </div>
        );
    };

    const renderPinFlow = () => {
        if (settingsStep === 'pin_success') return renderSuccess("You're all Set!", "Your login pin has been changed successfully");
        if (settingsStep === 'pin_new') return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl">
                <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0 hidden lg:block">Set a new 6-Digit PIN</h2>
                <p className="text-gray-500 font-bold text-sm mb-12">Enter new pin below</p>
                <div className="flex justify-center gap-2 lg:gap-3 mb-12">{[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-12 h-14 lg:w-14 lg:h-16 rounded-2xl bg-white border-2 border-slate-100" />)}</div>
                <button onClick={() => setSettingsStep('pin_success')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] cursor-pointer">Continue</button>
            </div>
        );
        return (
            <div className="px-5 lg:px-0 pt-24 lg:pt-4 pb-10 max-w-2xl h-[calc(100vh-80px)] lg:h-auto flex flex-col">
                <div className="flex-1">
                    <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0 hidden lg:block">Change Login PIN</h2>
                    <p className="text-gray-500 font-bold text-sm mb-12">Enter current pin below</p>
                    <div className="flex justify-center gap-2 lg:gap-3 mb-12">{[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-12 h-14 lg:w-14 lg:h-16 rounded-2xl bg-white border-2 border-slate-100" />)}</div>
                </div>
                <button onClick={() => setSettingsStep('pin_new')} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] cursor-pointer">Continue</button>
            </div>
        );
    };

    const [tempAddress, setTempAddress] = useState('');
    const [selectedAddressForRemoval, setSelectedAddressForRemoval] = useState(null);

    const handleAddAddressRequest = async () => {
        const addressLabel = watch('addressContact')?.label || tempAddress;
        console.log('[Settings] Attempting to add address:', { addressLabel, locationInfo, verificationFile });
        
        if (!addressLabel) {
            setUpdateMessage('Please enter an address');
            return;
        }
        if (!verificationFile) {
            setUpdateMessage('Verification document is required');
            return;
        }

        setIsUpdating(true);
        setUpdateMessage(null); // Clear previous errors
        try {
            const payload = {
                address: addressLabel,
                latitude: locationInfo?.latitude || 0,
                longitude: locationInfo?.longitude || 0,
                addressVerificationFile: verificationFile
            };
            console.log('[Settings] Sending address request payload:', payload);
            await userService.addArtisanAddress(payload);
            setSettingsSubStep('success');
        } catch (err) {
            console.error('[Settings] Address Request Failed:', err);
            setUpdateMessage(err?.message || 'Failed to send request');
        } finally {
            setIsUpdating(false);
        }
    };

    const renderAddresses = () => {
        if (settingsSubStep === 'success') return (
            <div className="pt-24 lg:pt-6 pb-10 flex flex-col items-center justify-center text-center max-w-md mx-auto px-5 lg:px-0">
                <div className="w-full aspect-square bg-white rounded-[40px] mb-10 flex items-center justify-center relative overflow-hidden">
                    <img 
                        src="https://img.freepik.com/premium-vector/successful-management-concept-business-meeting-discussion-flat-illustration_1013341-118.jpg" 
                        alt="Success" 
                        className="w-full h-80 object-contain" 
                    />
                </div>
                <h2 className="text-2xl font-black text-[#0f172a] mb-2">Your Request Has Been Sent!</h2>
                <p className="text-gray-500 font-bold mb-12 text-sm leading-relaxed px-4">
                    {selectedAddressForRemoval 
                        ? `You have requested to remove "${selectedAddressForRemoval.address}". We'll review and send you an update soon.` 
                        : "We've sent your request to add your address. We'll review your details and send you an update soon."
                    }
                </p>
                <div className="w-full space-y-4">
                    <button onClick={() => setSettingsStep('main')} className="w-full py-5 bg-[#1E4E82] text-white font-black rounded-[24px] shadow-xl transition-transform active:scale-95 cursor-pointer">Back to Home</button>
                    <button onClick={() => { setSettingsStep('main'); setSelectedAddressForRemoval(null); }} className="w-full py-5 bg-[#DDE6F5] text-[#1E4E82] font-black rounded-[24px] transition-transform active:scale-95 cursor-pointer">Cancel</button>
                </div>
            </div>
        );

        if (settingsSubStep === 'add' || settingsSubStep === 'remove') return (
            <div className="pt-24 lg:pt-4 pb-10 max-w-2xl text-left px-5 lg:px-0">
                <div className="mb-10 mt-4 lg:mt-0">
                    <div className="flex items-center gap-3 mb-6 lg:hidden">
                        <button onClick={() => setSettingsSubStep('list')} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                        <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">My Addresses</h1>
                    </div>
                    <label className="text-xs font-bold text-gray-500 mb-4 block ml-1 uppercase tracking-wider">Address</label>
                    <div className="relative group z-30">
                        {settingsSubStep === 'remove' ? (
                            <input 
                                type="text" 
                                readOnly 
                                value={selectedAddressForRemoval?.address} 
                                className="w-full p-5 rounded-[12px] border-2 border-slate-200 outline-none font-bold text-[#0f172a] bg-slate-50" 
                            />
                        ) : (
                            <Location 
                                control={control} 
                                watch={watch} 
                                errors={errors} 
                                setValue={setValue}
                                setLocationInfo={setLocationInfo}
                            />
                        )}
                    </div>

                    {settingsSubStep === 'add' && (
                        <div className="mt-8">
                            <label className="text-xs font-bold text-gray-500 mb-4 block ml-1 uppercase tracking-wider">Verification Document</label>
                            <label className="w-full border-2 border-dashed border-gray-200 rounded-[12px] p-8 flex flex-col items-center justify-center text-center bg-white cursor-pointer hover:bg-slate-50 transition-all group">
                                <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 mb-4 group-hover:scale-110 transition-transform overflow-hidden border-2 border-white shadow-sm">
                                    {isUploadingFile ? (
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E4E82]" />
                                    ) : (previewUrl || verificationFile) ? (
                                        ((previewUrl || verificationFile).match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) != null || (previewUrl && previewUrl.startsWith('blob:'))) ? (
                                            <img src={previewUrl || verificationFile} alt="Verification" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="relative flex items-center justify-center w-full h-full">
                                                <FileText size={32} className="text-[#1E4E82]" />
                                                <div className="absolute top-0 right-0 p-0.5 bg-white rounded-full transition-opacity opacity-100"><CheckCircle2 className="text-[#0F9E7B]" size={14} /></div>
                                            </div>
                                        )
                                    ) : (
                                        <Image size={32} />
                                    )}
                                </div>
                                <p className="text-sm font-bold text-gray-400">
                                    {verificationFile ? "Document Uploaded" : "Upload utility bill, rent receipt etc."}
                                </p>
                                {updateMessage && <p className="text-[10px] text-red-500 font-bold mt-2">{updateMessage}</p>}
                            </label>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center mt-12 gap-3">
                    {updateMessage && <p className="text-xs text-red-500 font-bold mb-2 animate-bounce">{updateMessage}</p>}
                    <button 
                        onClick={settingsSubStep === 'add' ? handleAddAddressRequest : () => setSettingsSubStep('success')} 
                        disabled={isUpdating || isUploadingFile || (settingsSubStep === 'add' && !verificationFile)}
                        className="w-full max-w-sm py-5 bg-[#1E4E82] text-white font-black rounded-[12px] shadow-xl transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                    >
                        {isUpdating ? 'Sending...' : settingsSubStep === 'add' ? 'Request to add' : 'Request to remove'}
                    </button>
                    {isUploadingFile && <p className="text-[10px] text-[#1E4E82] font-medium italic">Uploading document, please wait...</p>}
                </div>
            </div>
        );

        return (
            <div className="pt-24 lg:pt-4 pb-10 max-w-2xl text-left px-5 lg:px-0">
                <div className="space-y-6">
                    {/* Default Address Section */}
                    {userProfile.addresses.filter(a => a.type === 'Home' || a.isDefault).map((addr) => (
                        <div key={addr.id} className="space-y-3">
                            <div className="bg-[#F1F5F9] border border-slate-200 rounded-[12px] p-6 relative">
                                <span className="text-xs font-bold text-slate-400 block mb-3 uppercase tracking-wider">Default Address</span>
                                <div className="flex justify-between items-center gap-4">
                                    <p className="text-[#0f172a] font-black text-sm leading-relaxed">{addr.address}</p>
                                    <button onClick={() => { setSettingsSubStep('add'); setTempAddress(addr.address); }} className="text-gray-400 font-bold text-xs hover:text-[#1E4E82] transition-colors shrink-0">Change</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Other Addresses List */}
                    <div className="space-y-3 pt-6">
                         {userProfile.addresses.filter(a => a.type !== 'Home' && !a.isDefault).map((addr) => (
                            <div key={addr.id} className="w-full p-5 rounded-[12px] border-2 border-slate-100 flex items-center justify-between group hover:border-slate-200 transition-all bg-white">
                                <span className="font-bold text-[#0f172a] text-sm truncate pr-4">{addr.address}</span>
                                <button 
                                    onClick={() => { setSelectedAddressForRemoval(addr); setSettingsSubStep('remove'); }}
                                    className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-red-400 group-hover:text-red-400 transition-all shrink-0 active:scale-90"
                                >
                                    <EyeOff size={14} className="hidden" /> {/* Using hidden to maintain size check if needed */}
                                    <div className="w-2.5 h-[2px] bg-current rounded-full" />
                                </button>
                            </div>
                         ))}

                         {/* Add Button */}
                         <button 
                            onClick={() => { setTempAddress(''); setSettingsSubStep('add'); }}
                            className="w-full p-5 rounded-[12px] border-2 border-slate-100 flex items-center justify-center bg-white hover:bg-slate-50 transition-all active:scale-95 group"
                         >
                            <div className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-[#1E4E82] group-hover:text-[#1E4E82] transition-all">
                                <Plus size={20} strokeWidth={2.5} />
                            </div>
                         </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderFaq = () => {
        const filteredFaqs = FAQ_DATA.filter(item => item.category === faqCategory);
        return (
            <div className="pt-24 lg:pt-4 pb-12 text-left">
                <div className="mb-8 mt-4 lg:mt-0 px-5 lg:px-0">
                    <h2 className="text-2xl font-black text-[#0f172a] mb-2 hidden lg:block">FAQs</h2>
                    <p className="text-gray-500 font-bold text-sm">Find answers to commonly asked questions.</p>
                </div>
                <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar px-5 lg:px-0">
                    {['General', 'Account & Profile', 'Bookings', 'Payments'].map(cat => (
                        <button key={cat} onClick={() => { setFaqCategory(cat); toggleFaq(null); }} className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 ${faqCategory === cat ? 'border-[#1E4E82] text-[#1E4E82]' : 'border-transparent text-gray-400'}`}>{cat}</button>
                    ))}
                </div>
                <div className="space-y-4 px-5 lg:px-0">
                    {filteredFaqs.map(item => (
                        <div key={item.id} className="bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-sm transition-all hover:border-[#1E4E82]/20">
                            <button onClick={() => toggleFaq(item.id)} className="w-full flex items-center justify-between p-6 text-left transition-colors">
                                <span className={`font-bold text-sm ${visibleFaq === item.id ? 'text-[#1E4E82]' : 'text-[#0f172a]'}`}>{item.q}</span>
                                <div className={`transition-transform duration-300 shrink-0 ml-4 ${visibleFaq === item.id ? 'rotate-180 text-[#1E4E82]' : 'text-gray-300'}`}><ChevronDown size={20} /></div>
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
                <div className="mt-12 p-8 bg-[#1e293b] rounded-[32px] text-center text-white shadow-xl mx-5 lg:mx-0">
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
        <div className="pt-24 lg:pt-4 pb-10 px-5 lg:px-0">
            <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0 hidden lg:block">Contact Us</h2>
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
                            <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}><item.icon size={24} /></div>
                            <div><h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</h4><p className="font-black text-[#0f172a] text-sm">{item.value}</p></div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className="pt-24 lg:pt-4 pb-10 px-5 lg:px-0">
            <h2 className="text-2xl font-black text-[#0f172a] mb-2 mt-4 lg:mt-0 hidden lg:block px-4">About Artifinda</h2>
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
        <div className="max-w-6xl mx-auto w-full px-5 lg:px-4 flex flex-col pt-2 lg:pt-6 bg-[#F8FAFC] min-h-screen overflow-y-auto no-scrollbar">
            {settingsStep !== 'main' && settingsStep !== 'subscriptions' && (
                <div className="hidden lg:flex items-center gap-3 mb-4">
                    <button onClick={() => {
                        if (settingsStep === 'addresses' && settingsSubStep === 'add') setSettingsSubStep('list');
                        else setSettingsStep('main');
                    }} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform"><ChevronLeft size={24} strokeWidth={2.5} /></button>
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
            {settingsStep === 'subscriptions' && <ArtisanSubscriptionsFlow userProfile={userProfile} onBack={() => setSettingsStep('main')} step={subscriptionsStep} setStep={setSubscriptionsStep} />}
            {settingsStep === 'success' && renderSuccess("You're all set!", "Your changes have been saved successfully.")}
        </div>
    );
};

export default ArtisanSettingsView;
