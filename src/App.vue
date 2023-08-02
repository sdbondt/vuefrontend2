<script setup>
import { storeToRefs } from 'pinia'
import { useUiStore } from './store/uiStore';
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import LoadingModal from './components/modals/LoadingModal.vue';
import ErrorModal from './components/modals/ErrorModal.vue';

const uiStore = useUiStore()
const { loading, error } = storeToRefs(uiStore)
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Header></Header>
        <main class="flex-grow">
            <LoadingModal :loading="loading" />
            <ErrorModal :error="error">{{ error }}</ErrorModal>
            <router-view></router-view>
        </main>
        <Footer></Footer>
    </div>    
</template>

