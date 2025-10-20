<template>
  <h2 class="fw-bold mb-4 text-center title">熱門商品</h2>

  <div class="row g-4">
    <div class="col-md-4" v-for="product in filterProducts" :key="product.id">
      <div class="card h-100">
        <img :src="product.imageUrl" class="card-img-top" alt="..." />
        <div class="card-body d-flex flex-column justify-content-end">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text text-danger fw-bold">${{ product.price }}</p>
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="goToProduct(product.id)"
            >
              選購去
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/productStore'

// Pinia store
const productStore = useProductStore()
// reactive 狀態
const { products } = storeToRefs(productStore)
const filterProducts = ref([])

const router = useRouter()

// 隨機挑出三筆熱門商品
const pickHotSaleProducts = () => {
  const shuffled = [...products.value].sort(() => 0.5 - Math.random())
  filterProducts.value = shuffled.slice(0, 3)
}

// 前往商品詳情頁
const goToProduct = (id) => {
  router.push(`/product/${id}`)
}

// 初始化
onMounted(async () => {
  await productStore.getProducts()
  pickHotSaleProducts()
})
</script>

<style lang="scss" scoped>
.title {
  @include custom-title-style;
}
.card.h-100 {
  min-height: 500px;
}
.card-img-top {
  max-height: 400px;
  object-fit: cover;
  object-position: top;
}
</style>
