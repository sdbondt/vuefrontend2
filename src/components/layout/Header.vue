<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '../../store/authStore'

const showOptions = ref(false)
const optionsElement = ref(null)
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
const { logout } = authStore

const handleLogout = () => logout()
const toggleOptions = () => showOptions.value = !showOptions.value
const hideOptions = () => showOptions.value = false

onClickOutside(optionsElement, () => {
    hideOptions()
})
</script>

<template>
    <header>
    <div class="bg-gray-800 text-white flex justify-around md:justify-between p-4 mb-4">
        <router-link to="/">Header</router-link>
        <div v-if="isLoggedIn" class="relative">
            <span class="px-2 py-2 border rounded inline-flex items-center text-sm" @click="toggleOptions">
                <span class="mr-2">Options</span>

                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                </svg>
            </span>
            <div v-if="showOptions" ref="optionsElement" class="absolute right-0 mt-2 w-40 bg-gray-800 border rounded shadow-lg z-10" >
                <a class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-blue-600 hover:text-white" @click="handleLogout" href="#">Logout</a>
            </div>
        </div>
    </div> 
    </header>
</template>