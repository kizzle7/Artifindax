import React from 'react';

const DashboardSkeleton = ({ type = 'home' }) => {
    // Utility for pulsing effect
    const pulse = "animate-pulse bg-slate-100 rounded-xl";

    if (type === 'home') {
        return (
            <div className="space-y-6 animate-pulse">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200" />
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-slate-200 rounded" />
                            <div className="h-3 w-32 bg-slate-100 rounded" />
                        </div>
                    </div>
                </div>

                {/* Availability Toggle Skeleton */}
                <div className="flex items-center justify-between py-2">
                    <div className="h-3 w-20 bg-slate-100 rounded" />
                    <div className="w-12 h-6 bg-slate-200 rounded-full" />
                </div>

                {/* Balance Card Skeleton */}
                <div className="bg-slate-800 rounded-[24px] p-6 h-32 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="h-3 w-24 bg-slate-700 rounded" />
                        <div className="w-6 h-6 rounded-full bg-slate-700" />
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="h-8 w-40 bg-slate-700 rounded" />
                        <div className="h-10 w-24 bg-slate-700 rounded-xl" />
                    </div>
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 h-32 flex flex-col justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-slate-100" />
                                <div className="h-3 w-16 bg-slate-100 rounded" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="h-8 w-10 bg-slate-200 rounded" />
                                <div className="w-6 h-6 rounded-full bg-slate-100" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart Skeletons */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 h-[300px] flex flex-col gap-4">
                    <div className="flex justify-between">
                        <div className="h-4 w-20 bg-slate-100 rounded" />
                        <div className="h-8 w-24 bg-slate-50 rounded-lg" />
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-[18px]" />
                </div>
            </div>
        );
    }

    if (type === 'bookings') {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="h-8 w-32 bg-slate-200 rounded-lg mb-6 hidden lg:block" />
                
                {/* Tabs Skeleton */}
                <div className="flex gap-8 border-b border-gray-100 mb-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-4 w-16 bg-slate-100 rounded mb-3" />
                    ))}
                </div>

                {/* Booking Cards Skeleton */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-[24px] p-5 space-y-4 shadow-sm">
                        <div className="flex justify-between">
                            <div className="space-y-2">
                                <div className="h-3 w-16 bg-slate-100 rounded" />
                                <div className="h-5 w-48 bg-slate-200 rounded" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-100" />
                        </div>
                        <div className="h-4 w-full bg-slate-50 rounded" />
                        <div className="flex gap-4">
                            <div className="h-4 w-24 bg-slate-100 rounded" />
                            <div className="h-4 w-24 bg-slate-100 rounded" />
                        </div>
                        <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-xl bg-slate-50" />
                                <div className="w-8 h-8 rounded-xl bg-slate-50" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'subscription-plans') {
        return (
            <div className="space-y-8 pb-20 animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                </div>
                <div className="flex justify-center">
                    <div className="bg-slate-100 p-1 rounded-full w-64 h-12" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 h-[500px]">
                            <div className="bg-slate-100 h-40" />
                            <div className="p-8 space-y-6">
                                <div className="h-4 w-full bg-slate-100 rounded" />
                                <div className="h-4 w-3/4 bg-slate-50 rounded" />
                                <div className="space-y-4 pt-4">
                                    {[...Array(5)].map((_, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-slate-100" />
                                            <div className="h-3 w-32 bg-slate-50 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'user-home') {
        return (
            <div className="space-y-6 animate-pulse p-4 lg:ml-[240px] pt-16 lg:pt-10">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100" />
                        <div className="space-y-1">
                            <div className="h-4 w-24 bg-slate-200 rounded" />
                            <div className="h-2 w-32 bg-slate-100 rounded" />
                        </div>
                    </div>
                </div>

                {/* Search Bar Skeleton */}
                <div className="h-10 w-full bg-white rounded-2xl border border-gray-100" />

                {/* Banner Carousel Skeleton */}
                <div className="flex gap-4 overflow-hidden">
                    <div className="min-w-[260px] h-[130px] bg-slate-100 rounded-[20px]" />
                    <div className="min-w-[260px] h-[130px] bg-slate-50 rounded-[12px]" />
                </div>

                {/* Categories Grid Skeleton */}
                <div className="space-y-4">
                    <div className="h-3 w-32 bg-slate-200 rounded" />
                    <div className="grid grid-cols-4 gap-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-50 h-24">
                                <div className="w-10 h-10 rounded-full bg-slate-50" />
                                <div className="h-2 w-12 bg-slate-100 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Rated List Skeleton */}
                <div className="space-y-4">
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white p-3.5 rounded-[16px] border border-gray-100 flex items-center gap-3.5 h-16">
                                <div className="w-10 h-10 rounded-full bg-slate-50" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-32 bg-slate-200 rounded" />
                                    <div className="h-2 w-24 bg-slate-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'user-bookings') {
        return (
            <div className="flex-1 p-4 lg:ml-[240px] pt-16 lg:pt-10 animate-pulse space-y-6">
                <div className="h-4 w-24 bg-slate-200 rounded hidden lg:block" />
                <div className="flex gap-5 border-b border-gray-50 pb-2">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-3 w-16 bg-slate-100 rounded" />
                    ))}
                </div>
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white border border-gray-50 rounded-[14px] p-4 space-y-3 h-32">
                            <div className="flex justify-between">
                                <div className="h-3 w-12 bg-slate-50 rounded" />
                                <div className="w-4 h-4 bg-slate-50 rounded-full" />
                            </div>
                            <div className="h-4 w-48 bg-slate-200 rounded" />
                            <div className="flex gap-4">
                                <div className="h-2 w-20 bg-slate-50 rounded" />
                                <div className="h-2 w-20 bg-slate-50 rounded" />
                            </div>
                            <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-50" />
                                    <div className="h-3 w-20 bg-slate-50 rounded" />
                                </div>
                                <div className="h-4 w-12 bg-slate-50 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'user-category') {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm" />
                        <div className="h-3 w-16 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'user-skill') {
        return (
            <div className="flex flex-wrap gap-2 mb-8 animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="px-5 py-2.5 h-8 w-24 bg-slate-50 border border-gray-50 rounded-full" />
                ))}
            </div>
        );
    }

    if (type === 'user-results') {
        return (
            <div className="space-y-4 pb-20 animate-pulse">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-slate-100 shrink-0" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-slate-200 rounded" />
                                <div className="h-3 w-48 bg-slate-100 rounded" />
                            </div>
                        </div>
                        <div className="h-8 w-10 bg-slate-50 rounded-lg" />
                    </div>
                ))}
            </div>
        );
    }

    // Default: subscription-overview
    return (
        <div className="space-y-6 pb-20 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-slate-100 lg:hidden" />
                <div className="h-8 w-48 bg-slate-200 rounded-lg" />
            </div>
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 flex justify-between items-center">
                <div className="space-y-3">
                    <div className="h-3 w-24 bg-slate-100 rounded" />
                    <div className="h-6 w-32 bg-slate-200 rounded" />
                </div>
                <div className="h-10 w-28 bg-slate-100 rounded-xl" />
            </div>
            <div className="bg-slate-200 rounded-[24px] p-6 h-32" />
            <div className="pt-4 space-y-4">
                <div className="h-6 w-40 bg-slate-200 rounded-lg" />
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-4 flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-100" />
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                                <div className="h-3 w-32 bg-slate-50 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardSkeleton;
