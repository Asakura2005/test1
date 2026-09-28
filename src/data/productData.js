/**
 * productData.js — Unified data source for the Stitch-design Shopee-style landing page
 * Single Source of Truth for all product, brand, and content data.
 */

// ============================================================
// IMAGE URLS (Stitch CDN)
// ============================================================
const IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1WNjM0Rv7opVI2iahq-UbUaIVjuaZxgP6tECVUB31QyNMAMFHs4H1hMIp2o3WDQRHH7CQj7Jl4OYL8ePQ7vee8ipi35CN1wcfCXMCe1E_gR4qK8btVuNXLk-FRYut_IQIgfbo6SmdNb-SuSN0RmoHYOzcPhF_JLIxvIQ6ICmCNH-VHnGI9sbdePvScsO6jQoQschO4MB1VQUctcFb8PHuRoF1cKU6LEN9vTbe0bq8Jua7BYZodfcv-th6Y',
  comboDaNhanCach: 'https://lh3.googleusercontent.com/aida/AEtjO1X6mnjyLyewOlFKITGyL3YGtTeoTCDKJSHcEwWN0Zfw-Gh7DE2ksV2kauoHHP6Bc3pWwlZoYhteO__7k56e9SEN_o1Y1okB0Hs6VpTVHnK4WS5b-R80LX90_XcuolJv3C9Ud3wcAffacPCp5iNznXg-ZjBRfoqYwv6PjXcumsQ6Nd4wlxkPjJ76pmSag3PwhQ6ieuzfTX-5CtR38Lp7kcpOJlEhQ7IFv2ZhdWKCoJQ5jKUTEXoCq3IiqZc',
  khoBo: 'https://lh3.googleusercontent.com/aida/AEtjO1UyYHZG-edsjSSo3L1-qi8-Difph6vKTUIiazqEkHacyffUh1TEzkd6eQ5EhJVCs_3IbEn7GuXg5xNsBvKM9qq8nOzUnxSUB2As1t_9BuFuU9O9px_ifDzGYe_6Lp7IBcCeC4V0jz4L3H-U98qbPhbnAE3vYurp1ETE8bh2-Sx2bdRFzwnYQYr9Uj1RMPOGZFx89VLdWhtnVBRug--N1849a4h_9Iwu5KFTX-3-FMO0J5Aiigb48w3JY0o',
  gaLaChanh: 'https://lh3.googleusercontent.com/aida/AEtjO1X3Pz4edbElzb5PtkVH16MDtP2QcKrDJjZiYOukMcMWTyPSMulc84eJxPNAo1Nq0RLYabgEFgefSCUdVYFXfX5n1iKPw-V5U701FeXKtIPxSoJmRfjVDkwPFFuoFaf5Gxj7fc1EQkDbGXte0aGJunQ8yVqWsdqSilh1oBNo_bsyzjW_z7ufqoaXiEacM_Xp9fkOFX8xEfKSxXghuzyBCvl7STxbmFmqgKTS90f7c9vpfBQ3gQ14RNMNng',
  khoMuc: 'https://lh3.googleusercontent.com/aida/AEtjO1Vl0JRbb_8aQhMMZfvBfcM7TOIcHQc2C6jeUrL-p68LU8NUv95tx7yXSoSytg6JyzFmPP3atgYvxcAmpbpYW40wrMt8DlG-g-V7Hffmi1hAOlJfzNt3Lz3WAeUjwX4eUl8wYhh_f5Oagdcm5g07dTYDWPgcz0o6G06rlxIIF19T9WkKygGihNpmdSfn2633eDM9GG3OTw1ePwhWeshjFbukeK8xqZbs-lPen1FEoDVbiUDrGv-ZAdqfP84',
  phoMai: 'https://lh3.googleusercontent.com/aida/AEtjO1WhllwoTlroft6o4AU5W1l3bMPamKTzuFma6o0XEqJkZ1v2AWElQlBoAlpLNaJHynERBUyr4kzS1M6C-aqKv6n5u2S1qwnyM5vgkauG-tXXyfw2HpCBMiklUw_q-6p2BPlx19m9dE6a8wy85hFvLqsX6bGQFp9iz9V-QvyrRyZ-G1LKr5QBJEnh9cPDSyK5b4VrETXN-B71tL4FW-yc9dYNXxoD22HhyF3JDH68HWYXBWPitOzLlx9uIUk',
  thapCam: 'https://lh3.googleusercontent.com/aida/AEtjO1XFUhVyWujBbTARsMm7fm2GF3qc_9RpM870_vEqgNvswxBXCpgULBjOr6koWClB2kprWclgCJGXDevnpS0ZjE0t-Q2TAe4dvOjZNMYPXkJmHPsGt0RVsVZEAO2gmi7SrcdcC91TOCDsFRsuQUUc5clkvmeYVsBEKFxI2aHisDnxixl8ugAjgOfXqHmj5N5OuYaH9WAbLSNxYXNI3pJ2aNtKz0ZGdjVWQdQb801Aqjqt70Stx_hS7_cGiVU',
  giftPackage: 'https://lh3.googleusercontent.com/aida/AEtjO1W6YNAgDbgTgCiDJy-UHM872YKINHRoPrLN4XUli3dlXkjf5TbJNQTwntQ_KZCjK_XLs5CqKsaAw8INANhw-UGX6xFJnfBGZt68gbo__2SFx90_RPYMv2gvZ4L8LGsucdLS2lMCuFkHVkDjA4VhHMqhSuwH-z08JOXADfyihr6wXXoXdq-YAFdVHAK9USBC5GD1OTCRFMpHFOjLi6rNcPyfjtuO5Qi9MeN1aFvD0-Vv_sl0edaSLiqO8O4',
};

