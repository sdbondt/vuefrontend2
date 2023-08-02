import axios from "axios"
import { handleApiError } from "../utils/handleApiError"
import { getAuthHeader } from "../utils/getAuthHeader"
const envs = import.meta.env
const postURL = envs.VITE_API_URL + 'posts/'
const commentURL = envs.VITE_API_URL + 'comments/'

export const createCommentService = async (postID, content) => {
    try {
        const res = await axios.post(postURL + postID + '/comments', { content }, getAuthHeader())
        return res.data.comment
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while creating the comment.'))
    } 
}

export const deleteCommentService = async (commentID) => {
    try {
        await axios.delete(commentURL + commentID, getAuthHeader())
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while deleting the comment.'))
    }
}

export const updateCommentService = async (commentID, content) => {
    try {
        const res = await axios.patch(commentURL + commentID, { content }, getAuthHeader())
        return res.data.comment
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while updating the comment.'))
    }
}