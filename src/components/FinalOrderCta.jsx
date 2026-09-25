import React, { useState, useEffect } from 'react';
import { CRO_DATA } from '../data/croData';
import { sendOrderToTelegram } from '../services/telegramService';

export default function FinalOrderCta({ selectedCombo, onSelectCombo }) {
  const [pack, setPack] = useState(selectedCombo || 'combo_da_nhan_cach');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedCombo) {
      setPack(selectedCombo);
    }
  }, [selectedCombo]);

  const currentCombo = CRO_DATA.combos.find(c => c.id === pack) || CRO_DATA.combos[1];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ (10 số).');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ nhận hàng chi tiết.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const grandTotalText = currentCombo.isFreeship
      ? currentCombo.priceText
      : `${(currentCombo.priceNum + (currentCombo.shippingFee || 25000)).toLocaleString('vi-VN')}₫`;

    sendOrderToTelegram({
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      comboName: currentCombo.name,
      comboPrice: currentCombo.priceText,
      shippingFeeText: currentCombo.isFreeship ? 'FREESHIP (0đ)' : '25.000₫',
      totalPrice: grandTotalText,
      source: 'Form Cuối Trang',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="w-full py-8 sm:py-12 bg-surface-container-low scroll-mt-24" id="form-dat-hang-final">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="bg-surface-container-lowest rounded-2xl shadow-lg p-4 sm:p-5 border border-surface-container">
          {/* Header */}
          <div className="text-center space-y-1 mb-4 sm:mb-5">
            <div className="inline-flex items-center gap-1 bg-error text-white text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full animate-pulse">
              <span className="material-symbols-outlined text-xs">alarm</span>
              <span>CHỐT ĐƠN TRONG GIỜ VÀNG FLASH SALE</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-primary uppercase tracking-tight font-heading">
              Điền Thông Tin Nhận Hàng Nhanh
            </h3>
            <p className="text-xs text-on-surface-variant">
              Hàng giao đến nơi được bóc thùng kiểm tra hàng và số lượng mới thanh toán tiền!
            </p>
          </div>

          {submitted ? (
            <div className="bg-white p-5 sm:p-6 rounded-xl border-2 border-primary text-center space-y-3.5 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary font-heading">
                Đặt Hàng Thành Công!
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Cảm ơn bạn <strong className="text-on-surface">{formData.fullName}</strong>! Đơn hàng <strong className="text-primary">{currentCombo.name}</strong> ({currentCombo.priceText}) đã được ghi nhận vào hệ thống.
              </p>
              <div className="p-3.5 bg-surface-container-low rounded-xl text-xs text-on-surface-variant space-y-1.5 text-left max-w-sm mx-auto">
                <div><strong>Người nhận:</strong> {formData.fullName} ({formData.phone})</div>
                <div><strong>Địa chỉ:</strong> {formData.address}</div>
                <div><strong>Gói combo:</strong> {currentCombo.name} ({currentCombo.priceText})</div>
                <div>
                  <strong>Phí giao hàng:</strong>{' '}
                  <span className={currentCombo.isFreeship ? 'text-emerald-700 font-bold' : 'text-stone-700 font-semibold'}>
                    {currentCombo.isFreeship ? 'FREESHIP 0đ' : '25.000₫'}
                  </span>
                </div>
                {formData.note && <div><strong>Ghi chú:</strong> {formData.note}</div>}
                <div>
                  <strong>Tổng tiền COD:</strong>{' '}
                  <span className="text-primary font-bold text-sm">
                    {currentCombo.isFreeship ? currentCombo.priceText : `${(currentCombo.priceNum + (currentCombo.shippingFee || 25000)).toLocaleString('vi-VN')}₫`}
                  </span>{' '}
                  (Đồng kiểm COD)
                </div>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Bộ phận giao vận sẽ liên hệ với bạn trong ít phút để gửi hàng hỏa tốc.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ fullName: '', phone: '', address: '', note: '' });
                }}
                className="mt-1 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
              >
                Đặt thêm đơn
              </button>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-error-container text-error text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Combo Radio Selector */}
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase font-bold text-on-surface">
                  Chọn gói combo muốn đặt:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CRO_DATA.combos.map((item) => {
                    const isChecked = pack === item.id;
                    return (
                      <label
                        key={item.id}
                        className={`p-2 rounded-xl text-center cursor-pointer text-xs font-bold transition-all flex flex-col items-center justify-between border relative ${
                          isChecked
                            ? 'bg-primary/10 border-primary text-primary font-extrabold shadow-xs ring-1 ring-primary'
                            : 'bg-surface border-surface-container hover:bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {item.isPopular && (
                          <span className="absolute -top-2 right-1 bg-primary text-white text-[8.5px] px-1.5 py-0.2 rounded-full font-bold uppercase">
                            HOT 🔥
                          </span>
                        )}
                        <input
                          type="radio"
                          name="final_pack"
                          value={item.id}
                          checked={isChecked}
                          onChange={() => { setPack(item.id); if (onSelectCombo) onSelectCombo(item.id); }}
                          className="mx-auto mb-1 text-primary accent-primary"
                        />
                        <span className="truncate w-full text-[10.5px] sm:text-xs text-on-surface">{item.name}</span>
                        <span className="text-primary font-black text-xs sm:text-sm mt-0.5">{item.priceText}</span>
                        {item.isFreeship && (
                          <span className="text-[8.5px] text-emerald-700 font-bold">FREESHIP</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="final-fullName" className="block text-[11px] text-on-surface font-semibold mb-1">
                    Họ tên của bạn: *
                  </label>
                  <input
                    id="final-fullName"
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-surface px-3 py-2 rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-surface-container"
                  />
                </div>
                <div>
                  <label htmlFor="final-phone" className="block text-[11px] text-on-surface font-semibold mb-1">
                    Số điện thoại: *
                  </label>
                  <input
                    id="final-phone"
                    type="tel"
                    required
                    placeholder="0901234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-surface px-3 py-2 rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-surface-container"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="final-address" className="block text-[11px] text-on-surface font-semibold mb-1">
                  Địa chỉ chi tiết nhận hàng: *
                </label>
                <input
                  id="final-address"
                  type="text"
                  required
                  placeholder="Số nhà, Tên đường, Xã/Phường, Quận/Huyện, Tỉnh/Thành phố"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-surface px-3 py-2 rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-surface-container"
                />
              </div>

              <div>
                <label htmlFor="final-note" className="block text-[11px] text-on-surface font-semibold mb-1">
                  Ghi chú đặc biệt (ví dụ: giao giờ hành chính, chia vị cay nhiều / ít...):
                </label>
                <input
                  id="final-note"
                  type="text"
                  placeholder="Ghi chú thêm nếu có..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full bg-surface px-3 py-2 rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-surface-container"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary-container hover:opacity-95 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wide shadow-md flex items-center justify-center gap-2 transition-transform transform active:scale-98 cursor-pointer disabled:opacity-50 mt-1"
              >
                <span className="material-symbols-outlined text-base">shopping_cart</span>
                <span>
                  {isSubmitting ? 'Đang gửi thông tin...' : 'ĐẶT HÀNG NGAY - GIAO HÀNG TẬN NHÀ'}
                </span>
              </button>

              <p className="text-center text-[10.5px] text-primary font-bold pt-0.5">
                ✓ Miễn phí vận chuyển toàn quốc cho đơn hàng từ combo 149K - Giao hỏa tốc 24h - 48h!
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