// ============================================================
// PRODUCT DATA
// ============================================================
export const PRODUCT_DATA = {
  // ─── Brand ─────────────────────────────────────
  brand: {
    name: 'HAQ FOOD',
    company: 'CÔNG TY CỔ PHẦN HAQ FOOD',
    companyShort: 'HAQ FOOD',
    tagline: 'Đặc sản Bánh Tráng HAQ FOOD — Trọn Bộ 5 Vị Đậm Đà Tây Ninh',
    hotline: '0969 508 208',
    hotlineTel: '0969508208',
    logo: IMAGES.logo,
    address: 'Xưởng SX & Kho: Khánh Hậu, Tây Ninh',
    branch: 'Chi nhánh: TP. Hồ Chí Minh',
  },

  // ─── Flash Sale ────────────────────────────────
  flashSale: {
    topBarText: 'FLASH SALE: GIẢM 50% + TẶNG SỐT & FREESHIP',
    sectionTitle: 'FLASH SALE',
    subtitle: 'ĐẶC SẢN TÂY NINH CHÍNH GỐC',
    timerLabel: 'KẾT THÚC TRONG',
    initialHours: 2,
    initialMinutes: 45,
    initialSeconds: 18,
  },

  // ─── Navigation ────────────────────────────────
  navLinks: [
    { label: 'Sản phẩm', href: '#combos' },
    { label: 'Ưu đãi', href: '#gifts' },
    { label: 'Đặt hàng', href: '#fast-order-form' },
    { label: 'Đánh giá', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ],

  // ─── Hero Product ──────────────────────────────
  hero: {
    title: 'Combo Bánh Tráng Cuộn HAQ FOOD — Trọn Bộ 5 Vị Độc Quyền Đặc Sản Tây Ninh (500g)',
    price: 149000,
    originalPrice: 250000,
    discountLabel: '-40%',
    soldPercent: 92,
    rating: 4.9,
    reviewCount: '4.820+',
    soldCount: '28.5k+',
    images: [
      { src: IMAGES.comboDaNhanCach, alt: 'Bánh Tráng Cô Út Combo Đa Nhân Cách Long An HAQ FOOD Bán Chạy Nhất', title: 'Combo Bánh Tráng Cô Út Đa Nhân Cách 5 vị 100g' },
      { src: IMAGES.khoBo, alt: 'Bánh Tráng Cuộn Khô Bò Cô Út', title: 'Cuộn Khô Bò Xé Sợi' },
      { src: IMAGES.gaLaChanh, alt: 'Bánh Tráng Cuộn Khô Gà Lá Chanh Cô Út', title: 'Cuộn Khô Gà Cay Thơm' },
      { src: IMAGES.khoMuc, alt: 'Bánh Tráng Cuộn Khô Mực Sa Tế Cô Út', title: 'Cuộn Khô Mực Mặn Mòi' },
      { src: IMAGES.phoMai, alt: 'Bánh Tráng Cuộn Phô Mai Béo Ngậy Cô Út', title: 'Cuộn Bột Phô Mai Thơm Béo' },
      { src: IMAGES.thapCam, alt: 'Bánh Tráng Cuộn Thập Cẩm Ruốc Hành Phi Cô Út', title: 'Cuộn Thập Cẩm Đậm Đà' },
    ],
    badges: [
      { text: 'BEST SELLER #1', icon: 'local_fire_department', bgClass: 'bg-primary text-on-primary' },
      { text: 'GIẢM 50% • TẶNG SỐT', icon: null, bgClass: 'bg-secondary text-on-secondary' },
    ],
  },

  // ─── Vouchers ──────────────────────────────────
  vouchers: [
    { label: 'GIẢM 15K', desc: 'Đơn từ 199K', actionLabel: 'LƯU MÃ', actionType: 'save', colorClass: 'text-primary' },
    { label: 'TẶNG BÁNH ME', desc: 'Tất cả combo', actionLabel: 'ĐÃ ÁP DỤNG', actionType: 'applied', colorClass: 'text-secondary' },
    { label: 'FREESHIP EXTRA', desc: 'Toàn quốc đơn hôm nay', actionLabel: null, actionType: 'info', colorClass: 'text-tertiary', icon: 'local_shipping' },
  ],

  // ─── Weight Variants → COMBO PRODUCTS ──────
  variants: [
    {
      id: 'combo_tiet_kiem',
      label: 'Combo Tiết Kiệm',
      badge: 'Gói Trải Nghiệm',
      subName: '2 Vị Bánh Tráng (400g) + Tặng Sốt Me',
      image: IMAGES.khoBo,
      price: 99000,
      originalPrice: 200000,
      discountText: '-50%',
      shippingText: '+ 25.000đ ship ưu đãi',
      shippingFee: 25000,
      isFreeship: false,
      isPopular: false,
      features: [
        { text: '02 vị bánh tráng bất kì (400g)', bold: true },
        { text: 'Tùy chọn: Cuộn thập cẩm, phô mai...' },
        { text: 'TẶNG 01 bịch bánh tráng trộn sốt me 100g', gift: true },
        { text: 'Đóng gói hút chân không / túi zip sạch' },
      ],
    },
    {
      id: 'combo_da_nhan_cach',
      label: 'Combo Đa Nhân Cách',
      badge: 'Thử Đủ 5 Vị Cuộn',
      subName: 'Trọn Bộ 5 Vị Cuộn (500g) + FREESHIP',
      image: IMAGES.comboDaNhanCach,
      price: 149000,
      originalPrice: 250000,
      discountText: '-40%',
      savingsText: 'Tiết kiệm 101.000đ • FREESHIP',
      shippingText: 'FREESHIP TOÀN QUỐC',
      shippingFee: 0,
      isFreeship: true,
      isPopular: true,
      popularTag: 'Bán Chạy Nhất 🔥',
      features: [
        { text: '01 Bánh tráng cuộn Khô Bò (100g)', bold: true },
        { text: '01 Bánh tráng cuộn Khô Gà (100g)', bold: true },
        { text: '01 Bánh tráng cuộn Khô Mực (100g)', bold: true },
        { text: '01 Bánh tráng cuộn Thập Cẩm (100g)', bold: true },
        { text: '01 Bánh tráng cuộn Phô Mai (100g)', bold: true },
        { text: 'Miễn phí giao hàng toàn quốc', ship: true },
      ],
    },
    {
      id: 'combo_dai_gion',
      label: 'Combo Dai & Giòn',
      badge: 'Dẻo Dai & Giòn Rụm',
      subName: '1 Dẻo Dai + 1 Giòn Rụm + 2 Món Quà',
      image: IMAGES.gaLaChanh,
      price: 149000,
      originalPrice: 250000,
      discountText: '-40%',
      savingsText: 'Tiết kiệm 101.000đ • FREESHIP',
      shippingText: 'FREESHIP TOÀN QUỐC',
      shippingFee: 0,
      isFreeship: true,
      isPopular: false,
      popularTag: 'Khuyên Dùng ⭐',
      features: [
        { text: '01 Bánh tráng vuông / cuộn dẻo dai (200g)', bold: true },
        { text: '01 Bánh tráng sấy giòn rụm (200g)', bold: true },
        { text: 'TẶNG 01 bánh tráng trộn sốt me (100g)', gift: true },
        { text: 'TẶNG 01 combo sốt chấm đặc biệt', gift: true },
        { text: 'Miễn phí giao hàng tận nơi toàn quốc', ship: true },
      ],
    },
    {
      id: 'combo_say_gion',
      label: 'Combo Sấy Giòn',
      badge: 'Cực Phẩm Giòn Rụm',
      subName: '2 Gói Sấy Giòn (400g) + 2 Món Quà',
      image: IMAGES.thapCam,
      price: 169000,
      originalPrice: 300000,
      discountText: '-44%',
      savingsText: 'Tiết kiệm 131.000đ • FREESHIP',
      shippingText: 'FREESHIP TOÀN QUỐC',
      shippingFee: 0,
      isFreeship: true,
      isPopular: false,
      popularTag: 'Đặc Biệt ✨',
      features: [
        { text: '02 Bánh tráng sấy giòn đậm vị (400g)', bold: true },
        { text: 'Gồm: Bánh tráng Bò & Gà sấy giòn thơm nức' },
        { text: 'TẶNG 01 bánh tráng trộn sốt me (100g)', gift: true },
        { text: 'TẶNG 01 combo sốt chấm đặc biệt', gift: true },
        { text: 'Miễn phí giao hàng toàn quốc', ship: true },
      ],
    },
  ],

  // ─── Gifts Section ─────────────────────────────
  gifts: {
    sectionTitle: 'Ưu Đãi & Quà Tặng Kèm Đơn Hàng Hôm Nay',
    image: IMAGES.giftPackage,
    imageAlt: 'Combo Quà Tặng Đặc Quyền Bánh Tráng Trộn Sốt Me Và Bộ Sốt Chấm HAQ Food',
    valueText: 'Trị giá quà tặng 65.000đ (Miễn phí 100%)',
    items: [
      {
        title: '01 Bịch Bánh Tráng Trộn Sốt Me Dẻo (100g)',
        desc: 'Bánh mềm dẻo phơi sương tẩm sốt me chua cay hảo hạng độc quyền Long An.',
      },
      {
        title: '01 Combo Sốt Chấm Đặc Biệt Cô Út',
        desc: 'Muối tôm Tây Ninh nhuyễn mịn, sốt bơ béo bùi, sa tế ớt rim mật mía thơm nồng.',
      },
    ],
    cta: 'Tự động cộng quà vào đơn khi hoàn tất thông tin bên dưới!',
  },

  // ─── Product Features ──────────────────────────
  features: {
    sectionTitle: '3 Bí Quyết Tạo Nên Vị Ngon Bánh Tráng Sấy Cô Út',
    sectionDesc: 'Công nghệ sấy nhiệt vô trùng chuẩn ISO 22000 — Giòn tan, đậm đà ăn là ghiền!',
    items: [
      {
        icon: 'local_fire_department',
        title: 'Sấy Giòn Rụm Rôm Rốp',
        tag: 'Sấy Nhiệt Không Dầu',
        desc: 'Bánh phồng giòn tan rôm rốp, không ngậm dầu chiên, không lo hôi dầu.',
        colorClass: 'bg-primary/10 text-primary',
      },
      {
        icon: 'soup_kitchen',
        title: 'Tẩm Ướp Gia Vị Đậm Đà',
        tag: 'Bí Quyết Gia Truyền',
        desc: 'Thấm đẫm sa tế tôm cay nồng, hành phi giòn tan và bơ ngậy thơm lừng.',
        colorClass: 'bg-secondary/10 text-secondary',
      },
      {
        icon: 'set_meal',
        title: 'Ngập Tràn Topping Thật',
        tag: 'Topping Loại 1',
        desc: 'Đầy đặn khô bò sợi, khô gà lá chanh, khô mực rim và bột phô mai béo.',
        colorClass: 'bg-golden-sesame/20 text-on-surface',
      },
    ],
  },

  // ─── Product Specs Table ───────────────────────
  specs: {
    sectionTitle: 'Bảng Thành Phần & Thông Tin Dinh Dưỡng Bánh Tráng HAQ FOOD',
    sectionDesc: 'Minh bạch nguồn gốc nguyên liệu đạt chuẩn vệ sinh an toàn thực phẩm.',
    rows: [
      { label: 'Thương hiệu', value: 'HAQ FOOD (Công Ty Cổ Phần HAQ FOOD)' },
      { label: 'Xuất xứ', value: 'Khánh Hậu, Tây Ninh, Việt Nam (Đặc sản chính gốc)' },
      { label: 'Khối lượng tịnh', value: 'Combo 500g (5 gói 100g) / Combo lớn 400g - 500g' },
      { label: 'Hạn sử dụng', value: '06 tháng trong túi zip hút chân không (30-45 ngày sau khi mở)', highlight: true },
      { label: 'Thành phần chính', value: 'Bánh tráng sấy giòn, khô bò cay, khô gà lá chanh, khô mực, bột phô mai, hành phi, dầu điều, muối tôm Tây Ninh, sốt me bí truyền' },
      { label: 'Hướng dẫn sử dụng', value: 'Dùng ngay trực tiếp khi mở túi zip, có thể chấm kèm sốt bơ trứng & sốt me tỏi ớt đính kèm' },
      { label: 'Bảo quản', value: 'Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp; kéo chặt miệng túi zip sau khi ăn' },
      { label: 'Chứng nhận chất lượng', value: 'HACCP CODEX 2020 & ISO 22000:2018', highlight: true },
    ],
  },

  // ─── Safety Section ────────────────────────────
  safety: {
    warningTitle: 'CẢNH BÁO SỨC KHỎE NGƯỜI TIÊU DÙNG',
    sectionTitle: 'Quy Trình Sản Xuất Đạt Chuẩn Vệ Sinh HACCP & ISO 22000',
    streetFood: {
      title: 'Bánh Tráng Vỉa Hè',
      icon: 'warning',
      items: [
        '85% nguy cơ nhiễm khuẩn E.Coli từ bụi đường.',
        'Dầu chiên hành tỏi cháy khét tái chế nhiều lần.',
        'Không nhãn mác, không hạn dùng rõ ràng.',
      ],
    },
    coUt: {
      title: 'Bánh Tráng Cô Út',
      icon: 'verified',
      items: [
        '100% gạo nguyên chất, sấy khép kín vô trùng.',
        'Dầu đậu nành nguyên chất, sốt me organic tươi.',
        'Chuẩn HACCP & ISO 22000, túi zip hút chân không.',
      ],
    },
    certifications: [
      { icon: 'health_and_safety', title: 'HACCP CODEX 2020', desc: 'Tiêu chuẩn kiểm soát quốc tế' },
      { icon: 'workspace_premium', title: 'ISO 22000:2018', desc: 'Hệ thống an toàn vệ sinh' },
      { icon: 'biotech', title: 'VNTEST Độc Lập', desc: 'Phiếu kiểm nghiệm định kỳ' },
      { icon: 'clean_hands', title: 'Tiệt Trùng Ozon', desc: 'Công nghệ sấy vô trùng' },
    ],
  },

  // ─── Reviews ───────────────────────────────────
  reviews: {
    sectionTitle: 'Khách Hàng Đánh Giá Bánh Tráng Sấy Cô Út',
    summaryText: '4.9/5 sao từ 4.820+ lượt mua trên toàn quốc',
    items: [
      {
        initials: 'TL',
        name: 'Thùy Linh (Văn phòng Cầu Giấy, Hà Nội)',
        comboName: 'Đã mua Combo Đa Nhân Cách',
        rating: 5,
        text: '"Bánh dẻo dai vừa phải không bị cứng hay dính răng. Mê nhất cuộn khô gà lá chanh với sốt me chua ngọt đậm đà, cả team văn phòng mình chia nhau ăn hết vèo trong 1 buổi chiều! Sẽ ủng hộ dài dài."',
        bgClass: 'bg-peach-tint',
        textClass: 'text-secondary',
      },
      {
        initials: 'HM',
        name: 'Hoàng Minh (Sinh viên TP.HCM)',
        comboName: 'Đã mua Combo Dai & Giòn',
        rating: 5,
        text: '"Đóng gói hút chân không nhìn sạch sẽ lịch sự hẳn so với mua ngoài vỉa hè. Bánh sấy giòn rụm chấm sốt bơ với sa tế chuẩn bài Tây Ninh. Giao nhanh 2 hôm là nhận được rồi, chuẩn 5 sao!"',
        bgClass: 'bg-surface-container',
        textClass: 'text-primary',
      },
    ],
  },

  // ─── FAQs ──────────────────────────────────────
  faqs: {
    sectionTitle: 'Câu Hỏi Thường Gặp Về Bánh Tráng Cô Út (FAQ)',
    sectionDesc: 'Giải đáp thắc mắc chi tiết để bạn hoàn toàn an tâm thưởng thức',
    items: [
      {
        question: 'Bánh tráng Cô Út bảo quản được trong bao lâu?',
        answer: 'Tất cả sản phẩm bánh tráng HAQ Food đều có hạn sử dụng 06 tháng kể từ ngày sản xuất nhờ quy trình sấy vô trùng và túi zip cao cấp hút ẩm. Sau khi mở túi, bạn có thể thưởng thức ngon nhất trong vòng 7 - 10 ngày, bảo quản nơi thoáng mát hoặc bọc kín sau khi dùng.',
      },
      {
        question: 'Tôi có được kiểm tra bánh tráng trước khi trả tiền?',
        answer: 'Chắc chắn có! HAQ Food áp dụng chính sách ĐỒNG KIỂM 100% toàn quốc. Bạn được mở thùng hàng kiểm tra đúng số lượng combo và quà tặng đính kèm trước khi thanh toán tiền mặt cho nhân viên giao hàng.',
      },
      {
        question: 'Chính sách đổi trả nếu bánh bị lỗi hay bể vỡ?',
        answer: 'Nếu sản phẩm có bất kỳ lỗi sản xuất, rách túi khí hay móp méo trong vận chuyển, chúng tôi cam kết Đổi mới 1 - 1 miễn phí 100% trong 7 ngày hoặc hoàn tiền ngay lập tức qua hotline 0969 508 208.',
      },
      {
        question: 'Bánh tráng có bị cay nồng quá không? Trẻ em ăn được không?',
        answer: 'Độ cay của bánh tráng HAQ Food ở mức vừa phải, dễ ăn. Đặc biệt vị Bánh tráng cuộn Phô mai và sốt bơ béo hoàn toàn không cay, rất phù hợp cho trẻ em và người không thích ăn cay.',
      },
    ],
    ctaTitle: 'Thèm Bánh Tráng Chuẩn Vị?',
    ctaDesc: 'Ưu đãi giảm 50% chỉ còn hôm nay',
    ctaButton: 'Đặt Ngay',
  },

  // ─── Order Form ────────────────────────────────
  orderForm: {
    badge: 'ĐIỀN THÔNG TIN NHẬN HÀNG NHANH',
    title: 'Đặt Hàng Nhanh - Giao Tận Nơi & Kiểm Tra Hàng Trước Khi Thanh Toán (COD)',
    subtitle: 'Freeship toàn quốc • Cam kết không ngon hoàn tiền 100% trong 7 ngày',
    defaultComboTitle: 'Combo Đa Nhân Cách',
    securityNote: 'Bảo mật thông tin 100% • Nhân viên gọi xác nhận trong 5 phút',
    submitText: '🚀 XÁC NHẬN ĐẶT HÀNG NGAY',
    paymentMethods: [
      {
        value: 'COD',
        label: 'Thanh toán khi nhận hàng (COD)',
        desc: 'Được kiểm tra bánh tráng trước khi trả tiền',
        icon: 'payments',
        default: true,
      },
      {
        value: 'VietQR',
        label: 'Chuyển khoản nhanh VietQR',
        desc: 'Xác nhận đơn ngay, ưu tiên đóng gói giao sớm',
        icon: 'qr_code_2',
        default: false,
      },
    ],
  },

  // ─── Footer ────────────────────────────────────
  footer: {
    copyright: `© ${new Date().getFullYear()} HAQ FOOD. Đặc sản Bánh Tráng HAQ FOOD Tây Ninh chính gốc. Giữ toàn quyền thương hiệu.`,
    badges: [
      { icon: 'verified', text: 'HACCP Codex 2020' },
      { icon: 'verified_user', text: 'ISO 22000:2018' },
      { icon: 'star', text: '100.000+ Khách Tin Dùng', special: true },
    ],
    contacts: [
      { icon: 'phone_iphone', text: 'Hotline:', linkText: '0969 508 208', href: 'tel:0969508208' },
      { icon: 'location_on', text: 'Xưởng SX & Kho: Khánh Hậu, Tây Ninh | Chi nhánh: TP. Hồ Chí Minh' },
      { icon: 'assignment_return', text: 'Đổi trả miễn phí 100% trong 7 ngày' },
      { icon: 'payments', text: 'COD toàn quốc | Kiểm hàng trước thanh toán' },
    ],
  },

  // ─── Sticky Bottom Bar ─────────────────────────
  stickyBar: {
    priceLabel: 'Giá ưu đãi:',
    ctaText: 'Mua Ngay',
    ctaIcon: 'shopping_cart_checkout',
  },
};

// ─── Helper: Format Vietnamese Currency ──────────
export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}
