import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CRO_DATA } from '../data/croData';

const HEART_ICONS = ['❤️', '💖', '🔥', '🥰', '✨', '💕', '🧡', '🤤', '🌶️', '😋', '🎉', '🌟'];

// Isolated Floating Hearts Component - NEVER causes CroHero or Video to re-render!
const FloatingHeartsStream = React.memo(function FloatingHeartsStream({ isPlaying, burstSignal }) {
  const [hearts, setHearts] = useState([]);

  const spawnOne = useCallback((customIcon, customVariant) => {
    const id = Math.random().toString(36).substring(2, 9);
    const icon = customIcon || HEART_ICONS[Math.floor(Math.random() * HEART_ICONS.length)];
    const variant = customVariant || Math.floor(Math.random() * 6) + 1;
    const size = 20 + Math.floor(Math.random() * 12); // 20px - 32px
    // Tiny natural jitter around button center
    const jitterX = Math.floor(Math.random() * 8) - 4;
    const jitterY = Math.floor(Math.random() * 6) - 3;

    setHearts((prev) => {
      const next = prev.length > 16 ? prev.slice(prev.length - 16) : prev;
      return [...next, { id, icon, variant, size, jitterX, jitterY }];
    });

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 3200);
  }, []);

  // Continuous moderate stream while video is playing ("bay vừa thôi")
  useEffect(() => {
    if (!isPlaying) return;

    // Spawn 1 immediately, then at a steady, moderate pace (~1000ms)
    spawnOne();
    const interval = setInterval(() => {
      spawnOne();
    }, 1050);

    return () => clearInterval(interval);
  }, [isPlaying, spawnOne]);

  // Burst stream when user likes or double clicks
  useEffect(() => {
    if (!burstSignal) return;

    spawnOne('❤️', 1);
    setTimeout(() => spawnOne('💖', 5), 70);
    setTimeout(() => spawnOne('🔥', 2), 140);
    setTimeout(() => spawnOne('🥰', 3), 210);
    setTimeout(() => spawnOne('✨', 4), 280);
    setTimeout(() => spawnOne('💕', 6), 350);
  }, [burstSignal, spawnOne]);

  return (
    // Anchored directly onto the like button with invisible spacer matching the counter label
    <div className="absolute bottom-12 right-3 sm:right-3.5 z-30 flex flex-col items-center gap-0.5 pointer-events-none select-none overflow-visible">
      <div className="w-11 h-11 sm:w-12 sm:h-12 aspect-square flex items-center justify-center relative overflow-visible">
        {hearts.map((h) => (
          <span
            key={h.id}
            className={`absolute select-none pointer-events-none animate-float-heart-${h.variant}`}
            style={{
              marginLeft: `${h.jitterX}px`,
              marginTop: `${h.jitterY}px`,
              fontSize: `${h.size}px`,
              lineHeight: 1,
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))'
            }}
          >
            {h.icon}
          </span>
        ))}
      </div>
      <span className="text-[10.5px] sm:text-xs font-black invisible select-none leading-normal">
        0k
      </span>
    </div>
  );
});

