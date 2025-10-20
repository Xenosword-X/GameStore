<template>
  <div class="background">
    <div class="checkout-layout container py-5">
      <div class="text-center mb-4">
        <h2 v-if="$route.path.includes('/form')" class="fw-bold title">填寫表單</h2>
        <h2 v-if="$route.path.includes('/checkout')" class="fw-bold title">確認訂單</h2>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBoard',
}
</script>

<style scoped lang="scss">
.checkout-steps {
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  span.active {
    color: #dc3545;
    font-weight: bold;
  }
}
.title {
  @include custom-title-style;
}
.background {
  @include background-color;
}
</style>
