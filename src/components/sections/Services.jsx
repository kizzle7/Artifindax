import React, { useState, useEffect } from 'react';
import arrowRight from '../../assets/arrow-rights.png';
import serviceService from '../../services/serviceService';

const ServiceCard = ({ image, title, color }) => {
    // Ensure color is visible on white background
    const textColor = color && color.toLowerCase() !== '#ffffff' ? color : '#1e4e82';

    return (
        <div className="group cursor-pointer bg-white rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 shadow-sm h-full">
            <div className="mb-4 flex items-center justify-center h-16 w-16">
                <img src={image} alt={title} className="max-w-full max-h-full object-contain transition-all scale-90 group-hover:scale-100 rounded-lg" />
            </div>
            <h3 className="text-center font-bold text-xs md:text-sm transition-colors mt-auto" style={{ color: textColor }}>
                {title}
            </h3>
        </div>
    );
};

const ServicesGrid = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await serviceService.getPopularServices();
                // Map the API data: name and category.image
                const mappedServices = data.slice(0, 12).map(item => ({
                    image: item.category?.image || item.category?.icon || '',
                    title: item.name || item.category?.name || 'Service',
                    color: item.category?.color || '#1e4e82'
                }));
                setServices(mappedServices);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch services:', err);
                setError('Failed to load services');
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <section id="services" className="bg-white -mt-16 lg:-mt-14 relative z-20">
                <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E4E82]"></div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="services" className="bg-white -mt-16 lg:-mt-14 relative z-20">
                <div className="max-w-6xl mx-auto px-6 py-20 text-center text-red-500 font-medium">
                    {error}
                </div>
            </section>
        );
    }

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
