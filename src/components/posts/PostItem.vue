<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import AuthorOptions from './AuthorOptions.vue'
import Anchor from '../UI/Anchor.vue'
import UpdateModal from './UpdateModal.vue'
import { useAuthStore } from '../../store/authStore'
import { createFormattedDate } from '../../utils/createFormattedDate'

const showAuthorOptions = ref(false)
const showUpdateModal = ref(false)

const router = useRouter()

const { post } = defineProps(['post'])

const authStore = useAuthStore()
const { userID } = storeToRefs(authStore)

const isAuthor = computed(() => userID.value == post.user.id)

const toggleAuthorOptions = () => showAuthorOptions.value = !showAuthorOptions.value
const closeAuthorOptions = () => showAuthorOptions.value = false 
const toggleUpdateModal = () => showUpdateModal.value = !showUpdateModal.value
const goToPost = () => router.push('/posts/' + post.id)
</script>

<template>
<div class="bg-blue-300 white shadow-md m-4 p-4 rounded-md relative">
    <!-- content and author name -->
    <p class="text-gray-700 text-lg font-semibold mb-2">{{ post.user.username }}</p>
    <p class="text-gray-700">{{ post.content }}</p>
    <!-- comments length, go to post, post createdAt -->
    <div class="flex items-center justify-start space-x-2" @click="goToPost">
        <div class="flex items-center justify-between space-x-2 hover:cursor-pointer hover:underline hover:underline-offset-4 hover:rounded-md hover:bg-blue-200">
            <p class="text-gray-600 text-sm italic">{{ createFormattedDate(post.createdAt) }}</p>
            <div class="flex items-center mt-2">
                <svg class="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.293 4.293c-.195-.195-.452-.293-.707-.293H4c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2v-9c0-.255-.122-.493-.293-.707zm-1.414 1.414L16 7.586V15c0 .552-.448 1-1 1s-1-.448-1-1V7.586l-2.879 2.879c-.293.293-.677.439-1.061.439s-.768-.146-1.061-.439l-.041-.041c-.586-.586-.586-1.536 0-2.121.586-.586 1.536-.586 2.121 0l.944.944L11.707 6.94c-.293-.293-.293-.768 0-1.061.293-.293.768-.293 1.061 0l3.536 3.536c.293.293.439.677.439 1.061s-.146.768-.439 1.061z"/>
                </svg>
                <p class="text-gray-500">{{ post.comments.length }}</p>
            </div>
        </div>
        
        <Anchor @click="goToPost">See Comments</Anchor>
    </div>
    <!-- Edit and delete options for user -->
    <AuthorOptions v-if="isAuthor" :showAuthorOptions="showAuthorOptions" :post="post" @toggleAuthorOptions="toggleAuthorOptions" @closeAuthorOptions="closeAuthorOptions" @toggleUpdateModal="toggleUpdateModal" />
</div>
<UpdateModal v-if="showUpdateModal" :post="post" @toggleUpdateModal="toggleUpdateModal" />
</template>