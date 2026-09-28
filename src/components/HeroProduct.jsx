import React, { useState, useEffect, useRef } from 'react';
import { PRODUCT_DATA, formatCurrency } from '../data/productData.js';

export default function HeroProduct({ onNavigateToOrder, selectedVariant, onOpenOrderModal }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0); // 0 = Video, 1..6 = Images
  const [isVoucherSaved, setIsVoucherSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const images = PRODUCT_DATA.hero.images;
  const videoSrc = '/B%C3%A1nh%20tr%C3%A1ng-1.mp4';
  const videoPoster = images[0]?.src;

  // Toggle Video Play/Pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute / Unmute
  const toggleSound = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Auto play video on initial mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  // Auto handle play/pause when switching between video and photos
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (currentMediaIndex === 0) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [currentMediaIndex]);

  // Sync carousel image ONLY when user has already entered photo browsing mode
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; // Do NOT switch away from video on initial mount!
    }
    // Only switch to variant photo if the user is already browsing photos (currentMediaIndex > 0)
    if (currentMediaIndex > 0 && selectedVariant?.image) {
      const idx = images.findIndex(
        (img) => img.src === selectedVariant.image
      );
      if (idx !== -1) {
        setCurrentMediaIndex(idx + 1);
      }
    }
  }, [selectedVariant, images, currentMediaIndex]);

  // Flash Sale countdown timer state
  const [timer, setTimer] = useState({
    hours: PRODUCT_DATA.flashSale?.initialHours ?? 2,
    minutes: PRODUCT_DATA.flashSale?.initialMinutes ?? 44,
    seconds: PRODUCT_DATA.flashSale?.initialSeconds ?? 41,
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return {
          hours: PRODUCT_DATA.flashSale?.initialHours ?? 2,
          minutes: PRODUCT_DATA.flashSale?.initialMinutes ?? 45,
          seconds: PRODUCT_DATA.flashSale?.initialSeconds ?? 18,
        };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const format2 = (num) => String(num).padStart(2, '0');

  // Currently displayed image when in photo mode (mediaIndex 1..6)
  const activeImageIndex = Math.max(0, currentMediaIndex - 1);
  const currentImage = images[activeImageIndex] || images[0];

  const handleOrderClick = (e) => {
    if (onOpenOrderModal) {
      onOpenOrderModal();
    } else if (onNavigateToOrder) {
      e?.preventDefault?.();
      onNavigateToOrder();
    }
  };

  return (
    <article className="flex flex-col w-full bg-surface pb-space-md">
      {/* BREADCRUMB SCHEMA NAVIGATION */}
      <nav aria-label="Breadcrumb" className="px-margin lg:px-8 py-2 bg-surface-container-low border-b border-outline-variant/30 text-body-sm text-[12px]">
        <div className="max-w-screen-xl mx-auto w-full">
          <ol className="flex items-center space-x-1 overflow-x-auto whitespace-nowrap text-on-surface-variant">
            <li className="inline-flex items-center">
              <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" href="#">
                <span className="material-symbols-outlined text-[14px]">home</span> Trang chủ
              </a>
            </li>
            <li className="flex items-center">
              <span className="material-symbols-outlined text-[14px] mx-1 text-outline">chevron_right</span>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#combos">
                Bánh tráng cuộn
              </a>
            </li>
            <li className="flex items-center text-primary font-bold">
              <span className="material-symbols-outlined text-[14px] mx-1 text-outline">chevron_right</span>
              <span aria-current="page">{selectedVariant?.label || 'Combo Đa Nhân Cách'}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Hero Container - 2 columns on desktop */}
      <div className="max-w-screen-xl mx-auto w-full lg:px-8 lg:pt-6 flex flex-col lg:flex-row gap-0 lg:gap-8 items-start">
        {/* LEFT COLUMN: Media Display (Video Clip & Photos) */}
        <div className="w-full lg:w-[55%] flex flex-col">

          {/* Main Media Stage (Video or Image) */}
          <div className={`relative w-full ${currentMediaIndex === 0 ? 'max-w-[420px] mx-auto aspect-[9/16] max-h-[580px]' : 'aspect-square lg:aspect-auto lg:h-[520px]'} bg-black overflow-hidden rounded-2xl group shadow-lg transition-all duration-300`}>
            {currentMediaIndex === 0 ? (
              /* ─── VIDEO PLAYER ─── */
              <div
                className="absolute inset-0 w-full h-full cursor-pointer bg-black select-none overflow-hidden"
                onClick={togglePlayPause}
                title="Bấm để Tạm dừng / Phát tiếp video"
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  loop
                  className="w-full h-full object-cover"
                >
                  <source src="/B%C3%A1nh%20tr%C3%A1ng-1.mp4" type="video/mp4" />
                  <source src="/Bánh tráng-1.mp4" type="video/mp4" />
                  Trình duyệt không hỗ trợ phát video.
                </video>

                {/* Big Center Play Icon overlay when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-2xl transform scale-110">
                      <span className="material-symbols-outlined text-4xl leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom Sound Toggle Button (Bottom-Left) */}
                <div className="absolute bottom-3 left-3 z-30 pointer-events-none">
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-[11px] font-bold backdrop-blur-md border border-white/20 shadow-lg cursor-pointer transition-transform active:scale-95"
                    title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                    <span>{isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ─── PRODUCT PHOTO ─── */
              <div className="absolute inset-0 w-full h-full bg-surface-container-low flex items-center justify-center">
                <img
                  alt={currentImage.alt}
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  height="700"
                  id="main-product-img"
                  loading="eager"
                  src={currentImage.src}
                  title={currentImage.title}
                  width="706"
                />

                {/* Gradient overlay bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal-ink/30 via-charcoal-ink/5 to-transparent pointer-events-none" />

                {/* Photo Count Badge (Bottom-Right) */}
                <div className="absolute bottom-3 right-3 bg-inverse-surface/85 backdrop-blur-md text-inverse-on-surface px-3 py-1 rounded-full font-label-sm text-label-sm font-bold shadow-md z-20">
                  <span>{currentMediaIndex}/{images.length} Ảnh</span>
                </div>
              </div>
            )}

            {/* Badges Floating (Only visible on photo mode so video stays 100% clean) */}
            {currentMediaIndex > 0 && (
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full shadow-md uppercase tracking-wider font-extrabold ring-1 ring-white/30">
                  <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span> BEST SELLER #1
                </span>
                <span className="inline-flex items-center gap-1 bg-secondary text-on-secondary font-label-sm text-label-sm px-3 py-1 rounded-full shadow-md uppercase font-extrabold ring-1 ring-white/20">
                  GIẢM 50% • TẶNG SỐT
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails Scroll (Item 0 is Video, Items 1..6 are Images) */}
          <div className="flex items-center gap-2.5 overflow-x-auto px-margin lg:px-2 py-3 bg-surface-container-lowest border-b lg:border-b-0 border-surface-container-high lg:mt-3 lg:justify-center">
            {/* 1. Thumbnail Video (First Item) */}
            <button
              onClick={() => setCurrentMediaIndex(0)}
              type="button"
              aria-label="Xem video clip ăn thử"
              className={`thumb-btn relative flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden p-0.5 transition-all duration-300 transform cursor-pointer ${
                currentMediaIndex === 0
                  ? 'bg-primary shadow-md border-2 border-primary ring-2 ring-primary/40 scale-105'
                  : 'bg-charcoal-ink/80 opacity-80 hover:opacity-100 border border-outline-variant/60 hover:border-primary hover:scale-105'
              }`}
            >
              <img
                src={videoPoster}
                alt="Thumbnail video"
                className="w-full h-full object-cover rounded-lg opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-white">
                <span className="material-symbols-outlined text-[20px] text-golden-sesame animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_circle
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider mt-0.5 text-white">Video</span>
              </div>
            </button>

            {/* 2. Thumbnails for Images */}
            {images.map((img, index) => {
              const itemMediaIndex = index + 1;
              const isSelected = itemMediaIndex === currentMediaIndex;
              return (
                <button
                  key={index}
                  aria-label={`Xem ${img.title}`}
                  className={`thumb-btn flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden p-0.5 transition-all duration-300 transform cursor-pointer ${
                    isSelected
                      ? 'bg-surface-container-high shadow-md border-2 border-primary ring-2 ring-primary/40 scale-105'
                      : 'bg-surface-container-low opacity-75 hover:opacity-100 border border-outline-variant/60 hover:border-primary hover:ring-2 hover:ring-primary/25 hover:scale-105'
                  }`}
                  onClick={() => setCurrentMediaIndex(itemMediaIndex)}
                  type="button"
                >
                  <img
                    alt={img.alt}
                    className="w-full h-full object-cover rounded-lg"
                    height="60"
                    loading="lazy"
                    src={img.src}
                    title={img.title}
                    width="60"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Brand Tag -> H1 -> Rating -> Flash Sale & Price Box -> Vouchers -> Trust -> Hero CTA */}
        <div className="w-full lg:w-[45%] flex flex-col lg:sticky lg:top-[120px] lg:self-start bg-surface-container-lowest lg:rounded-2xl lg:overflow-hidden lg:shadow-warm-lg lg:border lg:border-outline-variant/30 p-4 lg:p-6 gap-4">
          
          {/* 1. Brand Tag & Category */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              ĐẶC SẢN TÂY NINH • CHÍNH HÃNG HAQ FOOD
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium">• Đóng túi zip hút chân không</span>
          </div>

          {/* 2. Primary Product Title H1 */}
          <div className="flex flex-col gap-1">
            <h1 className="font-headline-sm text-[20px] lg:text-[24px] xl:text-[26px] text-on-surface font-extrabold leading-snug">
              {selectedVariant
                ? `Bánh Tráng Cuộn HAQ FOOD — ${selectedVariant.label}`
                : 'Combo Bánh Tráng Cuộn HAQ FOOD — Trọn Bộ 5 Vị Độc Quyền'}
            </h1>
            <p className="text-secondary font-bold text-[13px] lg:text-[14px] leading-relaxed">
              {selectedVariant?.subName || 'Trọn Bộ 5 Vị Cuộn (500g) + Tặng Bánh Sốt Me & FREESHIP'}
            </p>
          </div>

          {/* 3. Social Proof: Rating & Sales Metric */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-on-surface-variant pb-2 border-b border-outline-variant/30">
            <div className="flex items-center gap-1 text-amber-honey">
              <span className="font-extrabold text-on-surface">{PRODUCT_DATA.hero.rating}</span>
              <div className="flex items-center text-[15px]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
            <span className="text-outline-variant">|</span>
            <a className="hover:text-primary transition-colors font-medium underline decoration-dotted" href="#reviews">
              {PRODUCT_DATA.hero.reviewCount} Đánh giá
            </a>
            <span className="text-outline-variant">|</span>
            <span className="text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              Đã bán {PRODUCT_DATA.hero.soldCount}
            </span>
          </div>

          {/* 4. Flash Sale & Price Box (Cohesive, Elegant Container) */}
          <div className="flex flex-col rounded-xl overflow-hidden border border-primary/20 shadow-xs bg-gradient-to-b from-primary/[0.04] to-surface-container-lowest">
            {/* Top Bar of Flash Sale Box */}
            <div className="bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary px-3.5 py-2 flex items-center justify-between animate-shimmer-sweep">
              <div className="flex items-center gap-1.5 font-headline-sm text-[13px] uppercase tracking-wide font-extrabold text-golden-sesame">
                <span className="material-symbols-outlined text-[17px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <span>FLASH SALE HÔM NAY</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <span className="text-on-primary/90 uppercase text-[9px] tracking-wider">KẾT THÚC:</span>
                <span className="bg-charcoal-ink/90 text-on-primary px-1.5 py-0.5 rounded font-mono text-[11px]">{format2(timer.hours)}</span>:
                <span className="bg-charcoal-ink/90 text-on-primary px-1.5 py-0.5 rounded font-mono text-[11px]">{format2(timer.minutes)}</span>:
                <span className="bg-charcoal-ink/90 text-amber-honey px-1.5 py-0.5 rounded font-mono text-[11px] animate-pulse">{format2(timer.seconds)}</span>
              </div>
            </div>

            {/* Price & Progress Inside Box */}
            <div className="p-3.5 lg:p-4 flex flex-col gap-2.5">
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-[26px] lg:text-[32px] font-black text-primary leading-none tracking-tight" id="price-display">
                  {formatCurrency(selectedVariant?.price || PRODUCT_DATA.hero.price)}
                </span>
                <span className="text-[14px] lg:text-[16px] text-on-surface-variant/70 line-through decoration-outline/60 font-medium" id="original-price-display">
                  {formatCurrency(selectedVariant?.originalPrice || PRODUCT_DATA.hero.originalPrice)}
                </span>
                <span className="bg-error-container text-error text-[11px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {selectedVariant?.discountText || PRODUCT_DATA.hero.discountLabel}
                </span>
              </div>

              {/* Stock Progress Bar */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="flex-1 bg-surface-container-high h-2 rounded-full overflow-hidden relative shadow-inner">
                  <div
                    className="bg-gradient-to-r from-secondary via-primary-container to-primary h-full rounded-full transition-all duration-500 relative overflow-hidden animate-shimmer-sweep"
                    style={{ width: `${PRODUCT_DATA.hero.soldPercent}%` }}
                  />
                </div>
                <span className="text-[11px] text-secondary font-bold shrink-0">
                  ⚡ Đã bán {PRODUCT_DATA.hero.soldPercent}% số lượng ưu đãi
                </span>
              </div>
            </div>
          </div>

          {/* 5. Vouchers / Khuyến mãi áp dụng ngay */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[15px]">confirmation_number</span>
              Mã giảm giá & Quà tặng kèm:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {/* Voucher 1 */}
              <div className="bg-surface-container-low p-2 rounded-lg border border-dashed border-primary/30 flex flex-col justify-between">
                <span className="font-extrabold text-[12px] text-primary">GIẢM 15K</span>
                <span className="text-[10px] text-on-surface-variant">Đơn từ 199k</span>
              </div>
              {/* Voucher 2 */}
              <div className="bg-surface-container-low p-2 rounded-lg border border-dashed border-secondary/40 flex flex-col justify-between">
                <span className="font-extrabold text-[12px] text-secondary">TẶNG BÁNH ME</span>
                <span className="text-[10px] text-on-surface-variant">Tất cả combo</span>
              </div>
              {/* Voucher 3 */}
              <div className="bg-surface-container-low p-2 rounded-lg border border-dashed border-tertiary/40 flex flex-col justify-between">
                <span className="font-extrabold text-[12px] text-tertiary">FREESHIP</span>
                <span className="text-[10px] text-on-surface-variant">Toàn quốc</span>
              </div>
            </div>
          </div>

          {/* 6. Quick Trust Signals (2 Cam kết vàng) */}
          <div className="grid grid-cols-2 gap-2 py-2 border-y border-outline-variant/30 text-[11px] sm:text-[12px] text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">fact_check</span>
              <span>Đồng kiểm khi nhận hàng</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[16px]">published_with_changes</span>
              <span>Đổi trả 1-1 miễn phí</span>
            </div>
          </div>

          {/* 7. Fast CTA Button (Opens Order Modal) */}
          <div className="flex flex-col gap-1.5 pt-1">
            <button
              type="button"
              onClick={onOpenOrderModal || handleOrderClick}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-headline-sm text-[16px] font-extrabold flex items-center justify-center gap-2 uppercase tracking-wide shadow-warm-lg hover:shadow-warm-md active:scale-[0.99] transition-all btn-press animate-shimmer-sweep cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
              ĐẶT MUA NGAY — {formatCurrency(selectedVariant?.price || PRODUCT_DATA.hero.price)}
            </button>
            <span className="text-center text-[11px] text-on-surface-variant">
              🔒 Đặt hàng nhanh không cần tạo tài khoản • Thanh toán khi nhận hàng (COD)
            </span>
          </div>

        </div>
      </div>
    </article>
  );
}
