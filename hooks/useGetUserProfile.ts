import { UserApi } from "@/api/userApi";
import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  const token = localStorage.getItem("token");

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
