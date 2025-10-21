import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStatusStore } from './statusStore'
import { showToast } from '@/utils/toast'

export const useProductStore = defineStore('productStore', () => {
  const status = useStatusStore()
  const products = ref([])

  const API = import.meta.env.VITE_API
  const PATH = import.meta.env.VITE_PATH

  const getProducts = async () => {
    status.isLoading = true
    try {
      const res = await axios.get(`${API}api/${PATH}/products/all`)
      products.value = res.data.products
    } catch (err) {
      showToast('error', '商品列表載入失敗')
      console.error(err)
    } finally {
      status.isLoading = false
    }
  }

  return {
    products,
    getProducts,
  }
})
