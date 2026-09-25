import React from 'react';
import { CRO_DATA } from '../data/croData';

export default function EnterpriseFooter() {
  const { brand } = CRO_DATA;

  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant pt-8 pb-20 sm:pb-16 lg:pb-14 border-t border-surface-container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              alt="HAQ FOOD Logo"
              className="h-10 sm:h-11 w-auto object-contain"
              src={brand.logo}
            />
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            <strong className="text-on-surface">{brand.legalName}</strong> — Tiên phong nâng tầm đặc sản ăn vặt bánh tráng phơi sương Tây Ninh truyền thống chất lượng cao, đậm đà thơm ngon.
          </p>
        </div>

        {/* Corporate Info */}
        <div className="space-y-2.5">
          <h4 className="text-on-surface text-sm sm:text-base font-bold font-heading">
            Thông Tin Doanh Nghiệp
          </h4>
          <p className="text-xs">
            <strong className="text-on-surface">{brand.company}</strong>
          </p>
          <p className="text-xs">
            <span className="text-on-surface-variant">Mã số thuế: </span>
            <strong className="text-on-surface">{brand.taxCode}</strong>
            <span className="text-[11px] text-on-surface-variant block mt-0.5">({brand.taxIssuer})</span>
          </p>
          <p className="text-xs leading-relaxed">
            <span className="text-on-surface-variant">Trụ sở chính: </span>
            <span className="text-on-surface">{brand.headquarters}</span>
          </p>
          <p className="text-xs leading-relaxed">
            <span className="text-on-surface-variant">Xưởng sản xuất: </span>
            <span className="text-on-surface">{brand.factory}</span>
          </p>
        </div>

        {/* Contact & B2B */}
        <div className="space-y-2.5">
          <h4 className="text-on-surface text-sm sm:text-base font-bold font-heading">
            Liên Hệ & Tư Vấn B2B
          </h4>
          <p className="text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">phone_in_talk</span>
            <span>Hotline / Zalo: <a href={brand.hotlineTel} className="text-primary font-bold hover:underline">{brand.hotline}</a></span>
          </p>
          <p className="text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">call</span>
            <span>Tổng đài văn phòng: <a href="tel:02423235656" className="text-on-surface hover:text-primary font-semibold transition-colors">{brand.telOffice}</a></span>
          </p>
          <p className="text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">mail</span>
            <span>Email: <a href={`mailto:${brand.email}`} className="text-on-surface hover:text-primary transition-colors">{brand.email}</a></span>
          </p>
          <p className="text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">language</span>
            <span>Website: <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">{brand.website}</a></span>
          </p>
          <p className="text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">schedule</span>
            <span>Giờ mở cửa: {brand.workHours}</span>
          </p>
        </div>

        {/* Customer Policies */}
        <div className="space-y-2.5">
          <h4 className="text-on-surface text-sm sm:text-base font-bold font-heading">
            Chính Sách Khách Hàng
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#canh-bao-suc-khoe">
                <span className="material-symbols-outlined text-xs text-primary">verified_user</span>
                Chính sách đồng kiểm hàng trước khi trả tiền
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#canh-bao-suc-khoe">
                <span className="material-symbols-outlined text-xs text-primary">published_with_changes</span>
                Chính sách đổi trả 1 - 1 miễn phí trong 7 ngày
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#canh-bao-suc-khoe">
                <span className="material-symbols-outlined text-xs text-primary">shield</span>
                Cam kết 3 KHÔNG & Đóng hũ kín khí bảo quản 4 tháng
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors flex items-center gap-1.5" href={brand.hotlineTel}>
                <span className="material-symbols-outlined text-xs text-primary">storefront</span>
                Chính sách đại lý & nhà phân phối sỉ toàn quốc
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-5 border-t border-surface-container/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant text-center sm:text-left">
        <p>© 2026 {brand.company}. Mã số thuế: {brand.taxCode}. Tất cả quyền được bảo lưu.</p>
        <div className="flex items-center gap-3 text-[11px]">
          <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Cổng thông tin haq.com.vn
          </a>
          <span>•</span>
          <a href={brand.zaloUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Zalo Doanh Nghiệp
          </a>
          <span>•</span>
          <a href="#form-dat-hang-final" className="text-primary font-bold hover:underline">
            Đặt hàng nhanh
          </a>
        </div>
      </div>
    </footer>
  );
}
