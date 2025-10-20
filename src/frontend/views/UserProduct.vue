<template>
  <div class="main-section">
    <Loading :active="isLoading" />

    <div class="container pt-3">
      <!-- 麵包屑導航 -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/cart">購物車</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>

      <!-- 商品內容 -->
      <div class="row justify-content-center">
        <article class="col-md-6">
          <img :src="product.imageUrl" alt="" class="img-fluid mb-3" />
        </article>

        <div class="col-md-4">
          <!-- 商品說明 -->
          <div class="mb-3">
            <p class="text-muted h2">{{ product.title }}</p>
            <p class="mt-1">{{ product.content }}</p>
          </div>

          <!-- 價格 -->
          <div class="h5" v-if="!product.price">
            {{ $filters.currency(product.origin_price) }} 元
          </div>
          <del class="h6" v-if="product.price">
            原價 {{ $filters.currency(product.origin_price) }} 元
          </del>
          <div class="h5 text-danger" v-if="product.price">
            特價 {{ $filters.currency(product.price) }} 元
          </div>

          <hr />
          <p class="mb-3 fw-bold">付款方式: 信用卡</p>
          <p class="mb-1 fw-bold">運送方式：</p>
          <ul class="list-unstyled mb-3">
            <li>📦 7-11 門市取貨：<span class="text-muted">NT$60</span></li>
            <li>📦 全家 門市取貨：<span class="text-muted">NT$60</span></li>
            <li>🚚 宅配 / 快遞：<span class="text-muted">NT$100</span></li>
            <li>🏬 門市取貨：<span class="text-success">免費</span></li>
          </ul>
          <p class="text-success">滿 NT$2,000 享免運優惠</p>

          <hr />
          <button type="button" class="btn btn-outline-primary" @click="addToCart(product.id)">
            加到購物車 <i class="bi bi-bag-fill"></i>
          </button>
        </div>
      </div>

      <!-- 下方標籤區 -->
      <ProductTab :youtubeUrl="product.description" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { showToast } from '@/methods/Toast'
import ProductTab from '@/frontend/components/ProductTab.vue'

// 狀態
const product = ref({})
const isLoading = ref(false)
const route = useRoute()
const router = useRouter()

// 取得商品資料
const getProduct = async () => {
  const id = route.params.productId
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/product/${id}`

  isLoading.value = true
  try {
    const res = await axios.get(api)
    if (res.data.success) {
      product.value = res.data.product
    } else {
      showToast('error', '找不到商品資料')
    }
  } catch {
    showToast('error', '資料載入失敗')
  } finally {
    isLoading.value = false
  }
}

// 加入購物車
const addToCart = async (id, qty = 1) => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
  const data = { data: { product_id: id, qty } }

  isLoading.value = true
  try {
    const res = await axios.post(api, data)
    if (res.data.success) {
      showToast('success', '已加入購物車')
      router.push('/cart')
    }
  } catch {
    showToast('error', '資料新增失敗')
  } finally {
    isLoading.value = false
  }
}

// 初始化
onMounted(() => {
  getProduct()
})
</script>

<style lang="scss" scoped>
.main-section {
  @include background-color;
}
</style>