export default function CroHero({ onSelectPlan }) {
  const { hero } = CRO_DATA;
  const videoRef = useRef(null);

  const [likeCount, setLikeCount] = useState(28460);
  const [isPopping, setIsPopping] = useState(false);
  const [burstSignal, setBurstSignal] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Listen to video playback events (play, pause, ended)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    if (!video.paused && !video.ended) {
      setIsPlaying(true);
    }

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setLikeCount((prev) => prev + 1);
    setIsPopping(true);
    setBurstSignal((s) => s + 1);
    setTimeout(() => setIsPopping(false), 350);
  };

  const handleDoubleClick = (e) => {
    setLikeCount((prev) => prev + 1);
    setIsPopping(true);
    setBurstSignal((s) => s + 1);
    setTimeout(() => setIsPopping(false), 350);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Khi lướt tới hoặc lướt ngược trở lại lên: phát video
            if (video.ended) {
              video.currentTime = 0;
            }
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Tránh lỗi trình duyệt nếu có chính sách chặn âm thanh
              });
            }
          } else {
            // Khi kéo xuống hoặc ra khỏi tầm nhìn: dừng phát video ngay lập tức
            video.pause();
          }
        });
      },
      {
        threshold: 0.3, // Kích hoạt khi ít nhất 30% video nằm trong màn hình
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-white to-surface-container-low pb-4 sm:pb-6 lg:pb-4 pt-28 sm:pt-[124px] lg:pt-[128px] xl:pt-[136px]">
      {/* Background warm orange radial glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[250px] bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Main Headline Box - Scaled & Balanced */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto space-y-1.5 sm:space-y-2 mb-3.5 sm:mb-4 lg:mb-3.5 xl:mb-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-primary text-[11px] sm:text-xs xl:text-sm font-bold uppercase tracking-wider shadow-2xs">
            <span className="material-symbols-outlined text-xs sm:text-sm shrink-0">local_fire_department</span>
            <span className="leading-tight">{hero.eyebrow}</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight uppercase font-heading">
            {hero.titleMain}
            <span className="block text-primary mt-0.5">
              {hero.titleAccent}
            </span>
          </h1>

          <p className="text-stone-600 max-w-2xl xl:max-w-3xl mx-auto leading-normal sm:leading-relaxed text-xs sm:text-[13px] lg:text-xs xl:text-sm">
            {hero.desc}
          </p>
        </div>

        {/* 4 Core Trust Badges - Responsive Sizing for Mobile, Laptop & Large PC */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 xl:gap-3.5 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto mb-3.5 sm:mb-4 lg:mb-3.5 xl:mb-5">
          {[
            {
              icon: "fact_check",
              title: "Đồng kiểm hàng",
              desc: "Mở xem trước khi trả tiền",
              colorClass: "bg-orange-50 text-primary"
            },
            {
              icon: "local_shipping",
              title: "Freeship Toàn Quốc",
              desc: "Từ combo 149K trở lên",
              colorClass: "bg-amber-50 text-amber-700"
            },
            {
              icon: "verified",
              title: "HAQ FOOD Chính Hãng",
              desc: "Có hồ sơ kiểm định ATTP",
              colorClass: "bg-orange-50 text-primary"
            },
            {
              icon: "published_with_changes",
              title: "Đổi trả 1 - 1 miễn phí",
              desc: "Trong 7 ngày nếu lỗi ỉu rách",
              colorClass: "bg-red-50 text-error"
            }
          ].map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 lg:py-1.5 lg:px-2 xl:py-2.5 xl:px-3 rounded-xl bg-white shadow-xs hover:shadow-sm transition-all duration-300 border border-stone-200/80"
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 rounded-lg flex items-center justify-center shrink-0 ${badge.colorClass}`}>
                <span className="material-symbols-outlined text-lg sm:text-xl xl:text-2xl">{badge.icon}</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] sm:text-xs xl:text-[13px] font-bold text-stone-900 font-heading">
                  {badge.title}
                </span>
                <span className="text-[9.5px] sm:text-[10px] xl:text-[11px] text-stone-500 leading-tight mt-0.5">
                  {badge.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Imagery + Visual Showcase Pack - 2-Column Split Layout (Scaled for Mobile, Desktop & Large PC) */}
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 xl:gap-8 items-center">
          
          {/* Left Column: Exact 9:16 Vertical Video Frame (Immersive & Big on Mobile, Balanced on Laptop, Grand on Large PC) */}
          <div className="lg:col-span-5 w-full flex justify-center relative">
            {/* Outer Sizing Wrapper - Allows floating hearts to freely spill over borders into outer white space! */}
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[270px] xl:max-w-[325px] 2xl:max-w-[355px]">
              
              {/* Isolated Floating Hearts Stream - High performance, no re-rendering of CroHero! */}
              <FloatingHeartsStream isPlaying={isPlaying} burstSignal={burstSignal} />

              {/* Phone Mockup Frame (overflow-hidden keeps video rounded within phone bezel) */}
              <div
                onDoubleClick={handleDoubleClick}
                className="w-full aspect-[9/16] rounded-2xl sm:rounded-[26px] overflow-hidden shadow-2xl border-[3px] border-stone-800 bg-black relative group transition-transform duration-300 hover:scale-[1.01] select-none"
              >
                {/* Floating Live Badge (Top-Left) */}
                <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-[10.5px] sm:text-xs font-bold shadow-sm pointer-events-none select-none">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="tracking-wide">LIVE</span>
                  <span className="text-white/40">•</span>
                  <span className="text-amber-300 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs sm:text-[13px]">visibility</span>
                    1.4k
                  </span>
                </div>

                {/* Floating Channel / Song Tag (Bottom-Left) */}
                <div className="absolute bottom-12 left-3 sm:left-3.5 z-20 pointer-events-none select-none max-w-[155px] sm:max-w-[180px] xl:max-w-[190px]">
                  <div className="flex items-center gap-1 text-xs sm:text-[13px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    <span className="truncate">@haqfood.official</span>
                    <span className="material-symbols-outlined text-xs sm:text-sm text-sky-400 shrink-0">verified</span>
                  </div>
                  <p className="text-[9.5px] sm:text-[10.5px] text-white/90 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] sm:text-[11px] animate-spin shrink-0" style={{ animationDuration: '4s' }}>music_note</span>
                    <span className="truncate">Bánh tráng Long An ăn là ghiền 🌶️</span>
                  </p>
                </div>

                {/* Interactive Like / Thả Tim Button (Bottom-Right) - Perfectly Circular with aspect-square */}
                <div className="absolute bottom-12 right-3 sm:right-3.5 z-20 flex flex-col items-center gap-0.5 pointer-events-auto select-none">
                  <button
                    type="button"
                    onClick={handleLikeClick}
                    className={`w-11 h-11 sm:w-12 sm:h-12 aspect-square rounded-full bg-black/60 hover:bg-black/80 active:scale-75 backdrop-blur-md border-2 border-white/35 flex items-center justify-center text-red-500 shadow-xl cursor-pointer transform transition-transform duration-150 shrink-0 ${
                      isPopping ? 'animate-like-pop' : ''
                    }`}
                    title="Nhấp để thả tim cho video!"
                    aria-label="Thả tim cho video"
                  >
                    <span
                      className="material-symbols-outlined text-[24px] sm:text-[26px] text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.75)] animate-heart-pulse select-none pointer-events-none leading-none"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                  </button>
                  <span className="text-[10.5px] sm:text-xs font-black text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] select-none tracking-tight">
                    {likeCount.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-[8px] sm:text-[8.5px] text-yellow-300 font-bold uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] animate-pulse select-none">
                    Thả tim
                  </span>
                </div>

              <video
                ref={videoRef}
                src={hero.showcase.video || "/B%C3%A1nh%20tr%C3%A1ng-1.mp4"}
                poster={hero.showcase.image}
                autoPlay
                muted
                playsInline
                controls
                className="w-full h-full object-cover"
              >
                <source src="/B%C3%A1nh%20tr%C3%A1ng-1.mp4" type="video/mp4" />
                <source src="/Bánh tráng-1.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video.
              </video>
            </div>
          </div>
        </div>

          {/* Right Column: Product Highlights, Sensory Quote & High-converting CTA */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-5 lg:py-3.5 lg:px-4.5 xl:p-6 2xl:p-7 rounded-2xl shadow-lg border border-stone-200/80 flex flex-col gap-2.5 sm:gap-3 lg:gap-2.5 xl:gap-3.5">
            {/* Rating header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-primary text-[10.5px] sm:text-xs xl:text-[13px] font-bold tracking-wide">
                <span className="material-symbols-outlined text-xs sm:text-sm">verified_user</span>
                <span>{hero.showcase.badge}</span>
              </span>
              <div className="inline-flex items-center gap-1.5 text-xs xl:text-sm text-stone-600 font-semibold">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-xs sm:text-sm xl:text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="font-bold text-stone-800 text-[11px] sm:text-xs xl:text-sm">{hero.showcase.ratingText}</span>
              </div>
            </div>

            {/* Sensory quote */}
            <div className="relative pl-2.5 sm:pl-3 border-l-4 border-primary bg-orange-50/30 p-2 sm:p-2.5 xl:p-3 rounded-r-xl">
              <p className="text-xs sm:text-[13px] lg:text-xs xl:text-sm 2xl:text-[15px] text-stone-700 leading-relaxed font-medium italic">
                "{hero.showcase.quote}"
              </p>
            </div>

            {/* 3 perks with check icons */}
            <div className="space-y-1.5 xl:space-y-2 py-0.5">
              {hero.showcase.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-[13px] lg:text-xs xl:text-sm text-stone-800 font-semibold">
                  <span className="w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-orange-100 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xs xl:text-sm">check</span>
                  </span>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Flash sale special gift box */}
            <div className="p-2 sm:p-2.5 xl:p-3 bg-gradient-to-r from-amber-50/90 to-orange-50/80 rounded-xl border border-amber-200/70 flex items-center justify-between text-xs xl:text-sm">
              <div className="flex items-center gap-1.5 truncate">
                <span className="material-symbols-outlined text-primary text-base xl:text-lg shrink-0">redeem</span>
                <span className="font-bold text-stone-800 text-[11px] sm:text-xs xl:text-sm truncate">
                  Mua Combo từ 149K: Tặng Quà + Freeship
                </span>
              </div>
              <span className="text-primary font-black text-xs xl:text-sm shrink-0 font-heading ml-1">
                TIẾT KIỆM 50%
              </span>
            </div>

            {/* CTA button */}
            <div className="flex flex-col gap-1 pt-0.5">
              <a
                href="#combo-uu-dai"
                onClick={() => onSelectPlan && onSelectPlan('combo_da_nhan_cach')}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2.5 sm:py-3 xl:py-3.5 px-5 xl:px-6 rounded-xl shadow-[0_4px_16px_-3px_rgba(249,115,22,0.4)] transition-all text-xs sm:text-sm xl:text-base font-extrabold uppercase tracking-wider transform active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base xl:text-lg text-yellow-200">local_fire_department</span>
                <span>{hero.showcase.ctaText}</span>
              </a>
              <p className="text-center text-[10px] sm:text-[11px] xl:text-xs text-primary font-semibold">
                {hero.showcase.subNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
