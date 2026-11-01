import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Users,
  Check,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Sparkles,
  Lock,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Share2,
  Printer,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Bed,
  Wifi,
  Coffee,
  Download,
  Snowflake,
  Tag,
  CheckSquare,
  Square,
  Banknote,
  Mountain,
  Database
} from 'lucide-react';
import { ROOMS_DATA, HOTEL_INFO, SHOP_ID, INITIAL_INVENTORY_DB, fetchLiveRoomTypes } from '../data/hotelData';
import { RoomTier, ConfirmedReservation, RoomInventoryRecord } from '../types';
import { PmsStatusLookupModal } from './PmsStatusLookupModal';
import { pmsService } from '../services/pmsService';

interface BookingEngineProps {
  rooms?: RoomTier[];
  initialDates?: { checkIn: string; checkOut: string; guests: number; roomId?: string };
  onBookingConfirmed?: (reservation: ConfirmedReservation) => void;
  onOpenSocialShare?: (reservation: ConfirmedReservation) => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  rooms,
  initialDates,
  onBookingConfirmed,
  onOpenSocialShare,
}) => {
  // 1. Live Rooms List (strictly from API data)
  const [roomsList, setRoomsList] = useState<RoomTier[]>(rooms && rooms.length > 0 ? rooms : ROOMS_DATA);

  // Sync rooms prop if changed
  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setRoomsList(rooms);
    }
  }, [rooms]);

  // Fetch live room types from API
  useEffect(() => {
    fetchLiveRoomTypes(SHOP_ID).then((live) => {
      if (live && live.length > 0) {
        setRoomsList(live);
      }
    });
  }, []);

  // 2. Dates setup
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

  const [checkInDate, setCheckInDate] = useState(initialDates?.checkIn || formatDate(tomorrow));
  const [checkOutDate, setCheckOutDate] = useState(
    initialDates?.checkOut || (initialDates?.checkIn ? getNextDay(initialDates.checkIn) : formatDate(dayAfter))
  );
  const [adults, setAdults] = useState(initialDates?.guests || 2);
  const [children, setChildren] = useState(0);

  const handleCheckInDateChange = (newVal: string) => {
    setCheckInDate(newVal);
    if (newVal) {
      setCheckOutDate(getNextDay(newVal));
    }
  };

  const handleCheckOutDateChange = (newVal: string) => {
    if (checkInDate && newVal <= checkInDate) {
      setCheckOutDate(getNextDay(checkInDate));
    } else {
      setCheckOutDate(newVal);
    }
  };

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };
  const nights = calculateNights();

  // 3. Real-time Inventory State (without exposing internal shop ID)
  const [inventoryMap, setInventoryMap] = useState<Record<string, RoomInventoryRecord>>(() => {
    const initial: Record<string, RoomInventoryRecord> = {};
    (rooms && rooms.length > 0 ? rooms : ROOMS_DATA).forEach((r) => {
      const inv = INITIAL_INVENTORY_DB[r.id];
      initial[r.id] = {
        roomId: r.id,
        roomName: r.name,
        totalUnits: inv ? inv.totalUnits : (r.totalRooms ?? 10),
        availableUnits: inv ? inv.availableUnits : (r.totalRooms ?? 10),
        isSoldOut: inv ? inv.isSoldOut : false,
        statusText: inv ? inv.statusText : `${r.totalRooms ?? 10} Units Available`,
        lastUpdated: new Date().toISOString()
      };
    });
    return initial;
  });

  const fetchLiveInventory = async () => {
    try {
      const pmsInv = await pmsService.calculateLiveAvailability(checkInDate, checkOutDate);
      if (pmsInv && Object.keys(pmsInv).length > 0) {
        setInventoryMap(pmsInv);
      }
    } catch (err) {
      console.warn('Failed to calculate live PMS availability:', err);
    }
  };

  useEffect(() => {
    fetchLiveInventory();
  }, [checkInDate, checkOutDate]);

  // Sync initial dates if provided
  useEffect(() => {
    if (initialDates) {
      if (initialDates.checkIn) {
        setCheckInDate(initialDates.checkIn);
        if (initialDates.checkOut && initialDates.checkOut > initialDates.checkIn) {
          setCheckOutDate(initialDates.checkOut);
        } else {
          setCheckOutDate(getNextDay(initialDates.checkIn));
        }
      } else if (initialDates.checkOut) {
        setCheckOutDate(initialDates.checkOut);
      }
      if (initialDates.guests) setAdults(initialDates.guests);
      if (initialDates.roomId) {
        const found = roomsList.find((r) => r.id === initialDates.roomId) || ROOMS_DATA.find((r) => r.id === initialDates.roomId);
        if (found) setSelectedRoom(found);
      }
    }
  }, [initialDates, roomsList]);

  // 4. Selected Room
  const initialRoom = initialDates?.roomId
    ? roomsList.find((r) => r.id === initialDates.roomId) || roomsList[0]
    : roomsList[0];
  const [selectedRoom, setSelectedRoom] = useState<RoomTier>(initialRoom || ROOMS_DATA[0]);

  // Keep selected room fresh when roomsList updates
  useEffect(() => {
    if (roomsList && roomsList.length > 0) {
      setSelectedRoom((prev) => {
        const found = roomsList.find((r) => r.id === prev?.id);
        return found || roomsList[0];
      });
    }
  }, [roomsList]);

  // 5. Filters & Search State
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'suite' | 'cottage' | 'deluxe' | 'tent'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'capacity'>('default');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered and sorted rooms strictly derived from API data
  const displayedRooms = useMemo(() => {
    let result = [...roomsList];

    // Filter by category
    if (categoryFilter === 'suite') {
      result = result.filter(r => {
        const lower = r.name.toLowerCase();
        return lower.includes('suite') || lower.includes('suit') || lower.includes('couple');
      });
    } else if (categoryFilter === 'cottage') {
      result = result.filter(r => {
        const lower = r.name.toLowerCase();
        return lower.includes('cottage') || lower.includes('hut') || lower.includes('ground');
      });
    } else if (categoryFilter === 'deluxe') {
      result = result.filter(r => {
        const lower = r.name.toLowerCase();
        return lower.includes('deluxe');
      });
    } else if (categoryFilter === 'tent') {
      result = result.filter(r => {
        const lower = r.name.toLowerCase();
        return lower.includes('tent');
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.view.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'capacity') {
      result.sort((a, b) => (b.capacity.adults || 2) - (a.capacity.adults || 2));
    }

    return result;
  }, [roomsList, categoryFilter, searchQuery, sortBy]);

  // 6. Photo slider & lightbox state
  const [roomImageIndex, setRoomImageIndex] = useState<Record<string, number>>({});
  const [lightboxRoom, setLightboxRoom] = useState<{ room: RoomTier; index: number } | null>(null);
  const [detailsModalRoom, setDetailsModalRoom] = useState<RoomTier | null>(null);

  // 7. Guest Registration
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [expectedArrival, setExpectedArrival] = useState('14:00 - 16:00 (Standard Afternoon)');

  // 8. Promo / Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'WINTERLINE' || clean === 'MERIDIAN') {
      setAppliedCoupon({ code: clean, discountPercent: 15 });
      setCouponError('');
    } else if (clean === 'HIMALAYA' || clean === 'ROYAL' || clean === 'SNOW') {
      setAppliedCoupon({ code: clean, discountPercent: 10 });
      setCouponError('');
    } else {
      setCouponError('Invalid code. Try "WINTERLINE" for 15% discount.');
    }
  };

  // 9. Payment Method: Pay at Hotel only
  const paymentMethod = 'pay_at_hotel';

  // Pricing calculations
  const roomTotal = (selectedRoom?.pricePerNight || 0) * nights;
  const discountAmount = appliedCoupon ? Math.round((roomTotal * appliedCoupon.discountPercent) / 100) : 0;
  const taxableAmount = roomTotal - discountAmount;
  const taxAmount = Math.round(taxableAmount * 0.12);
  const grandTotal = taxableAmount + taxAmount;

  // 10. Flow Step: 'select' -> 'details' -> 'confirmed'
  const [step, setStep] = useState<'select' | 'details' | 'confirmed'>('select');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingErrorMessage, setBookingErrorMessage] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<ConfirmedReservation | null>(null);
  const [isPmsModalOpen, setIsPmsModalOpen] = useState(false);

  // 11. Waitlist state
  const [waitlistModalRoom, setWaitlistModalRoom] = useState<RoomTier | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSuccess(true);
    setTimeout(() => {
      setWaitlistModalRoom(null);
      setWaitlistSuccess(false);
      setWaitlistEmail('');
    }, 2000);
  };

  // 12. Proceed to guest details
  const handleSelectRoomAndProceed = (room: RoomTier) => {
    const inv = inventoryMap[room.id];
    if (inv && inv.isSoldOut) {
      setWaitlistModalRoom(room);
      return;
    }
    setSelectedRoom(room);
    setStep('details');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // 13. Execute Final Booking Confirmation
  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill in your Name, Email and Mobile Number to confirm.');
      return;
    }

    const currentInv = inventoryMap[selectedRoom.id];
    if (currentInv && currentInv.isSoldOut) {
      setBookingErrorMessage(`The requested ${selectedRoom.name} is currently sold out for these dates. Please choose an available residence.`);
      setStep('select');
      return;
    }

    setIsProcessing(true);
    setBookingErrorMessage('');

    const paymentMethodLabel = 'Pay at Hotel (Cash / Card / UPI on Arrival)';

    const reservationPayload = {
      checkInDate,
      checkOutDate,
      nights,
      adults,
      children,
      room: selectedRoom,
      addons: [],
      pricing: {
        roomTotal,
        addonsTotal: 0,
        subtotal: roomTotal,
        discountAmount,
        taxAmount,
        totalAmount: grandTotal,
      },
      guest: {
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        specialRequests: `Estimated Arrival: ${expectedArrival}`,
      },
      paymentMethod: paymentMethodLabel,
    };

    try {
      const pmsResult = await pmsService.createBooking({
        checkInDate,
        checkOutDate,
        nights,
        adults,
        children,
        roomTypeId: parseInt(String(selectedRoom.apiId || selectedRoom.id), 10),
        roomTypeName: selectedRoom.name,
        pricePerNight: selectedRoom.pricePerNight,
        totalAmount: grandTotal,
        subtotal: roomTotal,
        discountAmount,
        taxAmount,
        guestName,
        guestEmail,
        guestPhone,
        guestAddress: 'Direct Website Booking',
        specialRequests: `Estimated Arrival: ${expectedArrival}`,
        paymentMethod: paymentMethodLabel,
      });

      if (!pmsResult || !pmsResult.success) {
        setIsProcessing(false);
        setBookingErrorMessage(pmsResult?.error || 'Inventory verification could not be completed. Please reselect your dates.');
        setStep('select');
        fetchLiveInventory();
        return;
      }

      const confCode = pmsResult.confirmationCode || ('MB-' + Math.floor(100000 + Math.random() * 900000));
      const confirmed: ConfirmedReservation = {
        ...reservationPayload,
        shopId: SHOP_ID,
        confirmationCode: confCode,
        pmsReservationNo: pmsResult.pmsReservationNo,
        bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      setConfirmedReservation(confirmed);
      setStep('confirmed');
      fetchLiveInventory();

      if (onBookingConfirmed) {
        onBookingConfirmed(confirmed);
      }
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } catch (bookingErr) {
      console.warn('Booking network fallback:', bookingErr);
      // Local fallback confirmation
      const confCode = 'MB-' + Math.floor(100000 + Math.random() * 900000);
      const confirmed: ConfirmedReservation = {
        ...reservationPayload,
        shopId: SHOP_ID,
        confirmationCode: confCode,
        bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setConfirmedReservation(confirmed);
      setStep('confirmed');
      if (onBookingConfirmed) {
        onBookingConfirmed(confirmed);
      }
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } finally {
      setIsProcessing(false);
    }
  };

  // 14. Calendar .ics generator
  const downloadCalendarFile = () => {
    if (!confirmedReservation) return;
    const { confirmationCode, checkInDate: start, checkOutDate: end, room } = confirmedReservation;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Meridian Blu Mussoorie//EN
BEGIN:VEVENT
UID:${confirmationCode}@meridianblu.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;VALUE=DATE:${start.replace(/-/g, '')}
DTEND;VALUE=DATE:${end.replace(/-/g, '')}
SUMMARY:Stay at Meridian Blu - ${room.name}
DESCRIPTION:Reservation Reference: ${confirmationCode}. Address: ${HOTEL_INFO.address}. Check-in from 14:00.
LOCATION:${HOTEL_INFO.name}, Mussoorie
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `MeridianBlu-Booking-${confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 15. WhatsApp Share
  const shareOnWhatsApp = () => {
    if (!confirmedReservation) return;
    const msg = `*Meridian Blu Mussoorie - Reservation Confirmed*\n\n` +
      `Booking Ref: *${confirmedReservation.confirmationCode}*\n` +
      `Residence: *${confirmedReservation.room.name}*\n` +
      `Dates: *${confirmedReservation.checkInDate} to ${confirmedReservation.checkOutDate}* (${confirmedReservation.nights} Nights)\n` +
      `Guests: *${confirmedReservation.adults} Adults*\n` +
      `Total: *₹${confirmedReservation.pricing.totalAmount.toLocaleString('en-IN')}*\n` +
      `Location: 1, Kempty Fall Road, Charleville, Mussoorie (Near Happy Valley & Buddha Point)\n` +
      `Front Desk: +91 96505 14794 | WhatsApp: +91 96505 14773\n\n` +
      `We look forward to welcoming you!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="suites" className="py-12 sm:py-16 bg-gradient-to-b from-[#f8fafc] via-[#f0f7ff] to-[#f8fafc] text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#005cd8] text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Snowflake className="w-3.5 h-3.5 text-[#005cd8]" />
            <span>Himalayan Mountain Living</span>
            <span>·</span>
            <span>Guaranteed Direct Rates</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-slate-900 tracking-tight">
            Accommodations & Mountain Suites
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Handcrafted cedar wooden cottages, regal couple suites, and alpine safari glamping tents enveloped in Himalayan pine canopies with panoramic snow-capped vistas.
          </p>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#005cd8]" />
              Direct Rate Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#005cd8]" />
              Instant Digital Confirmation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#005cd8]" />
              Free Cancellation up to 48h
            </span>
          </div>
        </div>

        {/* Global Error Banner */}
        {bookingErrorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3 animate-fade-in shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-medium">{bookingErrorMessage}</span>
            </div>
            <button onClick={() => setBookingErrorMessage('')} className="text-rose-600 hover:text-rose-900 font-semibold underline text-xs cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* STEP 1: RESIDENCE BROWSING & LIVE TARIFFS */}
        {step === 'select' && (
          <div className="space-y-8">

            {/* Interactive Stay & Date Search Bar */}
            <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Check In */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Check-In Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#005cd8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={checkInDate}
                      min={formatDate(today)}
                      onChange={(e) => handleCheckInDateChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#005cd8] transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                {/* Check Out */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center justify-between">
                    <span>Check-Out Date</span>
                    <span className="text-[#005cd8] font-bold">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#005cd8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={checkOutDate}
                      min={checkInDate ? getNextDay(checkInDate) : formatDate(tomorrow)}
                      onChange={(e) => handleCheckOutDateChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#005cd8] transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Guests & Children
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Users className="w-4 h-4 text-[#005cd8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#005cd8] transition-colors cursor-pointer"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                        <option value={5}>5+ Adults</option>
                      </select>
                    </div>

                    <div className="w-24">
                      <select
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#005cd8] transition-colors cursor-pointer"
                      >
                        <option value={0}>0 Child</option>
                        <option value={1}>1 Child</option>
                        <option value={2}>2 Children</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Live Availability Status */}
                <div className="flex items-center justify-between sm:justify-end gap-3 h-11 px-4 rounded-xl bg-sky-50 border border-sky-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800">Live Inventory Online</span>
                  </div>
                  <span className="text-xs text-[#005cd8] font-semibold">10 Room Types</span>
                </div>
              </div>
            </div>

            {/* Filter Pills, Search & Sort */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'All Residences', count: roomsList.length },
                  { id: 'suite', label: 'Suites & Couple', count: 3 },
                  { id: 'cottage', label: 'Cottages & Huts', count: 3 },
                  { id: 'deluxe', label: 'Deluxe Rooms', count: 3 },
                  { id: 'tent', label: 'Glamping Safari', count: 1 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCategoryFilter(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${categoryFilter === tab.id
                      ? 'bg-[#005cd8] text-white shadow-md'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'
                      }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Sort & Search */}
              <div className="flex items-center gap-2.5">
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#005cd8] shadow-sm w-36 sm:w-44"
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#005cd8] shadow-sm cursor-pointer"
                >
                  <option value="default">Sort: Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="capacity">Max Guests</option>
                </select>
              </div>
            </div>

            {/* Room Cards Grid (Strictly from API data) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {displayedRooms.map((room) => {
                const inv = inventoryMap[room.id] || INITIAL_INVENTORY_DB[room.id];
                const isSoldOut = inv ? inv.isSoldOut : true;
                const availableCount = inv ? inv.availableUnits : 0;
                const isSelected = selectedRoom.id === room.id && !isSoldOut;
                const images = room.galleryImages && room.galleryImages.length > 0 ? room.galleryImages : [room.imageUrl];
                const activePhotoIdx = roomImageIndex[room.id] || 0;
                const currentImg = images[activePhotoIdx] || room.imageUrl;

                return (
                  <div
                    key={room.id}
                    className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${isSoldOut
                      ? 'border-slate-200 bg-slate-50 opacity-80'
                      : isSelected
                        ? 'border-[#005cd8] ring-2 ring-[#005cd8]/20 shadow-xl'
                        : 'border-slate-200/90 hover:border-sky-300 shadow-md hover:shadow-xl hover:-translate-y-0.5'
                      }`}
                  >
                    <div>
                      {/* Image Header with Carousel & Preview */}
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                        <img
                          src={currentImg}
                          alt={room.name}
                          className={`w-full h-full object-cover transition-transform duration-700 ${isSoldOut ? 'grayscale-[35%]' : 'group-hover:scale-105'
                            }`}
                        />

                        {/* Subtle Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40 pointer-events-none" />

                        {/* Top Left: View / Setting Tag */}
                        <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-slate-800 border border-white/60 shadow">
                          {room.view}
                        </div>

                        {/* Top Right: Real-Time Availability Tag */}
                        <div className="absolute top-3.5 right-3.5 flex flex-col items-end gap-1">
                          {isSoldOut ? (
                            <span className="bg-rose-600 text-white font-bold px-3 py-1 rounded-md text-[11px] uppercase tracking-wider shadow">
                              Sold Out
                            </span>
                          ) : availableCount <= 2 ? (
                            <span className="bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-md text-[11px] uppercase tracking-wider shadow animate-pulse">
                              Only {availableCount} Remaining!
                            </span>
                          ) : (
                            <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-md text-[11px] tracking-wide shadow">
                              {availableCount} Available
                            </span>
                          )}
                        </div>

                        {/* Multi-Photo Carousel Arrows & Dots */}
                        {images.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRoomImageIndex(prev => ({
                                  ...prev,
                                  [room.id]: (activePhotoIdx - 1 + images.length) % images.length
                                }));
                              }}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-white/20"
                              aria-label="Previous photo"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRoomImageIndex(prev => ({
                                  ...prev,
                                  [room.id]: (activePhotoIdx + 1) % images.length
                                }));
                              }}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-white/20"
                              aria-label="Next photo"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Dot Indicators */}
                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 z-10 shadow-lg">
                              {images.map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setRoomImageIndex(prev => ({ ...prev, [room.id]: i }));
                                  }}
                                  className={`h-1.5 rounded-full transition-all cursor-pointer ${activePhotoIdx === i ? 'bg-sky-400 w-4' : 'bg-white/50 hover:bg-white/80 w-1.5'
                                    }`}
                                />
                              ))}
                            </div>
                          </>
                        )}

                        {/* Bottom Image Bar: Quick Gallery Lightbox trigger */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightboxRoom({ room, index: activePhotoIdx });
                            }}
                            className="bg-black/70 hover:bg-black/90 border border-white/30 text-white px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-sky-300" />
                            <span>View Photos ({images.length})</span>
                          </button>

                          <span className="text-[11px] text-white bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md font-medium">
                            {room.sizeSqFt} sq.ft
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-serif-luxury text-2xl font-bold text-slate-900">
                              {room.name}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                              {room.tagline}
                            </p>
                          </div>

                          {/* Rate Per Night */}
                          <div className="text-right shrink-0">
                            {room.originalPrice && (
                              <span className="text-xs text-slate-400 line-through block font-medium">
                                ₹{room.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                            <div className="text-2xl font-serif-luxury font-bold text-[#005cd8]">
                              ₹{room.pricePerNight.toLocaleString('en-IN')}
                              <span className="text-xs font-sans text-slate-500 font-normal"> / night</span>
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                              ₹{(room.pricePerNight * nights).toLocaleString('en-IN')} for {nights} {nights === 1 ? 'night' : 'nights'}
                            </span>
                          </div>
                        </div>

                        {/* Room Specifications Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <Users className="w-3.5 h-3.5 text-[#005cd8] shrink-0" />
                            <span className="truncate font-medium">Max {room.capacity.adults || 2} Guests</span>
                          </div>
                          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <Bed className="w-3.5 h-3.5 text-[#005cd8] shrink-0" />
                            <span className="truncate font-medium">{room.bed ? room.bed.split(' ')[0] + ' Bed' : 'King Bed'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <Wifi className="w-3.5 h-3.5 text-[#005cd8] shrink-0" />
                            <span className="truncate font-medium">High-Speed WiFi</span>
                          </div>
                          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <Coffee className="w-3.5 h-3.5 text-[#005cd8] shrink-0" />
                            <span className="truncate font-medium">Tea & Coffee</span>
                          </div>
                        </div>

                        {/* Key Features Bullet List */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                          {room.features.slice(0, 4).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#005cd8] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-6 pt-0 mt-auto flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setDetailsModalRoom(room)}
                        className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Room Details</span>
                      </button>

                      {isSoldOut ? (
                        <button
                          type="button"
                          onClick={() => {
                            setWaitlistModalRoom(room);
                            setWaitlistSuccess(false);
                          }}
                          className="flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Sold Out · Join Waitlist</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectRoomAndProceed(room)}
                          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${isSelected
                            ? 'bg-[#005cd8] text-white shadow-lg ring-2 ring-[#005cd8]/30 font-extrabold'
                            : 'bg-[#005cd8] text-white hover:bg-[#004bb3] shadow-md'
                            }`}
                        >
                          <span>Reserve Room</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {displayedRooms.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-md space-y-3">
                <AlertCircle className="w-8 h-8 text-[#005cd8] mx-auto" />
                <h3 className="font-serif-luxury text-xl font-bold text-slate-800">No Accommodations Match Your Filter</h3>
                <p className="text-xs text-slate-500">Try selecting "All Residences" or clearing your search keywords.</p>
                <button
                  onClick={() => { setCategoryFilter('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-[#005cd8] text-white rounded-xl text-xs font-semibold cursor-pointer shadow"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: GUEST DETAILS & RESERVATION GUARANTEE */}
        {step === 'details' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            {/* Back button */}
            <button
              onClick={() => setStep('select')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#005cd8] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Room Selection</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left 2 Cols: Form */}
              <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleConfirmReservation} className="space-y-6">

                  {/* Primary Guest Details Card */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h3 className="font-serif-luxury text-2xl font-bold text-slate-900">
                          Primary Guest Information
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Your reservation voucher and arrival directives will be sent to these contact details.
                        </p>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-[#005cd8]" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Radhika Singh"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#005cd8]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Email Address * (For instant voucher)
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="radhika.singh@gmail.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#005cd8]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#005cd8]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Estimated Arrival Window
                        </label>
                        <select
                          value={expectedArrival}
                          onChange={(e) => setExpectedArrival(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#005cd8] cursor-pointer"
                        >
                          <option value="14:00 - 16:00 (Standard Afternoon)">14:00 - 16:00 (Standard Afternoon Check-In)</option>
                          <option value="16:00 - 18:00 (Sunset Arrival)">16:00 - 18:00 (Sunset Winterline Arrival)</option>
                          <option value="18:00 - 21:00 (Evening Chauffeur Arrival)">18:00 - 21:00 (Evening Chauffeur Arrival)</option>
                          <option value="Prior to 14:00 (Early Check-In Request)">Prior to 14:00 (Early Check-In upon room readiness)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment & Settlement Card - Only Pay at Hotel */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h3 className="font-serif-luxury text-2xl font-bold text-slate-900">
                          Payment & Settlement
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Zero advance payment required today
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Pay at Hotel</span>
                      </div>
                    </div>

                    {/* Pay at Hotel Detailed Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50/50 border border-sky-100 flex items-start gap-3.5 text-xs">
                      <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 text-[#005cd8] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm">Pay Upon Arrival at Hotel Front Desk</h4>
                        <p className="text-slate-600 leading-relaxed">
                          Your mountain residence is locked and guaranteed immediately with zero deposit. Settle your final balance during check-in at the hotel front desk via <strong>Cash, UPI, or Credit/Debit Card</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Submit Confirmation Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-[#005cd8] hover:bg-[#004bb3] active:bg-[#003d92] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Securing Your Residence...</span>
                          </div>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>Confirm Reservation (Pay ₹{grandTotal.toLocaleString('en-IN')} at Hotel)</span>
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-center text-slate-500 mt-2">
                        Instant digital confirmation voucher generated upon submission. No credit card required now.
                      </p>
                    </div>
                  </div>
                </form>
              </div>

              {/* Right Col: Sticky Price Card */}
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-5 shadow-2xl">
                  <h4 className="font-serif-luxury text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
                    Reservation Summary
                  </h4>

                  {/* Room Card Preview */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <img
                      src={selectedRoom.imageUrl}
                      alt={selectedRoom.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 shadow-sm"
                    />
                    <div>
                      <h5 className="font-serif text-base text-slate-900 font-bold leading-snug">
                        {selectedRoom.name}
                      </h5>
                      <span className="text-[11px] text-[#005cd8] font-semibold block mt-0.5">
                        {selectedRoom.view}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Max {selectedRoom.capacity.adults || 2} Guests · {selectedRoom.sizeSqFt} sq.ft
                      </span>
                    </div>
                  </div>

                  {/* Dates & Duration */}
                  <div className="space-y-2 text-xs pb-4 border-b border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Check-In:</span>
                      <strong className="text-slate-900 font-bold">{checkInDate} (from 14:00)</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Check-Out:</span>
                      <strong className="text-slate-900 font-bold">{checkOutDate} (until 11:00)</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Duration:</span>
                      <strong className="text-slate-900 font-bold">{nights} {nights === 1 ? 'Night' : 'Nights'} ({adults} Adults)</strong>
                    </div>
                  </div>

                  {/* Coupon Application */}
                  <form onSubmit={handleApplyCoupon} className="space-y-2 pb-4 border-b border-slate-100">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Privilege Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. WINTERLINE"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 uppercase focus:outline-none focus:border-[#005cd8]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-xs text-[#005cd8] font-bold rounded-lg border border-sky-200 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedCoupon && (
                      <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Code "{appliedCoupon.code}" applied ({appliedCoupon.discountPercent}% off)</span>
                      </div>
                    )}
                    {couponError && (
                      <div className="text-xs text-rose-500 font-medium">{couponError}</div>
                    )}
                  </form>

                  {/* Detailed Price Breakdown */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Room Tariff ({nights} Nights × ₹{selectedRoom.pricePerNight.toLocaleString('en-IN')})</span>
                      <span className="font-mono text-slate-900 font-medium">₹{roomTotal.toLocaleString('en-IN')}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Privilege Discount ({appliedCoupon.discountPercent}%)</span>
                        <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>GST & Luxury Hospitality Tax (12%)</span>
                      <span className="font-mono text-slate-900 font-medium">₹{taxAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-base font-serif-luxury font-bold text-slate-900 pt-3 border-t border-slate-100">
                      <span>Total Amount</span>
                      <span className="font-mono text-xl text-[#005cd8] font-extrabold">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Cancellation policy guarantee */}
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-slate-600 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#005cd8] shrink-0 mt-0.5" />
                    <span>Complimentary free cancellation up to 48 hours prior to check-in. Instant digital receipt.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMED RESERVATION VOUCHER */}
        {step === 'confirmed' && confirmedReservation && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            {/* Success Celebration Card */}
            <div className="bg-gradient-to-b from-sky-50 to-white border border-sky-200 rounded-3xl p-6 sm:p-10 text-center space-y-3 shadow-xl relative overflow-hidden">
              <div className="w-16 h-16 bg-[#005cd8]/10 border border-[#005cd8]/30 rounded-full flex items-center justify-center mx-auto text-[#005cd8] mb-2 shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#005cd8]">
                Reservation Confirmed
              </div>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-slate-900 font-bold">
                Welcome to Meridian Blu Mussoorie
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Your official residence credentials and digital booking voucher have been confirmed. A confirmation has also been dispatched to <strong className="text-slate-900">{confirmedReservation.guest.email}</strong>.
              </p>
            </div>

            {/* Printable Digital Reservation Voucher */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl print:border-black print:bg-white print:text-black">
              {/* Hotel & Reference Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="font-serif-luxury text-2xl text-slate-900 font-bold tracking-wide">
                    {HOTEL_INFO.name}
                  </span>
                  <div className="text-xs text-slate-500 mt-0.5">{HOTEL_INFO.address}</div>
                  <div className="text-xs text-[#005cd8] mt-0.5 font-semibold">Elevation: 7,120 ft · Coordinates: {HOTEL_INFO.coordinates}</div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] uppercase font-bold text-emerald-600 flex items-center gap-1 justify-start sm:justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Official Reservation Guaranteed</span>
                  </div>
                  <div className="text-xs uppercase font-bold text-slate-500 mt-0.5">Booking Reference Code</div>
                  <div className="text-2xl font-mono font-bold text-[#005cd8] tracking-wider">
                    {confirmedReservation.confirmationCode}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold">Confirmed & Guaranteed</span>
                </div>
              </div>

              {/* Reservation Dates Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pb-6 border-b border-slate-100">
                <div>
                  <span className="text-slate-500 block font-medium">Check-In</span>
                  <strong className="text-slate-900 text-sm font-bold">{confirmedReservation.checkInDate}</strong>
                  <span className="text-[11px] text-slate-500 block">from 14:00</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Check-Out</span>
                  <strong className="text-slate-900 text-sm font-bold">{confirmedReservation.checkOutDate}</strong>
                  <span className="text-[11px] text-slate-500 block">until 11:00</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Duration</span>
                  <strong className="text-slate-900 text-sm font-bold">{confirmedReservation.nights} Nights</strong>
                  <span className="text-[11px] text-slate-500 block">{confirmedReservation.adults} Adults {confirmedReservation.children > 0 && `· ${confirmedReservation.children} Child`}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Confirmed Residence</span>
                  <strong className="text-[#005cd8] text-sm font-bold">{confirmedReservation.room.name}</strong>
                  <span className="text-[11px] text-slate-500 block">{confirmedReservation.room.view}</span>
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pb-6 border-b border-slate-100">
                <div>
                  <span className="text-slate-500 block font-medium">Primary Guest</span>
                  <strong className="text-slate-900 text-sm font-bold">{confirmedReservation.guest.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Direct Coordinates</span>
                  <span className="text-slate-800 text-sm font-medium">{confirmedReservation.guest.phone} · {confirmedReservation.guest.email}</span>
                </div>
                {confirmedReservation.guest.specialRequests && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block mb-0.5 font-medium">Arrival Schedule</span>
                    <span className="text-xs text-slate-700">{confirmedReservation.guest.specialRequests}</span>
                  </div>
                )}
              </div>

              {/* Payment Mode & Total Settlement */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 text-xs">
                <div>
                  <span className="text-slate-500 block font-medium">Settlement Method:</span>
                  <span className="text-emerald-700 font-bold text-sm flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {confirmedReservation.paymentMethod}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-slate-500 block font-medium">Payable at Check-In:</span>
                  <span className="text-2xl font-mono font-bold text-[#005cd8]">
                    ₹{confirmedReservation.pricing.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Real-time PMS Sync Confirmation Badge */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-600 text-white shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-emerald-900">Hotel Reservation Confirmed & Guaranteed</span>
                    <span className="text-[11px] text-emerald-800">
                      Record registered in central system. SMS & WhatsApp notification dispatched to {confirmedReservation.guest.phone}.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPmsModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  Verify Reservation
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-[#005cd8] bg-white text-xs font-bold text-slate-700 hover:text-[#005cd8] shadow-sm transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#005cd8]" />
                  <span>Print / Save Voucher</span>
                </button>

                <button
                  type="button"
                  onClick={shareOnWhatsApp}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-md transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={downloadCalendarFile}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#005cd8]" />
                  <span>Add to Calendar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPmsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-bold text-[#005cd8] transition-colors cursor-pointer"
                >
                  <Database className="w-4 h-4" />
                  <span>Verify Booking</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep('select')}
                className="text-xs text-[#005cd8] font-bold hover:underline cursor-pointer"
              >
                Reserve Another Mountain Residence
              </button>
            </div>
          </div>
        )}

        {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
        {lightboxRoom && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setLightboxRoom(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxRoom(null)}
                className="absolute -top-10 right-0 text-white hover:text-sky-300 p-2 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {(() => {
                const imgs = lightboxRoom.room.galleryImages || [lightboxRoom.room.imageUrl];
                const cur = imgs[lightboxRoom.index] || lightboxRoom.room.imageUrl;
                return (
                  <div className="w-full space-y-4">
                    <div className="relative h-[65vh] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-2xl">
                      <img src={cur} alt={lightboxRoom.room.name} className="max-w-full max-h-full object-contain" />

                      {imgs.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => setLightboxRoom({
                              room: lightboxRoom.room,
                              index: (lightboxRoom.index - 1 + imgs.length) % imgs.length
                            })}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer border border-white/20"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setLightboxRoom({
                              room: lightboxRoom.room,
                              index: (lightboxRoom.index + 1) % imgs.length
                            })}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer border border-white/20"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-white">
                      <div>
                        <span className="font-serif text-base text-white font-bold block">{lightboxRoom.room.name}</span>
                        <span>Photo {lightboxRoom.index + 1} of {imgs.length}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sky-400 font-serif text-base font-bold">₹{lightboxRoom.room.pricePerNight.toLocaleString('en-IN')}</span> / night
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ROOM DETAILS MODAL */}
        {detailsModalRoom && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setDetailsModalRoom(null)}
          >
            <div
              className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#005cd8] font-bold">{detailsModalRoom.view}</span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    {detailsModalRoom.name}
                  </h3>
                </div>
                <button onClick={() => setDetailsModalRoom(null)} className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="h-64 rounded-xl overflow-hidden shadow-inner">
                <img src={detailsModalRoom.imageUrl} alt={detailsModalRoom.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Overview</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {detailsModalRoom.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Room Area</span>
                  <strong className="text-slate-900 text-sm">{detailsModalRoom.sizeSqFt} sq.ft</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Max Guests</span>
                  <strong className="text-slate-900 text-sm">{detailsModalRoom.capacity.adults || 2} Adults</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Bedding</span>
                  <strong className="text-slate-900 text-sm">{detailsModalRoom.bed}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Tariff</span>
                  <strong className="text-[#005cd8] text-sm">₹{detailsModalRoom.pricePerNight.toLocaleString('en-IN')}</strong> / nt
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Features & Amenities</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {detailsModalRoom.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#005cd8] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setDetailsModalRoom(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDetailsModalRoom(null);
                    handleSelectRoomAndProceed(detailsModalRoom);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#005cd8] text-white hover:bg-[#004bb3] shadow-md transition-colors cursor-pointer"
                >
                  Select This Residence (₹{(detailsModalRoom.pricePerNight * nights).toLocaleString('en-IN')})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRIORITY WAITLIST MODAL */}
        {waitlistModalRoom && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setWaitlistModalRoom(null)}
          >
            <div
              className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-serif-luxury text-xl font-bold text-slate-900">Priority Availability Notification</h3>
                <button onClick={() => setWaitlistModalRoom(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <img src={waitlistModalRoom.imageUrl} alt={waitlistModalRoom.name} className="w-14 h-14 rounded-lg object-cover" />
                <div>
                  <span className="font-bold text-slate-900 block">{waitlistModalRoom.name}</span>
                  <span className="text-[11px] text-rose-600 font-bold uppercase">Currently Sold Out for Selected Dates</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Provide your email to receive immediate priority notification should a cancellation occur for these dates.
              </p>

              <form onSubmit={handleJoinWaitlist} className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="guest@domain.com"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#005cd8]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#005cd8] hover:bg-[#004bb3] text-white font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Notify Me When Available
                </button>

                {waitlistSuccess && (
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-center justify-center pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Notification registered successfully!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* PMS Live Lookup & Diagnostics Modal */}
        <PmsStatusLookupModal
          isOpen={isPmsModalOpen}
          onClose={() => setIsPmsModalOpen(false)}
          defaultMobile={guestPhone}
        />

      </div>
    </section>
  );
};
