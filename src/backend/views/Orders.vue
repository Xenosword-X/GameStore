<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading :active="isLoading" />
  <h2 class="h4 fw-bold mt-4 mb-3">訂單管理</h2>

  <div class="table-responsive">
    <table class="table table-hover align-middle text-nowrap">
      <thead class="table-light">
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買項目</th>
          <th class="text-end">應付金額</th>
          <th class="text-center">付款狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>

      <tbody v-if="orders.length">
        <tr v-for="(item, key) in orders" :key="key" :class="{ 'text-muted': !item.is_paid }">
          <td>{{ formatDate(item.create_at) }}</td>
          <td>{{ item.user?.email || '無資料' }}</td>
          <td>
            <ul class="list-unstyled mb-0">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} × {{ product.qty }} {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-end">{{ $filters.currency(item.total) }}</td>
          <td class="text-center">
            <div class="d-flex flex-column align-items-center">
              <span class="badge mb-1" :class="item.is_paid ? 'bg-success' : 'bg-secondary'">
                {{ item.is_paid ? '已付款' : '未付款' }}
              </span>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
              </div>
            </div>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">
                <i class="bi bi-eye"></i> 檢視
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelOrderModal(item)">
                <i class="bi bi-trash"></i> 刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid" />
  <DelModal ref="delModal" :item="tempOrder" @del-item="delOrder" />
  <Pagination :pages="pagination" @emit-pages="getOrders" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import OrderModal from '@/backend/components/OrderModal.vue'
import DelModal from '@/backend/components/DelModal.vue'
import Pagination from '@/backend/components/Pagination.vue'

// 狀態
const orders = ref([])
const pagination = ref({})
const isLoading = ref(false)
const tempOrder = ref({})

// Modal 參考
const orderModal = ref(null)
const delModal = ref(null)

// 日期格式化
const formatDate = (timestamp) => {
  const num = Number(timestamp)
  if (!num || isNaN(num)) return '無效時間'
  const date = new Date(num * 1000)
  return date.toISOString().split('T')[0]
}

// 取得訂單
const getOrders = async (page = 1) => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/orders?page=${page}`
  isLoading.value = true
  try {
    const res = await axios.get(api)
    if (res.data.success) {
      orders.value = res.data.orders
      pagination.value = res.data.pagination
    }
  } catch {
    alert('資料載入失敗')
  } finally {
    isLoading.value = false
  }
}

// 檢視訂單
const openModal = (item) => {
  tempOrder.value = { ...item }
  orderModal.value.showModal()
}

// 開啟刪除
const openDelOrderModal = (item) => {
  tempOrder.value = { ...item }
  delModal.value.showModal()
}

// 更新付款狀態
const updatePaid = async (item) => {
  isLoading.value = true
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/order/${item.id}`
  const paid = { is_paid: item.is_paid }

  try {
    await axios.put(api, { data: paid })
    await getOrders()
  } catch {
    alert('資料更新失敗')
  } finally {
    isLoading.value = false
  }
}

// 刪除訂單
const delOrder = async () => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/order/${tempOrder.value.id}`
  try {
    await axios.delete(api)
    delModal.value.hideModal()
    await getOrders()
  } catch {
    alert('資料刪除失敗')
  }
}

onMounted(getOrders)
</script>
