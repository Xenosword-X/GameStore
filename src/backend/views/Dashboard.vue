<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Navbar />
  <div class="container-fluid mt-3 position-relative">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Navbar from '@/backend/components/BackNavbar.vue'

// router 實例
const router = useRouter()

// 登入驗證檢查
const checkLogin = async () => {
  // 取出 cookie 裡的 hexToken
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

  // 設定 axios 預設授權標頭
  axios.defaults.headers.common.Authorization = token

  // API 檢查登入狀態
  const api = `${import.meta.env.VITE_API}api/user/check`

  try {
    const res = await axios.post(api)
    if (!res.data.success) {
      router.push('/login')
    }
  } catch (error) {
    console.error('登入驗證失敗', error)
    alert('登入驗證失敗，請重新登入')
    router.push('/login')
  }
}

// 組件載入時執行登入驗證
onMounted(() => {
  checkLogin()
})
</script>
