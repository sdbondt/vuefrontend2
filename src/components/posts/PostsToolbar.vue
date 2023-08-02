<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Button from '../UI/Button.vue'
import SearchBar from './SearchBar.vue'
import SearchTools from './SearchTools.vue'
import { usePostsStore } from '../../store/postsStore'

const showTools = ref(false)
const postsStore = usePostsStore()
const { totalCount, displayedPostsCount } = storeToRefs(postsStore)

const emits = defineEmits(['togglePostModal'])

const togglePostModal = () => emits('togglePostModal')
const toggleShowTools = () => showTools.value = !showTools.value
</script>

<template>
    <div class="flex flex-col mx-2 my-4">
        <div class="flex justify-between items-center">
            <SearchBar />
            <p @click="toggleShowTools">Tools </p>
            <Button @click="togglePostModal" >Add Post</Button>
        </div>
        <div class="h-12">
            <p v-if="!showTools">{{ displayedPostsCount }} {{ displayedPostsCount === 1 ? 'result': 'results' }} out of {{ totalCount }}</p>
            <SearchTools v-if="showTools" />
        </div>
    </div>  
</template>