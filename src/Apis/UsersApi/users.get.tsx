import { baseUrl } from "@/hooks/utils"
import axios from "axios"


export const UsersApi = {
    getUsers: async () => {
        const response = await axios.get(`${baseUrl}/all-users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        return response
    },
    getSingleUser: async ({ userId }: { userId: string }) => {
        const response = await axios.get(`${baseUrl}/user/${userId}`)
        return response.data
    },
    createUser: async ({ data }: { data: any }) => {
        console.log("data", data)
        const response = await axios.post(`${baseUrl}/create-user`, data)
        return response.data
    },
    signIn: async ({ data }: { data: any }) => {
        const response = await axios.post(`${baseUrl}/verify-password`, data)
        return response.data
    },
    sendCode: async ({ data }: { data: any }) => {
        const response = await axios.post(`${baseUrl}/send-code`, data)
        return response.data
    },
    verifyCode: async ({ data }: { data: any }) => {
        const response = await axios.post(`${baseUrl}/verify-code`, data)
        return response.data
    },
    forgetSendCode: async ({ data }: { data: any }) => {
        const response = await axios.post(`${baseUrl}/forget-send-code`, data)
        return response.data
    },
    forgetVerifyCode: async ({ data }: { data: any }) => {
        const response = await axios.post(`${baseUrl}/forget-verify-code`, data)
        return response.data
    },
    updatePassword: async ({ data }: { data: any }) => {
        const response = await axios.patch(`${baseUrl}/update-password`, data)
        return response.data
    }
}