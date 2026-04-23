
import { baseUrl } from "@/hooks/utils"
import { api } from "@/lib/api";


type addCourse = {
    userId: string
    courseId: string
}
export const CartAddApi = {
    addCart: async ({ data }: { data: addCourse }) => {
        const res = await api.post(
            `${baseUrl}/add-cart`,
            { course_id: data.courseId },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        return res.data;
    },
    removeCart: async ({ data }: { data: addCourse }) => {
        const res = await api.delete(`${baseUrl}/remove-cart/${data.courseId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return res.data
    },
    getCart: async ({ userId }: { userId: string }) => {
        const res = await api.get(`${baseUrl}/cart/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.data
    }
}

