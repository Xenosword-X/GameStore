<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="quiz-wrapper">
    <div class="quiz-box bg-white p-4 rounded shadow-sm">
      <h3 class="text-center mb-3 title">問答抽獎</h3>
      <p v-if="!isQualified" class="text-center text-secondary">答對 8 題以上即可參加抽獎！</p>

      <!-- 問答區 -->
      <form v-if="!isQualified" @submit.prevent="submitQuiz">
        <div v-for="(question, index) in questions" :key="index" class="mb-4">
          <p class="question-title">{{ index + 1 }}. {{ question.title }}</p>
          <div
            v-for="(option, optIndex) in question.options"
            :key="optIndex"
            class="form-check ps-3"
          >
            <input
              class="form-check-input"
              type="radio"
              :name="'question' + index"
              :id="`q${index}_opt${optIndex}`"
              :value="option.value"
              v-model="userAnswers[index]"
              required
            />
            <label class="form-check-label" :for="`q${index}_opt${optIndex}`">
              {{ option.label }}
            </label>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary px-4">送出答案</button>
        </div>
      </form>

      <!-- 抽獎區 -->
      <div v-else class="text-center">
        <h4 class="text-success">你答對了 {{ score }} 題 🎉</h4>
        <p>恭喜你可以參加抽獎！抽到的優惠券如下：</p>
        <div class="alert alert-success text-start mx-auto" style="max-width: 400px">
          <strong>{{ selectedCoupon.title }}</strong
          ><br />
          代碼：<code>{{ selectedCoupon.code }}</code
          ><br />
          {{ selectedCoupon.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import confetti from 'canvas-confetti'

// 題目資料
const questions = ref([
  {
    title: '任天堂Switch在哪一年發售?',
    options: [
      { label: '2016', value: 'A' },
      { label: '2017', value: 'B' },
      { label: '2018', value: 'C' },
    ],
    answer: 'B',
  },
  {
    title: 'PS5光碟版在台灣首發定價是?',
    options: [
      { label: '11880', value: 'A' },
      { label: '13480', value: 'B' },
      { label: '15980', value: 'C' },
    ],
    answer: 'C',
  },
  {
    title: '下列哪一款遊戲不是PS4首發遊戲?',
    options: [
      { label: '惡名昭彰：第二之子', value: 'A' },
      { label: '刺客教條IV：黑旗', value: 'B' },
      { label: '決勝時刻：魅影', value: 'C' },
    ],
    answer: 'A',
  },
  {
    title: 'Sony的訂閱服務PlayStation Plus。是在哪一年推出?',
    options: [
      { label: '2009', value: 'A' },
      { label: '2010', value: 'B' },
      { label: '2011', value: 'C' },
    ],
    answer: 'B',
  },
  {
    title: '任天堂旗下遊戲"異度神劍"，是由哪一個開發商開發?',
    options: [
      { label: 'RetroStudios', value: 'A' },
      { label: 'Gamefreak', value: 'B' },
      { label: 'Monolith', value: 'C' },
    ],
    answer: 'C',
  },
  {
    title: '"聖火降魔錄"系列中，哪一款是最新發售的作品?',
    options: [
      { label: '聖火降魔錄 Engage', value: 'A' },
      { label: '聖火降魔錄 覺醒', value: 'B' },
      { label: '聖火降魔錄 風花雪月', value: 'C' },
    ],
    answer: 'A',
  },
  {
    title: '"戰神3"中，哪一個是主角克雷多斯能用到的武器?',
    options: [
      { label: '德羅普尼爾長矛', value: 'A' },
      { label: '混沌之刃', value: 'B' },
      { label: '利維坦之斧', value: 'C' },
    ],
    answer: 'B',
  },
  {
    title: 'Sony最新主機"PS5 Pro"，用上了哪一個AI Upscale技術?',
    options: [
      { label: 'FSR4', value: 'A' },
      { label: 'DLSS3', value: 'B' },
      { label: 'PSSR', value: 'C' },
    ],
    answer: 'C',
  },
  {
    title: '下列一項外設，是PS4時期出的配備?',
    options: [
      { label: 'PS Move', value: 'A' },
      { label: 'PSVR', value: 'B' },
      { label: 'PSVR2', value: 'C' },
    ],
    answer: 'B',
  },
  {
    title: '任天堂最新主機Switch2，內置多少的儲存空間?',
    options: [
      { label: '128GB', value: 'A' },
      { label: '256GB', value: 'B' },
      { label: '512GB', value: 'C' },
    ],
    answer: 'B',
  },
])

// 狀態
const userAnswers = ref(Array(10).fill(''))
const score = ref(0)
const isQualified = ref(false)
const selectedCoupon = ref({})

// 優惠券清單
const couponList = ref([
  { code: 'asd80', title: '8折折扣券', description: '全商品打8折' },
  { code: 'asd85', title: '85折折扣券', description: '全商品打85折' },
  { code: 'asd90', title: '9折折扣券', description: '全商品打9折' },
])

// 提交問卷
const submitQuiz = () => {
  let total = 0
  for (let i = 0; i < questions.value.length; i++) {
    if (questions.value[i].answer === userAnswers.value[i]) {
      total++
    }
  }
  score.value = total

  if (score.value >= 8) {
    window.scrollTo(0, 0)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    isQualified.value = true
    const randomIndex = Math.floor(Math.random() * couponList.value.length)
    selectedCoupon.value = couponList.value[randomIndex]
  } else {
    alert(`你只答對了 ${score.value} 題，未達抽獎資格 😢`)
  }
}
</script>

<style lang="scss" scoped>
.quiz-wrapper {
  @include background-color;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.quiz-box {
  max-width: 700px;
  width: 100%;
}
p.question-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #343a40;
  margin-bottom: 0.5rem;
}
.form-check-label {
  color: #6c757d;
  margin-left: 0.25rem;
}
.alert-success {
  font-size: 1.1rem;
  line-height: 1.6;
}
.title {
  @include custom-title-style;
}
</style>
