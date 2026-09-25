import React from 'react';
import { Check, ArrowRight, Truck, Gift, ShoppingBag } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function PricingCombos({ onSelectPlan }) {
  return (
    <section id="bang-gia" className="py-10 sm:py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wider block mb-1.5">
            TIẾT KIỆM HƠN KHI MUA COMBO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-900">
            Các Gói Combo Ăn Vặt Được Yêu Thích Nhất
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Miễn phí vận chuyển toàn quốc từ Combo Gia Đình. Mở thùng nếm thử giòn tan mới thanh toán tiền.
          </p>
        </div>

        {/* 3 Combo Cards - Balanced & Comfortable */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12">
          {SITE_DATA.pricingPlans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative transition-all ${
                  isPopular
                    ? 'bg-white border-2 border-[#DC2626] shadow-xl lg:-translate-y-2'
                    : 'bg-white border border-stone-200 hover:border-red-300 shadow-sm'
                }`}
              >
                {/* Best Seller Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#DC2626] text-white font-heading font-extrabold text-xs uppercase tracking-wider whitespace-nowrap shadow-md">
                    GÓI BÁN CHẠY NHẤT • FREESHIP
                  </div>
                )}

                <div>
                  {/* Card Title */}
                  <div className="mb-4">
                    <h3 className="text-xl font-heading font-bold text-stone-900">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-stone-500 mt-1">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-5 pb-5 border-b border-stone-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-900">
                        {plan.priceFormatted}
                      </span>
                      <span className="text-sm text-stone-500 font-medium">
                        {plan.unitText}
                      </span>
                    </div>

                    <div className="mt-2 text-sm font-semibold text-[#DC2626] flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>{plan.shippingFeeNote}</span>
                    </div>
                  </div>

                  {/* Danh sách món trong combo */}
                  <div className="mb-6 p-4 rounded-xl bg-[#FAF9F8] border border-stone-200/90 space-y-2.5">
                    <p className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-[#DC2626]" />
                      Món có trong combo:
                    </p>
                    <ul className="space-y-2 text-sm text-stone-700">
                      {plan.items.map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#DC2626] font-bold">•</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quyền lợi */}
                  <div className="space-y-2.5 mb-6">
                    {plan.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-stone-600">
                        <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nút chọn combo */}
                <div>
                  <button
                    onClick={() => onSelectPlan && onSelectPlan(plan.id)}
                    className={`w-full py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base tracking-wide transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      isPopular
                        ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-lg shadow-red-600/25'
                        : 'bg-stone-100 hover:bg-[#DC2626] text-stone-800 hover:text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Chọn Combo Này</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Savings Comparison Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-red-50/80 border border-red-200 shadow-sm">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#DC2626] text-white inline-block">
                BÀI TOÁN TIẾT KIỆM KHI MUA THEO COMBO
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-stone-900">
                Vì Sao Bạn Nên Chọn Combo Gia Đình 6 Món (269.000đ)?
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Mua lẻ 6 món ngoài thị trường: 280.000đ + Phí ship 25.000đ = <span className="line-through text-stone-400 font-semibold">305.000đ</span>.
                Đặt Combo Gia Đình hôm nay: Chỉ <strong>269.000đ</strong>, được <strong>MIỄN PHÍ SHIP</strong> và <strong>TẶNG 1 GÓI BÁNH SỮA DỪA (45k)</strong>.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center">
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-red-200 text-center shadow-sm w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-stone-500 font-medium block">Bạn tiết kiệm được:</span>
                <span className="text-3xl font-extrabold font-heading text-[#DC2626] block my-0.5">
                  81.000đ
                </span>
                <span className="text-xs text-stone-400">Đã gồm quà tặng & Freeship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Khối B2B / Đại lý tạp hóa */}
        <div className="rounded-2xl bg-[#FAF9F8] border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider block">
              DÀNH CHO ĐẠI LÝ & TẠP HÓA
            </span>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-stone-900">
              Nhập Sỉ Từ 20 Combo — Chiết Khấu Trực Tiếp Từ Xưởng
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
              Cung cấp cho tạp hóa, căng tin trường học, quán cà phê. Hỗ trợ kệ trưng bày và hóa đơn đỏ đầy đủ.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${SITE_DATA.brand.hotlineRaw}`}
              className="px-5 py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-bold shadow-sm"
            >
              Hotline B2B: {SITE_DATA.brand.hotlineMobile}
            </a>
            <a
              href="#dat-hang"
              onClick={() => onSelectPlan && onSelectPlan('enterprise')}
              className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-bold text-sm tracking-wide shadow-md shadow-red-600/20 transition-all active:scale-95"
            >
              Báo Giá Sỉ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
