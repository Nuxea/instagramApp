<script setup>
import {reactive, ref} from 'vue';
import { useUserStore } from '@/stores/users'
import {storeToRefs} from "pinia";

const userStore = useUserStore()

const { errorMessage } = storeToRefs(userStore)
const props = defineProps(['isLogin'])
const open = ref(false);
const loading = ref(false);

const userCredentials = reactive({
  email: "",
  username: "",
  password: ""
})

const showModal = () => {
  open.value = true;
};

const handleOk = (e) => {
  userStore.handleRegister(userCredentials)
  if (!errorMessage) {
    open.value = false;
  }
};

const handleCancel = () => {
  open.value = false;
};

const title = props.isLogin ? 'Connexion' : 'Inscription'
</script>

<template>
  <div>
    <AButton type="primary" @click="showModal">{{ title }}</AButton>
    <AModal v-model:open="open" :title="title" @ok="handleOk">
      <div class="input-container">
        <AInput v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Pseudo" type="text" />
        <AInput v-model:value="userCredentials.email" placeholder="Email" type="email" />
        <AInput v-model:value="userCredentials.password" placeholder="Mot de passe" type="password" />
        <ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
      </div>
      <template #footer>
        <a-button key="back" @click="handleCancel">Annuler</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{ title }}</a-button>
      </template>
    </AModal>
  </div>
</template>

<style scoped>
.input-container {
  gap: 10px;
  display: flex;
  flex-direction: column;
}
</style>