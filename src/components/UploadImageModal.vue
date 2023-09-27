<script setup>
import { ref } from 'vue';
import {supabase} from "@/supabase";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/users";

const userStore = useUserStore()
const {user} = storeToRefs(userStore);
const props = defineProps(['addNewPost'])

const loading = ref(false);
const errorMessage = ref("")
const open = ref(false);
const caption = ref("");
const file = ref(null)


const showModal = () => {
  open.value = true;
};

const handleUploadChange = (e) => {
  if(e.target.files[0]){
    file.value = e.target.files[0]
  }
}

const handleOk = async () => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 10000000000000000)
  let filePath
  if (file.value) {
    const { data, error } = await supabase.storage.from("images").upload('public/' + fileName, file.value)

    if (error) {
      loading.value = false
      return errorMessage.value = "Impossible d'envoyer l'image"
    }

    filePath = data.path
    await supabase.from("posts").insert({
      url: filePath,
      caption: caption.value,
      owner_id: user.value.id
    })
  }
  loading.value = false
  open.value = false
  caption.value = ""
  props.addNewPost({
    url: filePath,
    caption: caption.value,
  })
};
const handleCancel = () => {
  open.value = false;
};

</script>

<template>
  <div>
    <AButton @click="showModal">Ajouter Image</AButton>
    <AModal v-model:open="open" title="Ajouter une image" @ok="handleOk">
      <template #footer>
        <AButton key="back" @click="handleCancel">Annuler</AButton>
        <AButton key="submit" type="primary" :loading="loading" @click="handleOk">Ajouter</AButton>
      </template>
      <div v-if="!loading" class="upload-container">
        <ASpace direction="vertical">
          <AInput @change="handleUploadChange" type="file" accept="image/jpeg, image/png" />
          <AInput v-model:value="caption" :maxlength="50" placeholder="Légende..." />
          <ATypographyText v-if="errorMessage" type="danger">{{errorMessage}}</ATypographyText>
        </ASpace>
      </div>
      <div v-else class="spinner" >
        <ASpin size="large" />
      </div>
    </AModal>
  </div>
</template>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>