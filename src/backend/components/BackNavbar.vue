<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/dashboard/products" class="navbar-brand fw-bold">後台管理</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard/products" class="nav-link">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/articles" class="nav-link">消息</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { showToast } from '@/utils/toast'

const router = useRouter()

const clearAuth = () => {
  document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  delete axios.defaults.headers.common.Authorization
}

const logout = async () => {
  const api = `${import.meta.env.VITE_API}logout`
  try {
    const res = await axios.post(api)
    if (!res.data.success) throw new Error(res.data.message || '登出失敗')
    clearAuth()
    showToast('success', '已成功登出')
    router.push('/login')
  } catch (err) {
    console.error('API 錯誤', err)
    clearAuth()
    showToast('error', '登出失敗，請重新登入')
    router.push('/login')
  }
}
</script>
