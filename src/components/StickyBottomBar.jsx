import React from 'react';
import { formatCurrency, PRODUCT_DATA } from '../data/productData.js';

export default function StickyBottomBar({ currentPrice, originalPrice, selectedVariant, quantity, onOpenOrderModal }) {
  const sale = currentPrice !== undefined ? currentPrice : 149000;
  const original = originalPrice !== undefined ? originalPrice : 250000;
  const variant = selectedVariant || PRODUCT_DATA.variants[1] || PRODUCT_DATA.variants[0];
  const qty = quantity || 1;

  return (
    <aside aria-label="Thanh đặt hàng nhanh cố định" className="fixed bottom-0 w-full z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-2xl border-t border-outline-variant/30 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] transition-transform duration-300">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between h-16 lg:h-18 px-margin lg:px-8 gap-3 lg:gap-6">
        {/* Left: Price and more info on desktop */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] lg:text-label-sm font-label-sm text-on-surface-variant uppercase font-extrabold tracking-wider">
              Tổng thanh toán:
            </span>
            <div className="flex items-baseline gap-1.5 lg:gap-2.5">
              <span className="font-headline-sm text-[20px] lg:text-[26px] text-primary font-black leading-none drop-shadow-[0_1px_6px_rgba(183,0,17,0.25)]" id="sticky-price-display">
                {formatCurrency(sale * qty)}
              </span>
              {original && (
                <span className="text-[11px] lg:text-body-sm text-on-surface-variant line-through decoration-outline/70">
                  {formatCurrency(original * qty)}
                </span>
              )}
            </div>
          </div>

          {/* Desktop: show more info (variant name, quantity) */}
          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-outline-variant/40">
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Gói đang chọn:</span>
              <span className="font-label-md text-on-surface font-extrabold">{variant?.label || 'Combo Đa Nhân Cách'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant/40 shadow-xs">
              <span className="text-label-sm text-on-surface-variant font-medium">SL:</span>
              <span className="font-label-md font-black text-primary">{qty}</span>
            </div>
          </div>
        </div>

        {/* Right: CTA button opens Order Modal */}
        <button
          type="button"
          onClick={onOpenOrderModal}
          aria-label={`Đặt mua ngay với giá ${formatCurrency(sale * qty)}`}
          className="relative overflow-hidden flex-1 max-w-[200px] lg:max-w-[260px] h-11 lg:h-12 rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-headline-sm text-label-lg lg:text-[17px] font-black flex items-center justify-center gap-1.5 lg:gap-2 shadow-warm-lg hover:shadow-warm-md active:scale-95 transition-all uppercase animate-shimmer-sweep cursor-pointer"
        >
          <span className="material-symbols-outlined text-[19px] lg:text-[22px] relative z-10">shopping_cart_checkout</span>
          <span className="relative z-10">Đặt Hàng Ngay</span>
        </button>
      </div>
    </aside>
  );
}
