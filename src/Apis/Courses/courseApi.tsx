import { baseUrl } from "@/hooks/utils"
import { api } from "@/lib/api";
import type { User } from "@/store/user.store";


export type CoursesType = {
    courses: CourseType[];
}
export type CourseType = {
    _id: string;
    id: string
    course_name: string;
    description: string;
    duration: string;
    lessons: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: User
    price: number
}


export const CourseApi = {
    getCourses: async () => {
        const res = await api.get(`${baseUrl}/courses`)
        return res.data as CoursesType
    },
    getSingleCourse: async ({ courseId }: { courseId: string }) => {
        const res = await api.get(`${baseUrl}/single-course/${courseId}`)
        return res.data
    },
    createCourseApi: async ({ data }: { data: any }) => {
        console.log("data", data)
        const res = await api.post(`${baseUrl}/create_course`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });
        return res.data
    },
}

