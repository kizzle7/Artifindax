import React from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { getDetailStatusBadge } from './ArtisanOrderDetailsView';
import fileService from '../../services/fileService';

const ArtisanConfirmCompletionView = ({ booking, onSubmit, notes, setNotes, images, setImages, onBack }) => (
    <div className="animate-in slide-in-from-right-4 duration-500 pb-10">
        <div className="hidden lg:flex items-center justify-between mb-8 pb-4">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-1 -ml-1 text-[#0f172a] active:scale-95 transition-transform cursor-pointer"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Confirm Service Completion</h1>
            </div>
            {getDetailStatusBadge(booking?.status)}
        </div>

        <p className="text-sm text-slate-500 font-bold mb-8">Upload 1-3 images of completed work</p>

        <div className="mb-10">
            <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Add Images(Optional)</h6>
            <div className="grid grid-cols-1 gap-4">
                <input type="file" id="completion-upload" className="hidden" accept="image/*" multiple onChange={async (e) => {
                    if (e.target.files) {
                        const newFiles = Array.from(e.target.files).slice(0, 3 - images.length);
                        try {
                            const uploadPromises = newFiles.map(file => fileService.upload(file));
                            const results = await Promise.all(uploadPromises);
                            const urls = results.map(res => res.data?.url || res.url || res.secure_url).filter(Boolean);
                            setImages([...images, ...urls]);
                        } catch (err) {
                            console.error("Upload failed", err);
                        }
                    }
                }} />
                <div onClick={() => document.getElementById('completion-upload').click()}
                    className="aspect-[4/1] bg-white border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center cursor-pointer hover:border-[#1E4E82] hover:bg-slate-50 transition-all group overflow-hidden">
                    {images.length > 0 ? (
                        <div className="flex gap-2 p-4 w-full h-full overflow-x-auto no-scrollbar">
                            {images.map((img, i) => (
                                <img key={i} src={img} alt="" className="h-full aspect-square object-cover rounded-lg flex-shrink-0" />
                            ))}
                            {images.length < 3 && (
                                <div className="h-full aspect-square border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                                    <Plus size={20} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-gray-400 group-hover:text-[#1E4E82] group-hover:border-[#1E4E82] transition-colors mb-2">
                                <Plus size={24} strokeWidth={2.5} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>

        <div className="mb-10">
            <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 whitespace-nowrap overflow-hidden text-ellipsis">Add job notes or summary (e.g., "Replaced compressor and cleaned filter.")</h6>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Type here..."
                className="w-full h-40 p-5 bg-white border border-slate-200 rounded-[24px] text-slate-700 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#1E4E82]/20 focus:border-[#1E4E82] transition-all resize-none shadow-sm" />
        </div>

        <div className="flex justify-center mt-20">
            <button onClick={onSubmit} className="w-full lg:w-auto px-20 py-4 bg-[#1E4E82] text-white rounded-[16px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all cursor-pointer">
                Submit
            </button>
        </div>
    </div>
);

export default ArtisanConfirmCompletionView;
