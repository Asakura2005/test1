import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative bg-[#FAF7F2] border-b border-stone-200/70 subtle-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#15803D] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Giải Đáp Thắc Mắc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900">
            Câu Hỏi Thường Gặp Về Đồ Ăn Vặt HAQ
          </h2>
          <p className="mt-3 text-sm text-stone-600">
            Tất cả những điều bạn cần biết về nguồn gốc, quy trình sấy nướng và chính sách ăn thử của HAQ FOOD.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {SITE_DATA.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                  isOpen
                    ? 'bg-white border-2 border-[#15803D] shadow-md'
                    : 'bg-white border border-stone-200 hover:border-stone-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-heading font-bold ${
                    isOpen ? 'text-[#15803D]' : 'text-stone-900'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                    isOpen
                      ? 'bg-[#15803D] text-white border-[#15803D] rotate-180'
                      : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-3 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Assistance Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200 text-center text-xs text-stone-600 shadow-sm">
          Bạn cần tư vấn thêm về khẩu vị hoặc đặt đơn hàng lớn? Gọi ngay hotline 24/7:{' '}
          <a
            href={`tel:${SITE_DATA.brand.hotlineRaw}`}
            className="text-[#15803D] font-bold hover:underline"
          >
            {SITE_DATA.brand.hotline}
          </a>{' '}
          hoặc gửi email tới{' '}
          <a
            href={`mailto:${SITE_DATA.brand.email}`}
            className="text-[#15803D] font-bold hover:underline"
          >
            {SITE_DATA.brand.email}
          </a>
        </div>
      </div>
    </section>
  );
}
