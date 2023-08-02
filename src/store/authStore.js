import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { handleStoreMethod } from "../utils/handleStoreMethod";
import { authService } from "../services/authService";
import jwtDecode from "jwt-decode";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const token = ref('')
    const userID = ref('')
    const isLoggedIn = computed(() => Boolean(token.value))

    const router = useRouter()

    const logout = () => {
        token.value = ''
        localStorage.removeItem('authToken')
        router.push('/auth')
    }

    const setUserID = (authToken) => {
        const payload = jwtDecode(authToken)
        const isTokenExpired = Date.now() >= payload.exp * 1000
        if (isTokenExpired) {
            logout()
        } else {
            userID.value = payload.userId
        }
    }

    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
        token.value = storedToken
        setUserID(storedToken)
    }

    const setToken = (authToken) => {
        token.value = authToken
        localStorage.setItem('authToken', authToken)
        setUserID(authToken)    
    }

    const login = async (loginData) => {
        await handleStoreMethod(async () => {
            const authToken = await authService('login', loginData)
            setToken(authToken)
            if (loginData.rememberMe) {
                localStorage.setItem('loginEmail', loginData.email)

            } else {
                localStorage.removeItem('loginEmail')
            }
            router.push('/')
        })
    }

    const signup = async (signupData) => {
        await handleStoreMethod(async () => {
            const authToken = await authService('signup', signupData)
            setToken(authToken)
            router.push('/')
        })
    }

    return { token, userID, isLoggedIn, login, signup, logout }
})