import React, { useState, useEffect } from 'react';
import { CRO_DATA } from '../data/croData';
import { sendOrderToTelegram } from '../services/telegramService';

export default function OrderFormLead({ selectedCombo, onSelectCombo }) {
  const [combo, setCombo] = useState(selectedCombo || 'combo_da_nhan_cach');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedCombo) {
      setCombo(selectedCombo);
    }
  }, [selectedCombo]);

  const handleComboChange = (val) => {
    setCombo(val);
    if (onSelectCombo) onSelectCombo(val);
  };

  const getComboDetails = () => {
    return CRO_DATA.combos.find(c => c.id === combo) || CRO_DATA.combos[1];
  };

  const currentCombo = getComboDetails();

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
      source: 'Form Nhanh 30s',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
    }, 600);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10" id="form-dat-hang-lead-1">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden p-4 sm:p-5 border border-stone-200/80">
        {/* Header */}
        <div className="text-center space-y-1 mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 bg-orange-100 text-primary text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-xs">shopping_cart_checkout</span>
            <span>Đặt Hàng Nhanh 30 Giây</span>
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-stone-900 uppercase tracking-tight font-heading">
            Điền Thông Tin Nhận Hàng Nhanh
          </h2>
          <p className="text-primary font-semibold text-xs">
            🔥 Miễn phí vận chuyển toàn quốc cho đơn hàng từ combo 149K!
          </p>
        </div>

        {orderSuccess ? (
          <div className="bg-white p-5 rounded-2xl border-2 border-primary text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-primary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-heading">
              Đặt Hàng Thành Công!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Cảm ơn bạn <strong className="text-stone-900">{formData.fullName}</strong>! HAQ FOOD đã tiếp nhận đơn hàng <strong className="text-primary">{currentCombo.name}</strong> ({currentCombo.priceText}).
            </p>
            <div className="p-3.5 bg-stone-50 rounded-xl text-xs text-stone-600 space-y-1.5 text-left max-w-sm mx-auto border border-stone-200/60">
              <div><strong>Người nhận:</strong> {formData.fullName} - {formData.phone}</div>
              <div><strong>Địa chỉ:</strong> {formData.address}</div>
              <div><strong>Gói combo:</strong> {currentCombo.name} ({currentCombo.priceText})</div>
              <div>
                <strong>Phí giao hàng:</strong>{' '}
                <span className={currentCombo.isFreeship ? 'text-emerald-700 font-bold' : 'text-stone-700 font-semibold'}>
                  {currentCombo.isFreeship ? 'FREESHIP 0đ' : '25.000₫'}
                </span>
              </div>
              <div>
                <strong>Tổng thanh toán:</strong>{' '}
                <span className="text-primary font-bold text-sm">
                  {currentCombo.isFreeship ? currentCombo.priceText : `${(currentCombo.priceNum + (currentCombo.shippingFee || 25000)).toLocaleString('vi-VN')}₫`}
                </span>{' '}
                (Đồng kiểm COD)
              </div>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              Chuyên viên kho vận sẽ gọi số <strong className="text-stone-900">{formData.phone}</strong> trong ít phút để xác nhận và gửi hàng hỏa tốc.
            </p>
            <button
              type="button"
              onClick={() => {
                setOrderSuccess(false);
                setFormData({ fullName: '', phone: '', address: '', note: '' });
              }}
              className="mt-1 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
            >
              Đặt thêm đơn khác
            </button>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-50 text-error text-xs font-bold flex items-center gap-1.5 border border-red-200">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. Combo Selector Grid */}
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase font-bold text-stone-700">
                1. Chọn gói combo muốn đặt:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CRO_DATA.combos.map((item) => {
                  const isChecked = combo === item.id;
                  return (
                    <label
                      key={item.id}
                      className={`p-2 rounded-xl text-center cursor-pointer text-xs font-bold transition-all flex flex-col items-center justify-between border relative ${
                        isChecked
                          ? 'bg-orange-50 border-primary text-primary shadow-xs ring-1 ring-primary'
                          : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {item.isPopular && (
                        <span className="absolute -top-2 right-1 bg-primary text-white text-[8.5px] px-1.5 py-0.2 rounded-full font-bold uppercase shadow-xs">
                          HOT 🔥
                        </span>
                      )}
                      <input
                        type="radio"
                        name="combo_pack_lead"
                        value={item.id}
                        checked={isChecked}
                        onChange={() => handleComboChange(item.id)}
                        className="mb-1 accent-orange-600"
                      />
                      <span className="font-bold text-[10.5px] sm:text-xs leading-tight line-clamp-1">{item.name}</span>
                      <span className="text-primary font-black text-xs sm:text-sm mt-0.5">{item.priceText}</span>
                      <span className="text-[9.5px] text-stone-400 line-through">{item.originalPrice}</span>
                      {item.isFreeship ? (
                        <span className="text-[8.5px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded mt-1">FREESHIP</span>
                      ) : (
                        <span className="text-[8.5px] text-stone-500 bg-stone-100 px-1 py-0.2 rounded mt-1">+25k ship</span>
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Selected Combo Mini Preview */}
              {currentCombo && (
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={currentCombo.image}
                      alt={currentCombo.name}
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-extrabold text-stone-900 text-xs truncate">{currentCombo.name}</div>
                      <div className="text-[10.5px] text-stone-500 truncate">{currentCombo.subName}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-primary">{currentCombo.priceText}</div>
                    <div className="text-[10px] font-bold text-emerald-700">
                      {currentCombo.isFreeship ? 'Miễn phí giao hàng' : '+25k ship ưu đãi'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Customer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="lead-fullName" className="block text-[11px] text-stone-700 font-semibold mb-1">
                  Họ tên của bạn: *
                </label>
                <input
                  id="lead-fullName"
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Thị Mai"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-stone-50 px-3 py-2 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/30 border border-stone-200"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="block text-[11px] text-stone-700 font-semibold mb-1">
                  Số điện thoại: *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  placeholder="Ví dụ: 0987 654 321"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-stone-50 px-3 py-2 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/30 border border-stone-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lead-address" className="block text-[11px] text-stone-700 font-semibold mb-1">
                Địa chỉ chi tiết nhận hàng: *
              </label>
              <input
                id="lead-address"
                type="text"
                required
                placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-stone-50 px-3 py-2 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/30 border border-stone-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-orange-500 hover:opacity-95 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 transition-transform transform active:scale-98 cursor-pointer disabled:opacity-50 mt-1"
            >
              <span className="material-symbols-outlined text-lg">shopping_cart</span>
              <span>
                {isSubmitting ? 'Đang gửi thông tin...' : 'XÁC NHẬN ĐẶT HÀNG - NHẬN ƯU ĐÃI NGAY'}
              </span>
            </button>

            <p className="text-center text-[10px] text-stone-500 font-medium">
              🔒 Thông tin cam kết bảo mật 100%. Mở thùng đồng kiểm tra hàng trước khi nhận.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
