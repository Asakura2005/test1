import React from 'react';
import { Coffee, Heart, Utensils, ArrowRight } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function SnackPairings({ onSelectPlan }) {
  const { snackPairings } = SITE_DATA;

  return (
    <section className="py-10 sm:py-14 bg-[#FAF9F8] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wider block mb-1.5">
            GỢI Ý THƯỞNG THỨC
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-900">
            Món Ngon Kèm Nước Uống Chuẩn Vị
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Mỗi món ăn vặt HAQ khi kết hợp cùng đúng thức uống sẽ đánh thức trọn vẹn hương vị tinh tế nhất.
          </p>
        </div>

        {/* 4 Pairing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {snackPairings.map((p, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 hover:border-[#DC2626] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-red-50 text-[#DC2626]">
                    {p.tag}
                  </span>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-100" />
                </div>

                <h3 className="font-heading font-bold text-stone-900 text-lg mb-1 group-hover:text-[#DC2626] transition-colors">
                  {p.comboName}
                </h3>

                <div className="my-3.5 p-3.5 rounded-xl bg-[#FAF9F8] border border-stone-200/80 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-stone-800 font-semibold">
                    <Utensils className="w-4 h-4 text-[#DC2626]" />
                    <span>{p.snack}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700 font-semibold">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    <span>{p.drink}</span>
                  </div>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {p.reason}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100">
                <a
                  href="#bang-gia"
                  onClick={() => onSelectPlan && onSelectPlan('family')}
                  className="text-sm font-heading font-bold text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                >
                  <span>Đặt combo thưởng thức</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
