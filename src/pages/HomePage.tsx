import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { RoomTier, TrailAttraction } from '../types';
import { useRouter, Link } from '../router';
import { HOTEL_INFO } from '../data/hotelData';
import { getAssetUrl } from '../utils/assetUrl';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Mountain,
  Eye,
  Camera,
  Star,
  Film,
  Play,
  Calendar,
  Snowflake
} from 'lucide-react';

interface HomePageProps {
  rooms: RoomTier[];
  onOpenBooking: () => void;
  onOpenConcierge?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  rooms,
  onOpenBooking,
}) => {
  const { navigate } = useRouter();

  const handleHeroCheckAvailability = (dates: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomId?: string;
  }) => {
    const params = new URLSearchParams({
      checkIn: dates.checkIn,
      checkOut: dates.checkOut,
      guests: dates.guests.toString(),
    });
    if (dates.roomId) {
      params.append('roomId', dates.roomId);
    }
    navigate(`/rooms?${params.toString()}`);
  };

  const featuredRooms = rooms.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Cinematic Hero Section */}
      <HeroSection
        rooms={rooms}
        onCheckAvailability={handleHeroCheckAvailability}
        onExploreVirtualTour={() => navigate('/about')}
        onExploreTrailMap={() => navigate('/trails')}
      />

      {/* 2. Welcome & Sanctuary Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#005cd8] text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Snowflake className="w-3.5 h-3.5" />
              <span>Himalayan Sanctuary at 7,120 Feet</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight leading-tight font-normal">
              Where Winterline Skies Meet Ancient Deodar Forests
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Perched atop the secluded Cloud Crest Ridge in Mussoorie, <strong className="text-slate-900 font-bold">{HOTEL_INFO.name}</strong> is a bespoke Himalayan estate born from restored cedar architecture and panoramic natural splendor. Direct windows open to the snow-capped peaks of Kedarnath and Bandarpunch to the north, and the glowing Doon Valley below.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-[#005cd8] mb-1.5 font-bold">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span className="text-xs tracking-wide">Fireside Hearth & Balcony</span>
                </div>
                <p className="text-xs text-slate-600">Wood pellet fireplaces & private heated balconies in every suite.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-[#005cd8] mb-1.5 font-bold">
                  <Mountain className="w-4 h-4 text-[#005cd8]" />
                  <span className="text-xs tracking-wide">360° Alpine Ridge</span>
                </div>
                <p className="text-xs text-slate-600">Direct walking access to historic Sir George Everest Peak trails.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#005cd8] hover:bg-[#004bb3] text-white transition-all shadow-md hover:shadow-lg"
              >
                <span>Read The Estate Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#005cd8] bg-white border border-slate-300 hover:border-sky-300 transition-colors shadow-sm"
              >
                <span>Speak with Concierge</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group">
              <img
                src={getAssetUrl('/images/terrace.jpg')}
                alt="Meridian Blu Mountain Terrace at Sunset"
                className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#005cd8] uppercase tracking-wider">Atmospheric Observation</div>
                    <div className="text-sm font-bold text-slate-900">Mussoorie Winterline Twilight (17:15 - 17:45)</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-[#005cd8] text-[11px] font-bold">
                    Cloud Crest Terrace
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video & Property Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-sky-50/70 via-white to-sky-50/40 border border-sky-100 shadow-xl space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-200 text-[#005cd8] text-xs font-bold uppercase shadow-sm">
                <Film className="w-3.5 h-3.5" />
                <span>Live Mountain Reels & Experience</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-normal">
                Witness Meridian Blu Through Video & Moments
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Watch actual footage of our sun-drenched mountain terraces, rolling Himalayan clouds, and authentic guest experiences.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#005cd8] text-white hover:bg-[#004bb3] transition-all shadow-md self-start md:self-auto"
            >
              <span>Explore All Media</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2-Column Video Players Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Video 1: Terrace Video */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg group flex flex-col justify-between">
              <div className="relative aspect-video overflow-hidden">
                <video
                  src={getAssetUrl('/images/terres-video.mp4')}
                  poster={getAssetUrl('/images/terrace.jpg')}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white text-[11px] font-bold text-[#005cd8] flex items-center gap-1.5 shadow">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Terrace Mountain Clouds</span>
                </div>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-serif font-bold text-lg text-slate-900">Open Mountain Terrace Panorama</h3>
                <p className="text-xs text-slate-600">Overlooking pristine Garhwal mountain peaks and the legendary Mussoorie twilight.</p>
              </div>
            </div>

            {/* Video 2: Influencer & Guest Walkthrough */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg group flex flex-col justify-between">
              <div className="relative aspect-video overflow-hidden">
                <video
                  src={getAssetUrl('/images/video-infuencer.mp4')}
                  poster={getAssetUrl('/images/hero/entrance.avif')}
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white text-[11px] font-bold text-[#005cd8] flex items-center gap-1.5 shadow">
                  <Play className="w-3 h-3 text-[#005cd8]" />
                  <span>Guest & Influencer Review Reel</span>
                </div>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-serif font-bold text-lg text-slate-900">Resort Experience & Room Walkthrough</h3>
                <p className="text-xs text-slate-600">Follow along for a complete first-person tour of the rooms, hospitality, and dining.</p>
              </div>
            </div>
          </div>

          {/* Quick Highlight Cards: Bonfire & Restaurant */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 relative z-10">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 group shadow-sm hover:shadow-md transition-shadow">
              <img
                src={getAssetUrl('/images/restaurant.jpg')}
                alt="Meridian Blu Dining Restaurant"
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1 text-xs">
                <div className="font-serif font-bold text-sm text-slate-900">Meridian Blu Restaurant</div>
                <p className="text-slate-600">Fine Himalayan & Continental preparations with warm mountain hospitality.</p>
                <Link to="/about" className="text-[#005cd8] font-bold text-[11px] hover:underline flex items-center gap-1 pt-0.5">
                  <span>Explore Dining</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 group shadow-sm hover:shadow-md transition-shadow">
              <img
                src={getAssetUrl('/images/bonefire.jpg')}
                alt="Evening Bonfire on Mountain Terrace"
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1 text-xs">
                <div className="font-serif font-bold text-sm text-slate-900">Evening Bonfire Gatherings</div>
                <p className="text-slate-600">Starlit fireside nights with barbecue, live acoustic music, and roasted mountain chestnuts.</p>
                <Link to="/rooms" className="text-[#005cd8] font-bold text-[11px] hover:underline flex items-center gap-1 pt-0.5">
                  <span>View Evening Bonfires</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Residences Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#005cd8] text-xs font-semibold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Live Real-Time Availability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-normal">
              Featured Mountain Residences
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              10 curated room categories directly synchronized with live central inventory and instant confirmation.
            </p>
          </div>

          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#005cd8] text-white hover:bg-[#004bb3] transition-all shadow-md"
          >
            <span>View All 10 Rooms & Tariffs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-200/90 hover:border-sky-300 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-60 overflow-hidden bg-slate-900">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-sm border text-xs font-bold shadow ${
                  room.inventory?.isSoldOut
                    ? 'bg-rose-50/95 border-rose-200 text-rose-600'
                    : 'bg-white/95 border-white text-[#005cd8]'
                }`}>
                  {room.inventory?.statusText || (room.inventory?.isSoldOut ? 'Sold Out in PMS' : 'Available in PMS')}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase drop-shadow">
                    {room.view}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#005cd8] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Nightly Tariff</div>
                    <div className="text-xl font-serif font-bold text-[#005cd8]">
                      ₹{room.pricePerNight.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <Link
                    to={`/rooms?roomId=${room.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-[#005cd8] hover:bg-[#004bb3] text-white shadow transition-colors"
                  >
                    Select Room
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive 360° Tour Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden border border-sky-100 bg-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#005cd8] text-xs font-bold uppercase shadow-sm">
                <Eye className="w-3.5 h-3.5" />
                <span>360° Immersive Spatial Technology</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-normal">
                Explore The Chambers & Terraces in Virtual Reality
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Step inside our Sunset Terrace, Cedar Conservatory, and Deodar suites before you arrive. Inspect high-resolution spatial details, crackling stone fireplaces, and panoramic horizon lines at your own pace.
              </p>
              
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#005cd8] text-white hover:bg-[#004bb3] transition-all shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch 360° Tour & Estate Story</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
                  alt="Virtual Tour Teaser"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#005cd8] text-white flex items-center justify-center shadow-2xl font-bold text-xs uppercase tracking-wider animate-pulse">
                    360°
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Topographical Trails & Excursions Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#005cd8] text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Mountain className="w-3.5 h-3.5" />
              <span>Garhwal Range Naturalist Trails</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-normal">
              Sir George Everest Peak & Alpine Walks
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Trace the historic footsteps of Sir George Everest, Surveyor-General of India, whose 1832 laboratory stands just minutes from our estate. Our interactive topographical map details routes, elevation gains, and difficulty ratings.
            </p>
            <div className="pt-2">
              <Link
                to="/trails"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 hover:border-[#005cd8] text-[#005cd8] transition-colors shadow-sm"
              >
                <span>Open Topographical Trail Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-[#005cd8] mb-1">6,750 FT ELEVATION</div>
                <div className="text-base font-serif font-bold text-slate-900 mb-2">George Everest Peak</div>
                <p className="text-xs text-slate-600">360-degree unobstructed panoramas of Bandarpunch and Swargarohini peaks.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-[#005cd8] mb-1">7,150 FT ELEVATION</div>
                <div className="text-base font-serif font-bold text-slate-900 mb-2">Benog Wildlife Sanctuary</div>
                <p className="text-xs text-slate-600">Home to Himalayan black bears, leopard cats, and rare Monal pheasants.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-[#005cd8] mb-1">HERITAGE PROMENADE</div>
                <div className="text-base font-serif font-bold text-slate-900 mb-2">Landour Circuit Walk</div>
                <p className="text-xs text-slate-600">Historic deodar groves, Chaar Dukaan bakery, and colonial stone churches.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-[#005cd8] mb-1">SUNSET PASS</div>
                <div className="text-base font-serif font-bold text-slate-900 mb-2">Camel's Back Vista</div>
                <p className="text-xs text-slate-600">Natural rock formation overlooking twilight valley fog and sunset rays.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Curated Gallery Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#005cd8] text-xs font-semibold uppercase tracking-widest mb-2 shadow-sm">
              <Camera className="w-3.5 h-3.5" />
              <span>Curated Visual Memoirs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-normal">
              Esthetic Whispers of Meridian Blu
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#005cd8] hover:text-[#004bb3]"
          >
            <span>View Complete Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/gallery" className="group rounded-2xl overflow-hidden relative h-56 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <img
              src={getAssetUrl('/images/terrace.jpg')}
              alt="Himalayan Mountain Terrace"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif font-bold text-white drop-shadow">Sunset Mountain Terrace</span>
            </div>
          </Link>

          <Link to="/gallery" className="group rounded-2xl overflow-hidden relative h-56 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <img
              src={getAssetUrl('/images/restaurant.jpg')}
              alt="Meridian Blu Dining Restaurant"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif font-bold text-white drop-shadow">Fine Dining Restaurant</span>
            </div>
          </Link>

          <Link to="/gallery" className="group rounded-2xl overflow-hidden relative h-56 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <img
              src={getAssetUrl('/images/bonefire.jpg')}
              alt="Evening Mountain Bonfire"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif font-bold text-white drop-shadow">Evening Terrace Bonfire</span>
            </div>
          </Link>

          <Link to="/gallery" className="group rounded-2xl overflow-hidden relative h-56 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <img
              src={getAssetUrl('/images/hero/entrance.avif')}
              alt="Estate Entrance & Welcome"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif font-bold text-white drop-shadow">Grand Alpine Entrance</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 7. Direct Booking Guarantee Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#0b1c33] via-[#0f2c52] to-[#0b1c33] border border-sky-400/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl text-white">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sky-200 text-xs font-bold uppercase shadow-sm">
              <Star className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct Booking Privileges</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal tracking-tight text-white">
              Direct Official Reservation Privileges
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Book directly through our official engine to enjoy guaranteed mountain views, complimentary afternoon Himalayan High Tea, and flexible check-in adjustments.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#005cd8] hover:bg-[#004bb3] text-white transition-all shadow-xl hover:shadow-2xl"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Mountain Suite</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors backdrop-blur-sm"
              >
                <span>Contact Estate Concierge</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
