import React from 'react';

const SubscriptionSkeleton = ({ type = 'overview' }) => {
    if (type === 'plans') {
        return (
            <div className="space-y-8 pb-20 animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                </div>

                <div className="flex justify-center">
                    <div className="bg-slate-100 p-1 rounded-full flex gap-1 w-64 h-12" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm flex flex-col h-[500px]">
                            <div className="bg-slate-100 h-40" />
                            <div className="p-8 space-y-6 flex-1">
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
                                <div className="mt-auto pt-8">
                                    <div className="h-14 w-full bg-slate-200 rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Default: Overview
    return (
        <div className="space-y-6 pb-20 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-slate-100 lg:hidden" />
                <div className="h-8 w-48 bg-slate-200 rounded-lg" />
            </div>

            {/* Current Plan Card Skeleton */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 flex items-center justify-between">
                <div className="space-y-3">
                    <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                    </div>
                </div>
                <div className="h-10 w-28 bg-slate-100 rounded-xl" />
            </div>

            {/* Apply Boost Card Skeleton */}
            <div className="bg-slate-100 rounded-[24px] p-6 flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0" />
                    <div className="space-y-2">
                        <div className="h-6 w-32 bg-slate-200 rounded" />
                        <div className="h-4 w-48 bg-slate-200 rounded" />
                    </div>
                </div>
                <div className="h-10 w-28 bg-slate-200 rounded-xl" />
            </div>

            {/* History Skeleton */}
            <div className="pt-4">
                <div className="h-6 w-40 bg-slate-200 rounded-lg mb-4" />
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-full" />
                                <div className="space-y-2">
                                    <div className="h-4 w-24 bg-slate-100 rounded" />
                                    <div className="h-3 w-32 bg-slate-50 rounded" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="h-4 w-16 bg-slate-100 rounded" />
                                <div className="h-4 w-12 bg-slate-50 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSkeleton;
