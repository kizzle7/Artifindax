import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_PROFILE } from '../constants/artisanData';
import userService from '../services/userService';
import authService from '../services/authService';
import artisanService from '../services/artisanService';
import toast from 'react-hot-toast';

// Layout components
import Sidebar from '../components/artisan/Sidebar';
import MobileHeader from '../components/artisan/MobileHeader';
import MobileMenu from '../components/artisan/MobileMenu';

// View components
import ArtisanHomeView from '../components/artisan/ArtisanHomeView';
import ArtisanBookingsView from '../components/artisan/ArtisanBookingsView';
import ArtisanOrderDetailsView from '../components/artisan/ArtisanOrderDetailsView';
import ArtisanCancelOrderView from '../components/artisan/ArtisanCancelOrderView';
import ArtisanCancelSuccessView from '../components/artisan/ArtisanCancelSuccessView';
import ArtisanConfirmCompletionView from '../components/artisan/ArtisanConfirmCompletionView';
import ArtisanCompletionSuccessView from '../components/artisan/ArtisanCompletionSuccessView';
import ArtisanGenerateInvoiceView from '../components/artisan/ArtisanGenerateInvoiceView';
import ArtisanInvoicePreviewView from '../components/artisan/ArtisanInvoicePreviewView';
import ArtisanMessagesView from '../components/artisan/ArtisanMessagesView';
import ArtisanNotificationsView from '../components/artisan/ArtisanNotificationsView';
import ArtisanSettingsView from '../components/artisan/ArtisanSettingsView';

// Modal components
import CancellationModal from '../components/artisan/CancellationModal';
import ServiceCompletionModal from '../components/artisan/ServiceCompletionModal';

