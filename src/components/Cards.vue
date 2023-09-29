<script setup>
import Card from "@/components/Card.vue";
import {supabase} from "@/supabase";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import Observer from "@/components/Observer.vue";

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const posts = ref([])
const lastCardIndex = ref(1)
const ownerIds = ref([])
const reachEnd = ref(false)

const fetchData = async () => {
  const { data: followings } = await supabase.from("followers_following")
      .select('following_id').eq('follower_id', user.value.id)

  ownerIds.value = followings.map(f => f.following_id)

  const { data } = await supabase.from("posts")
      .select().in('owner_id', ownerIds.value).range(0,lastCardIndex.value)
      .order("created_at", {ascending: false})

  posts.value = data
}

const fetchNextSet = async () => {
  if (!reachEnd.value) {
    const {data} = await supabase.from("posts")
        .select().in('owner_id', ownerIds.value).range(lastCardIndex.value +1, lastCardIndex.value +2)
        .order("created_at", {ascending: false})

    posts.value = [
      ...posts.value,
      ...data
    ]

    lastCardIndex.value = lastCardIndex.value + 3

    if (!data.length) {
      reachEnd.value = true
    }
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="timeline-container">
    <Card v-for="data in posts" :key="data.id" :post="data" />
    <Observer v-if="posts.length" @intersect="fetchNextSet" />
  </div>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 0;
}
</style>