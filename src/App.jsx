import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import HeroProduct from './components/HeroProduct';
import ComboSelector from './components/ComboSelector';
import GiftsSection from './components/GiftsSection';
import ProductFeatures from './components/ProductFeatures';
import ProductSpecs from './components/ProductSpecs';
import FastOrderForm from './components/FastOrderForm';
import SafetySection from './components/SafetySection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import FooterSection from './components/FooterSection';
import StickyBottomBar from './components/StickyBottomBar';
import OrderModal from './components/OrderModal';
import { PRODUCT_DATA } from './data/productData';

export default function App() {
  const [selectedVariant, setSelectedVariant] = useState(PRODUCT_DATA.variants[1]); // Combo Đa Nhân Cách (Best Seller)
  const [quantity, setQuantity] = useState(1);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const currentPrice = selectedVariant?.price || PRODUCT_DATA.hero.price;
  const originalPrice = selectedVariant?.originalPrice || PRODUCT_DATA.hero.originalPrice;

  const handleOpenOrderModal = () => setIsOrderModalOpen(true);
  const handleCloseOrderModal = () => setIsOrderModalOpen(false);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col antialiased">
      {/* ─── FIXED HEADER ─── */}
      <HeaderNav onOpenOrderModal={handleOpenOrderModal} />

      {/* ─── MAIN CONTENT (AIDA Funnel Flow) ─── */}
      <main id="main-content" className="flex-1 pt-[104px] pb-24 lg:pb-28 flex flex-col">
        <div className="max-w-screen-xl mx-auto w-full flex flex-col">

          {/* ═══════════════════════════════════════════
              STAGE 1: ATTENTION — Thu hút ánh nhìn
              ═══════════════════════════════════════════ */}
          {/* Hero: Ảnh sản phẩm + Giá shock + Flash Sale + Rating */}
          <HeroProduct selectedVariant={selectedVariant} onOpenOrderModal={handleOpenOrderModal} />

          {/* ═══════════════════════════════════════════
              STAGE 2: INTEREST — Tạo hứng thú
              ═══════════════════════════════════════════ */}
          {/* Features: 3 điểm nổi bật — giải thích TẠI SAO sản phẩm đặc biệt */}
          <div className="mt-3 lg:mt-6">
            <ProductFeatures />
          </div>

          {/* ═══════════════════════════════════════════
              STAGE 3: DESIRE — Khao khát mua
              ═══════════════════════════════════════════ */}
          {/* Combo Selector: Chọn variant SAU khi đã hiểu sản phẩm */}
          <div className="mt-3 lg:mt-6">
            <ComboSelector
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
              quantity={quantity}
              onChangeQuantity={setQuantity}
              onOpenOrderModal={handleOpenOrderModal}
            />
          </div>

          {/* Safety: Trust signal — chứng minh an toàn TRƯỚC khi yêu cầu mua */}
          <div className="mt-3 lg:mt-6">
            <SafetySection />
          </div>

          {/* Reviews: Social proof — người khác đã mua và hài lòng */}
          <div className="mt-3 lg:mt-6">
            <ReviewsSection />
          </div>

          {/* ═══════════════════════════════════════════
              STAGE 4: ACTION — Chốt đơn hàng
              ═══════════════════════════════════════════ */}
          {/* Gifts: Quà tặng kích thích — ngay TRƯỚC form */}
          <div className="mt-3 lg:mt-6">
            <GiftsSection />
          </div>

          {/* Order Form: Form đặt hàng — ngay SAU quà tặng */}
          <div className="mt-0">
            <FastOrderForm
              selectedVariant={selectedVariant}
              quantity={quantity}
            />
          </div>

          {/* ═══════════════════════════════════════════
              STAGE 5: REASSURE — Giải đáp phân vân
              ═══════════════════════════════════════════ */}
          {/* Specs: Bảng thành phần chi tiết cho rational buyers */}
          <div className="mt-3 lg:mt-6">
            <ProductSpecs />
          </div>

          {/* FAQ: Câu hỏi thường gặp + CTA cuối cùng */}
          <div className="mt-3 lg:mt-6">
            <FaqSection />
          </div>
        </div>
      </main>

      {/* ─── FOOTER (ngoài main, semantic đúng) ─── */}
      <FooterSection />

      {/* ─── STICKY BOTTOM BAR (Hiển thị cố định trên mọi màn hình) ─── */}
      <StickyBottomBar
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        selectedVariant={selectedVariant}
        quantity={quantity}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* ─── CỬA SỔ POPUP ĐẶT HÀNG NHANH (ORDER MODAL) ─── */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        selectedCombo={selectedVariant?.id}
        onSelectCombo={(comboId) => {
          const v = PRODUCT_DATA.variants.find((x) => x.id === comboId);
          if (v) setSelectedVariant(v);
        }}
      />
    </div>
  );
}
