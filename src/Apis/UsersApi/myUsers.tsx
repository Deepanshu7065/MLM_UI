
import { api } from "@/lib/api"

export const MyUsersApi = {
    getMyUsers: async () => {
        const res = await api.get('/my-users')
        return res.data as any
    }
}