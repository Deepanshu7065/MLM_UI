import { CartAddApi } from "@/Apis/Cart/cartApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



type addCourse = {
    userId: string,
    courseId: string
}

export const useAddCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data }: { data: addCourse }) => CartAddApi.addCart({ data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export const useRemoveCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data }: { data: addCourse }) => CartAddApi.removeCart({ data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export const useGetCart = ({ userId }: { userId: string }) => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => CartAddApi.getCart({ userId }),
        staleTime: 1000 * 60,
        enabled: !!userId
    })
}