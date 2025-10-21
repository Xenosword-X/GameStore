<template>
  <div class="main-section">
    <Loading :active="isLoading" />
    <div class="container">
      <div class="row pt-4">
        <div class="col-md-12">
          <!-- 商品分類選單 -->
          <select class="form-select mb-3" v-model="selectedCategory">
            <option value="" disabled>請選擇類別</option>
            <option value="">全部</option>
            <option value="主機">主機</option>
            <option value="遊戲">遊戲</option>
            <option value="配件">配件</option>
          </select>

          <!-- 商品卡片區 -->
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="item in paginatedProducts" :key="item.id">
              <div class="card h-100 product-card" @click="getProduct(item.id)">
                <div
                  class="card-img-top"
                  :style="{
                    height: '400px',
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                  }"
                ></div>
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text">
                    <span v-if="!item.price">{{ item.origin_price }} 元</span>
                    <span v-else>
                      <del class="text-muted">
                        原價 {{ $filters.currency(item.origin_price) }} 元 </del
                      ><br />
                      <strong class="text-danger">
                        特價 {{ $filters.currency(item.price) }} 元
                      </strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 分頁 -->
          <nav class="mt-4">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="prevPage">上一頁</a>
              </li>

              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" href="#" @click.prevent="setPage(page)">
                  {{ page }}
                </a>
              </li>

              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="nextPage">下一頁</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useStatusStore } from '@/stores/statusStore'

// router 實例
const router = useRouter()

// store 實例
const productStore = useProductStore()
const cartStore = useCartStore()
const statusStore = useStatusStore()

// 本地狀態
const selectedCategory = ref('')
const currentPage = ref(1)
const perPage = ref(9)

// Pinia 狀態
const products = computed(() => productStore.products)
const isLoading = computed(() => statusStore.isLoading)

// 商品篩選
const filteredProducts = computed(() => {
  if (selectedCategory.value) {
    return products.value.filter((p) => p.category === selectedCategory.value)
  }
  return products.value
})

// 分頁邏輯
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredProducts.value.slice(start, end)
})

watch(selectedCategory, () => {
  currentPage.value = 1
})

watch(filteredProducts, () => {
  const total = totalPages.value
  if (total === 0) {
    currentPage.value = 1
  } else if (currentPage.value > total) {
    currentPage.value = total
  }
})

// 分頁切換
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const setPage = (page) => {
  currentPage.value = page
}

// 導向商品詳細頁
const getProduct = (id) => {
  router.push(`/product/${id}`)
}

// 初始化資料
onMounted(() => {
  productStore.getProducts()
  cartStore.getCart()
})
</script>

<style lang="scss" scoped>
.main-section {
  @include background-color;
}

.product-card {
  cursor: pointer;
  transition:
    box-shadow 0.3s,
    transform 0.2s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .card-body {
    position: relative;
    z-index: 1;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.08), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }
  }

  &:hover .card-body::before {
    opacity: 1;
  }
}
</style>
