import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { setKey, fromLatLng } from 'react-geocode';

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
    NOTIFICATIONS,
    MESSAGES
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

const GEOCODE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
setKey(GEOCODE_API_KEY);

const UserDashboard = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('home');
    const [bookingTab, setBookingTab] = useState('active');
    const [bookingsData, setBookingsData] = useState(BOOKINGS);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Notifications State
    const [notificationsViewStep, setNotificationsViewStep] = useState('list');
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Messages & Payment State
    const [messagesViewStep, setMessagesViewStep] = useState('list');
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

    useEffect(() => {
        const fetchPopular = async () => {
            if (popularServices.length > 0) return;
            setLoadingPopular(true);
            try {
                const data = await categoryService.getPopularServices();
                setPopularServices(data);
            } catch (err) {
                console.error("Failed to load popular services:", err);
            } finally {
                setLoadingPopular(false);
            }
        };

        const fetchCategories = async () => {
            if (categories.length > 0) return;
            setLoadingCategories(true);
            try {
                const data = await categoryService.getCategories();
                setCategories(Array.isArray(data) ? data : (data.content || []));
            } catch (err) {
                console.error("Failed to load categories:", err);
            } finally {
                setLoadingCategories(false);
            }
        };

        const fetchTopRated = async () => {
            setLoadingTopRated(true);
            try {
                let lat = 0, lng = 0, resolvedAddress = "";

                const savedLocation = authService.getLocation();
                if (savedLocation && savedLocation.latitude && savedLocation.longitude) {
                    lat = savedLocation.latitude;
                    lng = savedLocation.longitude;
                    resolvedAddress = savedLocation.address || "";
                } else {
                    const getUserCoords = () => new Promise((resolve) => {
                        if (!navigator.geolocation) return resolve({ lat: 0, lng: 0 });
                        navigator.geolocation.getCurrentPosition(
                            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                            () => resolve({ lat: 0, lng: 0 }),
                            { timeout: 5000 }
                        );
                    });
                    const coords = await getUserCoords();
                    lat = coords.lat;
                    lng = coords.lng;

                    if (lat !== 0 && lng !== 0) {
                        try {
                            const geoRes = await fromLatLng(lat, lng);
                            resolvedAddress = geoRes.results[0]?.formatted_address || "";
                        } catch (geoErr) {
                            console.warn("Reverse geocode failed:", geoErr);
                        }
                    }
                }

                const searchPayload = {
                    categorySkillId: 1,
                    categoryId: 1,
                    location: {
                        address: resolvedAddress || "52 oriola street ketu Lagos",
                        latitude: lat || 6.5916,
                        longitude: lng || 3.39621,
                    },
                    serviceMode: "HOME_SERVICE",
                    topArtisans: true
                };
                const queryParams = {
                    page: 1,
                    size: 10
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
        };

        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile();
                // Map API data to UI state
                const account = data.accounts?.find(acc => acc.accountType === 'CUSTOMER') || data.accounts?.[0];

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
                console.error("Failed to load user profile:", err);
            }
        };

        fetchPopular();
        fetchCategories();
        fetchTopRated();
        fetchProfile();
    }, []);

    const handleLogout = () => {
        authService.clearToken();
        navigate('/login');
    };

    const handleCancelBooking = (bookingId) => {
        setBookingsData(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'canceled', type: 'canceled' } : b));
        setSelectedBooking(null);
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
            let lat = 0, lng = 0, resolvedAddress = "";

            const savedLocation = authService.getLocation();
            if (savedLocation && savedLocation.latitude && savedLocation.longitude) {
                lat = savedLocation.latitude;
                lng = savedLocation.longitude;
                resolvedAddress = savedLocation.address || "";
            } else {
                const getUserCoords = () => new Promise((resolve) => {
                    if (!navigator.geolocation) return resolve({ lat: 0, lng: 0 });
                    navigator.geolocation.getCurrentPosition(
                        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                        () => resolve({ lat: 0, lng: 0 }),
                        { timeout: 5000 }
                    );
                });
                const coords = await getUserCoords();
                lat = coords.lat;
                lng = coords.lng;

                if (lat !== 0 && lng !== 0) {
                    try {
                        const geoRes = await fromLatLng(lat, lng);
                        resolvedAddress = geoRes.results[0]?.formatted_address || "";
                    } catch (geoErr) {
                        console.warn("Reverse geocode failed:", geoErr);
                    }
                }
            }

            const searchPayload = {
                categorySkillId: skill.id,
                categoryId: selectedCategory?.id,
                location: {
                    address: resolvedAddress,
                    latitude: lat,
                    longitude: lng,
                },
                serviceMode: "HOME_SERVICE",
                topArtisans: true
            };
            const queryParams = {
                page: 1,
                size: 10
            };
            console.log("[Dashboard] Triggering skill search (POST)...");
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
                        />
                    ) : (
                        <>
                            {currentView === 'home' && (
                                <HomeView
                                    userProfile={userProfile}
                                    setCurrentView={setCurrentView}
                                    setNotificationsViewStep={setNotificationsViewStep}
                                    topArtisans={topArtisans}
                                    loadingTopRated={loadingTopRated}
                                    setIsMenuOpen={setIsMenuOpen}
                                    isMenuOpen={isMenuOpen}
                                    handleCategoryClick={handleCategoryClick}
                                    popularServices={popularServices}
                                    setSearchQuery={setSearchQuery}
                                    loadingPopular={loadingPopular}
                                />
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
