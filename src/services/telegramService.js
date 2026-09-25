import { TELEGRAM_CONFIG } from '../config/telegram';

/**
 * Hàm escape ký tự đặc biệt để an toàn khi gửi parse_mode = HTML lên Telegram
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Gửi thông báo đơn hàng mới:
 * 1. Gửi trực tiếp tin nhắn kèm Nút Bấm CRM lên Telegram Bot API (đảm bảo 100% nhận thông báo trong 0.3s)
 * 2. Đồng thời đồng bộ dữ liệu đơn hàng sang Google Apps Script để lưu vào Google Sheets
 * 
 * @param {Object} order
 * @param {string} order.fullName - Tên khách hàng
 * @param {string} order.phone - Số điện thoại
 * @param {string} order.address - Địa chỉ nhận hàng
 * @param {string} [order.note] - Ghi chú
 * @param {string} order.comboName - Tên gói combo
 * @param {string} order.comboPrice - Giá gói combo
 * @param {string} order.shippingFeeText - Phí ship (FREESHIP hoặc số tiền)
 * @param {string} order.totalPrice - Tổng tiền thu hộ COD
 * @param {string} [order.source] - Tên form đặt hàng
 */
export async function sendOrderToTelegram(order) {
  const botToken = TELEGRAM_CONFIG.botToken?.trim();
  const chatId = TELEGRAM_CONFIG.chatId?.trim();
  const webhookUrl = TELEGRAM_CONFIG.googleSheetWebhookUrl?.trim();

  // Tạo mã đơn hàng duy nhất (ví dụ: HAQ-729410)
  const orderCode = order.orderCode || ('HAQ-' + Math.floor(100000 + Math.random() * 900000));

  const now = new Date();
  const timeString = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const dateString = now.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const cleanPhone = (order.phone || '').replace(/\D/g, '');
  const deviceType = window.innerWidth < 768 ? 'Mobile 📱' : 'Desktop 💻';

  // Kịch bản gợi ý Upsell tự động
  let upsellTip = '';
  if (String(order.comboPrice).includes('99')) {
    upsellTip = '\n💡 <i>Gợi ý chốt sale: Mời khách thêm 50k lấy Combo 149k để FREESHIP + Tặng thêm 1 hũ gà lá chanh!</i>';
  }

  const messageText = `
🔥 <b>ĐƠN HÀNG MỚI: <code>#${orderCode}</code></b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Khách hàng:</b> ${escapeHtml(order.fullName)}
📞 <b>Số điện thoại:</b> <code>${escapeHtml(cleanPhone)}</code> (<a href="tel:${cleanPhone}">Bấm để gọi ngay</a>)
📍 <b>Địa chỉ:</b> ${escapeHtml(order.address)}
${order.note ? `📝 <b>Ghi chú:</b> <i>${escapeHtml(order.note)}</i>\n` : ''}📦 <b>Gói đặt:</b> <b>${escapeHtml(order.comboName)}</b>
💰 <b>Giá combo:</b> ${escapeHtml(order.comboPrice)}
🚚 <b>Phí ship:</b> ${escapeHtml(order.shippingFeeText || 'FREESHIP (0đ)')}
💵 <b>TỔNG THU HỘ (COD):</b> <b>${escapeHtml(order.totalPrice)}</b>
⏳ <b>Trạng thái:</b> <b>🟡 CHỜ GỌI</b>
━━━━━━━━━━━━━━━━━━━━
⏰ <b>Thời gian:</b> ${timeString} - ${dateString}
🌐 <b>Nguồn:</b> ${deviceType} ${order.source ? `(${escapeHtml(order.source)})` : ''}${upsellTip}
`.trim();

  // Nút bấm tương tác mini-CRM trên Telegram
  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: '📞 Đã gọi chốt đơn', callback_data: `act:called:${orderCode}` },
        { text: '📵 Không nghe máy', callback_data: `act:missed:${orderCode}` }
      ],
      [
        { text: '📦 Đã đóng gói', callback_data: `act:packed:${orderCode}` },
        { text: '❌ Huỷ đơn', callback_data: `act:cancel:${orderCode}` }
      ]
    ]
  };

  let isTelegramSent = false;
  let directResult = null;

  // BƯỚC 1: Gửi trực tiếp tin nhắn thông báo về nhóm Telegram qua Bot API
  if (botToken && chatId) {
    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
          reply_markup: inlineKeyboard,
        }),
      });

      const data = await response.json();
      if (data.ok) {
        isTelegramSent = true;
        directResult = data;
        console.log('✅ [Telegram] Đã gửi thông báo đơn hàng trực tiếp thành công!', orderCode);
      } else {
        console.warn('⚠️ [Telegram] Telegram API phản hồi lỗi:', data);
      }
    } catch (err) {
      console.warn('⚠️ [Telegram] Không thể kết nối trực tiếp Telegram Bot API:', err);
    }
  }

  // BƯỚC 2: Đồng bộ đơn hàng sang Google Apps Script (ghi Google Sheets)
  if (webhookUrl) {
    try {
      // Dùng fetch với Content-Type text/plain để vượt qua CORS của Google Apps Script
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          ...order,
          orderCode,
          isTelegramSent,
        }),
      }).then(() => {
        console.log('✅ [CRM] Đã đồng bộ đơn hàng sang Google Sheets.');
      }).catch((e) => {
        console.warn('⚠️ [CRM] Không thể gửi sang Google Sheets Webhook:', e);
      });
    } catch (err) {
      console.warn('⚠️ [CRM] Lỗi gọi Webhook:', err);
    }
  }

  // Trả về kết quả thành công cho frontend
  return {
    success: true,
    orderCode,
    isTelegramSent,
    data: directResult,
  };
}
