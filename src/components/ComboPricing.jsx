import React from 'react';
import { CRO_DATA } from '../data/croData';

export default function ComboPricing({ selectedCombo, onSelectCombo, onOpenOrderModal }) {
  const { combos, giftPackage, brand } = CRO_DATA;

  const handleSelect = (comboId) => {
    if (onSelectCombo) onSelectCombo(comboId);
    if (onOpenOrderModal) {
      onOpenOrderModal(comboId);
    } else {
      const formElem = document.getElementById('form-dat-hang-lead-1');
      if (formElem) {
        formElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 bg-surface scroll-mt-20" id="combo-uu-dai">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] uppercase tracking-widest text-primary font-bold bg-orange-100 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-xs">local_mall</span>
            <span>BẢNG GIÁ ƯU ĐÃI HÔM NAY</span>
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 leading-tight font-heading">
            Chọn Combo Đặc Sản Long An Siêu Ưu Đãi
          </h2>
          <p className="text-primary font-bold text-xs sm:text-sm mt-1">
            Tiết Kiệm Tới 50% • Quà Tặng Độc Quyền • Freeship Từ Combo 149K!
          </p>
          <p className="text-stone-500 mt-1 text-xs sm:text-sm">
            Mỗi gói combo được phối vị cân đối giữa độ dẻo dai truyền thống và giòn rụm đậm đà.
          </p>
        </div>

        {/* 4 Combo Cards - Responsive Grid with Real Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-3.5 mb-8 sm:mb-10">
          {combos.map((combo) => {
            const isChosen = selectedCombo === combo.id;

            return (
              <div
                key={combo.id}
                className={`rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-col justify-between relative transition-all duration-300 bg-white ${
                  combo.isPopular
                    ? 'shadow-lg ring-2 ring-primary transform lg:-translate-y-1.5 border-2 border-primary/40'
                    : isChosen
                    ? 'ring-2 ring-primary border border-primary/50 shadow-md'
                    : 'hover:shadow-md border border-stone-200/90'
                }`}
              >
                {/* Popular / Recommended Ribbon Tag */}
                {combo.popularTag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-orange-500 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow whitespace-nowrap z-20">
                    {combo.popularTag}
                  </div>
                )}

                <div>
                  {/* Real Combo Poster Image - Full Aspect Square (1:1) */}
                  <div className="relative overflow-hidden rounded-xl bg-amber-50/40 mb-3 group aspect-square">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Discount Badge */}
                    <span className="absolute top-2 left-2 bg-error text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
                      {combo.discountText}
                    </span>
                  </div>

                  {/* Combo Name */}
                  <h3 className="text-sm sm:text-base font-extrabold text-stone-900 font-heading leading-tight">
                    {combo.name}
                  </h3>
                  <p className="text-[10.5px] sm:text-[11px] text-stone-500 font-medium mt-0.5 line-clamp-1">
                    {combo.subName}
                  </p>

                  {/* Price Section */}
                  <div className="mt-2.5 flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-black text-primary font-heading tracking-tight">
                      {combo.priceText}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      {combo.originalPrice}
                    </span>
                  </div>

                  {/* Shipping Tag */}
                  <div className="mt-1">
                    {combo.isFreeship ? (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-xs">local_shipping</span>
                        <span>FREESHIP TOÀN QUỐC</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-xs">local_shipping</span>
                        <span>{combo.shippingText}</span>
                      </span>
                    )}
                  </div>

                  {/* Features & Gift Checklist */}
                  <ul className="mt-2.5 space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-2.5">
                    {combo.features.map((feat, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-1.5 ${
                          feat.gift
                            ? 'bg-orange-50/80 p-1.5 rounded-lg border border-orange-200/60 text-primary font-bold'
                            : feat.bold
                            ? 'font-semibold text-stone-900'
                            : ''
                        }`}
                      >
                        <span className={`material-symbols-outlined text-sm mt-0.5 shrink-0 ${
                          feat.gift
                            ? 'text-primary'
                            : feat.ship
                            ? 'text-emerald-600'
                            : 'text-primary'
                        }`}>
                          {feat.gift ? 'redeem' : feat.ship ? 'local_shipping' : 'check_circle'}
                        </span>
                        <span className="leading-snug text-[10.5px] sm:text-xs">{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={() => handleSelect(combo.id)}
                  className={`mt-3.5 w-full py-2 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center block transition-all shadow-sm active:scale-95 cursor-pointer ${
                    combo.isPopular
                      ? 'bg-gradient-to-r from-primary to-orange-500 hover:opacity-95 text-white shadow-md'
                      : isChosen
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-orange-50 hover:bg-orange-100 text-primary border border-orange-200'
                  }`}
                >
                  {isChosen ? '✓ Đã Chọn Gói Này' : combo.isPopular ? '🔥 Đặt Combo 149K Này' : 'Chọn Combo Này'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Dedicated Gift Showcase Section (media_1790220403469) */}
        {giftPackage && (
          <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl p-4 sm:p-6 border border-orange-200 shadow-sm" id="combo-qua-tang-section">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-5">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-primary font-bold bg-white px-3 py-1 rounded-full inline-flex items-center gap-1 border border-orange-200 mb-1.5">
                  <span className="material-symbols-outlined text-xs text-primary">redeem</span>
                  <span>{giftPackage.badge}</span>
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-stone-900 font-heading">
                  {giftPackage.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  {giftPackage.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
                {/* Real Gift Photo */}
                <div className="md:col-span-5 relative group">
                  <div className="overflow-hidden rounded-2xl border-2 border-orange-200 shadow-md bg-white">
                    <img
                      src={giftPackage.image}
                      alt={giftPackage.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-error text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow">
                    Quà Tặng Kèm 0Đ
                  </div>
                </div>

                {/* Gift Descriptions */}
                <div className="md:col-span-7 space-y-3 sm:space-y-3.5">
                  {giftPackage.items.map((item, idx) => (
                    <div key={idx} className="bg-white p-3.5 sm:p-4 rounded-xl border border-orange-200/80 shadow-xs flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-lg sm:text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-heading flex items-center gap-1.5">
                          <span>{item.name}</span>
                          <span className="text-[10px] bg-orange-100 text-primary px-1.5 py-0.2 rounded font-semibold">Tặng kèm</span>
                        </h4>
                        <p className="text-stone-600 text-xs mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-1.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-stone-600 font-medium flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-emerald-600 text-base">verified</span>
                      <span>Được tặng kèm tự động theo từng gói combo</span>
                    </div>
                    <a
                      href="#form-dat-hang-lead-1"
                      className="inline-flex items-center gap-1 font-bold text-primary hover:text-orange-700 underline text-xs"
                    >
                      Đặt hàng để nhận quà ngay →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
