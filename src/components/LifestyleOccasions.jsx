import React from 'react';
import { CRO_DATA } from '../data/croData';

export default function LifestyleOccasions() {
  const { lifestyle } = CRO_DATA;

  return (
    <section className="w-full py-8 sm:py-12 bg-surface-container-low" id="huong-dan-thuong-thuc">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] uppercase tracking-widest text-primary font-bold bg-orange-100 px-3 py-1 rounded-full inline-block mb-2">
            {lifestyle.eyebrow}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 leading-tight font-heading">
            {lifestyle.title}
          </h2>
          <p className="text-stone-600 mt-1.5 text-xs sm:text-sm leading-relaxed">
            {lifestyle.desc}
          </p>
        </div>

        {/* 6 Grid Occasions - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {lifestyle.occasions.map((occ, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200/70 group"
            >
              <div className="overflow-hidden h-36 sm:h-40 bg-stone-100">
                <img
                  alt={occ.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={occ.image}
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <span className="text-primary font-bold text-[10px] uppercase tracking-wider block">
                  {occ.tag}
                </span>
                <h4 className="text-sm font-bold text-stone-900 mt-0.5 font-heading">
                  {occ.title}
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {occ.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4 BƯỚC THƯỞNG THỨC */}
        <div className="pt-6 border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="text-[11px] uppercase tracking-widest text-primary font-bold bg-orange-100 px-3 py-1 rounded-full inline-block mb-2">
              Trải Nghiệm Đỉnh Cao
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight font-heading">
              Cách Sử Dụng Đơn Giản Chỉ Với 4 Bước
            </h3>
            <p className="text-stone-600 mt-1 text-xs sm:text-sm">
              Mở nắp là có ngay bữa tiệc ăn vặt chuẩn vị Tây Ninh mà không cần lỉnh kỉnh tự trộn bát đũa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {lifestyle.steps.map((st) => (
              <div
                key={st.num}
                className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm text-center flex flex-col items-center relative group hover:shadow-md transition-shadow border border-stone-200/70"
              >
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center mb-3 font-heading">
                  {st.num}
                </div>
                <span className="material-symbols-outlined text-2xl text-primary mb-1.5">
                  {st.icon}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-heading">
                  {st.title}
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
