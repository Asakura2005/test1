import React, { useState, useEffect } from 'react';
import { PhoneCall, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function Navbar({ onSelectPlan }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Thực Đơn Món', href: '#menu-an-vat' },
    { name: 'Gói Combo Tiết Kiệm', href: '#bang-gia' },
    { name: 'Cam Kết Chất Lượng', href: '#cam-ket' },
    { name: 'Đánh Giá & FAQ', href: '#danh-gia-faq' },
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#450A0A] text-red-100/90 text-xs sm:text-sm py-2 px-4 border-b border-red-950/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-400"></span>
            <span className="font-medium text-red-50">
              Xưởng sản xuất Bánh Chả Phố Cổ, Bánh Tráng Sấy & Bắp Bơ chuẩn ISO 22000
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>Giao toàn quốc • Nếm thử trước khi thanh toán</span>
            <span className="text-amber-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 fill-amber-300" />
              Freeship từ Combo Gia Đình
            </span>
          </div>
        </div>
      </div>

      {/* Main Corporate Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm py-2 sm:py-2.5'
            : 'bg-[#FAF9F8]/95 backdrop-blur-md border-b border-stone-200/80 py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Authentic HAQ FOOD Brand Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl overflow-hidden border border-red-200 bg-white p-1 shrink-0 shadow-sm flex items-center justify-center group-hover:border-[#DC2626] transition-colors">
              <img
                src={SITE_DATA.brand.logo}
                alt="HAQ FOOD Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 leading-none">
                HAQ <span className="text-[#DC2626]">FOOD</span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-[#DC2626] mt-1 whitespace-nowrap">
                Đồ Ăn Vặt Sạch Chuẩn Vị Phố Cổ
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm sm:text-[15px] font-semibold text-stone-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#DC2626] transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC2626] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${SITE_DATA.brand.hotlineRaw}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-700 hover:text-stone-900 text-sm font-medium transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#DC2626]" />
              <span>Hotline: <strong className="text-[#DC2626] font-bold">{SITE_DATA.brand.hotline}</strong></span>
            </a>

            <a
              href="#dat-hang"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-bold text-sm tracking-wide transition-all shadow-md shadow-red-600/20 active:scale-95 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Đặt Combo Ăn Vặt</span>
            </a>
          </div>

          {/* Mobile & Tablet Actions (< lg) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <a
              href={`tel:${SITE_DATA.brand.hotlineRaw}`}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[#DC2626] flex items-center justify-center active:scale-95 transition-all"
              aria-label={`Gọi hotline ${SITE_DATA.brand.hotline}`}
            >
              <PhoneCall className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 focus:outline-none active:scale-95 transition-all"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-stone-800" /> : <Menu className="w-5 h-5 text-stone-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-red-100 shadow-xl px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg bg-stone-50 text-xs font-semibold text-stone-800 hover:bg-red-50 hover:text-[#DC2626] border border-stone-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <a
                href={`tel:${SITE_DATA.brand.hotlineRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-50 text-stone-800 text-xs font-semibold border border-red-200"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Hotline: <strong className="text-[#DC2626]">{SITE_DATA.brand.hotline}</strong></span>
              </a>
              <a
                href="#dat-hang"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#DC2626] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md shadow-red-600/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Đặt Mua Combo HAQ Ngay</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
