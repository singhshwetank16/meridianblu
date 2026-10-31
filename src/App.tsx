import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConciergeChatbot } from './components/ConciergeChatbot';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { AboutPage } from './pages/AboutPage';
import { TrailsPage } from './pages/TrailsPage';
import { GalleryPage } from './pages/GalleryPage';
import { StoriesPage } from './pages/StoriesPage';
import { ContactPage } from './pages/ContactPage';
import { ConfirmedReservation, TrailAttraction, GalleryItem, RoomTier } from './types';
import { SHOP_ID, ROOMS_DATA, fetchLiveRoomTypes } from './data/hotelData';
import { SnowEffect } from './components/SnowEffect';
import { PmsStatusLookupModal } from './components/PmsStatusLookupModal';
import { Check, Calendar } from 'lucide-react';

function AppContent() {
  const { currentPath, navigate } = useRouter();
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isPmsModalOpen, setIsPmsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [rooms, setRooms] = useState<RoomTier[]>(ROOMS_DATA);

  // Load live room types & rents from API (Shop ID: 60)
  useEffect(() => {
    fetchLiveRoomTypes(SHOP_ID)
      .then((liveRooms) => {
        if (liveRooms && liveRooms.length > 0) {
          setRooms(liveRooms);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch live rooms in AppContent:', err);
      });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRequestTrailGuide = (trail: TrailAttraction) => {
    showToast(`Requested guided mountain guide for ${trail.name}.`);
    setIsConciergeOpen(true);
  };

  const handleShareTrail = (trail: TrailAttraction) => {
    if (navigator.share) {
      navigator.share({
        title: `${trail.name} - Mussoorie Hiking Guide`,
        text: `Check out ${trail.name} (${trail.elevationFt} ft, ${trail.difficulty}) near Meridian Blu Mussoorie!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/trails`);
      showToast('Trail link copied to clipboard for sharing!');
    }
  };

  const handleSharePhoto = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: `${item.title} - Meridian Blu Mussoorie`,
        text: `${item.title}: ${item.caption}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/gallery`);
      showToast('Photo story link copied to clipboard!');
    }
  };

  const handleBookingConfirmed = (reservation: ConfirmedReservation) => {
    showToast(`Reservation ${reservation.confirmationCode} confirmed! Welcome to Mussoorie.`);
  };

  const handleShareReservation = (res: ConfirmedReservation) => {
    const text = `My mountain residence is confirmed at Meridian Blu Mussoorie. Winterline twilight and fireside serenity await. Booking Reference: ${res.confirmationCode}`;
    if (navigator.share) {
      navigator.share({ title: 'Meridian Blu Mussoorie Residence', text, url: window.location.origin }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      showToast('Official residence credentials copied for transmission.');
    }
  };

  // Multi-page routing switch
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            rooms={rooms}
            onOpenBooking={() => navigate('/rooms')}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        );

      case '/rooms':
        return (
          <RoomsPage
            rooms={rooms}
            onBookingConfirmed={handleBookingConfirmed}
            onOpenSocialShare={handleShareReservation}
          />
        );

      case '/about':
        return <AboutPage />;

      case '/trails':
        return (
          <TrailsPage
            onRequestTrailGuide={handleRequestTrailGuide}
            onShareTrail={handleShareTrail}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        );

      case '/gallery':
        return (
          <GalleryPage
            onSharePhoto={handleSharePhoto}
            onOpenBooking={() => navigate('/rooms')}
          />
        );

      case '/stories':
        return (
          <StoriesPage
            onOpenBooking={() => navigate('/rooms')}
          />
        );

      case '/contact':
        return (
          <ContactPage
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        );

      default:
        return (
          <HomePage
            rooms={rooms}
            onOpenBooking={() => navigate('/rooms')}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] ambient-alpine-glow text-[#0f172a] font-sans-luxury selection:bg-[#005cd8] selection:text-white flex flex-col relative pb-16 lg:pb-0 overflow-x-hidden">
      
      {/* Interactive Himalayan Falling Snow Effect */}
      <SnowEffect />

      {/* Background Floating Ambient Light Orbs for depth & winter animation */}
      <div className="fixed top-20 left-10 w-[500px] h-[500px] bg-sky-200/25 rounded-full blur-[140px] pointer-events-none animate-ambient-drift -z-10" />
      <div className="fixed bottom-20 right-10 w-[600px] h-[600px] bg-[#005cd8]/10 rounded-full blur-[160px] pointer-events-none animate-ambient-drift -z-10" style={{ animationDelay: '-8s' }} />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white/95 border border-sky-300 text-slate-800 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-[#005cd8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar with active router link indicators */}
      <Navbar
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenPmsLookup={() => setIsPmsModalOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Persistent Global Footer */}
      <Footer
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenPmsLookup={() => setIsPmsModalOpen(true)}
      />

      {/* PMS Live Lookup & Diagnostics Modal */}
      <PmsStatusLookupModal
        isOpen={isPmsModalOpen}
        onClose={() => setIsPmsModalOpen(false)}
      />

      {/* AI Instant Concierge Chatbot ("Pari") */}
      <ConciergeChatbot
        isOpen={isConciergeOpen}
        onToggle={() => setIsConciergeOpen(!isConciergeOpen)}
        onOpenBooking={() => {
          setIsConciergeOpen(false);
          navigate('/rooms');
        }}
        onOpenTrailMap={() => {
          setIsConciergeOpen(false);
          navigate('/trails');
        }}
        onOpenVirtualTour={() => {
          setIsConciergeOpen(false);
          navigate('/about');
        }}
      />

      {/* Mobile Sticky Quick Reservation Bar (Shown only if not currently on /rooms) */}
      {currentPath !== '/rooms' && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 border-t border-slate-200 p-3 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#005cd8] font-bold font-mono">
              Meridian Blu Mussoorie
            </span>
            <span className="text-xs text-slate-800 font-serif font-medium">
              Tariffs from ₹2,000 / night
            </span>
          </div>
          <button
            onClick={() => navigate('/rooms')}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#005cd8] active:bg-[#004bb3] rounded-lg shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Stay</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
