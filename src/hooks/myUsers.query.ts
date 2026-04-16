import { MyUsersApi } from "@/Apis/UsersApi/myUsers";
import { useQuery } from "@tanstack/react-query";

export const useMyUsers = () => {
    return useQuery({
        queryKey: ["myUsers"],
        queryFn: MyUsersApi.getMyUsers,
        staleTime: 1000 * 60,
    });
}