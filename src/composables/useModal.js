// src/composables/useModal.js
import { onMounted, ref } from 'vue'
import Modal from 'bootstrap/js/dist/modal'

export function useModal(modalRef) {
  const modalInstance = ref(null)

  const showModal = () => {
    modalInstance.value?.show()
  }

  const hideModal = () => {
    modalInstance.value?.hide()
  }

  onMounted(() => {
    modalInstance.value = new Modal(modalRef.value)
  })

  return {
    showModal,
    hideModal,
  }
}
