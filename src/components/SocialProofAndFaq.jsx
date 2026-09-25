import React, { useState } from 'react';
import { CRO_DATA } from '../data/croData';

export default function SocialProofAndFaq() {
  const { reviews, faqs } = CRO_DATA;
  const [openFaq, setOpenFaq] = useState(0); // first item open by default

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? -1 : idx);
  };

  return (
    <section className="w-full py-8 sm:py-12 bg-surface" id="khach-hang-review">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] uppercase tracking-wider text-primary font-bold bg-primary/10 px-3 py-1 rounded-full inline-block mb-2">
            Chứng Thực Người Thật Việc Thật
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary leading-tight font-heading">
            Hơn 50,000+ Khách Hàng Đã Nghiện Bánh Tráng Trộn HAQ FOOD
          </h2>
          <p className="text-on-surface-variant mt-1.5 text-xs sm:text-sm">
            Lắng nghe chia sẻ thực tế từ các tín đồ ăn vặt trên khắp mọi miền tổ quốc.
          </p>
        </div>

        {/* 6 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-8 sm:mb-10">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-sm flex flex-col justify-between border border-surface-container hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-xs sm:text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-[13px] text-on-surface leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-3 border-t border-surface-container mt-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${rev.avatarBg}`}>
                  {rev.initials}
                </div>
                <div>
                  <span className="text-xs font-bold text-on-surface block font-heading">
                    {rev.name}
                  </span>
                  <span className="text-[10px] text-on-surface-variant block">
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ ACCORDION */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[11px] uppercase tracking-wider text-primary font-bold bg-primary/10 px-3 py-1 rounded-full inline-block mb-2">
              Giải Đáp Thắc Mắc
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-primary leading-tight font-heading">
              Câu Hỏi Thường Gặp Khi Mua Bánh Tráng HAQ FOOD
            </h3>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-surface-container transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between font-bold text-xs sm:text-sm text-on-surface hover:text-primary transition-colors cursor-pointer font-heading"
                  >
                    <span>{faq.question}</span>
                    <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 text-lg ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-3.5 sm:px-4 pb-4 pt-0 text-xs text-on-surface-variant leading-relaxed border-t border-surface-container/60 animate-fadeIn">
                      <p className="mt-2.5">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
