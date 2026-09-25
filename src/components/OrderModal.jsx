import React, { useState, useEffect } from 'react';
import { CRO_DATA } from '../data/croData';
import { sendOrderToTelegram } from '../services/telegramService';

export default function OrderModal({ isOpen, onClose, selectedCombo, onSelectCombo }) {
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

  // Sync selected combo when modal opens or prop changes
  useEffect(() => {
    if (selectedCombo) {
      setCombo(selectedCombo);
    }
  }, [selectedCombo, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCombo = CRO_DATA.combos.find((c) => c.id === combo) || CRO_DATA.combos[1] || CRO_DATA.combos[0];

  const handleComboChange = (val) => {
    setCombo(val);
    if (onSelectCombo) onSelectCombo(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên nhận hàng.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setErrorMsg('Số điện thoại không hợp lệ (cần 10 số).');
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
      source: 'Cửa Sổ Đặt Hàng (Modal)',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setOrderSuccess(false);
    setFormData({ fullName: '', phone: '', address: '', note: '' });
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/65 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[490px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 flex flex-col max-h-[92vh] animate-scaleUp">
        
        {/* 1. Header (Clean, Light & Modern) */}
        <div className="px-5 py-3.5 bg-white border-b border-stone-100 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100/80 text-orange-700 text-[10px] font-extrabold uppercase tracking-wide border border-orange-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse"></span>
                Flash Sale Hôm Nay
              </span>
              <span className="text-[11px] text-stone-400 font-medium hidden sm:inline">
                • Tiết kiệm đến 50%
              </span>
            </div>
            <h3 id="order-modal-title" className="text-base font-extrabold text-stone-900 font-heading tracking-tight">
              Xác Nhận Đặt Hàng Nhanh
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Success View */}
        {orderSuccess ? (
          <div className="p-6 overflow-y-auto text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-lg font-extrabold text-stone-900 font-heading">
                Đặt Hàng Thành Công!
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cảm ơn bạn <strong className="text-stone-900">{formData.fullName}</strong>! HAQ FOOD đã tiếp nhận đơn hàng của bạn.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl text-xs text-stone-700 space-y-2 text-left border border-stone-200/80">
              <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                <span className="text-stone-500">Combo đã chọn:</span>
                <span className="font-bold text-stone-900">{currentCombo.name}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                <span className="text-stone-500">Người nhận:</span>
                <span className="font-semibold text-stone-900">{formData.fullName} — {formData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                <span className="text-stone-500">Địa chỉ giao:</span>
                <span className="font-medium text-stone-900 truncate max-w-[210px]">{formData.address}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                <span className="text-stone-500">Phí giao hàng:</span>
                <span className={currentCombo.isFreeship ? 'text-emerald-700 font-bold' : 'text-stone-700 font-semibold'}>
                  {currentCombo.isFreeship ? 'FREESHIP 0đ' : '25.000₫'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="font-bold text-stone-900">Tổng thanh toán COD:</span>
                <span className="text-base font-extrabold text-orange-600 font-heading">
                  {currentCombo.isFreeship ? currentCombo.priceText : `${(currentCombo.priceNum + (currentCombo.shippingFee || 25000)).toLocaleString('vi-VN')}₫`}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-orange-600 text-base">support_agent</span>
              <span>Chuyên viên kho vận sẽ gọi xác nhận trong vòng <strong>5 phút</strong>.</span>
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Hoàn Tất & Tiếp Tục Xem Trang
            </button>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
            {/* Scrollable Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
              
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-200 animate-fadeIn">
                  <span className="material-symbols-outlined text-base shrink-0 text-red-600">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Combo Selector Cards */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold text-stone-700 uppercase tracking-wider">
                    1. Chọn Gói Ưu Đãi:
                  </span>
                  <span className="text-[10px] text-orange-600 font-bold">
                    {currentCombo.savingsText || 'Freeship toàn quốc'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CRO_DATA.combos.map((c) => {
                    const isChecked = combo === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleComboChange(c.id)}
                        className={`relative py-2 px-1 rounded-2xl text-center transition-all flex flex-col items-center justify-center border cursor-pointer ${
                          isChecked
                            ? 'bg-gradient-to-b from-orange-500/[0.08] to-amber-500/[0.03] border-orange-500 ring-1 ring-orange-500/30 shadow-sm'
                            : 'bg-stone-50/70 border-stone-200/80 hover:bg-stone-100/80 text-stone-700'
                        }`}
                      >
                        {c.isPopular && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow whitespace-nowrap">
                            HOT
                          </span>
                        )}
                        <span className={`text-[10.5px] font-bold leading-tight truncate max-w-full px-0.5 ${isChecked ? 'text-orange-700' : 'text-stone-700'}`}>
                          {c.name.replace('Combo ', '')}
                        </span>
                        <span className={`text-xs font-black font-heading mt-0.5 leading-tight ${isChecked ? 'text-orange-600' : 'text-stone-900'}`}>
                          {c.priceText.replace('₫', '')}
                        </span>
                        <span className={`text-[9px] font-semibold mt-0.5 leading-tight ${isChecked ? 'text-orange-600' : c.isFreeship ? 'text-emerald-600' : 'text-stone-400'}`}>
                          {c.isFreeship ? 'Freeship' : '+25k ship'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Combo Benefit Banner (Highlighted Gift Strip) */}
                <div className="mt-2 p-2.5 bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 rounded-2xl border border-amber-200/80 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-sm">redeem</span>
                    </div>
                    <span className="text-stone-800 text-[11px] sm:text-xs truncate font-medium">
                      <strong>{currentCombo.name}:</strong> {currentCombo.subName || 'Đầy đủ ưu đãi'}
                    </span>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="font-extrabold text-orange-600 text-xs sm:text-sm font-heading block leading-none">
                      {currentCombo.priceText}
                    </span>
                    <span className="text-[9px] text-stone-400 line-through">
                      {currentCombo.originalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2: Customer Delivery Inputs with Crisp Icons */}
              <div className="space-y-2 pt-0.5">
                <span className="text-[11px] font-extrabold text-stone-700 uppercase tracking-wider block">
                  2. Thông Tin Nhận Hàng:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-2.5 text-stone-400 text-base pointer-events-none">
                      person
                    </span>
                    <input
                      type="text"
                      required
                      aria-label="Họ và tên người nhận"
                      placeholder="Họ và tên *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 text-stone-900 placeholder:text-stone-400 transition-all font-medium"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-2.5 text-stone-400 text-base pointer-events-none">
                      call
                    </span>
                    <input
                      type="tel"
                      required
                      aria-label="Số điện thoại nhận hàng"
                      placeholder="Số điện thoại *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 text-stone-900 placeholder:text-stone-400 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-2.5 text-stone-400 text-base pointer-events-none">
                    location_on
                  </span>
                  <input
                    type="text"
                    required
                    aria-label="Địa chỉ chi tiết nhận hàng"
                    placeholder="Địa chỉ nhận hàng (Số nhà, đường, phường/xã, quận, tỉnh) *"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 text-stone-900 placeholder:text-stone-400 transition-all font-medium"
                  />
                </div>

                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-2.5 text-stone-400 text-base pointer-events-none">
                    edit_note
                  </span>
                  <input
                    type="text"
                    aria-label="Ghi chú đơn hàng"
                    placeholder="Ghi chú đơn hàng (Tùy chọn: mức cay, chia vị, giờ nhận...)"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 text-stone-900 placeholder:text-stone-400 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Trust Badges (Modern 3 Pills) */}
              <div className="grid grid-cols-3 gap-1.5 pt-0.5 text-[10px] font-semibold text-stone-600">
                <div className="flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg bg-stone-50 border border-stone-200/70">
                  <span className="material-symbols-outlined text-orange-600 text-xs">verified</span>
                  <span className="truncate">Đồng kiểm COD</span>
                </div>
                <div className="flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg bg-stone-50 border border-stone-200/70">
                  <span className="material-symbols-outlined text-orange-600 text-xs">local_shipping</span>
                  <span className="truncate">Giao 1 - 3 ngày</span>
                </div>
                <div className="flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg bg-stone-50 border border-stone-200/70">
                  <span className="material-symbols-outlined text-orange-600 text-xs">published_with_changes</span>
                  <span className="truncate">Đổi trả nếu lỗi</span>
                </div>
              </div>
            </div>

            {/* 3. Sticky Bottom Action Footer (Always Visible, Sleek & Premium) */}
            <div className="p-3.5 sm:px-5 bg-white border-t border-stone-100 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] shrink-0">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_6px_20px_-3px_rgba(249,115,22,0.45)] hover:shadow-[0_8px_24px_-3px_rgba(249,115,22,0.55)] flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    <span>ĐANG GỬI ĐƠN HÀNG...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">bolt</span>
                    <span>XÁC NHẬN ĐẶT {currentCombo.name.toUpperCase()} • {currentCombo.priceText}</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-stone-400 text-center mt-1.5 font-medium flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-xs text-stone-400">lock</span>
                <span>Bảo mật thông tin • Mở bóc kiểm tra trước khi thanh toán</span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
