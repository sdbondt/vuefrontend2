<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import PostList from '../components/posts/PostList.vue'
import PostModal from '../components/posts/PostModal.vue'
import PostsToolbar from '../components/posts/PostsToolbar.vue'
import { usePostsStore } from '../store/postsStore'
import { storeToRefs } from 'pinia'

const showPostModal = ref(false)

const postsStore = usePostsStore()
const { getPosts } = postsStore
const { queryString } = storeToRefs(postsStore)

const togglePostModal = () => showPostModal.value = !showPostModal.value

onBeforeMount(async () => await getPosts())
watch(queryString, async () => await getPosts())
</script>

<template>
    <PostsToolbar @togglePostModal="togglePostModal" />
    <PostModal @togglePostModal="togglePostModal" v-if="showPostModal" />
    <PostList />
</template>