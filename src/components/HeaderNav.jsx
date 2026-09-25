import React, { useState, useEffect } from 'react';
import { CRO_DATA } from '../data/croData';

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 14, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n) => String(n).padStart(2, '0');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      {/* Top Flash Sale Announcement Bar - Ultra High-Contrast & High-Visibility */}
      <div className="bg-gradient-to-r from-red-700 via-orange-600 to-amber-700 text-white px-2 sm:px-4 py-1.5 flex items-center justify-between text-xs font-medium border-b border-yellow-400/40 shadow-[0_2px_12px_rgba(234,88,12,0.3)] relative overflow-hidden">
        {/* Shimmer Light Sheen Sweep */}
        <div className="absolute inset-0 pointer-events-none animate-shimmer-sweep"></div>

        {/* Left: Live Tag & Flash Sale Title */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative z-10 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-yellow-400/50 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
            </span>
            <span className="text-[10px] font-black uppercase text-yellow-300 tracking-wider">LIVE</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-yellow-400 text-stone-950 font-black px-1.5 sm:px-2 py-0.5 rounded text-[9.5px] sm:text-[11px] uppercase tracking-wide shadow-xs shrink-0">
            <span className="material-symbols-outlined text-xs text-red-600 font-black animate-pulse">local_fire_department</span>
            <span>FLASH SALE 50%</span>
          </span>
          <span className="hidden xl:inline text-white font-extrabold text-xs tracking-wide uppercase drop-shadow-sm">
            HÔM NAY CHỈ TỪ 99K
          </span>
        </div>

        {/* Center: High-Contrast Glowing Countdown Clock & Freeship */}
        <div className="flex items-center justify-center gap-1 sm:gap-3 mx-0.5 sm:mx-auto md:mx-0 relative z-10 shrink-0">
          <span className="font-extrabold text-white text-[11px] sm:text-xs hidden sm:inline drop-shadow-xs">
            Ưu đãi kết thúc sau:
          </span>
          <div className="inline-flex items-center gap-0.5 sm:gap-1 font-mono text-xs">
            <span className="bg-stone-950 px-1 sm:px-2 py-0.5 rounded border border-yellow-400/80 text-yellow-300 font-mono font-black text-[11px] sm:text-sm shadow-[0_0_8px_rgba(250,204,21,0.5)]">
              {format2(timeLeft.hours)}
            </span>
            <span className="text-yellow-300 font-black animate-pulse">:</span>
            <span className="bg-stone-950 px-1 sm:px-2 py-0.5 rounded border border-yellow-400/80 text-yellow-300 font-mono font-black text-[11px] sm:text-sm shadow-[0_0_8px_rgba(250,204,21,0.5)]">
              {format2(timeLeft.minutes)}
            </span>
            <span className="text-yellow-300 font-black animate-pulse">:</span>
            <span className="bg-stone-950 px-1 sm:px-2 py-0.5 rounded border border-yellow-400/80 text-yellow-300 font-mono font-black text-[11px] sm:text-sm shadow-[0_0_8px_rgba(250,204,21,0.5)]">
              {format2(timeLeft.seconds)}
            </span>
          </div>
          <span className="hidden lg:inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border border-emerald-300/60 shadow-xs">
            <span className="material-symbols-outlined text-xs text-yellow-200">local_shipping</span>
            <span>FREESHIP TỪ 149K</span>
          </span>
        </div>

        {/* Right: Hotline with Gentle Wiggle */}
        <div className="flex items-center gap-1.5 text-xs font-semibold relative z-10 shrink-0">
          <a
            className="inline-flex items-center gap-1 bg-stone-950/80 hover:bg-stone-950 border border-yellow-400/60 hover:border-yellow-300 px-1.5 sm:px-3 py-0.5 rounded-full text-white hover:text-yellow-300 transition-all text-xs shadow-xs group"
            href={CRO_DATA.brand.hotlineTel}
          >
            <span className="material-symbols-outlined text-xs sm:text-sm text-yellow-400 animate-wiggle">call</span>
            <span className="hidden md:inline text-white/90">Hotline:</span>
            <strong className="text-yellow-300 font-black tracking-tight text-[10px] sm:text-xs hidden min-[350px]:inline">{CRO_DATA.brand.hotlineDisplay}</strong>
            <strong className="text-yellow-300 font-black tracking-tight text-[10px] min-[350px]:hidden inline">Gọi ngay</strong>
          </a>
        </div>
      </div>

      {/* Main Navbar - Refined Height */}
      <div className="h-14 sm:h-16 bg-white/95 backdrop-blur-xl border-b border-surface-container transition-all">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-2">
            <img
              alt="HAQ FOOD Logo"
              className="h-9 sm:h-11 w-auto object-contain"
              src={CRO_DATA.brand.logo}
            />
            <div className="hidden lg:flex flex-col">
              <span className="font-bold text-primary tracking-tight leading-none text-base font-heading">
                HAQ FOOD
              </span>
              <span className="text-[10px] text-stone-500 tracking-wider uppercase font-semibold mt-0.5">
                Bánh Tráng Trộn Long An
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {CRO_DATA.header.navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-primary hover:bg-orange-50 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="#combo-uu-dai"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-container text-white text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-sm mr-1">shopping_bag</span>
              <span>Mua Ngay</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-surface-container shadow-xl px-4 py-3 space-y-1.5 animate-fadeIn">
          {CRO_DATA.header.navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 hover:bg-orange-50 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <a
              href={CRO_DATA.brand.hotlineTel}
              className="flex items-center gap-1.5 text-xs font-bold text-primary py-1.5"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              Hotline: {CRO_DATA.brand.hotlineDisplay}
            </a>
            <span className="text-[11px] text-primary font-bold">Freeship từ 149K</span>
          </div>
        </div>
      )}
    </header>
  );
}
