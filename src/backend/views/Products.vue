<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading :active="isLoading" />
  <div class="d-flex justify-content-between align-items-center my-4">
    <h2 class="h4 fw-bold">產品管理</h2>
    <button class="btn btn-primary d-flex align-items-center" @click="openModal(true)">
      <div><i class="bi bi-plus-circle"></i> 增加產品</div>
    </button>
  </div>
  <div class="table-responsive">
    <table class="table table-hover align-middle text-nowrap">
      <thead class="table-light">
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-start">原價</th>
          <th width="120" class="text-start">售價</th>
          <th width="100" class="text-center">狀態</th>
          <th width="200" class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-start">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-start">{{ $filters.currency(item.price) }}</td>
          <td class="text-center">
            <span class="badge" :class="item.is_enabled ? 'bg-success' : 'bg-secondary'">
              {{ item.is_enabled ? '啟用' : '未啟用' }}
            </span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                <i class="bi bi-pencil-square"></i> 編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">
                <i class="bi bi-trash"></i> 刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <pagination :pages="pageInfo" @emit-pages="getProducts" />
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    :isNew="isNew"
    @update-product="updateProduct"
  />
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductModal from '@/backend/components/ProductModal.vue'
import DelModal from '@/backend/components/DelModal.vue'
import pagination from '@/backend/components/Pagination.vue'
import axios from 'axios'
import { showToast } from '@/utils/toast'

const products = ref([])
const pageInfo = ref({})
const tempProduct = ref({})
const isNew = ref(false)
const isLoading = ref(false)

const productModal = ref(null)
const delModal = ref(null)

const getProducts = async (page = 1) => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/products?page=${page}`
  isLoading.value = true
  try {
    const res = await axios.get(api)
    if (res.data.success) {
      products.value = res.data.products
      pageInfo.value = res.data.pagination
    }
  } catch {
    showToast('error', '資料載入失敗')
  } finally {
    isLoading.value = false
  }
}

const openModal = (newMode, item) => {
  isNew.value = newMode
  tempProduct.value = newMode ? {} : { ...item }
  productModal.value.showModal()
}

const updateProduct = async (item) => {
  tempProduct.value = item
  let api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`
  let method = 'post'
  if (!isNew.value) {
    api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${item.id}`
    method = 'put'
  }
  try {
    const res = await axios[method](api, { data: tempProduct.value })
    productModal.value.hideModal()
    if (res.data.success) {
      await getProducts()
      showToast('success', '更新成功')
    }
  } catch {
    showToast('error', '更新失敗，請確認欄位')
  }
}

const openDelProductModal = (item) => {
  tempProduct.value = { ...item }
  delModal.value.showModal()
}

const delProduct = async () => {
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${tempProduct.value.id}`
  try {
    await axios.delete(url)
    delModal.value.hideModal()
    await getProducts()
  } catch {
    showToast('error', '資料刪除失敗')
  }
}

onMounted(getProducts)
</script>
