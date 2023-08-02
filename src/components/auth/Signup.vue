<script setup>
import { reactive } from 'vue'
import Button from '../UI/Button.vue'
import Anchor from '../UI/Anchor.vue'
import { useAuthStore } from '../../store/authStore';

const emits = defineEmits(['switchComponent'])

const authStore = useAuthStore()
const { signup } = authStore

const signupData = reactive({
    email: '',
    username: '',
    password: ''
})

const handleSignup = async () => await signup(signupData)
const handleSwitchComponent = () => emits('switchComponent')
</script>

<template>
    <div class="flex justify-center">
        <form @submit.prevent="handleSignup">
            <input type="email" v-model="signupData.email" placeholder="Enter your email here" />
            <input type="text" v-model="signupData.username" placeholder="Enter your username here" />
            <input type="password" v-model="signupData.password" placeholder="Enter your password here" />
            <Button>Signup</Button>
            <Anchor @click="handleSwitchComponent">Already got an account? Login here</Anchor>
        </form>
    </div> 
</template>