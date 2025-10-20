<template>
  <div>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="cartOffcanvas"
      aria-labelledby="cartOffcanvasLabel"
      ref="cartOffcanvas"
      style="width: 400px"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="cartOffcanvasLabel">購物車 <i class="bi bi-cart"></i></h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <!-- 空購物車 -->
      <div
        v-if="cart.carts.length === 0"
        class="offcanvas-body d-flex flex-column justify-content-center align-items-center text-center py-5"
      >
        <i class="bi bi-cart-x display-4 text-secondary mb-3"></i>
        <h4 class="mb-2">購物車尚無商品</h4>
        <p class="text-muted mb-4">看起來你還沒加入任何商品，快去逛逛我們的遊戲商城吧！</p>
        <RouterLink to="/cart" class="btn btn-primary">
          前往遊戲商城選購 <i class="bi bi-arrow-right ms-1"></i>
        </RouterLink>
      </div>

      <!-- 有商品 -->
      <div v-else class="offcanvas-body">
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 110px">數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="cartLoadingItem === item.id"
                  @click="delCartItem(item.id)"
                >
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model.number="item.qty"
                    @change="updateCart(item)"
                    :disabled="cartLoadingItem === item.id"
                  />
                  <div class="input-group-text">/ {{ item.product.unit }}</div>
                </div>
              </td>
              <td class="text-end">
                <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                {{ currency(item.final_total) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success fw-bold">折扣價</td>
              <td class="text-end text-success">{{ currency(cart.final_total) }}</td>
            </tr>
          </tfoot>
        </table>

        <!-- 優惠碼 -->
        <div class="input-group my-2 input-group-sm">
          <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼" />
          <button class="btn btn-outline-secondary" type="button" @click="applyCoupon">
            套用優惠碼
          </button>
        </div>

        <!-- 動作按鈕 -->
        <div class="text-end">
          <button class="btn btn-outline-danger text-nowrap" type="button" @click="confirmDel">
            <i class="bi bi-trash me-1"></i> 清空購物車
          </button>
          <button class="btn btn-primary ms-2" type="button" @click="cartSubmit">
            填寫寄送資料
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import * as bootstrap from 'bootstrap'
import { useCartStore } from '@/stores/cartStore'
import { useStatusStore } from '@/stores/statusStore'
import { currency } from '@/utils/filter'
import { showToast } from '@/utils/toast'

// --- stores ---
const cartStore = useCartStore()
const statusStore = useStatusStore()
const router = useRouter()

// --- refs ---
const cartOffcanvas = ref(null)
const couponCode = ref('')

// --- pinia 狀態 ---
const { cart } = storeToRefs(cartStore)
const { cartLoadingItem } = storeToRefs(statusStore)

// --- 方法 ---
const { updateCart, delCartItem, delAllCart, addCouponCode, getCart } = cartStore

// 套用優惠碼
const applyCoupon = () => {
  addCouponCode(couponCode.value)
  couponCode.value = ''
}

// 前往結帳
const cartSubmit = () => {
  if (!cart.value.final_total) {
    showToast('error', '購物車無商品')
    return
  }

  router.push('/user/form')

  // 關閉 offcanvas
  const offcanvasInstance = bootstrap.Offcanvas.getInstance(cartOffcanvas.value)
  if (offcanvasInstance) offcanvasInstance.hide()
}

// 確認刪除所有項目
const confirmDel = () => {
  Swal.fire({
    title: '確定要清空購物車嗎？',
    text: '此動作將移除所有商品，無法復原！',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '是的，清空',
    reverseButtons: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
  }).then((res) => {
    if (res.isConfirmed) delAllCart()
  })
}

// 初始化取得購物車
onMounted(() => {
  getCart()
})
</script>

<style scoped>
.floating-cart-btn {
  background: transparent;
  border: none;
  position: relative;
  padding: 0;
  box-shadow: none;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  transform: translate(20%, 20%);
  font-size: 0.7rem;
  padding: 4px 6px;
  border-radius: 50%;
}
.offcanvas .table th,
.offcanvas .table td {
  vertical-align: middle;
}
.input-group input[type='number'] {
  max-width: 60px;
}
</style>
