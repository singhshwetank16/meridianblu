import React from 'react';
import { SocialHub } from '../components/SocialHub';
import { useRouter, Link } from '../router';
import {
  MessageSquare,
  Sparkles,
  Heart,
  Share2,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface StoriesPageProps {
  onOpenBooking: () => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  onOpenBooking,
}) => {
  return (
    <div className="space-y-16 pb-24">
      {/* Page Header - Alpine Theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1c33] via-[#0f2847] to-[#1e3a5f] text-white pt-24 pb-16 shadow-xl border-b border-sky-300/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sky-200/30 text-amber-300 text-xs font-serif uppercase tracking-widest shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-sky-300" />
            <span>Community Journal & Social Chronicle</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight drop-shadow-sm">
            Guest Memoirs of Meridian Blu
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Read real accounts of winterline twilight, mountain summit climbs, and fireside reveries recorded by guests who have walked our deodar paths.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-sky-100">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Share2 className="w-3.5 h-3.5 text-amber-300" />
              WhatsApp & Social Sharing Generator
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Heart className="w-3.5 h-3.5 text-amber-300" />
              Authentic Guest Testimonials
            </span>
          </div>
        </div>
      </section>

      {/* Main Social Hub Component */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SocialHub />
      </main>

      {/* Booking CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-sky-300/30 text-white text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="text-xs uppercase tracking-widest text-amber-300 font-bold">Unforgettable Himalayan Escapes</div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white">
              Begin Your Own Mountain Chapter
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Reserve your private residence at Meridian Blu Mussoorie and let the quiet deodar whispers and winterline twilight inspire your memories.
            </p>
            <div className="pt-2">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl hover:shadow-2xl cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book Your Residence Now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
