import React from 'react';
import imgChair from '../../assets/material-symbols-light--chair-outline 1 (1).png';
import imgCleaning from '../../assets/material-symbols-light--cleaning-bucket-outline 1 (1).png';
import imgComputer from '../../assets/material-symbols-light--computer-outline-rounded 1 (1).png';
import imgTruck from '../../assets/material-symbols-light--delivery-truck-bolt-outline-rounded 1 (1).png';
import imgPlant from '../../assets/material-symbols-light--potted-plant-outline-rounded 1 (1).png';
import imgDrill from '../../assets/material-symbols-light--tools-power-drill-outline 1 (1).png';
import arrowRight from '../../assets/arrow-rights.png';

const ServiceCard = ({ image, title, textColor }) => {
    return (
        <div className="group cursor-pointer bg-white rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 shadow-sm">
            <div className="mb-4 flex items-center justify-center">
                <img src={image} alt={title} className="w-12 h-12 object-contain transition-all scale-90 group-hover:scale-100" />
            </div>
            <h3 className={`text-center font-bold text-xs md:text-sm transition-colors ${textColor}`}>
                {title}
            </h3>
        </div>
    );
};

const ServicesGrid = () => {
    const baseServices = [
        { image: imgComputer, title: 'Plumbing', textColor: 'text-[#1E40AF]' },
        { image: imgDrill, title: 'Repairs', textColor: 'text-[#059668]' },
        { image: imgPlant, title: 'Gardening', textColor: 'text-[#DA5D5D]' },
        { image: imgChair, title: 'Woodwork', textColor: 'text-[#D09617]' },
        { image: imgCleaning, title: 'Cleaning', textColor: 'text-[#7D28AE]' },
        { image: imgTruck, title: 'Deliveries', textColor: 'text-[#E65C83]' },
    ];

    // Create the reversed version for the second row
    const reversedServices = [...baseServices].reverse();

    // Combine for a total of 12 services (6 up, 6 down)
    const services = [...baseServices, ...reversedServices];

    return (
        <section id="services" className="bg-white -mt-16 lg:-mt-14 relative z-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="relative flex items-center justify-center mb-12">
                    <h2 className="text-3xl font-bold text-[#0B0C0F]">Services</h2>
                    <button className="absolute right-0 text-[13px] text-[#133253] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        View all <img src={arrowRight} alt="" className="w-3 h-3 object-contain" />
                    </button>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10">
                    {services.map((s, i) => (
                        <ServiceCard key={i} {...s} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
