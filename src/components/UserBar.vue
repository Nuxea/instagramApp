<script setup>
import UploadImageModal from "@/components/UploadImageModal.vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const route = useRoute()
const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const { username: profileUsername } = route.params
const props = defineProps(['user', 'userInfo', 'addNewPost'])
</script>

<template>
  <div v-if="props.user" class="userbar-container">
    <div class="top-content">
      <ATypographyTitle :level="2">{{ props.user.username }}</ATypographyTitle>
      <UploadImageModal v-if="user && profileUsername === user.username" :addNewPost="addNewPost" />
    </div>
    <div class="bottom-content">
      <ATypographyTitle :level="5">{{ props.userInfo.posts }} posts</ATypographyTitle>
      <ATypographyTitle :level="5">{{ props.userInfo.followers }} followers</ATypographyTitle>
      <ATypographyTitle :level="5">{{ props.userInfo.following }} following</ATypographyTitle>
    </div>
  </div>
  <div v-else class="userbar-container">
    <div class="top-content">
      <ATypographyTitle :level="2">Cet utilisateur n'existe pas</ATypographyTitle>
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