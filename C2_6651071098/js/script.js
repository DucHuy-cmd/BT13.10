/**
 * BÀI 2: LANDING PAGE TIỆM BÁNH NGỌT VỚI TAILWIND CSS
 * File: js/script.js
 * 
 * Minh chứng tư duy:
 * Khác với Bootstrap có sẵn các plugin JavaScript (như bootstrap.bundle.js tự động xử lý data-bs-toggle="collapse"),
 * Tailwind CSS hoàn toàn là một framework CSS utility-first, không kèm theo bất kỳ JavaScript nào.
 * Do đó, lập trình viên cần tự viết JavaScript để điều khiển các tương tác giao diện như:
 * 1. Đóng/mở mobile navbar (toggle class hidden / flex)
 * 2. Tương tác form đặt bánh và phản hồi người dùng
 * 3. Hiệu ứng cuộn trang mượt mà & nút quay lại đầu trang
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. XỬ LÝ SỰ KIỆN TOGGLE MOBILE MENU
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      // Toggle giữa class hidden và flex
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Tự động đóng menu khi người dùng bấm vào một mục điều hướng
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 2. XỬ LÝ FORM ĐẶT BÁNH THEO YÊU CẦU (ASIDE FORM)
  // ==========================================
  const orderForm = document.getElementById('bakery-order-form');
  const orderSuccessAlert = document.getElementById('order-success-alert');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const customerName = document.getElementById('customer-name')?.value || 'Quý khách';
      const cakeType = document.getElementById('cake-select')?.value || 'Bánh theo yêu cầu';

      // Hiển thị thông báo đặt bánh thành công
      if (orderSuccessAlert) {
        orderSuccessAlert.innerHTML = `
          <div class="flex items-start gap-3">
            <svg class="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <p class="font-semibold text-emerald-800">Đặt bánh thành công!</p>
              <p class="text-sm text-emerald-700 mt-0.5">Cảm ơn <strong>${customerName}</strong>! Bếp Bánh sẽ liên hệ xác nhận đơn <em>"${cakeType}"</em> trong 15 phút tới.</p>
            </div>
          </div>
        `;
        orderSuccessAlert.classList.remove('hidden');

        // Tự ẩn sau 6 giây
        setTimeout(() => {
          orderSuccessAlert.classList.add('hidden');
        }, 6000);
      }

      // Reset form
      orderForm.reset();
    });
  }

  // ==========================================
  // 3. HIỆU ỨNG NÚT CUỘN LÊN ĐẦU TRANG (BACK TO TOP)
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hide');
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
        backToTopBtn.classList.add('hide');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
