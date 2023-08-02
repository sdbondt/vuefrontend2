<script setup>
import { ref } from 'vue';
import Button from '../UI/Button.vue';
import { useCommentsStore } from '../../store/commentsStore';

const { comment } = defineProps(['comment'])
const emits = defineEmits(['toggleUpdateModal'])

const updateContent = ref(comment.content)

const commentsStore = useCommentsStore()
const { updateComment } = commentsStore

const toggleUpdateModal = () => emits('toggleUpdateModal')

const handleUpdateComment = async () => {
    await updateComment(comment.id, updateContent.value)
    toggleUpdateModal()
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900"  @click="toggleUpdateModal">
        <div class="bg-blue-300 p-4 rounded-md w-96 flex flex-col justify-center items-center" @click.stop>
        <h3>Update Comment</h3>
        <form @submit.prevent="handleUpdateComment">
            <textarea cols="30" rows="10" v-model="updateContent"></textarea>
            <div class="flex justify-between">
                <Button>UPDATE</Button>
                <Button @click="toggleUpdateModal">CLOSE</Button>
            </div>
        </form>
        </div>
    </div>
</template>