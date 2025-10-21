<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="productModalLabel">
            <span>{{ isNew ? '新增產品' : '編輯產品' }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">主要圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">
                  或上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="isUploading"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  accept="image/*"
                  @change="uploadFile"
                />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="主要產品圖片" />

              <!-- 延伸圖片 -->
              <div class="mt-5" v-if="tempProduct.imagesUrl">
                <div
                  v-for="(image, key) in tempProduct.imagesUrl"
                  :key="`image-${key}`"
                  class="mb-3 input-group"
                >
                  <input
                    type="url"
                    class="form-control"
                    v-model="tempProduct.imagesUrl[key]"
                    placeholder="請輸入圖片連結"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="removeImage(key)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] !== '' ||
                    !tempProduct.imagesUrl.length
                  "
                >
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImage">
                    新增圖片
                  </button>
                </div>
              </div>
            </div>

            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="請輸入產品標題"
                />
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <select class="form-select" id="category" v-model="tempProduct.category">
                    <option disabled value="">請選擇分類</option>
                    <option value="主機">主機</option>
                    <option value="遊戲">遊戲</option>
                    <option value="周邊">周邊</option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model.number="tempProduct.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="2"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  class="form-control"
                  id="content"
                  rows="4"
                  v-model="tempProduct.content"
                  placeholder="請輸入產品說明"
                ></textarea>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="tempProduct.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-product', tempProduct)">
            儲存變更
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useModal } from '@/composables/useModal'

const props = defineProps({
  product: { type: Object, default: () => ({}) },
  isNew: { type: Boolean, default: true },
})

defineEmits(['update-product'])

const modal = ref(null)
const tempProduct = ref(createDefaultProduct())
const isUploading = ref(false)

const { showModal, hideModal } = useModal(modal)

watch(
  () => props.product,
  (newVal) => {
    const base = createDefaultProduct()
    const source = newVal && Object.keys(newVal).length ? newVal : base
    tempProduct.value = {
      ...base,
      ...source,
      imagesUrl: Array.isArray(source.imagesUrl) ? [...source.imagesUrl] : [],
      imageUrl: source.imageUrl || '',
    }
  },
  { immediate: true },
)

const uploadFile = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file-to-upload', file)
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/upload`

  try {
    isUploading.value = true
    const res = await axios.post(url, formData)
    if (res.data.success) {
      tempProduct.value.imageUrl = res.data.imageUrl
    } else {
      alert(res.data.message || '圖片上傳失敗')
    }
  } catch (err) {
    console.error('圖片上傳錯誤', err)
    alert('圖片上傳失敗')
  } finally {
    isUploading.value = false
    event.target.value = ''
  }
}

const addImage = () => {
  if (!Array.isArray(tempProduct.value.imagesUrl)) {
    tempProduct.value.imagesUrl = []
  }
  tempProduct.value.imagesUrl.push('')
}

const removeImage = (index) => {
  tempProduct.value.imagesUrl.splice(index, 1)
}

function createDefaultProduct() {
  return {
    title: '',
    category: '',
    unit: '',
    origin_price: 0,
    price: 0,
    description: '',
    content: '',
    is_enabled: 0,
    imageUrl: '',
    imagesUrl: [],
  }
}

defineExpose({ showModal, hideModal })
</script>
