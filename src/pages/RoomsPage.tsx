import React, { useMemo } from 'react';
import { BookingEngine } from '../components/BookingEngine';
import { RoomTier, ConfirmedReservation } from '../types';
import { useRouter } from '../router';
import {
  ShieldCheck,
  Sparkles,
  Calendar,
  Clock,
  Car,
  Wifi,
  Coffee,
  CheckCircle2,
  HelpCircle,
  Snowflake
} from 'lucide-react';

interface RoomsPageProps {
  rooms: RoomTier[];
  onBookingConfirmed: (reservation: ConfirmedReservation) => void;
  onOpenSocialShare?: (res: ConfirmedReservation) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  rooms,
  onBookingConfirmed,
  onOpenSocialShare,
}) => {
  const { searchParams } = useRouter();

  // Read URL query params passed from Hero or Room links
  const initialDates = useMemo(() => {
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    const roomId = searchParams.get('roomId') || undefined;

    if (checkIn && checkOut) {
      return {
        checkIn,
        checkOut,
        guests: guests ? parseInt(guests, 10) : 2,
        roomId,
      };
    } else if (roomId) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      return {
        checkIn: today.toISOString().split('T')[0],
        checkOut: tomorrow.toISOString().split('T')[0],
        guests: 2,
        roomId,
      };
    }
    return undefined;
  }, [searchParams]);

  return (
    <div className="space-y-12 pb-24 bg-[#f8fafc]">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-b from-sky-50/80 via-white to-[#f8fafc] border-b border-sky-100 pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-[#005cd8] text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Snowflake className="w-3.5 h-3.5" />
            <span>Live Mountain Availability & Direct Rates</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 tracking-tight font-normal">
            Accommodations & Mountain Residences
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            All 10 authentic mountain chambers, wooden cottages, and luxury safari tents are linked in real-time with our reservation system. Select your stay dates to view live availability and tariffs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#005cd8]" />
              Direct Best Rate in Indian Rupees (₹)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#005cd8]" />
              Guaranteed Winterline or Snow Peak Views
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#005cd8]" />
              Instant SMS & WhatsApp Reservation Voucher
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Booking Engine */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <BookingEngine
          rooms={rooms}
          initialDates={initialDates}
          onBookingConfirmed={onBookingConfirmed}
          onOpenSocialShare={onOpenSocialShare}
        />
      </main>

      {/* Booking Policies & Privileges Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6">
          <h2 className="text-xl font-serif text-slate-900 font-bold flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#005cd8]" />
            <span>Stay Guidelines & Direct Booking Privileges</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Clock className="w-4 h-4 text-[#005cd8]" />
                <span>Check-in & Check-out</span>
              </div>
              <p>Check-in commences at 14:00 hrs. Check-out is until 11:00 hrs. Early arrivals may relax on the Sunset Mountain Terrace with complimentary tea.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Car className="w-4 h-4 text-[#005cd8]" />
                <span>Mountain Transfers</span>
              </div>
              <p>Private luxury SUV pickup from Dehradun Jolly Grant Airport (60 km / 95 mins) can be requested through our Concierge Desk.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Coffee className="w-4 h-4 text-[#005cd8]" />
                <span>Himalayan High Tea</span>
              </div>
              <p>All direct website bookings include daily complimentary twilight high-tea on the Sunset Terrace overlooking the Doon Valley.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
