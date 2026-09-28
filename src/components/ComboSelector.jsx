import React, { useState } from 'react';
import { PRODUCT_DATA, formatCurrency } from '../data/productData.js';

export default function ComboSelector({
  selectedVariant: propSelectedVariant,
  onSelectVariant,
  quantity: propQuantity,
  onChangeQuantity,
  onOpenOrderModal,
}) {
  const [internalVariantId, setInternalVariantId] = useState(
    PRODUCT_DATA.variants[1]?.id || 'combo_da_nhan_cach'
  );
  const [internalQuantity, setInternalQuantity] = useState(1);

  const activeVariantId = propSelectedVariant?.id || internalVariantId;
  const currentQty = propQuantity !== undefined ? propQuantity : internalQuantity;

  const handleSelect = (variant) => {
    setInternalVariantId(variant.id);
    if (onSelectVariant) onSelectVariant(variant);
  };

  const handleQtyChange = (delta) => {
    const nextQty = Math.max(1, Math.min(50, currentQty + delta));
    setInternalQuantity(nextQty);
    if (onChangeQuantity) onChangeQuantity(nextQty);
  };

  const selectedCombo = PRODUCT_DATA.variants.find(v => v.id === activeVariantId) || PRODUCT_DATA.variants[1];

  return (
    <section className="flex flex-col w-full bg-surface-container-lowest shadow-sm lg:rounded-xl" id="combos">
      <div className="max-w-screen-xl mx-auto w-full px-margin lg:px-8 py-4 lg:py-6">

        {/* Section Title */}
        <div className="flex items-center gap-2 mb-3 lg:mb-5">
          <span className="material-symbols-outlined text-primary text-[24px] lg:text-[28px]">inventory_2</span>
          <h2 className="font-headline-sm text-headline-sm lg:text-headline-md text-on-surface font-extrabold">
            Chọn Combo Ưu Đãi
          </h2>
        </div>

        {/* Express Badge */}
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-outline-variant/30">
          <span className="inline-flex items-center gap-1 bg-[#10b981] text-white text-[11px] font-extrabold px-2 py-0.5 rounded italic tracking-wide">
            ⚡ HOẢ TỐC
          </span>
          <span className="text-[13px] text-on-surface font-semibold">• Giao nhanh 4 Giờ nội thành</span>
        </div>

        {/* ─── COMBO CARDS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 lg:gap-5">
          {PRODUCT_DATA.variants.map((combo) => {
            const isSelected = activeVariantId === combo.id;
            const isPopular = combo.isPopular;
            return (
              <button
                key={combo.id}
                type="button"
                onClick={() => handleSelect(combo)}
                className={`relative flex flex-col text-left p-4 lg:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-warm-md ${
                  isSelected
                    ? 'border-primary bg-surface-container-lowest shadow-warm-lg ring-2 ring-primary/30 scale-[1.015]'
                    : isPopular
                      ? 'border-secondary/80 bg-gradient-to-b from-orange-50/50 via-surface-container-lowest to-surface-container-lowest shadow-[0_4px_20px_rgba(253,101,30,0.18)] ring-1 ring-secondary/30 hover:border-secondary hover:ring-2 hover:ring-secondary/50'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                {/* Popular Tag */}
                {isPopular && (
                  <span className="absolute -top-3 left-4 bg-gradient-to-r from-primary to-secondary text-on-primary text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1 z-10 animate-pulse">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    {combo.popularTag}
                  </span>
                )}
                {!isPopular && combo.popularTag && (
                  <span className="absolute -top-3 left-4 bg-secondary text-on-secondary text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm z-10">
                    {combo.popularTag}
                  </span>
                )}

                {/* Top Row: Image + Info */}
                <div className="flex items-start gap-3.5">
                  <img
                    alt={combo.label}
                    className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-xl flex-shrink-0 border border-outline-variant/30 shadow-sm transition-transform duration-300 group-hover:scale-105"
                    height="80"
                    loading="lazy"
                    src={combo.image}
                    width="80"
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    {/* Badge */}
                    <span className="text-[10px] font-black text-secondary uppercase tracking-wider mb-0.5">
                      {combo.badge}
                    </span>
                    {/* Combo Name */}
                    <h3 className={`font-headline-sm text-[16px] lg:text-[18px] leading-tight font-extrabold ${
                      isSelected ? 'text-primary' : 'text-on-surface'
                    }`}>
                      {combo.label}
                    </h3>
                    {/* Sub Name */}
                    <span className="text-[12px] text-on-surface-variant mt-1 leading-snug">
                      {combo.subName}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-outline-variant/20">
                  {combo.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] leading-snug">
                      <span className={`material-symbols-outlined text-[15px] mt-px flex-shrink-0 ${
                        feat.gift ? 'text-primary' : feat.ship ? 'text-tertiary' : 'text-secondary'
                      }`} style={feat.gift || feat.ship ? { fontVariationSettings: "'FILL' 1" } : {}}>
                        {feat.gift ? 'card_giftcard' : feat.ship ? 'local_shipping' : 'check_circle'}
                      </span>
                      <span className={`${feat.bold ? 'font-bold text-on-surface' : 'text-on-surface-variant'} ${feat.gift ? 'text-primary font-bold' : ''}`}>
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Row */}
                <div className="flex items-baseline gap-2.5 mt-3 pt-3 border-t border-outline-variant/25 flex-wrap">
                  <span className={`font-black text-[22px] lg:text-[25px] tracking-tight leading-none ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                    {formatCurrency(combo.price)}
                  </span>
                  <span className="text-[14px] text-on-surface-variant/80 line-through decoration-outline/70 decoration-2 font-semibold">
                    {formatCurrency(combo.originalPrice)}
                  </span>
                  <span className="bg-error-container text-error text-[11px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {combo.discountText}
                  </span>
                </div>

                {/* Shipping & Savings */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {combo.isFreeship ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-tertiary font-bold bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                      {combo.shippingText}
                    </span>
                  ) : (
                    <span className="text-[11px] text-on-surface-variant font-medium">{combo.shippingText}</span>
                  )}
                  {combo.savingsText && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-secondary text-white px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-xs tracking-tight">
                      <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
                      {combo.savingsText}
                    </span>
                  )}
                </div>

                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md animate-fadeIn ring-2 ring-white">
                    <span className="material-symbols-outlined text-[16px] font-black" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ─── BOTTOM: Quantity + CTA ─── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 pt-4 border-t border-outline-variant/30">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="font-label-md text-label-md text-on-surface font-semibold">Số lượng:</span>
            <div className="inline-flex items-center border border-outline-variant/50 rounded-lg overflow-hidden h-9 bg-surface-container-lowest">
              <button
                aria-label="Giảm số lượng"
                className="w-9 h-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40"
                disabled={currentQty <= 1}
                onClick={() => handleQtyChange(-1)}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="w-12 h-full flex items-center justify-center border-x border-outline-variant/50 text-[15px] font-semibold text-on-surface font-mono">
                {currentQty}
              </span>
              <button
                aria-label="Tăng số lượng"
                className="w-9 h-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40"
                disabled={currentQty >= 50}
                onClick={() => handleQtyChange(1)}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={onOpenOrderModal}
            aria-label={`Đặt hàng ngay ${selectedCombo.label} với giá ${formatCurrency(selectedCombo.price * currentQty)}`}
            className="flex-1 sm:max-w-xs h-12 rounded-xl bg-gradient-to-r from-primary to-primary-container hover:from-primary-container hover:to-primary text-on-primary font-headline-sm text-[16px] font-extrabold flex items-center justify-center gap-2 uppercase tracking-wide shadow-warm-md transition-all active:scale-[0.98] btn-press cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
            ĐẶT HÀNG NGAY — {formatCurrency(selectedCombo.price * currentQty)}
          </button>
        </div>
      </div>
    </section>
  );
}
