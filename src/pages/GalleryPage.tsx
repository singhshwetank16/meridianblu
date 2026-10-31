import React from 'react';
import { PhotoGallery } from '../components/PhotoGallery';
import { GalleryItem } from '../types';
import { useRouter, Link } from '../router';
import {
  Camera,
  Sparkles,
  ArrowRight,
  Sun,
  Eye,
  Heart
} from 'lucide-react';

interface GalleryPageProps {
  onSharePhoto: (item: GalleryItem) => void;
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onSharePhoto,
  onOpenBooking,
}) => {
  return (
    <div className="space-y-16 pb-24">
      {/* Page Header - Alpine Frost Theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1c33] via-[#0f2847] to-[#1e3a5f] text-white pt-24 pb-16 shadow-xl border-b border-sky-300/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sky-200/30 text-amber-300 text-xs font-serif uppercase tracking-widest shadow-sm">
            <Camera className="w-3.5 h-3.5 text-sky-300" />
            <span>High-Altitude Photographic Archive</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight drop-shadow-sm">
            Visual Journal of Meridian Blu
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Witness the shifting alpine light across restored deodar cedar suites, glowing winterline twilight over the Doon Valley, artisanal fireside banquets, and cedar spa sanctuaries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-sky-100">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              Authentic Winterline Sunset Spectra
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              High-Definition Fullscreen Inspection
            </span>
          </div>
        </div>
      </section>

      {/* Main Curated Gallery Component */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <PhotoGallery onSharePhoto={onSharePhoto} />
      </main>

      {/* Guest Photography Contribution Invitation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs uppercase tracking-widest text-[#004e92] font-bold">Community Perspective</div>
            <h2 className="text-2xl font-serif text-slate-900">
              Have You Captured Twilight at Cloud Crest Ridge?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg">
              Share your photographs in our live Guest Memoirs and community journal. Featured guest photographs receive an estate culinary voucher.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900 transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span>Explore Guest Memoirs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
