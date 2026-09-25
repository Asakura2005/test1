import React from 'react';
import { CRO_DATA } from '../data/croData';
import LegalFlipbook from './LegalFlipbook';

export default function RiskAndTrust() {
  const { riskReversal } = CRO_DATA;

  return (
    <section className="w-full py-8 sm:py-12 bg-surface-container-low" id="canh-bao-suc-khoe">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] uppercase tracking-widest text-error font-bold bg-error-container/40 px-3 py-1 rounded-full inline-block mb-2">
            {riskReversal.eyebrow}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 leading-tight font-heading">
            {riskReversal.title}
          </h2>
        </div>

        {/* 3 Shocking Metrics - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8 text-center">
          {riskReversal.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center border border-stone-200/70"
            >
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${m.bgIcon} flex items-center justify-center ${m.iconColor} mb-2`}>
                <span className="material-symbols-outlined text-xl">{m.icon}</span>
              </div>
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-black font-heading ${m.statColor}`}>
                {m.stat}
              </span>
              <span className="text-xs sm:text-sm text-stone-900 font-bold mt-1 font-heading">
                {m.title}
              </span>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Common Mistakes - Compact */}
        <div className="max-w-3xl mx-auto space-y-2.5 mb-8">
          <h3 className="text-center text-stone-900 font-bold text-xs sm:text-sm mb-2.5 uppercase tracking-wide font-heading">
            Những Sai Lầm Phổ Biến Khi Chọn Mua Bánh Tráng
          </h3>

          {riskReversal.mistakes.map((mis) => (
            <div
              key={mis.num}
              className="bg-white p-3 sm:p-3.5 rounded-xl shadow-sm flex items-start gap-2.5 sm:gap-3 border border-stone-200/70"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-error-container text-error flex items-center justify-center shrink-0 font-bold text-xs">
                {mis.num}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-heading">
                  {mis.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 leading-relaxed">
                  {mis.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Solution & Official Legal Certificate */}
        <div className="pt-6 sm:pt-8 border-t border-stone-200/80">
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
            <span className="text-[11px] uppercase tracking-widest text-primary font-bold bg-orange-100 px-3 py-1 rounded-full inline-block mb-2">
              {riskReversal.solution.eyebrow}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 leading-tight font-heading">
              {riskReversal.solution.title}
              <span className="block text-primary text-lg sm:text-xl lg:text-2xl font-bold mt-0.5">
                {riskReversal.solution.titleAccent}
              </span>
            </h2>
          </div>

          {/* Full-Width Interactive Flipbook Dossier */}
          <div className="w-full">
            <LegalFlipbook />
          </div>
        </div>
      </div>
    </section>
  );
}
