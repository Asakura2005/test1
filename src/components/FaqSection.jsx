import React from 'react';
import { PRODUCT_DATA } from '../data/productData.js';

export default function FaqSection() {
  const { faqs } = PRODUCT_DATA;

  return (
    <section className="flex flex-col w-full px-margin lg:px-8 py-space-md lg:py-8 bg-surface-container-low shadow-sm lg:rounded-xl" id="faq">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col">
        {/* Section title centered on desktop */}
        <div className="flex flex-col mb-4 lg:mb-8 text-left lg:text-center lg:items-center">
          <h2 className="font-headline-sm text-headline-sm lg:text-headline-md text-on-surface font-extrabold flex items-center justify-start lg:justify-center gap-1.5 lg:gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px] lg:text-[32px]">help</span> {faqs.sectionTitle}
          </h2>
          <span className="font-body-sm text-body-sm lg:text-body-md text-on-surface-variant mt-1">
            {faqs.sectionDesc}
          </span>
        </div>

        {/* Accordion Items with max-width for readability */}
        <div className="flex flex-col gap-3 lg:gap-3.5 w-full lg:max-w-3xl lg:mx-auto">
          {faqs.items.map((faq, index) => (
            <details
              key={index}
              className="group bg-surface-container-lowest p-4 lg:p-5 rounded-2xl cursor-pointer border border-outline-variant/30 transition-all duration-300 hover:border-primary/40 hover:shadow-warm-sm open:border-l-4 open:border-l-primary open:bg-primary/[0.03] open:shadow-sm group-open:border-l-4 group-open:border-l-primary group-open:bg-primary/[0.03] group-open:shadow-sm"
            >
              <summary className="font-headline-sm text-[15px] lg:text-[16px] text-on-surface font-extrabold flex items-center justify-between list-none select-none group-open:text-primary transition-colors">
                <span className="flex-1 pr-3">{faq.question}</span>
                <span className="material-symbols-outlined text-on-surface-variant group-open:text-primary group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                  expand_more
                </span>
              </summary>
              <div className="pt-3 border-t border-outline-variant/20 mt-3 animate-fadeIn">
                <p className="font-body-sm text-body-sm lg:text-[14px] text-on-surface-variant/85 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Final Fast Trigger CTA - wider on desktop with flex-row layout */}
        <div className="mt-4 lg:mt-8 p-3.5 lg:p-6 bg-gradient-to-r from-peach-tint to-butter-glow rounded-xl flex flex-row items-center justify-between border border-sauce-border w-full lg:max-w-3xl lg:mx-auto shadow-sm gap-3">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md lg:text-title-sm text-primary font-bold">{faqs.ctaTitle}</span>
            <span className="font-body-sm text-[11px] lg:text-body-sm text-on-surface-variant">{faqs.ctaDesc}</span>
          </div>
          <a
            className="bg-primary text-on-primary font-label-sm text-label-sm lg:font-label-md lg:text-label-md px-3.5 py-2 lg:px-6 lg:py-3 rounded-lg font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all uppercase whitespace-nowrap shrink-0"
            href="#fast-order-form"
          >
            {faqs.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
