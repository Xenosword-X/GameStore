<template>
  <Loading :active="isLoading" />

  <!-- banner區域 -->
  <div class="min-vh-100 position-relative">
    <div
      class="position-absolute w-100 h-100"
      :style="{
        backgroundImage: `url(${headerImg})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
      }"
    ></div>

    <div
      class="position-absolute top-50 start-50 translate-middle text-center text-light banner-caption"
    >
      <h1 class="display-1 fw-bold text-light text-nowrap">電玩領域</h1>
      <hr class="mb-1 mx-n3" />
      <h2>歡迎光臨我們的商城</h2>
      <p>您想要的主機遊戲我們都有</p>
      <RouterLink class="btn btn-dark" type="button" to="/cart"> 遊戲商城 → </RouterLink>
    </div>
  </div>

  <!-- 主內容 -->
  <div class="main-section">
    <div class="container py-5">
      <!-- 最新公告區域 -->
      <div id="newsCarousel" class="carousel slide mb-5" data-bs-ride="carousel">
        <div class="carousel-inner">
          <h2 class="carousel-title text-center title mb-3">最新消息</h2>
          <div
            class="carousel-item"
            v-for="(group, groupIdx) in groupedArticles"
            :class="{ active: groupIdx === 0 }"
            :key="groupIdx"
          >
            <div class="row">
              <div
                class="col-12 col-md-4 mb-3 mb-md-0"
                v-for="article in group"
                :key="article.title"
              >
                <div class="card h-100 mx-1">
                  <img
                    v-if="article.image"
                    :src="article.image"
                    class="card-img-top"
                    :alt="article.title"
                  />
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ article.title }}</h5>
                    <p class="card-text text-secondary small mb-1">
                      {{ formatDate(article.create_at) }}｜{{ article.author }}
                    </p>
                    <p class="card-text card-limit mb-2">{{ article.description }}</p>
                    <div>
                      <span class="badge bg-primary me-1" v-for="tag in article.tag" :key="tag">
                        {{ tag }}
                      </span>
                    </div>
                    <div class="mt-auto d-flex justify-content-end">
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-sm"
                        @click="openModal(article)"
                      >
                        詳細資訊
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 輪播控制箭頭 -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#newsCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">上一則</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#newsCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">下一則</span>
        </button>
      </div>

      <!-- 熱門產品區域 -->
      <HotSale />

      <!-- 服務介紹區域 -->
      <div
        id="carouselExampleCaptions"
        class="carousel slide carousel-fade mt-5"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <h2 class="carousel-title text-center title mb-3">我們的服務</h2>
          <div class="carousel-item active" data-bs-interval="3000">
            <img src="@/assets/img/Carousel1.jpg" class="d-block w-100" alt="遊戲商城" />
            <div class="carousel-caption p-3 rounded">
              <h5>遊戲商城</h5>
              <p>各式各樣的遊戲主機與軟體我們都有</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="@/assets/img/Carousel2.png" class="d-block w-100" alt="客製服務" />
            <div class="carousel-caption p-3 rounded">
              <h5>客製服務</h5>
              <p>想要讓主機更加繽紛嗎？我們為您打造專屬外觀</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="@/assets/img/Carousel3.png" class="d-block w-100" alt="抽獎活動" />
            <div class="carousel-caption p-3 rounded">
              <h5>抽獎活動</h5>
              <p>答對 8 題以上即可獲得抽獎資格</p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <!-- 電子報訂閱 -->
      <h2 class="fw-bold mt-5 mb-3 title text-center">訂閱我們的電子報</h2>
      <p class="text-muted mb-4 text-center">獲取最新遊戲消息、優惠活動與會員專屬好康</p>
      <form class="row g-2 justify-content-center" @submit.prevent="subscribe">
        <div class="col-12 col-md-6">
          <input
            type="email"
            class="form-control"
            placeholder="請輸入您的 Email"
            v-model="email"
            required
          />
        </div>
        <div class="col-12 col-md-auto">
          <button type="submit" class="btn btn-primary px-4">訂閱</button>
        </div>
      </form>
      <p class="text-success text-center mt-3" v-if="subscribed">感謝您的訂閱！🎉</p>
    </div>
  </div>

  <NewsModal ref="newsModal" :article="article" :is-loading="isLoading" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NewsModal from '@/frontend/components/NewsModal.vue'
import HotSale from '@/frontend/components/HotSale.vue'
import headerImg from '@/assets/img/header.jpg'
import axios from 'axios'
import { showToast } from '@/utils/toast'

// 狀態管理
const articles = ref([])
const article = ref({})
const isLoading = ref(false)
const email = ref('')
const subscribed = ref(false)
const newsModal = ref(null)

// 分組顯示文章
const groupedArticles = computed(() => {
  const groupSize = window.innerWidth < 768 ? 1 : 3
  const groups = []
  for (let i = 0; i < articles.value.length; i += groupSize) {
    groups.push(articles.value.slice(i, i + groupSize))
  }
  return groups
})

// 載入文章
const getArticles = async () => {
  try {
    const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/articles`
    const res = await axios.get(api)
    articles.value = res.data.articles
  } catch (err) {
    showToast('error', '資料載入失敗')
    console.error(err)
  }
}

// 取得單篇文章
const getArticle = async (item) => {
  try {
    isLoading.value = true
    const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/article/${item.id}`
    const res = await axios.get(api)
    article.value = res.data.article
  } catch {
    showToast('error', '資料載入失敗')
  } finally {
    isLoading.value = false
  }
}

// 開啟 Modal
const openModal = async (item) => {
  await getArticle(item)
  newsModal.value.showModal()
}

// 日期格式化
const formatDate = (ts) => {
  const date = new Date(Number(ts))
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

// 電子報訂閱
const subscribe = () => {
  if (email.value.trim()) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => {
      subscribed.value = false
    }, 3000)
  }
}

// 初始化
onMounted(() => {
  getArticles()
})
</script>

<style lang="scss" scoped>
.carousel-control-prev,
.carousel-control-next {
  width: 3rem;
}
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  max-width: 50%;
  margin: 0 auto;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}
.card-limit {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3.2em;
  white-space: normal;
}
.card.h-100 {
  min-height: 400px;
}
.card-img-top {
  max-height: 200px;
  object-fit: cover;
}
.main-section {
  @include background-color;
}
.title {
  @include custom-title-style;
}
.banner-caption {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
  border-radius: 0.75rem;
}
</style>
