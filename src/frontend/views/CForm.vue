<template>
  <div class="container">
    <h2 class="mb-4 title">客製服務詢問</h2>
    <p class="text-muted">對客製服務還不是很了解嗎?請填寫以下表單，我們有專人會跟您聯繫</p>
    <Form @submit="onSubmit" v-slot="{ errors }">
      <div class="mb-3">
        <label for="name" class="form-label">姓名 *</label>
        <Field id="name" name="姓名" type="text" class="form-control" rules="required"
          placeholder="請輸入姓名" :class="{ 'is-invalid': errors['姓名'] }"
        />
        <ErrorMessage name="姓名" class="invalid-feedback" />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">聯絡電話 *</label>
        <Field id="phone" name="電話" type="tel" class="form-control" rules="required"
          placeholder="請輸入電話" :class="{ 'is-invalid': errors['電話'] }"
        />
        <ErrorMessage name="電話" class="invalid-feedback" />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">地址 *</label>
        <Field id="address" name="地址" type="text" class="form-control" rules="required"
          placeholder="請輸入地址" :class="{ 'is-invalid': errors['地址'] }"
        />
        <ErrorMessage name="地址" class="invalid-feedback" />
      </div>
      <div class="mb-3">
        <label for="note" class="form-label">備註</label>
        <Field id="note" name="note" as="textarea" class="form-control" rows="3"
        placeholder="備註"/>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">上傳圖片（讓我們了解你想要圖片的樣式符不符合我們的客製規格）</label>
        <input id="image" type="file" class="form-control" accept="image/*"
          @change="handleImageUpload"
        />
        <div v-if="previewUrl" class="mt-3">
          <p class="mb-2">圖片預覽：</p>
          <img :src="previewUrl" alt="預覽圖" class="img-fluid rounded border" style="max-width: 300px;" />
        </div>
      </div>
      <button type="submit" class="btn btn-outline-primary">送出表單</button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

const previewUrl = ref('')

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    previewUrl.value = URL.createObjectURL(file)
  }
}

const onSubmit = () => {
  previewUrl.value = ''
  showToast('success', 'Your inquiry has been submitted. We will contact you soon!')
}
</script>

<style lang="scss" scoped>
.title {
  @include custom-title-style;
}
</style>
