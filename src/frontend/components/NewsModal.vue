<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ article.title }}</h5>
          <button type="button" class="btn-close" @click="hideModal"></button>
        </div>
        <div class="modal-body">
          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border"></div>
          </div>
          <template v-else>
            <img
              v-if="article.image"
              :src="article.image"
              class="img-fluid rounded mb-3"
              :alt="article.title"
            />
            <div class="mb-2 text-secondary small">
              <span>{{ formatDate(article.create_at) }}</span>
              <span v-if="article.author">｜{{ article.author }}</span>
              <span v-if="article.tag && article.tag.length">
                ｜<span class="badge bg-primary me-1" v-for="tag in article.tag" :key="tag">
                  {{ tag }}
                </span>
              </span>
            </div>
            <div class="mb-3"><strong>摘要：</strong> {{ article.description }}</div>
            <hr />
            <div v-html="article.content"></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useModal } from '@/composables/useModal'

defineProps({
  article: Object,
  isLoading: Boolean,
})

const modal = ref(null)
const { hideModal } = useModal(modal)

// 日期格式化
const formatDate = (ts) => {
  const timestamp = Number(ts)
  const ms = timestamp > 1e11 ? timestamp : timestamp * 1000
  const date = new Date(ms)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>

<style scoped>
.modal-body img {
  max-height: 320px;
  object-fit: cover;
}
</style>
