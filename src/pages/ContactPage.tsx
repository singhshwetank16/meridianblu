import React, { useState } from 'react';
import { useRouter } from '../router';
import { HOTEL_INFO } from '../data/hotelData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Compass,
  Send,
  CheckCircle2,
  Sun,
  ShieldCheck,
  Snowflake
} from 'lucide-react';

interface ContactPageProps {}

const getNextDay = (dateStr: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || isNaN(parts[0])) return '';
  const next = new Date(parts[0], parts[1] - 1, parts[2] + 1);
  const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
};

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: 'maharaja suit',
    specialRequests: '',
    transportNeeded: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        roomType: 'maharaja suit',
        specialRequests: '',
        transportNeeded: false,
      });
    }, 6000);
  };

  return (
    <div className="space-y-16 pb-24 bg-[#f8fafc] text-slate-800">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-sky-50/80 via-white to-[#f8fafc] border-b border-sky-100 pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-[#005cd8] text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Snowflake className="w-3.5 h-3.5" />
            <span>24/7 Estate Concierge & Reservations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 tracking-tight font-normal">
            Contact Meridian Blu Mussoorie
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our Head Concierge and estate naturalists are at your command to arrange private mountain transfers, fireside dining, or bespoke Himalayan itineraries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#005cd8]" />
              Official Direct Reservation Desk
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#005cd8]" />
              24-Hour Front Desk Support
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Info + Inquiry Form */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Estate Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Estate Coordinates & Direct Lines
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Situated atop Cloud Crest Ridge, Mussoorie, overlooking the Garhwal snow peaks and the southern Doon Valley horizon.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-sky-50 text-[#005cd8] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-serif font-bold text-sm text-slate-900">Mountain Residence Address</div>
                  <div className="text-slate-600 leading-relaxed">
                    Meridian Blu Mussoorie Estate<br />
                    Cloud Crest Ridge, near George Everest House<br />
                    Mussoorie, Uttarakhand 248179, India
                  </div>
                  <div className="text-[#005cd8] font-mono text-[11px] pt-1 font-bold">
                    Elevation: 7,120 ft (2,170 m)
                  </div>
                </div>
              </div>

              {/* Telephone Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-sky-50 text-[#005cd8] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-serif font-bold text-sm text-slate-900">Telephone Concierge</div>
                  <div className="text-slate-600 leading-relaxed">
                    Reservations Hotline: <a href="tel:+919838020859" className="text-[#005cd8] font-bold hover:underline font-mono">+91 9838020859</a><br />
                    Concierge Mobile & WhatsApp: <a href="https://wa.me/919838020859" target="_blank" rel="noopener noreferrer" className="text-[#005cd8] font-bold hover:underline font-mono">+91 9838020859</a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-sky-50 text-[#005cd8] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-serif font-bold text-sm text-slate-900">Written Inquiries</div>
                  <div className="text-slate-600 leading-relaxed">
                    Direct Reservations: <a href={`mailto:${HOTEL_INFO.reservationsEmail}`} className="text-[#005cd8] font-semibold hover:underline">{HOTEL_INFO.reservationsEmail}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Private Concierge & Stay Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Send your requirements directly to our reservations team. We respond within two hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-[#005cd8] mx-auto" />
                  <div className="text-base font-serif font-bold text-slate-900">Inquiry Successfully Transmitted</div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, {formData.name || 'valued guest'}. Our Head Concierge has received your transmission and will contact you via {formData.email || 'email'} with personalized details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Singh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#005cd8] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="radhika.singh@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#005cd8] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#005cd8] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Preferred Residence Category</label>
                      <select
                        value={formData.roomType}
                        onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#005cd8] outline-none cursor-pointer"
                      >
                        <option value="maharaja suit">maharaja suit (₹2,200/nt)</option>
                        <option value="Couple with Nonveg Food">Couple with Nonveg Food (₹8,000/nt)</option>
                        <option value="Couple with Veg Food">Couple with Veg Food (₹6,000/nt)</option>
                        <option value="WOODEN COTTAGES">WOODEN COTTAGES (₹4,000/nt)</option>
                        <option value="TENT COTTAGES">TENT COTTAGES (₹3,000/nt)</option>
                        <option value="SUPER DELUXE">SUPER DELUXE (₹3,500/nt)</option>
                        <option value="OPEN GROUND ROOMS">OPEN GROUND ROOMS (₹4,000/nt)</option>
                        <option value="CEMI DELUXE">CEMI DELUXE (₹2,800/nt)</option>
                        <option value="DELUXE">DELUXE (₹2,400/nt)</option>
                        <option value="ECO HUTS">ECO HUTS (₹2,000/nt)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Anticipated Check-In</label>
                      <input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            checkIn: val,
                            checkOut: (!prev.checkOut || prev.checkOut <= val) ? getNextDay(val) : prev.checkOut
                          }));
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#005cd8] outline-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Anticipated Check-Out</label>
                      <input
                        type="date"
                        value={formData.checkOut}
                        min={formData.checkIn ? getNextDay(formData.checkIn) : undefined}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-[#005cd8] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 font-bold">Special Requests & Inquiries</label>
                    <textarea
                      rows={4}
                      placeholder="e.g. Candlelit terrace dinner, dietary requirements, guided Everest Peak trek, or anniversary arrangements..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#005cd8] outline-none resize-none"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={formData.transportNeeded}
                      onChange={(e) => setFormData({ ...formData, transportNeeded: e.target.checked })}
                      className="rounded accent-[#005cd8]"
                    />
                    <span className="text-xs text-slate-600">
                      Request private mountain SUV airport transfer from Dehradun Jolly Grant Airport.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#005cd8] hover:bg-[#004bb3] text-white transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Estate Travel Guide & Driving Directions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Travel Guide & Mountain Accessibility
            </h2>
            <p className="text-xs text-slate-600">
              Directions and transit times to Cloud Crest Ridge, Mussoorie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Car className="w-4 h-4 text-[#005cd8]" />
                <span>From Dehradun Airport (DED)</span>
              </div>
              <p>
                Distance: <strong>60 Kilometers</strong> (Approx. 95 to 110 minutes). Chauffeur service travels via Rajpur Road and the Mussoorie Bypass with uninterrupted mountain vistas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Compass className="w-4 h-4 text-[#005cd8]" />
                <span>From Dehradun Railway Station</span>
              </div>
              <p>
                Distance: <strong>35 Kilometers</strong> (Approx. 70 minutes). Direct connection to Vande Bharat and Shatabdi express trains from New Delhi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Winterline Observation Advisory</span>
              </div>
              <p>
                Daily between 17:15 and 17:45 hrs. Ensure arrival prior to sunset to experience your first tea against the crimson Doon Valley horizon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
