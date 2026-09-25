import React from 'react';
import { CheckCircle2, Box } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function UnboxingExperience() {
  const { unboxingDetails } = SITE_DATA;

  return (
    <section className="py-10 sm:py-14 bg-[#FAF9F8] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wider block mb-1.5">
            TRẢI NGHIỆM ĐẬP HỘP
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-900">
            Bên Trong Thùng Combo HAQ Có Gì?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Giải tỏa 100% nỗi lo bánh bị vỡ vụn hoặc ỉu mềm khi đặt hàng online. Quy cách đóng gói độc quyền chuẩn xuất khẩu.
          </p>
        </div>

        {/* 4 Unboxing Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {unboxingDetails.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-[#DC2626] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-heading font-extrabold text-base">
                    0{idx + 1}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#DC2626]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-stone-900 text-lg mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-2 text-sm text-[#DC2626] font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Kiểm tra trước khi nhận</span>
              </div>
            </div>
          ))}
        </div>

        {/* Unboxing Guarantee Banner */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-white border border-red-200 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/25">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <p className="font-heading font-bold text-base sm:text-lg text-stone-900">
                Cam kết nguyên vẹn: Bánh vỡ nát — Đổi ngay thùng mới 100%
              </p>
              <p className="text-stone-600 text-sm mt-1">
                Shipper giao tận cửa, bạn mở thùng nếm thử độ giòn rụm trước khi thanh toán tiền mặt (COD).
              </p>
            </div>
          </div>

          <a
            href="#bang-gia"
            className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-bold text-sm tracking-wide shrink-0 transition-colors shadow-md shadow-red-600/20 active:scale-95"
          >
            Xem Combo Bán Chạy
          </a>
        </div>
      </div>
    </section>
  );
}
