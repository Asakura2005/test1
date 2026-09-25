import React from 'react';
import { Briefcase, Tv, Users, Compass, Smile, Gift, Sparkles } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function TargetSpaces() {
  const getSpaceIcon = (iconName) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-amber-300" />;
      case 'Tv': return <Tv className="w-5 h-5 text-blue-400" />;
      case 'Users': return <Users className="w-5 h-5 text-emerald-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-purple-400" />;
      case 'Smile': return <Smile className="w-5 h-5 text-red-400" />;
      case 'Gift': return <Gift className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="dip-an-vat" className="py-20 relative bg-[#F8FAF8] border-b border-emerald-950/5 subtle-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#15803D] text-xs font-heading font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mọi Lúc Mọi Nơi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900">
            Những Khoảnh Khắc Chill Hết Nấc Cùng HAQ FOOD
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
            Dù là giờ giải lao văn phòng, tối cày phim hay tiệc tùng bạn bè cuối tuần, đồ ăn vặt HAQ luôn là người bạn đồng hành giòn tan không thể thiếu.
          </p>
        </div>

        {/* 6 Spaces Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_DATA.targetSpaces.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#15803D] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getSpaceIcon(item.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-[#15803D] border border-emerald-200">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-heading font-bold text-stone-900 mb-2 group-hover:text-[#15803D] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Trải nghiệm:</span>
                <span className="text-[#15803D] font-bold">Giòn tan • Thơm nức</span>
              </div>
            </div>
          ))}
        </div>

        {/* Occasion Showcase Banner */}
        <div className="mt-14 rounded-3xl overflow-hidden bg-white border border-emerald-100 p-6 sm:p-8 shadow-md">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] border border-stone-200 bg-stone-100">
              <img
                src={SITE_DATA.banners.hero3}
                alt="Đồ ăn vặt hiện đại HAQ FOOD"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] border border-emerald-200 inline-block">
                HƯƠNG VỊ KẾT NỐI TÌNH THÂN
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-stone-900 leading-tight">
                Gói Trọn Niềm Vui Trong Từng Miếng Bánh Giòn Tan
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Không chỉ là món ăn vặt ngon miệng, HAQ FOOD muốn mang đến cho bạn những phút giây thư giãn trọn vẹn bên bạn bè, gia đình sau những giờ làm việc mệt mỏi. Đặt ngay combo yêu thích để tủ đồ ăn vặt lúc nào cũng đầy ắp món ngon nhé!
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#bang-gia"
                  className="px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
                >
                  Xem Các Gói Combo Siêu Ưu Đãi →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
