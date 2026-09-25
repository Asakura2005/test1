import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function Testimonials() {
  return (
    <section id="danh-gia" className="py-20 relative bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#15803D] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Cộng Đồng Nghiện Ăn Vặt</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900">
            Khách Hàng Nói Gì Về Đồ Ăn Vặt HAQ FOOD?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
            Hơn 500.000 hộp ăn vặt đã được phục vụ cho giới văn phòng, học sinh sinh viên và các gia đình trên toàn quốc.
          </p>
        </div>

        {/* Testimonials 6 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_DATA.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FAF7F2] border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-bold text-amber-700 ml-1">5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-6">
                  "{t.content}"
                </p>
              </div>

              {/* Author Strip */}
              <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-200 shrink-0 shadow-sm"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-heading font-bold text-sm text-stone-900 truncate">
                      {t.name}
                    </p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-500 truncate">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
