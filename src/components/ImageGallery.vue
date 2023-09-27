<script setup>

const props = defineProps(['posts'])
</script>

<template>
  <div class="image-gallery-container">
    <img v-for="post in props.posts" :key="post.id" :src="`https://csqonlcnfljufnuyipuj.supabase.co/storage/v1/object/public/images/${post.url}`" :alt="post.title">
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