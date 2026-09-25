import React from 'react';
import { CRO_DATA } from '../data/croData';

export default function FlavorTrio({ onSelectPlan }) {
  const { signatureFlavors } = CRO_DATA;

  return (
    <section className="w-full py-8 sm:py-12 bg-white border-y border-stone-200/60" id="bo-suu-tap-vi">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] uppercase tracking-widest text-primary font-bold bg-orange-100 px-3 py-1 rounded-full inline-block mb-2">
            {signatureFlavors.eyebrow}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 leading-tight font-heading">
            <span className="sm:whitespace-nowrap">{signatureFlavors.title}</span>
            <span className="block text-primary text-lg sm:text-xl lg:text-2xl font-bold mt-1">
              {signatureFlavors.titleHighlight}
            </span>
          </h2>
        </div>

        {/* 5 Products Showcase - Even 5-column distribution on desktop, centered on tablet, smooth scroll on mobile */}
        <div className="flex overflow-x-auto sm:overflow-visible sm:flex sm:flex-wrap sm:justify-center lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8 sm:mb-10 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {signatureFlavors.items.map((item) => (
            <div
              key={item.id}
              className="w-[230px] shrink-0 snap-start sm:shrink sm:w-[calc(33.333%-12px)] lg:w-auto bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-stone-200/80 group"
            >
              {/* Product Photo with Badges */}
              <div className="relative overflow-hidden bg-stone-100 aspect-square">
                <div className={`absolute top-2 left-2 z-10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-xs ${item.badgeColor || 'bg-primary'}`}>
                  {item.badge}
                </div>
                <div className="absolute top-2 right-2 z-10 bg-white/95 backdrop-blur-md text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-stone-200/60">
                  {item.weight}
                </div>
                <img
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={item.image}
                  loading="lazy"
                />
              </div>

              {/* Card Body - Showcase only, no retail prices */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-xs text-primary">verified</span>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wide">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-bold text-stone-900 mb-2 font-heading leading-snug">
                    {item.name}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          idx === 0
                            ? 'bg-stone-100 text-stone-600'
                            : 'bg-orange-50 text-primary font-bold'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Sold by combo indicator with direct link */}
                <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 font-medium inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-amber-600">inventory_2</span>
                    <span>Túi 200g</span>
                  </span>
                  <a
                    href="#combo-uu-dai"
                    onClick={() => onSelectPlan && onSelectPlan('combo_da_nhan_cach')}
                    className="text-primary hover:text-primary-container font-extrabold text-[11px] inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Xem Combo</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Toàn Dòng Sản Phẩm Cô Út - Trọn Bộ 5 Vị Trong Combo Đa Nhân Cách */}
        <div className="bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-orange-50/70 rounded-2xl overflow-hidden shadow-xs border border-orange-200/80 grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-5 relative overflow-hidden aspect-square md:aspect-auto h-64 sm:h-80 md:h-full min-h-[260px] bg-amber-100/40 flex items-center justify-center p-2.5 sm:p-4">
            <img
              alt="Combo Đa Nhân Cách Trọn Bộ 5 Vị Bánh Tráng Cuộn Cô Út"
              className="w-full h-full object-contain rounded-xl shadow-xs"
              src={signatureFlavors.collectionBanner.image}
              loading="lazy"
            />
          </div>

          <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-primary text-[11px] font-bold uppercase">
                <span className="material-symbols-outlined text-xs">inventory</span>
                <span>Chỉ Phục Vụ Theo Combo • Không Bán Lẻ Từng Túi</span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 uppercase leading-snug font-heading">
                {signatureFlavors.collectionBanner.title}
              </h3>



              <div className="grid grid-cols-2 gap-2 pt-1">
                {signatureFlavors.collectionBanner.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <a
                href="#combo-uu-dai"
                onClick={() => onSelectPlan && onSelectPlan('combo_da_nhan_cach')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-orange-600 hover:from-primary-container hover:to-orange-700 text-white px-5 py-2.5 rounded-xl shadow-xs text-xs sm:text-sm font-bold uppercase tracking-wider transition-all transform active:scale-95 w-full sm:w-auto text-center"
              >
                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                <span>Xem Bảng Combo & Đặt Ngay ↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
