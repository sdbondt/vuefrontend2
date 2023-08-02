<script setup>
import { onClickOutside } from '@vueuse/core'
import { useCommentsStore } from '../../store/commentsStore'
import { ref } from 'vue';

const optionsElement = ref(null)
const { showAuthorOptions, comment } = defineProps(['showAuthorOptions', 'comment'])
const emits = defineEmits(['toggleAuthorOptions', 'closeAuthorOptions', 'toggleUpdateModal'])

const commentsStore = useCommentsStore()
const { deleteComment } = commentsStore

const toggleAuthorOptions = () => emits('toggleAuthorOptions')
const closeAuthorOptions = () => emits('closeAuthorOptions')
const toggleUpdateModal = () => emits('toggleUpdateModal')

const handleDeleteComment = async () => await deleteComment(comment.id)
onClickOutside(optionsElement, () => closeAuthorOptions())
</script>

<template>
    <div class="absolute top-0 right-0" ref="optionsElement">
      <button @click="toggleAuthorOptions" class="text-gray-500 border border- rounded-md hover:bg-blue-500">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm4 0c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm4 0c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z" />
        </svg>
      </button>
      <div v-if="showAuthorOptions" @click="toggleAuthorOptions" class="absolute mt-2 w-24 bg-white rounded-md shadow-lg py-2 z-10 right-0 transform">
        <button class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100" @click="toggleUpdateModal">Edit</button>
        <button class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100" @click="handleDeleteComment">Delete</button>
      </div>
    </div>
</template>