<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import UpdateModal from './UpdateModal.vue'
import AuthorOptions from './AuthorOptions.vue'
import { createFormattedDate } from '../../utils/createFormattedDate'
import { useAuthStore } from '../../store/authStore'

const showAuthorOptions = ref(false)
const showUpdateModal = ref(false)

const { comment } = defineProps(['comment'])

const authStore = useAuthStore()
const { userID } = storeToRefs(authStore)

const isAuthor = computed(() => comment.user.id === userID.value)

const toggleAuthorOptions = () => showAuthorOptions.value = !showAuthorOptions.value
const closeAuthorOptions = () => showAuthorOptions.value = false
const toggleUpdateModal = () => showUpdateModal.value = !showUpdateModal.value
</script>

<template>
    <div class="bg-blue-300 white shadow-md mb-4 p-4 rounded-md relative">
        <p class="text-gray-700 text-lg font-semibold mb-2">{{ comment.user.username }}</p>
        <p class="text-gray-700">{{ comment.content }}</p>
        <p class="text-gray-600 text-sm italic">{{ createFormattedDate(comment.createdAt) }}</p>
        <AuthorOptions v-if="isAuthor"
            :comment="comment"
            :showAuthorOptions="showAuthorOptions"
            @toggleAuthorOptions="toggleAuthorOptions"
            @closeAuthorOptions="closeAuthorOptions"
            @toggleUpdateModal="toggleUpdateModal" />
    </div>
    <UpdateModal v-if="showUpdateModal" :comment="comment" @toggleUpdateModal="toggleUpdateModal" />
</template>