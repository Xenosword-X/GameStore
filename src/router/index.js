// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/frontend/views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },

  { path: '/login', component: () => import('@/backend/views/AdminLogin.vue') },

  {
    path: '/customize',
    component: () => import('@/frontend/views/Customize.vue'),
    redirect: '/customize/CInfo',
    children: [
      { path: 'CInfo', component: () => import('@/frontend/views/CInfo.vue') },
      { path: 'CPrice', component: () => import('@/frontend/views/CPrice.vue') },
      { path: 'CForm', component: () => import('@/frontend/views/CForm.vue') },
    ],
  },

  { path: '/questions', component: () => import('@/frontend/views/Questions.vue') },
  { path: '/cart', component: () => import('@/frontend/views/UserCarlist.vue') },
  { path: '/product/:productId', component: () => import('@/frontend/views/UserProduct.vue') },

  {
    path: '/dashboard',
    component: () => import('@/backend/views/Dashboard.vue'),
    children: [
      { path: 'products', component: () => import('@/backend/views/Products.vue') },
      { path: 'articles', component: () => import('@/backend/views/Articles.vue') },
      { path: 'orders', component: () => import('@/backend/views/Orders.vue') },
      { path: 'coupons', component: () => import('@/backend/views/Coupons.vue') },
    ],
  },

  {
    path: '/user',
    component: () => import('@/frontend/views/UserBoard.vue'),
    children: [
      { path: 'form', component: () => import('@/frontend/views/UserForm.vue') },
      { path: 'checkout/:orderId', component: () => import('@/frontend/views/UserCheckout.vue') },
    ],
  },

  // 404 最後放
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(), // hash 模式，無需傳 base
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
