# Quy Tắc Dự Án - Bánh Tráng Cô Út Landing Page

## 1. Hồ Sơ Pháp Lý (LegalFlipbook & legalDocuments.js)
- **Tổng số trang chuẩn:** Chính xác 26 trang (13 cặp trang lật đối xứng 2 trang/mặt).
- **Tuyệt đối KHÔNG có trang chứng nhận F3 Food (Bắc Ninh):**
  - Trang F3 Food (`page-03.webp` cũ) là giấy chứng nhận của xưởng topping thịt khô bên ngoài, không phải thương hiệu Cô Út (Long An).
  - Đã loại bỏ vĩnh viễn khỏi danh sách `pages` trong `src/data/legalDocuments.js`.
  - Cặp trang 1-2 là 2 chứng nhận quốc tế chính chủ của Cô Út: **HACCP Codex 2020** và **ISO 22000:2018**.
  - Cặp trang 3-4 nối tiếp ngay bằng trọn bộ 2 phiếu kiểm nghiệm **VNTEST**.
  - Khi chỉnh sửa, cập nhật hoặc di chuyển `LegalFlipbook.jsx`, luôn duy trì danh sách 26 trang này, không bao giờ tự ý khôi phục trang F3 Food.
