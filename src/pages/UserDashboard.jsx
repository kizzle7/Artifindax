import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { setKey, fromLatLng } from 'react-geocode';
import toast from 'react-hot-toast';

// Services
import categoryService from '../services/categoryService';
import customerService from '../services/customerService';
import authService from '../services/authService';
import userService from '../services/userService';

// Constants
import {
    USER_PROFILE,
    BOOKINGS,
    CATEGORIES,
    POPULAR_SERVICES,
    BANNERS,
    FAQ_DATA,
    NOTIFICATIONS
} from '../constants/userData';

// Components
import Sidebar from '../components/user/Sidebar';
import MobileHeader from '../components/user/MobileHeader';
import MobileMenu from '../components/user/MobileMenu';
import HomeView from '../components/user/HomeView';
import BookingsView from '../components/user/BookingsView';
import MessagesView from '../components/user/MessagesView';
import NotificationsView from '../components/user/NotificationsView';
import SettingsView from '../components/user/SettingsView';
import SearchView from '../components/user/SearchView';
import OrderDetailsView from '../components/user/OrderDetailsView';
import FilterModal from '../components/user/FilterModal';
import LogoutModal from '../components/user/LogoutModal';
import DashboardSkeleton from '../components/ui/DashboardSkeleton';
import { useForm } from 'react-hook-form';

const GEOCODE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
setKey(GEOCODE_API_KEY);

