// src/hooks/earning.mutate.ts
import { EarningApi } from "@/Apis/Earning/earning-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// User
export const useGetWallet = () => {
    return useQuery({
        queryFn: () => EarningApi.getWallet(),
        queryKey: ["wallet"],
        staleTime: 30000,
    });
};

// Admin
export const useGetAllWallets = () => {
    return useQuery({
        queryFn: () => EarningApi.getAllWallets(),
        queryKey: ["admin-wallets"],
        staleTime: 30000,
    });
};

export const useGetAllCommissions = (paymentPage = 1, summaryPage = 1) => {
    return useQuery({
        queryFn: () => EarningApi.getAllCommissions(paymentPage, summaryPage),
        queryKey: ["admin-commissions", paymentPage, summaryPage],
        staleTime: 30000,
    });
};

export const useGetAllUsers = () => {
    return useQuery({
        queryFn: () => EarningApi.getAllUsers(),
        queryKey: ["admin-users"],
        staleTime: 30000,
    });
};

export const useGetAllOrders = () => {
    return useQuery({
        queryFn: () => EarningApi.getAllOrders(),
        queryKey: ["admin-orders"],
        staleTime: 30000,
    });
};


export const useRequestWithdrawal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: EarningApi.requestPayment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wallet"] });
        },
    })
};