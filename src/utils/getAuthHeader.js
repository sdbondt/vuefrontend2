import { storeToRefs } from "pinia"
import { useAuthStore } from "../store/authStore"

export const getAuthHeader = () => {
    const authStore = useAuthStore()
    const { token } = storeToRefs(authStore)
    return {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
}