import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TicketApi } from "@/Apis/Tickets/tickets";
import { toast } from "sonner";

export function useGetAllTickets() {
    return useQuery({
        queryKey: ["tickets", "all"],
        queryFn: TicketApi.getTicket,
    });
}

// User ki apni tickets lane ke liye
export function useGetUserTickets() {
    return useQuery({
        queryKey: ["tickets", "user"],
        queryFn: TicketApi.getUserTicket,
    });
}

// Single ticket details lane ke liye
export function useGetTicketDetails(ticketId: string) {
    return useQuery({
        queryKey: ["ticket", ticketId],
        queryFn: () => TicketApi.getSingleTicket({ ticketId }),
        enabled: !!ticketId, // Jab ticketId ho tabhi chale
    });
}

// Chat messages lane ke liye
export function useGetChatMessages(ticketId: string) {
    return useQuery({
        queryKey: ["chat", ticketId],
        queryFn: () => TicketApi.getChatMessages(ticketId),
        enabled: !!ticketId,
        // refetchInterval: 5000,
    });
}

// --- MUTATIONS ---

// Naya ticket create karne ke liye
export function useCreateTicketMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TicketApi.createTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets", "user"] });
            toast.success("Ticket created successfully!");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create ticket");
        }
    });
}

// Message bhejne ke liye
export function useSendMessageMutation(ticketId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TicketApi.sendMessage,
        onSuccess: () => {
            // Sirf us ticket ki chat refresh karein
            queryClient.invalidateQueries({ queryKey: ["chat", ticketId] });
        },
        onError: () => {
            toast.error("Message sending failed");
        }
    });
}

// Admin: Ticket status update (Close/Open) karne ke liye
export function useUpdateTicketStatusMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ ticketId, status }: { ticketId: string, status: string }) =>
            TicketApi.updateStatus(ticketId, status), // Iska API method niche update kiya hai
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["ticket", variables.ticketId] });
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Ticket status updated");
        }
    });
}