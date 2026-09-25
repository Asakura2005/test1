import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  FileText,
  Truck,
  Gift,
  Check,
  AlertCircle,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export default function OrderForm({ selectedPlanId, selectedRetailItem }) {
  const [orderType, setOrderType] = useState('combo'); // 'combo' | 'retail'
  const [selectedCombo, setSelectedCombo] = useState('family');
  const [quantity, setQuantity] = useState(1);
  const [addressTag, setAddressTag] = useState('Nhà riêng');
  
  // State mua lẻ 6 món (mỗi món lưu số lượng)
  const [retailQuantities, setRetailQuantities] = useState({
    'banh-cha': 0,
    'banh-trang-say': 0,
    'banh-dau-xanh': 0,
    'bap-rang-bo': 0,
    'thit-bo-kho': 0,
    'banh-sua-dua': 0
  });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const [errors, setErrors] = useState({});

  // Danh sách combo
  const combos = [
    {
      id: 'starter',
      name: 'Combo Ăn Thử - 3 Món',
      badge: 'Cá Nhân Trải Nghiệm',
      sub: 'Bánh Chả + Bánh Tráng Sấy + Bắp Nấm Caramel',
      priceText: '149.000đ',
      originalPrice: '175.000đ',
      basePrice: 149000,
      image: SITE_DATA.banners.catBanh,
      itemsCount: '3 món signature',
      gift: 'Tặng kèm tăm tiệt trùng & khăn ướt',
      shippingNote: 'Ship 25k (Mua 2 combo FREESHIP)',
      freeShipThreshold: 2
    },
    {
      id: 'family',
      name: 'Combo Gia Đình - 6 Món',
      badge: 'BÁN CHẠY NHẤT • TIẾT KIỆM 81K',
      sub: 'Trọn bộ 6 món mặn, ngọt, bùi, cay cho 3-5 người',
      priceText: '269.000đ',
      originalPrice: '350.000đ',
      savings: 'Tiết kiệm 81k',
      basePrice: 269000,
      image: SITE_DATA.banners.catBanhTrang,
      itemsCount: '6 món thượng hạng',
      gift: 'TẶNG 1 Gói Bánh Sữa Dừa Nướng (45k)',
      shippingNote: 'MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC',
      isPopular: true,
      freeShipThreshold: 1
    },
    {
      id: 'party',
      name: 'Combo Tiệc Khủng - 12 Món',
      badge: 'TIỆC CÔNG SỞ & NHẬU CHILL',
      sub: 'Đại tiệc ăn vặt rôm rả cho 8-15 người',
      priceText: '499.000đ',
      originalPrice: '660.000đ',
      savings: 'Tiết kiệm 161k',
      basePrice: 499000,
      image: SITE_DATA.banners.catAnKho,
      itemsCount: '12 món ăn vặt phủ phê',
      gift: 'TẶNG 2 Gói Bánh Sữa Dừa Nướng (90k)',
      shippingNote: 'MIỄN PHÍ GIAO HỎA TỐC',
      freeShipThreshold: 1
    },
    {
      id: 'enterprise',
      name: 'Đại Lý / Khách Sỉ (20+ Combo)',
      badge: 'GIÁ GỐC TẬN XƯỞNG',
      sub: 'Chiết khấu 25% - 45% dành cho tạp hóa & siêu thị',
      priceText: 'Chiết khấu tới 45%',
      basePrice: 0,
      isQuote: true,
      image: SITE_DATA.banners.catAnVat,
      itemsCount: 'Đơn sỉ số lượng lớn',
      gift: 'Tài trợ kệ trưng bày & biển hiệu đại lý',
      shippingNote: 'Giao xe tải tận kho toàn quốc',
      freeShipThreshold: 1
    }
  ];

  // Danh sách sản phẩm bán lẻ từng món
  const retailProducts = [
    {
      id: 'banh-cha',
      name: 'Bánh Chả Cổ Truyền Hà Nội',
      weight: 'Gói 150g',
      price: 45000,
      image: SITE_DATA.banners.catBanh,
      tag: 'Bán chạy nhất'
    },
    {
      id: 'banh-trang-say',
      name: 'Bánh Tráng Sấy HOKI Tôm Cay',
      weight: 'Gói 120g',
      price: 35000,
      image: SITE_DATA.banners.catBanhTrang,
      tag: 'Cay giòn'
    },
    {
      id: 'banh-dau-xanh',
      name: 'Bánh Đậu Xanh Tươi Thượng Hạng',
      weight: 'Hộp 180g (12 viên)',
      price: 45000,
      image: SITE_DATA.banners.catBanh,
      tag: 'Ngọt dịu'
    },
    {
      id: 'bap-rang-bo',
      name: 'Bắp Rang Bơ Nổ Phồng Caramel',
      weight: 'Hũ 150g',
      price: 45000,
      image: SITE_DATA.banners.catAnVat,
      tag: 'Béo thơm'
    },
    {
      id: 'thit-bo-kho',
      name: 'Thịt Bò Sấy Khô Sốt Cay Hảo Hạng',
      weight: 'Hộp 100g',
      price: 75000,
      image: SITE_DATA.banners.catAnKho,
      tag: 'Thịt bắp tươi'
    },
    {
      id: 'banh-sua-dua',
      name: 'Bánh Sữa Dừa Tươi Nướng Bến Tre',
      weight: 'Gói 160g',
      price: 45000,
      image: SITE_DATA.banners.catBanh,
      tag: 'Bùi béo'
    }
  ];

  // Đồng bộ khi bấm từ nút xem Combo
  useEffect(() => {
    if (selectedPlanId) {
      setOrderType('combo');
      setSelectedCombo(selectedPlanId);
    }
  }, [selectedPlanId]);

  // Đồng bộ khi bấm "Mua Lẻ" từ Thực Đơn món ăn
  useEffect(() => {
    if (selectedRetailItem) {
      setOrderType('retail');
      setRetailQuantities((prev) => ({
        ...prev,
        [selectedRetailItem]: Math.max(1, (prev[selectedRetailItem] || 0) + 1)
      }));
    }
  }, [selectedRetailItem]);

  // Xử lý tăng giảm số lượng mua lẻ
  const handleUpdateRetailQty = (productId, delta) => {
    setRetailQuantities((prev) => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  // Tính toán đơn hàng Combo
  const currentCombo = combos.find((c) => c.id === selectedCombo) || combos[1];
  const isEnterprise = currentCombo.id === 'enterprise';
  const comboSubtotal = isEnterprise ? 0 : currentCombo.basePrice * quantity;
  const isComboFreeship = isEnterprise || currentCombo.freeShipThreshold === 1 || quantity >= 2;
  const comboShippingFee = isEnterprise || isComboFreeship ? 0 : 25000;
  const comboGrandTotal = isEnterprise ? 'Liên hệ báo giá sỉ' : `${(comboSubtotal + comboShippingFee).toLocaleString('vi-VN')}đ`;

  // Tính toán đơn hàng Mua Lẻ
  const selectedRetailList = retailProducts.filter((p) => (retailQuantities[p.id] || 0) > 0);
  const totalRetailCount = Object.values(retailQuantities).reduce((a, b) => a + b, 0);
  const retailSubtotal = retailProducts.reduce(
    (sum, p) => sum + p.price * (retailQuantities[p.id] || 0),
    0
  );
  // Mua lẻ từ 250k hoặc từ 5 món là FREESHIP
  const isRetailFreeship = retailSubtotal >= 250000 || totalRetailCount >= 5;
  const retailShippingFee = totalRetailCount === 0 || isRetailFreeship ? 0 : 25000;
  const retailGrandTotal = `${(retailSubtotal + retailShippingFee).toLocaleString('vi-VN')}đ`;

  // Tổng hợp giá theo orderType hiện tại
  const isRetail = orderType === 'retail';
  const currentSubtotal = isRetail ? retailSubtotal : comboSubtotal;
  const currentShippingFee = isRetail ? retailShippingFee : comboShippingFee;
  const currentGrandTotal = isRetail ? retailGrandTotal : comboGrandTotal;

  // Kiểm tra số điện thoại hợp lệ theo chuẩn Việt Nam
  const cleanPhone = formData.phone.replace(/[\s.-]/g, '');
  const isPhoneValid = /^(0[35789])[0-9]{8}$/.test(cleanPhone) || /^(\+?84[35789])[0-9]{8}$/.test(cleanPhone);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (isRetail && totalRetailCount === 0) {
      newErrors.retail = 'Vui lòng chọn số lượng ít nhất 1 món ăn vặt để đặt hàng';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại nhận hàng';
    } else if (!isPhoneValid) {
      newErrors.phone = 'Số điện thoại gồm 10 chữ số (VD: 0912 345 678)';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ nhận hàng cụ thể';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setOrderSummary({
        orderCode: `HAQ-${Math.floor(100000 + Math.random() * 900000)}`,
        orderType: orderType,
        comboName: currentCombo.name,
        comboQuantity: quantity,
        retailItems: selectedRetailList.map((p) => ({
          name: p.name,
          qty: retailQuantities[p.id],
          linePrice: (p.price * retailQuantities[p.id]).toLocaleString('vi-VN') + 'đ'
        })),
        grandTotal: currentGrandTotal,
        customerName: formData.fullName,
        phone: formData.phone,
        address: `${formData.address} (${addressTag})`,
        note: formData.note
      });
    }, 600);
  };

  return (
    <section id="dat-hang" className="py-10 sm:py-14 bg-[#FAF9F8] border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 border border-red-200 text-xs sm:text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wider mb-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Đặt Hàng Nhanh 30 Giây</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900 tracking-tight">
            Đặt Mua Đồ Ăn Vặt HAQ Giao Tận Nơi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Hỗ trợ đặt theo Combo tiết kiệm hoặc Mua lẻ tự chọn từng món theo sở thích. Mở thùng nếm thử trước khi thanh toán (COD).
          </p>
        </div>

        {submitted ? (
          /* Màn hình đặt hàng thành công */
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 text-center shadow-xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#DC2626] border-2 border-red-200 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-[#DC2626] text-xs font-bold font-heading mb-2">
                ĐẶT HÀNG THÀNH CÔNG
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900">
                Cảm Ơn Bạn Đã Tin Chọn HAQ FOOD!
              </h3>
              <p className="mt-2 text-sm sm:text-base text-stone-600">
                Đơn hàng của bạn đã được chuyển tới bộ phận đóng gói tại xưởng Hà Nội. Nhân viên sẽ gọi điện thoại xác nhận trong ít phút.
              </p>
            </div>

            {orderSummary && (
              <div className="p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200 text-left text-sm sm:text-base space-y-3">
                <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                  <span className="text-stone-500 font-medium">Mã đơn hàng:</span>
                  <span className="text-[#DC2626] font-mono font-extrabold text-base sm:text-lg">
                    {orderSummary.orderCode}
                  </span>
                </div>
                
                {/* Thông tin sản phẩm đặt */}
                {orderSummary.orderType === 'combo' ? (
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-medium">Gói combo:</span>
                    <span className="text-stone-900 font-bold">{orderSummary.comboName} (x{orderSummary.comboQuantity})</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-stone-500 font-medium block mb-1.5">Món mua lẻ đã chọn:</span>
                    <div className="space-y-1 pl-3 border-l-2 border-red-300">
                      {orderSummary.retailItems.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-xs sm:text-sm">
                          <span className="text-stone-800 font-semibold">{it.name} x {it.qty}</span>
                          <span className="text-stone-600">{it.linePrice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Người nhận:</span>
                  <span className="text-stone-900 font-semibold">{orderSummary.customerName} - {orderSummary.phone}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-stone-500 font-medium shrink-0 mr-3">Địa chỉ giao:</span>
                  <span className="text-stone-800 text-right">{orderSummary.address}</span>
                </div>
                {orderSummary.note && (
                  <div className="flex justify-between items-start">
                    <span className="text-stone-500 font-medium shrink-0 mr-3">Ghi chú:</span>
                    <span className="text-stone-700 italic text-right">{orderSummary.note}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-stone-200">
                  <span className="text-stone-900 font-heading font-bold text-base">Tổng tiền thanh toán (COD):</span>
                  <span className="text-[#DC2626] font-heading font-black text-xl sm:text-2xl">
                    {orderSummary.grandTotal}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ fullName: '', phone: '', address: '', note: '' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-[#DC2626] font-heading font-bold text-sm sm:text-base border border-red-200 transition-colors shadow-sm cursor-pointer"
              >
                Đặt thêm đơn khác
              </button>
              <a
                href="#menu-an-vat"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-heading font-bold text-sm sm:text-base transition-colors shadow-sm"
              >
                Xem lại thực đơn
              </a>
            </div>
          </div>
        ) : (
          /* Bố Cục Đặt Hàng 2 Cột Chuyên Nghiệp */
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* CỘT TRÁI (7 cột trên PC): Chọn Cách Đặt + Món Ăn + Thông Tin Khách Hàng */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* KHỐI 1: CHỌN PHƯƠNG THỨC MUA HÀNG (COMBO HOẶC MUA LẺ TỰ CHỌN) */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#DC2626] text-white text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <h3 className="font-heading font-extrabold text-stone-900 text-base sm:text-lg">
                        Chọn Hình Thức Đặt Mua
                      </h3>
                    </div>
                  </div>

                  {/* 2 Tab chuyển đổi Combo vs Mua Lẻ */}
                  <div className="grid grid-cols-2 p-1.5 bg-stone-100 rounded-xl mb-4 gap-1">
                    <button
                      type="button"
                      onClick={() => setOrderType('combo')}
                      className={`py-2.5 px-2 rounded-lg text-xs sm:text-sm font-heading font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                        orderType === 'combo'
                          ? 'bg-[#DC2626] text-white shadow-sm'
                          : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span>Combo Tiết Kiệm</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('retail')}
                      className={`py-2.5 px-2 rounded-lg text-xs sm:text-sm font-heading font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                        orderType === 'retail'
                          ? 'bg-[#DC2626] text-white shadow-sm'
                          : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Mua Lẻ Từng Món</span>
                    </button>
                  </div>

                  {/* TAB 1: CHỌN GÓI COMBO */}
                  {orderType === 'combo' && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-3">
                        {combos.map((c) => {
                          const isSelected = selectedCombo === c.id;
                          return (
                            <div
                              key={c.id}
                              onClick={() => setSelectedCombo(c.id)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  setSelectedCombo(c.id);
                                }
                              }}
                              className={`relative p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                                isSelected
                                  ? 'bg-red-50/70 border-2 border-[#DC2626] shadow-md ring-1 ring-[#DC2626]/20'
                                  : 'bg-white border-stone-200 hover:border-red-300 hover:bg-stone-50/80'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span
                                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                    isSelected
                                      ? 'bg-[#DC2626] text-white'
                                      : 'bg-stone-100 text-stone-600'
                                  }`}
                                >
                                  {c.badge}
                                </span>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-1 transition-colors ${
                                    isSelected
                                      ? 'border-[#DC2626] bg-[#DC2626] text-white'
                                      : 'border-stone-300 bg-white'
                                  }`}
                                >
                                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                              </div>

                              <div className="mt-1">
                                <p className={`font-heading font-bold text-sm sm:text-base leading-tight ${
                                  isSelected ? 'text-[#DC2626]' : 'text-stone-900'
                                }`}>
                                  {c.name}
                                </p>
                                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                                  {c.sub}
                                </p>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-baseline justify-between">
                                <div className="flex items-baseline gap-1.5">
                                  <span className="font-heading font-black text-base sm:text-lg text-stone-900">
                                    {c.priceText}
                                  </span>
                                  {c.originalPrice && (
                                    <span className="text-xs text-stone-400 line-through">
                                      {c.originalPrice}
                                    </span>
                                  )}
                                </div>
                                {c.savings && (
                                  <span className="text-[11px] font-bold text-[#DC2626] bg-red-100 px-1.5 py-0.5 rounded">
                                    {c.savings}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Số lượng combo */}
                      {!isEnterprise && (
                        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                              Số Lượng Combo:
                            </span>
                            <p className="text-xs text-stone-500 mt-0.5">
                              {currentCombo.id === 'starter' && quantity === 1 ? (
                                <span className="text-amber-600 font-medium">
                                  Mẹo: Đặt từ 2 combo để được MIỄN PHÍ SHIP!
                                </span>
                              ) : (
                                <span className="text-[#DC2626] font-semibold">
                                  ✓ Áp dụng Freeship toàn quốc cho đơn hàng này
                                </span>
                              )}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                              className="w-11 h-11 rounded-xl bg-white hover:bg-red-50 border border-stone-300 hover:border-[#DC2626] text-stone-800 hover:text-[#DC2626] font-black text-xl flex items-center justify-center active:scale-95 shadow-sm transition-colors cursor-pointer"
                              aria-label="Giảm số lượng"
                            >
                              -
                            </button>
                            <span className="text-lg font-heading font-black text-stone-900 w-8 text-center">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => q + 1)}
                              className="w-11 h-11 rounded-xl bg-white hover:bg-red-50 border border-stone-300 hover:border-[#DC2626] text-stone-800 hover:text-[#DC2626] font-black text-xl flex items-center justify-center active:scale-95 shadow-sm transition-colors cursor-pointer"
                              aria-label="Tăng số lượng"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: MUA LẺ TỰ CHỌN TỪNG MÓN */}
                  {orderType === 'retail' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-center justify-between">
                        <span>
                          {isRetailFreeship ? (
                            <strong className="text-emerald-700 font-bold">✓ Đơn hàng của bạn đã đạt điều kiện MIỄN PHÍ GIAO HÀNG TOÀN QUỐC!</strong>
                          ) : (
                            <span>Mua từ <strong>250.000đ</strong> (hoặc từ 5 món) để được <strong>FREESHIP toàn quốc</strong> (Hiện thiếu: <strong>{(250000 - retailSubtotal).toLocaleString('vi-VN')}đ</strong>)</span>
                          )}
                        </span>
                        <span className="font-bold shrink-0 ml-2 bg-white px-2 py-1 rounded-lg border border-amber-200 text-xs text-stone-700">
                          Đã chọn: <strong className="text-[#DC2626]">{totalRetailCount} món</strong>
                        </span>
                      </div>

                      {errors.retail && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-bold">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.retail}
                        </p>
                      )}

                      {/* Danh sách 6 món mua lẻ */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        {retailProducts.map((p) => {
                          const count = retailQuantities[p.id] || 0;
                          return (
                            <div
                              key={p.id}
                              className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                                count > 0
                                  ? 'bg-red-50/50 border-2 border-[#DC2626] shadow-sm'
                                  : 'bg-white border-stone-200 hover:border-stone-300'
                              }`}
                            >
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-bold text-[#DC2626] uppercase block truncate">
                                  {p.tag}
                                </span>
                                <h4 className="font-heading font-bold text-stone-900 text-xs sm:text-sm truncate">
                                  {p.name}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="font-heading font-extrabold text-stone-900 text-sm sm:text-base">
                                    {p.price.toLocaleString('vi-VN')}đ
                                  </span>
                                  <span className="text-[11px] text-stone-400">/{p.weight}</span>
                                </div>

                                {/* Bộ tăng giảm số lượng mua lẻ */}
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateRetailQty(p.id, -1)}
                                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-red-100 text-stone-800 hover:text-[#DC2626] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                                  >
                                    -
                                  </button>
                                  <span className="font-heading font-black text-stone-900 text-sm w-6 text-center">
                                    {count}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateRetailQty(p.id, 1)}
                                    className="w-7 h-7 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-xs"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* KHỐI 2: KHU VỰC NHẬP THÔNG TIN KHÁCH HÀNG (TỐI GIẢN, KHÔNG CHỮ THỪA) */}
                <div className="bg-white rounded-2xl border-2 border-red-200/90 p-5 sm:p-7 shadow-md">
                  {/* Tiêu đề khu vực nhập thông tin */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#DC2626] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        2
                      </span>
                      <h3 className="font-heading font-extrabold text-stone-900 text-base sm:text-lg">
                        Thông Tin Nhận Hàng
                      </h3>
                    </div>
                    <div className="text-xs text-stone-400 font-medium">
                      (<span className="text-red-500 font-bold">*</span> Bắt buộc điền)
                    </div>
                  </div>

                  {/* Form Fields với Nhãn Rõ Ràng, Icon Trực Quan & Focus Nổi Bật */}
                  <div className="space-y-4 sm:space-y-4.5">
                    {/* Hàng 1: Họ tên & Số điện thoại */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Ô Họ và tên */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs sm:text-sm font-heading font-bold text-stone-800 mb-1.5"
                        >
                          Họ và tên người nhận <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            autoComplete="name"
                            placeholder="VD: Nguyễn Văn Nam"
                            className={`w-full h-12 sm:h-12.5 pl-10 sm:pl-11 pr-4 rounded-xl text-base text-stone-900 placeholder-stone-400 bg-stone-50 border transition-all focus:outline-none focus:bg-white focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 ${
                              errors.fullName
                                ? 'border-red-500 bg-red-50/30'
                                : 'border-stone-300 hover:border-stone-400'
                            }`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Ô Số điện thoại */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs sm:text-sm font-heading font-bold text-stone-800 mb-1.5"
                        >
                          Số điện thoại nhận hàng <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            inputMode="tel"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="VD: 0912 345 678"
                            className={`w-full h-12 sm:h-12.5 pl-10 sm:pl-11 pr-10 rounded-xl text-base text-stone-900 placeholder-stone-400 bg-stone-50 border transition-all focus:outline-none focus:bg-white focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 ${
                              errors.phone
                                ? 'border-red-500 bg-red-50/30'
                                : isPhoneValid
                                ? 'border-emerald-500 bg-emerald-50/20'
                                : 'border-stone-300 hover:border-stone-400'
                            }`}
                          />
                          {isPhoneValid && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600">
                              <Check className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Hàng 2: Địa chỉ giao hàng chi tiết */}
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-xs sm:text-sm font-heading font-bold text-stone-800 mb-1.5"
                      >
                        Địa chỉ giao hàng chi tiết <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <input
                          id="address"
                          type="text"
                          name="address"
                          autoComplete="street-address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Số nhà, ngõ/ngách, tên đường, phường/xã, quận/huyện, tỉnh/thành phố *"
                          className={`w-full h-12 sm:h-12.5 pl-10 sm:pl-11 pr-4 rounded-xl text-base text-stone-900 placeholder-stone-400 bg-stone-50 border transition-all focus:outline-none focus:bg-white focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 ${
                            errors.address
                              ? 'border-red-500 bg-red-50/30'
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        />
                      </div>

                      {/* Quick location tag chips */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-xs text-stone-500 font-medium mr-1">Giao đến:</span>
                        {['Nhà riêng', 'Văn phòng / Công ty', 'Phòng trọ / KTX'].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setAddressTag(tag)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              addressTag === tag
                                ? 'bg-[#DC2626] text-white shadow-xs'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      {errors.address ? (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {errors.address}
                        </p>
                      ) : (
                        <p className="text-[11px] text-stone-400 mt-1">
                          Shipper giao tận cửa toàn quốc (Phân loại: <strong className="text-stone-700">{addressTag}</strong>)
                        </p>
                      )}
                    </div>

                    {/* Hàng 3: Ghi chú đơn hàng (Tùy chọn) */}
                    <div>
                      <label
                        htmlFor="note"
                        className="block text-xs sm:text-sm font-heading font-bold text-stone-800 mb-1.5"
                      >
                        Ghi chú cho xưởng & shipper (Tùy chọn)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <input
                          id="note"
                          type="text"
                          name="note"
                          value={formData.note}
                          onChange={handleInputChange}
                          placeholder="VD: Giao giờ hành chính, gọi trước 15p, chia đôi phần bánh..."
                          className="w-full h-12 sm:h-12.5 pl-10 sm:pl-11 pr-4 rounded-xl text-base text-stone-900 placeholder-stone-400 bg-stone-50 border border-stone-300 hover:border-stone-400 transition-all focus:outline-none focus:bg-white focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI (5 cột trên PC): HỘP TÓM TẮT ĐƠN HÀNG STICKY */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xl lg:sticky lg:top-24 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <h3 className="font-heading font-extrabold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-[#DC2626]" />
                      <span>Tóm Tắt Đơn Hàng</span>
                    </h3>
                    <span className="text-xs font-bold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded">
                      Thanh toán COD
                    </span>
                  </div>

                  {/* THÔNG TIN MÓN ĐÃ CHỌN (COMBO HOẶC MUA LẺ) */}
                  {orderType === 'combo' ? (
                    /* Thẻ Combo */
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex gap-3 items-center">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-200 shrink-0 shadow-inner">
                          <img
                            src={currentCombo.image}
                            alt={currentCombo.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold text-[#DC2626] uppercase block">
                            {currentCombo.badge}
                          </span>
                          <h4 className="font-heading font-bold text-stone-900 text-sm sm:text-base leading-snug truncate">
                            {currentCombo.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1 text-xs text-stone-600">
                            <span>Số lượng: <strong className="text-stone-900 font-bold">{quantity} combo</strong></span>
                            <span className="font-heading font-extrabold text-stone-900 text-sm">
                              {currentCombo.priceText}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quà tặng kèm gói combo */}
                      <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 text-xs sm:text-sm text-stone-800 flex items-start gap-2.5">
                        <Gift className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#DC2626] block font-heading font-bold">
                            Quà tặng kèm theo gói:
                          </strong>
                          <span className="text-stone-700">{currentCombo.gift}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Thẻ Mua Lẻ Danh Sách Món */
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                        <span className="text-xs font-heading font-bold uppercase tracking-wider text-stone-500 block">
                          Các món mua lẻ đã chọn ({totalRetailCount} món):
                        </span>

                        {selectedRetailList.length === 0 ? (
                          <p className="text-xs text-stone-400 italic py-2 text-center">
                            Chưa chọn món nào. Bấm dấu (+) ở cột bên trái để chọn món yêu thích.
                          </p>
                        ) : (
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {selectedRetailList.map((p) => {
                              const qty = retailQuantities[p.id];
                              const lineTotal = (p.price * qty).toLocaleString('vi-VN') + 'đ';
                              return (
                                <div key={p.id} className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-stone-100 last:border-0">
                                  <div className="min-w-0 pr-2">
                                    <p className="font-semibold text-stone-900 truncate">{p.name}</p>
                                    <span className="text-stone-500 text-[11px]">{p.price.toLocaleString('vi-VN')}đ x {qty}</span>
                                  </div>
                                  <span className="font-bold text-[#DC2626] shrink-0">{lineTotal}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* BẢNG TÍNH TIỀN */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 border-t border-b border-stone-100 py-3.5">
                    <div className="flex justify-between">
                      <span>Tạm tính tiền hàng:</span>
                      <span className="font-semibold text-stone-900">
                        {currentSubtotal.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <Truck className="w-4 h-4 text-stone-400" />
                        Phí giao hàng:
                      </span>
                      <span className={currentShippingFee === 0 ? 'text-emerald-600 font-bold' : 'font-semibold text-stone-800'}>
                        {currentShippingFee === 0 ? 'MIỄN PHÍ VẬN CHUYỂN' : '25.000đ'}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                      <div>
                        <span className="font-heading font-black text-stone-900 text-sm sm:text-base block">
                          Tổng Tiền Thanh Toán:
                        </span>
                        <span className="text-[11px] text-stone-500 font-normal">
                          (Thanh toán tiền mặt khi nhận hàng - COD)
                        </span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-heading font-black text-[#DC2626]">
                        {currentGrandTotal}
                      </span>
                    </div>
                  </div>

                  {/* Nút bấm Đặt Hàng Chính */}
                  <button
                    type="submit"
                    disabled={submitting || (isRetail && totalRetailCount === 0)}
                    className="w-full py-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-black text-base sm:text-lg tracking-wide transition-all duration-200 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2.5 shadow-lg shadow-red-600/30 cursor-pointer"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Đang tạo đơn hàng...
                      </span>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>
                          {isEnterprise
                            ? 'Gửi Yêu Cầu Báo Giá Sỉ'
                            : isRetail
                            ? `Xác Nhận Đặt ${totalRetailCount} Món Lẻ`
                            : 'Xác Nhận Đặt Combo Ngay'}
                        </span>
                      </>
                    )}
                  </button>

                  {/* 4 Cam kết ngắn gọn */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-stone-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                      <span>Mở thùng nếm thử</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                      <span>Đổi trả 7 ngày</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                      <span>Chuẩn ISO 22000</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                      <span>Không dầu chiên lại</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
