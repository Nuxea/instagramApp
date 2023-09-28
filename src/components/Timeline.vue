<script setup>
import Container from "@/components/Container.vue";
import Card from "@/components/Card.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {user, loadingUser} = storeToRefs(userStore)
const datas = [
  {
    id: 1,
    username: "Nuxea",
    url: "https://images4.alphacoders.com/131/thumb-1920-1314559.png",
    caption: ""
  },
  {
    id: 2,
    username: "Chupacabra",
    url: "https://cst.brightspotcdn.com/dims4/default/c528a15/2147483647/strip/true/crop/3381x1930+219+0/resize/1461x834!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2F1HSveDedEc0uazJsotjcan4brh8%3D%2F0x0%3A3600x1930%2F3600x1930%2Ffilters%3Afocal%282442x863%3A2443x864%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24578258%2FChupa__Native__00_46_18_13r.jpg",
    caption: "blablabla"
  },
]
</script>

<template>
  <Container>
    <div v-if="!loadingUser">
      <div v-if="user" class="timeline-container">
        <Card v-for="data in datas" :key="data.id" :post="data" />
      </div>
      <div v-else class="timeline-container">
        <h3>Connectez-vous pour voir les publications</h3>
      </div>
    </div>
    <div v-else class="spinner">
      <ASpin size="large" />
    </div>
  </Container>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 0;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}
</style>