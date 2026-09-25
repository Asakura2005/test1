import React from 'react';
import { Award, Phone, Mail, MapPin, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] border-t border-stone-800 text-stone-300 text-sm pt-12 pb-24 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          {/* Col 1: Company Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 px-3.5 rounded-xl bg-white border border-red-200 shadow-sm flex items-center justify-center">
                <img
                  src={SITE_DATA.brand.logo}
                  alt="HAQ FOOD Logo"
                  className="h-7 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="font-heading font-extrabold text-lg text-stone-900 tracking-wider ml-2">
                  HAQ <span className="text-[#DC2626]">FOOD</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed max-w-sm">
              <strong className="text-white">{SITE_DATA.brand.legalName}</strong> — Doanh nghiệp sản xuất và cung ứng các dòng sản phẩm đồ ăn vặt mang đậm hương vị truyền thống Việt Nam, phục vụ thị trường nội địa và xuất khẩu quốc tế.
            </p>

            <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              Nhà máy sản xuất đạt chuẩn quốc tế <strong>ISO 22000 & HACCP</strong>. Mã số doanh nghiệp: <strong>{SITE_DATA.brand.taxCode}</strong> do Sở KHĐT TP Hà Nội cấp.
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <p className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              DANH MỤC
            </p>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><a href="#menu-an-vat" className="hover:text-[#DC2626] transition-colors">Thực đơn ăn vặt</a></li>
              <li><a href="#bang-gia" className="hover:text-[#DC2626] transition-colors">Bảng combo giá</a></li>
              <li><a href="#cam-ket" className="hover:text-[#DC2626] transition-colors">Cam kết chất lượng</a></li>
              <li><a href="#danh-gia-faq" className="hover:text-[#DC2626] transition-colors">Đánh giá & Hỏi đáp</a></li>
              <li><a href="#dat-hang" className="hover:text-[#DC2626] transition-colors">Đặt hàng online</a></li>
            </ul>
          </div>

          {/* Col 3: Policy & Support (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <p className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              CHÍNH SÁCH
            </p>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><a href="#danh-gia-faq" className="hover:text-[#DC2626] transition-colors">Câu hỏi thường gặp</a></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Chính sách bảo mật</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Điều khoản dịch vụ</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Chính sách ăn thử & đổi trả</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Hợp tác B2B / Sỉ</span></li>
            </ul>
          </div>

          {/* Col 4: Contact Headquarter (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <p className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              TRỤ SỞ CÔNG TY
            </p>
            <div className="space-y-3 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
                <span className="leading-snug">{SITE_DATA.brand.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                <a href={`tel:${SITE_DATA.brand.hotlineRaw}`} className="hover:text-white font-bold text-[#DC2626] transition-colors">
                  {SITE_DATA.brand.hotline}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DC2626] shrink-0" />
                <a href={`mailto:${SITE_DATA.brand.email}`} className="hover:text-white transition-colors">
                  {SITE_DATA.brand.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3.5 py-1.5 rounded-lg bg-red-950/60 border border-red-800/40 text-xs font-semibold text-red-300">
                  Tổng đài tư vấn & Báo giá sỉ 24/7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 {SITE_DATA.brand.legalName}. Đã đăng ký toàn bộ bản quyền.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Chính sách bảo mật</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Điều khoản sử dụng</span>
            <span>•</span>
            <a href="#dat-hang" className="text-[#DC2626] font-semibold hover:underline">
              Đặt hàng online
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
