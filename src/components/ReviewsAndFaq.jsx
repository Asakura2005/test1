import React, { useState } from 'react';
import { Star, ChevronDown, MessageSquare, HelpCircle } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function ReviewsAndFaq() {
  const [openFaq, setOpenFaq] = useState(0);

  const realReviews = [
    {
      name: 'Chị Thảo My',
      role: 'Dân văn phòng (Cầu Giấy, Hà Nội)',
      comment: 'Tầm 3h chiều cả phòng đói bụng mở gói Bánh Chả với Bánh Tráng Sấy ra ăn là tỉnh cả người. Bánh chả thơm nức mùi lá chanh, giòn tan mà không bị ngấy mỡ chút nào.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Chị Lan Phương',
      role: 'Mẹ 2 bé (Ba Đình, Hà Nội)',
      comment: 'Thích nhất là bánh nướng không chiên dầu mỡ bẩn, bao bì đóng màng nhôm rất sạch sẽ. Mua combo gia đình 6 món về để tủ, hai bé nhà mình thích mê bắp caramel với bánh sữa dừa.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Anh Tuấn Kiệt',
      role: 'Lập trình viên IT (Đà Nẵng)',
      comment: 'Đặt combo ship về Đà Nẵng giao trong 2 ngày, thùng đóng xốp chống sốc cẩn thận nên bánh không hề bị vỡ nát. Bò khô thơm cay, bánh tráng tôm ăn rất cuốn, đáng tiền.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const quickFaqs = [
    {
      q: 'Đồ ăn vặt để được bao lâu? Có bị ỉu mềm không?',
      a: 'Bánh có hạn sử dụng từ 6 đến 9 tháng kể từ ngày sản xuất. Nhờ bao bì màng nhôm 3 lớp ép nhiệt chân không, bánh luôn giữ được độ giòn xốp thơm ngon như lúc mới ra lò mà không cần dùng chất bảo quản.'
    },
    {
      q: 'Tôi có được mở hộp ăn thử trước khi thanh toán không?',
      a: 'Hoàn toàn được! HAQ áp dụng chính sách nhận hàng kiểm tra và nếm thử. Nếu bánh không giòn tan hoặc không chuẩn vị như cam kết, bạn được quyền từ chối nhận hàng không mất phí.'
    },
    {
      q: 'Đặt hàng thì bao lâu tôi nhận được bánh?',
      a: 'Nội thành Hà Nội giao nhanh trong 2 – 4 giờ. Các tỉnh thành khác (TP.HCM, Đà Nẵng, Hải Phòng...) thời gian giao hàng từ 1 – 3 ngày qua Viettel Post hoặc GHTK.'
    },
    {
      q: 'Mua bao nhiêu thì được miễn phí vận chuyển (Freeship)?',
      a: 'Bạn đặt từ Combo Gia Đình (269.000đ) hoặc đặt từ 2 combo bất kỳ trở lên sẽ được MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC.'
    }
  ];

  return (
    <section id="danh-gia-faq" className="py-10 sm:py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Cột trái: Đánh giá thực tế (6 cột) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wider mb-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>Khách Hàng Chia Sẻ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900">
                Cảm Nhận Sau Khi Thưởng Thức
              </h2>
              <p className="mt-2 text-sm sm:text-base text-stone-600">
                Hình ảnh và phản hồi tự nhiên từ những người sành ăn vặt trên toàn quốc.
              </p>
            </div>

            <div className="space-y-4">
              {realReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FAF9F8] border border-stone-200 hover:border-red-200 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-11 h-11 rounded-full object-cover border border-stone-200"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-heading font-bold text-stone-900 text-base">
                          {rev.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          {rev.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cột phải: Hỏi đáp thường gặp (6 cột) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wider mb-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Giải Đáp Thắc Mắc</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="mt-2 text-sm sm:text-base text-stone-600">
                Những điều khách hàng thường quan tâm khi đặt đồ ăn vặt HAQ FOOD.
              </p>
            </div>

            <div className="space-y-3.5">
              {quickFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      isOpen
                        ? 'border-[#DC2626] bg-red-50/30'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-sm sm:text-base font-heading font-bold text-stone-900"
                    >
                      <span className={isOpen ? 'text-[#DC2626]' : 'text-stone-900'}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-stone-500 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#DC2626]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hotline hỗ trợ */}
            <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-sm">
              <span>Bạn cần tư vấn thêm vị bánh hoặc đặt sỉ?</span>
              <a
                href={`tel:${SITE_DATA.brand.hotlineRaw}`}
                className="text-[#DC2626] font-bold hover:underline shrink-0 text-sm sm:text-base"
              >
                Hotline: {SITE_DATA.brand.hotline}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
