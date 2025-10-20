<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Loading :active="isLoading" />

    <div class="d-flex justify-content-between align-items-center my-4">
      <h2 class="h4 fw-bold">優惠券管理</h2>
      <button
        class="btn btn-primary d-flex align-items-center gap-1"
        @click="openCouponModal(true)"
      >
        <i class="bi bi-plus-circle"></i> 建立新的優惠券
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle text-nowrap">
        <thead class="table-light">
          <tr>
            <th>名稱</th>
            <th class="text-center">折扣百分比</th>
            <th class="text-center">到期日</th>
            <th class="text-center">狀態</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td class="text-center">{{ item.percent }}%</td>
            <td class="text-center">{{ formatDate(item.due_date) }}</td>
            <td class="text-center">
              <span class="badge" :class="item.is_enabled === 1 ? 'bg-success' : 'bg-secondary'">
                {{ item.is_enabled === 1 ? '啟用' : '未啟用' }}
              </span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="openCouponModal(false, item)"
                >
                  <i class="bi bi-pencil-square"></i> 編輯
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">
                  <i class="bi bi-trash"></i> 刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <CouponModal
      ref="couponModal"
      :coupon="tempCoupon"
      :isNew="isNew"
      @update-coupon="updateCoupon"
    />
    <DelModal ref="delModal" :item="tempCoupon" @del-item="delCoupon" />
    <Pagination :pages="pagination" @emit-pages="getCoupons" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CouponModal from '@/backend/components/CouponModal.vue'
import DelModal from '@/backend/components/DelModal.vue'
import Pagination from '@/backend/components/Pagination.vue'

// 狀態管理
const coupons = ref([])
const pagination = ref({})
const tempCoupon = ref({
  title: '',
  is_enabled: 0,
  percent: 100,
  code: '',
})
const isLoading = ref(false)
const isNew = ref(false)

// refs
const couponModal = ref(null)
const delModal = ref(null)

// 日期轉換
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toISOString().split('T')[0]
}

// 取得優惠券
const getCoupons = async (page = 1) => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupons?page=${page}`
  isLoading.value = true
  try {
    const res = await axios.get(api)
    coupons.value = res.data.coupons
    pagination.value = res.data.pagination
  } catch {
    alert('資料載入失敗')
  } finally {
    isLoading.value = false
  }
}

// 打開優惠券 Modal
const openCouponModal = (newMode, item) => {
  isNew.value = newMode
  if (isNew.value) {
    tempCoupon.value = {
      due_date: Math.floor(new Date().getTime() / 1000),
    }
  } else {
    tempCoupon.value = { ...item }
  }
  couponModal.value.showModal()
}

// 開啟刪除 Modal
const openDelCouponModal = (item) => {
  tempCoupon.value = { ...item }
  delModal.value.showModal()
}

// 新增或編輯優惠券
const updateCoupon = async (couponData) => {
  tempCoupon.value = couponData
  let api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupon`
  let method = 'post'

  if (!isNew.value) {
    api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupon/${tempCoupon.value.id}`
    method = 'put'
  }

  isLoading.value = true
  try {
    const res = await axios[method](api, { data: tempCoupon.value })
    if (res.data.success) {
      couponModal.value.hideModal()
      await getCoupons()
      alert(isNew.value ? '新增優惠券成功' : '更新優惠券成功')
    } else {
      alert(isNew.value ? '新增優惠券失敗' : '更新優惠券失敗')
    }
  } catch {
    alert('資料更新失敗')
  } finally {
    isLoading.value = false
  }
}

// 刪除優惠券
const delCoupon = async () => {
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupon/${tempCoupon.value.id}`
  isLoading.value = true
  try {
    await axios.delete(url)
    delModal.value.hideModal()
    await getCoupons()
  } catch {
    alert('資料刪除失敗')
  } finally {
    isLoading.value = false
  }
}

onMounted(getCoupons)
</script>
