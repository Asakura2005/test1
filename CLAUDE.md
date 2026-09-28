# Hướng Dẫn & Quy Tắc Dự Án - Bánh Tráng Cô Út Landing Page

## 1. Quy Tắc Quản Lý Git & Deploy (Bắt Buộc Tuyệt Đối)
- **Tuyệt đối KHÔNG tự ý push code lên GitHub / Remote:**
  - Nghiêm cấm tự ý chạy lệnh `git push` (hoặc `git push -f`, `git push origin ...`) dưới bất kỳ hình thức nào khi chưa có lệnh rõ ràng từ người dùng.
  - Chỉ được phép đẩy code lên GitHub khi người dùng ra lệnh trực tiếp và rõ ràng (ví dụ: "push", "deploy", "đẩy lên git", "đẩy lên github").
  - Mọi tác vụ lập trình, sửa lỗi, refactor, kiểm tra giao diện, build (`npm run build`) chỉ thực hiện tại máy local.
  - Sau khi hoàn tất công việc, chỉ báo cáo kết quả cho người dùng và chờ lệnh deploy/push nếu người dùng muốn phát hành.

## 2. Hồ Sơ Pháp Lý (LegalFlipbook & legalDocuments.js)
- **Tổng số trang chuẩn:** Chính xác 26 trang (13 cặp trang lật đối xứng 2 trang/mặt).
- **Tuyệt đối KHÔNG có trang chứng nhận F3 Food (Bắc Ninh):**
  - Trang F3 Food (`page-03.webp` cũ) là giấy chứng nhận của xưởng topping thịt khô bên ngoài, không phải thương hiệu Cô Út (Long An).
  - Đã loại bỏ vĩnh viễn khỏi danh sách `pages` trong `src/data/legalDocuments.js`.
  - Cặp trang 1-2 là 2 chứng nhận quốc tế chính chủ của Cô Út: **HACCP Codex 2020** và **ISO 22000:2018**.
  - Cặp trang 3-4 nối tiếp ngay bằng trọn bộ 2 phiếu kiểm nghiệm **VNTEST**.
  - Khi chỉnh sửa, cập nhật hoặc di chuyển `LegalFlipbook.jsx`, luôn duy trì danh sách 26 trang này, không bao giờ tự ý khôi phục trang F3 Food.
