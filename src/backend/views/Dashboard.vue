<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Navbar />
  <div class="container-fluid mt-3 position-relative">
    <div v-if="isAuthReady">
      <router-view />
    </div>
    <div v-else class="d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">載入中...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Navbar from '@/backend/components/BackNavbar.vue'

const router = useRouter()
const isAuthReady = ref(false)

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

const checkLogin = async () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  setAuthHeader(token)

  const api = `${import.meta.env.VITE_API}api/user/check`

  try {
    const res = await axios.post(api)
    if (!res.data.success) {
      router.push('/login')
      return
    }
    isAuthReady.value = true
  } catch (error) {
    console.error('登入驗證失敗', error)
    alert('登入驗證失敗，請重新登入')
    router.push('/login')
  }
}

onMounted(() => {
  checkLogin()
})
</script>
