import { createRouter, createWebHistory } from "vue-router"
import Auth from '../views/Auth.vue'
import Posts from '../views/Posts.vue'
import Post from '../views/Post.vue'
import NotFound from '../views/NotFound.vue'
import { useAuthStore } from "../store/authStore"
import { storeToRefs } from "pinia"

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/',
        redirect: '/posts'
    },
    {
        path: '/posts',
        name: 'posts',
        component: Posts,
        meta: {
            title: 'Posts'
        }
    },
    {
        path: '/posts/:postID',
        name: 'post',
        component: Post
    },
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, __, next) => {
    const authStore = useAuthStore()
    const { isLoggedIn } = storeToRefs(authStore)
    document.title = to.meta.title || 'Vue App'
    if (to.path !== '/auth' && !isLoggedIn.value) {
        next('/auth')
    }
    else {
        next()
    } 
})

export default router