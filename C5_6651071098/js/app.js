/**
 * BÀI 5: SHOP PHỤ KIỆN ĐIỆN THOẠI MINI — GIỎ HÀNG ĐỘNG VỚI VUE.JS (CDN)
 * File: js/app.js
 * 
 * =========================================================================================
 * SO SÁNH VUE.JS REACTIVITY VS VANILLA JAVASCRIPT (THEO YÊU CẦU MỤC 11 CỦA ĐỀ BÀI):
 * 
 * "Nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự querySelector + cập nhật DOM thủ công — 
 * Vue tự động làm điều này nhờ reactivity."
 * 
 * Chi tiết:
 * - Trong Vanilla JavaScript: Khi thêm một sản phẩm, lập trình viên phải tự viết các đoạn mã
 *   document.querySelector('#cart-count').innerText = ..., document.querySelector('#cart-list').innerHTML = ...,
 *   và tính toán thủ công lại tổng tiền để gán vào giao diện. Nếu cấu trúc DOM thay đổi, code JS rất dễ bị vỡ (fragile).
 * - Trong Vue.js 3: Chúng ta chỉ quản lý dữ liệu (State) thuần túy trong data() như mảng `cart` và biến `tuKhoa`.
 *   Bất cứ khi nào mảng `cart` được push/splice, hoặc biến `tuKhoa` thay đổi qua v-model, hệ thống Phản Ứng
 *   (Reactivity System dựa trên JavaScript Proxy) của Vue sẽ tự động phát hiện và tính toán lại các Computed Property,
 *   đồng thời tự động render lại các vị trí tương ứng trên DOM một cách tức thời, chuẩn xác mà không cần bất kỳ dòng code DOM thủ công nào!
 * =========================================================================================
 */

const { createApp } = Vue;

