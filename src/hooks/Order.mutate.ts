import { OrderApi, type createOrder } from "@/Apis/OrderApi/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ data }: { data: createOrder }) => await OrderApi.addOrder({ data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order"] });
        }
    });
}


export const useGetUserOrder = () => {
    return useQuery({
        queryKey: ["order", "user"],
        queryFn: async () => {
            return OrderApi.getUserOrder();
        },
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })
}


export const useGetAllOrder = () => {
    return useQuery({
        queryKey: ["order",],
        queryFn: async () => {
            return OrderApi.getOrder();
        },
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })
}