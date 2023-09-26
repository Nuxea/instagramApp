<script setup>
import UploadImageModal from "@/components/UploadImageModal.vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const route = useRoute()
const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const { username: profileUsername } = route.params
const props = defineProps(['username', 'userInfo'])
</script>

<template>
  <div class="userbar-container">
    <div class="top-content">
      <ATypographyTitle :level="2">{{ props.username }}</ATypographyTitle>
      <UploadImageModal v-if="user && profileUsername === user.username" />
    </div>
    <div class="bottom-content">
      <ATypographyTitle :level="5">{{ props.userInfo.posts }} posts</ATypographyTitle>
      <ATypographyTitle :level="5">{{ props.userInfo.followers }} followers</ATypographyTitle>
      <ATypographyTitle :level="5">{{ props.userInfo.following }} following</ATypographyTitle>
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px;
}

.userbar-container h2, .userbar-container h5 {
  color: inherit!important;
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bottom-content h5 {
  margin: 0 !important;
  padding: 0;
  align-items: center;
}
</style>