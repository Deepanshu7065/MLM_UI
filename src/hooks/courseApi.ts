import { CourseApi } from "@/Apis/Courses/courseApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useCreateCourseApi = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data }: { data: FormData }) => CourseApi.createCourseApi({ data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
    });
}


export const useGetSingleCourseApi = ({ id }: { id: string }) => {
    return useQuery({
        queryKey: ["singleCourse", id],
        queryFn: async () => {
            return CourseApi.getSingleCourse({ courseId: id });
        },
        enabled: !!id
    });
}