<script setup>
import {ref} from "vue";
import AuthModal from "@/components/AuthModal.vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const userStore = useUserStore()

const { user, loadingUser } = storeToRefs(userStore)
const router = useRouter()
const searchUsername = ref('')
// const isAuthenticated = ref(false)

const onSearch = () => {
  if (searchUsername.value) {
    router.push(`/profile/${searchUsername.value}`)
    searchUsername.value = ""
  }
}

const handleLogout = async () => {
  await userStore.handleLogout()
}
</script>

<template>
  <ALayoutHeader>
    <div class="nav-container">
      <div class="right-content">
        <RouterLink to="/">INSTAGRAM</RouterLink>
        <AInputSearch
            v-model:value="searchUsername"
            placeholder="Pseudo..."
            style="width: 400px"
            @search="onSearch"
        />
      </div>

      <div v-if="!loadingUser" class="content">
        <div v-if="!user" class="left-content">
          <AuthModal :is-login="false" />
          <AuthModal :is-login="true" />
        </div>
        <div v-else class="left-content">
          <AButton ghost>Mon Compte</AButton>
          <AButton @click="handleLogout" type="primary" ghost>Déconnexion</AButton>
        </div>
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

.content {
  display: flex;
  align-items: center;
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