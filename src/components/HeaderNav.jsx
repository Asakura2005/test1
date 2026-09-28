import React, { useState, useEffect } from 'react';
import { PRODUCT_DATA } from '../data/productData.js';

export default function HeaderNav({ onOpenOrderModal }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: PRODUCT_DATA.flashSale.initialHours ?? 0,
    minutes: PRODUCT_DATA.flashSale.initialMinutes ?? 28,
    seconds: PRODUCT_DATA.flashSale.initialSeconds ?? 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return {
          hours: PRODUCT_DATA.flashSale.initialHours ?? 2,
          minutes: PRODUCT_DATA.flashSale.initialMinutes ?? 45,
          seconds: PRODUCT_DATA.flashSale.initialSeconds ?? 18,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');
  const timerString = `${formatNumber(timeLeft.hours)}:${formatNumber(timeLeft.minutes)}:${formatNumber(timeLeft.seconds)}`;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] border-b border-surface-container-high">
      {/* Flash Sale Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary px-margin lg:px-8 py-1.5 text-center shadow-sm animate-shimmer-sweep">
        <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
        <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5 mx-auto">
            <span className="material-symbols-outlined text-[17px] text-golden-sesame animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-black text-white">
              {PRODUCT_DATA.flashSale.topBarText || 'FLASH SALE: GIẢM 50% + TẶNG SỐT & FREESHIP'}
            </span>
            <span className="bg-black/25 px-2 py-0.5 rounded-full text-[11px] font-mono tracking-widest font-black ml-1.5 text-butter-glow border border-white/20 shadow-xs">
              {timerString}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-16 px-margin lg:px-8">
        <div className="max-w-screen-xl mx-auto w-full h-full flex items-center justify-between gap-space-sm">
          {/* Mobile hamburger + Logo group */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <a className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-105" href="#" title="Bánh Tráng Cô Út - HAQ FOOD">
              <img
                alt={`Logo ${PRODUCT_DATA.brand.company}`}
                className="h-9 w-auto object-contain transition-transform group-hover:rotate-3"
                height="36"
                loading="eager"
                src={PRODUCT_DATA.brand.logo}
                title={`${PRODUCT_DATA.brand.companyShort} Logo`}
                width="41"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary leading-tight font-extrabold tracking-tight group-hover:text-primary-container transition-colors">
                  {PRODUCT_DATA.brand.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold tracking-wider">
                  {PRODUCT_DATA.brand.companyShort}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Desktop Navigation">
            {PRODUCT_DATA.navLinks?.map((link, index) => {
              const isOrderLink = link.label === 'Đặt hàng';
              return isOrderLink ? (
                <button
                  key={index}
                  type="button"
                  onClick={onOpenOrderModal}
                  className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors font-bold cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className="font-label-md text-label-md text-on-surface/80 hover:text-primary transition-colors font-semibold"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action buttons (Hotline + Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              className="h-10 px-3 flex items-center gap-2 rounded-full bg-secondary-container/10 text-secondary hover:bg-secondary-container/20 transition-colors"
              href={`tel:${PRODUCT_DATA.brand.hotlineTel}`}
              title="Hotline tư vấn đặt hàng"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span className="hidden lg:inline text-label-md font-bold text-secondary">
                {PRODUCT_DATA.brand.hotline}
              </span>
            </a>
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:text-primary transition-colors cursor-pointer"
              title="Xem giỏ hàng & Đặt hàng ngay"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-on-primary rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                1
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (when toggled) */}
      {mobileMenuOpen && (
        <nav id="mobile-nav-menu" aria-label="Mobile Navigation" className="lg:hidden bg-surface border-t border-surface-container-high px-margin py-3 shadow-md flex flex-col gap-2">
          {PRODUCT_DATA.navLinks?.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-body-md font-semibold text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
