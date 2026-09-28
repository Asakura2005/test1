import React from 'react';
import { PRODUCT_DATA } from '../data/productData.js';

export default function ReviewsSection() {
  const { reviews } = PRODUCT_DATA;

  return (
    <section className="flex flex-col w-full px-margin lg:px-8 py-space-md lg:py-8 bg-surface-container-lowest shadow-sm lg:rounded-xl" id="reviews">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between mb-3 lg:mb-6">
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-headline-sm lg:text-headline-md text-on-surface font-extrabold flex items-center gap-1.5 lg:gap-2">
              <span className="material-symbols-outlined text-amber-honey text-[24px] lg:text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>{' '}
              {reviews.sectionTitle}
            </h2>
            <span className="font-body-sm text-body-sm lg:text-body-md text-on-surface-variant mt-0.5">
              {reviews.summaryText}
            </span>
          </div>
        </div>

        {/* Review Cards: 2-COLUMN GRID on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 lg:gap-5">
          {reviews.items.map((review, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest p-4 lg:p-6 rounded-2xl shadow-sm flex flex-col gap-3 border border-outline-variant/30 transition-all duration-300 hover:shadow-warm-md hover:-translate-y-1 hover:border-primary/30 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/20 to-amber-honey/35 text-primary font-black flex items-center justify-center font-headline-sm text-[16px] lg:text-[18px] shrink-0 shadow-sm border border-outline-variant/40 group-hover:scale-105 transition-transform duration-300"
                  >
                    {review.initials}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline-sm text-label-md lg:text-title-sm text-on-surface font-black">{review.name}</h3>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        Đã mua
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] lg:text-body-sm text-on-surface-variant mt-0.5 font-medium">{review.comboName}</span>
                  </div>
                </div>
                <div className="flex text-amber-honey text-[15px] lg:text-[18px]">
                  {Array.from({ length: review.rating || 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[15px] lg:text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative pl-3.5 border-l-2 border-secondary/40">
                <p className="font-body-sm text-body-sm lg:text-[15px] text-on-surface leading-relaxed italic">
                  “{review.text.replace(/^["'“]|["'”]$/g, '').trim()}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
