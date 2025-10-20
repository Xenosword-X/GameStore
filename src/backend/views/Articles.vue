<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading :active="isLoading" />
  <div class="d-flex justify-content-between align-items-center my-4">
    <h2 class="h4 fw-bold">消息更新</h2>
    <button class="btn btn-primary d-flex align-items-center gap-1" @click="openModal(true)">
      <i class="bi bi-plus-circle"></i> 新增消息
    </button>
  </div>

  <div class="table-responsive">
    <table class="table table-hover align-middle text-nowrap">
      <thead class="table-light">
        <tr>
          <th>標題</th>
          <th width="120">作者</th>
          <th width="160">標籤</th>
          <th width="160">建立時間</th>
          <th width="100" class="text-center">狀態</th>
          <th width="200" class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>
            <span v-for="t in item.tag" :key="t" class="badge bg-info me-1">{{ t }}</span>
          </td>
          <td>{{ new Date(item.create_at).toLocaleString() }}</td>
          <td class="text-center">
            <span class="badge" :class="item.isPublic ? 'bg-success' : 'bg-secondary'">
              {{ item.isPublic ? '已發布' : '以下架' }}
            </span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                <i class="bi bi-pencil-square"></i> 編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelArticleModal(item)">
                <i class="bi bi-trash"></i> 刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Pagination :pages="pagination" @emit-pages="getArticles" />
  <ArticleModal
    ref="articleModal"
    :article="tempArticle"
    :isNew="isNew"
    @update-article="updateArticle"
  />
  <DelModal ref="delModal" :item="tempArticle" @del-item="delArticle" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ArticleModal from '@/backend/components/ArticleModal.vue'
import DelModal from '@/backend/components/DelModal.vue'
import Pagination from '@/backend/components/Pagination.vue'
import { showToast } from '@/methods/Toast'

// 狀態
const articles = ref([])
const pagination = ref({})
const tempArticle = ref({})
const isNew = ref(false)
const isLoading = ref(false)

// refs
const articleModal = ref(null)
const delModal = ref(null)

// 取得文章列表
const getArticles = async (page = 1) => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/articles?page=${page}`
  isLoading.value = true
  try {
    const res = await axios.get(api)
    if (res.data.success) {
      articles.value = res.data.articles
      pagination.value = res.data.pagination
    }
  } catch {
    showToast('error', '資料載入失敗')
  } finally {
    isLoading.value = false
  }
}

// 取得單篇文章
const getArticle = async (id) => {
  const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/article/${id}`
  try {
    const res = await axios.get(api)
    if (res.data.success) {
      tempArticle.value = res.data.article
    }
  } catch {
    showToast('error', '資料載入失敗')
  }
}

// 開啟新增 / 編輯 Modal
const openModal = async (newMode, item) => {
  isNew.value = newMode
  if (newMode) {
    tempArticle.value = {
      title: '',
      author: '',
      image: '',
      tag: [],
      description: '',
      content: '',
      isPublic: false,
      create_at: Date.now(),
    }
  } else {
    await getArticle(item.id)
  }
  articleModal.value.showModal()
}

// 新增 / 更新文章
const updateArticle = async (item) => {
  tempArticle.value = item
  let api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/article`
  let method = 'post'

  if (!isNew.value) {
    api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/article/${item.id}`
    method = 'put'
  }

  try {
    const res = await axios[method](api, { data: tempArticle.value })
    articleModal.value.hideModal()
    if (res.data.success) {
      await getArticles()
      showToast('success', '更新成功')
    } else {
      showToast('error', '更新失敗，請確認是否有欄位未填寫')
    }
  } catch {
    showToast('error', '更新失敗，請確認是否有欄位未填寫')
  }
}

// 開啟刪除 Modal
const openDelArticleModal = (item) => {
  tempArticle.value = { ...item }
  delModal.value.showModal()
}

// 刪除文章
const delArticle = async () => {
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/article/${tempArticle.value.id}`
  try {
    await axios.delete(url)
    delModal.value.hideModal()
    await getArticles()
  } catch {
    showToast('error', '資料刪除失敗')
  }
}

onMounted(getArticles)
</script>
