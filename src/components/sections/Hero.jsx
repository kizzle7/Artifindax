import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import artisan1 from '../../assets/Frame 39.png';
import artisan2 from '../../assets/Frame 1000003987.png';
import mobileArtisan1 from '../../assets/Frame 1000003994.png';
import mobileArtisan2 from '../../assets/Frame 1000003995.png';
import arrowRight from '../../assets/arrow-right.png';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-18 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D6E5F5] text-[#133253] text-[13px] font-medium mb-8">
                            <span>skilled hands, Just a tap away</span>
                            <img src={arrowRight} alt="" className="w-4 h-4 object-contain" />
                        </div>

                        <h1 className="text-5xl lg:text-4xl font-semibold text-[#0B0C0F] mb-6 leading-tight">
                            Find Skilled Artisans <br />
                            <span className="text-[#1E4E82]">Near You</span>
                        </h1>

                        <p className="text-[17px] text-[#404A59] mb-10 leading-relaxed max-w-xl">
                            Connect with skilled artisans for all your repairs, home improvement, and everyday services. Trusted, reliable, and affordable.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-xl">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl outline-none text-[#404A59] border border-gray-300 transition-all"
                                />
                            </div>
                            <Button
                                variant="plain"
                                className="py-4 px-8 bg-[#D6E5F5] text-[#1E4E82] rounded-xl shadow-lg border-none"
                            >
                                Join waitlist
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 mb-10">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 cursor-pointer" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 cursor-pointer" />
                        </div>

                        {/* Mobile Side-by-Side Images */}
                        <div className="grid grid-cols-2 gap-2 lg:hidden mt-8 -mx-6">
                            <img
                                src={mobileArtisan1}
                                alt="Artisan 1"
                                className="w-full aspect-[3/5] object-cover"
                            />
                            <img
                                src={mobileArtisan2}
                                alt="Artisan 2"
                                className="w-full aspect-[3/5] object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-[4/5] max-w-[500px] ml-auto">
                            {/* Top image - shifting up to overlay/intersect nav area */}
                            <div className="absolute -top-20 right-0 w-[70%] z-20 transition-transform hover:scale-105 duration-500">
                                <img
                                    src={artisan1}
                                    alt="Worker"
                                    className="w-full h-auto"
                                />
                            </div>
                            {/* Bottom image */}
                            <div className="absolute top-104 right-0 w-[70%] z-10 -translate-y-10 group transition-transform hover:scale-110 duration-500">
                                <img
                                    src={artisan2}
                                    alt="Tools"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-[#dbeafe]/30 rounded-full blur-[120px] -z-10" />
        </section>
    );
};

export default Hero;
