"use client";
import { UserApi } from "@/api/userApi";
import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage?.getItem("token");
  }

  return useQuery<IUser | null, Error>({
    queryKey: ["user-profile", token],
    queryFn: async () => {
      try {
        const result = await UserApi.getProfile();
        return result?.data ?? null;
      } catch (error) {
        return null;
      }
    },
    refetchOnWindowFocus: true,
  });
};
