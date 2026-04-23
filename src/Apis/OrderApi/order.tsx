


import { baseUrl } from "@/hooks/utils"
import { api } from "@/lib/api"


export type createOrder = {
    userId: string
    courseId: string[]
    payment_id: string
    totalAmount: number
    quantity: number
    status: string
}


export const OrderApi = {
    addOrder: async ({ data }: { data: createOrder }) => {
        const res = await api.post(
            `${baseUrl}/create-order`,
            {
                userId: data.userId,
                courseId: data.courseId,
                payment_id: data.payment_id,
                totalAmount: data.totalAmount,
                quantity: data.quantity,
                status: data.status
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        return res.data;
    },
    removeOrder: async ({ data }: { data: any }) => {
        const res = await api.delete(`${baseUrl}/remove-order/${data.courseId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return res.data
    },
    getOrder: async () => {
        const res = await api.get(`${baseUrl}/orders/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.data
    },
    getUserOrder: async () => {
        const res = await api.get(`${baseUrl}/user-order`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.data
    },
    getSingleOrder: async ({ orderId }: { orderId: any }) => {
        const res = await api.get(`${baseUrl}/single-order/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.data
    },
}









// import { baseUrl } from "@/hooks/utils"
// import { api } from "@/lib/api";


// export type createOrder = {
//     userId: string
//     courseId: string[]
//     payment_id: string
//     totalAmount: number
//     quantity: number
//     status: string
// }


// export const OrderApi = {
//     addOrder: async ({ data }: { data: createOrder }) => {
//         const res = await api.post(
//             `${baseUrl}/create-order`,
//             {
//                 userId: data.userId,
//                 courseId: data.courseId,
//                 payment_id: data.payment_id,
//                 totalAmount: data.totalAmount,
//                 quantity: data.quantity,
//                 status: data.status
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
//     getOrder: async () => {
//         const res = await api.get(`${baseUrl}/orders/`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             },
//         })
//         return res.data
//     },
//     getSingleOrder: async ({ orderId }: { orderId: any }) => {
//         const res = await api.get(`${baseUrl}/single-order/${orderId}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             },
//         })
//         return res.data
//     },
//     getUserOrder: async () => {
//         const res = await api.get(`${baseUrl}/user-order`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             },
//         })
//         return res.data
//     }
// }
