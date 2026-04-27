// src/Apis/Earning/earning-api.ts
import { baseUrl } from "@/hooks/utils";
import { api } from "@/lib/api";;

const getToken = () => localStorage.getItem("token");
const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
});

export const EarningApi = {
    // User wallet
    getWallet: async () => {
        const res = await api.get(`${baseUrl}/wallet/my-wallet`, {
            headers: authHeaders(),
        });
        return res.data;
    },

    // Admin: all wallets
    getAllWallets: async () => {
        const res = await api.get(`${baseUrl}/admin/all-wallets`, {
            headers: authHeaders(),
        });
        return res.data;
    },

    // Admin: all commissions + profit summary
    getAllCommissions: async () => {
        const res = await api.get(`${baseUrl}/admin/all-commissions`, {
            headers: authHeaders(),
        });
        return res.data;
    },

    // Admin: all users count
    getAllUsers: async () => {
        const res = await api.get(`${baseUrl}/all-users`, {
            headers: authHeaders(),
        });
        return res.data;
    },

    // Admin: all orders
    getAllOrders: async () => {
        const res = await api.get(`${baseUrl}/orders`, {
            headers: authHeaders(),
        });
        return res.data;
    },
    requestPayment: async ({ userId, amount }: { userId: string, amount: number }) => {
        const res = await api.post(`${baseUrl}/request-payment`, { userId, amount }, {
            headers: authHeaders(),
        });
        return res.data;
    },

};