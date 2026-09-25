import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { LEGAL_DOCUMENTS } from '../data/legalDocuments';

// GHI CHÚ BẮT BUỘC: Hồ sơ pháp lý chuẩn Cô Út gồm 26 trang (13 cặp trang lật đối xứng).
// Tuyệt đối KHÔNG có trang chứng nhận F3 Food (Bắc Ninh). Dữ liệu được đồng bộ từ legalDocuments.js.
export default function LegalFlipbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(LEGAL_DOCUMENTS[0]?.totalPages || 5);
  const [isLoading, setIsLoading] = useState(true);

  // Fullscreen 2-page reader state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFsLoading, setIsFsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const bookContainerRef = useRef(null);
  const pageFlipRef = useRef(null);

  const fullscreenBookContainerRef = useRef(null);
  const fullscreenPageFlipRef = useRef(null);

  // Ref to track latest currentPage without triggering effect recreation
  const currentPageRef = useRef(0);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const currentDoc = LEGAL_DOCUMENTS[0];

  // Helper: calculate responsive dimensions for inline 2-page spread
  // Standard ISO 216 / A4 aspect ratio: height = width * 1.4142
  const getInlineDimensions = useCallback(() => {
    if (typeof window === 'undefined') return { pageWidth: 440, pageHeight: 622 };
    const width = window.innerWidth;

    if (width >= 1440) {
      // Extra large desktop (1440px+): 960px spread (480px each page x 679px height)
      return { pageWidth: 480, pageHeight: 679 };
    } else if (width >= 1200) {
      // Large desktop / standard 1080p: 880px spread (440px each page x 622px height)
      return { pageWidth: 440, pageHeight: 622 };
    } else if (width >= 992) {
      // Desktop / laptop: 780px spread (390px each page x 552px height)
      return { pageWidth: 390, pageHeight: 552 };
    } else if (width >= 768) {
      // Tablet: 660px spread (330px each page x 467px height)
      return { pageWidth: 330, pageHeight: 467 };
    } else if (width >= 540) {
      // Small tablet / landscape mobile: 500px spread (250px each page x 354px height)
      return { pageWidth: 250, pageHeight: 354 };
    } else {
      // Mobile screen: available width minus padding (always 2-page spread!)
      let availW = Math.max(280, width - 24);
      if (availW % 2 !== 0) availW -= 1;
      const pageWidth = Math.floor(availW / 2);
      const pageHeight = Math.round(pageWidth * 1.4142);
      return { pageWidth, pageHeight };
    }
  }, []);

  // Helper: calculate optimal dimensions for fullscreen 2-page spread
  // Directly scales pixel resolution based on zoomLevel
  const getFullscreenDimensions = useCallback((zoom = 1) => {
    if (typeof window === 'undefined') return { pageWidth: 450, pageHeight: 636 };
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Available viewport area excluding header and bottom bar
    const availW = Math.max(280, width - (width < 640 ? 16 : 80));
    const availH = Math.max(240, height - (width < 640 ? 116 : 136));

    // A4 2-page spread ratio: 2 / 1.4142 = 1.4142
    let spreadW = Math.round(availH * 1.4142);
    let spreadH = availH;

    if (spreadW > availW) {
      spreadW = availW;
      spreadH = Math.round(spreadW / 1.4142);
    }

    if (spreadW % 2 !== 0) spreadW -= 1;
    const basePageWidth = Math.floor(spreadW / 2);
    const basePageHeight = spreadH;

    const pageWidth = Math.round(basePageWidth * zoom);
    const pageHeight = Math.round(basePageHeight * zoom);

    return { pageWidth, pageHeight };
  }, []);

  // Initialize main inline 2-page flipbook with native HTML DOM elements (ultra-sharp GPU rendering)
  const initMainBook = useCallback((targetPage = 0) => {
    if (!bookContainerRef.current) return;
    setIsLoading(true);

    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.destroy();
      } catch {
        // ignore
      }
      pageFlipRef.current = null;
    }

    bookContainerRef.current.innerHTML = '';

    const wrapperEl = document.createElement('div');
    wrapperEl.className = 'w-full flex items-center justify-center';
    bookContainerRef.current.appendChild(wrapperEl);

    const { pageWidth, pageHeight } = getInlineDimensions();

    try {
      const pageFlipInstance = new PageFlip(wrapperEl, {
        width: pageWidth,
        height: pageHeight,
        size: 'fixed',
        maxShadowOpacity: 0.45,
        showCover: false, // Always 2 pages side-by-side!
        mobileScrollSupport: true, // Allow vertical scrolling on mobile when touching
        usePortrait: false, // NEVER collapse to 1-page portrait mode!
        drawShadow: true,
        flippingTime: 450,
        useMouseEvents: true,
        swipeDistance: 20,
        showPageCorners: true,
        startPage: targetPage,
      });

      // Construct native HTML DOM page elements to bypass blurry 2D canvas and get native GPU sharpness
      const pageElements = currentDoc.pages.map((p, idx) => {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'stf__page bg-white overflow-hidden select-none';
        
        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.title || `Trang ${idx + 1}`;
        img.className = 'w-full h-full object-fill pointer-events-none select-none block';
        img.draggable = false;
        img.loading = 'eager';
        img.decoding = 'async';
        img.style.imageRendering = '-webkit-optimize-contrast';
        
        pageDiv.appendChild(img);
        return pageDiv;
      });

      pageFlipInstance.loadFromHTML(pageElements);

      pageFlipInstance.on('flip', (e) => {
        currentPageRef.current = e.data;
        setCurrentPage(e.data);
      });

      pageFlipInstance.on('init', () => {
        setIsLoading(false);
        setTotalPages(pageFlipInstance.getPageCount());
        if (targetPage > 0) {
          pageFlipInstance.turnToPage(targetPage);
        }
      });

      pageFlipRef.current = pageFlipInstance;
    } catch (err) {
      console.error('Failed to initialize PageFlip:', err);
      setIsLoading(false);
    }
  }, [currentDoc, getInlineDimensions]);

  // Initialize fullscreen 2-page flipbook (scaled cleanly by zoomLevel with native HTML DOM elements)
  const initFullscreenBook = useCallback((targetPage = 0, zoom = 1) => {
    if (!fullscreenBookContainerRef.current) return;
    setIsFsLoading(true);

    if (fullscreenPageFlipRef.current) {
      try {
        fullscreenPageFlipRef.current.destroy();
      } catch {
        // ignore
      }
      fullscreenPageFlipRef.current = null;
    }

    fullscreenBookContainerRef.current.innerHTML = '';

    const wrapperEl = document.createElement('div');
    wrapperEl.className = 'flex items-center justify-center';
    fullscreenBookContainerRef.current.appendChild(wrapperEl);

    const { pageWidth, pageHeight } = getFullscreenDimensions(zoom);

    try {
      const fsInstance = new PageFlip(wrapperEl, {
        width: pageWidth,
        height: pageHeight,
        size: 'fixed',
        maxShadowOpacity: 0.5,
        showCover: false, // Always 2 pages side-by-side!
        mobileScrollSupport: false,
        usePortrait: false, // NEVER collapse to 1-page portrait mode!
        drawShadow: true,
        flippingTime: 450,
        useMouseEvents: true,
        swipeDistance: 20,
        showPageCorners: true,
        startPage: targetPage,
      });

      // Construct native HTML DOM page elements for razor-sharp zoom in fullscreen
      const pageElements = currentDoc.pages.map((p, idx) => {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'stf__page bg-white overflow-hidden select-none';
        
        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.title || `Trang ${idx + 1}`;
        img.className = 'w-full h-full object-fill pointer-events-none select-none block';
        img.draggable = false;
        img.loading = 'eager';
        img.decoding = 'async';
        img.style.imageRendering = '-webkit-optimize-contrast';
        
        pageDiv.appendChild(img);
        return pageDiv;
      });

      fsInstance.loadFromHTML(pageElements);

      fsInstance.on('flip', (e) => {
        currentPageRef.current = e.data;
        setCurrentPage(e.data);
      });

      fsInstance.on('init', () => {
        setIsFsLoading(false);
        if (targetPage > 0) {
          fsInstance.turnToPage(targetPage);
        }
      });

      fullscreenPageFlipRef.current = fsInstance;
    } catch (err) {
      console.error('Failed to initialize Fullscreen PageFlip:', err);
      setIsFsLoading(false);
    }
  }, [currentDoc, getFullscreenDimensions]);

  // Initial and document switch effect for inline book
  useEffect(() => {
    const timer = setTimeout(() => {
      initMainBook(0);
    }, 60);

    return () => {
      clearTimeout(timer);
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch {
          // ignore
        }
        pageFlipRef.current = null;
      }
    };
  }, [initMainBook]);

  // Fullscreen lifecycle effect - reinitializes whenever isFullscreen or zoomLevel changes
  useEffect(() => {
    if (!isFullscreen) return;

    const timer = setTimeout(() => {
      initFullscreenBook(currentPageRef.current, zoomLevel);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (fullscreenPageFlipRef.current) {
        try {
          fullscreenPageFlipRef.current.destroy();
        } catch {
          // ignore
        }
        fullscreenPageFlipRef.current = null;
      }
    };
  }, [isFullscreen, zoomLevel, initFullscreenBook]);

  // Debounced window resize handler to maintain sharp 2-page fit
  useEffect(() => {
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isFullscreen) {
          initFullscreenBook(currentPageRef.current, zoomLevel);
        } else {
          initMainBook(currentPageRef.current);
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isFullscreen, zoomLevel, initMainBook, initFullscreenBook]);

  // Flip controls
  const handlePrevPage = useCallback(() => {
    if (isFullscreen && fullscreenPageFlipRef.current) {
      fullscreenPageFlipRef.current.flipPrev();
    } else if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev();
    }
  }, [isFullscreen]);

  const handleNextPage = useCallback(() => {
    if (isFullscreen && fullscreenPageFlipRef.current) {
      fullscreenPageFlipRef.current.flipNext();
    } else if (pageFlipRef.current) {
      pageFlipRef.current.flipNext();
    }
  }, [isFullscreen]);

  const handleJumpToSpread = useCallback((spreadLeftPageIndex) => {
    if (spreadLeftPageIndex === currentPageRef.current) return;
    if (isFullscreen && fullscreenPageFlipRef.current) {
      try {
        fullscreenPageFlipRef.current.flip(spreadLeftPageIndex);
      } catch {
        fullscreenPageFlipRef.current.turnToPage(spreadLeftPageIndex);
      }
    } else if (pageFlipRef.current) {
      try {
        pageFlipRef.current.flip(spreadLeftPageIndex);
      } catch {
        pageFlipRef.current.turnToPage(spreadLeftPageIndex);
      }
    }
  }, [isFullscreen]);

  // Fullscreen open / close
  const openFullscreen = () => {
    setZoomLevel(1);
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setZoomLevel(1);
    document.body.style.overflow = '';
    // Synchronize inline book to the spread reached in fullscreen mode
    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.turnToPage(currentPageRef.current);
      } catch {
        // ignore
      }
    }
  }, []);

  // Zoom handlers for fullscreen mode
  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(2.0, Number((z + 0.25).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(1.0, Number((z - 0.25).toFixed(2))));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          closeFullscreen();
        } else if (e.key === 'ArrowRight') {
          handleNextPage();
        } else if (e.key === 'ArrowLeft') {
          handlePrevPage();
        } else if (e.key === '+' || e.key === '=') {
          handleZoomIn();
        } else if (e.key === '-' || e.key === '_') {
          handleZoomOut();
        } else if (e.key === '0') {
          handleZoomReset();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, closeFullscreen, handleNextPage, handlePrevPage]);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Page numbering and titles
  const leftPageNum = currentPage + 1;
  const rightPageNum = Math.min(currentPage + 2, totalPages);
  const pageLabel = leftPageNum === rightPageNum
    ? `Trang ${leftPageNum} / ${totalPages}`
    : `Trang ${leftPageNum} - ${rightPageNum} / ${totalPages}`;

  const leftPageMeta = currentDoc.pages[currentPage];
  const rightPageMeta = currentDoc.pages[currentPage + 1];
  const spreadTitle = leftPageMeta
    ? rightPageMeta
      ? `${leftPageMeta.title} • ${rightPageMeta.title}`
      : leftPageMeta.title
    : '';

  // Spreads list dynamically generated based on totalPages (e.g. [0, 2, 4] for 5 pages)
  const spreadIndices = Array.from(
    { length: Math.ceil(totalPages / 2) },
    (_, i) => i * 2
  );
  const isLastSpread = currentPage >= totalPages - (totalPages % 2 === 0 ? 2 : 1);

  return (
    <div className="w-full flex flex-col items-center">
      {/* PageFlip Global Drop-Shadow, Centering & Native Image Rendering Styles */}
      <style>{`
        .stf__parent {
          margin: 0 auto !important;
          max-width: 100% !important;
        }
        .stf__wrapper {
          margin: 0 auto !important;
          max-width: 100% !important;
          box-shadow: 0 16px 38px -10px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .stf__item {
          background-color: #ffffff !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
        }
        .stf__item img {
          width: 100% !important;
          height: 100% !important;
          object-fit: fill !important;
          display: block !important;
          user-select: none !important;
          -webkit-user-drag: none !important;
          image-rendering: -webkit-optimize-contrast;
        }
      `}</style>

      {/* 2. Focused 2-Page Flipbook Stage (Directly on section background, no clunky borders or nested card frames) */}
      <div className="relative w-full max-w-5xl 2xl:max-w-6xl flex items-center justify-center my-1 sm:my-3 select-none">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100/85 backdrop-blur-xs z-30 rounded-xl min-h-[320px]">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs font-medium text-stone-600">Đang chuẩn bị hồ sơ 2 trang...</span>
          </div>
        )}

        {/* Floating Left Turn Chevron Button (Visible outside book on md/lg, hidden on mobile so it doesn't block page text) */}
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`hidden md:flex absolute md:-left-12 lg:-left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-primary shadow-md hover:shadow-xl border border-stone-200/80 items-center justify-center transition-all ${
            currentPage === 0
              ? 'opacity-0 pointer-events-none'
              : 'opacity-90 hover:opacity-100 hover:scale-108 active:scale-95 cursor-pointer'
          }`}
          title="Trang trước (←)"
          aria-label="Trang trước"
        >
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>

        {/* Book Mount Container */}
        <div
          ref={bookContainerRef}
          className="flex items-center justify-center cursor-grab active:cursor-grabbing max-w-full"
          title="Nhấp hoặc kéo mép giấy để lật trang"
        />

        {/* Floating Right Turn Chevron Button (Visible outside book on md/lg, hidden on mobile so it doesn't block page text) */}
        <button
          type="button"
          onClick={handleNextPage}
          disabled={isLastSpread}
          className={`hidden md:flex absolute md:-right-12 lg:-right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-primary shadow-md hover:shadow-xl border border-stone-200/80 items-center justify-center transition-all ${
            isLastSpread
              ? 'opacity-0 pointer-events-none'
              : 'opacity-90 hover:opacity-100 hover:scale-108 active:scale-95 cursor-pointer'
          }`}
          title="Trang sau (→)"
          aria-label="Trang sau"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </div>

      {/* 3. Bottom Minimal Navigation Capsule & Spread Quick Dots */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-2 mt-4 px-2 overflow-hidden">
        {/* Unified Reader Control Bar */}
        <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 bg-white/95 backdrop-blur-sm rounded-full border border-stone-200/90 shadow-sm max-w-full">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              currentPage === 0
                ? 'opacity-35 cursor-not-allowed text-stone-400'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100 active:scale-95 cursor-pointer'
            }`}
            title="Trang trước"
          >
            <span className="material-symbols-outlined text-sm sm:text-base">arrow_back</span>
            <span className="hidden sm:inline">Trước</span>
          </button>

          <span className="text-xs font-bold text-stone-900 font-heading px-2.5 sm:px-3 py-1 sm:py-1.5 bg-stone-100 rounded-full select-none whitespace-nowrap">
            {pageLabel}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={isLastSpread}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              isLastSpread
                ? 'opacity-35 cursor-not-allowed text-stone-400'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100 active:scale-95 cursor-pointer'
            }`}
            title="Trang sau"
          >
            <span className="hidden sm:inline">Sau</span>
            <span className="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          <button
            type="button"
            onClick={openFullscreen}
            className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-bold bg-primary hover:bg-orange-600 text-white shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            title="Phóng to 2 trang toàn màn hình"
          >
            <span className="material-symbols-outlined text-sm">fullscreen</span>
            <span>Phóng to</span>
          </button>

          <a
            href={currentDoc.pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-all border border-transparent hover:border-stone-200 whitespace-nowrap"
            title="Tải trọn bộ hồ sơ pháp lý PDF gốc (5.3 MB)"
          >
            <span className="material-symbols-outlined text-sm text-stone-500">download</span>
            <span className="hidden md:inline">Tải PDF (5.3MB)</span>
            <span className="inline md:hidden">PDF</span>
          </a>
        </div>

        {/* Spread Quick Indicators */}
        <div className="flex items-center gap-1.5 mt-0.5">
          {spreadIndices.map((spreadStart) => {
            const isCurrentSpread = currentPage === spreadStart;
            const sLeft = spreadStart + 1;
            const sRight = Math.min(spreadStart + 2, totalPages);
            const dotTitle = sLeft === sRight ? `Xem Trang ${sLeft}` : `Xem Trang ${sLeft} - ${sRight}`;
            return (
              <button
                key={spreadStart}
                type="button"
                onClick={() => handleJumpToSpread(spreadStart)}
                className={`transition-all cursor-pointer ${
                  isCurrentSpread
                    ? 'w-7 h-2 bg-primary rounded-full'
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-400 rounded-full'
                }`}
                title={dotTitle}
                aria-label={dotTitle}
              />
            );
          })}
        </div>

        {/* Informative Spread Topic Caption */}
        {spreadTitle && (
          <div className="w-full max-w-lg text-[11px] sm:text-xs text-stone-600 text-center font-medium leading-relaxed px-2">
            <span className="text-primary font-bold mr-1">●</span>
            <span>{spreadTitle}</span>
          </div>
        )}

        {/* User Interaction Hint */}
        <p className="w-full max-w-lg text-[11px] sm:text-xs text-stone-500 text-center px-2 leading-relaxed">
          <span className="material-symbols-outlined text-sm text-primary align-middle mr-1">touch_app</span>
          Click hoặc kéo mép giấy để lật trang • Bấm <strong className="font-bold">Phóng to</strong> để xem rõ từng chi tiết
        </p>
      </div>

      {/* 4. Fullscreen 2-Page Interactive Flipbook Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col animate-fadeIn select-none">
          {/* Modal Header */}
          <div className="h-14 px-3 sm:px-6 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between text-white shrink-0">
            {/* Left: Document Info & Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-lg sm:text-xl shrink-0">{currentDoc.icon}</span>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold truncate">
                  {currentDoc.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-400 truncate hidden xs:block">
                  {currentDoc.badge} • Đóng mộc đỏ pháp lý & kiểm nghiệm
                </div>
              </div>
            </div>

            {/* Right: Zoom controls, PDF Download, Close */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Zoom Controls (Direct native canvas re-sizing for crisp text and flawless flip dragging) */}
              <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1.0}
                  className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                    zoomLevel <= 1.0
                      ? 'text-stone-600 cursor-not-allowed'
                      : 'hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer'
                  }`}
                  title="Thu nhỏ (-)"
                >
                  <span className="material-symbols-outlined text-sm">zoom_out</span>
                </button>
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="text-[10px] sm:text-[11px] font-mono px-1.5 sm:px-2 text-stone-300 min-w-[38px] sm:min-w-[42px] text-center hover:text-white cursor-pointer"
                  title="Đặt lại 100% (Phím 0)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.0}
                  className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                    zoomLevel >= 2.0
                      ? 'text-stone-600 cursor-not-allowed'
                      : 'hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer'
                  }`}
                  title="Phóng to (+)"
                >
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                </button>
              </div>

              {/* Tải PDF */}
              <a
                href={currentDoc.pdfUrl}
                download
                className="px-2.5 sm:px-3 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                title="Tải văn bản PDF gốc"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span className="hidden md:inline">Tải PDF</span>
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeFullscreen}
                className="h-8 px-2 sm:px-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center gap-1 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                title="Đóng (ESC)"
              >
                <span className="material-symbols-outlined text-base">close</span>
                <span className="hidden sm:inline">Đóng</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Flipbook Stage (2 pages side-by-side with full flipping & natural 2-axis scrolling when zoomed) */}
          <div className="flex-1 relative flex overflow-auto p-2 sm:p-6 select-none">
            {/* Loading Spinner for Fullscreen */}
            {isFsLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/75 z-40">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-xs text-stone-300">Đang tải chế độ 2 trang sắc nét...</span>
              </div>
            )}

            {/* Left Chevron Button in Fullscreen (Desktop only, flanking outside without blocking text) */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-stone-900/90 hover:bg-primary text-white border border-stone-700/80 shadow-2xl items-center justify-center transition-all ${
                currentPage === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer'
              }`}
              title="Trang trước (←)"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>

            {/* Fullscreen Book Mount Node (m-auto centers when smaller, aligns 0,0 and enables scrollbars when zoomed!) */}
            <div className="m-auto flex items-center justify-center">
              <div
                ref={fullscreenBookContainerRef}
                className="flex items-center justify-center cursor-grab active:cursor-grabbing"
                title="Nhấp hoặc kéo mép giấy để lật trang"
              />
            </div>

            {/* Right Chevron Button in Fullscreen (Desktop only, flanking outside without blocking text) */}
            <button
              type="button"
              onClick={handleNextPage}
              disabled={isLastSpread}
              className={`hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-stone-900/90 hover:bg-primary text-white border border-stone-700/80 shadow-2xl items-center justify-center transition-all ${
                isLastSpread
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer'
              }`}
              title="Trang sau (→)"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>
          </div>

          {/* Fullscreen Bottom Bar */}
          <div className="h-14 px-3 sm:px-6 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between text-white shrink-0">
            {/* Quick Prev Button */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 bg-stone-800 transition-all ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed text-stone-500'
                  : 'hover:bg-stone-700 text-stone-200 hover:text-white cursor-pointer active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:inline">Trang trước</span>
            </button>

            {/* Center Spread Selector Pills */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
              {spreadIndices.map((spreadStart) => {
                const isCurrentSpread = currentPage === spreadStart;
                const fsLeft = spreadStart + 1;
                const fsRight = Math.min(spreadStart + 2, totalPages);
                const label = fsLeft === fsRight ? `Trang ${fsLeft}` : `${fsLeft}-${fsRight}`;
                return (
                  <button
                    key={spreadStart}
                    type="button"
                    onClick={() => handleJumpToSpread(spreadStart)}
                    className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                      isCurrentSpread
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-stone-800/90 text-stone-400 hover:text-white hover:bg-stone-700'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Quick Next Button */}
            <button
              type="button"
              onClick={handleNextPage}
              disabled={isLastSpread}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 bg-stone-800 transition-all ${
                isLastSpread
                  ? 'opacity-30 cursor-not-allowed text-stone-500'
                  : 'hover:bg-stone-700 text-stone-200 hover:text-white cursor-pointer active:scale-95'
              }`}
            >
              <span className="hidden sm:inline">Trang sau</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
