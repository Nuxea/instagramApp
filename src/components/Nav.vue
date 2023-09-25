<script setup>
import {ref} from "vue";
import AuthModal from "@/components/AuthModal.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const searchUsername = ref('')
const isAuthenticated = ref(false)

const onSearch = () => {
  if (searchUsername.value) {
    router.push(`/profile/${searchUsername.value}`)
    searchUsername.value = ""
  }
}
</script>

<template>
  <ALayoutHeader>
    <div class="nav-container">
      <div class="right-content">
        <RouterLink to="/">INSTAGRAM</RouterLink>
      </div>
      <div v-if="!isAuthenticated" class="left-content">
        <AInputSearch
            v-model:value="searchUsername"
            placeholder="Pseudo..."
            style="width: 200px"
            @search="onSearch"
        />
        <AuthModal :is-login="false" />
        <AuthModal :is-login="true" />
      </div>
      <div v-else class="left-content">
        <AButton ghost>Mon Compte</AButton>
        <AButton type="primary" ghost>Déconnexion</AButton>
      </div>
    </div>
  </ALayoutHeader>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  background-color: #3b3b3b;
  padding: 20px;
}
.nav-container {
  display: flex;
  justify-content: space-between;
}

.right-content, .left-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.right-content a {
  color: #fff;
  text-decoration: none;
}

</style>