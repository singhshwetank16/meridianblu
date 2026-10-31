import React, { useState } from 'react';
import { MeridianBluLogo } from './MeridianBluLogo';
import { useRouter } from '../router';
import { HOTEL_INFO } from '../data/hotelData';
import {
  ArrowRight,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  CheckCircle2,
  Snowflake,
  Mountain
} from 'lucide-react';

interface FooterProps {
  onOpenConcierge?: () => void;
  onOpenPmsLookup?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConcierge, onOpenPmsLookup }) => {
  const { navigate } = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="bg-[#0b1c33] text-slate-300 pt-16 pb-10 border-t border-sky-900/40 relative overflow-hidden"
    >
      {/* Subtle ambient alpine glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#005cd8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <MeridianBluLogo
              theme="dark"
              onClick={() => navigate('/')}
            />

            <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed max-w-sm pt-1">
              Meridian Blu Mussoorie — Imperial Himalayan residence at 7,120 feet elevation. Restored cedar architecture, rare winterline twilight, and fireside mountain tranquility.
            </p>

            {/* Newsletter Pill Input */}
            <div className="pt-2">
              <form
                onSubmit={handleSubscribe}
                className="relative flex items-center bg-white rounded-full p-1 pl-5 max-w-[320px] shadow-lg group focus-within:ring-2 focus-within:ring-[#005cd8]"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-sm outline-none pr-2"
                  aria-label="Email Address for Newsletter"
                />
                <button
                  type="submit"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#005cd8] hover:bg-[#004bb3] active:bg-[#003d92] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2.5 animate-fade-in font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully to Himalayan Memoirs!</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/rooms')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Accommodations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  About Estate
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/trails')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Mountain Trails
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/gallery')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Visual Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/stories')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Guest Memoirs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
              Experiences
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('/rooms')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Online Room Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  360° Panoramic Tour
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/trails')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  George Everest Peak Trek
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Pine Steam &amp; Cedar Spa
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenConcierge) onOpenConcierge();
                    else navigate('/contact');
                  }}
                  className="hover:text-sky-300 transition-colors cursor-pointer text-left"
                >
                  Head Concierge Desk
                </button>
              </li>
              {onOpenPmsLookup && (
                <li>
                  <button
                    onClick={onOpenPmsLookup}
                    className="text-sky-300 hover:text-white font-bold transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Track PMS Booking / System Status</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
              Estate Coordinates
            </h3>
            
            <div className="space-y-4 text-sm text-slate-300">
              {/* Address */}
              <div className="flex items-start gap-3">
                <Mountain className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                <div className="leading-snug">
                  <div>Cloud Crest Ridge, near George Everest House,</div>
                  <div>Mussoorie, Uttarakhand 248179, India</div>
                  <div className="text-sky-300 font-mono text-xs pt-0.5 font-bold">7,120 Feet Elevation</div>
                </div>
              </div>

              {/* Phone and Email */}
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+911352638888"
                  className="flex items-center gap-2 hover:text-white transition-colors font-mono"
                >
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>+91 135 263 8888</span>
                </a>
                <a
                  href={`mailto:${HOTEL_INFO.reservationsEmail}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{HOTEL_INFO.reservationsEmail}</span>
                </a>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>24/7 Front Desk &amp; Concierge Desk</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="border-t border-sky-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Meridian Blu. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/rooms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Accommodations
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Virtual Tour
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-800 text-sky-300 hover:text-white hover:bg-sky-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
