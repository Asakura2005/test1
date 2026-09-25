import React from 'react';
import { ShieldCheck, Flame, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function BrandCommitment() {
  const commitments = [
    {
      title: 'Nướng Sấy Không Dầu Bẩn',
      desc: 'Công nghệ nướng đối lưu và sấy nhiệt sạch, không chiên ngập dầu tái chế. Bánh giòn rụm, thơm ngon mà không ngấy, không lo đầy bụng hay nổi mụn.',
      icon: Flame,
      tag: 'Tốt cho sức khỏe'
    },
    {
      title: 'Chuẩn ISO 22000 & HACCP',
      desc: 'Xưởng sản xuất trực tiếp tại Hà Nội, đạt chứng nhận an toàn thực phẩm quốc tế. Đầy đủ giấy công bố và kiểm nghiệm định kỳ.',
      icon: ShieldCheck,
      tag: 'Xưởng sạch vô trùng'
    },
    {
      title: 'Màng Nhôm Khóa Giòn 9 Tháng',
      desc: 'Túi tráng nhôm 3 lớp ép nhiệt chân không ngăn độ ẩm và ánh sáng. Luôn giữ trọn độ giòn xốp như lúc mới ra lò mà không cần chất bảo quản.',
      icon: Award,
      tag: 'Giòn tan lâu dài'
    },
    {
      title: 'Ăn Thử Không Ngon — Hoàn Tiền',
      desc: 'Khách nhận hàng được mở gói ăn thử tại chỗ. Nếu bánh bị ỉu mềm hoặc không chuẩn vị như cam kết, từ chối nhận mà không mất bất kỳ chi phí nào.',
      icon: HeartHandshake,
      tag: 'Yên tâm 100%'
    }
  ];

  return (
    <section id="cam-ket" className="py-10 sm:py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wider block mb-1.5">
            AN TÂM TUYỆT ĐỐI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-900">
            Vì Sao Khách Hàng Tin Chọn Đồ Ăn Vặt HAQ?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Đồ ăn vặt HAQ FOOD được làm với tiêu chuẩn sạch sẽ, minh bạch như làm cho chính người thân trong gia đình thưởng thức.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((c, idx) => {
            const IconComponent = c.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF9F8] border border-stone-200 hover:border-[#DC2626] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#DC2626]">
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-stone-900 mb-2">
                    {c.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/70 flex items-center gap-2 text-sm text-[#DC2626] font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Cam kết từ nhà sản xuất</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trích dẫn ngắn gọn */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-5 text-sm sm:text-base text-stone-700 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="h-9 w-9 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center font-bold text-base shrink-0">
              ✓
            </div>
            <p>
              <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> — Nhà máy sản xuất đạt chuẩn an toàn thực phẩm ISO 22000:2018. Mã số thuế: <strong>0109547016</strong>.
            </p>
          </div>
          <a
            href="#dat-hang"
            className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-bold text-sm tracking-wide shrink-0 transition-colors shadow-md shadow-red-600/20 active:scale-95"
          >
            Đặt Combo Ăn Thử
          </a>
        </div>
      </div>
    </section>
  );
}
