import {
    SprayCan, Droplets, PlugZap, Car, PaintRoller, Smartphone, Armchair, Trees
} from 'lucide-react';

export const CATEGORIES = [
    { id: 'cleaning', label: 'Cleaning', icon: SprayCan, color: '#fcf0ff', iconColor: '#9333ea' },
    { id: 'plumbing', label: 'Plumbing', icon: Droplets, color: '#e0f2fe', iconColor: '#0ea5e9' },
    { id: 'electronics', label: 'Electronics', icon: PlugZap, color: '#fee2e2', iconColor: '#ef4444' },
    { id: 'automobile', label: 'Automobile', icon: Car, color: '#f0fdf4', iconColor: '#22c55e' },
    { id: 'painting', label: 'Painting', icon: PaintRoller, color: '#fef3c7', iconColor: '#f59e0b' },
    { id: 'gadget', label: 'Gadget Repairs', icon: Smartphone, color: '#ede9fe', iconColor: '#8b5cf6' },
    { id: 'carpenter', label: 'Carpenter', icon: Armchair, color: '#ffedd5', iconColor: '#f97316' },
    { id: 'gardening', label: 'Gardening', icon: Trees, color: '#ecfdf5', iconColor: '#10b981' },
];

export const POPULAR_SERVICES = [
    { id: 1, title: 'Office Cleaning', price: '1000', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'Sink repair', price: '1000', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
    { id: 3, title: 'Solar Installation', price: '10000', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400' },
];

export const USER_PROFILE = {
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    dob: '',
    email: '',
    addresses: [
        { id: 1, type: 'Home', address: '', isDefault: true, status: 'verified' }
    ]
};

export const BOOKINGS = [
    { id: '#001345', title: 'AC Repair', status: 'scheduled', date: '24th June, 2025', time: '12:00pm', address: '14 Selsun Street, Maitama, Abuja', artisan: 'Chinedu Eze', artisanRole: 'Electrician', artisanRating: 4.8, artisanReviews: 120, artisanLocation: 'Ikorodu, Lagos', price: '5800', type: 'active' },
    { id: '#001346', title: 'AC Repair', status: 'scheduled', date: '24th June, 2025', time: '12:00pm', address: '14 Selsun Street, Maitama, Abuja', artisan: 'Janet Oge', artisanRole: 'Electrician', artisanRating: 4.8, artisanReviews: 120, price: '5800', type: 'active', isVerified: true },
    { id: 4, artisan: 'Janet Oge', artisanRole: 'Electrician', artisanRating: 4.8, status: 'canceled', service: 'AC Repair', date: '24th June, 2025', time: '12:00pm', idTag: '#001345', price: 7900 },
];

export const MESSAGES = [
    { id: 1, artisan: 'Chinedu Eze', lastMessage: 'Good day ma! I have left the old scre...', time: '12:00 PM', unread: 1, hasInvoice: false, location: 'Ikorodu, Lagos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { id: 2, artisan: 'Chinedu Eze', lastMessage: 'Invoice sent for the AC Repair', time: '12:00 PM', unread: 1, hasInvoice: true, location: 'Ikorodu, Lagos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { id: 3, artisan: 'Janet Oge', lastMessage: 'I will be there by 10am tomorrow', time: 'Yesterday', unread: 0, hasInvoice: false, location: 'Maitama, Abuja', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
];

export const NOTIFICATIONS = [
    { id: 1, title: 'Booking Confirmed', description: 'Ifeanyi Okonkwo has confirmed your plumbing service for 2:00 PM today.', time: '2:45pm', date: 'today', dot: true, type: 'confirmed' },
    { id: 2, title: 'Artisan is on their way', description: 'Amina Yusuf is en route to your location. Get ready!.', time: '9:35am', date: '09/06', dot: true, type: 'on_way' },
    { id: 3, title: 'Service Reminder', description: 'You have a scheduled cleaning service tomorrow at 10:00 AM.', time: '9:35am', date: '09/06', dot: false, type: 'reminder' },
    { id: 4, title: 'Leave a Review', description: 'Rate your recent service with Chinyere Nwankwo to help others.', time: '3:25pm', date: '09/06', dot: false, type: 'review', rating: 4.8 }
];

export const BANNERS = [
    { title: 'Get 15% off', sub: 'your first order', tag: 'New User', color: 'bg-[#F9D4A1]', icon: '🎫' },
    { title: 'FREE QUOTES', sub: 'No booking fees on all orders', tag: 'Weekend deal', color: 'bg-[#9882C7]', icon: '🏷️' },
    { title: 'Get 5% off', sub: 'on your 5th order', tag: 'New User', color: 'bg-[#C7E9C7]', icon: '💎' },
];

export const FAQ_DATA = [
    { id: 1, category: 'General', q: "What is Artifinda?", a: "Artifinda is a platform that connects you with skilled artisans for your home and office needs." },
    { id: 2, category: 'General', q: "Is Artifinda available in my city?", a: "We are currently operating in major cities across Nigeria and expanding rapidly." },
    { id: 3, category: 'Account & Profile', q: "How do I create an account?", a: "Simply click the sign-up button on the landing page and follow the prompts." },
    { id: 4, category: 'Account & Profile', q: "How do I verify my account?", a: "Go to settings, then addresses to upload your verification documents." },
    { id: 5, category: 'Account & Profile', q: "Can I change my profile information?", a: "Yes, you can update your details in the Profile section of your settings." },
    { id: 6, category: 'Account & Profile', q: "How do I change my password?", a: "Navigate to Settings > Change Password to update your login credentials." },
    { id: 7, category: 'Account & Profile', q: "How do I switch to an artisan account?", a: "You can apply to be an artisan from your profile settings page." },
    { id: 8, category: 'Account & Profile', q: "What if I forgot my password?", a: "Use the 'Forgot Password' link on the login page to reset it via email." },
    { id: 9, category: 'Bookings', q: "How do I book an artisan?", a: "Search for a service, pick an artisan, and click the 'Book Now' button." },
    { id: 10, category: 'Bookings', q: "Can I cancel or reschedule my booking?", a: "Yes, you can do this from the Bookings tab before the artisan starts the job." },
    { id: 11, category: 'Bookings', q: "How do I pay for services?", a: "You can pay via card, bank transfer, or USSD through our secure payment gateway." },
    { id: 12, category: 'Bookings', q: "What if I'm not satisfied with the service?", a: "You can raise a dispute or contact support if the work doesn't meet requirements." },
    { id: 13, category: 'Bookings', q: "How do I track my booking?", a: "Real-time tracking is available in the 'Order Details' view once the artisan is en route." },
    { id: 14, category: 'Bookings', q: "Can I communicate with the artisan?", a: "Yes, use the built-in chat feature to talk with your assigned artisan." },
    { id: 15, category: 'Bookings', q: "What happens if the artisan doesn't show up?", a: "Contact support immediately for a reschedule or a full refund." },
    { id: 16, category: 'Payments', q: "Is payment safe?", a: "Yes, we use industry-standard encryption to protect your financial data." },
];
