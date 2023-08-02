<script setup>
import { storeToRefs } from 'pinia'
import CommentItem from './CommentItem.vue'
import { useCommentsStore } from '../../store/commentsStore'

const commentsStore = useCommentsStore()
const { comments } = storeToRefs(commentsStore)
</script>

<template>
<div class="white m-4 rounded-md">
    <h3 class="bg-blue-500 text-black text-lg font-semibold p-4 rounded-t-md">Comments</h3>
    <div class="bg-blue-300 white shadow-m rounded-md p-4" v-if="comments.length === 0">
        <p v-if="comments.length === 0" class="text-gray-500 mt-4">No comments have been added yet</p>
    </div>
    <div v-else v-for="comment in comments" :key="comment.id">
        <CommentItem :comment="comment" />
    </div>
</div>
</template>