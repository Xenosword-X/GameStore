<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <span>{{ isNew ? '新增優惠券' : '編輯優惠券' }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code" class="form-label">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date" class="form-label">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="dueDate" />
          </div>
          <div class="mb-3">
            <label for="percent" class="form-label">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="percent"
              v-model.number="tempCoupon.percent"
              min="1"
              max="100"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="form-check mb-3">
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

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">
            儲存變更
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useModal } from '@/composables/useModal'

const props = defineProps({
  coupon: { type: Object, default: () => ({}) },
  isNew: { type: Boolean, default: true },
})

defineEmits(['update-coupon'])

const modal = ref(null)
const tempCoupon = ref(createDefaultCoupon())
const dueDate = ref('')

const { showModal, hideModal } = useModal(modal)

watch(
  () => props.coupon,
  (newVal) => {
    const base = createDefaultCoupon()
    const source = newVal && Object.keys(newVal).length ? newVal : base
    tempCoupon.value = { ...base, ...source }
    if (tempCoupon.value.due_date) {
      const date = new Date(tempCoupon.value.due_date * 1000)
      dueDate.value = date.toISOString().split('T')[0]
    } else {
      dueDate.value = ''
    }
  },
  { immediate: true },
)

watch(dueDate, (newVal) => {
  if (!newVal) return
  const ms = new Date(newVal).getTime()
  if (Number.isFinite(ms)) {
    tempCoupon.value.due_date = Math.floor(ms / 1000)
  }
})

function createDefaultCoupon() {
  return {
    title: '',
    code: '',
    percent: 100,
    is_enabled: 0,
    due_date: Math.floor(Date.now() / 1000),
  }
}

defineExpose({ showModal, hideModal })
</script>
