import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ServicesGrid from '../components/sections/Services';
import { Partners, Reviews, HowItWorksBanner } from '../components/sections/ReviewsAndMore';
import { Steps, StaySafe, ArtisanPartner, Questions } from '../components/sections/FinalSteps';

const LandingPage = () => {
    return (
        <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0f172a]">
            <Navbar />
            <main>
                <Hero />
                <ServicesGrid />
                <Partners />
                <Reviews />
                <HowItWorksBanner />
                <Steps />
                <StaySafe />
                <ArtisanPartner />
                <Questions />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
