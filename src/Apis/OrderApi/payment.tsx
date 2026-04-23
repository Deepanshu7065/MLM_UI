import { baseUrl } from "@/hooks/utils";
import { api } from "@/lib/api";;

export type PaymentType = {
    userId?: string;
    name: string;
    email: string;
    phone: string | number;
    total_amount?: number;
};

export type VerifyPaymentType = {
    payment_db_id: string;
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
};

export const PaymentApi = {
    initiateCheckout: async (data: PaymentType) => {
        const res = await api.post(`${baseUrl}/checkout`, data, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        return res.data;
    },

    verifyPayment: async (data: VerifyPaymentType) => {
        const res = await api.post(`${baseUrl}/payment/verify`, data, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        return res.data;
    },

    getAllPayment: async () => {
        const res = await api.get(`${baseUrl}/get-payment`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        return res.data;
    },

    updatePaymentStatus: async ({ id, data }: { id: string; data: any }) => {
        const res = await api.patch(
            `${baseUrl}/update-payment/${id}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        return res.data;
    },

    createPayment: async (data: any) => {
        const res = await api.post(`${baseUrl}/create-payment`, data, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        return res.data;
    },

    getPaymentByUser: async () => {
        const res = await api.get(`${baseUrl}/get-user-payment`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        return res.data;
    },
};





// import { baseUrl } from "@/hooks/utils"
// import { api } from "@/lib/api";


// export type paymentType = {
//     userId: string
//     name: string
//     email: string
//     phone: number
//     total_amount: number
//     payment_id: string
//     status: string
//     payment_method: string
// }


// export const PaymentApi = {
//     createPayment: async ({ data }: { data: paymentType }) => {
//         const res = await api.post(
//             `${baseUrl}/checkout`,
//             {
//                 userId: data.userId,
//                 name: data.name,
//                 email: data.email,
//                 phone: data.phone,
//                 total_amount: data.total_amount,
//                 payment_id: data.payment_id,
//                 status: data.status,
//                 payment_method: data.payment_method
//             },
//             {
//                 headers: {
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`
//                 }
//             }
//         );
//         return res.data;
//     },
//     removeOrder: async ({ data }: { data: any }) => {
//         const res = await api.delete(`${baseUrl}/remove-order/${data.courseId}`, {
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         })
//         return res.data
//     },
//     getUserPayment: async () => {
//         const res = await api.get(`${baseUrl}/get-user-payment`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             },
//         })
//         return res.data
//     },

//     getAllPayment: async () => {
//         const res = await api.get(`${baseUrl}/get-payment`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             },
//         })
//         return res.data
//     },
//     updatePayment: async ({ id, data }: { id: string, data: any }) => {
//         const res = await api.patch(
//             `${baseUrl}/update-payment/${id}`,
//             data,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`
//                 }
//             }
//         );
//         return res.data;
//     },

// }
