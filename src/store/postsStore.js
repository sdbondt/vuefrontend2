import { defineStore } from "pinia";
import { handleStoreMethod } from "../utils/handleStoreMethod";
import { createPostService, deletePostService, getPostService, getPostsService, updatePostService } from "../services/postsService";
import { computed, ref, reactive } from "vue";
import { createQueryString } from "../utils/createQueryString";
import { useCommentsStore } from "./commentsStore";


export const usePostsStore = defineStore('posts', () => {
    const posts = ref([])
    const post = ref({})
    const searchParams = reactive({
        page: 1,
        limit: 10,
        direction: 'asc',
        q: ''
    })
    const totalCount = ref(0)
    const maxPage = computed(() => parseInt(Math.ceil(totalCount.value/searchParams.limit), 10))
    const queryString = computed(() => createQueryString(searchParams))
    const displayedPostsCount = computed(() => posts.value.length)

    const commentsStore = useCommentsStore()
    const { setComments } = commentsStore

    const setPosts = (updatedPosts) => posts.value = updatedPosts
    const setPost = (updatedPost) => post.value = updatedPost
    const changeParams = (name, value) => searchParams[name] = value

    const getPosts = async () => {
        await handleStoreMethod(async () => {
            const { posts: fetchedPosts, totalCount: fetchedTotalCount } = await getPostsService(queryString.value)
            setPosts(fetchedPosts)
            totalCount.value = fetchedTotalCount
        })
    }

    const getPost = async (postID) => {
        await handleStoreMethod(async () => {
            const fetchedPost = await getPostService(postID)
            if (!fetchedPost) {
                setPost(null)
            } else {
                setPost(fetchedPost)
                setComments(fetchedPost.comments)
            }
        })
    }

    const createPost = async (postContent) => {
        await handleStoreMethod(async () => {
            const createdPost = await createPostService(postContent)
            setPosts([createdPost, ...posts.value])
            totalCount.value++
        })
    }

    const updatePost = async (postID, postData) => {
        await handleStoreMethod(async () => {
            const updatedPost = await updatePostService(postID, postData)
            const updatedPosts = posts.value.map((el) => {
                if (el.id === postID) return updatedPost
                else {
                    return el
                }
            })
            setPosts(updatedPosts)
            setPost(updatedPost)
        })
    }

    const deletePost = async (postID) => {
        await handleStoreMethod(async () => {
            await deletePostService(postID)
            const updatedPosts = posts.value.filter((el) => el.id !== postID)
            setPosts(updatedPosts)
            totalCount.value--
        })
    }

    return { posts, post, searchParams, totalCount, maxPage, queryString, displayedPostsCount, getPosts, getPost, createPost, updatePost, deletePost, changeParams }
})