import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { showToast } from '@/utils/toast'
import { useStatusStore } from './statusStore'

export const useCartStore = defineStore('cartStore', () => {
  const status = useStatusStore()
  const cart = ref({ carts: [] })

  const API = import.meta.env.VITE_API
  const PATH = import.meta.env.VITE_PATH

  const getCart = async () => {
    status.isLoading = true
    try {
      const { data } = await axios.get(`${API}api/${PATH}/cart`)
      cart.value = data.data
    } catch (err) {
      showToast('error', '載入購物車失敗')
      console.error(err)
    } finally {
      status.isLoading = false
    }
  }

  const addCart = async (id) => {
    status.cartLoadingItem = id
    try {
      await axios.post(`${API}api/${PATH}/cart`, {
        data: { product_id: id, qty: 1 },
      })
      showToast('success', '已加入購物車')
      await getCart()
    } catch (err) {
      showToast('error', '加入購物車失敗')
      console.error(err)
    } finally {
      status.cartLoadingItem = ''
    }
  }

  const updateCart = async (item) => {
    status.isLoading = true
    status.cartLoadingItem = item.id
    try {
      await axios.put(`${API}api/${PATH}/cart/${item.id}`, {
        data: { product_id: item.product_id, qty: item.qty },
      })
      await getCart()
    } catch (err) {
      showToast('error', '更新購物車失敗')
      console.error(err)
    } finally {
      status.cartLoadingItem = ''
      status.isLoading = false
    }
  }

  const delCartItem = async (id) => {
    status.isLoading = true
    status.cartLoadingItem = id
    try {
      await axios.delete(`${API}api/${PATH}/cart/${id}`)
      showToast('success', '單筆購物車項目已刪除')
      await getCart()
    } catch (err) {
      showToast('error', '刪除購物車失敗')
      console.error(err)
    } finally {
      status.cartLoadingItem = ''
      status.isLoading = false
    }
  }

  const delAllCart = async () => {
    status.isLoading = true
    try {
      await axios.delete(`${API}api/${PATH}/carts`)
      showToast('success', '購物車已清空')
      await getCart()
    } catch (err) {
      showToast('error', '清空購物車失敗')
      console.error(err)
    } finally {
      status.isLoading = false
    }
  }

  const addCouponCode = async (code) => {
    status.isLoading = true
    try {
      await axios.post(`${API}api/${PATH}/coupon`, { data: { code } })
      showToast('success', '優惠券套用成功')
      await getCart()
    } catch (err) {
      showToast('error', '優惠券套用失敗')
      console.error(err)
    } finally {
      status.isLoading = false
    }
  }

  return {
    cart,
    getCart,
    addCart,
    updateCart,
    delCartItem,
    delAllCart,
    addCouponCode,
  }
})
