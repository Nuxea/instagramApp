<script setup>
import Container from "@/components/Container.vue";
import UserBar from "@/components/UserBar.vue";
import ImageGallery from "@/components/ImageGallery.vue";
</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar
          username="Nuxea"
          :userInfo="{
            posts: 4,
            followers: 1000,
            following: 50
          }"
      />
      <ImageGallery :posts="[
                      {
                        id: 1,
                        image: 'https://images4.alphacoders.com/131/thumb-1920-1314559.png',
                        title: 'Nezuko',
                      },
                      {
                        id: 2,
                        image: 'https://cst.brightspotcdn.com/dims4/default/c528a15/2147483647/strip/true/crop/3381x1930+219+0/resize/1461x834!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2F1HSveDedEc0uazJsotjcan4brh8%3D%2F0x0%3A3600x1930%2F3600x1930%2Ffilters%3Afocal%282442x863%3A2443x864%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24578258%2FChupa__Native__00_46_18_13r.jpg',
                        title: 'Chupacabra',
                      },
                    ]" />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 0;
}
</style>