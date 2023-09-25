<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['isLogin'])
const visible = ref<boolean>(false);
const loading = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

const title = props.isLogin ? 'Connexion' : 'Inscription'
</script>

<template>
  <div>
    <AButton type="primary" @click="showModal">{{ title }}</AButton>
    <AModal v-model:visible="visible" :title="title" @ok="handleOk">
      <div class="input-container">
        <AInput v-if="!isLogin" v-model:value="value" placeholder="Username" />
        <AInput v-model:value="value" placeholder="Email" />
        <AInput v-model:value="value" placeholder="Password" />
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