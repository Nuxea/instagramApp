<script setup>
import Container from "@/components/Container.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import Cards from "@/components/Cards.vue";
import LogInMessage from "@/components/LogInMessage.vue";

const userStore = useUserStore()
const {user, loadingUser} = storeToRefs(userStore)

</script>

<template>
  <Container>
    <div v-if="!loadingUser">
      <Cards v-if="user" />
      <LogInMessage v-else />
    </div>
    <div v-else class="spinner">
      <ASpin size="large" />
    </div>
  </Container>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}
</style>