import React from 'react';
import { PRODUCT_DATA } from '../data/productData.js';

export default function ProductFeatures() {
  const { features } = PRODUCT_DATA;

  return (
    <section className="flex flex-col w-full px-margin py-space-md lg:px-8 lg:py-6 bg-surface-container-low shadow-sm lg:rounded-xl" id="features">
      <div className="max-w-screen-xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col text-left lg:text-center items-start lg:items-center mb-3 lg:mb-5">
          <span className="text-[11px] font-extrabold text-secondary uppercase tracking-wider bg-secondary/10 px-3 py-0.5 rounded-full mb-1">
            Hương Vị Đặc Sản Tây Ninh
          </span>
          <h2 className="font-headline-sm text-headline-sm lg:text-headline-md text-on-surface font-extrabold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[22px] lg:text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span>{features.sectionTitle}</span>
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            {features.sectionDesc}
          </p>
        </div>

        {/* 3 Compact, Visually Appealing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5">
          {features.items.map((item, index) => {
            const borderColors = ['border-primary/25', 'border-secondary/25', 'border-golden-sesame/35'];
            const tagColors = [
              'bg-primary/10 text-primary',
              'bg-secondary/10 text-secondary',
              'bg-amber-100 text-amber-800'
            ];
            return (
              <div
                key={index}
                className={`relative p-3.5 lg:p-4 rounded-xl bg-surface-container-lowest border ${borderColors[index]} flex flex-col gap-2.5 transition-all duration-300 hover:shadow-warm-md hover:-translate-y-1 group shadow-xs`}
              >
                {/* Top row: Icon + Tag */}
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl ${item.colorClass} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105`}>
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${tagColors[index]}`}>
                    {item.tag}
                  </span>
                </div>

                {/* Content: Title & Short Desc */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-headline-sm text-[15px] lg:text-[16px] text-on-surface font-extrabold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-[12.5px] text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
