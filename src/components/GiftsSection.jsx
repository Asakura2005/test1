import React from 'react';
import { PRODUCT_DATA } from '../data/productData.js';

export default function GiftsSection() {
  const { gifts } = PRODUCT_DATA;

  return (
    <section className="flex flex-col w-full px-margin py-space-md lg:px-8 lg:py-8 bg-butter-glow shadow-sm border-y border-golden-sesame/20 lg:rounded-xl lg:border" id="gifts">
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2 lg:mb-4">
          <span className="material-symbols-outlined text-primary text-[24px] lg:text-[30px]">redeem</span>
          <h2 className="font-headline-sm text-headline-sm lg:text-headline-md text-primary font-extrabold uppercase">
            {gifts.sectionTitle}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row bg-surface-container-lowest rounded-2xl p-4 lg:p-7 shadow-warm-sm gap-4 lg:gap-8 border-2 border-dashed border-golden-sesame/50 relative overflow-hidden items-center lg:items-stretch">
          {/* Gift Image with Floating Value Badge - Left Column on Desktop */}
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[480px] mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-surface-container-low flex-shrink-0 group shadow-sm flex items-center justify-center">
            <img
              alt={gifts.imageAlt}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-102"
              height="512"
              loading="lazy"
              src={gifts.image}
              title={gifts.imageAlt}
              width="512"
            />
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-honey to-secondary text-white px-3.5 py-1.5 rounded-full text-label-sm font-extrabold shadow-lg flex items-center gap-1.5 ring-2 ring-white/50 z-10">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span>{gifts.valueText}</span>
            </div>
          </div>

          {/* Gift Items List + CTA - Right Column on Desktop */}
          <div className="flex flex-col justify-between gap-4 lg:w-1/2">
            <div className="flex flex-col gap-3 lg:gap-3.5">
              {gifts.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-container-low/50 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-[22px] lg:text-[26px] mt-0.5 flex-shrink-0 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-label-md lg:text-label-lg text-on-surface font-extrabold">{item.title}</h3>
                    <p className="font-body-sm text-body-sm lg:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA notice */}
            <div className="bg-peach-tint/80 border border-secondary/20 p-3 lg:p-4 rounded-xl flex items-center gap-2.5 mt-1 lg:mt-2 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[22px] lg:text-[26px] flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="font-headline-sm text-body-sm lg:text-body-md text-primary font-black">
                {gifts.cta}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
