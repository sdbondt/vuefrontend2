<script setup>
import { ref } from 'vue'
import Button from '../UI/Button.vue'
import { usePostsStore } from '../../store/postsStore'

const emits = defineEmits(['toggleUpdateModal'])
const { post } = defineProps(['post'])
const postsStore = usePostsStore()
const { updatePost } = postsStore
const updateContent = ref(post.content)

const toggleUpdateModal = () => emits('toggleUpdateModal')
const handleUpdatePost = async () => {
    await updatePost(post.id, updateContent.value)
    toggleUpdateModal()
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900"  @click="toggleUpdateModal">
        <div class="bg-blue-300 p-4 rounded-md w-96 flex flex-col justify-center items-center" @click.stop>
        <h3>Update your post</h3>
        <form @submit.prevent="handleUpdatePost">
            <textarea cols="30" rows="10" v-model="updateContent"></textarea>
            <div class="flex justify-between">
                <Button>UPDATE</Button>
                <Button @click="toggleUpdateModal">CLOSE</Button>
            </div>
        </form>
        </div>
    </div>
</template>