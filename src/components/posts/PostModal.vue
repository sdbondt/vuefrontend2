<script setup>
import { ref } from 'vue'
import Button from '../UI/Button.vue'
import { usePostsStore } from '../../store/postsStore'

const postContent = ref('')
const emits = defineEmits(['togglePostModal'])
const postsStore = usePostsStore()
const { createPost } = postsStore

const closeModal = () => emits('togglePostModal')
const handleCreatePost = async () => {
    await createPost(postContent.value)
    closeModal()
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900"  @click="closeModal">
        <div class="bg-blue-300 p-4 rounded-md w-96 flex flex-col justify-center items-center" @click.stop>
        <h3>Add a post</h3>
        <form @submit.prevent="handleCreatePost">
            <textarea cols="30" rows="10" v-model="postContent" placeholder="Enter your post here..."></textarea>
            <div class="flex justify-between">
                <Button>POST</Button>
                <Button @click="closeModal">CLOSE</Button>
            </div>
        </form>
        </div>
    </div>
</template>