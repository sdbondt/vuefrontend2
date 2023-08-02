import { useUiStore } from "../store/uiStore"

export const handleStoreMethod = async (fn) => {
    const uiStore = useUiStore()
    const { setLoading, setError } = uiStore

    try {
        setLoading(true)
        await fn()
    } catch (e) {
        setError(e)
    } finally {
        setLoading(false)
    }
}