import axios from "axios"
import { handleApiError } from "../utils/handleApiError"
import { getAuthHeader } from "../utils/getAuthHeader"

const envs = import.meta.env
const postsURL = envs.VITE_API_URL + 'posts/'

export const getPostsService = async (queryString) => {
    try {
        const res = await axios.get(postsURL + queryString, getAuthHeader())
        return res.data
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while fetching the posts.')) 
    }
}

export const getPostService = async (postID) => {
    try {
        const res = await axios.get(postsURL + postID, getAuthHeader())
        return res.data.post
    } catch (e) {
        if (e.response.data.msg === 'No post found.') {
            return null
        } else {
            throw new Error(handleApiError(e, 'Something went wrong while fetching the posts.'))
        } 
    }
}

export const createPostService = async (content) => {
    try {
        const res = await axios.post(postsURL, { content }, getAuthHeader())
        return res.data
    } catch (e) {
        throw new Error(handleApiError(e), 'Something went wrong while creating your post.')
    }
}

export const updatePostService = async (postID, content) => {
    try {
        const res = await axios.patch(postsURL + postID, { content }, getAuthHeader())
        return res.data.post
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while updating your post.'))
    }
}

export const deletePostService = async (postID) => {
    try {
        await axios.delete(postsURL + postID, getAuthHeader())
    } catch (e) {
        throw new Error(handleApiError(e, 'Something went wrong while deleting your post.'))
    }
}