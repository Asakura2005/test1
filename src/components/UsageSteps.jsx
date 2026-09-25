import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Coffee, Flame } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function UsageSteps() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="huong-dan" className="py-20 relative bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#15803D] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trải Nghiệm Tiện Lợi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900">
            4 Bước Đặt Hàng & Thưởng Thức Nhanh
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
            Chỉ 30 giây để đặt trọn combo đồ ăn vặt yêu thích, giao tận cửa nhà bạn trên toàn quốc.
          </p>
        </div>

        {/* 4 Steps Grid Progression */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {SITE_DATA.usageSteps.map((st, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-b from-emerald-50/70 via-white to-white border-2 border-[#15803D] shadow-lg scale-[1.02]'
                    : 'bg-white border border-stone-200 hover:border-emerald-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-4xl font-extrabold font-heading tracking-tight ${
                        isActive ? 'text-[#15803D]' : 'text-stone-300'
                      }`}
                    >
                      {st.step}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? 'bg-[#15803D] text-white shadow-sm'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      ✓
                    </span>
                  </div>

                  <h3
                    className={`text-base font-heading font-bold mb-2.5 ${
                      isActive ? 'text-[#15803D]' : 'text-stone-900'
                    }`}
                  >
                    {st.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className={isActive ? 'text-[#15803D] font-bold' : 'text-stone-400'}>
                    Bước {idx + 1}/4
                  </span>
                  <span className="text-[#15803D] font-bold flex items-center gap-1">
                    Chuẩn quy trình
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Snacking Tips Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-[#15803D] font-heading font-bold text-sm">
                <Coffee className="w-4 h-4 text-[#15803D]" />
                <span>MẸO THƯỞNG THỨC ĐỒ ĂN VẶT HAQ NGON CHUẨN VỊ NHẤT</span>
              </div>
              <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4">
                <li>Bánh Chả và Bánh Đậu Xanh thưởng thức cùng <strong className="text-stone-900">tách trà sen nóng hoặc trà đá</strong> sẽ cảm nhận trọn vẹn vị bùi béo, thơm ngậy.</li>
                <li>Bánh Tráng Sấy & Bắp Rang Bơ sau khi mở túi nếu chưa dùng hết, hãy <strong className="text-stone-900">kẹp chặt miệng túi hoặc để ngăn mát tủ lạnh</strong> để bánh luôn giòn tan rôm rốp.</li>
                <li>Bò Sấy Khô vắt thêm <strong className="text-stone-900">vài giọt chanh tươi</strong> để vị chua cay hòa quyện đánh thức vị giác tuyệt hảo.</li>
              </ul>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <a
                href="#dat-hang"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Đặt Combo Trải Nghiệm</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