const ArtisanDashboard = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('dashboard');
    const [bookingsViewStep, setBookingsViewStep] = useState('list');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [completionNotes, setCompletionNotes] = useState('');
    const [completionImages, setCompletionImages] = useState([]);
    const [invoiceItems, setInvoiceItems] = useState([{ description: '', amount: '' }]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notificationsViewStep, setNotificationsViewStep] = useState('list');
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Bookings Data State
    const [bookingsData, setBookingsData] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [isSubmittingAction, setIsSubmittingAction] = useState(false);

    // Messages State
    const [messagesViewStep, setMessagesViewStep] = useState('list');
    const [currentChat, setCurrentChat] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [searchMessages, setSearchMessages] = useState('');
    const [zoomedImage, setZoomedImage] = useState(null);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [selectedReportOption, setSelectedReportOption] = useState(null);

    // Settings State
    const [settingsStep, setSettingsStep] = useState('main');
    const [settingsSubStep, setSettingsSubStep] = useState('list');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [userProfile, setUserProfile] = useState(USER_PROFILE);
    const [faqCategory, setFaqCategory] = useState('General');
    const [visibleFaq, setVisibleFaq] = useState(null);

    const toggleFaq = (id) => setVisibleFaq(visibleFaq === id ? null : id);

    React.useEffect(() => {
        if (currentView === 'bookings') {
            fetchBookings();
        }
    }, [currentView]);

    const fetchBookings = async () => {
        setLoadingBookings(true);
        try {
            const data = await artisanService.getBookings({ pageNumber: 1, pageSize: 10 });
            setBookingsData(data.records || []);
        } catch (err) {
            console.error("Failed to load artisan bookings:", err);
        } finally {
            setLoadingBookings(false);
        }
    };

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile();
                const account = data.accounts?.find(acc => acc.accountType === 'ARTISAN') || data.accounts?.[0];

                setUserProfile({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    phone: data.phoneNumber || '',
                    gender: account?.gender || '',
                    dob: account?.dateOfBirth || '',
                    email: account?.email || '',
                    addresses: userProfile.addresses,
                    profilePicture: account?.profilePicture || '',
                    status: data.status || 'ACTIVE',
                    identityVerificationStatus: data.identityVerificationStatus || 'PENDING',
                    kycApprovalStatus: account?.kycApprovalStatus || 'NOT_STARTED'
                });
            } catch (err) {
                console.error("Failed to load artisan profile:", err);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = () => {
        authService.clearToken();
        navigate('/login');
    };

    const handleBack = () => {
        if (showCancelModal) setShowCancelModal(false);
        else if (showCompletionModal) setShowCompletionModal(false);
        else if (currentView === 'cancel-reason') setCurrentView('bookings');
        else if (currentView === 'confirm-completion') setCurrentView('bookings');
        else if (currentView === 'generate-invoice') setCurrentView('bookings');
        else if (currentView === 'invoice-preview') setCurrentView('generate-invoice');
        else if (currentView === 'cancel-success' || currentView === 'completion-success') {
            setCurrentView('bookings');
            setBookingsViewStep('list');
            setSelectedBooking(null);
        }
        else if (selectedBooking) {
            setBookingsViewStep('list');
            setSelectedBooking(null);
        }
        else if (currentView === 'notifications' && notificationsViewStep === 'detail') setNotificationsViewStep('list');
        else if (currentView === 'settings') {
            if (settingsStep === 'main') setCurrentView('dashboard');
            else if (settingsStep === 'addresses' && settingsSubStep === 'add') setSettingsSubStep('list');
            else setSettingsStep('main');
        }
        else if (currentView === 'messages') {
            if (messagesViewStep === 'chat' || messagesViewStep === 'block') setMessagesViewStep('list');
            else if (messagesViewStep === 'report') setMessagesViewStep('chat');
            else if (messagesViewStep === 'report_other') setMessagesViewStep('report');
            else if (messagesViewStep === 'feedback') { setCurrentView('dashboard'); setMessagesViewStep('list'); }
            else if (messagesViewStep === 'invoice_detail' || messagesViewStep === 'receipt') setMessagesViewStep('chat');
            else { setCurrentView('dashboard'); setMessagesViewStep('list'); }
        }
    };

    const handleCancelClick = (booking) => { setSelectedBooking(booking); setShowCancelModal(true); };
    const handleCompleteClick = (booking) => { setSelectedBooking(booking); setShowCompletionModal(true); };
    const handleAcceptClick = (booking) => {
        setSelectedBooking(booking);
        // Commented out generation of invoice for now
        // setInvoiceItems([{ description: booking.title, amount: '' }]);
        // setCurrentView('generate-invoice');
        setShowAcceptModal(true);
    };
    const confirmCompletion = () => { setShowCompletionModal(false); setCurrentView('confirm-completion'); };
    const confirmCancellation = () => { setShowCancelModal(false); setCurrentView('cancel-reason'); };
    const confirmAccept = async () => {
        if (!selectedBooking) return;
        setIsSubmittingAction(true);
        const loadingToast = toast.loading('Accepting booking request...');
        try {
            await artisanService.respondToBooking({
                bookingId: selectedBooking.id,
                bookingResponseStatus: 'ACCEPTED',
                comment: 'Booking accepted'
            });
            toast.success('Booking accepted successfully!', { id: loadingToast });
            setShowAcceptModal(false);
            setCurrentView('bookings');
            setBookingsViewStep('list');
            setSelectedBooking(null);
            fetchBookings(); // Refresh list
        } catch (err) {
            console.error("Failed to accept booking:", err);
            const backendMessage = err.response?.data?.message || 'Failed to accept booking. Please try again.';
            toast.error(backendMessage, { id: loadingToast });
        } finally {
            setIsSubmittingAction(false);
        }
    };

    const renderView = () => {
        switch (currentView) {
            case 'dashboard': return <ArtisanHomeView setCurrentView={setCurrentView} userProfile={userProfile} />;
            case 'bookings':
                return bookingsViewStep === 'list' ? (
                    <ArtisanBookingsView
                        bookingsData={bookingsData}
                        loadingBookings={loadingBookings}
                        onSelectBooking={(booking) => { setSelectedBooking(booking); setBookingsViewStep('detail'); }}
                        onCancel={handleCancelClick}
                        onComplete={handleCompleteClick}
                        onAccept={handleAcceptClick}
                        setCurrentView={setCurrentView}
                    />
                ) : (
                    <ArtisanOrderDetailsView
                        booking={selectedBooking}
                        onBack={() => { setBookingsViewStep('list'); setSelectedBooking(null); }}
                        onCancel={handleCancelClick}
                        onComplete={handleCompleteClick}
                        onAccept={handleAcceptClick}
                    />
                );
            case 'cancel-reason':
                return (
                    <ArtisanCancelOrderView
                        booking={selectedBooking}
                        onBack={() => setCurrentView('bookings')}
                        reason={cancelReason}
                        setReason={setCancelReason}
                        otherReason={otherReason}
                        setOtherReason={setOtherReason}
                        onSubmit={async () => {
                            setIsSubmittingAction(true);
                            try {
                                await artisanService.respondToBooking({
                                    bookingId: selectedBooking.id,
                                    bookingResponseStatus: 'REJECTED',
                                    comment: cancelReason + (otherReason ? `: ${otherReason}` : '')
                                });
                                setCurrentView('cancel-success');
                                fetchBookings(); // Refresh list
                            } catch (err) {
                                console.error("Failed to reject booking:", err);
                            } finally {
                                setIsSubmittingAction(false);
                            }
                        }}
                    />
                );
            case 'cancel-success':
                return (
                    <ArtisanCancelSuccessView
                        onFinish={() => {
                            setCurrentView('dashboard');
                            setBookingsViewStep('list');
                            setSelectedBooking(null);
                            setCancelReason('');
                            setOtherReason('');
                        }}
                    />
                );
            case 'confirm-completion':
                return (
                    <ArtisanConfirmCompletionView
                        booking={selectedBooking}
                        notes={completionNotes}
                        setNotes={setCompletionNotes}
                        images={completionImages}
                        setImages={setCompletionImages}
                        onSubmit={() => setCurrentView('completion-success')}
                        onBack={handleBack}
                    />
                );
            case 'completion-success':
                return (
                    <ArtisanCompletionSuccessView
                        onFinish={() => {
                            setCurrentView('bookings');
                            setBookingsViewStep('list');
                            setCompletionNotes('');
                            setCompletionImages([]);
                            setSelectedBooking(null);
                        }}
                    />
                );
            /* case 'generate-invoice':
                return (
                    <ArtisanGenerateInvoiceView
                        booking={selectedBooking}
                        items={invoiceItems}
                        setItems={setInvoiceItems}
                        onSubmit={() => setCurrentView('invoice-preview')}
                        onBack={handleBack}
                    />
                );
            case 'invoice-preview':
                return (
                    <ArtisanInvoicePreviewView
                        booking={selectedBooking}
                        items={invoiceItems}
                        onEdit={() => setCurrentView('generate-invoice')}
                        onSend={async () => {
                            setIsSubmittingAction(true);
                            try {
                                await artisanService.respondToBooking({
                                    bookingId: selectedBooking.id,
                                    bookingResponseStatus: 'ACCEPTED',
                                    comment: 'Booking accepted with invoice'
                                });
                                setCurrentView('bookings');
                                setBookingsViewStep('list');
                                setSelectedBooking(null);
                                fetchBookings(); // Refresh list
                            } catch (err) {
                                console.error("Failed to accept booking:", err);
                            } finally {
                                setIsSubmittingAction(false);
                            }
                        }}
                        onBack={handleBack}
                    />
                ); */
            case 'messages':
                return (
                    <ArtisanMessagesView
                        messagesViewStep={messagesViewStep}
                        setMessagesViewStep={setMessagesViewStep}
                        currentChat={currentChat}
                        setCurrentChat={setCurrentChat}
                        chatMessages={chatMessages}
                        setChatMessages={setChatMessages}
                        searchMessages={searchMessages}
                        setSearchMessages={setSearchMessages}
                        zoomedImage={zoomedImage}
                        setZoomedImage={setZoomedImage}
                        showMenuModal={showMenuModal}
                        setShowMenuModal={setShowMenuModal}
                        selectedReportOption={selectedReportOption}
                        setSelectedReportOption={setSelectedReportOption}
                        setCurrentView={setCurrentView}
                    />
                );
            case 'notifications':
                return (
                    <ArtisanNotificationsView
                        notificationsViewStep={notificationsViewStep}
                        setNotificationsViewStep={setNotificationsViewStep}
                        selectedNotification={selectedNotification}
                        setSelectedNotification={setSelectedNotification}
                        setCurrentView={setCurrentView}
                    />
                );
            case 'settings':
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
                        handleLogout={handleLogout}
                    />
                );
            default: return <ArtisanHomeView />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <MobileHeader
                currentView={currentView}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                selectedBooking={selectedBooking}
                onBack={handleBack}
                bookingsViewStep={bookingsViewStep}
                notificationsViewStep={notificationsViewStep}
                setCurrentView={setCurrentView}
                messagesViewStep={messagesViewStep}
                currentChat={currentChat}
                settingsStep={settingsStep}
                setSettingsStep={setSettingsStep}
                settingsSubStep={settingsSubStep}
                setSettingsSubStep={setSettingsSubStep}
            />

            <MobileMenu
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                currentView={currentView}
                setCurrentView={setCurrentView}
                setSelectedBooking={setSelectedBooking}
                setBookingsViewStep={setBookingsViewStep}
                setNotificationsViewStep={setNotificationsViewStep}
                setMessagesViewStep={setMessagesViewStep}
            />

            <Sidebar
                currentView={currentView}
                setCurrentView={setCurrentView}
                setBookingsViewStep={setBookingsViewStep}
                setNotificationsViewStep={setNotificationsViewStep}
                setMessagesViewStep={setMessagesViewStep}
                setSelectedBooking={setSelectedBooking}
            />

            <main className={`lg:ml-[240px] ${['notifications', 'messages', 'settings'].includes(currentView) ? '' : 'p-4 lg:p-8 pt-20 lg:pt-8'} min-h-screen transition-all duration-300`}>
                <div className={`${['notifications', 'messages', 'settings'].includes(currentView) ? 'w-full' : 'max-w-4xl mx-auto'}`}>
                    {renderView()}
                </div>
            </main>

            {showCancelModal && (
                <CancellationModal
                    onConfirm={confirmCancellation}
                    onCancel={() => setShowCancelModal(false)}
                />
            )}

            {showCompletionModal && (
                <ServiceCompletionModal
                    onConfirm={confirmCompletion}
                    onCancel={() => setShowCompletionModal(false)}
                />
            )}

            {showAcceptModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[24px] max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-[#1E4E82]/10 text-[#1E4E82] rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🤝</span>
                        </div>
                        <h3 className="text-xl font-black text-[#0f172a] mb-2 tracking-tight">Accept Booking?</h3>
                        <p className="text-sm font-bold text-slate-500 mb-6">Are you sure you want to accept this booking request?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAcceptModal(false)}
                                disabled={isSubmittingAction}
                                className="flex-1 py-3 border-2 border-slate-200 text-slate-500 rounded-[12px] font-black uppercase tracking-wider text-xs hover:border-slate-300 transition-colors"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmAccept}
                                disabled={isSubmittingAction}
                                className={`flex-1 py-3 bg-[#1E4E82] text-white rounded-[12px] font-black uppercase tracking-wider text-xs shadow-lg hover:bg-[#153a61] transition-colors ${isSubmittingAction ? 'opacity-50' : ''}`}
                            >
                                {isSubmittingAction ? 'Accepting...' : 'Yes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtisanDashboard;
