<script setup>
import { onBeforeMount, watch, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Button from '../components/UI/Button.vue'
import AuthorOptions from '../components/posts/AuthorOptions.vue'
import CommentModal from '../components/comments/CommentModal.vue'
import UpdateModal from '../components/posts/UpdateModal.vue'
import NoPostFound from '../components/posts/NoPostFound.vue'
import CommentsList from '../components/comments/CommentsList.vue'
import { usePostsStore } from '../store/postsStore';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/authStore';
import { useCommentsStore } from '../store/commentsStore'
import { createFormattedDate } from '../utils/createFormattedDate.js'

const postsStore = usePostsStore()
const authStore = useAuthStore()
const commmentsStore = useCommentsStore()
const { getPost } = postsStore
const { post } = storeToRefs(postsStore)
const { userID } = storeToRefs(authStore)
const { comments } = storeToRefs(commmentsStore)

const route = useRoute()

const showAuthorOptions = ref(false)
const showUpdateModal = ref(false)
const showCommentModal = ref(false)

const postID = computed(() => route.params.postID)
const isAuthor = computed(() => userID.value == post.value.user?.id)

const toggleAuthorOptions = () => showAuthorOptions.value = !showAuthorOptions.value
const closeAuthorOptions = () => showAuthorOptions.value = false
const toggleUpdateModal = () => showUpdateModal.value = !showUpdateModal.value
const toggleCommentModal = () => showCommentModal.value = !showCommentModal.value

onBeforeMount(async () => await getPost(postID.value))
watch(postID, async () => await getPost(postID.value))

document.title = post.value.user ? `Post by ${post.value.user.username}`: 'Post'
</script>

<template>
<!-- No post found -->
<NoPostFound v-if="!post" />
<!-- Post found -->
<div v-else>
    <div class="bg-blue-300 white shadow-md m-4 p-4 rounded-md relative">
        <!-- content and author name -->
        <p class="text-gray-700 text-lg font-semibold mb-2">{{ post.user?.username }}</p>
        <p class="text-gray-600">{{ post.content }}</p>
        <!-- comments length,  post createdAt -->
        <div class="flex items-center justify-start space-x-2">
            <p class="text-gray-600 text-sm italic">{{ createFormattedDate(post.createdAt) }}</p>
            <div class="flex items-center mt-2">
                <svg class="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.293 4.293c-.195-.195-.452-.293-.707-.293H4c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2v-9c0-.255-.122-.493-.293-.707zm-1.414 1.414L16 7.586V15c0 .552-.448 1-1 1s-1-.448-1-1V7.586l-2.879 2.879c-.293.293-.677.439-1.061.439s-.768-.146-1.061-.439l-.041-.041c-.586-.586-.586-1.536 0-2.121.586-.586 1.536-.586 2.121 0l.944.944L11.707 6.94c-.293-.293-.293-.768 0-1.061.293-.293.768-.293 1.061 0l3.536 3.536c.293.293.439.677.439 1.061s-.146.768-.439 1.061z"/>
                </svg>
                <p class="text-gray-500">{{ comments.length }}</p>
            </div>
        </div>
        <!-- Button to display comment modal -->
        <Button @click="toggleCommentModal">Add Comment</Button>
        <!-- Edit and delete options for author -->
        <AuthorOptions
            v-if="isAuthor"
            :showAuthorOptions="showAuthorOptions"
            :post="post"
            @toggleAuthorOptions="toggleAuthorOptions"
            @closeAuthorOptions="closeAuthorOptions"
            @toggleUpdateModal="toggleUpdateModal" />
    </div>
    <!-- List of comments -->
    <CommentsList />
</div>
<!--  Update and comment modal -->
<UpdateModal :post="post" v-if="showUpdateModal" @toggleUpdateModal="toggleUpdateModal" />
<CommentModal v-if="showCommentModal"  @toggleCommentModal="toggleCommentModal" />
</template>