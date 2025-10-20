<template>
  <UserNavbar
    v-if="
      $route.path.startsWith('/product') ||
      $route.path.startsWith('/user') ||
      $route.path === '/' ||
      $route.path.startsWith('/customize') ||
      $route.path === '/questions' ||
      $route.path === '/cart'
    "
  />
  <router-view />
  <Floating-Cart
    v-if="
      $route.path.startsWith('/product') ||
      $route.path.startsWith('/user') ||
      $route.path === '/' ||
      $route.path.startsWith('/customize') ||
      $route.path === '/questions' ||
      $route.path === '/cart'
    "
  />
  <Footer
    v-if="
      $route.path.startsWith('/product') ||
      $route.path.startsWith('/user') ||
      $route.path === '/' ||
      $route.path.startsWith('/customize') ||
      $route.path === '/questions' ||
      $route.path === '/cart'
    "
  />
</template>

<script setup>
import UserNavbar from './frontend/components/UserNavbar.vue'
import Footer from './frontend/components/Footer.vue'
import FloatingCart from './frontend/components/FloatingCart.vue'
</script>

<style lang="scss">
@import './assets/all.scss';
</style>
