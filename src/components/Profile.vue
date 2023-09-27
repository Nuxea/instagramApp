<script setup>
import Container from "@/components/Container.vue";
import UserBar from "@/components/UserBar.vue";
import ImageGallery from "@/components/ImageGallery.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {supabase} from "@/supabase";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const route = useRoute()
const userStore = useUserStore()
const { username } = route.params
const { user: loggedInUser } = storeToRefs(userStore)

const user = ref(null)
const isFollowing = ref(false)
const posts = ref([])
const loading = ref(false)
const userInfo = reactive({
  posts: null,
  followers: null,
  following: null
})
const addNewPost = (post) => {
  posts.value.unshift(post)
  userInfo.posts = userInfo.posts +1
}

const fetchData = async () => {
  loading.value = true
  const { data: userData } = await supabase.from("users")
      .select()
      .eq("username", username)
      .single()

  if (!userData) {
    loading.value = false
    return user.value = null
  }

  user.value = userData

  const { data: postsData } = await supabase.from("posts")
      .select()
      .eq("owner_id", user.value.id)

  posts.value = postsData

  await fetchIsFollowing()
  const followerCount = await fetchFollowerCount()
  const followingCount = await fetchFollowingCount()

  userInfo.posts = posts.value.length
  userInfo.followers = followerCount
  userInfo.following = followingCount

  loading.value = false
}

const fetchIsFollowing = async () => {
  if (loggedInUser.value && (loggedInUser.value.id !== user.value.id)) {
    const { data } = await supabase
        .from("followers_following")
        .select()
        .eq("follower_id", loggedInUser.value.id)
        .eq("following_id", user.value.id)
        .single()

    if (data) isFollowing.value = true
  }
}

const fetchFollowerCount = async () => {
  const { count } = await supabase.from("followers_following")
      .select('*', { count: 'exact' })
      .eq("following_id", user.value.id)

  return count
}

const fetchFollowingCount = async () => {
  const { count } = await supabase.from("followers_following")
      .select('*', { count: 'exact' })
      .eq("follower_id", user.value.id)

  return count
}

const updateIsFollowing = (follow) => {
  isFollowing.value = follow
}

watch(loggedInUser, () => {
  fetchIsFollowing()
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <Container>
    <div v-if="!loading" class="profile-container">
      <UserBar
          :key="$route.params.username"
          :addNewPost="addNewPost"
          :user="user"
          :isFollowing="isFollowing"
          :updateIsFollowing="updateIsFollowing"
          :userInfo="userInfo"
      />
      <ImageGallery :posts="posts" />
    </div>
    <div v-else class="spinner">
      <ASpin size="large" />
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

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}
</style>