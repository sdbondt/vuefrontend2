<script setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../../store/postsStore';
import PostItem from './PostItem.vue';

const postsStore = usePostsStore()
const { posts } = storeToRefs(postsStore)
</script>

<template>
    <div v-for="post in posts" :key="post.id">
        <PostItem :post="post" />
    </div>
</template>