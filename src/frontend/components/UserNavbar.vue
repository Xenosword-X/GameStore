<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-0 sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold text-primary logo-link" to="/">
        <img
          :src="require('@/assets/LOGO.svg')"
          alt="GameZone Logo"
          class="img-fluid"
          style="width: auto; height: 50px"
        />
      </router-link>
      <!-- 手機版漢堡選單按鈕 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        ref="navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 導覽項目靠右 -->
      <div
        class="collapse navbar-collapse justify-content-end align-items-center"
        id="navbarNav"
        ref="navbarNav"
      >
        <ul class="navbar-nav align-items-center">
          <li class="nav-item mx-2">
            <router-link to="/customize/CInfo" class="nav-link px-2" @click="collapseNavbar">
              客製服務 <i class="bi bi-wrench-adjustable"></i>
            </router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link to="/questions" class="nav-link px-2" @click="collapseNavbar">
              問答抽獎 <i class="bi bi-question-circle"></i>
            </router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link to="/cart" class="nav-link px-2" @click="collapseNavbar">
              遊戲商城 <i class="bi bi-bag"></i>
            </router-link>
          </li>
          <li class="nav-item mx-2 position-relative">
            <button
              class="btn btn-link position-relative p-0 border-0"
              type="button"
              data-bs-toggle="offcanvas"
              @click="collapseNavbar"
              data-bs-target="#cartOffcanvas"
              aria-controls="cartOffcanvas"
            >
              <i class="bi bi-cart3 fs-4"></i>
              <span
                class="badge rounded-circle position-absolute bg-danger"
                v-if="cart.carts.length"
                style="
                  bottom: 0;
                  right: 0;
                  transform: translate(70%, 70%);
                  width: 1.2rem;
                  height: 1.2rem;
                  font-size: 0.75rem;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                {{ cart.carts.length }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import * as bootstrap from 'bootstrap'

// 取得購物車資料
const cartStore = useCartStore()
const cart = cartStore.cart

// Navbar DOM 參考
const navbarNav = ref(null)

// 關閉 Navbar 收合
const collapseNavbar = () => {
  const instance = bootstrap.Collapse.getInstance(navbarNav.value)
  if (instance) {
    instance.hide()
  }
}
</script>

<style scoped>
.logo-link {
  padding: 0;
}

.navbar-nav .nav-link {
  transition: color 0.2s;
}

.navbar-nav .nav-link:hover {
  color: white;
  background-color: #003971;
}

.navbar-nav .nav-link.active {
  color: white !important;
  background-color: #003971;
}
</style>
