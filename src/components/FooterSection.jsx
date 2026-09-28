import React from 'react';
import { PRODUCT_DATA } from '../data/productData.js';

export default function FooterSection() {
  const { brand, footer } = PRODUCT_DATA;

  return (
    <footer className="w-full bg-gradient-to-b from-charcoal-ink via-[#241c1a] to-[#161211] text-warm-cream px-margin lg:px-8 pt-space-xl lg:pt-14 pb-space-lg lg:pb-14 mt-space-md border-t border-white/10 shadow-2xl">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col gap-6 lg:gap-8">
        {/* Top section: flex-col on mobile, flex-row on desktop (company info left + contact info right) */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
          {/* Company Info Left */}
          <div className="flex flex-col gap-2 lg:gap-3 lg:max-w-md">
            <span className="font-headline-sm text-label-lg lg:text-title-lg text-golden-sesame uppercase font-black tracking-wide">
              {brand.company}
            </span>
            <p className="font-body-sm text-body-sm lg:text-body-md text-warm-cream/70 leading-relaxed">
              {brand.tagline}
            </p>

            {/* Badges in a row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-amber-honey font-label-sm text-[12px] border border-golden-sesame/30 shadow-[0_0_10px_rgba(234,179,8,0.15)] hover:shadow-[0_0_15px_rgba(234,179,8,0.35)] transition-all">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> HACCP Codex 2020
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-amber-honey font-label-sm text-[12px] border border-golden-sesame/30 shadow-[0_0_10px_rgba(234,179,8,0.15)] hover:shadow-[0_0_15px_rgba(234,179,8,0.35)] transition-all">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span> ISO 22000:2018
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-butter-glow font-label-sm text-[12px] border border-secondary-container/40 shadow-[0_0_10px_rgba(253,101,30,0.15)] hover:shadow-[0_0_15px_rgba(253,101,30,0.35)] transition-all">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 100.000+ Khách Tin Dùng
              </span>
            </div>
          </div>

          {/* Contact info Right - in 2-column grid on desktop: lg:grid-cols-2 */}
          <div className="flex-1 lg:max-w-xl">
            <h4 className="font-headline-sm text-label-md font-extrabold text-golden-sesame mb-3 uppercase tracking-wider">
              Thông Tin & Cam Kết Chất Lượng
            </h4>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2.5 lg:gap-4 font-body-sm text-body-sm lg:text-[14px] text-warm-cream/85">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-golden-sesame shrink-0">phone_iphone</span>{' '}
                <span>Hotline: <a className="font-bold text-golden-sesame hover:underline" href={brand.hotlineTel ? `tel:${brand.hotlineTel}` : 'tel:0924703388'}>{brand.hotline}</a></span>
              </p>
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-golden-sesame shrink-0 mt-0.5">location_on</span>{' '}
                <span>{brand.address} | {brand.branch}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary-container shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_return</span>{' '}
                <span>Đổi trả miễn phí 100% trong 7 ngày</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary-container shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>{' '}
                <span>COD toàn quốc | Kiểm tra hàng trước khi nhận</span>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#1c1917] px-4 text-golden-sesame/50">
              <span className="material-symbols-outlined text-[20px]">restaurant</span>
            </span>
          </div>
        </div>

        {/* Wider Copyright bar */}
        <div className="pt-2 text-center font-label-sm text-label-sm lg:text-body-sm text-warm-cream/50 w-full">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
