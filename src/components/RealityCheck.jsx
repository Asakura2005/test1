import React from 'react';
import { Quote, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function RealityCheck() {
  const { story } = SITE_DATA;

  return (
    <section id="cau-chuyen" className="py-16 sm:py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[#15803D] font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            HƯƠNG VỊ & TÂM HUYẾT
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900 tracking-tight">
            {story.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Phục dựng lại tinh hoa ẩm thực đường phố Hà Nội bằng quy trình công nghệ sấy nướng sạch vô trùng, đem đến sự an tâm tuyệt đối cho từng bữa ăn vặt.
          </p>
        </div>

        {/* Editorial Story Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-emerald-100 bg-white p-2 shadow-md">
            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-100">
              <img
                src={SITE_DATA.banners.hero2}
                alt="Quy trình sản xuất bánh và đồ ăn vặt HAQ FOOD"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3.5 bg-[#F0FDF4] rounded-xl mt-2 text-xs text-stone-700 flex items-center justify-between border border-emerald-200/80">
              <span className="font-medium">Dây chuyền nướng sấy khép kín chuẩn ISO 22000</span>
              <span className="text-[#15803D] font-bold font-mono">Nhà máy Hà Nội</span>
            </div>
          </div>

          {/* Text & Philosophy Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative pl-6 border-l-4 border-[#15803D] py-1">
              <p className="text-base sm:text-lg text-stone-800 font-medium italic leading-relaxed">
                "{story.content}"
              </p>
            </div>

            <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
              <p>{story.mission}</p>
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-stone-700">
                <strong className="text-[#15803D] block mb-1 font-heading font-bold">Triết lý của người làm bánh HAQ:</strong>
                "{story.founderQuote}"
              </div>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-300 shadow-sm transition-colors">
                <p className="font-heading font-bold text-stone-900 text-xs mb-1">Công thức 10 năm</p>
                <p className="text-[11px] text-stone-600 leading-relaxed">Giữ trọn hương lá chanh phố cổ Hà Nội</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-300 shadow-sm transition-colors">
                <p className="font-heading font-bold text-stone-900 text-xs mb-1">Không dầu chiên bẩn</p>
                <p className="text-[11px] text-stone-600 leading-relaxed">Nướng sấy đối lưu, không ngấy, không nặng bụng</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-300 shadow-sm transition-colors">
                <p className="font-heading font-bold text-stone-900 text-xs mb-1">Khóa giòn 9 tháng</p>
                <p className="text-[11px] text-stone-600 leading-relaxed">Màng nhôm ép nhiệt kháng ẩm chuyên dụng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
