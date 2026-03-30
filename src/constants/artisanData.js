// Mock Data for Charts
export const earningsData = [
    { name: 'Mon', jan: 45, feb: 35, mar: 55 },
    { name: 'Tue', jan: 52, feb: 42, mar: 65 },
    { name: 'Wed', jan: 48, feb: 50, mar: 75 },
    { name: 'Thur', jan: 65, feb: 60, mar: 50 },
    { name: 'Fri', jan: 45, feb: 38, mar: 60 },
    { name: 'Sat', jan: 55, feb: 45, mar: 65 },
    { name: 'Sun', jan: 62, feb: 52, mar: 85 },
];

export const workStatsData = [
    { name: 'Completed', value: 241, color: '#818CF8' },
    { name: 'Accepted', value: 258, color: '#38BDF8' },
    { name: 'Cancelled', value: 17, color: '#F87171' },
];

export const NOTIFICATIONS = [
    { id: 1, title: 'New Booking Request', description: 'Ayomide Falokun has requested a plumbing service for 2:00 PM today.', time: '2:45pm', date: 'today', dot: true, type: 'urgent' },
    { id: 2, title: 'Payment Received', description: 'Your invoice for #001345 has been paid successfully.', time: '11:20am', date: 'yesterday', dot: false, type: 'payment' },
    { id: 3, title: 'System Update', description: "We've improved our navigation system for better experience.", time: '9:00am', date: '2 days ago', dot: false, type: 'info' },
];



export const USER_PROFILE = {
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

export const FAQ_DATA = [
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

export const ARTISAN_BOOKINGS = [
    {
        id: '#001345',
        title: 'AC Repair',
        status: 'urgent',
        shortDescription: 'My AC is leaking water into my room and making a weird loud noise and i need it fixed as soon as possible.',
        customer: {
            name: 'Nike',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
            phone: '08012345678',
            email: 'nike@example.com'
        },
        address: '17 Ajao Rd, Ikeja, Lagos, Nigeria',
        time: { from: '14 : 00 pm', to: '16 : 00 pm' },
        date: '16th June, 2025',
        serviceMode: 'Home Service',
        payment: {
            items: [
                { label: 'AC Repair', amount: 5800 },
                { label: 'New fuse', amount: 1200 }
            ],
            serviceCharge: 900,
            discount: 0,
            total: 7900
        }
    },
    {
        id: '#001346',
        title: 'Electrical Wiring',
        status: 'scheduled',
        shortDescription: 'Installing new wiring for the kitchen area.',
        customer: {
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
            phone: '08098765432',
            email: 'john@example.com'
        },
        address: '52 Allen Avenue, Ikeja, Lagos',
        time: { from: '10 : 00 am', to: '12 : 00 pm' },
        date: '17th June, 2025',
        serviceMode: 'Home Service',
        payment: {
            items: [{ label: 'Wiring', amount: 12000 }],
            serviceCharge: 1500,
            discount: 500,
            total: 13000
        }
    },
    {
        id: '#001347',
        title: 'Fan Repair',
        status: 'ongoing',
        shortDescription: 'Ceiling fan not rotating.',
        customer: {
            name: 'Sarah Smith',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
            phone: '08055555555',
            email: 'sarah@example.com'
        },
        address: '12 Opebi Rd, Ikeja, Lagos',
        time: { from: '09 : 00 am', to: '11 : 00 am' },
        date: '15th June, 2025',
        serviceMode: 'Home Service',
        payment: {
            items: [{ label: 'Repair', amount: 3500 }],
            serviceCharge: 500,
            discount: 0,
            total: 4000
        }
    },
    {
        id: '#001348',
        title: 'Inverter Setup',
        status: 'completed',
        shortDescription: 'Setup 5KVA inverter system.',
        customer: {
            name: 'Mike Cole',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
            phone: '08122222222',
            email: 'mike@example.com'
        },
        address: '8 Victoria Island, Lagos',
        time: { from: '12 : 00 pm', to: '04 : 00 pm' },
        date: '10th June, 2025',
        serviceMode: 'Home Service',
        payment: {
            items: [{ label: 'Installation', amount: 45000 }],
            serviceCharge: 5000,
            discount: 2000,
            total: 48000
        }
    },
    {
        id: '#001349',
        title: 'TV Mounting',
        status: 'canceled',
        shortDescription: 'Wall mount 65 inch OLED TV.',
        customer: {
            name: 'Alice Wong',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
            phone: '08033333333',
            email: 'alice@example.com'
        },
        address: '22 Lekki Phase 1, Lagos',
        time: { from: '11 : 00 am', to: '12 : 00 pm' },
        date: '12th June, 2025',
        serviceMode: 'Home Service',
        payment: {
            items: [{ label: 'Mounting', amount: 8000 }],
            serviceCharge: 1000,
            discount: 0,
            total: 9000
        }
    }
];
