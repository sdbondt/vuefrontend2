import axios from 'axios'
import { handleApiError } from "../utils/handleApiError"

const envs = import.meta.env
const authURL = envs.VITE_API_URL + 'auth/'

export const authService = async (type, authData) => {
    try {
        const res = await axios.post(authURL + type, authData)
        return res.data.token
    } catch (e) {
        throw new Error(handleApiError(e))
    } 
}   