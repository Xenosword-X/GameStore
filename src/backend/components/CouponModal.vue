<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <span>{{ isNew ? '新增優惠券' : '編輯優惠券' }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="dueDate" />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useModal } from '@/composables/useModal'

// Props
const props = defineProps({
  coupon: { type: Object, default: () => ({}) },
  isNew: { type: Boolean, default: true },
})

defineEmits(['update-coupon'])
const modal = ref(null)
const tempCoupon = ref({})
const dueDate = ref('')

// 使用 Bootstrap Modal
const { showModal, hideModal } = useModal(modal)

// 監聽父層傳入 coupon
watch(
  () => props.coupon,
  (newVal) => {
    tempCoupon.value = { ...newVal }
    if (tempCoupon.value.due_date) {
      const date = new Date(tempCoupon.value.due_date * 1000)
      dueDate.value = date.toISOString().split('T')[0]
    }
  },
  { immediate: true },
)

// 監聽日期變更回寫秒數
watch(dueDate, (newVal) => {
  tempCoupon.value.due_date = Math.floor(new Date(newVal).getTime() / 1000)
})

defineExpose({ showModal, hideModal })
</script>
