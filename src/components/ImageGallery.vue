<script setup>

const props = defineProps(['posts'])
const { VITE_BASE_PHOTO_URL } = import.meta.env
</script>

<template>
  <div class="image-gallery-container">
    <img v-for="post in props.posts" :key="post.id" :src="`${VITE_BASE_PHOTO_URL}${post.url}`" :alt="post.title">
  </div>
</template>

<style scoped>
.image-gallery-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 15px;
}

.image-gallery-container img {
  width: 200px;
  object-fit: cover;
  border-radius: 5px;
}
</style>