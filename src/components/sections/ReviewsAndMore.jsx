import React from 'react';

const Partners = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h3 className="text-xl font-bold text-[#0f172a] mb-12">Our valued business partners</h3>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 transition-all duration-500">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="w-24 h-24 bg-[#64748B] rounded-md" /> /* Placeholder logos */
                    ))}
                </div>
            </div>
        </section>
    );
};

import { useRef, useState, useEffect } from 'react';
import arrowRight from '../../assets/arrow-rights.png';

const ReviewCard = ({ name, role, text, img }) => (
    <div className="flex-shrink-0 w-[78vw] md:w-[500px] h-full bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
                <h4 className="font-bold text-[#0f172a] text-sm md:text-base">{name}</h4>
                <p className="text-xs md:text-sm text-[#133253] font-medium">{role}</p>
            </div>
            <img src={img} alt={name} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover" />
        </div>
        <p className="text-[#404A59] text-xs md:text-sm leading-relaxed italic flex-grow">"{text}"</p>
    </div>
);

const Reviews = () => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const reviews = [
        {
            name: 'Jide Ogundipe',
            role: 'Lagos, Nigeria',
            text: 'The artisan I hired via Artifinda was professional, skillful, and exceptionally polite. Truly the best service platform I have used in recent memory!',
            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
        },
        {
            name: 'Fatima Bello',
            role: 'Abuja, Nigeria',
            text: 'Artifinda helped me find a talented tailor for my bridal train on short notice. Fast, reliable, and connected me with a professional who exceeded my expectations.',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        },
        {
            name: 'Jide Ogundipe',
            role: 'Lagos, Nigeria',
            text: 'The artisan I hired via Artifinda was professional, skillful, and exceptionally polite. Truly the best service platform I have used in recent memory!',
            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
        },
        {
            name: 'Fatima Bello',
            role: 'Abuja, Nigeria',
            text: 'Artifinda helped me find a talented tailor for my bridal train on short notice. Fast, reliable, and connected me with a professional who exceeded my expectations.',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
                const index = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (reviews.length - 1));
                if (index >= 0 && index < reviews.length) {
                    setActiveIndex(index);
                }
            }
        };

        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [reviews.length]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section id="reviews" className="bg-white relative">
            <div className="max-w-6xl mx-auto px-6 mb-12">
                <h2 className="text-[28px] font-semibold text-[#0B0C0F] text-center">Reviews</h2>
            </div>

            <div className="relative overflow-hidden mb-12">
                <div
                    ref={scrollRef}
                    className="flex gap-4 md:gap-8 overflow-x-auto pb-8 items-stretch px-8 md:px-[calc((100vw-1152px)/2)] scrollbar-hide snap-x snap-mandatory flex-nowrap"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {reviews.map((r, i) => (
                        <div key={i} className="snap-center shrink-0 self-stretch">
                            <ReviewCard {...r} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation: Indicators and Button */}
            <div className="max-w-6xl mx-auto px-6 relative flex items-center justify-center">
                {/* Dynamic Indicators */}
                <div className="flex justify-center gap-2">
                    {reviews.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all duration-300 rounded-full h-1 ${activeIndex === i ? 'w-6 bg-[#1E4E82]' : 'w-1 font-bold bg-[#C4CBD4]'
                                }`}
                        />
                    ))}
                </div>

                {/* Arrow Button at extreme right */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-6 p-3 rounded-full "
                >
                    <img src={arrowRight} alt="Next" className="w-5 h-5 object-contain" />
                </button>
            </div>
        </section>
    );
};

import bannerImg from '../../assets/Frame 1000004285.png';

const HowItWorksBanner = () => (
    <section id="how-it-works" className="mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-[28px] font-semibold text-[#2B323B]">How it Works</h2>
        </div>
        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] lg:-mt-16">
            <div className="absolute inset-0">
                <img
                    src={bannerImg}
                    alt="Happy Artisans"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    </section>
);

export { Partners, Reviews, HowItWorksBanner };
