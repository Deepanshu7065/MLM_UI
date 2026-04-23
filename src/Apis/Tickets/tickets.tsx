import { baseUrl } from "@/hooks/utils";
import { api } from "@/lib/api";



const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const TicketApi = {
    getTicket: async () => {
        const res = await api.get(`${baseUrl}/all-tickets`, { headers: getHeaders() });
        return res.data;
    },

    getUserTicket: async () => {
        const res = await api.get(`${baseUrl}/user-ticket`, { headers: getHeaders() });
        return res.data;
    },

    createTicket: async (data: { subject: string; message: string }) => {
        const res = await api.post(`${baseUrl}/tickets/create`, data, { headers: getHeaders() });
        return res.data;
    },

    getSingleTicket: async ({ ticketId }: { ticketId: string }) => {
        const res = await api.get(`${baseUrl}/tickets/chat/${ticketId}`, { headers: getHeaders() });
        return res.data;
    },

    getChatMessages: async (ticketId: string) => {
        const res = await api.get(`${baseUrl}/tickets/chat/${ticketId}`, { headers: getHeaders() });
        return res.data;
    },

    sendMessage: async (data: { ticket_id: string; message: string }) => {
        const res = await api.post(`${baseUrl}/tickets/chat/send`, data, { headers: getHeaders() });
        return res.data;
    },

    updateStatus: async (ticketId: string, status: string) => {
        const res = await api.patch(`${baseUrl}/tickets/status/${ticketId}`, { status }, { headers: getHeaders() });
        return res.data;
    }
};