<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title"><span>訂單細節</span></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <!-- 用戶資料 -->
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table" v-if="tempOrder.user">
                <tbody>
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 訂單資料 -->
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ formatDate(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">{{ formatDate(tempOrder.paid_date) }}</span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ $filters.currency(tempOrder.total) }}</td>
                  </tr>
                </tbody>
              </table>

              <h3>選購商品</h3>
              <table class="table">
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>{{ item.product.title }}</th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">{{ $filters.currency(item.final_total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            關閉
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
  order: {
    type: Object,
    default: () => ({}),
  },
})

const modal = ref(null)
const tempOrder = ref({})
const { showModal, hideModal } = useModal(modal)

// 同步父層傳入資料
watch(
  () => props.order,
  (newVal) => {
    tempOrder.value = { ...newVal }
  },
  { immediate: true },
)

const formatDate = (timestamp) => {
  const num = Number(timestamp)
  if (!num || isNaN(num)) return '無效時間'
  const date = new Date(num * 1000)
  return date.toISOString().split('T')[0]
}

defineExpose({ showModal, hideModal })
</script>
