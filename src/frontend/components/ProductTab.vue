<template>
  <div class="py-5">
    <!-- Tabs 切換列 -->
    <ul
      class="nav nav-tabs flex-nowrap overflow-x-auto overflow-y-hidden border-0 mb-3"
      style="white-space: nowrap"
    >
      <li class="nav-item" v-for="tab in tabs" :key="tab.id">
        <button
          class="nav-link"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </li>
    </ul>

    <!-- 對應的 tab 區塊 -->
    <div class="tab-content border border-top-0 p-4">
      <!-- 商品資訊（影片或文字） -->
      <div v-if="activeTab === 'info'">
        <div v-if="isYouTubeUrl(youtubeUrl)" class="ratio ratio-16x9">
          <iframe :src="embedYouTubeUrl(youtubeUrl)" title="YouTube video" allowfullscreen></iframe>
        </div>
        <p v-else>{{ youtubeUrl }}</p>
      </div>

      <!-- 規格說明 -->
      <div v-else-if="activeTab === 'spec'">
        <h5>商品規格</h5>
        <ul>
          <li>品牌：ABC</li>
          <li>型號：XYZ123</li>
          <li>產地：台灣</li>
        </ul>
      </div>

      <!-- 購買須知 -->
      <div v-else-if="activeTab === 'notice'">
        <h5>購買須知</h5>
        <ul>
          <li>網購包裹開箱請記得錄影、拍照，以維護自身權益</li>
          <li>請注意使用時間，避免沉迷於遊戲</li>
          <li>遊戲部分內容或服務可能須另備周邊機器或支付其他費用</li>
          <li>網站資料若有誤，請參考官方公佈資料</li>
          <li>圖片僅供參考，實際出貨為準</li>
        </ul>
      </div>

      <!-- 問與答 -->
      <div v-else-if="activeTab === 'qa'">
        <h5>常見問答</h5>
        <p class="text-danger"><strong>Q1：</strong>遊戲有支援繁體中文嗎？</p>
        <p class="text-secondary"><strong>A：</strong>有，本商城所有遊戲皆支援繁中語系。</p>

        <p class="text-danger"><strong>Q2：</strong>主機有保固期嗎？</p>
        <p class="text-secondary"><strong>A：</strong>有，本商城所有主機皆有原廠一年保固。</p>

        <p class="text-danger"><strong>Q3：</strong>運費有免運條件嗎？</p>
        <p class="text-secondary"><strong>A：</strong>商品滿2000即享有免運費優惠。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 接收父層傳入的 props
defineProps({
  youtubeUrl: {
    type: String,
    default: '',
  },
})

// 狀態
const activeTab = ref('info')
const tabs = [
  { id: 'info', name: '商品影片' },
  { id: 'spec', name: '規格說明' },
  { id: 'notice', name: '購買須知' },
  { id: 'qa', name: '問與答' },
]

// 判斷是否為 YouTube 影片網址
const isYouTubeUrl = (url) => {
  if (typeof url !== 'string') return false
  return url.includes('youtube.com/watch') || url.includes('youtu.be/')
}

// 轉換成嵌入網址
const embedYouTubeUrl = (url) => {
  let videoId = ''
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1])
    videoId = urlParams.get('v')
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]
  }
  return `https://www.youtube.com/embed/${videoId}`
}
</script>
