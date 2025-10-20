/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Loading overlay
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

// Bootstrap icons & JS bundle
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

// vee-validate & i18n
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// App & router & mixin & filters
import App from './App.vue'
import router from './router'
import { currency } from '@/utils/filter' // 建議用 @ 路徑

const app = createApp(App)
const pinia = createPinia()

// 全域 filter（Vue 3 仍可用 globalProperties）
app.config.globalProperties.$filters = { currency }

// 動態註冊所有 vee-validate 規則
Object.entries(AllRules).forEach(([name, rule]) => {
  if (typeof rule === 'function') defineRule(name, rule)
})

// vee-validate 設定（繁中、輸入即驗證）
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
})
setLocale('zh_TW')

// plugins
app.use(pinia)
app.use(router)
app.use(VueAxios, axios)

// 全域 mixin & components
app.component('Loading', Loading)
app.component('VeeForm', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')