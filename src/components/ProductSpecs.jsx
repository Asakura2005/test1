import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Factory, Globe2, FileText } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function ProductSpecs() {
  const qualitySpecs = [
    {
      label: "Đơn vị sản xuất & phân phối",
      value: "CÔNG TY CỔ PHẦN HAQ HÀ NỘI (MST: 0109547016)"
    },
    {
      label: "Chứng nhận an toàn quốc tế",
      value: "ISO 22000:2018 & Hệ thống phân tích mối nguy HACCP"
    },
    {
      label: "Công nghệ chế biến độc quyền",
      value: "Nướng nhiệt đối lưu & Sấy nổ phồng chân không (Không chiên ngập dầu)"
    },
    {
      label: "Quy cách đóng gói bảo quản",
      value: "Màng tráng nhôm 3 lớp ép nhiệt chân không, ngăn oxy & độ ẩm tuyệt đối"
    },
    {
      label: "Hạn sử dụng",
      value: "06 – 09 tháng (Luôn xuất kho hàng mới sản xuất trong tuần)"
    },
    {
      label: "Nguồn gốc nguyên liệu",
      value: "100% Nông sản sạch từ 34 vùng nguyên liệu đặc sản Việt Nam"
    },
    {
      label: "Cam kết 3 Không",
      value: "Không dầu tái chế • Không chất bảo quản độc hại • Không phẩm màu nhân tạo"
    },
    {
      label: "Kiểm nghiệm chất lượng",
      value: "Có bản tự công bố sản phẩm & Giấy chứng nhận định kỳ Viện KN ATVSTP Quốc Gia"
    }
  ];

  return (
    <section id="tieu-chuan" className="py-20 relative bg-[#F8FAF8] border-b border-emerald-950/5 subtle-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#15803D] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Năng Lực Sản Xuất & Kiểm Định</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900">
            Quy Chuẩn An Toàn Thực Phẩm Chuẩn Quốc Tế
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
            HAQ FOOD tự hào là một trong những đơn vị tiên phong chuẩn hóa đồ ăn vặt truyền thống Việt Nam theo tiêu chuẩn xuất khẩu sang thị trường Châu Á và quốc tế.
          </p>
        </div>

        {/* Detailed Specs Table + Visual Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase: Factory / Distribution Map */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-emerald-100 bg-white p-4 shadow-md">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200">
                <img
                  src={SITE_DATA.banners.exportMap}
                  alt="Hệ thống phân phối và xuất khẩu HAQ FOOD"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs text-stone-700">
                <p className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-[#15803D]" />
                  Phân phối toàn quốc & Xuất khẩu
                </p>
                <p className="text-[11px] text-stone-600">
                  Sản phẩm HAQ FOOD đã có mặt tại hàng nghìn điểm bán, chuỗi siêu thị và xuất khẩu sang Hàn Quốc, Đài Loan.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Data Specification Sheet */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-stone-900">
                    Hồ Sơ Năng Lực & Tiêu Chuẩn Sản Phẩm
                  </h3>
                  <p className="text-xs text-stone-500">
                    CÔNG TY CỔ PHẦN HAQ HÀ NỘI
                  </p>
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#15803D] text-white shadow-sm">
                  ISO 22000 & HACCP
                </span>
              </div>

              <div className="divide-y divide-stone-100 text-xs sm:text-sm">
                {qualitySpecs.map((s, idx) => (
                  <div key={idx} className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <span className="text-stone-500 font-medium sm:w-2/5 shrink-0">
                      {s.label}
                    </span>
                    <span className="text-stone-900 font-semibold sm:w-3/5 sm:text-right">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-xs text-[#15803D] font-semibold">
                  ★ Đầy đủ hồ sơ kiểm định ATTP & hóa đơn VAT cho đối tác
                </span>
                <a
                  href="#dat-hang"
                  className="px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 active:scale-95 transition-all shrink-0"
                >
                  Đặt Hàng Thưởng Thức
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
