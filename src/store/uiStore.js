import { defineStore } from "pinia";
import { ref } from "vue";


export const useUiStore = defineStore('ui', () => {
    const error = ref('')
    const loading = ref(false)

    const setError = (msg) => {
        error.value = msg
    }

    const clearError = () => {
        error.value = ''
    }

    const setLoading = (val) => {
        loading.value = val
    }

    return { error, loading, setError, clearError, setLoading }
})