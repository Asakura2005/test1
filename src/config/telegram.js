/**
 * CẤU HÌNH THÔNG BÁO ĐƠN HÀNG VỀ TELEGRAM
 * 
 * Cách lấy Bot Token và Chat ID (chỉ mất 1 phút):
 * 1. Tạo Bot: Vào Telegram tìm @BotFather -> gõ /newbot -> đặt tên bot -> BotFather sẽ gửi BOT_TOKEN
 * 2. Lấy Chat ID:
 *    - Nếu nhận tin nhắn riêng: Tìm @userinfobot trên Telegram -> bấm Start -> copy trường `Id`
 *    - Nếu nhận về Nhóm/Group: Thêm bot vào nhóm -> cấp quyền admin cho bot -> gửi 1 tin nhắn bất kỳ vào nhóm -> truy cập https://api.telegram.org/bot<BOT_TOKEN>/getUpdates để lấy ID của nhóm (thường bắt đầu bằng dấu trừ, ví dụ -100...)
 */

export const TELEGRAM_CONFIG = {
  // Token từ @BotFather: t.me/LandingCout_bot
  botToken:
    import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
    (typeof atob === 'function'
      ? atob('ODk0NjUxNzc5OTpBQUhVNUJkaGpzcExzRnhySjNPZ3VRcHFZNVBFeG55UDJWbw==')
      : '8946517799:AAHU5BdhjspLsFxrJ3OguQpqY5PExnyP2Vo'),

  // ID Nhóm Telegram "Thông Báo Landingpage"
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID || '-5403943040',

  // URL Webhook của Google Apps Script (tự động ghi Google Sheet + gửi tin nhắn có nút bấm)
  googleSheetWebhookUrl:
    import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL ||
    'https://script.google.com/macros/s/AKfycbxydtinrFUIyFYfToRNa3Wp7ztcnPh3pQeWfD0PQd1WFe0Nr2yRcVa4pXP0eMhg4A_4/exec',
};
