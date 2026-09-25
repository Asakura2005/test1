import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function CommonMistakes() {
  return (
    <section id="khac-biet" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#15803D] font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            TIÊU CHUẨN AN TOÀN
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900 tracking-tight">
            Vì Sao Đồ Ăn Vặt HAQ FOOD Khác Biệt Hoàn Toàn?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Sự khác biệt rõ ràng giữa đồ ăn vặt đóng gói thủ công trôi nổi và dây chuyền sấy nướng hiện đại đạt chuẩn ISO 22000 của HAQ FOOD.
          </p>
        </div>

        {/* 4 Clean Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {SITE_DATA.mistakesVsTruth.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl bg-white border border-stone-200 p-6 space-y-4 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-mono font-bold text-[#15803D]">
                  TIÊU CHÍ #0{m.id}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {m.riskLevel}
                </span>
              </div>

              {/* Bad vs Good Comparison */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-600">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-red-700 font-bold block text-xs mb-0.5">Thực tế vỉa hè / trôi nổi:</span>
                    <span>{m.mistake}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-900 pt-3 border-t border-stone-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[#15803D] font-bold block text-xs mb-0.5">Chuẩn sạch HAQ FOOD:</span>
                    <span className="text-stone-700 leading-relaxed">{m.reality}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-50/90 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-heading font-bold text-stone-900">
              Cam Kết Vàng: Ăn Thử Không Ngon — Hoàn Tiền 100%
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Bạn được quyền mở thùng kiểm tra nếm thử. Nếu bánh bị ỉu mềm hoặc không chuẩn vị, bạn có quyền từ chối nhận không mất phí.
            </p>
          </div>
          <a
            href="#dat-hang"
            className="px-6 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-emerald-700/20 shrink-0 whitespace-nowrap active:scale-95"
          >
            Trải Nghiệm Ngay
          </a>
        </div>
      </div>
    </section>
  );
}
