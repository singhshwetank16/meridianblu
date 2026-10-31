import React, { useState, useEffect } from 'react';
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  MapPin,
  Mountain,
  Download,
  Camera
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/hotelData';
import { GalleryItem } from '../types';

interface PhotoGalleryProps {
  onSharePhoto?: (item: GalleryItem) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onSharePhoto }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'views' | 'rooms' | 'dining' | 'wellness' | 'outdoors'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredItems.length]);

  const currentPhoto = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-700 mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Alpine Photographic Archive & Vignettes</span>
              <span aria-hidden="true">·</span>
              <span>Visual Estate Records</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 [text-wrap:balance]">
              Atmosphere & Royal Himalayan Splendor
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Capturing the deodar pine mist, restored colonial stone masonry, crackling hearths, and panoramic sunset hues across our mountain estate.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 shadow-sm rounded-2xl self-start md:self-auto text-xs overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Media' },
              { id: 'views', label: 'Panoramic Views' },
              { id: 'rooms', label: 'Suites & Balconies' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'dining', label: 'Dining & Bonfire' },
              { id: 'wellness', label: 'Spa & Bathrooms' },
              { id: 'outdoors', label: 'Outdoors' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-2 font-medium rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Bento Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-slate-200/80 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 shadow-md bg-slate-900 ${
                  isLarge ? 'sm:col-span-2 sm:row-span-2 h-[440px]' : 'h-[280px]'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Elevation Badge */}
                <div className="absolute top-3.5 left-3.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-amber-300 border border-slate-700 flex items-center gap-1 shadow-sm">
                  <Mountain className="w-3 h-3 text-sky-400" />
                  <span>{item.elevation}</span>
                </div>

                {/* Hover zoom trigger */}
                <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <ZoomIn className="w-4 h-4 text-blue-700" />
                </div>

                {/* Bottom caption lockup */}
                <div className="absolute bottom-5 left-5 right-5 space-y-1 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-sky-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{item.location}</span>
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal leading-tight group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  {isLarge && (
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed pt-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Full-Screen Lightbox Modal */}
        {currentPhoto && selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in text-white"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Top Bar inside Lightbox */}
            <div className="flex items-center justify-between text-xs text-slate-300 z-10" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="font-serif text-base sm:text-lg text-white font-medium">{currentPhoto.title}</span>
                <span className="text-slate-600">·</span>
                <span className="text-sky-300">{currentPhoto.location} ({currentPhoto.elevation})</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSharePhoto && onSharePhoto(currentPhoto)}
                  className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Share this photograph"
                >
                  <Share2 className="w-3.5 h-3.5 text-sky-300" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Media Container with Prev / Next Affordances */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null))}
                className="absolute left-2 sm:left-6 z-20 p-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white transition-colors cursor-pointer shadow-xl"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl animate-fade-in"
              />

              <button
                onClick={() => setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null))}
                className="absolute right-2 sm:right-6 z-20 p-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white transition-colors cursor-pointer shadow-xl"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="max-w-2xl mx-auto text-center text-xs text-slate-300 z-10" onClick={(e) => e.stopPropagation()}>
              <p className="leading-relaxed text-sm">{currentPhoto.caption}</p>
              <div className="mt-2 text-[11px] text-slate-400">
                Photo {selectedPhotoIndex + 1} of {filteredItems.length} · Use Arrow Keys ← → to navigate
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
