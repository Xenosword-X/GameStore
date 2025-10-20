import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatusStore = defineStore('statusStore', () => {
  // 狀態（State）
  const isLoading = ref(false)
  const cartLoadingItem = ref('')

  // 如果之後要擴充控制 loading 的方法，也可在這裡新增
  const setLoading = (value) => {
    isLoading.value = value
  }

  const setCartLoadingItem = (id) => {
    cartLoadingItem.value = id
  }

  // 回傳 state 與 actions
  return {
    isLoading,
    cartLoadingItem,
    setLoading,
    setCartLoadingItem
  }
})