const app = createApp({
  // =========================================================================
  // DATA: Trạng thái nguồn dữ liệu (Single Source of Truth) của ứng dụng
  // =========================================================================
  data() {
    return {
      // 1. Ô tìm kiếm phụ kiện (liên kết 2 chiều qua v-model)
      tuKhoa: '',

      // 2. Mảng giỏ hàng chứa các sản phẩm khách đã chọn
      cart: [],

      // 3. Thông báo vừa thêm sản phẩm (toast notification)
      thongBaoToast: {
        hienThi: false,
        noiDung: ''
      },

      // 4. Danh sách tối thiểu 8 sản phẩm phụ kiện điện thoại thực tế
      products: [
        {
          id: 1,
          ten: 'Ốp Lưng Magnetic Matte Blue',
          anh: '../images/case-blue.jpg',
          gia: 250000,
          moTa: 'Mặt lưng nhám mịn chống bám vân tay, tích hợp vòng nam châm MagSafe hít siêu chắc.',
          danhMuc: 'Ốp lưng',
          badge: 'Bán chạy'
        },
        {
          id: 2,
          ten: 'Ốp Lưng Trong Suốt Anti-Yellow',
          anh: '../images/case-clear.jpg',
          gia: 190000,
          moTa: 'Chất liệu Bayer PC quang học cao cấp không ố vàng, túi khí 4 góc chống sốc chuẩn quân đội.',
          danhMuc: 'Ốp lưng',
          badge: 'Mới về'
        },
        {
          id: 3,
          ten: 'Đế Sạc Không Dây Qi Siêu Mỏng 15W',
          anh: '../images/wireless-charger.jpg',
          gia: 390000,
          moTa: 'Vỏ hợp kim nhôm tản nhiệt thông minh, tự ngắt khi đầy pin, tương thích chuẩn Qi và MagSafe.',
          danhMuc: 'Bộ sạc',
          badge: 'Hot deal'
        },
        {
          id: 4,
          ten: 'Tai Nghe Không Dây TWS ANC Pro',
          anh: '../images/earbuds.jpg',
          gia: 690000,
          moTa: 'Chống ồn chủ động ANC 35dB, mic đàm thoại ENC lọc tạp âm, thời lượng pin 28h liên tục.',
          danhMuc: 'Tai nghe',
          badge: 'Giảm 20%'
        },
        {
          id: 5,
          ten: 'Tai Nghe Chụp Tai Hi-Res Bass',
          anh: '../images/headphones.jpg',
          gia: 950000,
          moTa: 'Âm thanh chất lượng cao Hi-Res Audio, màng loa 40mm âm trầm sống động, đệm tai da êm ái.',
          danhMuc: 'Tai nghe',
          badge: 'Cao cấp'
        },
        {
          id: 6,
          ten: 'Củ Sạc Nhanh 65W GaN III Fast Charger',
          anh: '../images/charger-gan.jpg',
          gia: 450000,
          moTa: 'Công nghệ bán dẫn GaN thế hệ mới, kích thước siêu nhỏ gọn, 3 cổng ra sạc được laptop & điện thoại.',
          danhMuc: 'Củ sạc',
          badge: 'Khuyên dùng'
        },
        {
          id: 7,
          ten: 'Cáp Sạc Nhanh Bọc Dù Type-C 100W',
          anh: '../images/cable.jpg',
          gia: 150000,
          moTa: 'Lớp dù bện bọc sợi nylon mật độ cao chống gãy rối, chip E-marker kiểm soát dòng điện ổn định.',
          danhMuc: 'Cáp sạc',
          badge: 'Bền bỉ'
        },
        {
          id: 8,
          ten: 'Pin Sạc Dự Phòng 20000mAh PD 22.5W',
          anh: '../images/powerbank.jpg',
          gia: 520000,
          moTa: 'Dung lượng khủng 20.000mAh chuẩn an toàn bay, màn hình LED hiển thị % pin trực quan.',
          danhMuc: 'Pin dự phòng',
          badge: 'Chính hãng'
        }
      ]
    };
  },

  // =========================================================================
  // COMPUTED PROPERTIES: Các giá trị phái sinh được Vue tự động cache và cập nhật
  // khi các dependencies (products, cart, tuKhoa) thay đổi
  // =========================================================================
  computed: {
    /**
     * Computed 1: cartCount
     * Mục đích: Quản lý tổng số lượng sản phẩm có trong giỏ hàng để hiển thị ở HEADER
     * và tiêu đề ASIDE. Cập nhật tức thời nhờ Reactivity!
     */
    cartCount() {
      return this.cart.reduce((total, item) => total + (item.soLuong || 1), 0);
    },

    /**
     * Computed 2: tongTien
     * Mục đích: Tự động tính tổng tiền thanh toán của toàn bộ giỏ hàng
     */
    tongTien() {
      return this.cart.reduce((total, item) => total + (item.gia * (item.soLuong || 1)), 0);
    },

    /**
     * Computed 3: tongTienFormat
     * Mục đích: Định dạng tiền tệ VND đẹp mắt theo chuẩn Việt Nam
     */
    tongTienFormat() {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.tongTien);
    },

    /**
     * Computed 4: danhSachLoc
     * Mục đích: Lọc danh sách sản phẩm theo từ khoá tìm kiếm `tuKhoa` (không phân biệt hoa/thường).
     * Thể hiện tinh thần cốt lõi: UI = function(Data). Gõ đến đâu danh sách tự động lọc đến đó!
     */
    danhSachLoc() {
      const keyword = this.tuKhoa.trim().toLowerCase();
      if (!keyword) {
        return this.products;
      }
      return this.products.filter(product => {
        return product.ten.toLowerCase().includes(keyword) ||
               product.moTa.toLowerCase().includes(keyword) ||
               product.danhMuc.toLowerCase().includes(keyword);
      });
    }
  },

  // =========================================================================
  // METHODS: Các hàm xử lý hành động người dùng (User Actions)
  // =========================================================================
  methods: {
    /**
     * Method 1: themVaoGio(sanPham)
     * Thêm 1 sản phẩm vào mảng cart:
     * - Nếu sản phẩm đã có trong giỏ: tăng số lượng (soLuong++)
     * - Nếu chưa có: đẩy sản phẩm mới vào giỏ với soLuong = 1
     * Ngay lập tức UI số lượng trên header & aside tự động cập nhật mà KHÔNG cần reload!
     */
    themVaoGio(sanPham) {
      const index = this.cart.findIndex(item => item.id === sanPham.id);
      if (index !== -1) {
        this.cart[index].soLuong += 1;
      } else {
        this.cart.push({
          ...sanPham,
          soLuong: 1
        });
      }

      // Hiển thị thông báo Toast nhanh
      this.hienThiToast(`Đã thêm "${sanPham.ten}" vào giỏ hàng!`);
    },

    /**
     * Method 2: xoaKhoiGio(index)
     * Xóa sản phẩm khỏi mảng cart tại vị trí `index`.
     * Khi gọi hàm này, mảng cart thay đổi độ dài, các computed cartCount và tongTien
     * ngay lập tức tính lại và cập nhật DOM tự động.
     */
    xoaKhoiGio(index) {
      if (index >= 0 && index < this.cart.length) {
        const itemBiXoa = this.cart[index];
        this.cart.splice(index, 1);
        this.hienThiToast(`Đã xóa "${itemBiXoa.ten}" khỏi giỏ hàng.`);
      }
    },

    /**
     * Method 3: tangSoLuong(item)
     */
    tangSoLuong(item) {
      item.soLuong += 1;
    },

    /**
     * Method 4: giamSoLuong(item, index)
     */
    giamSoLuong(item, index) {
      if (item.soLuong > 1) {
        item.soLuong -= 1;
      } else {
        this.xoaKhoiGio(index);
      }
    },

    /**
     * Method 5: xoaHetGioHang()
     */
    xoaHetGioHang() {
      if (this.cart.length > 0 && confirm('Bạn có chắc muốn dọn sạch giỏ hàng?')) {
        this.cart = [];
        this.hienThiToast('Đã dọn sạch giỏ hàng.');
      }
    },

    /**
     * Method 6: formatTien(soTien)
     * Hàm helper định dạng tiền tệ
     */
    formatTien(soTien) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(soTien);
    },

    /**
     * Method 7: hienThiToast(msg)
     */
    hienThiToast(msg) {
      this.thongBaoToast.noiDung = msg;
      this.thongBaoToast.hienThi = true;
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        this.thongBaoToast.hienThi = false;
      }, 2500);
    },

    /**
     * Method 8: thanhToan()
     */
    thanhToan() {
      if (this.cart.length === 0) return;
      alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\nTổng giá trị thanh toán: ${this.tongTienFormat}\nCảm ơn bạn đã mua hàng tại TechStore!`);
      this.cart = [];
    }
  }
});

// Gắn (mount) ứng dụng Vue vào phần tử HTML có id="app"
app.mount('#app');
