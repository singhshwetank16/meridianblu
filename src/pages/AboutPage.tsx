import React from 'react';
import { VirtualTour } from '../components/VirtualTour';
import { useRouter, Link } from '../router';
import { HOTEL_INFO } from '../data/hotelData';
import { getAssetUrl } from '../utils/assetUrl';
import {
  Compass,
  Flame,
  Droplets,
  Sun,
  ArrowRight,
  TreePine,
  CheckCircle2,
  Snowflake,
  Mountain
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-16 pb-24 bg-[#f8fafc] text-slate-800">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-sky-50/80 via-white to-[#f8fafc] border-b border-sky-100 pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-[#005cd8] text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Snowflake className="w-3.5 h-3.5" />
            <span>Estate Heritage & 360° Spatial Tour</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 tracking-tight font-normal">
            Meridian Blu Mussoorie Sanctuary
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Located at 1, Kempty Fall Road, Charleville, Mussoorie at 7,120 feet elevation, explore our restored deodar cedar architecture and panoramic sunset terraces through interactive 360° spatial views.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <TreePine className="w-3.5 h-3.5 text-[#005cd8]" />
              12 Acres of Ancient Deodar Forest
            </span>
            <span className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Direct Winterline Twilight Horizon
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Carved River Stone Hearths
            </span>
          </div>
        </div>
      </section>

      {/* 360° Virtual Tour Component */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <VirtualTour onBookExperience={() => navigate('/rooms')} />
      </main>

      {/* Estate Heritage Narrative & Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#005cd8] text-xs font-bold uppercase">
              Himalayan Heritage • Charleville, Mussoorie
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 leading-tight font-normal">
              A Living Testament to British Himalayan Architecture
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Constructed in the mid-19th century as a highland botanical retreat for cartographers and naturalists working alongside Sir George Everest’s Great Trigonometrical Survey, the estate retains its authentic cedar wood trusses, lime-plastered stone masonry, and brass hearth details.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Carefully restored with acoustic insulation and double-paned glass, the chambers preserve the whisper of mountain winds while maintaining cozy ambient warmth throughout crisp winter nights.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#005cd8] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Seasoned Deodar Cedar:</strong> Sourced sustainably from fallen highland logs, emitting natural aromatic forest oils.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#005cd8] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Local River-Stone Hearths:</strong> Hand-cut quartz and slate fireplaces in royal suites.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#005cd8] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Spring Mineral Water:</strong> Pure Himalayan mountain water filtered naturally through quartz strata.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={getAssetUrl('/images/terrace.jpg')}
                alt="Mussoorie Twilight Terrace"
                className="w-full h-64 object-cover rounded-2xl border border-slate-200 shadow-xl hover:scale-102 transition-transform"
              />
              <img
                src={getAssetUrl('/images/gallery.jpg')}
                alt="Estate Architecture & Grounds"
                className="w-full h-64 object-cover rounded-2xl border border-slate-200 shadow-xl hover:scale-102 transition-transform mt-6"
              />
            </div>

            {/* Embedded Property Video Clip */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              <video
                src={getAssetUrl('/images/terres-video.mp4')}
                poster={getAssetUrl('/images/terrace.jpg')}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-48 object-cover"
              />
              <div className="p-3 bg-white flex items-center justify-between text-xs border-t border-slate-100">
                <span className="font-serif font-bold text-slate-900">Terrace Mist & Mountain Breeze</span>
                <span className="text-[#005cd8] font-bold text-[11px]">Live Aerial Vista</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable High-Altitude Ecology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 font-normal">
              High-Altitude Ecological Stewardship
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Mussoorie’s fragile Himalayan biosphere demands mindful guardianship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <Droplets className="w-6 h-6 text-[#005cd8]" />
              <h3 className="text-base font-serif font-bold text-slate-900">100% Rain & Snow Harvesting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                400,000 liters of monsoon and snow meltwater harvested and micro-filtered into potable mineral spring standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <Flame className="w-6 h-6 text-amber-500" />
              <h3 className="text-base font-serif font-bold text-slate-900">Zero-Emission Pellet Heat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean pine-pellet biomass heating that prevents forest floor fires while leaving zero carbon soot in the alpine sky.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <TreePine className="w-6 h-6 text-emerald-600" />
              <h3 className="text-base font-serif font-bold text-slate-900">Native Oak & Deodar Nursery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For every confirmed reservation, our forestry naturalists plant five native saplings along the Benog Sanctuary corridor.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#005cd8] text-white hover:bg-[#004bb3] transition-colors shadow-xl"
            >
              <span>Reserve Stay in These Residences</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
