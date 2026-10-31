import React from 'react';
import { TrailMapGuide } from '../components/TrailMapGuide';
import { TrailAttraction } from '../types';
import { useRouter, Link } from '../router';
import {
  Mountain,
  Compass,
  Footprints,
  Shield,
  Sun,
  Eye,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface TrailsPageProps {
  onRequestTrailGuide: (trail: TrailAttraction) => void;
  onShareTrail: (trail: TrailAttraction) => void;
  onOpenConcierge: () => void;
}

export const TrailsPage: React.FC<TrailsPageProps> = ({
  onRequestTrailGuide,
  onShareTrail,
  onOpenConcierge,
}) => {
  return (
    <div className="space-y-16 pb-24">
      {/* Page Header - Alpine Mountain Frost */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1c33] via-[#0f2847] to-[#1e3a5f] text-white pt-24 pb-16 shadow-xl border-b border-sky-300/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sky-200/30 text-amber-300 text-xs font-serif uppercase tracking-widest shadow-sm">
            <Mountain className="w-3.5 h-3.5 text-sky-300" />
            <span>Topographical Field Guide & Alpine Excursions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight drop-shadow-sm">
            Garhwal Mountain Trails & Naturalist Hikes
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Traverse historic ridge routes surveyed by Sir George Everest in 1832, wander through ancient deodar pine groves in Landour, or explore the sanctuary home of the Himalayan Monal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-sky-100">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              GPS-Mapped Elevation Coordinates
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Footprints className="w-3.5 h-3.5 text-amber-300" />
              Certified Garhwal Naturalist Guides
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              Winterline Sunset Observation Points
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Topographical Trail Guide */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <TrailMapGuide
          onRequestGuide={onRequestTrailGuide}
          onShareTrail={onShareTrail}
        />
      </main>

      {/* Trail Gear & Himalayan Naturalist Advisory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200 shadow-xl space-y-6 text-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#004e92] font-bold mb-1">Estate Naturalist Support</div>
              <h2 className="text-2xl font-serif text-slate-900">
                Naturalist Excursion Protocols & Suggested Gear
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Complimentary trekking poles, binoculars, and trail rations are available at the Meridian Blu Concierge Desk.
              </p>
            </div>

            <button
              onClick={onOpenConcierge}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900 shadow-md hover:shadow-lg transition-all self-start md:self-auto cursor-pointer"
            >
              <span>Consult Head Naturalist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Footwear
              </div>
              <p>Sturdy alpine hiking boots with vibram rubber grip for loose deodar pine needles and limestone trails.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Layering
              </div>
              <p>High-altitude winds drop temperatures swiftly by 8°C at sunset. Thermal windbreaker recommended.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Wildlife Etiquette
              </div>
              <p>Benog Sanctuary is a protected reserve. Maintain quietude to witness barking deer and Himalayan griffons.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Water & Hydration
              </div>
              <p>Electrolyte flasks provided by Meridian Blu. Single-use plastic bottles strictly forbidden on trails.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
