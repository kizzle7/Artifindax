import React from 'react';

const SearchSkeleton = ({ type = 'category' }) => {
    if (type === 'category') {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-gray-100 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-slate-200" />
                        <div className="h-3 w-16 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>
        );
    }
    if (type === 'skill') {
        return (
            <div className="flex flex-wrap gap-2 mb-8 animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="px-5 py-3 h-8 w-20 bg-slate-100 rounded-full" />
                ))}
            </div>
        );
    }
    return (
        <div className="space-y-4 pb-20">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between shadow-sm animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-100 shrink-0" />
                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-slate-100 rounded" />
                            <div className="h-3 w-48 bg-slate-50 rounded" />
                        </div>
                    </div>
                    <div className="h-6 w-16 bg-slate-50 rounded lg:self-end" />
                </div>
            ))}
        </div>
    );
};

export default SearchSkeleton;