const UserDashboard = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentView, setCurrentView] = useState(searchParams.get('view') || 'home');
    const [bookingTab, setBookingTab] = useState('ongoing');
    const [bookingsData, setBookingsData] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInitialProfileLoading, setIsInitialProfileLoading] = useState(true);

    // Notifications State
    const [notificationsViewStep, setNotificationsViewStep] = useState('list');
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Messages & Payment State
    const [messagesViewStep, setMessagesViewStep] = useState('chat');
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [cancelBookingId, setCancelBookingId] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [searchMessages, setSearchMessages] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [zoomedImage, setZoomedImage] = useState(null);
    const [selectedArtisan, setSelectedArtisan] = useState(null);
    const [recentSearches, setRecentSearches] = useState(['Plumber', 'Hairdresser']);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filtersEnabled, setFiltersEnabled] = useState(false);
    const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [selectedReportOption, setSelectedReportOption] = useState(null);

    // Dynamic Search & Category State
    const [popularServices, setPopularServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categorySkills, setCategorySkills] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loadingPopular, setLoadingPopular] = useState(false);
    const [loadingSkills, setLoadingSkills] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [topArtisans, setTopArtisans] = useState([]);
    const [loadingTopRated, setLoadingTopRated] = useState(false);

    // Settings State
    const [settingsStep, setSettingsStep] = useState('main'); // 'main', 'profile', 'addresses', 'password', 'pin', 'faq', 'contact', 'about', 'password_success', 'pin_success'
    const [settingsSubStep, setSettingsSubStep] = useState('list'); // 'list', 'add'
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(localStorage.getItem('artifinda_selected_address_id'));

    // Filtered services for the search view
    const filteredPopularServices = (popularServices || []).filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.category?.name && service.category.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Data mapped for simple charts
    const [userProfile, setUserProfile] = useState(USER_PROFILE);
    const [faqCategory, setFaqCategory] = useState('General');
    const [visibleFaq, setVisibleFaq] = useState(null);

    const toggleFaq = (id) => setVisibleFaq(visibleFaq === id ? null : id);
    
    const fetchPopular = useCallback(async () => {
        setLoadingPopular(true);
        try {
            const data = await categoryService.getPopularServices();
            setPopularServices(data);
        } catch (err) {
            console.error("Failed to load popular services:", err);
        } finally {
            setLoadingPopular(false);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        setLoadingCategories(true);
        try {
            const data = await categoryService.getCategories();
            setCategories(Array.isArray(data) ? data : (data.content || []));
        } catch (err) {
            console.error("Failed to load categories:", err);
        } finally {
            setLoadingCategories(false);
        }
    }, []);

    const fetchProfile = useCallback(async () => {
        setIsInitialProfileLoading(true);
        try {
            const data = await userService.getProfile();
            // Map API data to UI state
            const account = data.accounts?.find(acc => acc.accountType === 'CUSTOMER') || data.accounts?.[0];

            const apiAddresses = (account?.customerAddresses || account?.artisanAddresses || []);
            const mappedAddresses = apiAddresses.map(addr => ({
                id: addr.id,
                address: addr.address.address,
                latitude: addr.address.latitude,
                longitude: addr.address.longitude,
                isDefault: addr.id === account?.defaultAddressId || true,
                status: addr.status
            }));

            setUserProfile(prev => ({
                ...prev,
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                phone: data.phoneNumber || '',
                gender: account?.gender || '',
                dob: account?.dateOfBirth || '',
                email: account?.email || '',
                addresses: mappedAddresses.length > 0 ? mappedAddresses : prev.addresses,
                profilePicture: account?.profilePicture || '',
                status: data.status || 'ACTIVE',
                identityVerificationStatus: data.identityVerificationStatus || 'PENDING',
                kycApprovalStatus: account?.kycApprovalStatus || 'NOT_STARTED',
                id: data.id || account?.id // Adding ID for chat identification
            }));
        } catch (err) {
            console.error("Failed to load user profile:", err);
        } finally {
            setIsInitialProfileLoading(false);
        }
    }, []);

    const getEffectiveLocation = async () => {
        // 1. Check Selected Address Override
        const selectedAddress = userProfile.addresses?.find(a => String(a.id) === String(selectedAddressId));
        if (selectedAddress && selectedAddress.address && selectedAddress.latitude && selectedAddress.longitude) {
            console.log("[Dashboard] Using Selected Address Override:", selectedAddress);
            return {
                address: selectedAddress.address,
                latitude: selectedAddress.latitude,
                longitude: selectedAddress.longitude
            };
        }

        // 2. Check Profile Default Address
        const profileAddress = userProfile.addresses?.find(a => a.isDefault || a.status === 'ACTIVE' || a.status === 'verified') || userProfile.addresses?.[0];
        if (profileAddress && profileAddress.address && profileAddress.latitude && profileAddress.longitude) {
            console.log("[Dashboard] Using Profile Default Address:", profileAddress);
            return {
                address: profileAddress.address,
                latitude: profileAddress.latitude,
                longitude: profileAddress.longitude
            };
        }

        // 2. Check Saved Location (LocalStorage)
        const savedLocation = authService.getLocation();
        if (savedLocation && savedLocation.latitude && savedLocation.longitude) {
            console.log("[Dashboard] Using Saved Location:", savedLocation);
            return {
                address: savedLocation.address || "",
                latitude: savedLocation.latitude,
                longitude: savedLocation.longitude
            };
        }

        // 3. Try Browser Geolocation
        const getUserCoords = () => new Promise((resolve) => {
            if (!navigator.geolocation) return resolve({ lat: 0, lng: 0 });
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                () => resolve({ lat: 0, lng: 0 }),
                { timeout: 5000 }
            );
        });

        const coords = await getUserCoords();
        let finalLat = coords.lat;
        let finalLng = coords.lng;
        let finalAddress = "";

        if (finalLat !== 0 && finalLng !== 0) {
            try {
                const geoRes = await fromLatLng(finalLat, finalLng);
                finalAddress = geoRes.results[0]?.formatted_address || "";
            } catch (geoErr) {
                console.warn("Reverse geocode failed:", geoErr);
            }
        }

        // 4. Default Fallback
        return {
            address: finalAddress || "52 oriola street ketu Lagos",
            latitude: finalLat || 6.5916,
            longitude: finalLng || 3.39621,
        };
    };

    useEffect(() => {
        const view = searchParams.get('view');
        if (view && view !== currentView) {
            setCurrentView(view);
        }
    }, [searchParams]);

    useEffect(() => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('view', currentView);
            return newParams;
        }, { replace: true });
    }, [currentView, setSearchParams]);


    const fetchTopRated = useCallback(async () => {
        setLoadingTopRated(true);
        try {
            const loc = await getEffectiveLocation();

            const searchPayload = {
                categorySkillId: 1,
                categoryId: 1,
                location: {
                    address: loc.address,
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
                serviceMode: "HOME_SERVICE",
                topArtisans: true
            };
            const queryParams = {
                pageNumber: 1,
                pageSize: 10
            };

            console.log("[Dashboard] Fetching Top Rated Artisans (POST)...");
            const data = await customerService.searchArtisans(searchPayload, queryParams);

            const artisans = Array.isArray(data) ? data : (data.content || []);
            setTopArtisans(artisans);
        } catch (err) {
            console.error("[Dashboard] Failed to load top rated artisans:", err);
        } finally {
            setLoadingTopRated(false);
        }
    }, []);


    useEffect(() => {
        fetchPopular();
        fetchCategories();
        fetchTopRated();
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            if (currentView !== 'bookings' && currentView !== 'messages') return;
            setLoadingBookings(true);
            setBookingsData([]); // Clear state as requested by user
            try {
                const data = await customerService.getBookings({ pageNumber: 1, pageSize: 10 });
                console.log("[Dashboard] Bookings Response Success:", data);
                console.log("[Dashboard] Bookings Response:", data);
                const content = Array.isArray(data) ? data : (data.records || data.content || data.data || []);
                setBookingsData(content);
            } catch (err) {
                console.error("Failed to load bookings:", err);
            } finally {
                setLoadingBookings(false);
            }
        };
        fetchBookings();

        // Check if we navigated away from search to clear its state
        if (currentView !== 'search') {
            setSearchQuery('');
            setSearchResults([]);
            setSelectedCategory(null);
            setSelectedSkill(null);
        }
    }, [currentView, bookingTab]);

    const handleLogout = () => {
        authService.clearToken();
        navigate('/login');
    };

    const handleAddressChange = (addressId) => {
        setSelectedAddressId(addressId);
        localStorage.setItem('artifinda_selected_address_id', addressId);
        // We'll trigger fetchTopRated in a useEffect or manually
        setTimeout(() => fetchTopRated(), 0);
        toast.success("Location updated!");
    };

    const handleCancelBooking = (bookingId) => {
        setCancelBookingId(bookingId);
        setIsCancelModalOpen(true);
        setCancelReason('');
    };

    const confirmCancelBooking = async () => {
        if (!cancelBookingId) return;
        setIsCancelling(true);
        const loadingToast = toast.loading("Canceling booking...");
        try {
            await customerService.cancelBooking(cancelBookingId, cancelReason);
            toast.success("Booking canceled successfully", { id: loadingToast });

            // Update local state to reflect cancellation immediately
            setBookingsData(prev => prev.map(b =>
                b.id === cancelBookingId ? { ...b, bookingStatus: 'CANCELLED' } : b
            ));

            if (selectedBooking?.id === cancelBookingId) {
                setSelectedBooking(prev => ({ ...prev, bookingStatus: 'CANCELLED' }));
            }

            setIsCancelModalOpen(false);
            setCancelBookingId(null);
        } catch (err) {
            console.error("Failed to cancel booking:", err);
            const backendMessage = err.response?.data?.message || "Failed to cancel booking. Please try again.";
            toast.error(backendMessage, { id: loadingToast });
        } finally {
            setIsCancelling(false);
        }
    };

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        setSelectedSkill(null);
        setCategorySkills([]);
        setLoadingSkills(true);
        try {
            const data = await categoryService.getSkills(category.id);
            setCategorySkills(data);
        } catch (err) {
            console.error("Failed to load skills:", err);
        } finally {
            setLoadingSkills(false);
        }
    };

    const handleSkillClick = async (skill) => {
        setSelectedSkill(skill);
        setLoadingSearch(true);
        try {
            const loc = await getEffectiveLocation();

            const searchPayload = {
                categorySkillId: skill.id,
                categoryId: selectedCategory?.id,
                location: {
                    address: loc.address,
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
                serviceMode: "HOME_SERVICE",
                topArtisans: true
            };
            const queryParams = {
                pageNumber: 1,
                pageSize: 10
            };
            console.log("[Dashboard] Triggering skill search (POST)...", loc.address);
            const data = await customerService.searchArtisans(searchPayload, queryParams);
            const content = Array.isArray(data) ? data : (data.content || []);
            setSearchResults(content);
            setSearchQuery(skill.name);
        } catch (err) {
            console.error("[Dashboard] Search failed:", err);
        } finally {
            setLoadingSearch(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
            <Sidebar
                currentView={currentView}
                setCurrentView={setCurrentView}
                setSelectedBooking={setSelectedBooking}
                setNotificationsViewStep={setNotificationsViewStep}
                setMessagesViewStep={setMessagesViewStep}
                setSettingsStep={setSettingsStep}
                setShowLogoutModal={setShowLogoutModal}
            />
            <MobileHeader
                currentView={currentView}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                selectedBooking={selectedBooking}
                setSelectedBooking={setSelectedBooking}
                notificationsViewStep={notificationsViewStep}
                setNotificationsViewStep={setNotificationsViewStep}
                currentChat={currentChat}
                messagesViewStep={messagesViewStep}
                setCurrentView={setCurrentView}
                selectedArtisan={selectedArtisan}
                setSelectedArtisan={setSelectedArtisan}
                settingsStep={settingsStep}
                setSettingsStep={setSettingsStep}
                settingsSubStep={settingsSubStep}
                setSettingsSubStep={setSettingsSubStep}
                isBookingFormOpen={isBookingFormOpen}
                setIsBookingFormOpen={setIsBookingFormOpen}
            />
            <MobileMenu
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                currentView={currentView}
                setCurrentView={setCurrentView}
                setSelectedBooking={setSelectedBooking}
                setNotificationsViewStep={setNotificationsViewStep}
                setMessagesViewStep={setMessagesViewStep}
                setSettingsStep={setSettingsStep}
            />

            <FilterModal
                isFilterModalOpen={isFilterModalOpen}
                setIsFilterModalOpen={setIsFilterModalOpen}
                setFiltersEnabled={setFiltersEnabled}
            />

            <LogoutModal
                showLogoutModal={showLogoutModal}
                setShowLogoutModal={setShowLogoutModal}
                onLogout={handleLogout}
            />

            {/* Cancellation Reason Modal */}
            {isCancelModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[24px] w-full max-w-md p-6 lg:p-8 animate-in zoom-in-95 duration-300 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#0f172a]">Cancel Booking</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Reason for cancellation</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide text-left">Tell us why you are canceling</label>
                                <textarea
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    placeholder="e.g. Changed my mind, found another artisan, etc."
                                    className="w-full h-32 px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-600 focus:outline-none font-bold text-slate-700 text-sm resize-none transition-colors"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsCancelModalOpen(false)}
                                    className="flex-1 py-3.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm"
                                >
                                    Go Back
                                </button>
                                <button
                                    onClick={confirmCancelBooking}
                                    disabled={isCancelling || !cancelReason.trim()}
                                    className={`flex-1 py-3.5 bg-red-600 text-white rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 ${isCancelling || !cancelReason.trim() ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
                                >
                                    {isCancelling ? <Loader2 className="animate-spin" size={18} /> : 'Confirm Cancel'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedBooking ? `details-${selectedBooking.id}` : currentView}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 w-full"
                >
                    {selectedBooking ? (
                        <OrderDetailsView
                            booking={selectedBooking}
                            setSelectedBooking={setSelectedBooking}
                            handleCancelBooking={handleCancelBooking}
                            setCurrentChat={setCurrentChat}
                            setCurrentView={setCurrentView}
                            setMessagesViewStep={setMessagesViewStep}
                            setSelectedArtisan={setSelectedArtisan}
                        />
                    ) : (
                        <>
                            {currentView === 'home' && (
                                isInitialProfileLoading ? <DashboardSkeleton type="user-home" /> : (
                                    <HomeView
                                        userProfile={userProfile}
                                        setCurrentView={setCurrentView}
                                        setSettingsStep={setSettingsStep}
                                        setNotificationsViewStep={setNotificationsViewStep}
                                        topArtisans={topArtisans}
                                        loadingTopRated={loadingTopRated}
                                        setIsMenuOpen={setIsMenuOpen}
                                        isMenuOpen={isMenuOpen}
                                        handleCategoryClick={handleCategoryClick}
                                        popularServices={popularServices}
                                        setSearchQuery={setSearchQuery}
                                        loadingPopular={loadingPopular}
                                        onAddressChange={handleAddressChange}
                                        selectedAddressId={selectedAddressId}
                                    />
                                )
                            )}
                            {currentView === 'bookings' && (
                                <BookingsView
                                    bookingsData={bookingsData}
                                    bookingTab={bookingTab}
                                    setBookingTab={setBookingTab}
                                    setSelectedBooking={setSelectedBooking}
                                    setCurrentChat={setCurrentChat}
                                    setMessagesViewStep={setMessagesViewStep}
                                    setCurrentView={setCurrentView}
                                    loadingBookings={loadingBookings}
                                />
                            )}
                            {currentView === 'messages' && (
                                <MessagesView
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
                                    userProfile={userProfile}
                                    bookingsData={bookingsData}
                                />
                            )}
                            {currentView === 'notifications' && (
                                <NotificationsView
                                    notificationsViewStep={notificationsViewStep}
                                    setNotificationsViewStep={setNotificationsViewStep}
                                    selectedNotification={selectedNotification}
                                    setSelectedNotification={setSelectedNotification}
                                    setCurrentView={setCurrentView}
                                />
                            )}
                            {currentView === 'settings' && (
                                <SettingsView
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
                                    setVisibleFaq={setVisibleFaq}
                                    toggleFaq={toggleFaq}
                                    setCurrentView={setCurrentView}
                                    refreshProfile={fetchProfile}
                                />
                            )}
                            {currentView === 'search' && (
                                <SearchView
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    recentSearches={recentSearches}
                                    setRecentSearches={setRecentSearches}
                                    selectedArtisan={selectedArtisan}
                                    setSelectedArtisan={setSelectedArtisan}
                                    isMenuOpen={isMenuOpen}
                                    setIsMenuOpen={setIsMenuOpen}
                                    isFilterModalOpen={isFilterModalOpen}
                                    setIsFilterModalOpen={setIsFilterModalOpen}
                                    setCurrentView={setCurrentView}
                                    isBookingFormOpen={isBookingFormOpen}
                                    setIsBookingFormOpen={setIsBookingFormOpen}
                                    filtersEnabled={filtersEnabled}
                                    setFiltersEnabled={setFiltersEnabled}
                                    popularServices={popularServices}
                                    setPopularServices={setPopularServices}
                                    categories={categories}
                                    loadingCategories={loadingCategories}
                                    categorySkills={categorySkills}
                                    setCategorySkills={setCategorySkills}
                                    searchResults={searchResults}
                                    setSearchResults={setSearchResults}
                                    loadingPopular={loadingPopular}
                                    setLoadingPopular={setLoadingPopular}
                                    loadingSkills={loadingSkills}
                                    setLoadingSkills={setLoadingSkills}
                                    loadingSearch={loadingSearch}
                                    setLoadingSearch={setLoadingSearch}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    selectedSkill={selectedSkill}
                                    setSelectedSkill={setSelectedSkill}
                                    handleCategoryClick={handleCategoryClick}
                                    handleSkillClick={handleSkillClick}
                                    userProfile={userProfile}
                                />
                            )}
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default UserDashboard;
