// src/hooks/earning.mutate.ts
import { EarningApi } from "@/Apis/Earning/earning-api";
import { useQuery } from "@tanstack/react-query";

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

export const useGetAllCommissions = () => {
    return useQuery({
        queryFn: () => EarningApi.getAllCommissions(),
        queryKey: ["admin-commissions"],
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