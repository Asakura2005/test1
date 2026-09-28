import React from 'react';
import { PRODUCT_DATA } from '../data/productData.js';
import LegalFlipbook from './LegalFlipbook';

export default function SafetySection() {
  const { safety } = PRODUCT_DATA;

  return (
    <section className="flex flex-col w-full px-margin lg:px-8 py-space-md lg:py-8 bg-surface-container-low shadow-sm lg:rounded-xl" id="safety">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col">
        {/* Section title */}
        <div className="flex flex-col text-center mb-4 lg:mb-6 max-w-2xl mx-auto">
          <span className="font-label-sm text-label-sm lg:text-label-md text-secondary uppercase font-extrabold tracking-wider">
            AN TÂM CHẤT LƯỢNG
          </span>
          <h2 className="font-headline-sm text-headline-sm lg:text-headline-md text-on-surface font-extrabold mt-1">
            Quy Trình Sản Xuất Chuẩn HACCP & ISO 22000
          </h2>
          <p className="font-body-sm text-[13px] lg:text-[14px] text-on-surface-variant mt-1.5">
            Sản phẩm Bánh Tráng Cô Út được kiểm định định kỳ tại Viện VNTEST, sản xuất khép kín bảo đảm an toàn thực phẩm.
          </p>
        </div>

        {/* 3D Interactive Flipbook Dossier (26 Trang Pháp Lý) */}
        <div className="p-4 lg:p-6 bg-surface-container-lowest rounded-2xl flex flex-col items-center border border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-2 mb-3 self-center text-center">
            <span className="material-symbols-outlined text-secondary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_stories
            </span>
            <span className="font-headline-sm text-[15px] lg:text-[17px] text-on-surface font-extrabold">
              Lật Xem Trực Tiếp Hồ Sơ Pháp Lý & Kiểm Nghiệm Mộc Đỏ (26 Trang)
            </span>
          </div>
          <div className="w-full">
            <LegalFlipbook />
          </div>
        </div>
      </div>
    </section>
  );
}
