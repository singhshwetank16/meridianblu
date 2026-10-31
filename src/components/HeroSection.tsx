import React, { useState, useRef } from 'react';
import { Calendar, Users, Eye, MapPin, Sparkles, ChevronRight, Snowflake, Play, Pause, Volume2, VolumeX, Video } from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';
import { RoomTier } from '../types';
import { getAssetUrl } from '../utils/assetUrl';

interface HeroSectionProps {
  rooms?: RoomTier[];
  onCheckAvailability: (dates: { checkIn: string; checkOut: string; guests: number; roomId?: string }) => void;
  onExploreVirtualTour: () => void;
  onExploreTrailMap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  rooms,
  onCheckAvailability,
  onExploreVirtualTour,
  onExploreTrailMap,
}) => {
  const roomsList = rooms && rooms.length > 0 ? rooms : ROOMS_DATA;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const getNextDay = (dateStr: string): string => {
    if (!dateStr) return '';
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3 || isNaN(parts[0])) return '';
    const next = new Date(parts[0], parts[1] - 1, parts[2] + 1);
    const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
    return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
  };

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
  const [guests, setGuests] = useState(2);
  const [selectedRoomId, setSelectedRoomId] = useState(roomsList[0]?.id || '1487');

  const handleCheckInChange = (newVal: string) => {
    setCheckIn(newVal);
    if (newVal) {
      setCheckOut(getNextDay(newVal));
    }
  };

  const handleCheckOutChange = (newVal: string) => {
    if (checkIn && newVal <= checkIn) {
      setCheckOut(getNextDay(checkIn));
    } else {
      setCheckOut(newVal);
    }
  };

  // Real user video background state
  const [activeVideo, setActiveVideo] = useState(getAssetUrl('/images/front_view.mp4'));
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const switchVideo = () => {
    setActiveVideo(prev => prev.includes('front_view.mp4') ? getAssetUrl('/images/terres-video.mp4') : getAssetUrl('/images/front_view.mp4'));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      guests,
      roomId: selectedRoomId,
    });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-slate-900">
      {/* Background Hero Video with deep Himalayan sapphire scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          key={activeVideo}
          src={activeVideo}
          poster={getAssetUrl('/images/hero/entrance.avif')}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000"
        />

        {/* Alpine Twilight Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a182b] via-[#0d223f]/65 to-[#0b1c34]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0a182b]/30 to-[#0a182b]/70 pointer-events-none" />
      </div>

      {/* Floating Video Switcher Control */}
      <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/50 text-xs text-slate-800 shadow-xl animate-fade-in">
        <button
          onClick={switchVideo}
          type="button"
          className="px-3.5 py-1.5 rounded-full bg-[#005cd8] hover:bg-[#004bb3] text-white flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] font-semibold shadow-sm"
          title="Switch view between Front View & Mountain Terrace"
        >
          <Video className="w-3.5 h-3.5" />
          <span>{activeVideo.includes('front') ? 'Terrace Snow View' : 'Front View'}</span>
        </button>

        <button
          onClick={togglePlay}
          type="button"
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
          title={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={toggleMute}
          type="button"
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
          title={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#005cd8]" />}
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 flex-1 flex flex-col justify-center">
        
        {/* Himalayan Alpine Altitude Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 animate-float shadow-lg self-start">
          <Snowflake className="w-4 h-4 text-sky-300 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Himalayan Alpine Sanctuary</span>
          <span aria-hidden="true" className="text-sky-300">·</span>
          <span>{HOTEL_INFO.elevation}</span>
          <span aria-hidden="true" className="text-sky-300">·</span>
          <span>Mussoorie, Himalayas</span>
        </div>

        {/* Hero Display Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white max-w-4xl leading-[1.08] mb-6 [text-wrap:balance] drop-shadow-md animate-fade-in-up">
          Where Himalayan Grandeur Meets Crisp Mountain Serenity
        </h1>

        {/* Concrete Value Proposition */}
        <p className="text-base sm:text-lg text-slate-100 max-w-2xl font-light leading-relaxed mb-8 drop-shadow">
          Perched along the historic Hathipaon crest at 7,120 feet elevation. Immerse yourself in hand-hewn cedar suites with working river-stone hearths, panoramic snowy peak views of Bandarpunch, and the legendary Mussoorie Winterline twilight.
        </p>

        {/* Exploratory Quick CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            onClick={onExploreVirtualTour}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white/95 hover:bg-white rounded-xl transition-all backdrop-blur-sm cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <Eye className="w-4 h-4 text-[#005cd8]" />
            <span>360° Virtual Panoramic Tour</span>
          </button>

          <button
            onClick={onExploreTrailMap}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition-all cursor-pointer backdrop-blur-sm"
          >
            <MapPin className="w-4 h-4 text-sky-300" />
            <span>Himalayan Trail & Activity Guide</span>
            <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
          </button>
        </div>
      </div>

      {/* Full-width Integrated Frost Glass Search Bar at bottom of Hero */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <form
          onSubmit={handleSearch}
          className="bg-white/95 border border-sky-100/80 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(2,132,199,0.18)] backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          {/* Check-In */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#005cd8]" />
              <span>Arrival</span>
            </label>
            <input
              type="date"
              value={checkIn}
              min={formatDate(today)}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#005cd8] transition-colors cursor-pointer"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#005cd8]" />
              <span>Departure</span>
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn ? getNextDay(checkIn) : formatDate(tomorrow)}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#005cd8] transition-colors cursor-pointer"
              required
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#005cd8]" />
              <span>Guests</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#005cd8] transition-colors cursor-pointer"
            >
              <option value={1}>1 Guest (Solo Mountain Stay)</option>
              <option value={2}>2 Guests (Couples & Companions)</option>
              <option value={3}>3 Guests (Family / Friends)</option>
              <option value={4}>4 Guests (Executive Party)</option>
              <option value={6}>6 Guests (Estate Group)</option>
            </select>
          </div>

          {/* Room Tier */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#005cd8]" />
              <span>Residence Tier</span>
            </label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#005cd8] transition-colors truncate cursor-pointer"
            >
              {roomsList.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} (₹{room.pricePerNight.toLocaleString('en-IN')}/night)
                </option>
              ))}
            </select>
          </div>

          {/* Primary Action Button */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#005cd8] hover:bg-[#004bb3] active:bg-[#003d92] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Check Live Rates</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Live mountain atmosphere footer bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-200 px-2 gap-3 drop-shadow">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Snowflake className="w-3.5 h-3.5 text-sky-300" />
              <span>Mussoorie Weather: {HOTEL_INFO.weather.tempC}°C ({HOTEL_INFO.weather.condition})</span>
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="hidden sm:inline">Winterline Sunset: <strong className="text-white font-medium">{HOTEL_INFO.weather.winterlineSunset}</strong></span>
          </div>

          <div className="flex items-center gap-4 text-right">
            <span className="hidden md:inline">Mountain Air: <strong className="text-emerald-300 font-medium">Pristine (AQI 18)</strong></span>
            <span className="text-sky-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Direct Best Rate Guarantee</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
