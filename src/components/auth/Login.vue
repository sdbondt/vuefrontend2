<script setup>
import { reactive } from 'vue'
import Button from '../UI/Button.vue'
import Anchor from '../UI/Anchor.vue'
import { useAuthStore } from '../../store/authStore';

const emits = defineEmits(['switchComponent'])

const authStore = useAuthStore()
const { login } = authStore

const loginData = reactive({
    email: '',
    password: '',
    rememberMe: false
})

const storedEmail = localStorage.getItem('loginEmail')
if (storedEmail) {
    loginData.email = storedEmail
    loginData.rememberMe = true
}

const handleLogin = async () => await login(loginData)
const handleSwitchComponent = () => emits('switchComponent')
</script>

<template>
    <div class="flex justify-center">
        <form @submit.prevent="handleLogin">
            <input type="email" v-model="loginData.email" placeholder="Enter your email here" />
            <input type="password" v-model="loginData.password" placeholder="Enter your password here" />
                <div class="flex justify-between items-center">
                    <Button >Login</Button>
                    <label for="rememberMe" >
                    <input
                        id="rememberMe"
                        type="checkbox"
                        v-model="loginData.rememberMe"
                        class="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                    <span class="ml-2">Remember Me</span>
                    </label>
                </div>
                <div class="flex justify-center">
                    <Anchor @click="handleSwitchComponent">Not signed up yet? Get an account here</Anchor>
                </div>
        </form>
    </div>
</template>