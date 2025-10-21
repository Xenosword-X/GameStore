<template>
  <div class="my-5 row justify-content-center">
    <!-- 標題 -->
    <form class="col-md-6" @submit.prevent="payOrder">
      <div class="text-center mb-2">
        <h3 class="fw-bold text-primary"><i class="bi bi-receipt"></i> 訂單明細確認</h3>
        <p class="text-muted">請再次確認以下資訊後完成付款</p>
      </div>
    </form>
  </div>

  <!-- 購買清單 -->
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-sm mb-4">
        <div class="card-header bg-primary text-white fw-bold">
          <i class="bi bi-cart4"></i> 購買商品清單
        </div>
        <div class="card-body p-0">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>品名</th>
                <th class="text-center">數量</th>
                <th class="text-end">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td>{{ item.product.title }}</td>
                <td class="text-center">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="text-end">{{ $filters.currency(item.final_total) }}</td>
              </tr>
            </tbody>
            <tfoot class="table-light">
              <tr>
                <td colspan="2" class="text-end fw-bold">總計</td>
                <td class="text-end fw-bold text-danger">{{ $filters.currency(order.total) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- 收件人資訊 -->
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-sm mb-4">
        <div class="card-header bg-primary text-white fw-bold">
          <i class="bi bi-person-lines-fill"></i> 收件人資訊
        </div>
        <div class="card-body">
          <table class="table mb-0">
            <tbody>
              <tr>
                <th width="120">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid" class="badge bg-warning text-dark">尚未付款</span>
                  <span v-else class="badge bg-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 付款按鈕 -->
      <div class="text-end">
        <button v-if="!order.is_paid" class="btn btn-success px-4 py-2" @click="payOrder">
          <i class="bi bi-credit-card"></i> 確認付款
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { showToast } from '@/utils/toast'

// 狀態
const order = ref({ user: {}, products: [] })
const orderId = ref('')
const isLoading = ref(false)

// 取得 route 參數
const route = useRoute()

// 取得訂單資料
const getOrder = async () => {
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/order/${orderId.value}`
  isLoading.value = true
  try {
    const res = await axios.get(url)
    if (res.data.success) {
      order.value = res.data.order
    }
  } catch {
    showToast('error', '資料載入失敗')
  } finally {
    isLoading.value = false
  }
}

// 付款動作
const payOrder = async () => {
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/pay/${orderId.value}`
  isLoading.value = true
  try {
    const res = await axios.post(url)
    if (res.data.success) {
      showToast('success', '已成功付款')
      await getOrder()
    }
  } catch {
    showToast('error', '資料載入失敗')
  } finally {
    isLoading.value = false
  }
}

// 初始化載入
onMounted(() => {
  orderId.value = route.params.orderId
  getOrder()
})
</script>

<style scoped>
.table th {
  width: 120px;
}
</style>
