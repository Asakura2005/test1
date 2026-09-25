import React, { useState } from 'react';
import { Check, ShoppingBag, Sparkles } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function SafetyChecklist() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất Cả Món Ngon' },
    { id: 'banh', name: 'Bánh Truyền Thống' },
    { id: 'banhtrang', name: 'Bánh Tráng Sấy' },
    { id: 'anvat', name: 'Bắp & Đồ Ăn Vặt' },
    { id: 'ankho', name: 'Thịt Sấy Khô' },
  ];

  const filteredProducts = SITE_DATA.products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'banh') return p.category.includes('Bánh') || p.category.includes('Phố Cổ');
    if (activeCategory === 'banhtrang') return p.category.includes('Bánh Tráng');
    if (activeCategory === 'anvat') return p.category.includes('Ăn Vặt') || p.id === 'bap-rang-bo';
    if (activeCategory === 'ankho') return p.category.includes('Ăn Khô');
    return true;
  });

  return (
    <section id="menu-an-vat" className="py-16 sm:py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#15803D] font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            THỰC ĐƠN SIGNATURE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900 tracking-tight">
            Bộ Sưu Tập Đồ Ăn Vặt Bán Chạy Nhất
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Hòa quyện giữa hương vị cổ truyền Hà Thành và công nghệ nướng sấy hiện đại, giữ trọn độ giòn thơm tự nhiên.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#15803D] text-white shadow-md shadow-emerald-700/20'
                  : 'bg-white text-stone-700 hover:bg-emerald-50 hover:text-[#15803D] border border-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 6 Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="rounded-2xl bg-white border border-stone-200 overflow-hidden flex flex-col justify-between hover:border-[#15803D] hover:shadow-xl transition-all duration-200 group"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#15803D] text-white text-[10px] font-bold border border-emerald-400/40 shadow-sm whitespace-nowrap">
                    {prod.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-white/95 backdrop-blur-sm text-[10px] font-bold text-stone-800 border border-stone-200 shadow-sm whitespace-nowrap">
                    {prod.weight}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-2.5">
                  <span className="text-[10px] font-mono text-[#15803D] uppercase tracking-wide font-bold">
                    {prod.category}
                  </span>
                  <h3 className="text-base font-heading font-bold text-stone-900 group-hover:text-[#15803D] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {prod.desc}
                  </p>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    {prod.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href="#dat-hang"
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-[#15803D] text-[#15803D] hover:text-white border border-emerald-200 hover:border-transparent font-heading font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Chọn Trong Combo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
