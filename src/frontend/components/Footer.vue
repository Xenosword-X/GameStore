<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-dark text-white py-5">
    <div class="container">
      <div class="row">
        <!-- Logo + Info -->
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="mb-3">
            <img
              :src="logoWhiteSrc"
              alt="GameZone Logo"
              style="width: 300px; width: 200px"
            />
          </h5>
          <p class="mb-1">公司信箱：<a href="mailto:service@example.com">service@example.com</a></p>
          <p>電話：<a href="tel:0912345678">0912-345-678</a></p>
          <router-link to="/login" class="btn btn-outline-secondary">管理員登入</router-link>
        </div>
        <!-- 地圖區 -->
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="mb-3">我們的位置</h5>
          <div class="ratio ratio-4x3 rounded overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=台北市中正區北平西路3號&output=embed"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            >
            </iframe>
          </div>
          <p class="mt-2 text-white small">台北市中正區北平西路3號（台北車站）</p>
        </div>
        <!-- 訂閱欄位 -->
        <div class="col-md-4 d-flex flex-column justify-content-end">
          <div class="socialLink d-flex justify-content-md-end mb-3">
            <a href="https://www.facebook.com/"><i class="bi bi-facebook"></i></a>
            <a href="https://x.com/home"><i class="bi bi-twitter-x"></i></a>
            <a href="https://www.instagram.com/"><i class="bi bi-instagram"></i></a>
          </div>
          <p class="text-start text-md-end">© 練習用作品，不得轉載</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const logoWhiteSrc = new URL('@/assets/img/LOGO_white.png', import.meta.url).href
</script>

<style scoped>
.socialLink {
  gap: 30px;
}
.socialLink i {
  font-size: 1.25rem;
  color: #fff;
  transition: 0.3s;
}
p > a {
  color: #fff;
}
</style>
