import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  TrendingUp,
  Mountain,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Navigation,
  Backpack,
  Share2
} from 'lucide-react';
import { TRAILS_DATA, HOTEL_INFO } from '../data/hotelData';
import { TrailAttraction } from '../types';

interface TrailMapGuideProps {
  onRequestGuide?: (trail: TrailAttraction) => void;
  onShareTrail?: (trail: TrailAttraction) => void;
}

export const TrailMapGuide: React.FC<TrailMapGuideProps> = ({
  onRequestGuide,
  onShareTrail,
}) => {
  const [selectedTrail, setSelectedTrail] = useState<TrailAttraction>(TRAILS_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'trek' | 'heritage' | 'viewpoint' | 'nature'>('all');

  const filteredTrails = activeCategory === 'all'
    ? TRAILS_DATA
    : TRAILS_DATA.filter((t) => t.category === activeCategory);

  return (
    <section id="trail-map" className="py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-700 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Himalayan Trail Navigation & Exploration</span>
              <span aria-hidden="true">·</span>
              <span>Local Activity Guide</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 [text-wrap:balance]">
              Nearby Mountain Trails & Heritage Sanctuaries
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              From the historic surveying grounds of Sir George Everest to the colonial pine avenues of Landour, explore the Queen of the Hills with our curated trail navigation.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 shadow-sm rounded-2xl self-start md:self-auto text-xs overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 font-medium rounded-xl whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Routes ({TRAILS_DATA.length})
            </button>
            <button
              onClick={() => setActiveCategory('trek')}
              className={`px-3.5 py-2 font-medium rounded-xl whitespace-nowrap transition-all ${
                activeCategory === 'trek'
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              High Treks
            </button>
            <button
              onClick={() => setActiveCategory('heritage')}
              className={`px-3.5 py-2 font-medium rounded-xl whitespace-nowrap transition-all ${
                activeCategory === 'heritage'
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Colonial Heritage
            </button>
            <button
              onClick={() => setActiveCategory('nature')}
              className={`px-3.5 py-2 font-medium rounded-xl whitespace-nowrap transition-all ${
                activeCategory === 'nature'
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Nature Reserves
            </button>
          </div>
        </div>

        {/* 2-Column Split: Interactive Map Viewer + Detailed Trail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Topography Map View (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
            
            {/* Map Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-slate-800">
                <Compass className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">Mussoorie & Landour Topographical Map</span>
              </div>
              <span className="text-slate-500 font-mono">30.45° N · 78.06° E</span>
            </div>

            {/* Visual Vector Contour Map Surface - Deep Himalayan Midnight Slate with glowing vectors */}
            <div className="relative w-full h-[400px] sm:h-[480px] my-4 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              
              {/* Topographic elevation contour lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Simulated contour elevations */}
                <path d="M-50,150 Q180,60 400,120 T800,90" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4 2" />
                <path d="M-50,220 Q220,130 500,210 T900,180" fill="none" stroke="#60a5fa" strokeWidth="1" />
                <path d="M-50,300 Q190,260 440,320 T900,280" fill="none" stroke="#64748b" strokeWidth="1" />
                <path d="M-50,380 Q300,320 600,410 T950,350" fill="none" stroke="#475569" strokeWidth="1" />
                {/* Mountain Ridge line */}
                <path d="M50,80 L200,40 L350,75 L520,30 L700,60" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />
              </svg>

              {/* Geographic Landmarks Labels */}
              <div className="absolute top-4 left-6 text-[10px] text-sky-300 font-mono uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                North Range: Bandarpunch (20,720 ft)
              </div>
              <div className="absolute bottom-4 left-6 text-[10px] text-sky-300 font-mono uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                South Valley: Doon Plain (2,200 ft)
              </div>
              <div className="absolute top-4 right-6 text-[10px] text-sky-300 font-mono uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                East Crest: Lal Tibba (7,500 ft)
              </div>

              {/* Central Hotel Pin */}
              <div
                style={{ left: '46%', top: '48%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-default"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/30 animate-ping absolute" />
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center border-2 border-white">
                    <Compass className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap bg-slate-900/95 border border-sky-400 px-3 py-1 rounded-lg text-[11px] text-white font-medium shadow-xl backdrop-blur-md">
                  Meridian Blu Mussoorie (7,120 ft)
                </div>
              </div>

              {/* Trail Pins on the Map */}
              {filteredTrails.map((trail) => {
                const isSelected = selectedTrail.id === trail.id;
                return (
                  <button
                    key={trail.id}
                    onClick={() => setSelectedTrail(trail)}
                    style={{ left: `${trail.coordinates.x}%`, top: `${trail.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-transform ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-lg transition-colors ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/60 font-bold'
                            : 'bg-slate-800 text-sky-300 border border-slate-600 hover:bg-slate-700'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="mt-1 whitespace-nowrap text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-slate-200 group-hover:text-white">
                        {trail.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Trail connection lines overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="46%"
                  y1="48%"
                  x2={`${selectedTrail.coordinates.x}%`}
                  y2={`${selectedTrail.coordinates.y}%`}
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Map Footnote Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 gap-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="font-medium text-slate-700">Meridian Blu Resort (Basecamp)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600" />
                  <span>Trailheads & Attractions</span>
                </span>
              </div>
              <span className="text-blue-700 font-semibold">Active Route: {selectedTrail.name}</span>
            </div>
          </div>

          {/* Trail Detail & Guided Booking Showcase (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between">
            
            {/* Trail Photo Header */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <img
                src={selectedTrail.imageUrl}
                alt={selectedTrail.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-900 shadow-md">
                {selectedTrail.difficulty} Trek
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => onShareTrail && onShareTrail(selectedTrail)}
                  className="p-2.5 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-md transition-all cursor-pointer"
                  title="Share trail with travel companions"
                >
                  <Share2 className="w-4 h-4 text-blue-700" />
                </button>
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-xs text-sky-200">Elevation: {selectedTrail.elevationFt} ft</span>
                <h3 className="font-serif text-2xl font-normal text-white drop-shadow-sm">
                  {selectedTrail.name}
                </h3>
              </div>
            </div>

            {/* Trail Key Metrics Strip */}
            <div className="grid grid-cols-3 divide-x divide-slate-200 border-b border-slate-200 bg-slate-50 text-xs text-center py-3.5">
              <div>
                <span className="text-slate-500 block">From Hotel</span>
                <strong className="text-slate-900 font-mono text-sm">{selectedTrail.distanceFromHotelKm} km</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Trail Length</span>
                <strong className="text-slate-900 font-mono text-sm">{selectedTrail.trailLengthKm} km</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Est. Duration</span>
                <strong className="text-slate-900 font-mono text-sm">{selectedTrail.durationHours}</strong>
              </div>
            </div>

            {/* Description & Packing Checklist */}
            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed text-sm">
                {selectedTrail.description}
              </p>

              <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-4 space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-blue-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Highlight & Optimal Window</span>
                </span>
                <p className="text-slate-700">
                  {selectedTrail.highlight}. Best explored at <strong className="text-slate-900 font-medium">{selectedTrail.bestTime}</strong>.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Backpack className="w-3.5 h-3.5 text-blue-600" />
                  <span>Recommended Gear</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedTrail.packingTips.map((tip, idx) => (
                    <span key={idx} className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-slate-700 text-xs font-medium">
                      {tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Guide Request Button */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onRequestGuide && onRequestGuide(selectedTrail)}
                className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Request Guided Hotel Naturalist for this Trail</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
