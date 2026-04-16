// src/hooks/useUsers.ts
import { UsersApi } from "@/Apis/UsersApi/users.get";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: UsersApi.getUsers,
    staleTime: 1000 * 60,
  });
}

export function GetSingleUser({ userId }: { userId: string }) {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => UsersApi.getSingleUser({ userId }),
    staleTime: 1000 * 60,
  });
}

export function createUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function VerifyPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function SendCodeOtp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.sendCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function VerifyCodeOtp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.verifyCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}


export function ForgotSendingCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.forgetSendCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function ForgotVerifyCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.forgetVerifyCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function UpdatePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}


export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: UsersApi.getUsers,
  })
}