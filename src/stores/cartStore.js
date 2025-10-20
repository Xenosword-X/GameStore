import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { showToast } from '@/methods/Toast'
import { useStatusStore } from './statusStore'

export const useCartStore = defineStore('cartStore', () => {
  const status = useStatusStore()

  const cart = ref({ carts: [] })

  // Vite 環境變數
  const API = import.meta.env.VITE_API
  const PATH = import.meta.env.VITE_PATH

  const getCart = async () => {
    status.isLoading = true
    try {
      const { data } = await axios.get(`${API}api/${PATH}/cart`)
      cart.value = data.data
    } catch (err) {
      showToast('error', '資料載入失敗')
      console.err(err)
    } finally {
      status.isLoading = false
    }
  }

  const addCart = async (id) => {
    status.cartLoadingItem = id
    try {
      await axios.post(`${API}api/${PATH}/cart`, {
        data: { product_id: id, qty: 1 }
      })
      showToast('success', '已加入購物車')
      await getCart()
    } catch (err) {
      showToast('error', '資料新增失敗')
      console.err(err)
    } finally {
      status.cartLoadingItem = ''
    }
  }

  // 更新購物車商品數量
  const updateCart = async (item) => {
    status.isLoading = true
    status.cartLoadingItem = item.id
    try {
      await axios.put(`${API}api/${PATH}/cart/${item.id}`, {
        data: { product_id: item.product_id, qty: item.qty }
      })
      await getCart()
    } catch (err) {
      showToast('error', '資料更新失敗')
      console.err(err)
    } finally {
      status.cartLoadingItem = ''
      status.isLoading = false
    }
  }

  const delCartItem = async (id) => {
    status.isLoading = true
    status.cartLoadingItem = id
    try {
      // axios.delete 的第二參數是 config，這裡不需傳 body
      await axios.delete(`${API}api/${PATH}/cart/${id}`)
      showToast('success', '商品已刪除')
      await getCart()
    } catch (err) {
      showToast('error', '資料刪除失敗')
      console.err(err)
    } finally {
      status.cartLoadingItem = ''
      status.isLoading = false
    }
  }

  const delAllCart = async () => {
    status.isLoading = true
    try {
      await axios.delete(`${API}api/${PATH}/carts`)
      showToast('success', '已清空購物車')
      await getCart()
    } catch (err) {
      showToast('error', '資料刪除失敗')
      console.err(err)
    } finally {
      status.isLoading = false
    }
  }

  const addCouponCode = async (code) => {
    status.isLoading = true
    try {
      await axios.post(`${API}api/${PATH}/coupon`, { data: { code } })
      showToast('success', '已成功加入優惠券')
      await getCart()
      // 如果你有在元件裡雙向綁定 coupon_code，可在那裡清空
      // 這裡移除 this.coupon_code 的直接存取
    } catch (err) {
      showToast('error', '該優惠券不存在')
      console.err(err)
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
    addCouponCode
  }
})
