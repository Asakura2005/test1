import React, { useState, useEffect } from 'react';
import { PhoneCall, ArrowUp, ShoppingCart } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function FloatingActions() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Column */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Scroll To Top */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            aria-label="Cuộn lên đầu trang"
            className="w-11 h-11 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 flex items-center justify-center shadow-lg transition-all active:scale-90"
          >
            <ArrowUp className="w-5 h-5 text-[#DC2626]" />
          </button>
        )}

        {/* Floating Hotline Dial (Only on Desktop, mobile has Sticky Bottom Bar) */}
        <a
          href={`tel:${SITE_DATA.brand.hotlineRaw}`}
          aria-label="Gọi ngay hotline"
          className="hidden lg:flex relative group items-center"
        >
          {/* Ripple rings */}
          <span className="absolute -inset-1 rounded-full bg-[#DC2626] opacity-40 animate-ping pointer-events-none" />
          <div className="relative w-14 h-14 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white p-3.5 flex items-center justify-center shadow-lg shadow-red-600/35 hover:scale-105 active:scale-95 transition-all">
            <PhoneCall className="w-6 h-6 animate-bounce" />
          </div>

          {/* Tooltip Label on hover */}
          <div className="hidden lg:group-hover:flex absolute right-16 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-heading font-bold text-red-300 shadow-xl whitespace-nowrap">
            Hotline HAQ: {SITE_DATA.brand.hotline}
          </div>
        </a>
      </div>

      {/* Sticky Mobile Bottom Bar (Conversion Booster) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-xl border-t border-stone-200 shadow-2xl flex items-center gap-2.5">
        <a
          href={`tel:${SITE_DATA.brand.hotlineRaw}`}
          className="w-1/3 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-heading font-bold text-sm flex items-center justify-center gap-1.5 shadow-sm"
        >
          <PhoneCall className="w-4 h-4 text-[#DC2626]" />
          <span>Gọi điện</span>
        </a>
        <a
          href="#dat-hang"
          className="w-2/3 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 active:scale-95 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Đặt Combo Ăn Vặt</span>
        </a>
      </div>
    </>
  );
}
