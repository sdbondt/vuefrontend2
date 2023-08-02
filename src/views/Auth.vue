<script setup>
import { ref, watch } from 'vue'
import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'

const showLogin = ref(true)
const handleSwitchComponent = () => showLogin.value = !showLogin.value

watch(showLogin, (value) => {
  document.title = value ? 'Login' : 'Signup';
})
</script>

<template>
        <KeepAlive>
            <component :is="showLogin ? Login: Signup" @switchComponent="handleSwitchComponent" ></component>
        </KeepAlive>
</template>