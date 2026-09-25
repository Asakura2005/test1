import React, { useState } from 'react';
import { ShoppingBag, Coffee, Utensils, Plus } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function ProductMenu({ onSelectPlan, onSelectRetail }) {
  const [activeTaste, setActiveTaste] = useState('all');

  const tasteTabs = [
    { id: 'all', label: 'Tất Cả Món' },
    { id: 'bui-la-chanh', label: '🌿 Bùi Béo Lá Chanh' },
    { id: 'cay-gion', label: '🌶️ Cay Giòn Đậm Vị' },
    { id: 'ngot-bo', label: '🍿 Ngọt Ngào Thơm Bơ' },
  ];

  const filteredItems = SITE_DATA.products.filter((item) => {
    if (activeTaste === 'all') return true;
    return item.tasteProfile?.tasteType === activeTaste;
  });

  return (
    <section id="menu-an-vat" className="py-10 sm:py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wider block mb-1.5">
            THỰC ĐƠN SIGNATURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-900">
            Khám Phá Hương Vị Ăn Vặt Đậm Đà
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Chọn theo gu vị giác của bạn: bùi béo cổ truyền, cay tê giòn rụm hoặc ngọt bơ thơm ngậy.
          </p>

          {/* Interactive Taste Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            {tasteTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTaste(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-heading font-bold transition-all ${
                  activeTaste === tab.id
                    ? 'bg-[#DC2626] text-white shadow-md shadow-red-600/25'
                    : 'bg-stone-100 text-stone-700 hover:bg-red-50 hover:text-[#DC2626]'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6 Products Grid Balanced & Appealing */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const tp = item.tasteProfile;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-stone-200 overflow-hidden bg-white hover:border-[#DC2626] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[16/11] bg-stone-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#DC2626] text-white text-xs sm:text-sm font-bold shadow-sm">
                      {item.tag}
                    </div>
                    <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-base sm:text-lg font-heading font-extrabold text-[#DC2626] border border-stone-200 shadow-sm">
                      {item.price} <span className="text-xs sm:text-sm text-stone-500 font-normal">/ {item.weight}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <h3 className="font-heading font-bold text-stone-900 text-lg sm:text-xl group-hover:text-[#DC2626] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed mt-1.5 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Sensory Indicators (Độ giòn, Vị) */}
                    <div className="p-3.5 rounded-xl bg-[#FAF9F8] border border-stone-200/80 space-y-2.5 text-xs sm:text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500 font-medium">Độ giòn rụm:</span>
                        <div className="flex items-center gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`w-2.5 h-2.5 rounded-full ${
                                i < (tp?.crunch || 4)
                                  ? 'bg-[#DC2626]'
                                  : 'bg-stone-200'
                              }`}
                            />
                          ))}
                          <span className="text-xs sm:text-sm font-bold text-[#DC2626] ml-1">
                            {tp?.crunch || 4}/5
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-stone-700">
                        <Utensils className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                        <span className="leading-snug">
                          <strong>Nguyên liệu:</strong> {tp?.ingredient}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-[#DC2626]">
                        <Coffee className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="leading-snug font-medium">
                          <strong>Gợi ý:</strong> {tp?.pairing}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 sm:p-6 pt-0 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectRetail && onSelectRetail(item.id)}
                    className="flex-1 py-3 rounded-xl bg-red-50 hover:bg-[#DC2626] text-[#DC2626] hover:text-white font-heading font-bold text-xs sm:text-sm tracking-wide text-center flex items-center justify-center gap-1.5 transition-all border border-red-200 active:scale-95 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Mua Lẻ ({item.price})</span>
                  </button>

                  <a
                    href="#dat-hang"
                    onClick={() => onSelectPlan && onSelectPlan('family')}
                    className="py-3 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-heading font-bold text-xs sm:text-sm tracking-wide text-center flex items-center justify-center transition-colors active:scale-95 shadow-sm"
                    title="Xem trong combo tiết kiệm"
                  >
                    <span>Xem Combo</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
