<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 上一頁 -->
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <!-- 頁碼列表 -->
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>

      <!-- 下一頁 -->
      <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
/**
 * 父層用法：
 * <Pagination :pages="pagination" @emit-pages="getProducts" />
 */

defineProps({
  pages: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['emit-pages'])

const updatePage = (page) => {
  emit('emit-pages', page)
}
</script>
