import React from 'react';
import { CRO_DATA } from '../data/croData';

export default function StickyBottomBar({ selectedCombo, onSelectPlan, onOpenOrderModal }) {
  const activeId = selectedCombo || 'combo_da_nhan_cach';
  const currentCombo = CRO_DATA.combos.find(c => c.id === activeId) || CRO_DATA.combos[1];

  const handleClick = (e) => {
    e.preventDefault();
    if (onSelectPlan) onSelectPlan(currentCombo.id);
    if (onOpenOrderModal) {
      onOpenOrderModal(currentCombo.id);
    } else {
      const target = document.getElementById('form-dat-hang-final') || document.getElementById('form-dat-hang-lead-1');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 bg-surface-bright/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.08)] border-t border-surface-container py-2 lg:py-1.5 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Left Snack Info */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <img
            src={currentCombo.image}
            alt={currentCombo.name}
            className="w-9 h-9 sm:w-10 sm:h-10 lg:w-8 lg:h-8 rounded-lg object-cover border border-stone-200 shrink-0"
          />

          <div className="flex flex-col truncate">
            <div className="flex items-center gap-1.5">
              <span className="bg-primary text-white px-1.5 py-0.5 rounded-full font-bold uppercase text-[9px] tracking-wide shrink-0">
                {currentCombo.isPopular ? 'Bán Chạy Nhất' : 'Combo Ưu Đãi'}
              </span>
              <span className="text-on-surface truncate text-xs lg:text-[12px] font-bold font-heading">
                {currentCombo.name} ({currentCombo.isFreeship ? 'FREESHIP' : 'Ưu Đãi'})
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-primary font-extrabold text-xs lg:text-xs font-heading">
                {currentCombo.priceText}
              </span>
              <span className="text-outline line-through text-[10px]">
                {currentCombo.originalPrice}
              </span>
              {currentCombo.isFreeship && (
                <span className="text-emerald-700 font-semibold text-[10.5px] hidden md:inline">
                  • Miễn Phí Vận Chuyển
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <a
            className="hidden md:inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[11px] font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            href={CRO_DATA.brand.hotlineTel}
          >
            <span className="material-symbols-outlined text-sm mr-1 text-primary">phone_in_talk</span>
            <span>{CRO_DATA.brand.hotline}</span>
          </a>

          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-orange-500 hover:opacity-95 text-white min-h-[44px] sm:min-h-0 py-2 sm:py-1.5 lg:py-1.5 px-3.5 sm:px-4 lg:px-3.5 rounded-xl lg:rounded-lg transition-all shadow-sm gap-1 sm:gap-1.5 font-bold uppercase text-xs lg:text-[11px] tracking-wider transform active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">bolt</span>
            <span className="hidden sm:inline">Đặt {currentCombo.name} {currentCombo.priceText}</span>
            <span className="sm:hidden">Đặt {currentCombo.priceText}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
