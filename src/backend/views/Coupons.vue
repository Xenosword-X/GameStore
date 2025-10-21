<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Loading :active="isLoading" />

    <div class="d-flex justify-content-between align-items-center my-4">
      <h2 class="h4 fw-bold">優惠券管理</h2>
      <button class="btn btn-primary d-flex align-items-center gap-1" @click="openCouponModal(true)">
        <i class="bi bi-plus-circle"></i> 新增優惠券
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
                {{ item.is_enabled === 1 ? '啟用中' : '未啟用' }}
              </span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">
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
import { showToast } from '@/utils/toast'

const coupons = ref([])
const pagination = ref({})
const tempCoupon = ref(createDefaultCoupon())
const isLoading = ref(false)
const isNew = ref(false)

const couponModal = ref(null)
const delModal = ref(null)

const formatDate = (timestamp) => {
  const date = new Date(Number(timestamp) * 1000)
  return Number.isFinite(date.getTime()) ? date.toISOString().split('T')[0] : '未設定'
}

const getCoupons = async (page = 1) => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupons?page=${page}`
  isLoading.value = true
  try {
    const res = await axios.get(api)
    if (res.data.success) {
      coupons.value = res.data.coupons
      pagination.value = res.data.pagination
    } else {
      showToast('error', res.data.message || '優惠券載入失敗')
    }
  } catch (err) {
    console.error('載入優惠券失敗', err)
    showToast('error', '優惠券載入失敗')
  } finally {
    isLoading.value = false
  }
}

const openCouponModal = (newMode, item) => {
  isNew.value = newMode
  if (newMode) {
    tempCoupon.value = createDefaultCoupon()
  } else {
    tempCoupon.value = { ...item }
  }
  couponModal.value.showModal()
}

const openDelCouponModal = (item) => {
  tempCoupon.value = { ...item }
  delModal.value.showModal()
}

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
      showToast('success', isNew.value ? '新增優惠券成功' : '更新優惠券成功')
      await getCoupons(pagination.value?.current_page || 1)
    } else {
      showToast('error', res.data.message || '保存優惠券失敗')
    }
  } catch (err) {
    console.error('儲存優惠券失敗', err)
    showToast('error', '儲存優惠券失敗')
  } finally {
    isLoading.value = false
  }
}

const delCoupon = async () => {
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/coupon/${tempCoupon.value.id}`
  isLoading.value = true
  try {
    await axios.delete(url)
    delModal.value.hideModal()
    showToast('success', '優惠券已刪除')
    await getCoupons(pagination.value?.current_page || 1)
  } catch (err) {
    console.error('刪除優惠券失敗', err)
    showToast('error', '刪除優惠券失敗')
  } finally {
    isLoading.value = false
  }
}

function createDefaultCoupon() {
  return {
    title: '',
    code: '',
    percent: 100,
    is_enabled: 0,
    due_date: Math.floor(Date.now() / 1000),
  }
}

onMounted(getCoupons)
</script>
