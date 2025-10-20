<template>
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span>{{ isNew ? '新增消息' : '編輯消息' }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input
              v-model="tempArticle.title"
              type="text"
              class="form-control"
              id="title"
              placeholder="請輸入標題"
            />
          </div>

          <div class="mb-3">
            <label for="author" class="form-label">作者</label>
            <input
              v-model="tempArticle.author"
              type="text"
              class="form-control"
              id="author"
              placeholder="請輸入作者"
            />
          </div>

          <div class="mb-3">
            <label for="image" class="form-label">封面圖片網址</label>
            <input
              v-model="tempArticle.image"
              type="text"
              class="form-control"
              id="image"
              placeholder="請輸入圖片連結"
            />
            <img
              v-if="tempArticle.image"
              class="img-fluid mt-2"
              :src="tempArticle.image"
              alt="預覽圖片"
            />
          </div>

          <div class="mb-3">
            <label for="tag" class="form-label">標籤（逗號分隔）</label>
            <input
              v-model="tagInput"
              @blur="updateTagArray"
              type="text"
              class="form-control"
              id="tag"
              placeholder="例如：公告,活動,優惠"
            />
            <div class="mt-1">
              <span v-for="t in tempArticle.tag" :key="t" class="badge bg-info me-1">{{ t }}</span>
            </div>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">摘要</label>
            <textarea
              v-model="tempArticle.description"
              class="form-control"
              id="description"
              rows="2"
              placeholder="請輸入文章摘要"
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label">內容</label>
            <textarea
              v-model="tempArticle.content"
              class="form-control"
              id="content"
              rows="6"
              placeholder="請輸入詳細內容"
            ></textarea>
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input
                v-model="tempArticle.isPublic"
                class="form-check-input"
                type="checkbox"
                id="isPublic"
              />
              <label class="form-check-label" for="isPublic">是否公開</label>
            </div>
          </div>

          <div v-if="!isNew" class="mb-3 text-muted small">
            建立時間：{{ new Date(tempArticle.create_at).toLocaleString() }}
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', tempArticle)"
          >
            儲存
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
  article: { type: Object, default: () => ({}) },
  isNew: { type: Boolean, default: true },
})

defineEmits(['update-article'])

const modal = ref(null)
const { showModal, hideModal } = useModal(modal)

const tempArticle = ref({})
const tagInput = ref('')

// 同步 props.article → tempArticle
watch(
  () => props.article,
  (newVal) => {
    tempArticle.value = {
      title: newVal?.title || '',
      author: newVal?.author || '',
      image: newVal?.image || '',
      tag: Array.isArray(newVal?.tag) ? newVal.tag : [],
      description: newVal?.description || '',
      content: newVal?.content || '',
      isPublic: typeof newVal?.isPublic === 'boolean' ? newVal.isPublic : false,
      create_at: newVal?.create_at || Date.now(),
      id: newVal?.id || undefined,
    }
    tagInput.value = tempArticle.value.tag.join(',')
  },
  { immediate: true },
)

// 標籤輸入框 blur 時轉陣列
const updateTagArray = () => {
  tempArticle.value.tag = tagInput.value
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t)
}

defineExpose({ showModal, hideModal })
</script>
