import { defineStore } from "pinia";
import { ref } from "vue";
import { handleStoreMethod } from "../utils/handleStoreMethod";
import { createCommentService, deleteCommentService, updateCommentService } from "../services/commentsService";

export const useCommentsStore = defineStore('comments', () => {
    const comments = ref([])

    const setComments = (updatedComments) => comments.value = updatedComments
    
    const createComment = async (postID, content) => {
        await handleStoreMethod(async () => {
            const comment = await createCommentService(postID, content)
            setComments([comment, ...comments.value])
        })
    }

    const deleteComment = async (commentID) => {
        await handleStoreMethod(async () => {
            await deleteCommentService(commentID)
            const updatedComments = comments.value.filter((comment) => comment.id !== commentID)
            setComments(updatedComments)
        })
    }

    const updateComment = async (commentID, content) => {
        await handleStoreMethod(async () => {
            const updatedComment = await updateCommentService(commentID, content)
            const updatedComments = comments.value.map((comment) => {
                if (comment.id === commentID) {
                    return updatedComment
                } else {
                    return comment
                }
            })
            setComments(updatedComments)
        })
    }
    return { comments, createComment, deleteComment, updateComment, setComments }
})