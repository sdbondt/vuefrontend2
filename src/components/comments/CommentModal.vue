<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Button from '../UI/Button.vue'
import { useCommentsStore } from '../../store/commentsStore'
import { usePostsStore } from '../../store/postsStore'

const commentContent = ref('')

const emits = defineEmits(['toggleCommentModal'])

const commentsStore = useCommentsStore()
const postsStore = usePostsStore()
const { createComment } = commentsStore
const { post } = storeToRefs(postsStore)

const toggleCommentModal = () => emits('toggleCommentModal')
const handleCreateComment = async () => {
    await createComment(post.value.id, commentContent.value)
    toggleCommentModal()
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900"  @click="toggleCommentModal">
        <div class="bg-blue-300 p-4 rounded-md w-96 flex flex-col justify-center items-center" @click.stop>
        <h3>Add a comment</h3>
        <form @submit.prevent="handleCreateComment">
            <textarea cols="30" rows="10" v-model="commentContent"></textarea>
            <div class="flex justify-between">
                <Button>COMMENT</Button>
                <Button @click="toggleCommentModal">CLOSE</Button>
            </div>
        </form>
        </div>
    </div>
</template>