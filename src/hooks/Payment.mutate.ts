
import { PaymentApi, type PaymentType, type VerifyPaymentType } from "@/Apis/OrderApi/payment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useGetAllPayment = () => {
    return useQuery({
        queryKey: ["payment", "all"],
        queryFn: PaymentApi.getAllPayment
    });
};


export const useGetPayment = () => {
    return useQuery({
        queryKey: ["payment", "user"],
        queryFn: PaymentApi.getPaymentByUser
    });
};

export const useCheckoutMutation = () => {
    return useMutation({
        mutationFn: (data: PaymentType) => PaymentApi.initiateCheckout(data)
    });
};

export const useVerifyPaymentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: VerifyPaymentType) => PaymentApi.verifyPayment(data),
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["order"] });
                queryClient.invalidateQueries({ queryKey: ["payment"] });
                queryClient.invalidateQueries({ queryKey: ["cart"] });
                queryClient.invalidateQueries({ queryKey: ["my-courses"] });
            }
        }
    });
};

export const useUpdatePaymentStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: PaymentApi.updatePaymentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment"] });
            queryClient.invalidateQueries({ queryKey: ["order"] });
        }
    });
};

export const usePaymentMutate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: PaymentApi.createPayment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment"] });
            queryClient.invalidateQueries({ queryKey: ["order"] });
        }
    });
};



export const useGetWithdrawQuery = () => {
    return useQuery({
        queryKey: ["withdraw"],
        queryFn: PaymentApi.getWithdrawApi
    });
}

export const useGetUserWithdrawQuery = () => {
    return useQuery({
        queryKey: ["withdraw", "user"],
        queryFn: PaymentApi.getUserWithdrawApi
    });
}

export const useUpdateWithdrawStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: PaymentApi.updateWithdrawStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["withdraw"] });
        }
    });
}

// import { PaymentApi, type paymentType } from "@/Apis/OrderApi/payment";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



// export const usePaymentMutate = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["payment"] });
//         },
//         mutationFn: async ({ data }: { data: paymentType }) => await PaymentApi.createPayment({ data }),
//     });
// }

// export const useGetPayment = () => {
//     return useQuery({
//         queryKey: ["payment"],
//         queryFn: async () => {
//             return PaymentApi.getUserPayment();
//         },
//     })
// }

// export const useGetAllPayment = () => {
//     return useQuery({
//         queryKey: ["payment"],
//         queryFn: async () => {
//             return PaymentApi.getAllPayment();
//         },
//     })
// }


// export const useUpdatePaymentStatus = () => {
//     const queryClient = useQueryClient();
//     return useMutation({    
//         mutationFn: async ({ id, data }: { id: string, data: any }) => await PaymentApi.updatePayment({
//             data,
//             id
//         }),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["payment"] });
//         },
//     })
// }