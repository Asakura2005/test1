import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShoppingBag, ShieldCheck, Star, Sparkles, Utensils } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function Hero({ onSelectPlan }) {
  const [activeSnackIndex, setActiveSnackIndex] = useState(0);

  const featuredSnacks = [
    {
      id: 'banh-cha',
      shortName: 'Bánh Chả',
      name: 'Bánh Chả Cổ Truyền Hà Nội',
      sub: 'Vỏ nếp vàng ruộm giòn tan, mỡ gáy ướp đường phèn, lá chanh tươi thơm nức',
      price: '45.000đ',
      weight: 'Gói 150g',
      tag: 'MÓN BÁN CHẠY #1',
      crunch: 5,
      image: SITE_DATA.banners.catBanh,
    },
    {
      id: 'banh-trang',
      shortName: 'Bánh Tráng Sấy',
      name: 'Bánh Tráng Sấy Giòn HOKI Tôm Cay',
      sub: 'Sấy phồng rôm rốp không ngậm dầu, phủ đẫm sốt ruốc tôm hành phi sa tế cay cay',
      price: '35.000đ',
      weight: 'Gói 120g',
      tag: 'HOT TREND GIỚI TRẺ',
      crunch: 5,
      image: SITE_DATA.banners.catBanhTrang,
    },
    {
      id: 'bap-bo',
      shortName: 'Bắp Caramel',
      name: 'Bắp Rang Bơ Nấm Phủ Caramel',
      sub: 'Hạt bắp nấm Mỹ bung tròn đều, ngập sốt caramel bơ Pháp ngọt thơm béo ngậy',
      price: '38.000đ',
      weight: 'Lon 180g',
      tag: 'NGỌT NGÀO THƠM BƠ',
      crunch: 4,
      image: SITE_DATA.banners.catAnVat,
    },
    {
      id: 'bo-kho',
      shortName: 'Bò Sấy Khô',
      name: 'Bò Sấy Khô Sợi Mềm Cay Tê',
      sub: 'Thịt bò tươi nguyên thớ xé sợi, ngấm đẫm sả ớt ngũ vị hương gia truyền',
      price: '85.000đ',
      weight: 'Hũ 200g',
      tag: 'ĐẬM ĐÀ ĐƯA MIỆNG',
      crunch: 3,
      image: SITE_DATA.banners.catAnKho,
    },
  ];

  const currentSnack = featuredSnacks[activeSnackIndex];

  return (
    <section className="relative pt-3 sm:pt-4 lg:pt-5 pb-8 sm:pb-10 lg:pb-12 bg-[#FAF9F8] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cột chữ bên trái */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-4.5 text-center lg:text-left">
            {/* Nhãn xưởng chuẩn ISO */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 shadow-sm text-xs sm:text-sm text-stone-700">
                <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                <span className="font-semibold text-stone-900">HAQ FOOD Hà Nội</span>
                <span className="text-stone-300">•</span>
                <span className="text-[#DC2626] font-bold">Chuẩn Quốc Tế ISO 22000</span>
              </div>
            </div>

            {/* Tiêu đề chính rõ ràng, xuống dòng sạch sẽ, không chồng đè chữ */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-stone-900 tracking-tight leading-[1.25]">
              <span className="block">Đồ Ăn Vặt HAQ FOOD</span>
              <span className="block mt-2.5 sm:mt-3.5 text-[#DC2626]">
                Giòn Tan Đậm Vị, Ăn Là Ghiền
              </span>
            </h1>

            {/* Đoạn mô tả nói thẳng vào các món ăn cụ thể để khách hiểu ngay */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Xưởng sản xuất trực tiếp tại Hà Nội, chuyên các món ăn vặt nướng sấy hảo hạng:{' '}
              <strong className="text-stone-900 font-bold underline decoration-red-300 underline-offset-2">Bánh Chả Lá Chanh Phố Cổ</strong>,{' '}
              <strong className="text-stone-900 font-bold underline decoration-red-300 underline-offset-2">Bánh Tráng Sấy Tôm Cay</strong>,{' '}
              <strong className="text-stone-900 font-bold underline decoration-red-300 underline-offset-2">Bắp Nấm Bơ Caramel</strong> và{' '}
              <strong className="text-stone-900 font-bold underline decoration-red-300 underline-offset-2">Bò Sấy Khô Sợi</strong>.
              Nướng sấy sạch sẽ, không dầu chiên lại, bảo vệ sức khỏe cho cả gia đình.
            </p>

            {/* Ưu đãi thu hút */}
            <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 text-left max-w-xl mx-auto lg:mx-0 text-sm sm:text-[15px] text-stone-700 flex items-center justify-between gap-3 shadow-sm">
              <div>
                <strong className="text-[#DC2626] font-heading font-bold block mb-0.5">Ưu đãi hôm nay:</strong>
                <span>Đặt Combo Gia Đình 6 món tặng ngay 1 gói Bánh Sữa Dừa (45k) + Freeship toàn quốc!</span>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-[#DC2626] text-white text-xs sm:text-sm font-bold shrink-0 shadow-sm">
                Tiết kiệm 81k
              </span>
            </div>

            {/* 3 Cam kết cốt lõi */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-1 text-sm sm:text-base text-stone-800 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0" />
                <span>Không dầu chiên lại</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0" />
                <span>Khóa giòn 9 tháng</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0" />
                <span>Mở hàng nếm thử mới trả tiền</span>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#bang-gia"
                onClick={() => onSelectPlan && onSelectPlan('family')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-bold text-sm sm:text-base tracking-wide transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-red-600/20 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Xem Combo Tiết Kiệm</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#menu-an-vat"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-red-50 border border-stone-300 hover:border-[#DC2626] text-stone-800 hover:text-[#DC2626] font-heading font-semibold text-sm sm:text-base transition-colors text-center"
              >
                <span>Xem Thực Đơn 6 Món</span>
              </a>
            </div>
          </div>

          {/* Cột phải: Khối Trưng Bày Món Ăn Vặt Tương Tác - Nhìn Là Thấy Ngay Đang Bán Gì */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-stone-200 bg-white p-3 sm:p-4 shadow-xl max-w-lg mx-auto">
              {/* Header của thẻ xem nhanh món */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-stone-700">
                    Món Ăn Vặt Đang Được Chọn Xem:
                  </span>
                </div>
                <span className="text-xs font-bold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded">
                  {currentSnack.tag}
                </span>
              </div>

              {/* Hình ảnh món ăn lớn hấp dẫn */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={currentSnack.image}
                  alt={currentSnack.name}
                  className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                  loading="eager"
                />

                {/* Tag giá to rõ ràng */}
                <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-stone-200 shadow-md">
                  <span className="text-lg font-heading font-black text-[#DC2626]">
                    {currentSnack.price}
                  </span>
                  <span className="text-xs text-stone-500 font-medium ml-1">
                    / {currentSnack.weight}
                  </span>
                </div>

                {/* Độ giòn rụm */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-stone-900/85 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <span>Độ giòn:</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < currentSnack.crunch ? 'opacity-100' : 'opacity-30'}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chi tiết tên món & mô tả ngắn vị giác */}
              <div className="pt-3.5 pb-2">
                <h3 className="font-heading font-bold text-stone-900 text-lg">
                  {currentSnack.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed line-clamp-2">
                  {currentSnack.sub}
                </p>
              </div>

              {/* 4 Nút Chọn Món Xem Nhanh - Trực quan 100% */}
              <div className="mt-2 pt-3 border-t border-stone-100">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Bấm để xem ảnh & vị của từng món:
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {featuredSnacks.map((snack, idx) => {
                    const isSelected = activeSnackIndex === idx;
                    return (
                      <button
                        key={snack.id}
                        type="button"
                        onClick={() => setActiveSnackIndex(idx)}
                        className={`p-1.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-red-50 border-2 border-[#DC2626] shadow-sm'
                            : 'bg-stone-50 border-stone-200 hover:border-red-300'
                        }`}
                      >
                        <div className="aspect-square w-full rounded-lg overflow-hidden mb-1 bg-white">
                          <img
                            src={snack.image}
                            alt={snack.shortName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className={`text-[11px] font-heading font-bold block truncate leading-tight ${
                          isSelected ? 'text-[#DC2626]' : 'text-stone-700'
                        }`}>
                          {snack.shortName}
                        </span>
                        <span className="text-[10px] text-stone-500 block truncate">
                          {snack.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Banner nếm thử trước khi trả tiền */}
              <div className="mt-3 p-2.5 bg-red-50/80 rounded-xl border border-red-200/80 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-stone-700 font-medium">
                  Mở thùng ăn thử giòn rụm tại chỗ mới thanh toán COD.
                </span>
                <a
                  href="#menu-an-vat"
                  className="text-[#DC2626] font-bold hover:underline shrink-0 ml-2"
                >
                  Xem tất cả →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dải 4 Danh Mục Món Ăn Vặt Tiêu Biểu Ngay Dưới Hero (Instant Category Strip) */}
        <div className="mt-8 pt-6 sm:mt-9 sm:pt-7 border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="text-xs font-heading font-bold text-[#DC2626] uppercase tracking-wider block">
              DANH MỤC SẢN PHẨM CHÍNH TẠI XƯỞNG
            </span>
            <p className="text-sm font-semibold text-stone-800 mt-1">
              4 Nhóm Đồ Ăn Vặt Được Sản Xuất Độc Quyền Theo Công Nghệ Nướng Sấy Hiện Đại
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <a
              href="#menu-an-vat"
              className="p-3 sm:p-4 rounded-xl bg-white border border-stone-200 hover:border-[#DC2626] hover:shadow-md transition-all group flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                <img src={SITE_DATA.banners.catBanh} alt="Bánh Phố Cổ" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#DC2626] truncate">
                  Bánh Nướng Phố Cổ
                </h4>
                <p className="text-[11px] text-stone-500 truncate">
                  Bánh chả, bánh đậu xanh, bánh dừa
                </p>
              </div>
            </a>

            <a
              href="#menu-an-vat"
              className="p-3 sm:p-4 rounded-xl bg-white border border-stone-200 hover:border-[#DC2626] hover:shadow-md transition-all group flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                <img src={SITE_DATA.banners.catBanhTrang} alt="Bánh Tráng Sấy" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#DC2626] truncate">
                  Bánh Tráng Sấy Tôm
                </h4>
                <p className="text-[11px] text-stone-500 truncate">
                  Giòn rụm rôm rốp sốt sa tế
                </p>
              </div>
            </a>

            <a
              href="#menu-an-vat"
              className="p-3 sm:p-4 rounded-xl bg-white border border-stone-200 hover:border-[#DC2626] hover:shadow-md transition-all group flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                <img src={SITE_DATA.banners.catAnVat} alt="Bắp Rang Bơ" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#DC2626] truncate">
                  Bắp Bơ Nấm Caramel
                </h4>
                <p className="text-[11px] text-stone-500 truncate">
                  Bắp nấm Mỹ ngọt béo bơ Pháp
                </p>
              </div>
            </a>

            <a
              href="#bang-gia"
              className="p-3 sm:p-4 rounded-xl bg-white border border-stone-200 hover:border-[#DC2626] hover:shadow-md transition-all group flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                <img src={SITE_DATA.banners.catAnKho} alt="Bò Sấy & Combo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#DC2626] truncate">
                  Bò Sấy Khô & Combo
                </h4>
                <p className="text-[11px] text-stone-500 truncate">
                  Thịt tươi cay tê • Thùng ăn thử
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
