<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading :active="isLoading" />
  <h2 class="h4 fw-bold mt-4 mb-3">訂單管理</h2>

  <div class="table-responsive">
    <table class="table table-hover align-middle text-nowrap">
      <thead class="table-light">
        <tr>
          <th>購買日期</th>
          <th>Email</th>
          <th>購買品項</th>
          <th class="text-end">金額</th>
          <th class="text-center">付款狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>

      <tbody v-if="orders.length">
        <tr v-for="(item, key) in orders" :key="key" :class="{ 'text-muted': !item.is_paid }">
          <td>{{ formatDate(item.create_at) }}</td>
          <td>{{ item.user?.email || '未填寫' }}</td>
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
                  :checked="Boolean(item.is_paid)"
                  :disabled="isLoading"
                  @change="updatePaid(item, $event.target.checked)"
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
import { showToast } from '@/utils/toast'

const orders = ref([])
const pagination = ref({})
const isLoading = ref(false)
const tempOrder = ref({})

const orderModal = ref(null)
const delModal = ref(null)

const formatDate = (timestamp) => {
  const num = Number(timestamp)
  if (!Number.isFinite(num)) return '日期格式錯誤'
  const date = new Date(num * 1000)
  return date.toISOString().split('T')[0]
}

const getOrders = async (page = 1) => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/orders?page=${page}`
  isLoading.value = true
  try {
    const res = await axios.get(api)
    if (res.data.success) {
      orders.value = res.data.orders
      pagination.value = res.data.pagination
    } else {
      showToast('error', res.data.message || '訂單載入失敗')
    }
  } catch (err) {
    console.error('訂單載入錯誤', err)
    showToast('error', '訂單載入失敗')
  } finally {
    isLoading.value = false
  }
}

const openModal = (item) => {
  tempOrder.value = { ...item }
  orderModal.value.showModal()
}

const openDelOrderModal = (item) => {
  tempOrder.value = { ...item }
  delModal.value.showModal()
}

const updatePaid = async (item, checked) => {
  const newStatus = typeof checked === 'boolean' ? checked : Boolean(item.is_paid)
  const previousStatus = Boolean(item.is_paid)
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/order/${item.id}`

  isLoading.value = true
  try {
    await axios.put(api, { data: { is_paid: newStatus } })
    item.is_paid = newStatus ? 1 : 0
    showToast('success', '付款狀態已更新')
    await getOrders(pagination.value?.current_page || 1)
  } catch (err) {
    console.error('更新付款狀態失敗', err)
    item.is_paid = previousStatus ? 1 : 0
    showToast('error', '付款狀態更新失敗')
  } finally {
    isLoading.value = false
  }
}

const delOrder = async () => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/order/${tempOrder.value.id}`
  try {
    await axios.delete(api)
    delModal.value.hideModal()
    showToast('success', '訂單已刪除')
    await getOrders(pagination.value?.current_page || 1)
  } catch (err) {
    console.error('刪除訂單失敗', err)
    showToast('error', '訂單刪除失敗')
  }
}

onMounted(getOrders)
</script>
